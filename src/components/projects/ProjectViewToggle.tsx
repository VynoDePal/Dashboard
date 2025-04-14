import React from 'react';
import { Grid, List } from 'lucide-react';

interface ProjectViewToggleProps {
  viewMode: 'grid' | 'list';
  onViewChange: (mode: 'grid' | 'list') => void;
}

const ProjectViewToggle: React.FC<ProjectViewToggleProps> = ({
  viewMode,
  onViewChange,
}) => {
  return (
    <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-lg p-1 shadow-sm">
      <button
        onClick={() => onViewChange('grid')}
        className={`
          p-2 rounded-md transition-colors duration-200
          ${viewMode === 'grid'
            ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
            : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
          }
        `}
        aria-label="Grid view"
      >
        <Grid className="w-5 h-5" />
      </button>
      <button
        onClick={() => onViewChange('list')}
        className={`
          p-2 rounded-md transition-colors duration-200
          ${viewMode === 'list'
            ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
            : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
          }
        `}
        aria-label="List view"
      >
        <List className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ProjectViewToggle;