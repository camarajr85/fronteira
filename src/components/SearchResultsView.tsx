/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Filter, Star, CheckSquare, Square, ArrowUpRight, Check, X, ShieldAlert, Award } from 'lucide-react';
import { Product } from '../types';
import { mockProducts } from '../data';

interface SearchResultsViewProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onRegisterStoreRequest: (storeName: string, category: string) => void;
  searchQuery: string;
}

export default function SearchResultsView({
  products,
  onSelectProduct,
  onRegisterStoreRequest,
  searchQuery
}: SearchResultsViewProps) {
  // Filters State linked
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [selectedStores, setSelectedStores] = useState<string[]>([]);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  // Store registration inputs state
  const [regStoreName, setRegStoreName] = useState('');
  const [regCategory, setRegCategory] = useState('Eletrônicos');
  const [regSubmitted, setRegSubmitted] = useState(false);

  // Filters setup
  const categoriesList = [
    { id: 'all', label: 'Todas as categorias' },
    { id: 'Eletrônicos', label: 'Eletrônicos' },
    { id: 'Cosméticos', label: 'Cosméticos & Perfumes' }
  ];

  const storesList = ['Mega Eletrônicos', 'CellShop', 'Atacado Connect'];

  const toggleStore = (store: string) => {
    setSelectedStores((prev) =>
      prev.includes(store) ? prev.filter((s) => s !== store) : [...prev, store]
    );
  };

  // Filter computation logic - reactively derived
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // 1. Keyword query filter (Matches names/category)
      const matchesQuery =
        searchQuery.trim() === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());

      // 2. Category filter
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;

      // 3. Price filter
      const matchesPrice = product.price <= maxPrice;

      // 4. Store filter
      const matchesStore =
        selectedStores.length === 0 || selectedStores.includes(product.store);

      // 5. In stock filter
      const matchesStock = !onlyInStock || product.inStock;

      // 6. Rating filter
      const matchesRating = selectedRating === null || product.rating >= selectedRating;

      return (
        matchesQuery &&
        matchesCategory &&
        matchesPrice &&
        matchesStore &&
        matchesStock &&
        matchesRating
      );
    });
  }, [searchQuery, selectedCategory, maxPrice, selectedStores, onlyInStock, selectedRating]);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (regStoreName.trim()) {
      onRegisterStoreRequest(regStoreName, regCategory);
      setRegSubmitted(true);
      setTimeout(() => {
        setRegStoreName('');
        setRegSubmitted(false);
      }, 5000);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pb-16 text-left animate-fade-in">
      {/* Sidebar filter controls */}
      <aside className="lg:col-span-1 flex flex-col gap-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col gap-6 sticky top-20">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
            <Filter className="w-4 h-4 text-blue-600" />
            <h2 className="font-extrabold text-base text-slate-900">Filtros de Busca</h2>
          </div>

          {/* Category selection */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Categorias</h3>
            <div className="flex flex-col gap-2">
              {categoriesList.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`text-left text-sm py-1 px-2.5 rounded-lg transition-colors leading-relaxed font-semibold ${
                    selectedCategory === cat.id
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Pricing range control */}
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Preço Máximo</h3>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                Até R$ {maxPrice.toLocaleString('pt-BR')}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="10000"
              step="100"
              value={maxPrice}
              onChange={(e) => setMaxPrice(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[10px] font-semibold text-slate-400">
              <span>R$ 0</span>
              <span>R$ 10.000</span>
            </div>
          </div>

          {/* Stores check filters */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Lojas Oficiais</h3>
            <div className="flex flex-col gap-2.5">
              {storesList.map((store) => {
                const isActive = selectedStores.includes(store);
                return (
                  <button
                    key={store}
                    onClick={() => toggleStore(store)}
                    className="flex items-center gap-2.5 text-left text-sm text-slate-600 hover:text-slate-900 transition-colors cursor-pointer group"
                  >
                    {isActive ? (
                      <CheckSquare className="w-4 h-4 text-blue-600 shrink-0" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-300 group-hover:text-slate-400 shrink-0" />
                    )}
                    <span className={isActive ? 'font-semibold text-slate-900' : ''}>{store}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Rating filter checkbox triggers */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Avaliação</h3>
            <div className="flex flex-col gap-2">
              {[4.5, 4.0, 3.5].map((ratingVal) => (
                <button
                  key={ratingVal}
                  onClick={() => setSelectedRating(selectedRating === ratingVal ? null : ratingVal)}
                  className={`flex items-center gap-2 text-sm px-2 py-1 rounded transition-all select-none ${
                    selectedRating === ratingVal ? 'bg-slate-100 font-bold' : 'hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <div className="flex items-center text-amber-400 shrink-0">
                    <Star className="w-3.5 h-3.5 fill-current" />
                  </div>
                  <span>{ratingVal} Estrelas e acima</span>
                </button>
              ))}
            </div>
          </div>

          {/* Stock toggle */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <span className="text-sm text-slate-600 font-semibold">Apenas produtos em estoque</span>
            <button
              onClick={() => setOnlyInStock(!onlyInStock)}
              className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${
                onlyInStock ? 'bg-blue-600' : 'bg-slate-200'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  onlyInStock ? 'translate-x-4' : 'translate-x-0'
                }`}
              ></div>
            </button>
          </div>
        </div>
      </aside>

      {/* Main search results panels */}
      <section className="lg:col-span-3 flex flex-col gap-8">
        {/* Results title summary bar */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-lg font-extrabold text-slate-900">
              {searchQuery ? `Resultados para "${searchQuery}"` : 'Todos os Produtos'}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Encontramos {filteredProducts.length} itens correspondentes aos filtros.
            </p>
          </div>
          <div className="text-xs bg-slate-100 text-slate-700 font-bold px-3 py-1.5 rounded-lg border border-slate-200">
            Fronteira Garantida 🇧🇷 🇵🇾
          </div>
        </div>

        {/* Empty state handles */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center flex flex-col items-center gap-4">
            <ShieldAlert className="w-12 h-12 text-blue-500" />
            <div className="flex flex-col gap-1">
              <h3 className="font-bold text-base text-slate-900">Nenhum produto correspondente</h3>
              <p className="text-sm text-slate-500 max-w-md">
                Não encontramos produtos que correspondam à sua pesquisa com os filtros ativos. Tente resetar seus filtros ou buscar por outro termo.
              </p>
            </div>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setMaxPrice(10000);
                setSelectedStores([]);
                setOnlyInStock(false);
                setSelectedRating(null);
              }}
              className="bg-blue-600 text-white text-xs px-4 py-2 rounded-lg font-bold hover:bg-blue-500 transition-colors"
            >
              Resetar Filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const isIPhoneItem = product.id === 'iphone-15-pro-max';
              return (
                <div
                  key={product.id}
                  className="bg-white border border-slate-200 hover:border-blue-500 rounded-2xl overflow-hidden group hover:shadow-lg transition-all duration-300 flex flex-col h-full"
                >
                  {/* Photo container */}
                  <div className="relative aspect-square overflow-hidden bg-slate-50 border-b border-slate-100 flex items-center justify-center p-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500 p-2"
                    />
                    <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                      {product.store}
                    </span>
                    {!product.inStock && (
                      <span className="absolute inset-0 bg-slate-900/60 flex items-center justify-center text-white text-xs font-black uppercase">
                        Esgotado na Loja
                      </span>
                    )}
                  </div>

                  {/* Body information detailing */}
                  <div className="p-4 flex flex-col justify-between flex-1 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <h3 className="text-sm font-semibold text-slate-800 line-clamp-2 leading-snug group-hover:text-blue-600 transition-all">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-1 text-slate-500">
                        <Star className="w-3 px-0 shrink-0 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-bold text-slate-700">{product.rating}</span>
                        <span className="text-[10px] text-slate-400">({product.reviewsCount})</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col">
                        <span className="text-base font-extrabold text-blue-600">
                          R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                        {product.oldPrice && (
                          <span className="text-xs text-slate-400 line-through">
                            R$ {product.oldPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </span>
                        )}
                        <span className="text-[10px] text-slate-500 font-semibold mt-0.5">
                          Até 12x no cartão ou à vista no PIX
                        </span>
                      </div>

                      <button
                        onClick={() => onSelectProduct(product)}
                        className={`w-full py-2 rounded-xl text-xs font-bold transition-all ${
                          isIPhoneItem
                            ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-500/15'
                            : 'border border-slate-200 hover:border-blue-600 text-slate-700 hover:bg-blue-600 hover:text-white'
                        }`}
                      >
                        {isIPhoneItem ? 'Ver Preço e Cores' : 'Visualizar Detalhes'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Stateful Shop B2B Registration form */}
        <div className="bg-gradient-to-br from-blue-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden flex flex-col lg:flex-row justify-between items-center gap-8 shadow-xl">
          <div className="flex flex-col items-start gap-4 max-w-lg">
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white shrink-0 border border-white/15">
              <Award className="w-5 h-5 text-blue-400" />
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] text-blue-400 font-bold uppercase tracking-widest leading-none">Canal B2B Fronteira</span>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                Possui uma loja em Ciudad del Este e quer vender?
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Integre seu estoque em nossa plataforma, ganhe visibilidade nacional e venda direto para clientes brasileiros com suporte fiscal e logístico automatizado.
              </p>
            </div>
          </div>

          <div className="w-full lg:max-w-xs shrink-0 self-stretch flex items-center justify-center">
            {regSubmitted ? (
              <div className="w-full bg-blue-950/40 border border-blue-500/30 rounded-2xl p-5 flex flex-col items-center text-center gap-2 select-none">
                <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center font-bold">✓</div>
                <h4 className="text-sm font-bold text-white">Solicitação Enviada!</h4>
                <p className="text-xs text-slate-400 leading-normal">
                  Seu cadastro foi enviado para nossa fila de aprovação e auditoria do Admin.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="w-full bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-5 flex flex-col gap-3">
                <div className="flex flex-col gap-1 text-left">
                  <label className="text-[10px] font-extrabold text-slate-300 uppercase">Nome da Loja</label>
                  <input
                    type="text"
                    required
                    value={regStoreName}
                    onChange={(e) => setRegStoreName(e.target.value)}
                    placeholder="Ex: King Imports CDE"
                    className="bg-white/10 text-white border border-white/15 rounded-lg px-3 py-1.5 text-xs focus:ring-1 focus:ring-blue-500 text-left placeholder:text-slate-500"
                  />
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <label className="text-[10px] font-extrabold text-slate-300 uppercase">Categoria Principal</label>
                  <select
                    value={regCategory}
                    onChange={(e) => setRegCategory(e.target.value)}
                    className="bg-slate-800 text-white border border-white/15 rounded-lg px-3 py-1.5 text-xs focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="Eletrônicos">Eletrônicos & Informática</option>
                    <option value="Cosméticos">Cosméticos & Perfumaria</option>
                    <option value="Confecções">Modas & Vestuários</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-xl text-xs font-bold transition-all mt-2 cursor-pointer shadow-md shadow-blue-600/10"
                >
                  Cadastrar Loja
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
