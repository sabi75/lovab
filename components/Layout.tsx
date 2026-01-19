
import React from 'react';
import { Layout as LayoutIcon, Rocket, Github, Settings, Plus, Code2 } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="h-16 border-b bg-white flex items-center justify-between px-6 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
            <LayoutIcon size={22} />
          </div>
          <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
            Lovable Clone
          </span>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <a href="#/" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Projects</a>
          <a href="#/templates" className="text-sm font-medium text-slate-400 cursor-not-allowed">Templates</a>
          <a href="#/docs" className="text-sm font-medium text-slate-400 cursor-not-allowed">Docs</a>
        </nav>

        <div className="flex items-center gap-4">
          <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
            <Settings size={20} />
          </button>
          <button className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-all shadow-md active:scale-95">
            <Plus size={18} />
            <span>New App</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>

      {/* Footer */}
      <footer className="h-12 border-t bg-white flex items-center justify-between px-6 text-xs text-slate-400">
        <div>© 2024 Lovable Clone Builder • Built with Gemini 3 Pro</div>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-slate-600">Privacy</a>
          <a href="#" className="hover:text-slate-600">Terms</a>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span>System Operational</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
