/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronRight, Star, ShoppingBag, Truck, Gift, ClipboardCheck, Mail, CheckCircle2, RefreshCw } from 'lucide-react';
import { Product } from '../types';
import { mockProducts, partnerStores, backgroundDeliveryVan } from '../data';

interface HomeViewProps {
  onSelectProduct: (product: Product) => void;
  onSearchQuery: (query: string) => void;
  onNavigateToResults: () => void;
}

export default function HomeView({
  onSelectProduct,
  onSearchQuery,
  onNavigateToResults
}: HomeViewProps) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  
  // Interactive steppers timeline simulation state
  const [timelineProgress, setTimelineProgress] = useState(33); // 33% corresponds to "Aduana"
  const [activeStep, setActiveStep] = useState(1); // 0=CDE, 1=Aduana, 2=CD, 3=Sua Casa

  useEffect(() => {
    // Cycle the timelines progress animatively every 6 seconds
    const interval = setInterval(() => {
      setTimelineProgress((prev) => {
        if (prev === 0) return 33;
        if (prev === 33) return 66;
        if (prev === 66) return 100;
        return 0;
      });
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Sync step indexes for styling triggers
    if (timelineProgress === 0) setActiveStep(0);
    else if (timelineProgress === 33) setActiveStep(1);
    else if (timelineProgress === 66) setActiveStep(2);
    else if (timelineProgress === 100) setActiveStep(3);
  }, [timelineProgress]);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim() !== '') {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
    }
  };

  const handleQuickPurchase = () => {
    onSearchQuery('iPhone 15');
    onNavigateToResults();
  };

  const featured = mockProducts.filter((p) => p.isOffer);

  return (
    <div className="flex flex-col gap-12 pb-16 animate-fade-in">
      {/* 1. Hero Banner Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 to-slate-900 text-white py-12 px-6 sm:px-12 md:py-20 rounded-3xl shadow-xl">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 items-center gap-12 relative z-10">
          <div className="lg:col-span-7 flex flex-col items-start gap-6">
            <span className="inline-block bg-white/10 backdrop-blur-sm hover:bg-white/20 text-blue-100 text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full transition-all border border-white/10">
              Importação Descomplicada
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-none text-left">
              Compras no Paraguai com Entrega Garantida no Brasil.
            </h1>
            <p className="text-base sm:text-lg text-slate-200/90 leading-relaxed font-normal max-w-xl text-left">
              Acesse os melhores preços das maiores lojas de Ciudad del Este sem sair de casa. Nós cuidamos de toda a logística e frete aduaneiro para você.
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              <button
                onClick={handleQuickPurchase}
                className="bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-semibold text-sm px-6 py-3.5 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-blue-600/30"
              >
                Começar a Comprar <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="#como-funciona"
                className="border border-white/25 hover:bg-white/10 active:scale-95 text-white font-semibold text-sm px-6 py-3.5 rounded-xl transition-all"
              >
                Como Funciona
              </a>
            </div>
          </div>

          <div className="hidden md:block lg:col-span-5 relative max-w-md mx-auto w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <img
              src={backgroundDeliveryVan}
              alt="Fronteira Logística Especializada"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-xl transition-transform duration-700 hover:scale-105"
            />
            {/* Embedded glass stats overlay */}
            <div className="absolute bottom-4 left-4 right-4 bg-slate-900/70 backdrop-blur-md rounded-xl p-3 border border-white/10 flex items-center justify-between text-left">
              <div>
                <span className="text-[10px] text-blue-300 font-bold uppercase tracking-wider">Trâmite aduaneiro</span>
                <p className="text-xs text-white font-semibold font-sans">Apoio fiscal legalizado</p>
              </div>
              <div className="px-2 py-1 bg-green-500/25 text-green-300 text-[10px] font-bold rounded">
                100% Homologado
              </div>
            </div>
          </div>
        </div>

        {/* Decorative background gradients */}
        <div className="absolute top-1/2 -left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
      </section>

      {/* 2. Lojas Parceiras Section */}
      <section className="py-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="max-w-7xl mx-auto flex flex-col gap-6 text-center">
          <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-slate-500">
            Compre nas Lojas Mais Confiáveis
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-16 opacity-75 hover:opacity-100 transition-opacity duration-300">
            {partnerStores.map((store, index) => (
              <div
                key={index}
                className="flex flex-col items-center hover:scale-105 transition-all cursor-pointer group"
                onClick={() => {
                  onSearchQuery('iPhone 15');
                  onNavigateToResults();
                }}
              >
                <span className="text-lg sm:text-xl font-black text-slate-800 tracking-tight group-hover:text-blue-600 transition-colors">
                  {store.name}
                </span>
                <span className="text-[9px] font-extrabold tracking-widest text-slate-400 group-hover:text-blue-400 transition-colors uppercase">
                  {store.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Featured Products / Ofertas em Destaque */}
      <section className="flex flex-col gap-6">
        <div className="flex justify-between items-end gap-4 px-1">
          <div className="text-left">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
              Ofertas em Destaque
            </h2>
            <p className="text-sm text-slate-500">
              Preços convertidos em Reais com taxas de importação inclusas.
            </p>
          </div>
          <button
            onClick={() => {
              onSearchQuery('iPhone 15');
              onNavigateToResults();
            }}
            className="text-blue-600 font-semibold text-sm flex items-center gap-1 hover:underline group"
          >
            Ver tudo <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Dynamic products list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-slate-200 hover:border-blue-500 rounded-2xl overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col h-full text-left relative"
            >
              {/* Product Store Badge Tag */}
              <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-md z-10">
                {product.store}
              </span>

              {/* Product Visual Container */}
              <div className="relative aspect-square overflow-hidden bg-slate-50 border-b border-slate-100 flex items-center justify-center p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500 p-2"
                />
                
                {product.offerTag && (
                  <span className="absolute bottom-3 right-3 bg-blue-50 border border-blue-200 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded">
                    {product.offerTag}
                  </span>
                )}
              </div>

              {/* Product Core Detail block */}
              <div className="p-5 flex flex-col justify-between flex-1 gap-4">
                <div className="flex flex-col gap-1">
                  <h3 className="text-sm font-semibold text-slate-800 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 mt-1 text-slate-500">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0" />
                    <span className="text-xs font-semibold text-slate-700">{product.rating}</span>
                    <span className="text-[10px] text-slate-400">({product.reviewsCount} reviews)</span>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex flex-col">
                    <span className="text-lg font-extrabold text-blue-600 leading-none">
                      R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                    {product.oldPrice && (
                      <span className="text-xs text-slate-400 line-through mt-1">
                        R$ {product.oldPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => onSelectProduct(product)}
                    className="w-full border-2 border-slate-200 hover:border-blue-600 hover:bg-blue-600 hover:text-white text-slate-700 py-2 rounded-xl text-xs font-bold transition-all"
                  >
                    Ver Detalhes
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Como Funciona Section (Bento Grid) */}
      <section id="como-funciona" className="py-12 bg-slate-100 rounded-3xl p-6 sm:p-10 border border-slate-200/60 flex flex-col gap-10">
        <div className="text-center max-w-2xl mx-auto flex flex-col gap-2">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
            Como Funciona o Fronteira
          </h2>
          <p className="text-sm sm:text-base text-slate-500">
            Simplificamos sua jornada de compra internacional com tecnologia moderna e uma rede logística integrada e confiável.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Step 1 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col items-center text-center gap-4 hover:border-blue-500 hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shadow-inner shrink-0">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div className="flex flex-col gap-1.5">
              <h3 className="font-bold text-base text-slate-900">1. Escolha</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Navegue pelos produtos das maiores lojas do Paraguai em nossa plataforma unificada e adicione ao carrinho.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col items-center text-center gap-4 hover:border-blue-500 hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shadow-inner shrink-0">
              <Gift className="w-6 h-6" />
            </div>
            <div className="flex flex-col gap-1.5">
              <h3 className="font-bold text-base text-slate-900">2. Pagamento</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Pague em Reais via PIX ou Cartão sem taxas ocultas. Cuidamos do câmbio e do recolhimento de impostos.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col items-center text-center gap-4 hover:border-blue-500 hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shadow-inner shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div className="flex flex-col gap-1.5">
              <h3 className="font-bold text-base text-slate-900">3. Freteiro</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Um transportador credenciado retira sua mercadoria em CDE e realiza o despacho aduaneiro com rapidez.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col items-center text-center gap-4 hover:border-blue-500 hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shadow-inner shrink-0">
              <ClipboardCheck className="w-6 h-6" />
            </div>
            <div className="flex flex-col gap-1.5">
              <h3 className="font-bold text-base text-slate-900">4. Entrega</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                A encomenda é postada no Brasil e entregue na sua casa com código de rastreio em tempo real.
              </p>
            </div>
          </div>
        </div>

        {/* Dynamic logistics timeline cycle simulation (Breathtaking micro-interaction!) */}
        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm text-left flex flex-col gap-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-600"></div>
          <div className="flex justify-between items-center gap-2 px-1">
            <div className="flex items-center gap-2 text-sm text-slate-800 font-bold">
              <RefreshCw className="w-4 h-4 text-blue-600 animate-spin_slow duration-1000" />
              <span>Simulação de Trânsito em Tempo Real</span>
            </div>
            <span className="text-[10px] bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded uppercase">
              Rastreamento Ativo
            </span>
          </div>

          {/* Linear tracking path */}
          <div className="relative mt-4 mb-2">
            {/* Background line track */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-100 -translate-y-1/2 rounded-full"></div>
            {/* Active filled line track */}
            <div
              className="absolute top-1/2 left-0 h-1 bg-blue-600 -translate-y-1/2 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${timelineProgress}%` }}
            ></div>

            {/* Stepper points */}
            <div className="relative flex justify-between items-center">
              {/* Point 1 */}
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border-2 transition-all duration-500 ${
                    activeStep >= 0
                      ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20'
                      : 'bg-white border-slate-200 text-slate-400'
                  }`}
                >
                  {activeStep > 0 ? '✓' : '1'}
                </div>
                <span className={`text-xs font-bold ${activeStep >= 0 ? 'text-blue-600' : 'text-slate-400'}`}>
                  Ciudad del Este
                </span>
                <span className="text-[10px] text-slate-400 leading-none">Origem / Retirada</span>
              </div>

              {/* Point 2 */}
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border-2 transition-all duration-500 ${
                    activeStep >= 1
                      ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20'
                      : 'bg-white border-slate-200 text-slate-400'
                  }`}
                >
                  {activeStep > 1 ? '✓' : '2'}
                </div>
                <span className={`text-xs font-bold ${activeStep >= 1 ? 'text-blue-600' : 'text-slate-400'}`}>
                  Aduana
                </span>
                <span className="text-[10px] text-slate-400 leading-none">Desembaraço Fiscal</span>
              </div>

              {/* Point 3 */}
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border-2 transition-all duration-500 ${
                    activeStep >= 2
                      ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20'
                      : 'bg-white border-slate-200 text-slate-400'
                  }`}
                >
                  {activeStep > 2 ? '✓' : '3'}
                </div>
                <span className={`text-xs font-bold ${activeStep >= 2 ? 'text-blue-600' : 'text-slate-400'}`}>
                  Distribuição
                </span>
                <span className="text-[10px] text-slate-400 leading-none">Triagem Nacional</span>
              </div>

              {/* Point 4 */}
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border-2 transition-all duration-500 ${
                    activeStep >= 3
                      ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20'
                      : 'bg-white border-slate-200 text-slate-400'
                  }`}
                >
                  {activeStep > 3 ? '✓' : '4'}
                </div>
                <span className={`text-xs font-bold ${activeStep >= 3 ? 'text-blue-600' : 'text-slate-400'}`}>
                  Sua Casa
                </span>
                <span className="text-[10px] text-slate-400 leading-none">Entrega Final</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Newsletter Banner / CTA */}
      <section className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 text-center text-white flex flex-col gap-6 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto flex flex-col gap-3">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Pronto para sua próxima importação?
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Cadastre-se para receber cotações cambiais e as melhores ofertas exclusivas das maiores lojas do Paraguai diretamente no seu e-mail.
          </p>
        </div>

        {newsletterSubscribed ? (
          <div className="max-w-md mx-auto p-4 bg-blue-950/50 border border-blue-700/50 rounded-2xl flex items-center gap-3 text-left">
            <CheckCircle2 className="w-8 h-8 text-blue-400 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-white">Inscrição realizada com sucesso!</p>
              <p className="text-xs text-slate-400 mt-0.5">Fique atento à sua caixa de entrada para novidades.</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto w-full relative z-10">
            <input
              type="email"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Digite seu melhor e-mail"
              className="flex-1 bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-sm text-left"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 active:scale-95 text-white py-3 px-6 rounded-xl font-bold text-sm transition-all shadow-md shadow-blue-600/10 shrink-0"
            >
              Inscrever
            </button>
          </form>
        )}

        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
      </section>
    </div>
  );
}
