
import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, ChevronRight } from 'lucide-react';

interface TerminalProps {
  logs: string[];
  onCommand: (cmd: string) => void;
  isOpen: boolean;
}

const Terminal: React.FC<TerminalProps> = ({ logs, onCommand, isOpen }) => {
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onCommand(input.trim());
      setInput('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="h-48 bg-slate-950 border-t border-slate-800 flex flex-col font-mono text-sm">
      <div className="flex items-center gap-2 px-4 py-1 bg-slate-900 border-b border-slate-800 text-slate-400">
        <TerminalIcon size={12} />
        <span className="text-[10px] font-bold uppercase tracking-wider">Terminal</span>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-1 scrollbar-hide"
      >
        {logs.map((log, i) => (
          <div key={i} className="whitespace-pre-wrap leading-relaxed">
            {log.startsWith('>') ? (
              <span className="text-indigo-400">{log}</span>
            ) : log.includes('error') ? (
              <span className="text-red-400">{log}</span>
            ) : log.includes('success') || log.includes('ready') ? (
              <span className="text-green-400">{log}</span>
            ) : (
              <span className="text-slate-300">{log}</span>
            )}
          </div>
        ))}
        
        <form onSubmit={handleSubmit} className="flex items-center gap-2 text-slate-300">
          <span className="text-indigo-500 font-bold">➜</span>
          <span className="text-cyan-400">project</span>
          <span className="text-slate-500 font-bold mx-[-4px] tracking-tighter">❯</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent outline-none border-none p-0 focus:ring-0"
            autoFocus
          />
        </form>
      </div>
    </div>
  );
};

export default Terminal;
