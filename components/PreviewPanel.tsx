
import React from 'react';
import { RotateCcw, Globe, Shield, Layout, Maximize2, X } from 'lucide-react';

interface PreviewPanelProps {
  appName: string;
  appDescription: string;
  onClose: () => void;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ appName, appDescription, onClose }) => {
  return (
    <div className="flex-1 flex flex-col bg-white border-l shadow-2xl z-10">
      {/* Browser Toolbar */}
      <div className="h-12 bg-slate-100 border-b flex items-center px-4 gap-4 shrink-0">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
        </div>
        
        <div className="flex-1 bg-white border border-slate-200 rounded-md h-8 flex items-center px-3 gap-2 text-xs text-slate-400">
          <Globe size={14} />
          <span className="flex-1">localhost:5173</span>
          <Shield size={12} className="text-green-500" />
        </div>
        
        <div className="flex items-center gap-2">
          <button className="p-1.5 text-slate-400 hover:bg-slate-200 rounded transition-colors">
            <RotateCcw size={16} />
          </button>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500 rounded transition-colors">
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Simulated App Content */}
      <div className="flex-1 overflow-auto bg-slate-50 p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <header className="flex justify-between items-center border-b pb-4">
            <div className="flex items-center gap-2 font-bold text-xl text-slate-900">
              <Layout className="text-indigo-600" />
              {appName}
            </div>
            <nav className="flex gap-4 text-sm font-medium text-slate-600">
              <span className="text-indigo-600 border-b-2 border-indigo-600">Dashboard</span>
              <span>Settings</span>
              <span>Profile</span>
            </nav>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Status</p>
              <h4 className="text-2xl font-bold text-slate-900">Active</h4>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Users</p>
              <h4 className="text-2xl font-bold text-slate-900">1,284</h4>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Performance</p>
              <h4 className="text-2xl font-bold text-green-600">98%</h4>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 text-center space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">Welcome to {appName}</h2>
            <p className="text-slate-500 leading-relaxed max-w-xl mx-auto">
              Your application is running successfully. This is a live preview of the generated interface based on your description: "{appDescription}"
            </p>
            <div className="flex justify-center gap-3 pt-4">
              <button className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
                Get Started
              </button>
              <button className="px-6 py-2 border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all">
                Learn More
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
             <div className="h-40 bg-slate-200/50 animate-pulse rounded-2xl border border-dashed border-slate-300 flex items-center justify-center text-slate-400 text-sm font-medium">
                Component Placeholder
             </div>
             <div className="h-40 bg-slate-200/50 animate-pulse rounded-2xl border border-dashed border-slate-300 flex items-center justify-center text-slate-400 text-sm font-medium">
                Component Placeholder
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewPanel;
