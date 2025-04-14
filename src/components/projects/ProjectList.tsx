import React from 'react';
import { format } from 'date-fns';
import { Edit2, Trash2 } from 'lucide-react';
import { Project } from '../../types/project';

interface ProjectListProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, onEdit, onDelete }) => {
  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">No projects found</p>
      </div>
    );
  }

  const statusColors = {
    active: 'bg-green-500',
    in_progress: 'bg-yellow-500',
    completed: 'bg-blue-500',
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Project
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Progress
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Team
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Dates
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {projects.map((project) => (
            <tr key={project.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {project.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {project.description}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                  project.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                  project.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                  'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                }`}>
                  {project.status.replace('_', ' ')}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${statusColors[project.status]}`}
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                    {project.progress}%
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
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
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                <div>
                  Start: {format(new Date(project.startDate), 'MMM d, yyyy')}
                </div>
                <div>
                  End: {format(new Date(project.endDate), 'MMM d, yyyy')}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => onEdit(project)}
                    className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                    aria-label="Edit project"
                  >
                    <Edit2 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => onDelete(project)}
                    className="text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                    aria-label="Delete project"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectList;