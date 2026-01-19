
import React from 'react';
import { Project } from '../types';
import { FileCode, Calendar, ChevronRight, Layout } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onClick: (id: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  return (
    <div 
      onClick={() => onClick(project.id)}
      className="group bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all cursor-pointer relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <ChevronRight size={20} className="text-indigo-600" />
      </div>

      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
          <Layout size={24} />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">{project.name}</h3>
          <p className="text-sm text-slate-500 line-clamp-2 mt-1 leading-relaxed">
            {project.description}
          </p>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <FileCode size={14} />
            {project.files.length} files
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={14} />
            {new Date(project.createdAt).toLocaleDateString()}
          </span>
        </div>
        <div className="px-2 py-1 bg-green-50 text-green-600 rounded-full font-bold">
          Deployed
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
