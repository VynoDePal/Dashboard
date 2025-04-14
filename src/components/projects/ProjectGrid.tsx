import React from 'react';
import { Project } from '../../types/project';
import ProjectCard from './ProjectCard';

interface ProjectGridProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ projects, onEdit, onDelete }) => {
  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">No projects found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ProjectGrid;