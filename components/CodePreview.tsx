
import React, { useState, useEffect } from 'react';
import { File, Folder, Code2, Terminal as TerminalIcon, Play, Download, Copy, Check, Eye } from 'lucide-react';
import { ProjectFile } from '../types';
import Terminal from './Terminal';
import PreviewPanel from './PreviewPanel';

interface CodePreviewProps {
  files: ProjectFile[];
  appName: string;
  appDescription: string;
}

const CodePreview: React.FC<CodePreviewProps> = ({ files, appName, appDescription }) => {
  const [selectedPath, setSelectedPath] = useState<string>(files[0]?.path || '');
  const [copied, setCopied] = useState(false);
  const [showTerminal, setShowTerminal] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    'Welcome to Lovable Dev Environment v1.0.0',
    'Ready to build your application.'
  ]);

  const selectedFile = files.find(f => f.path === selectedPath);

  const addLog = (msg: string) => {
    setLogs(prev => [...prev, msg]);
  };

  const simulateBoot = async () => {
    setShowTerminal(true);
    addLog('> npm run dev');
    addLog('sh: vite: checking dependencies...');
    await new Promise(r => setTimeout(r, 800));
    addLog('info  - [vite] starting development server...');
    await new Promise(r => setTimeout(r, 1200));
    addLog('success - ready in 1.4s');
    addLog('info  - Local: http://localhost:5173');
    addLog('info  - Network: use --host to expose');
    setShowPreview(true);
  };

  const handleCommand = (cmd: string) => {
    addLog(`> ${cmd}`);
    
    if (cmd === 'clear') {
      setLogs([]);
      return;
    }
    
    if (cmd === 'ls') {
      files.forEach(f => addLog(f.path));
      return;
    }

    if (cmd === 'npm install') {
      addLog('fetching packages...');
      addLog('[############--------] 64% complete');
      setTimeout(() => addLog('success - installed 420 packages.'), 1500);
      return;
    }

    if (cmd === 'npm run dev') {
      simulateBoot();
      return;
    }

    addLog(`command not found: ${cmd}`);
  };

  const copyToClipboard = () => {
    if (selectedFile) {
      navigator.clipboard.writeText(selectedFile.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex h-full flex-1 overflow-hidden bg-white">
      {/* File Explorer Sidebar */}
      <div className="w-64 border-r bg-slate-50/50 flex flex-col shrink-0">
        <div className="p-3 border-b flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Explorer</span>
          <Folder size={14} className="text-slate-400" />
        </div>
        <div className="flex-1 overflow-y-auto py-2">
          {files.map((file) => (
            <button
              key={file.path}
              onClick={() => setSelectedPath(file.path)}
              className={`w-full text-left px-4 py-1.5 text-sm flex items-center gap-2.5 transition-colors ${
                selectedPath === file.path 
                  ? 'bg-indigo-50 text-indigo-600 border-r-2 border-indigo-600 font-medium' 
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <File size={16} className={selectedPath === file.path ? 'text-indigo-600' : 'text-slate-400'} />
              <span className="truncate">{file.path}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Area (Editor or Preview) */}
      <div className="flex-1 flex overflow-hidden">
        {/* Editor Area */}
        <div className={`flex-1 flex flex-col min-w-0 bg-slate-900 transition-all ${showPreview ? 'w-1/2' : 'w-full'}`}>
          {/* Editor Toolbar */}
          <div className="h-10 bg-slate-800 flex items-center justify-between px-4 border-b border-slate-700">
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-slate-400 flex items-center gap-2">
                <Code2 size={14} />
                {selectedPath}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={copyToClipboard}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors"
              >
                {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
              </button>
              <button className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors">
                <Download size={14} />
              </button>
              <div className="w-[1px] h-4 bg-slate-700 mx-1"></div>
              <button 
                onClick={simulateBoot}
                className="flex items-center gap-1.5 px-3 py-1 bg-green-600 hover:bg-green-500 text-white rounded text-[11px] font-bold transition-all"
              >
                <Play size={10} fill="currentColor" />
                RUN APP
              </button>
            </div>
          </div>

          {/* Code Content */}
          <div className="flex-1 overflow-auto p-4 font-mono text-sm">
            <pre className="text-slate-300 leading-relaxed whitespace-pre-wrap">
              {selectedFile?.content || '// No file selected'}
            </pre>
          </div>

          {/* Terminal Toggle / Info Bar */}
          <div className="h-8 bg-slate-800 border-t border-slate-700 flex items-center px-4 gap-4 text-xs font-medium text-slate-400">
            <span className="flex items-center gap-1.5 text-green-400">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              Vite Ready
            </span>
            <button 
              onClick={() => setShowTerminal(!showTerminal)}
              className={`flex items-center gap-1.5 hover:text-white transition-colors ${showTerminal ? 'text-white' : ''}`}
            >
              <TerminalIcon size={12} />
              Terminal
            </button>
            <button 
              onClick={() => setShowPreview(!showPreview)}
              className={`flex items-center gap-1.5 hover:text-white transition-colors ${showPreview ? 'text-white' : ''}`}
            >
              <Eye size={12} />
              Preview
            </button>
            <span className="ml-auto">Ln 1, Col 1</span>
          </div>

          <Terminal 
            isOpen={showTerminal} 
            logs={logs} 
            onCommand={handleCommand} 
          />
        </div>

        {/* Browser Preview Window */}
        {showPreview && (
          <PreviewPanel 
            appName={appName} 
            appDescription={appDescription} 
            onClose={() => setShowPreview(false)} 
          />
        )}
      </div>
    </div>
  );
};

export default CodePreview;
