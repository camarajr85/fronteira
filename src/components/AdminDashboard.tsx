/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShieldCheck, TrendingUp, Users, Percent, DollarSign, Settings, Gavel, HelpCircle, Check, X, ArrowUpRight, BarChart3, AlertCircle } from 'lucide-react';
import { Order, ApprovalRequest, TaxConfig } from '../types';
import { mockApprovals } from '../data';

interface AdminDashboardProps {
  orders: Order[];
  approvals: ApprovalRequest[];
  onApproveValidation: (id: string) => void;
  taxConfig: TaxConfig;
  onUpdateTaxConfig: (config: TaxConfig) => void;
  onProgressOrderStatus: (orderId: string) => void;
}

export default function AdminDashboard({
  orders,
  approvals,
  onApproveValidation,
  taxConfig,
  onUpdateTaxConfig,
  onProgressOrderStatus
}: AdminDashboardProps) {
  // Sidebar tab options
  const [activeTab, setActiveTab] = useState<'geral' | 'validacoes' | 'taxas' | 'cargas'>('geral');

  // Chart hover interactivity states
  const [hoveredPoint, setHoveredPoint] = useState<{ day: string; value: string; x: number; y: number } | null>(null);

  // Filters for order states inside admin
  const [orderFilter, setOrderFilter] = useState<'Todos' | 'Pago' | 'Aguardando Freteiro' | 'Em Trânsito'>('Todos');

  // Admin stats config
  const stats = [
    { label: 'Volume Geral (GMV)', val: 'R$ 942.800', change: '+14% esta sem.', up: true, icon: DollarSign },
    { label: 'Taxas Arrecadadas', val: 'R$ 84.850', change: 'Marketplace (8%)', up: true, icon: Percent },
    { label: 'Comissão Freteiros', val: 'R$ 64.920', change: 'Rede Logística', up: true, icon: Users },
    { label: 'Taxa de Conversão', val: '4.8%', change: '+0.5% vs ontem', up: true, icon: TrendingUp }
  ];

  // SVG Chart Coordinate datasets
  const chartData = [
    { day: 'Seg', val: 95000, label: 'R$ 95k', x: 40, y: 150 },
    { day: 'Ter', val: 124000, label: 'R$ 124k', x: 120, y: 110 },
    { day: 'Qua', val: 110000, label: 'R$ 110k', x: 200, y: 130 },
    { day: 'Qui', val: 145000, label: 'R$ 145k', x: 280, y: 80 },
    { day: 'Sex', val: 185000, label: 'R$ 185k', x: 360, y: 30 },
    { day: 'Sáb', val: 160000, label: 'R$ 160k', x: 440, y: 60 }
  ];

  const handleSliderChangeMarketplace = (val: number) => {
    onUpdateTaxConfig({ ...taxConfig, marketplaceFee: val });
  };

  const handleSliderChangeLogistics = (val: number) => {
    onUpdateTaxConfig({ ...taxConfig, logisticsFee: val });
  };

  // Nav categories schema
  const navs = [
    { id: 'geral', label: 'Painel Geral', icon: BarChart3 },
    { id: 'validacoes', label: 'Validações', badge: approvals.filter(a => a.status === 'pending').length, icon: ShieldCheck },
    { id: 'taxas', label: 'Parâmetros de Custo', icon: Settings },
    { id: 'cargas', label: 'Gestão de Cargas', icon: Gavel }
  ];

  const filteredOrders = orders.filter(
    (order) => orderFilter === 'Todos' || order.status === orderFilter
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pb-16 text-left animate-fade-in">
      
      {/* 1. Admin navigation widgets shelf */}
      <aside className="lg:col-span-1 flex flex-col gap-5">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col gap-1.5">
          {navs.map((n) => {
            const Icon = n.icon;
            const isSel = activeTab === n.id;
            return (
              <button
                key={n.id}
                onClick={() => setActiveTab(n.id as any)}
                className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  isSel
                    ? 'bg-blue-900 text-white shadow-md shadow-blue-900/15'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{n.label}</span>
                </div>
                {n.badge !== undefined && n.badge > 0 && (
                  <span className={`text-[10px] rounded-full h-5 px-1.5 flex items-center justify-center font-black ${
                    isSel ? 'bg-white text-blue-900' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {n.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-white flex flex-col gap-3">
          <span className="text-[10px] text-blue-400 font-bold uppercase tracking-widest leading-none">Status de Conformidade</span>
          <p className="text-xs text-slate-400 leading-normal">
            Todos os repasses e guias tributárias aduaneiras estão operando sob conformidade com a Instrução Normativa da Receita Federal.
          </p>
          <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden mt-1">
            <div className="w-full h-full bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </aside>

      {/* 2. Admin Content dynamic tabs desk */}
      <section className="lg:col-span-3 flex flex-col gap-8">
        
        {/* ACTIVE PANEL CONTAINER: GERAL */}
        {activeTab === 'geral' && (
          <div className="flex flex-col gap-8">
            {/* Header section metrics title */}
            <div className="text-left px-1">
              <h2 className="text-xl font-black text-slate-900">Visão Geral do Fronteira</h2>
              <p className="text-xs text-slate-500">Monitoramento consolidado de transações aduaneiras e lucros fiscais.</p>
            </div>

            {/* upper grids stats info metrics cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((s, idx) => {
                const Icon = s.icon;
                return (
                  <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col gap-1 text-left relative overflow-hidden group hover:border-blue-500 transition-colors">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">{s.label}</span>
                    <span className="text-xl font-black text-slate-900 mt-1 leading-none">{s.val}</span>
                    <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5 mt-2">
                       {s.change}
                    </span>
                    <div className="absolute right-3 top-3 w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 text-slate-400 group-hover:text-blue-600 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Custom Interactive SVG Line Plot graph */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col gap-4 text-left">
              <div className="flex justify-between items-center px-1 border-b border-slate-100 pb-3">
                <div className="flex flex-col">
                  <h3 className="font-extrabold text-sm text-slate-900">Evolução do Volume Financeiro</h3>
                  <p className="text-[10px] text-slate-400">Análise de vendas diárias consolidadas transfronteiriças</p>
                </div>
                <span className="text-xs text-blue-600 font-bold hover:underline cursor-pointer">Ver relatório completo &gt;</span>
              </div>

              {/* Native coordinates accurate SVG */}
              <div className="relative mt-2">
                <svg viewBox="0 0 500 200" className="w-full h-auto overflow-visible select-none">
                  {/* Grid Lines background lines */}
                  <line x1="20" y1="180" x2="480" y2="180" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="20" y1="130" x2="480" y2="130" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="20" y1="80" x2="480" y2="80" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="20" y1="30" x2="480" y2="30" stroke="#f1f5f9" strokeWidth="1" />

                  {/* Gradient Area projection */}
                  <path
                    d={`M 40 180 L 40 150 L 120 110 L 200 130 L 280 80 L 360 30 L 440 60 L 440 180 Z`}
                    fill="url(#blue-gradient)"
                    opacity="0.12"
                  />

                  {/* Custom continuous vector connecting path link lines */}
                  <path
                    d={`M 40 150 L 120 110 L 200 130 L 280 80 L 360 30 L 440 60`}
                    fill="none"
                    stroke="#1d4ed8"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Custom SVG Gradient definition */}
                  <defs>
                    <linearGradient id="blue-gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2563eb" />
                      <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Interactive Dot Node Markers */}
                  {chartData.map((p) => {
                    const isHovered = hoveredPoint && hoveredPoint.day === p.day;
                    return (
                      <circle
                        key={p.day}
                        cx={p.x}
                        cy={p.y}
                        r={isHovered ? '6.5' : '4.5'}
                        fill={isHovered ? '#1d4ed8' : '#3b82f6'}
                        stroke="#ffffff"
                        strokeWidth="2.5"
                        onMouseEnter={() => setHoveredPoint({ day: p.day, value: p.label, x: p.x, y: p.y })}
                        onMouseLeave={() => setHoveredPoint(null)}
                        className="cursor-pointer transition-all duration-200"
                      />
                    );
                  })}

                  {/* Axis labels tags */}
                  {chartData.map((p) => (
                    <text
                      key={p.day}
                      x={p.x}
                      y="196"
                      textAnchor="middle"
                      className="text-[10px] font-bold fill-slate-400 font-sans"
                    >
                      {p.day}
                    </text>
                  ))}
                </svg>

                {/* SVG interactive coordinate Tooltip hover boxes overlay element */}
                {hoveredPoint && (
                  <div
                    className="absolute bg-slate-900 text-white rounded-lg p-2 shadow border border-slate-700 text-xs font-bold pointer-events-none select-none z-10 animate-scale-up"
                    style={{
                      left: `calc(${(hoveredPoint.x / 500) * 100}% - 36px)`,
                      top: `calc(${(hoveredPoint.y / 200) * 100}% - 40px)`
                    }}
                  >
                    <span className="block text-[8px] text-slate-400 uppercase tracking-widest">{hoveredPoint.day}</span>
                    <span className="font-extrabold text-blue-300">{hoveredPoint.value}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ACTIVE PANEL CONTAINER: VALIDAÇÕES */}
        {activeTab === 'validacoes' && (
          <div className="flex flex-col gap-6 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm text-left">
            <div>
              <h3 className="font-extrabold text-lg text-slate-950">Fila de Validação de Credenciados</h3>
              <p className="text-xs text-slate-500 mt-0.5">Aprovação regulatória de doc. de lojas e transportadores aduaneiros.</p>
            </div>

            {approvals.length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-xs">
                Nenhuma novidade na fila de aprovações pendentes.
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {approvals.map((req) => (
                  <div
                    key={req.id}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border border-slate-100 rounded-2xl hover:border-blue-200 hover:bg-slate-50/50 transition-all gap-4 text-left"
                  >
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2">
                        <span className={`text-[9px] font-black tracking-widest px-2 py-0.5 rounded-full ${
                          req.type === 'LOJA' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {req.type}
                        </span>
                        <h4 className="font-extrabold text-sm text-slate-900">{req.name}</h4>
                      </div>
                      <span className="text-xs text-slate-500 font-medium">{req.documentId} • {req.detail}</span>
                      <span className="text-[10px] text-slate-400 font-semibold">{req.date}</span>
                    </div>

                    <div className="flex gap-2">
                      {req.status === 'approved' ? (
                        <span className="text-xs font-bold text-green-700 bg-green-50 border border-green-200 px-3.5 py-1.5 rounded-xl flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Aprovado Habilitado
                        </span>
                      ) : (
                        <button
                          onClick={() => onApproveValidation(req.id)}
                          className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow shadow-emerald-600/10 cursor-pointer"
                        >
                          Aprovar Parceiro
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ACTIVE PANEL CONTAINER: CONFIGURAÇÃO DE TAXAS */}
        {activeTab === 'taxas' && (
          <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm flex flex-col gap-6 text-left">
            <div>
              <h3 className="font-extrabold text-lg text-slate-950">Ajuste de Alíquotas e Taxas Administrativas</h3>
              <p className="text-xs text-slate-500 mt-0.5">Atualize os parâmetros fiscais e taxas de conveniência da rede e operadoras.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-2">
              
              {/* Marketplace operational slider rate config */}
              <div className="flex flex-col gap-4 border border-slate-100 rounded-2xl p-5 bg-slate-50/50">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-800">Taxa de Operação Fronteira</span>
                  <span className="text-base font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded">
                    {taxConfig.marketplaceFee}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="25"
                  step="0.5"
                  value={taxConfig.marketplaceFee}
                  onChange={(e) => handleSliderChangeMarketplace(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">
                  Esta tarifa administrativa é retida de forma automática de cada transação de liquidação do lojista.
                </p>
              </div>

              {/* Courier compensation slider config */}
              <div className="flex flex-col gap-4 border border-slate-100 rounded-2xl p-5 bg-slate-50/50">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-800">Retenção de Seguridade Logística</span>
                  <span className="text-base font-black text-amber-600 bg-amber-50 px-2.5 py-1 rounded">
                    {taxConfig.logisticsFee}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="15"
                  step="0.5"
                  value={taxConfig.logisticsFee}
                  onChange={(e) => handleSliderChangeLogistics(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">
                  Fração para cobertura de apólices e riscos do carregador. O restante do montante é pago líquido.
                </p>
              </div>

            </div>

            {/* Simulative calculated outputs feedback */}
            <div className="bg-blue-50/50 border border-blue-200 rounded-2xl p-4 flex gap-3 text-xs leading-relaxed text-blue-800">
              <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Efeito Simulado Direto:</span>
                <p className="text-xs text-blue-700/90 mt-1">
                  Com alíquotas de <span className="font-extrabold">{taxConfig.marketplaceFee}%</span> e <span className="font-extrabold">{taxConfig.logisticsFee}%</span>, a arrecadação projetada média por iPhone 15 Pro Max de R$ 6.890 será de <span className="font-extrabold">R$ {((6890 * taxConfig.marketplaceFee) / 100).toLocaleString('pt-BR', { maximumFractionDigits: 0 })}</span> líquidos para o marketplace e <span className="font-extrabold">R$ {((6890 * taxConfig.logisticsFee) / 100).toLocaleString('pt-BR', { maximumFractionDigits: 0 })}</span> sob provisões.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ACTIVE PANEL CONTAINER: GESTÃO DE CARGAS TABLE */}
        {activeTab === 'cargas' && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col gap-6 text-left">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="font-extrabold text-lg text-slate-950">Gestão e Monitoramento de Cargas</h3>
                <p className="text-xs text-slate-500 mt-0.5">Audite o status de todas as cargas e ordens logísticas ativas.</p>
              </div>

              {/* Status categories switches tabs */}
              <div className="flex flex-wrap bg-slate-100 p-1 rounded-xl border border-slate-200 select-none">
                {(['Todos', 'Pago', 'Aguardando Freteiro', 'Em Trânsito'] as any[]).map((filterOpt) => (
                  <button
                    key={filterOpt}
                    onClick={() => setOrderFilter(filterOpt)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      orderFilter === filterOpt ? 'bg-white text-blue-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {filterOpt}
                  </button>
                ))}
              </div>
            </div>

            {/* Orders listing spreadsheet */}
            <div className="overflow-x-auto border border-slate-150 rounded-2xl">
              <table className="w-full text-sm text-left text-slate-600">
                <thead className="text-xs uppercase bg-slate-50 text-slate-400 font-extrabold border-b border-b-slate-100">
                  <tr>
                    <th className="px-4 py-3">Referência</th>
                    <th className="px-4 py-3">Produto</th>
                    <th className="px-4 py-3">Destinatário</th>
                    <th className="px-4 py-3">Valor Total</th>
                    <th className="px-4 py-3">Fase Logística</th>
                    <th className="px-4 py-3 text-right">Controles</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-slate-400 text-xs">Nenhum pedido atualmente correspondente ao filtro.</td>
                    </tr>
                  ) : (
                    filteredOrders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-slate-50/50">
                        <td className="px-4 py-4 font-bold text-blue-600">{ord.id}</td>
                        <td className="px-4 py-4">
                          <div className="flex flex-col text-left">
                            <span className="font-bold text-slate-800">{ord.productName}</span>
                            <span className="text-[10px] text-slate-400">{ord.origin} → {ord.destination.split('(')[0]}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-slate-700 font-medium">{ord.buyerName || 'Consumidor'}</td>
                        <td className="px-4 py-4 font-black">R$ {ord.totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                        <td className="px-4 py-4">
                          <span className={`inline-block px-2 py-0.5 text-[9px] font-black uppercase rounded ${
                            ord.status === 'Pago'
                              ? 'bg-blue-100 text-blue-800'
                              : ord.status === 'Aguardando Freteiro'
                              ? 'bg-rose-100 text-rose-800'
                              : ord.status === 'Em Trânsito'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {ord.status}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-right">
                          <button
                            onClick={() => onProgressOrderStatus(ord.id)}
                            className="text-[10px] font-bold text-blue-600 hover:text-blue-500 border border-slate-200 px-2.5 py-1 rounded bg-slate-50 hover:bg-slate-100 active:scale-95 transition-all text-center leading-none"
                            title="Avançar status da carga de forma simulativa"
                          >
                            Avançar Fase
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </section>

    </div>
  );
}
