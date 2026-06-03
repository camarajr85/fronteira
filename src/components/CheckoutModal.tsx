/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, MapPin, CreditCard, Check, AlertCircle, Copy } from 'lucide-react';
import { CartItem, TaxConfig } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  taxConfig: TaxConfig;
  onSubmit: (shippingDetails: { address: string; recipientName: string }) => void;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  taxConfig,
  onSubmit
}: CheckoutModalProps) {
  const [step, setStep] = useState<'address' | 'payment'>('address');
  
  // Form fields
  const [recipientName, setRecipientName] = useState('');
  const [cep, setCep] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const cartSubtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  
  // Calculate dynamic fees
  const marketplaceFeeVal = (cartSubtotal * taxConfig.marketplaceFee) / 100;
  const logisticsFeeVal = (cartSubtotal * taxConfig.logisticsFee) / 100;
  
  // fixed shipping per item or base rate
  const shippingFee = 145.00; 
  const totalValue = cartSubtotal + marketplaceFeeVal + logisticsFeeVal + shippingFee;

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText('00020101021226870014br.gov.bcb.pix2565fronteiramarketplacepixkey1235204000053039865407' + totalValue.toFixed(2) + '5802BR5925Fronteira Marketplace6009Sao Paulo62070503***6304CA7F');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePaymentConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const fullAddress = `${street}, ${number} ${complement ? `- ${complement}` : ''}, ${neighborhood}, ${city} - ${state} (CEP: ${cep})`;
      onSubmit({ address: fullAddress, recipientName });
      setStep('address'); // Reset state
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 select-none animate-fade-in">
      <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 max-w-xl w-full shadow-2xl flex flex-col gap-5 text-left relative animate-scale-up max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-slate-950">
          <CreditCard className="w-5 h-5 text-blue-600" />
          <h3 className="text-xl font-black">Finalizar Compra</h3>
        </div>

        {/* Stepper tracker */}
        <div className="flex items-center bg-slate-50 p-1.5 rounded-2xl border border-slate-200/80">
          <div
            className={`flex-1 py-2 text-center text-xs font-black rounded-xl transition-all ${
              step === 'address' ? 'bg-white text-blue-600 shadow-sm border border-slate-200' : 'text-slate-400'
            }`}
          >
            1. Endereço de Entrega
          </div>
          <div
            className={`flex-1 py-2 text-center text-xs font-black rounded-xl transition-all ${
              step === 'payment' ? 'bg-white text-blue-600 shadow-sm border border-slate-200' : 'text-slate-400'
            }`}
          >
            2. Pagamento PIX
          </div>
        </div>

        {step === 'address' ? (
          <form onSubmit={handleAddressSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Nome do Destinatário</label>
              <input
                type="text"
                required
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder="Ex: João da Silva"
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs w-full text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-semibold"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">CEP</label>
                <input
                  type="text"
                  required
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                  placeholder="00000-000"
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs w-full text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-semibold"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Bairro</label>
                <input
                  type="text"
                  required
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  placeholder="Ex: Centro"
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs w-full text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-semibold"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Rua / Logradouro</label>
                <input
                  type="text"
                  required
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder="Ex: Av. Paulista"
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs w-full text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-semibold"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Número</label>
                <input
                  type="text"
                  required
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  placeholder="123"
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs w-full text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-semibold"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Complemento</label>
                <input
                  type="text"
                  value={complement}
                  onChange={(e) => setComplement(e.target.value)}
                  placeholder="Ex: Apto 45, Bloco B"
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs w-full text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-semibold"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Estado</label>
                <input
                  type="text"
                  required
                  maxLength={2}
                  value={state}
                  onChange={(e) => setState(e.target.value.toUpperCase())}
                  placeholder="SP"
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs w-full text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-center font-semibold animate-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Cidade</label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Ex: São Paulo"
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs w-full text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-semibold"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs py-3.5 rounded-xl transition-all shadow-md shadow-blue-600/10 flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              Avançar para o Pagamento
            </button>
          </form>
        ) : (
          <div className="flex flex-col gap-5">
            {/* Payment instructions */}
            <div className="flex flex-col md:flex-row items-center gap-6 p-4 bg-slate-50 border border-slate-150 rounded-2xl">
              {/* Fake QR Code */}
              <div className="w-28 h-28 bg-white border border-slate-200 rounded-xl flex items-center justify-center p-2 shrink-0">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=00020101021226870014br.gov.bcb.pix2565fronteiramarketplacepixkey12352040000530398654070.005802BR5925Fronteira%20Marketplace6009Sao%20Paulo62070503***6304CA7F"
                  alt="QR Code PIX Simulado"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex-1 flex flex-col gap-2">
                <span className="text-[10px] bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded w-max">PIX Copia e Cola</span>
                <p className="text-xs text-slate-500 leading-normal">
                  Escaneie o código ao lado ou clique no botão abaixo para copiar a chave PIX e realizar o pagamento no aplicativo do seu banco.
                </p>
                <button
                  onClick={handleCopyPix}
                  className="flex items-center gap-1.5 text-xs text-blue-600 font-bold hover:underline self-start cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  {copied ? 'Chave Copiada!' : 'Copiar chave PIX'}
                </button>
              </div>
            </div>

            {/* Calculations review */}
            <div className="flex flex-col border border-slate-150 p-4 bg-slate-50/50 rounded-2xl text-xs gap-2">
              <div className="flex justify-between">
                <span className="text-slate-400 font-semibold">Subtotal dos Produtos</span>
                <span className="font-bold text-slate-800">R$ {cartSubtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-semibold">Desembaraço Aduaneiro ({taxConfig.marketplaceFee}%)</span>
                <span className="font-bold text-slate-800">R$ {marketplaceFeeVal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-semibold">Taxa Logística ({taxConfig.logisticsFee}%)</span>
                <span className="font-bold text-slate-800">R$ {logisticsFeeVal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-semibold">Frete Fronteira Expresso</span>
                <span className="font-bold text-slate-800">R$ {shippingFee.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="h-[1px] bg-slate-200 my-1"></div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-800 font-bold">Total Geral</span>
                <span className="font-black text-blue-600">R$ {totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>

            {/* Notice */}
            <div className="flex gap-2 p-3.5 bg-amber-50 border border-amber-100 text-[10px] text-amber-700 font-semibold rounded-xl leading-normal">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>
                Simulação: Ao clicar em "Confirmar Pagamento", o sistema registrará seu pagamento fictício e gerará as DARFs correspondentes para visualização do Administrador e do Freteiro.
              </span>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-1">
              <button
                onClick={() => setStep('address')}
                className="flex-1 border border-slate-200 text-slate-600 font-bold text-xs py-3 rounded-xl hover:bg-slate-50 transition-all text-center cursor-pointer"
              >
                Voltar
              </button>
              <button
                onClick={handlePaymentConfirm}
                disabled={loading}
                className="flex-[2] bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-extrabold text-xs py-3 rounded-xl transition-all shadow-md shadow-blue-600/10 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {loading ? 'Confirmando...' : 'Confirmar Pagamento'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
