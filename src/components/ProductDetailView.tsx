/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Star, ShieldCheck, Truck, RefreshCw, ShoppingCart, Heart, Share2, Clipboard, ArrowLeft, Check } from 'lucide-react';
import { Product, CartItem } from '../types';
import { galleryThumbs, phoneDetailsImage } from '../data';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (item: CartItem) => void;
}

export default function ProductDetailView({
  product,
  onBack,
  onAddToCart
}: ProductDetailProps) {
  // Gallery selectors state
  const [selectedPhoto, setSelectedPhoto] = useState<string>(galleryThumbs[0]);

  // Color selection active indicator
  const [selectedColor, setSelectedColor] = useState<string>(product.colors?.[0] || '#4B5267');

  // Storage selection active indicator
  const [selectedCapacity, setSelectedCapacity] = useState<string>(product.capacities?.[0] || '256GB');

  // Interactive merchant options price links
  const [selectedMerchant, setSelectedMerchant] = useState<string>('Mega Eletrônicos');
  const [currentPrice, setCurrentPrice] = useState<number>(product.price);

  // Tab controllers: Descrição, Especificações, Garantia
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'guarantee'>('desc');

  // Shipping simulation calculator properties
  const [zipCode, setZipCode] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);
  const [shippingResults, setShippingResults] = useState<{
    calculated: boolean;
    normal: number;
    expresso: number;
    daysNormal: string;
    daysExpresso: string;
  } | null>(null);

  // Cart addition feedback overlay
  const [addedSuccess, setAddedSuccess] = useState(false);

  // Merchant information mapped dynamically
  const sellers = [
    { name: 'Mega Eletrônicos', price: 6890, stock: '14 unidades', available: true },
    { name: 'CellShop', price: 6950, stock: '5 unidades', available: true },
    { name: 'Atacado Connect', price: 6850, stock: 'Esgotado', available: false }
  ];

  const handleMerchantSelect = (merchant: typeof sellers[0]) => {
    if (merchant.available) {
      setSelectedMerchant(merchant.name);
      setCurrentPrice(merchant.price);
    }
  };

  const handleCalculateShipping = (e: React.FormEvent) => {
    e.preventDefault();
    if (zipCode.trim().length >= 5) {
      setIsCalculating(true);
      setShippingResults(null);
      setTimeout(() => {
        setIsCalculating(false);
        setShippingResults({
          calculated: true,
          normal: 85.00,
          expresso: 145.00,
          daysNormal: '6-8 dias úteis',
          daysExpresso: '3-4 dias úteis'
        });
      }, 800);
    }
  };

  const handleAddToCartClick = () => {
    const updatedProduct = {
      ...product,
      price: currentPrice,
      store: selectedMerchant
    };

    onAddToCart({
      product: updatedProduct,
      quantity: 1,
      selectedColor,
      selectedCapacity
    });

    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
    }, 3000);
  };

  const colorLabels: Record<string, string> = {
    '#4B5267': 'Titanium Blue',
    '#F2F1ED': 'Silver White',
    '#2F2F30': 'Space Black',
    '#7A7D7E': 'Titanium Gray',
  };

  return (
    <div className="flex flex-col gap-8 pb-16 animate-fade-in text-left">
      {/* Back to catalog button breadcrumbs style */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-semibold text-sm transition-all group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Voltar para busca</span>
        </button>

        <span className="text-xs text-slate-400 font-medium">
          Eletrônicos &gt; Celulares &gt; Apple &gt; iPhone 15 Pro Max
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* LEFT COLUMN: Image Gallery & Description Tabs */}
        <div className="flex flex-col gap-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col gap-4">
            
            {/* Large Active High-res presentation image */}
            <div className="aspect-square bg-slate-50 rounded-2xl overflow-hidden flex items-center justify-center p-6 border border-slate-100 max-h-[460px]">
              <img
                src={selectedPhoto}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="max-h-full max-w-full object-contain p-2 hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Micro thumbnail grid selectors */}
            <div className="grid grid-cols-4 gap-3">
              {galleryThumbs.map((thumb, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedPhoto(thumb)}
                  className={`aspect-square bg-slate-50 rounded-xl overflow-hidden p-2 border-2 transition-all cursor-pointer ${
                    selectedPhoto === thumb ? 'border-blue-600 shadow-md shadow-blue-500/10' : 'border-slate-100 opacity-70 hover:opacity-100 hover:border-slate-300'
                  }`}
                >
                  <img src={thumb} alt={`Thumbnail ${index + 1}`} referrerPolicy="no-referrer" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>

          </div>

          {/* Tab Information Sheet Group (Descrição / Specs / Garantia) */}
          <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
            <div className="flex border-b border-slate-200 bg-slate-50">
              <button
                onClick={() => setActiveTab('desc')}
                className={`flex-1 py-3 text-sm font-bold transition-all text-center ${
                  activeTab === 'desc' ? 'bg-white text-blue-600 border-t-2 border-t-blue-600' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100/60'
                }`}
              >
                Descrição
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`flex-1 py-3 text-sm font-bold transition-all text-center ${
                  activeTab === 'specs' ? 'bg-white text-blue-600 border-t-2 border-t-blue-600' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100/60'
                }`}
              >
                Especificações
              </button>
              <button
                onClick={() => setActiveTab('guarantee')}
                className={`flex-1 py-3 text-sm font-bold transition-all text-center ${
                  activeTab === 'guarantee' ? 'bg-white text-blue-600 border-t-2 border-t-blue-600' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100/60'
                }`}
              >
                Garantia & Entrega
              </button>
            </div>

            <div className="p-6">
              {activeTab === 'desc' && (
                <div className="flex flex-col gap-4 text-slate-600 text-sm leading-relaxed">
                  <p>{product.description}</p>
                  <p>
                    O titânio aeroespacial de qualidade premium possui uma excelente relação peso-resistência, tornando-o um dos modelos Pro mais leves de todos os tempos. Design robusto com vidro safira na traseira e revestimento cerâmico frontal resistente contra quedas e riscos diários.
                  </p>
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="overflow-hidden border border-slate-200 rounded-xl">
                  <table className="w-full text-sm">
                    <tbody>
                      {product.specs &&
                        Object.entries(product.specs).map(([key, val], index) => (
                          <tr key={key} className={index % 2 === 0 ? 'bg-slate-50/50' : 'bg-white'}>
                            <td className="px-4 py-2.5 font-bold text-slate-500 w-1/3 border-b border-r border-slate-100">{key}</td>
                            <td className="px-4 py-2.5 text-slate-800 border-b border-slate-100">{val}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'guarantee' && (
                <div className="flex flex-col gap-4 text-slate-600 text-sm leading-relaxed">
                  <div className="flex gap-3 items-start">
                    <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-slate-900">Garantia Oficial Apple de 1 Ano</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Nota Fiscal emitida pela loja em Ciudad del Este cadastrada no sistema Fronteira.</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start mt-2">
                    <Truck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-slate-900">Seguro de Transporte Fronteira</h4>
                      <p className="text-xs text-slate-500 mt-0.5">O freteiro é responsável pela integridade até o despacho doméstico no Brasil. Se extraviar, você recebe o estorno total do valor pago.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Detail Specification selection */}
        <div className="flex flex-col gap-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col gap-6">
            
            {/* Title rating segment */}
            <div className="flex flex-col gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                {product.name}
              </h1>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <div className="flex items-center text-amber-400">
                  <Star className="w-4 h-4 fill-current text-amber-400" />
                  <span className="font-semibold text-slate-800 ml-1">{product.rating}</span>
                </div>
                <span className="text-xs">({product.reviewsCount} classificações de compradores)</span>
                <span className="w-1.5 h-1.5 bg-slate-300 rounded-full"></span>
                <span className="text-xs text-emerald-600 font-bold">100% Original</span>
              </div>
            </div>

            {/* Selection Options: Capacity */}
            {product.capacities && (
              <div className="flex flex-col gap-2.5">
                <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Capacidade</span>
                <div className="flex gap-3">
                  {product.capacities.map((cap) => (
                    <button
                      key={cap}
                      onClick={() => setSelectedCapacity(cap)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        selectedCapacity === cap
                          ? 'border-blue-600 bg-blue-50 text-blue-600'
                          : 'border-slate-200 text-slate-600 hover:border-slate-400'
                      }`}
                    >
                      {cap}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Selection Options: Color */}
            {product.colors && (
              <div className="flex flex-col gap-2.5">
                <div className="flex justify-between text-xs font-extrabold text-slate-400 uppercase tracking-wider">
                  <span>Cor do Titânio</span>
                  <span className="text-slate-600 font-bold lowercase first-letter:uppercase">
                    {colorLabels[selectedColor] || 'Selecionado'}
                  </span>
                </div>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border-2 transition-all cursor-pointer flex items-center justify-center ${
                        selectedColor === color ? 'border-blue-600 scale-110 shadow' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: color }}
                      title={colorLabels[color] || color}
                    >
                      {selectedColor === color && (
                        <div className={`w-2 h-2 rounded-full ${color === '#F2F1ED' ? 'bg-slate-900' : 'bg-white'}`}></div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* HIGHLIGHT: Comparative Merchant Pricing Matrix table */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
                Comparativo de Preços & Estoque (CDE)
              </span>
              <div className="border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100">
                {sellers.map((merch) => {
                  const isSelected = selectedMerchant === merch.name;
                  return (
                    <div
                      key={merch.name}
                      onClick={() => handleMerchantSelect(merch)}
                      className={`flex justify-between items-center p-4 transition-all cursor-pointer select-none ${
                        !merch.available
                          ? 'opacity-50 bg-slate-50 cursor-not-allowed'
                          : isSelected
                          ? 'bg-blue-50/60 border-l-4 border-l-blue-600'
                          : 'hover:bg-slate-50/50'
                      }`}
                    >
                      <div className="flex flex-col items-start gap-1">
                        <span className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                          {merch.name}
                          {isSelected && <span className="text-[9px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-extrabold">Selecionado</span>}
                        </span>
                        <span className={`text-[10px] font-semibold ${merch.available ? 'text-emerald-600' : 'text-rose-500 line-through'}`}>
                          {merch.available ? `Estoque: ${merch.stock}` : 'Esgotado'}
                        </span>
                      </div>
                      <span className="text-base font-extrabold text-slate-900">
                        R$ {merch.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Active Pricing & Core Checkout Add Button */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative overflow-hidden">
              <div className="flex flex-col text-left">
                <span className="text-xs text-slate-400 font-bold uppercase">Preço Selecionado</span>
                <span className="text-2xl font-black text-blue-600 mt-1">
                  R$ {currentPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
                <span className="text-[10px] text-slate-500 font-semibold leading-normal mt-0.5">
                  Taxas aduaneiras inclusas • Sem tributação extra no Brasil
                </span>
              </div>

              {addedSuccess ? (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow">
                  <Check className="w-4 h-4" /> Adicionado ao Carrinho!
                </div>
              ) : (
                <button
                  onClick={handleAddToCartClick}
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 active:scale-95 text-white py-3.5 px-6 rounded-xl font-bold text-sm tracking-wide transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" /> Comprar Agora
                </button>
              )}
            </div>

            {/* Dynamic simulated shipping rate Calculator */}
            <div className="border border-slate-200 rounded-2xl p-4 flex flex-col gap-3">
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-slate-500" />
                <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Calcular Frete Nacional</span>
              </div>

              <form onSubmit={handleCalculateShipping} className="flex gap-2 w-full">
                <input
                  type="text"
                  required
                  placeholder="Ex: 01001-000"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-left text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
                <button
                  type="submit"
                  disabled={isCalculating}
                  className="bg-slate-900 border border-slate-800 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2 rounded-lg transition-all"
                >
                  {isCalculating ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    'Calcular'
                  )}
                </button>
              </form>

              {shippingResults && (
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 flex flex-col gap-2 mt-1">
                  <div className="flex justify-between items-center text-xs border-b border-b-slate-200 pb-1.5 last:border-0 last:pb-0">
                    <div className="flex flex-col items-start">
                      <span className="font-bold text-slate-800">Fronteira Normal (Correios)</span>
                      <span className="text-[10px] text-slate-400">{shippingResults.daysNormal}</span>
                    </div>
                    <span className="font-bold text-slate-900">
                      R$ {shippingResults.normal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <div className="flex flex-col items-start">
                      <span className="font-bold text-blue-600 flex items-center gap-1">
                        Expresso Especial (Freteiro Direto)
                        <span className="bg-blue-100 text-[8px] text-blue-700 px-1 rounded uppercase tracking-wider">Recomendado</span>
                      </span>
                      <span className="text-[10px] text-slate-400">{shippingResults.daysExpresso}</span>
                    </div>
                    <span className="font-bold text-slate-910">
                      R$ {shippingResults.expresso.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
