interface ProjectMember {
  id: string;
  name: string;
  avatar?: string;
  role: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'in_progress' | 'completed';
  progress: number;
  startDate: string;
  endDate: string;
  members: ProjectMember[];
  tags: string[];
}