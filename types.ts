
export interface ProjectFile {
  path: string;
  content: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  files: ProjectFile[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export enum GenerationState {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  ARCHITECTING = 'ARCHITECTING',
  CODING = 'CODING',
  POLISHING = 'POLISHING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR'
}
