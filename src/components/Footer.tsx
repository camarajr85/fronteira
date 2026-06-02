/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Shield, Github, HelpCircle, Mail, Globe, CreditCard } from 'lucide-react';

interface FooterProps {
  currentProfile?: 'shopper' | 'courier' | 'admin';
}

export default function Footer({ currentProfile = 'shopper' }: FooterProps) {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 mt-auto">
      {/* Upper footer grid */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Brand Info block */}
        <div className="flex flex-col gap-4">
          <div className="font-extrabold text-xl text-white">
            Fronteira<span className="text-blue-500 font-semibold ml-1">Marketplace</span>
          </div>
          <p className="text-sm opacity-80 leading-relaxed max-w-sm">
            A maior plataforma de conexão logística inteligente e compras garantidas de Ciudad del Este diretamente para todo o Brasil.
          </p>
          <div className="flex gap-4 mt-2">
            <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-blue-600 hover:text-white transition-all">
              <Globe className="w-4 h-4" />
            </a>
            <a href="mailto:contato@fronteiramarketplace.com" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-blue-600 hover:text-white transition-all">
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Column 1 - Plataforma link triggers */}
        <div className="flex flex-col gap-3">
          <h4 className="text-white font-semibold text-sm tracking-wide uppercase">Plataforma</h4>
          <ul className="flex flex-col gap-2 text-sm text-slate-400">
            <li><a href="#" className="hover:text-blue-500 transition-colors">Seja um Freteiro</a></li>
            <li><a href="#" className="hover:text-blue-500 transition-colors">Lojas Integradas</a></li>
            <li><a href="#" className="hover:text-blue-500 transition-colors">Rastreamento de Cargas</a></li>
            <li><a href="#" className="hover:text-blue-500 transition-colors">Câmbio Comercial</a></li>
          </ul>
        </div>

        {/* Column 2 - Suporte */}
        <div className="flex flex-col gap-3">
          <h4 className="text-white font-semibold text-sm tracking-wide uppercase">Suporte</h4>
          <ul className="flex flex-col gap-2 text-sm text-slate-400">
            <li><a href="#" className="hover:text-blue-500 transition-colors">Central de Ajuda</a></li>
            <li><a href="#" className="hover:text-blue-500 transition-colors">Termos de Uso</a></li>
            <li><a href="#" className="hover:text-blue-500 transition-colors">Regulamento de Importação RFB</a></li>
            <li><a href="#" className="hover:text-blue-500 transition-colors">Políticas de Privacidade</a></li>
          </ul>
        </div>

        {/* Column 3 - Contact trigger info */}
        <div className="flex flex-col gap-3">
          <h4 className="text-white font-semibold text-sm tracking-wide uppercase">Contato</h4>
          <p className="text-sm">contato@fronteiramarketplace.com</p>
          <p className="text-xs opacity-75">
            Atendimento B2B e Atacarejo:<br />Seg à Sex - 08h às 18h (GMT-3)
          </p>
          <div className="mt-2 flex items-center gap-2 p-3 bg-slate-800/40 rounded-lg border border-slate-700/60 w-fit">
            <Shield className="w-4 h-4 text-theme text-blue-400 shrink-0" />
            <span className="text-[11px] text-slate-300 font-medium">Ambiente Rastreável e Seguro</span>
          </div>
        </div>

      </div>

      {/* Lower footer copyright details */}
      <div className="border-t border-slate-800 bg-slate-900/40 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500 text-center md:text-left">
            © 2026 Fronteira Marketplace. Todos os direitos reservados. Operado sob regime especial aduaneiro.
          </p>
          <div className="flex items-center gap-4 opacity-50 select-none">
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">CANAIS DE RETIRADA:</span>
            <div className="flex items-center gap-2 text-slate-400">
              <CreditCard className="w-4 h-4" />
              <span className="text-xs">Pix, Cartão de Crédito, Boleto Bancário</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
