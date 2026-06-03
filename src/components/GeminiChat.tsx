/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, X, Bot, Sparkles } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function GeminiChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Olá! Sou o **Fronteira AI**, seu assistente aduaneiro. Como posso te ajudar com regras de importação do Paraguai ou para escolher produtos hoje?'
    }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || loading) return;

    const userMessageText = messageText;
    setMessageText('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessageText }]);
    setLoading(true);

    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessageText,
          history: messages
        })
      });

      if (response.ok) {
        const data = await response.json();
        setMessages((prev) => [...prev, { role: 'assistant', content: data.response }]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: 'Desculpe, ocorreu um erro ao processar sua pergunta. Por favor, tente novamente.'
          }
        ]);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Não consegui conectar ao servidor de inteligência artificial. Verifique se o backend está rodando.'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Convert markdown bold (**text**) to HTML bold in simple react rendering
  const renderMessageContent = (content: string) => {
    const parts = content.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={idx} className="font-extrabold text-slate-900">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans select-none">
      
      {/* Floating Chat Window */}
      {isOpen && (
        <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-slate-200/80 w-[350px] sm:w-[400px] h-[500px] shadow-2xl flex flex-col overflow-hidden mb-4 animate-scale-up text-left">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-700 to-indigo-900 text-white p-4 flex justify-between items-center shadow">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center border border-white/20 relative shadow-inner">
                <Bot className="w-5 h-5 text-blue-100" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-indigo-900"></span>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-sm flex items-center gap-1.5">
                  Fronteira AI <Sparkles className="w-3 h-3 text-amber-300 fill-amber-300" />
                </span>
                <span className="text-[10px] text-blue-200 font-semibold uppercase tracking-wider">Suporte Aduaneiro Inteligente</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-all cursor-pointer"
              title="Fechar chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages list */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3.5 bg-slate-50/50">
            {messages.map((msg, index) => {
              const isAi = msg.role === 'assistant';
              return (
                <div
                  key={index}
                  className={`flex gap-2 max-w-[85%] ${isAi ? 'self-start text-left' : 'self-end flex-row-reverse text-right'}`}
                >
                  {isAi && (
                    <div className="w-6 h-6 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5 text-blue-600" />
                    </div>
                  )}
                  <div
                    className={`rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                      isAi
                        ? 'bg-white border border-slate-200 text-slate-700 shadow-sm'
                        : 'bg-blue-600 text-white font-medium shadow'
                    }`}
                  >
                    <p className="whitespace-pre-line">{renderMessageContent(msg.content)}</p>
                  </div>
                </div>
              );
            })}
            
            {/* Loading / Typing indicator */}
            {loading && (
              <div className="flex gap-2 self-start max-w-[85%] text-left">
                <div className="w-6 h-6 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-3.5 h-3.5 text-blue-600" />
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl px-4 py-3 flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Form input */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-200 bg-white flex gap-2">
            <input
              type="text"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Pergunte sobre cotas, impostos ou produtos..."
              disabled={loading}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-slate-800"
            />
            <button
              type="submit"
              disabled={loading || !messageText.trim()}
              className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-100 disabled:text-slate-400 text-white p-2.5 rounded-xl transition-all cursor-pointer shadow-md shadow-blue-600/10 shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>
      )}

      {/* Floating Button Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full flex items-center justify-center shadow-xl hover:shadow-blue-500/20 active:scale-95 transition-all hover:scale-105 border border-blue-500/20 cursor-pointer relative"
        title="Assistente de Compras"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 bg-rose-500 w-3.5 h-3.5 rounded-full border border-white flex items-center justify-center text-[7px] font-black text-white animate-pulse">
            1
          </span>
        )}
      </button>

    </div>
  );
}
