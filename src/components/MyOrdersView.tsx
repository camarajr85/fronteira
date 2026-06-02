/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Package, MapPin, Truck, CheckCircle2, ChevronLeft, RefreshCw, Clock } from 'lucide-react';
import { Order } from '../types';

interface MyOrdersViewProps {
  orders: Order[];
  onBack: () => void;
  onRefresh: () => void;
  isRefreshing: boolean;
}

export default function MyOrdersView({
  orders,
  onBack,
  onRefresh,
  isRefreshing
}: MyOrdersViewProps) {
  // Client order simulation (looks for orders with Pedro Cavalcanti or similar buyer name)
  const clientOrders = orders.filter(
    (o) => o.buyerName === 'Pedro Cavalcanti' || o.timeAgo === 'Agora mesmo'
  );

  const getStatusStep = (status: Order['status']) => {
    switch (status) {
      case 'Pago': return 1;
      case 'Aguardando Freteiro': return 2;
      case 'Em Trânsito': return 3;
      case 'Entregue': return 4;
      default: return 1;
    }
  };

  const steps = [
    { label: 'Pago', desc: 'Aguardando liberação' },
    { label: 'Aguardando Freteiro', desc: 'Coleta pendente CDE' },
    { label: 'Em Trânsito', desc: 'Cruzando a fronteira' },
    { label: 'Entregue', desc: 'Destino final' }
  ];

  return (
    <div className="flex flex-col gap-8 pb-16 animate-fade-in text-left">
      {/* Header bar and back */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-semibold text-sm transition-all group w-fit"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Voltar para o catálogo</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold text-xs border border-slate-200 bg-white hover:bg-slate-50 rounded-xl px-3 py-2 transition-all cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Atualizar Pedidos</span>
          </button>
          
          <span className="text-xs bg-blue-100 text-blue-700 font-bold px-3 py-1.5 rounded-xl border border-blue-200">
            {clientOrders.length} Pedidos Ativos
          </span>
        </div>
      </div>

      <div className="text-left">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Meus Pedidos Aduaneiros</h1>
        <p className="text-sm text-slate-500 mt-1">Acompanhe em tempo real o trâmite aduaneiro de suas compras no Paraguai até a entrega no Brasil.</p>
      </div>

      {clientOrders.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center flex flex-col items-center gap-4">
          <Package className="w-16 h-16 text-slate-300 stroke-1" />
          <div className="flex flex-col gap-1.5">
            <h3 className="font-bold text-base text-slate-800">Você não possui pedidos ainda</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Navegue pelas ofertas, adicione itens ao carrinho e conclua sua compra para iniciar o trâmite logístico transfronteiriço.
            </p>
          </div>
          <button
            onClick={onBack}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all shadow-md shadow-blue-500/10 mt-2"
          >
            Começar a comprar
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {clientOrders.map((order) => {
            const currentStep = getStatusStep(order.status);
            return (
              <div key={order.id} className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col gap-6 hover:border-slate-350 transition-colors">
                
                {/* Upper info: ID, Date, Total */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
                  <div className="flex flex-col text-left">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-black text-blue-600">{order.id}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                        order.status === 'Pago'
                          ? 'bg-blue-100 text-blue-800'
                          : order.status === 'Aguardando Freteiro'
                          ? 'bg-rose-100 text-rose-800'
                          : order.status === 'Em Trânsito'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> Realizado {order.timeAgo}
                    </span>
                  </div>

                  <div className="flex flex-col items-start sm:items-end text-left sm:text-right">
                    <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wide">Total da Compra</span>
                    <span className="text-lg font-black text-slate-900 mt-0.5">
                      R$ {order.totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                {/* Main product visual and location tracker */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  
                  {/* Left product detail */}
                  <div className="md:col-span-4 flex items-center gap-4 text-left">
                    <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-xl p-1 flex items-center justify-center shrink-0">
                      <Package className="w-6 h-6 text-slate-400 stroke-1" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-950 line-clamp-2 leading-snug">{order.productName}</h4>
                      <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Peso estimado: {order.weight} kg</p>
                    </div>
                  </div>

                  {/* Middle routing details */}
                  <div className="md:col-span-4 flex gap-4 text-xs font-semibold text-slate-600 justify-start md:justify-center items-center">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                      <div>
                        <span className="block text-[8px] text-slate-400 uppercase tracking-widest leading-none">Origem</span>
                        <span className="font-bold">{order.origin}</span>
                      </div>
                    </div>
                    <span>→</span>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                      <div>
                        <span className="block text-[8px] text-slate-400 uppercase tracking-widest leading-none">Destino</span>
                        <span className="font-bold">{order.destination.split('(')[0]}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right courier assignee profile */}
                  <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 flex items-center gap-3">
                    {order.courierName ? (
                      <>
                        {order.courierImage ? (
                          <img src={order.courierImage} alt={order.courierName} referrerPolicy="no-referrer" className="w-9 h-9 rounded-full object-cover border border-amber-300" />
                        ) : (
                          <div className="w-9 h-9 bg-amber-50 border border-amber-200 text-amber-700 font-bold rounded-full flex items-center justify-center text-xs">
                            {order.courierName[0]}
                          </div>
                        )}
                        <div className="flex flex-col text-left">
                          <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wide">Freteiro Alocado</span>
                          <span className="text-xs font-bold text-slate-800">{order.courierName}</span>
                          <span className="text-[10px] text-emerald-600 font-medium">Declaração Aduaneira Ativa</span>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col text-left">
                        <span className="text-[9px] text-rose-500 font-extrabold uppercase tracking-wide">Aguardando Freteiro</span>
                        <span className="text-xs text-slate-500 leading-normal mt-0.5">Sua mercadoria está na fila para coleta por um transportador credenciado.</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Progress Stepper Timeline layout */}
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                  <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-4 relative">
                    
                    {/* Stepper progress path link line - Desktop */}
                    <div className="hidden md:block absolute top-4 left-[10%] right-[10%] h-[2px] bg-slate-200 -z-10"></div>
                    <div
                      className="hidden md:block absolute top-4 left-[10%] h-[2px] bg-blue-600 -z-10 transition-all duration-700 ease-out"
                      style={{ width: `${Math.max(0, (currentStep - 1) * 26.6)}%` }}
                    ></div>

                    {steps.map((step, idx) => {
                      const stepNum = idx + 1;
                      const isCompleted = stepNum < currentStep;
                      const isActive = stepNum === currentStep;
                      const isPending = stepNum > currentStep;

                      return (
                        <div key={idx} className="flex md:flex-col items-center md:items-center gap-3 md:gap-2 flex-1 md:text-center text-left">
                          {/* Dot Circle */}
                          <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold z-10 transition-all duration-500 ${
                            isCompleted
                              ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/10'
                              : isActive
                              ? 'bg-white border-blue-600 text-blue-600 ring-4 ring-blue-600/10 scale-105'
                              : 'bg-white border-slate-200 text-slate-400'
                          }`}>
                            {isCompleted ? '✓' : stepNum}
                          </div>
                          
                          {/* Label descriptions */}
                          <div className="flex flex-col md:items-center text-left md:text-center gap-0.5">
                            <span className={`text-xs font-bold ${isActive || isCompleted ? 'text-slate-900' : 'text-slate-400'}`}>
                              {step.label}
                            </span>
                            <span className="text-[10px] text-slate-400">{step.desc}</span>
                          </div>
                        </div>
                      );
                    })}

                  </div>
                </div>

                {/* Support notification advice */}
                <p className="text-[10px] text-slate-400 font-semibold leading-relaxed border-t border-slate-100 pt-4 flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-blue-500" />
                  <span>
                    Dica de Teste: Faça Logout e entre com o perfil <b>Admin</b> ou <b>Freteiro</b> para gerenciar este pedido ({order.id}) e vê-lo avançar na timeline reativamente!
                  </span>
                </p>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
