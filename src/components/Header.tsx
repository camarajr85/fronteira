/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, ShoppingCart, User, Bell, Shield, Menu, LogOut } from 'lucide-react';

interface HeaderProps {
  currentProfile: 'shopper' | 'courier' | 'admin';
  onChangeProfile: (profile: 'shopper' | 'courier' | 'admin') => void;
  shopperRoute: 'home' | 'results' | 'detail' | 'orders' | 'login';
  onChangeShopperRoute: (route: 'home' | 'results' | 'detail' | 'orders' | 'login') => void;
  onSearch: (query: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  searchQuery: string;
  currentUser: { id: string; email: string; name: string; role: 'shopper' | 'courier' | 'admin'; documentId?: string; avatar?: string } | null;
  onLogout: () => void;
}

export default function Header({
  currentProfile,
  onChangeProfile,
  shopperRoute,
  onChangeShopperRoute,
  onSearch,
  cartCount,
  onOpenCart,
  searchQuery,
  currentUser,
  onLogout
}: HeaderProps) {
  const [localQuery, setLocalQuery] = useState(searchQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(localQuery);
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo & Profile Links */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => {
              onChangeProfile('shopper');
              onChangeShopperRoute('home');
              setLocalQuery('');
            }}
            className="font-extrabold text-xl sm:text-2xl tracking-tight text-blue-600 hover:opacity-90 active:scale-95 transition-all text-left"
          >
            Fronteira<span className="text-slate-900 font-semibold text-lg sm:text-xl ml-1">Marketplace</span>
          </button>

          {/* Shopper Mode Navigation - Desktop */}
          {currentProfile === 'shopper' && (
            <nav className="hidden md:flex items-center gap-4">
              <button
                onClick={() => onChangeShopperRoute('home')}
                className={`font-medium text-sm transition-colors ${
                  shopperRoute === 'home'
                    ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                    : 'text-slate-500 hover:text-blue-600'
                }`}
              >
                Categorias
              </button>
              <button
                onClick={() => onChangeShopperRoute('orders')}
                className={`font-medium text-sm transition-colors ${
                  shopperRoute === 'orders'
                    ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                    : 'text-slate-500 hover:text-blue-600'
                }`}
              >
                Meus Pedidos
              </button>
              <button
                onClick={() => onChangeProfile('courier')}
                className="font-medium text-sm text-slate-500 hover:text-blue-600 transition-colors"
              >
                Área do Freteiro
              </button>
              <button
                onClick={() => onChangeProfile('admin')}
                className="font-medium text-sm text-slate-500 hover:text-blue-600 transition-colors"
              >
                Painel Admin
              </button>
            </nav>
          )}

          {/* Courier Navigation Indicator */}
          {currentProfile === 'courier' && (
            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-amber-50 rounded-full border border-amber-200">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              <span className="text-xs font-semibold text-amber-700">Modo Freteiro Ativo</span>
            </div>
          )}

          {/* Admin Navigation Indicator */}
          {currentProfile === 'admin' && (
            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-indigo-50 rounded-full border border-indigo-200">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
              <span className="text-xs font-semibold text-indigo-700">Modo Administrador Ativo</span>
            </div>
          )}
        </div>

        {/* Search Bar - Client Mode only */}
        {currentProfile === 'shopper' ? (
          <form onSubmit={handleSubmit} className="hidden lg:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <input
                type="text"
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                placeholder="O que você está procurando no Paraguai? (Ex: iPhone 15)"
                className="w-full bg-slate-50 border border-slate-200 rounded-full py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400 text-slate-900"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors">
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>
        ) : (
          <div className="hidden lg:block text-sm text-slate-500 italic">
            {currentProfile === 'courier' ? 'Portal de Monitoramento e Logs' : 'Painel de Custos, Taxas e Auditorias'}
          </div>
        )}

        {/* Global Action Keys */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Quick Profile Shortcuts */}
          <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 select-none">
            <button
              onClick={() => {
                onChangeProfile('shopper');
                onChangeShopperRoute('home');
              }}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                currentProfile === 'shopper'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Cliente
            </button>
            <button
              onClick={() => onChangeProfile('courier')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                currentProfile === 'courier'
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'text-slate-600 hover:text-amber-500'
              }`}
            >
              Freteiro
            </button>
            <button
              onClick={() => onChangeProfile('admin')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                currentProfile === 'admin'
                  ? 'bg-blue-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-blue-900'
              }`}
            >
              Admin
            </button>
          </div>

          {/* Cart triggers */}
          {currentProfile === 'shopper' && (
            <button
              onClick={onOpenCart}
              className="p-2 text-slate-500 hover:text-blue-600 rounded-full hover:bg-slate-50 transition-colors relative"
              title="Ver Carrinho"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          )}

          {/* Universal Notification toggle */}
          <button className="p-2 text-slate-500 hover:text-blue-600 rounded-full hover:bg-slate-50 transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 bg-emerald-500 rounded-full h-1.5 w-1.5"></span>
          </button>

          {/* User Profile Info & Logout */}
          {currentUser ? (
            <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
              <div className="hidden md:flex flex-col items-end">
                <span className="text-xs font-bold text-slate-900 leading-tight">{currentUser.name}</span>
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">{currentUser.role === 'admin' ? 'Administrador' : currentUser.role === 'courier' ? 'Freteiro' : 'Cliente'}</span>
              </div>
              <img
                src={currentUser.avatar || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdByCjDLUO_HPHGFdx_f7SO_6Ch71qiNXi7lYD15TiFKRBC_IRsBTM2AzP0xQjLzFzIItX5OBQ5VqpU5EIcY68l3qV4iy2G2fdZdKyncqgy91V0gULO1JXMGIBJ9Vdr0uyRKSHM_kSaKlDpveoN0SNEtXQRgd3-DPugRFPqaALJK8rK14sU5bY11heaXI7q94m8PJ3WsLiOapZuHTQWg3JL03PATYxokSK84vftUkru3EowCqirPym7xs5mZrRETkGML7mVlQaJJ4'}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover border border-slate-200"
              />
              <button
                onClick={onLogout}
                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-all cursor-pointer"
                title="Sair"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                onChangeProfile('shopper');
                onChangeShopperRoute('login');
              }}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md shadow-blue-500/10 cursor-pointer flex items-center gap-1.5"
            >
              Entrar
            </button>
          )}
        </div>
      </div>

      {/* Sub-Header Mobile Search bar trigger */}
      {currentProfile === 'shopper' && (
        <div className="lg:hidden px-4 pb-3 border-t border-slate-100 pt-3">
          <form onSubmit={handleSubmit} className="relative w-full">
            <input
              type="text"
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              placeholder="O que você procura? (Ex: iPhone 15)"
              className="w-full bg-slate-50 border border-slate-200 rounded-full py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-slate-900"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors">
              <Search className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </header>
  );
}
