/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env.local or .env
dotenv.config({ path: path.join(__dirname, '.env.local') });
dotenv.config();

import { mockProducts, mockOrders, mockApprovals } from './src/data';
import { Product, Order, ApprovalRequest, TaxConfig } from './src/types';

const app = express();
const PORT = process.env.PORT || 5000;
const DB_FILE = path.join(__dirname, 'db.json');

app.use(express.json());

// Initialize Local JSON Database
function initDB() {
  if (!fs.existsSync(DB_FILE)) {
    const initialData = {
      products: mockProducts,
      orders: mockOrders,
      approvals: mockApprovals,
      taxConfig: { marketplaceFee: 8.0, logisticsFee: 5.0 }
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
  }
}

initDB();

function readDB() {
  const data = fs.readFileSync(DB_FILE, 'utf-8');
  return JSON.parse(data);
}

function writeDB(data: any) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// ------------------------------------------------------------------
// REST APIs Endpoints
// ------------------------------------------------------------------

// 1. Products APIs
app.get('/api/products', (req, res) => {
  try {
    const db = readDB();
    res.json(db.products);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao carregar produtos' });
  }
});

// 2. Orders APIs
app.get('/api/orders', (req, res) => {
  try {
    const db = readDB();
    res.json(db.orders);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao carregar pedidos' });
  }
});

app.post('/api/orders', (req, res) => {
  try {
    const newOrders: Order[] = req.body;
    if (!Array.isArray(newOrders)) {
       res.status(400).json({ error: 'Formato inválido. Esperado um array de pedidos.' });
       return;
    }
    const db = readDB();
    db.orders = [...newOrders, ...db.orders];
    writeDB(db);
    res.status(201).json(newOrders);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar pedidos' });
  }
});

app.put('/api/orders/:id', (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const db = readDB();
    
    let orderIndex = db.orders.findIndex((o: Order) => o.id === id);
    if (orderIndex === -1) {
       res.status(404).json({ error: 'Pedido não encontrado' });
       return;
    }

    db.orders[orderIndex] = { ...db.orders[orderIndex], ...updates };
    writeDB(db);
    res.json(db.orders[orderIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar pedido' });
  }
});

// 3. Approvals APIs (Partner Moderations)
app.get('/api/approvals', (req, res) => {
  try {
    const db = readDB();
    res.json(db.approvals);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter aprovações' });
  }
});

app.post('/api/approvals', (req, res) => {
  try {
    const newApproval: ApprovalRequest = req.body;
    const db = readDB();
    db.approvals = [newApproval, ...db.approvals];
    writeDB(db);
    res.status(201).json(newApproval);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao cadastrar parceiro' });
  }
});

app.put('/api/approvals/:id/approve', (req, res) => {
  try {
    const { id } = req.params;
    const db = readDB();
    let approvalIndex = db.approvals.findIndex((a: ApprovalRequest) => a.id === id);
    if (approvalIndex === -1) {
       res.status(404).json({ error: 'Solicitação não encontrada' });
       return;
    }
    db.approvals[approvalIndex].status = 'approved';
    writeDB(db);
    res.json(db.approvals[approvalIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao aprovar parceiro' });
  }
});

// 4. Tax Configuration APIs
app.get('/api/tax-config', (req, res) => {
  try {
    const db = readDB();
    res.json(db.taxConfig);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao carregar taxas' });
  }
});

app.put('/api/tax-config', (req, res) => {
  try {
    const newConfig: TaxConfig = req.body;
    const db = readDB();
    db.taxConfig = newConfig;
    writeDB(db);
    res.json(db.taxConfig);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar taxas' });
  }
});

// 5. Gemini AI Chat API
app.post('/api/gemini/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
       res.status(200).json({
        response: 'Olá! Sou o Assistente Virtual da Fronteira. Para me comunicar usando inteligência artificial real da rede Gemini, configure sua chave `GEMINI_API_KEY` nas configurações ou em `.env.local`. Por enquanto, posso te informar que a cota terrestre para compras no Paraguai com isenção de impostos é de **U$ 500** por pessoa, e a aérea/marítima é de **U$ 1.000**. Como posso ajudar?'
      });
       return;
    }

    const ai = new GoogleGenAI({ apiKey });
    const db = readDB();

    // Contextual system instructions including our business and product catalog details
    const catalogSummary = db.products.map((p: Product) => `- ${p.name} por R$ ${p.price} na loja ${p.store}`).join('\n');
    const systemInstruction = `Você é o Assistente Aduaneiro e Concierge de Vendas inteligente da plataforma Fronteira Marketplace.
Seu objetivo é ajudar compradores brasileiros a entender as regras alfandegárias de compras no Paraguai e indicar as melhores ofertas de nossa plataforma.

Regras do Negócio Fronteira:
1. Facilitamos compras no Paraguai com entrega garantida no Brasil.
2. Contamos com Freteiros Credenciados que retiram a mercadoria na loja física no Paraguai (como CellShop, Mega Eletrônicos, Connect) e cuidam da travessia e do desembaraço aduaneiro.
3. As taxas aduaneiras e impostos de importação já são calculados de forma simplificada no momento do fechamento da compra (checkout) em nossa plataforma.
4. O cliente paga em Reais (BRL) via Pix ou Cartão de Crédito. Não há surpresas com taxas na alfândega porque a Fronteira resolve e repassa a guia DARF devida eletronicamente.

Cotas e Regras da Receita Federal (Padrão):
- Cota Terrestre/Fluvial: Isenção de impostos até U$ 500 por pessoa física a cada 30 dias.
- Cota Aérea/Marítima: Isenção de impostos até U$ 1.000 por pessoa.
- O que exceder a cota está sujeito a imposto de 50% sobre o valor excedente no regime de tributação simplificada.
- Na Fronteira, o imposto é calculado e embutido de forma automatizada no frete/tarifa final, evitando burocracias.

Nosso catálogo de ofertas atual disponível na plataforma:
${catalogSummary}

Instruções de Resposta:
- Seja extremamente amigável, prestativo e profissional.
- Responda em Português do Brasil.
- Use formatação Markdown (negritos, listas) para deixar as respostas fáceis de ler.
- Se te perguntarem sobre produtos, recomende os itens do nosso catálogo acima!
- Dê orientações seguras sobre limites fiscais e declare a tranquilidade que a Fronteira oferece ao cuidar desse trâmite.`;

    // Process chat request using model gemini-2.5-flash
    const formattedHistory = Array.isArray(history) ? history.map(item => ({
      role: item.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: item.content }]
    })) : [];

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        ...formattedHistory,
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({ response: response.text });
  } catch (error: any) {
    console.error('Erro na API do Gemini:', error);
    res.status(500).json({ error: 'Erro ao processar requisição no modelo de IA: ' + error.message });
  }
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`[Fronteira Server] Servidor Express rodando na porta ${PORT}`);
});
