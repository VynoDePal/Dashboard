import React from 'react';
import { format } from 'date-fns';
import { Edit2, Trash2 } from 'lucide-react';
import { Project } from '../../types/project';

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onEdit, onDelete }) => {
  const statusColors = {
    active: 'bg-green-500',
    in_progress: 'bg-yellow-500',
    completed: 'bg-blue-500',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {project.name}
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {project.description}
            </p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(project)}
              className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Edit project"
            >
              <Edit2 className="h-5 w-5" />
            </button>
            <button
              onClick={() => onDelete(project)}
              className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Delete project"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <div className={`w-2 h-2 rounded-full ${statusColors[project.status]} mr-2`}></div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                {project.status.replace('_', ' ')}
              </span>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {project.progress}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${statusColors[project.status]}`}
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <div>
              Start: {format(new Date(project.startDate), 'MMM d')}
            </div>
            <div>
              End: {format(new Date(project.endDate), 'MMM d')}
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center">
            <div className="flex -space-x-2">
              {project.members.slice(0, 4).map((member, index) => (
                <div key={member.id} className="relative z-[1]" style={{ zIndex: 4 - index }}>
                  {member.avatar ? (
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-8 h-8 rounded-full ring-2 ring-white dark:ring-gray-800"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 ring-2 ring-white dark:ring-gray-800 flex items-center justify-center">
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
              ))}
              {project.members.length > 4 && (
                <div className="relative z-0">
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 ring-2 ring-white dark:ring-gray-800 flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      +{project.members.length - 4}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {project.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;