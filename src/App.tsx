/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShoppingCart, Trash2, X, Check, MapPin, ListFilter, CreditCard, ChevronRight, Store, AlertCircle } from 'lucide-react';

import { Product, Order, ApprovalRequest, TaxConfig, CartItem } from './types';
import { mockProducts, mockOrders, mockApprovals } from './data';

import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import SearchResultsView from './components/SearchResultsView';
import ProductDetailView from './components/ProductDetailView';
import CourierDashboard from './components/CourierDashboard';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  // Global Profile Navigation Perspectives
  const [profile, setProfile] = useState<'shopper' | 'courier' | 'admin'>('shopper');

  // Shopper Sub-route Navigator (home, results, detail)
  const [shopperRoute, setShopperRoute] = useState<'home' | 'results' | 'detail'>('home');

  // Dynamic products reference
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Cart properties local states
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  // Consolidated database reactive states (links Shopper, Courier, and Admin actions!)
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [approvals, setApprovals] = useState<ApprovalRequest[]>(mockApprovals);
  const [taxConfig, setTaxConfig] = useState<TaxConfig>({ marketplaceFee: 8.0, logisticsFee: 5.0 });

  // 1. Actions logic: Handle Product Selection trigger
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setShopperRoute('detail');
  };

  // 2. Actions logic: Handle Store B2B registration requests (from results screen banner)
  const handleRegisterStoreRequest = (storeName: string, category: string) => {
    const newReg: ApprovalRequest = {
      id: `app-${Date.now()}`,
      name: storeName,
      type: 'LOJA',
      documentId: 'CNPJ: Sob auditoria...',
      detail: `Distribuição de ${category} • CDE`,
      date: 'Hoje, agora há pouco',
      status: 'pending'
    };
    setApprovals((prev) => [newReg, ...prev]);
  };

  // 3. Actions logic: Handle Admin approvals
  const handleApproveValidation = (id: string) => {
    setApprovals((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: 'approved' } : app))
    );
  };

  // 4. Actions logic: Handle Order production state advance (Admin advances order step)
  const handleProgressOrderStatus = (orderId: string) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;
        let nextStatus: Order['status'] = order.status;
        let progress = order.progressPercent || 0;

        if (order.status === 'Pago') {
          nextStatus = 'Aguardando Freteiro';
          progress = 25;
        } else if (order.status === 'Aguardando Freteiro') {
          nextStatus = 'Em Trânsito';
          progress = 65;
        } else if (order.status === 'Em Trânsito') {
          nextStatus = 'Entregue';
          progress = 100;
        }
        return { ...order, status: nextStatus, progressPercent: progress };
      })
    );
  };

  // 5. Actions logic: Handle Courier bidding (Apply to order)
  const handleBidOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          return {
            ...order,
            status: 'Em Trânsito',
            progressPercent: 35,
            courierName: 'Ricardo Silva'
          };
        }
        return order;
      })
    );
  };

  // 6. Shopping Cart management mechanisms
  const handleAddToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const idx = prevCart.findIndex(
        (ci) =>
          ci.product.id === item.product.id &&
          ci.selectedColor === item.selectedColor &&
          ci.selectedCapacity === item.selectedCapacity
      );

      if (idx > -1) {
        const nextCart = [...prevCart];
        nextCart[idx].quantity += item.quantity;
        return nextCart;
      }
      return [...prevCart, item];
    });
  };

  const handleUpdateCartQuantity = (index: number, delta: number) => {
    setCart((prevCart) => {
      const nextCart = [...prevCart];
      const nextQty = nextCart[index].quantity + delta;
      if (nextQty <= 0) {
        nextCart.splice(index, 1);
      } else {
        nextCart[index].quantity = nextQty;
      }
      return nextCart;
    });
  };

  const handleRemoveCartItem = (index: number) => {
    setCart((prevCart) => {
      const nextCart = [...prevCart];
      nextCart.splice(index, 1);
      return nextCart;
    });
  };

  const handleCheckoutSubmit = () => {
    if (cart.length === 0) return;

    // Create real orders corresponding to the checkout!
    const newOrders: Order[] = cart.map((item, idx) => ({
      id: `FR-${Math.floor(1000 + Math.random() * 9000)}`,
      productName: item.product.name,
      origin: 'Ciudad del Este (PY)',
      destination: 'São Paulo, SP (BR)',
      weight: 1.5,
      shippingFee: 145.00,
      totalValue: item.product.price * item.quantity,
      status: 'Pago',
      timeAgo: 'Agora mesmo',
      buyerName: 'Pedro Cavalcanti',
      buyerImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdByCjDLUO_HPHGFdx_f7SO_6Ch71qiNXi7lYD15TiFKRBC_IRsBTM2AzP0xQjLzFzIItX5OBQ5VqpU5EIcY68l3qV4iy2G2fdZdKyncqgy91V0gULO1JXMGIBJ9Vdr0uyRKSHM_kSaKlDpveoN0SNEtXQRgd3-DPugRFPqaALJK8rK14sU5bY11heaXI7q94m8PJ3WsLiOapZuHTQWg3JL03PATYxokSK84vftUkru3EowCqirPym7xs5mZrRETkGML7mVlQaJJ4',
      progressPercent: 12
    }));

    setOrders((prev) => [...newOrders, ...prev]);
    setCart([]);
    setCartOpen(false);
    setCheckoutSuccess(true);
    setTimeout(() => {
      setCheckoutSuccess(false);
    }, 6000);
  };

  // Computed subtotal properties
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartTotalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-600/10 selection:text-blue-600">
      
      {/* Dynamic Overlay Checkout Success Dialogue popup */}
      {checkoutSuccess && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in select-none">
          <div className="bg-white rounded-3xl border border-slate-100 p-8 max-w-md w-full shadow-2xl flex flex-col items-center gap-5 text-center animate-scale-up relative">
            <button
              onClick={() => setCheckoutSuccess(false)}
              className="absolute right-4 top-4 p-1 rounded-full text-slate-400 hover:text-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center border border-green-200 shadow-inner">
              <Check className="w-8 h-8 font-black" />
            </div>
            <div className="flex flex-col gap-1.5">
              <h3 className="text-xl font-black text-slate-900">Compra Confirmada!</h3>
              <p className="text-sm text-slate-500">
                Obrigado por comprar na Fronteira. Seu pagamento foi recebido com sucesso via PIX em Reais aduaneiros.
              </p>
            </div>
            
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-150 text-left w-full flex flex-col gap-2 mt-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 font-bold">Logística</span>
                <span className="font-extrabold text-blue-600">Fronteira Expresso</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 font-bold">Entrega estimada</span>
                <span className="font-bold text-slate-800">3-4 dias úteis</span>
              </div>
              <p className="text-[10px] text-slate-400 font-semibold leading-normal mt-1 border-t border-t-slate-200/80 pt-2">
                *Você pode trocar o perfil no topo para "Freteiro" ou "Admin" para ver e gerenciar sua mercadoria na aduana!
              </p>
            </div>

            <button
              onClick={() => setCheckoutSuccess(false)}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm py-3 rounded-xl transition-all shadow-lg shadow-blue-500/10 mt-2"
            >
              Concluir
            </button>
          </div>
        </div>
      )}

      {/* 1. Header component containing global navigations */}
      <Header
        currentProfile={profile}
        onChangeProfile={(p) => {
          setProfile(p);
          setCartOpen(false);
        }}
        shopperRoute={shopperRoute}
        onChangeShopperRoute={(r) => setShopperRoute(r)}
        onSearch={(q) => {
          setSearchQuery(q);
          setShopperRoute('results');
        }}
        cartCount={cartTotalItemCount}
        onOpenCart={() => setCartOpen(true)}
        searchQuery={searchQuery}
      />

      {/* 2. Main screen layouts render block */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {profile === 'shopper' && (
          <>
            {shopperRoute === 'home' && (
              <HomeView
                onSelectProduct={handleSelectProduct}
                onSearchQuery={(q) => setSearchQuery(q)}
                onNavigateToResults={() => setShopperRoute('results')}
              />
            )}
            
            {shopperRoute === 'results' && (
              <SearchResultsView
                onSelectProduct={handleSelectProduct}
                onRegisterStoreRequest={handleRegisterStoreRequest}
                searchQuery={searchQuery}
              />
            )}

            {shopperRoute === 'detail' && selectedProduct && (
              <ProductDetailView
                product={selectedProduct}
                onBack={() => setShopperRoute('results')}
                onAddToCart={handleAddToCart}
              />
            )}
          </>
        )}

        {profile === 'courier' && (
          <CourierDashboard
            orders={orders}
            onBidOrder={handleBidOrder}
          />
        )}

        {profile === 'admin' && (
          <AdminDashboard
            orders={orders}
            approvals={approvals}
            onApproveValidation={handleApproveValidation}
            taxConfig={taxConfig}
            onUpdateTaxConfig={(cfg) => setTaxConfig(cfg)}
            onProgressOrderStatus={handleProgressOrderStatus}
          />
        )}
      </main>

      {/* 3. Global Footer Component */}
      <Footer currentProfile={profile} />

      {/* 4. Sliding Shopping Cart Drawer element */}
      {cartOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex justify-end animate-fade-in select-none">
          {/* Glass background close helper trigger trigger */}
          <div className="absolute inset-0" onClick={() => setCartOpen(false)}></div>

          {/* Actual slide sheet panel page container container */}
          <div className="bg-white max-w-md w-full h-full shadow-2xl relative z-10 flex flex-col justify-between overflow-hidden animate-slide-left text-left">
            
            {/* Header drawer block */}
            <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <div className="flex items-center gap-2 text-slate-800">
                <ShoppingCart className="w-5 h-5 text-blue-600" />
                <h3 className="font-extrabold text-base">Seu Carrinho</h3>
                <span className="text-xs bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded-full">
                  {cartTotalItemCount} items
                </span>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                title="Fechar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content list block */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
              {cart.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center gap-4 py-12">
                  <ShoppingCart className="w-12 h-12 text-slate-350 stroke-1" />
                  <div className="flex flex-col gap-1">
                    <p className="font-bold text-slate-800 text-sm">Seu carrinho está vazio</p>
                    <p className="text-xs text-slate-400 max-w-[240px]">
                      Navegue pelo catálogo e adicione produtos para prosseguir com seu pedido aduaneiro.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setCartOpen(false);
                      setShopperRoute('results');
                    }}
                    className="bg-blue-600 text-white font-bold text-xs px-4 py-2 rounded-xl"
                  >
                    Navegar por ofertas
                  </button>
                </div>
              ) : (
                cart.map((item, index) => (
                  <div key={index} className="flex gap-4 border border-slate-150 p-4 rounded-2xl text-left bg-slate-50/50 hover:border-slate-300 transition-colors relative group">
                    <button
                      onClick={() => handleRemoveCartItem(index)}
                      className="absolute top-2 right-2 p-1 text-slate-400 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all rounded-full hover:bg-rose-50"
                      title="Deletar item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="w-16 h-16 bg-white border border-slate-100 rounded-xl overflow-hidden p-1 flex items-center justify-center shrink-0">
                      <img src={item.product.image} alt={item.product.name} referrerPolicy="no-referrer" className="max-h-full max-w-full object-contain" />
                    </div>

                    <div className="flex-1 flex flex-col gap-1 pr-6">
                      <h4 className="text-xs font-bold text-slate-900 line-clamp-1 leading-snug">{item.product.name}</h4>
                      <p className="text-[10px] text-slate-400 font-semibold uppercase leading-none">Loja: {item.product.store}</p>
                      
                      {/* Sub selections markers */}
                      {(item.selectedColor || item.selectedCapacity) && (
                        <div className="flex gap-2 mt-1">
                          {item.selectedCapacity && <span className="text-[9px] bg-slate-100 border border-slate-200 font-bold px-1.5 py-0.5 rounded text-slate-600">{item.selectedCapacity}</span>}
                          {item.selectedColor && (
                            <span className="text-[9px] bg-slate-100 border border-slate-200 font-bold px-1.5 py-0.5 rounded text-slate-600 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: item.selectedColor }} />
                              Cor selecionada
                            </span>
                          )}
                        </div>
                      )}

                      {/* Pricing increment/decrements inputs controls panel */}
                      <div className="flex justify-between items-center mt-2 pt-1 border-t border-slate-200/50">
                        <span className="text-xs font-semibold text-blue-600">
                          R$ {item.product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                        
                        <div className="flex items-center text-xs bg-white rounded-lg border border-slate-200/80 p-0.5 scale-90">
                          <button
                            onClick={() => handleUpdateCartQuantity(index, -1)}
                            className="w-5 h-5 flex items-center justify-center hover:bg-slate-50 rounded text-slate-500 font-bold"
                          >
                            -
                          </button>
                          <span className="px-2.5 font-bold text-slate-800">{item.quantity}</span>
                          <button
                            onClick={() => handleUpdateCartQuantity(index, 1)}
                            className="w-5 h-5 flex items-center justify-center hover:bg-slate-50 rounded text-slate-500 font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Bottom calculation pane drawer actions */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-slate-200 bg-slate-50 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold text-slate-400 uppercase">Subtotal</span>
                    <span className="text-[10px] text-slate-400 font-semibold leading-relaxed">Taxas aduaneiras inclusas</span>
                  </div>
                  <span className="text-xl font-black text-slate-900">
                    R$ {cartSubtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="flex flex-col gap-2 mt-1">
                  <button
                    onClick={handleCheckoutSubmit}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm py-4 rounded-xl transition-all shadow-lg shadow-blue-600/20 text-center flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <CreditCard className="w-4 h-4" /> Finalizar Compra via Pix
                  </button>
                  <p className="text-[9px] text-slate-400 text-center leading-normal">
                    Seu pagamento será processado em Reais (BRL). Conversão cambial garantida no momento do fechamento.
                  </p>
                </div>
              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
}
