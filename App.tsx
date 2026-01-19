
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Layout from './components/Layout';
import ProjectCard from './components/ProjectCard';
import ChatInterface from './components/ChatInterface';
import CodePreview from './components/CodePreview';
import { Project, ChatMessage, GenerationState } from './types';
import { generateAppCode } from './services/geminiService';
import { 
  Plus, Search, Filter, Sparkles, AlertCircle, X, 
  LayoutDashboard, Share2, ShoppingBag, Users, 
  ChevronRight, Laptop, Database, Zap,
  Image, PenTool, Video, MessageSquare, Code, Wallet
} from 'lucide-react';

const APP_TEMPLATES = [
  {
    id: 'saas',
    name: 'Modern SaaS Dashboard',
    icon: <LayoutDashboard size={24} />,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    description: 'Build a high-performance SaaS dashboard with multi-tenant architecture, real-time analytics, team management, and integrated billing workflows.',
    complexity: 'Advanced'
  },
  {
    id: 'ai-image',
    name: 'AI Image Studio',
    icon: <Image size={24} />,
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
    description: 'Launch an AI image generation platform with DALL-E/Midjourney style interface, prompt history, community gallery, and credit-based billing.',
    complexity: 'Advanced'
  },
  {
    id: 'ai-writer',
    name: 'AI Content Suite',
    icon: <PenTool size={24} />,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    description: 'Develop an AI writing assistant with specialized templates for SEO blogs, social ads, and email sequences, featuring tone analysis and plagiarism checks.',
    complexity: 'Intermediate'
  },
  {
    id: 'ai-video',
    name: 'AI Video Gen SaaS',
    icon: <Video size={24} />,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    description: 'Build a video automation platform that creates marketing clips from text, featuring automated lip-sync, scene detection, and multi-language dubbing.',
    complexity: 'Advanced'
  },
  {
    id: 'ai-chat',
    name: 'Smart Support Bot',
    icon: <MessageSquare size={24} />,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    description: 'Create an intelligent customer support platform featuring RAG-based AI chatbots, human-handoff logic, sentiment analysis, and multi-channel integration.',
    complexity: 'Advanced'
  },
  {
    id: 'ai-code',
    name: 'AI Code Architect',
    icon: <Code size={24} />,
    color: 'text-slate-800',
    bgColor: 'bg-slate-100',
    description: 'Design a developer-centric SaaS for automated code reviews, architectural diagrams from code, and AI-powered pair programming suggestions.',
    complexity: 'Advanced'
  },
  {
    id: 'fintech',
    name: 'Fintech Analytics',
    icon: <Wallet size={24} />,
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50',
    description: 'A secure financial dashboard with real-time transaction tracking, automated budgeting, crypto wallet integration, and fraud detection alerts.',
    complexity: 'Advanced'
  },
  {
    id: 'social',
    name: 'Social Media Platform',
    icon: <Share2 size={24} />,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    description: 'Create a full-featured social platform including user profiles, an algorithmic activity feed, real-time notifications, and private messaging.',
    complexity: 'Advanced'
  },
  {
    id: 'ecommerce',
    name: 'E-commerce Storefront',
    icon: <ShoppingBag size={24} />,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    description: 'Design a scalable e-commerce hub with a dynamic product catalog, advanced filtering, persistent shopping cart, and Stripe payment integration.',
    complexity: 'Intermediate'
  },
  {
    id: 'crm',
    name: 'Enterprise CRM Portal',
    icon: <Users size={24} />,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    description: 'Develop a professional CRM for lead management, customer tracking, automated sales pipelines, and comprehensive reporting tools.',
    complexity: 'Advanced'
  }
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('lovable_projects');
    if (saved) setProjects(JSON.parse(saved));
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Your Apps</h1>
          <p className="text-slate-500 mt-1">Manage and edit your AI-generated applications.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search apps..." 
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none w-64 shadow-sm"
            />
          </div>
          <button className="p-2 border border-slate-200 bg-white rounded-xl text-slate-600 hover:bg-slate-50 shadow-sm">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 bg-white border-2 border-dashed border-slate-200 rounded-3xl text-center">
          <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-6 shadow-inner">
            <Plus size={40} />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Build your first application</h3>
          <p className="text-slate-500 max-w-sm mt-2 mb-8 leading-relaxed">
            Just describe what you want to build and our AI architect will handle the rest.
          </p>
          <button 
            onClick={() => navigate('/new')}
            className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-95 flex items-center gap-2"
          >
            <Sparkles size={20} />
            <span>Create New App</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            onClick={() => navigate('/new')}
            className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl p-6 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-3 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-all">
              <Plus size={24} />
            </div>
            <span className="font-semibold text-slate-600 group-hover:text-indigo-600 transition-colors">New Application</span>
          </div>
          {projects.map(p => (
            <ProjectCard key={p.id} project={p} onClick={(id) => navigate(`/project/${id}`)} />
          ))}
        </div>
      )}
    </div>
  );
};

const NewProject: React.FC = () => {
  const navigate = useNavigate();
  const [description, setDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showTemplates, setShowTemplates] = useState(false);

  const handleGenerate = async () => {
    if (!description.trim()) return;
    setIsGenerating(true);
    setError(null);
    try {
      const files = await generateAppCode(description, setStatus);
      const newProject: Project = {
        id: Math.random().toString(36).substring(7),
        name: description.split(' ').slice(0, 3).join(' ') || 'New App',
        description,
        createdAt: new Date().toISOString(),
        files
      };
      
      const existing = JSON.parse(localStorage.getItem('lovable_projects') || '[]');
      localStorage.setItem('lovable_projects', JSON.stringify([newProject, ...existing]));
      
      navigate(`/project/${newProject.id}`);
    } catch (e) {
      setError('Generation failed. Please check your API key and try again.');
      setIsGenerating(false);
    }
  };

  const selectTemplate = (template: typeof APP_TEMPLATES[0]) => {
    setDescription(template.description);
    setShowTemplates(false);
  };

  return (
    <div className="max-w-3xl mx-auto py-16 px-6 relative">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">What are we building today?</h1>
        <p className="text-slate-500 mt-3 text-lg">Describe your idea and watch it come to life in seconds.</p>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="E.g. Build a high-performance task manager with team collaboration, drag-and-drop Kanban board, and Supabase auth."
          className="w-full h-48 p-5 bg-slate-50 border border-slate-100 rounded-2xl text-lg focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all resize-none leading-relaxed"
          disabled={isGenerating}
        />
        
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl flex items-center gap-3 text-sm">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        <div className="mt-6 flex flex-col gap-4">
          <button 
            onClick={handleGenerate}
            disabled={!description.trim() || isGenerating}
            className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all flex items-center justify-center gap-3 active:scale-[0.98] ${
              isGenerating 
                ? 'bg-slate-400 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200'
            }`}
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>{status || 'Generating Your App...'}</span>
              </>
            ) : (
              <>
                <Sparkles size={22} />
                <span>Build Application</span>
              </>
            )}
          </button>
          
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => setShowTemplates(true)}
              className="py-3 px-4 bg-slate-100 text-slate-600 rounded-xl text-sm font-semibold hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
            >
              <Laptop size={16} />
              Pick a Template
            </button>
            <button className="py-3 px-4 bg-slate-100 text-slate-600 rounded-xl text-sm font-semibold hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
              <Database size={16} />
              Import Schema
            </button>
          </div>
        </div>
      </div>

      {/* Templates Modal */}
      {showTemplates && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setShowTemplates(false)}
          ></div>
          <div className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Template Library</h2>
                <p className="text-slate-500 text-sm">Select a specialized architecture to jumpstart your AI app.</p>
              </div>
              <button 
                onClick={() => setShowTemplates(false)}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X size={24} className="text-slate-400" />
              </button>
            </div>
            
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto max-h-[70vh] scrollbar-thin scrollbar-thumb-slate-200">
              {APP_TEMPLATES.map((template) => (
                <div 
                  key={template.id}
                  onClick={() => selectTemplate(template)}
                  className="group relative border border-slate-200 p-6 rounded-2xl hover:border-indigo-600 hover:shadow-lg hover:shadow-indigo-50 transition-all cursor-pointer flex flex-col gap-4"
                >
                  <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-xl ${template.bgColor} ${template.color}`}>
                      {template.icon}
                    </div>
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider rounded-md">
                      {template.complexity}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 group-hover:text-indigo-600 transition-colors">{template.name}</h3>
                    <p className="text-sm text-slate-500 mt-1 leading-relaxed line-clamp-2">
                      {template.description}
                    </p>
                  </div>
                  <div className="mt-auto pt-4 flex items-center text-indigo-600 font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    Use Template <ChevronRight size={16} />
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 bg-slate-50 border-t flex items-center justify-center gap-6">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                <Zap size={14} className="text-yellow-500" />
                <span>Modern React 19 Patterns</span>
              </div>
              <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                <Database size={14} className="text-indigo-500" />
                <span>Automatic Supabase Schema</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-12 text-center">
        <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-4">Popular Suggestions</p>
        <div className="flex flex-wrap justify-center gap-2">
          {['SaaS Dashboard', 'CRM Portal', 'E-commerce Shop', 'Real-time Chat App'].map(tag => (
            <button 
              key={tag}
              onClick={() => setDescription(`Build a ${tag} with modern UI and basic features.`)}
              className="px-4 py-2 bg-white border border-slate-200 rounded-full text-xs font-semibold text-slate-600 hover:border-indigo-400 hover:text-indigo-600 transition-all shadow-sm"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProjectEditor: React.FC<{ projectId: string }> = ({ projectId }) => {
  const [project, setProject] = useState<Project | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('lovable_projects');
    if (saved) {
      const projs: Project[] = JSON.parse(saved);
      const found = projs.find(p => p.id === projectId);
      if (found) {
        setProject(found);
        setMessages([
          { 
            id: '1', 
            role: 'assistant', 
            content: `I've finished architecting your app: **${found.name}**. You can explore the code in the editor. What should we tweak?`, 
            timestamp: new Date().toISOString() 
          }
        ]);
      }
    }
  }, [projectId]);

  const handleSendMessage = async (content: string) => {
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMsg]);
    setIsGenerating(true);
    setStatus('Analyzing request...');

    try {
      const newFiles = await generateAppCode(`Current project: ${project?.description}. User update request: ${content}`, setStatus);
      
      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I've updated the components based on your request. Let me know if you need anything else!`,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, assistantMsg]);
      setProject(prev => prev ? { ...prev, files: newFiles } : null);
      
      const saved = JSON.parse(localStorage.getItem('lovable_projects') || '[]');
      const updated = saved.map((p: Project) => p.id === projectId ? { ...p, files: newFiles } : p);
      localStorage.setItem('lovable_projects', JSON.stringify(updated));
    } catch (e) {
      setMessages(prev => [...prev, {
        id: 'err',
        role: 'assistant',
        content: 'I encountered an error while updating your code. Please try again.',
        timestamp: new Date().toISOString()
      }]);
    } finally {
      setIsGenerating(false);
      setStatus('');
    }
  };

  if (!project) return <div>Loading...</div>;

  return (
    <div className="flex h-full overflow-hidden">
      <ChatInterface 
        messages={messages} 
        onSendMessage={handleSendMessage} 
        isGenerating={isGenerating}
        status={status}
      />
      <CodePreview 
        files={project.files} 
        appName={project.name} 
        appDescription={project.description} 
      />
    </div>
  );
};

const ProjectWrapper = () => {
  const pathParts = window.location.hash.split('/');
  const projectId = pathParts[pathParts.length - 1];
  return <ProjectEditor projectId={projectId} />;
};

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/new" element={<NewProject />} />
          <Route path="/project/:id" element={<ProjectWrapper />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
