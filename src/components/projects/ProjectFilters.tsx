import React from 'react';
import { Project } from '../../types/project';

interface ProjectFiltersProps {
  activeFilter: Project['status'] | 'all';
  onFilterChange: (filter: Project['status'] | 'all') => void;
  counts: {
    all: number;
    active: number;
    in_progress: number;
    completed: number;
  };
}

const ProjectFilters: React.FC<ProjectFiltersProps> = ({
  activeFilter,
  onFilterChange,
  counts,
}) => {
  const filters = [
    { value: 'all', label: 'All Projects' },
    { value: 'active', label: 'Active' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
  ] as const;

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onFilterChange(value)}
          className={`
            inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium
            ${activeFilter === value
              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }
          `}
        >
          {label}
          <span className="ml-2 text-xs">({counts[value]})</span>
        </button>
      ))}
    </div>
  );
};

export default ProjectFilters;