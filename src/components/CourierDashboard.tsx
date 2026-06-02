/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Shield, ShieldAlert, CheckCircle2, TrendingUp, Package, Truck, Wallet, FileText, HelpCircle, Check, Play, RefreshCw, MapPin } from 'lucide-react';
import { Order } from '../types';
import { mockOrders, courierAvatar } from '../data';

interface CourierDashboardProps {
  orders: Order[];
  onBidOrder: (orderId: string) => void;
}

export default function CourierDashboard({
  orders,
  onBidOrder
}: CourierDashboardProps) {
  // Sidebar active nav indicator
  const [activeNav, setActiveNav] = useState<'disponiveis' | 'minhas' | 'financeiro' | 'docs'>('disponiveis');

  // Interactive local candidate state map to track bid actions [orderId: boolean]
  const [candidateStates, setCandidateStates] = useState<Record<string, 'none' | 'loading' | 'success'>>({});

  const handleApplyBid = (orderId: string) => {
    setCandidateStates((prev) => ({ ...prev, [orderId]: 'loading' }));
    
    setTimeout(() => {
      setCandidateStates((prev) => ({ ...prev, [orderId]: 'success' }));
      onBidOrder(orderId);
    }, 1200);
  };

  // Nav menus lists
  const navItems = [
    { id: 'disponiveis', label: 'Cargas Disponíveis', icon: Package },
    { id: 'minhas', label: 'Minhas Entregas', icon: Truck },
    { id: 'financeiro', label: 'Extrato Financeiro', icon: Wallet },
    { id: 'docs', label: 'Regulamentos & Termos', icon: FileText }
  ];

  // Static profile details
  const totalEarnings = 14280.50;
  const deliveryCount = 124;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pb-16 text-left animate-fade-in">
      
      {/* 1. Dashboard left navigation column */}
      <aside className="lg:col-span-1 flex flex-col gap-6">
        
        {/* Profile Card and verified chip */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col items-center text-center gap-4">
          <div className="relative">
            <img
              src={courierAvatar}
              alt="Ricardo Silva"
              referrerPolicy="no-referrer"
              className="w-16 h-16 rounded-full object-cover border-2 border-amber-400"
            />
            <span className="absolute bottom-0 right-0 bg-emerald-500 rounded-full text-white p-1 shadow-sm border border-white">
              <Check className="w-3 h-3 text-white font-bold" />
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <h3 className="font-bold text-base text-slate-900">Ricardo Silva</h3>
            <span className="text-[10px] bg-amber-100 text-amber-700 font-bold px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center justify-center gap-1.5 w-fit mx-auto select-none border border-amber-200">
              <Shield className="w-3 h-3" /> Freteiro Credenciado
            </span>
          </div>

          {/* Core Metrics */}
          <div className="grid grid-cols-2 gap-3 w-full border-t border-slate-100 pt-4 mt-2">
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-slate-400 font-extrabold uppercase">Ganhos</span>
              <span className="text-sm font-black text-slate-900">R$ {totalEarnings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-slate-400 font-extrabold uppercase">Entregas</span>
              <span className="text-sm font-black text-slate-900">{deliveryCount} Realizadas</span>
            </div>
          </div>
        </div>

        {/* Sidebar Nav Buttons */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col gap-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id as any)}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-amber-500 text-white shadow-md shadow-amber-500/15'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

      </aside>

      {/* 2. Main Work Content pane */}
      <section className="lg:col-span-3 flex flex-col gap-6">
        
        {/* Upper credential checklists banner */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="font-extrabold text-base text-slate-900">Status do Cadastro de Transportador</h2>
            <p className="text-xs text-slate-500">Seu perfil está apto a coletar eletrônicos de alto valor na aduana fiscal.</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <span className="text-[10px] bg-green-50 text-green-700 font-medium px-2 py-1 rounded-md border border-green-200 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-600" /> CNPJ Verificado
            </span>
            <span className="text-[10px] bg-green-50 text-green-700 font-medium px-2 py-1 rounded-md border border-green-200 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-600" /> CNH D/E Válida
            </span>
          </div>
        </div>

        {/* ACTIVE MENU CONTAINER: Cargas Disponíveis */}
        {activeNav === 'disponiveis' && (
          <div className="flex flex-col gap-5">
            <div className="flex justify-between items-center px-1">
              <h3 className="font-extrabold text-lg text-slate-950">Solicitações de Coleta Prontas para Coleta</h3>
              <span className="text-xs bg-slate-100 text-slate-600 font-bold px-2.5 py-1 rounded">
                {orders.filter(o => o.status === 'Pago' || o.status === 'Aguardando Freteiro').length} ordens disponíveis
              </span>
            </div>

            {orders.filter(o => o.status === 'Pago' || o.status === 'Aguardando Freteiro').length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center flex flex-col items-center gap-4">
                <ShieldAlert className="w-12 h-12 text-amber-500" />
                <div className="flex flex-col gap-1">
                  <h4 className="font-bold text-slate-900">Nenhuma carga disponível no momento</h4>
                  <p className="text-xs text-slate-400">Todos os pedidos atuais já possuem freteiros alocados no sistema central.</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {orders
                  .filter(o => o.status === 'Pago' || o.status === 'Aguardando Freteiro')
                  .map((order) => {
                    const candidateStatus = candidateStates[order.id] || 'none';
                    return (
                      <div
                        key={order.id}
                        className="bg-white border border-slate-200 rounded-2xl overflow-hidden p-5 flex flex-col justify-between gap-5 hover:border-amber-500 transition-all shadow-sm"
                      >
                        {/* Upper Header: ID & Price bid payout */}
                        <div className="flex justify-between items-start gap-2">
                          <div className="flex flex-col text-left">
                            <span className="text-[10px] text-blue-600 font-bold tracking-wider">{order.id}</span>
                            <h4 className="font-bold text-sm text-slate-800 line-clamp-1">{order.productName}</h4>
                          </div>
                          <div className="flex flex-col items-end text-right">
                            <span className="text-[10px] text-slate-400 uppercase font-bold">Comissão de frete</span>
                            <span className="text-base font-black text-amber-600">R$ {order.shippingFee.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                          </div>
                        </div>

                        {/* Middle track info */}
                        <div className="border-t border-b border-dashed border-slate-200 py-3 flex gap-4 text-xs font-semibold text-slate-600">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span>Paraguai: CDE</span>
                          </div>
                          <span>→</span>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span>Brasil: {order.destination.split('(')[0]}</span>
                          </div>
                        </div>

                        {/* Lower footer actions: candidates check */}
                        <div className="flex justify-between items-center gap-4">
                          <div className="flex flex-col text-left text-[10px] font-semibold text-slate-500">
                            <span>Mercadoria de R$ {order.totalValue.toLocaleString('pt-BR')}</span>
                            <span>Peso estimado: {order.weight} kg</span>
                          </div>

                          {candidateStatus === 'success' ? (
                            <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1 shadow-sm select-none">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Candidatado
                            </div>
                          ) : (
                            <button
                              onClick={() => handleApplyBid(order.id)}
                              disabled={candidateStatus === 'loading'}
                              className="bg-amber-500 hover:bg-amber-400 active:scale-95 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-md shadow-amber-500/10 flex items-center gap-1.5 cursor-pointer"
                            >
                              {candidateStatus === 'loading' ? (
                                <>
                                  <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Processando...
                                </>
                              ) : (
                                <>
                                  <Play className="w-3.5 h-3.5 fill-current" /> Candidatar-se
                                </>
                              )}
                            </button>
                          )}
                        </div>

                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        )}

        {/* ACTIVE MENU CONTAINER: Minhas Entregas */}
        {activeNav === 'minhas' && (
          <div className="flex flex-col gap-5 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <h3 className="font-extrabold text-lg text-slate-950">Histórico e Entregas em Andamento</h3>
            
            {orders.filter(o => o.status === 'Em Trânsito' || o.status === 'Entregue').length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-xs">
                Nenhum frete ativo alocado ao seu perfil. Candidate-se em "Cargas Disponíveis".
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-slate-600">
                  <thead className="text-xs uppercase bg-slate-50 text-slate-400 font-extrabold border-b border-b-slate-100">
                    <tr>
                      <th className="px-4 py-3">Código</th>
                      <th className="px-4 py-3">Produto</th>
                      <th className="px-4 py-3">Destino</th>
                      <th className="px-4 py-3">Taxa Logística</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders
                      .filter(o => o.status === 'Em Trânsito' || o.status === 'Entregue')
                      .map((ord) => (
                        <tr key={ord.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                          <td className="px-4 py-3 font-bold text-blue-600">{ord.id}</td>
                          <td className="px-4 py-3 text-slate-800">{ord.productName}</td>
                          <td className="px-4 py-3 font-bold">{ord.destination}</td>
                          <td className="px-4 py-3 font-black text-amber-600">R$ {ord.shippingFee.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                          <td className="px-4 py-3.5">
                            <span className={`inline-block px-2.5 py-1 text-[10px] font-bold rounded-lg ${
                              ord.status === 'Em Trânsito'
                                ? 'bg-amber-100 text-amber-700'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}>
                              {ord.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ACTIVE MENU CONTAINER: Extrato Financeiro */}
        {activeNav === 'financeiro' && (
          <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm flex flex-col gap-6">
            <h3 className="font-extrabold text-lg text-slate-950">Painel de Pagamentos e Recebíveis</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-150">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Saldo a Liberar</span>
                <p className="text-xl font-black text-slate-900 mt-1">R$ 1.850,00</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Disponível em 48h pós entrega</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-150">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Saldo Disponível</span>
                <p className="text-xl font-black text-emerald-600 mt-1">R$ {totalEarnings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Pronto para saque imediato via Pix</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-150 flex flex-col justify-between">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Canal de Repasse</span>
                <button className="bg-slate-950 text-white font-bold text-xs py-1.5 px-3 rounded-lg hover:bg-slate-800 transition-colors shrink-0 mt-3">
                  Solicitar Saque Pix
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ACTIVE MENU CONTAINER: Regulamentos */}
        {activeNav === 'docs' && (
          <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm flex flex-col gap-4 text-xs leading-relaxed text-slate-600">
            <h3 className="font-extrabold text-lg text-slate-950">Políticas de Trâmite Aduaneiro 2026</h3>
            <p>
              Para atuar legalmente na travessia da aduana do aeroporto ou aduana terrestre Brasil-Paraguai, certifique-se de preencher a DBA (Declaração de Bagagem Acompanhada) eletrônica do cliente.
            </p>
            <p className="font-semibold text-slate-800 mt-2">
              Importante: respeite o limite legal e as cotas isentas de imposto sobre importação (U$ 500 para travessia terrestre e U$ 1.000 aérea).
            </p>
            <p>
              A Fronteira recolhe integralmente e de forma automática no ato do checkout do cliente todo o imposto exigido de forma legalizada, gerando a DARF devida para apresentação fiscal eletrônica diretamente no seu app.
            </p>
          </div>
        )}

      </section>

    </div>
  );
}
