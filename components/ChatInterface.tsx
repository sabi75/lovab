
import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User, Bot, Loader2 } from 'lucide-react';
import { ChatMessage } from '../types';

interface ChatInterfaceProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  isGenerating: boolean;
  status: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, onSendMessage, isGenerating, status }) => {
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isGenerating) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 border-r w-[400px]">
      <div className="p-4 border-b bg-white">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-indigo-100 text-indigo-600 rounded-lg">
            <Sparkles size={18} />
          </div>
          <h2 className="font-semibold text-slate-900">AI Architect</h2>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white border text-slate-600'
            }`}>
              {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>
            <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
              msg.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-none' 
                : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}

        {isGenerating && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-white border text-indigo-600 animate-pulse">
              <Sparkles size={16} />
            </div>
            <div className="bg-white text-slate-700 border border-slate-100 p-3 rounded-2xl rounded-tl-none text-sm shadow-sm flex items-center gap-3">
              <Loader2 className="animate-spin text-indigo-600" size={16} />
              <span className="font-medium">{status || 'Thinking...'}</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t">
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isGenerating}
            placeholder="Describe your app or request changes..."
            className="w-full pl-4 pr-12 py-3 bg-slate-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
          />
          <button 
            type="submit"
            disabled={!input.trim() || isGenerating}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg disabled:opacity-50 transition-all"
          >
            <Send size={18} />
          </button>
        </form>
        <p className="mt-2 text-[10px] text-center text-slate-400">
          Tip: Be specific about features, pages, and data models.
        </p>
      </div>
    </div>
  );
};

export default ChatInterface;
