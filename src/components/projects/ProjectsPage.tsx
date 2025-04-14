import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import ProjectFilters from './ProjectFilters';
import ProjectViewToggle from './ProjectViewToggle';
import ProjectGrid from './ProjectGrid';
import ProjectList from './ProjectList';
import ProjectModal from './ProjectModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { Project } from '../../types/project';
import { generateMockProjects } from '../../utils/mockProjectData';

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(generateMockProjects(12));
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeFilter, setActiveFilter] = useState<Project['status'] | 'all'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = projects.filter(project => 
    activeFilter === 'all' ? true : project.status === activeFilter
  );

  const handleAddProject = (project: Omit<Project, 'id'>) => {
    const newProject: Project = {
      ...project,
      id: Math.random().toString(36).substr(2, 9),
    };
    setProjects([...projects, newProject]);
    setIsModalOpen(false);
  };

  const handleEditProject = (project: Project) => {
    setProjects(projects.map(p => p.id === project.id ? project : p));
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const handleDeleteProject = (projectId: string) => {
    setProjects(projects.filter(p => p.id !== projectId));
    setIsDeleteModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Projects
        </h1>
        <button
          onClick={() => {
            setSelectedProject(null);
            setIsModalOpen(true);
          }}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="h-5 w-5 mr-2" />
          New Project
        </button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
        <ProjectFilters
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          counts={{
            all: projects.length,
            active: projects.filter(p => p.status === 'active').length,
            in_progress: projects.filter(p => p.status === 'in_progress').length,
            completed: projects.filter(p => p.status === 'completed').length,
          }}
        />
        <ProjectViewToggle viewMode={viewMode} onViewChange={setViewMode} />
      </div>

      {viewMode === 'grid' ? (
        <ProjectGrid
          projects={filteredProjects}
          onEdit={(project) => {
            setSelectedProject(project);
            setIsModalOpen(true);
          }}
          onDelete={(project) => {
            setSelectedProject(project);
            setIsDeleteModalOpen(true);
          }}
        />
      ) : (
        <ProjectList
          projects={filteredProjects}
          onEdit={(project) => {
            setSelectedProject(project);
            setIsModalOpen(true);
          }}
          onDelete={(project) => {
            setSelectedProject(project);
            setIsDeleteModalOpen(true);
          }}
        />
      )}

      <ProjectModal
        isOpen={isModalOpen}
        project={selectedProject}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProject(null);
        }}
        onSubmit={selectedProject ? handleEditProject : handleAddProject}
      />

      {selectedProject && (
        <DeleteConfirmationModal
          project={selectedProject}
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedProject(null);
          }}
          onConfirm={() => handleDeleteProject(selectedProject.id)}
        />
      )}
    </div>
  );
};

export default ProjectsPage;