/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShoppingBag, Truck, ShieldAlert, Key, LogIn, ChevronRight, User, Mail, UserPlus, Info } from 'lucide-react';

interface LoginViewProps {
  onLogin: (user: { id: string; email: string; name: string; role: 'shopper' | 'courier' | 'admin'; documentId?: string; avatar?: string }) => void;
}

export default function LoginView({ onLogin }: LoginViewProps) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'shopper' | 'courier' | 'admin'>('shopper');
  
  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [documentId, setDocumentId] = useState('');
  const [detail, setDetail] = useState('');

  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Erro ao realizar login');
      }

      localStorage.setItem('fronteira_session', JSON.stringify({ token: data.token, user: data.user }));
      onLogin(data.user);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    // Basic validation
    if (selectedRole === 'admin') {
      setError('Não é permitido cadastrar novos Administradores por aqui.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          name,
          role: selectedRole,
          documentId: selectedRole === 'courier' ? documentId : '',
          detail: selectedRole === 'courier' ? detail : ''
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Erro ao cadastrar usuário');
      }

      setSuccessMsg(
        selectedRole === 'courier'
          ? 'Cadastro enviado! Seu perfil de freteiro precisa ser aprovado pelo Administrador antes do login.'
          : 'Cadastro realizado com sucesso! Faça login abaixo.'
      );
      setIsRegistering(false);
      setPassword(''); // Clear password
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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
              <h1 className="font-extrabold text-3xl tracking-tight text-blue-600">
                Fronteira<span className="text-slate-900 font-semibold text-2xl ml-1">Marketplace</span>
              </h1>
            </div>
            <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider mt-1">Conexão comercial Brasil-Paraguai</p>
          </div>
          
          <div className="h-[2px] bg-slate-100 w-24"></div>
          
          <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
            Bem-vindo à plataforma de comércio e desembaraço aduaneiro. Por favor, crie uma conta ou faça login no seu perfil de atuação para entrar no sistema.
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
        <div className="flex flex-col gap-6 border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-8">
          {/* Tabs for Login vs Register */}
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => {
                setIsRegistering(false);
                setError('');
                setSuccessMsg('');
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                !isRegistering ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" /> Entrar
            </button>
            <button
              onClick={() => {
                setIsRegistering(true);
                setError('');
                setSuccessMsg('');
                if (selectedRole === 'admin') setSelectedRole('shopper'); // Reset role from admin
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                isRegistering ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" /> Cadastrar-se
            </button>
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-black text-slate-950">
              {isRegistering ? 'Criar Nova Conta' : 'Selecione seu Perfil'}
            </h2>
            <p className="text-xs text-slate-400">
              {isRegistering
                ? 'Preencha os campos abaixo para fazer parte da plataforma.'
                : 'Escolha como você deseja acessar a plataforma hoje.'}
            </p>
          </div>

          {/* Roles Selector list */}
          <div className="flex flex-col gap-2.5">
            {roles
              .filter((role) => !isRegistering || role.id !== 'admin') // Hide admin role during registration
              .map((role) => {
                const Icon = role.icon;
                const isSelected = selectedRole === role.id;
                return (
                  <div
                    key={role.id}
                    onClick={() => {
                      setSelectedRole(role.id as any);
                      setError('');
                    }}
                    className={`border rounded-2xl p-3 cursor-pointer transition-all flex gap-3 items-start ${
                      isSelected
                        ? `${role.color} ring-2 ring-blue-600/10 shadow-sm`
                        : 'border-slate-200 hover:border-slate-350 hover:bg-slate-50/50'
                    }`}
                  >
                    <div className={`p-1.5 rounded-xl border ${isSelected ? 'bg-white border-transparent' : 'bg-slate-50 text-slate-400'} shrink-0`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 flex flex-col gap-0.5">
                      <div className="flex justify-between items-center">
                        <h3 className="text-xs font-extrabold text-slate-900 leading-none">{role.title}</h3>
                        <span className="text-[8px] font-black uppercase tracking-wider bg-white/80 border border-slate-200 px-1 py-0.5 rounded text-slate-500 scale-90">{role.badge}</span>
                      </div>
                      <p className="text-[10px] text-slate-400 leading-tight mt-0.5">{role.description}</p>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* Login or Register Form */}
          <form onSubmit={isRegistering ? handleRegister : handleLogin} className="flex flex-col gap-4">
            {isRegistering && (
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1">
                  <User className="w-3.5 h-3.5" /> Nome Completo
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome"
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm w-full text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-semibold"
                />
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" /> E-mail
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu.email@exemplo.com"
                className="bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm w-full text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-semibold"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                <label className="flex items-center gap-1"><Key className="w-3.5 h-3.5" /> Senha</label>
                {!isRegistering && selectedRole !== 'shopper' && (
                  <button
                    type="button"
                    onClick={() => {
                      setEmail(selectedRole === 'admin' ? 'admin@fronteira.com' : 'freteiro@fronteira.com');
                      setPassword(selectedRole === 'admin' ? 'admin123' : 'freteiro123');
                      setError('');
                    }}
                    className="text-blue-600 hover:underline cursor-pointer lowercase first-letter:uppercase"
                  >
                    Usar padrão
                  </button>
                )}
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm w-full text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-semibold"
              />
            </div>

            {/* Courier Specific Fields on Registration */}
            {isRegistering && selectedRole === 'courier' && (
              <div className="flex flex-col gap-3.5 p-4 bg-slate-50 border border-slate-150 rounded-2xl animate-slide-up">
                <div className="flex items-center gap-1.5 text-amber-600">
                  <Info className="w-4 h-4 shrink-0" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Dados Logísticos do Freteiro</span>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-extrabold text-slate-500 uppercase">CNH / Placa do Veículo</label>
                  <input
                    type="text"
                    required
                    value={documentId}
                    onChange={(e) => setDocumentId(e.target.value)}
                    placeholder="Ex: CNH 123456 • Placa AAA-0A00"
                    className="bg-white border border-slate-250 rounded-xl px-3 py-2 text-xs w-full text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-semibold"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-extrabold text-slate-500 uppercase">Área / Veículo de atuação</label>
                  <input
                    type="text"
                    required
                    value={detail}
                    onChange={(e) => setDetail(e.target.value)}
                    placeholder="Ex: Moto Py-Br • Ciudad del Este local"
                    className="bg-white border border-slate-250 rounded-xl px-3 py-2 text-xs w-full text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-semibold"
                  />
                </div>
              </div>
            )}

            {error && (
              <p className="text-xs text-rose-600 bg-rose-50 border border-rose-100 p-3 rounded-xl font-bold leading-normal animate-shake">
                {error}
              </p>
            )}

            {successMsg && (
              <p className="text-xs text-emerald-600 bg-emerald-50 border border-emerald-100 p-3 rounded-xl font-bold leading-normal">
                {successMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 active:scale-95 text-white font-extrabold text-sm py-3.5 rounded-xl transition-all shadow-lg shadow-blue-500/20 text-center flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                'Carregando...'
              ) : isRegistering ? (
                <>Criar Cadastro <ChevronRight className="w-4 h-4" /></>
              ) : (
                <>Entrar no Fronteira <ChevronRight className="w-4 h-4" /></>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
