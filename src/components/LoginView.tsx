/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShoppingBag, Truck, ShieldAlert, Key, LogIn, ChevronRight } from 'lucide-react';

interface LoginViewProps {
  onLogin: (profile: 'shopper' | 'courier' | 'admin') => void;
}

export default function LoginView({ onLogin }: LoginViewProps) {
  const [selectedRole, setSelectedRole] = useState<'shopper' | 'courier' | 'admin'>('shopper');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'admin' && password !== 'admin123') {
      setError('Senha incorreta para Administrador. Dica: use "admin123"');
      return;
    }
    if (selectedRole === 'courier' && password !== 'freteiro123') {
      setError('Senha incorreta para Freteiro. Dica: use "freteiro123"');
      return;
    }
    // Shopper login has no password restriction in this simulated prototype
    onLogin(selectedRole);
  };

  const roles = [
    {
      id: 'shopper',
      title: 'Cliente (Comprador)',
      description: 'Acesse o catálogo das maiores lojas do Paraguai e compre com entrega garantida no Brasil.',
      icon: ShoppingBag,
      color: 'border-blue-500 text-blue-600 bg-blue-50/40',
      badge: 'B2C'
    },
    {
      id: 'courier',
      title: 'Freteiro (Courier)',
      description: 'Gerencie cargas de travessia, verifique seus ganhos logísticos e declare mercadorias na aduana.',
      icon: Truck,
      color: 'border-amber-500 text-amber-600 bg-amber-50/40',
      badge: 'Logística'
    },
    {
      id: 'admin',
      title: 'Administrador (Fronteira)',
      description: 'Audite a fila de cadastros de lojas, ajuste alíquotas operacionais e gerencie a evolução de cargas.',
      icon: ShieldAlert,
      color: 'border-indigo-500 text-indigo-600 bg-indigo-50/40',
      badge: 'Auditoria'
    }
  ];

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 select-none">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white border border-slate-200 p-8 sm:p-12 rounded-3xl shadow-xl animate-scale-up text-left">
        
        {/* Left branding information */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <img src="/assets/logo.png" alt="Fronteira Logo" className="w-12 h-12 object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              <h1 className="font-extrabold text-3xl tracking-tight text-blue-600">
                Fronteira<span className="text-slate-900 font-semibold text-2xl ml-1">Marketplace</span>
              </h1>
            </div>
            <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider mt-1">Conexão comercial Brasil-Paraguai</p>
          </div>
          
          <div className="h-[2px] bg-slate-100 w-24"></div>
          
          <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
            Bem-vindo à plataforma de comércio e desembaraço aduaneiro. Por favor, selecione seu perfil de atuação para entrar no sistema e iniciar as atividades.
          </p>
          
          <div className="flex flex-col gap-3 text-xs text-slate-400 font-semibold mt-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              <span>Visualização do Catálogo Real B2C</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              <span>Gerenciador de Fretes e Payouts</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
              <span>Moderação e Controle de Imposto DARF</span>
            </div>
          </div>
        </div>

        {/* Right selection & credentials block */}
        <form onSubmit={handleLogin} className="flex flex-col gap-6 border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-8">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-black text-slate-950">Selecione seu Perfil</h2>
            <p className="text-xs text-slate-400">Escolha como você deseja acessar a plataforma hoje.</p>
          </div>

          {/* Roles Selector list */}
          <div className="flex flex-col gap-3">
            {roles.map((role) => {
              const Icon = role.icon;
              const isSelected = selectedRole === role.id;
              return (
                <div
                  key={role.id}
                  onClick={() => {
                    setSelectedRole(role.id as any);
                    setError('');
                  }}
                  className={`border rounded-2xl p-4 cursor-pointer transition-all flex gap-4 items-start ${
                    isSelected
                      ? `${role.color} ring-2 ring-blue-600/10 shadow-md`
                      : 'border-slate-200 hover:border-slate-350 hover:bg-slate-50/50'
                  }`}
                >
                  <div className={`p-2 rounded-xl border ${isSelected ? 'bg-white border-transparent' : 'bg-slate-50 text-slate-400'} shrink-0`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 flex flex-col gap-0.5">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-none">{role.title}</h3>
                      <span className="text-[9px] font-black uppercase tracking-wider bg-white/80 border border-slate-200 px-1.5 py-0.5 rounded text-slate-500 scale-90">{role.badge}</span>
                    </div>
                    <p className="text-[10px] sm:text-xs text-slate-400 leading-normal mt-1">{role.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Conditional passwords credentials input segment */}
          {selectedRole !== 'shopper' && (
            <div className="flex flex-col gap-2.5 animate-slide-up border border-slate-150 p-4 bg-slate-50/50 rounded-2xl">
              <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                <label className="flex items-center gap-1"><Key className="w-3.5 h-3.5" /> Senha de Simulação</label>
                <button
                  type="button"
                  onClick={() => {
                    setPassword(selectedRole === 'admin' ? 'admin123' : 'freteiro123');
                    setError('');
                  }}
                  className="text-blue-600 hover:underline cursor-pointer lowercase first-letter:uppercase"
                >
                  Preencher padrão
                </button>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder={selectedRole === 'admin' ? 'Senha do admin (admin123)' : 'Senha do freteiro (freteiro123)'}
                className="bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm w-full text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-semibold"
              />
            </div>
          )}

          {error && (
            <p className="text-xs text-rose-600 bg-rose-50 border border-rose-100 p-3 rounded-xl font-bold leading-normal animate-shake">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-extrabold text-sm py-4 rounded-xl transition-all shadow-lg shadow-blue-500/20 text-center flex items-center justify-center gap-2 cursor-pointer"
          >
            Entrar no Fronteira <ChevronRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
