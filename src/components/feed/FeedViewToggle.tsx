import React from 'react';
import { Grid, List, Table } from 'lucide-react';
import { ViewMode } from '../../types/feed';

interface FeedViewToggleProps {
  viewMode: ViewMode;
  onViewChange: (mode: ViewMode) => void;
}

const FeedViewToggle: React.FC<FeedViewToggleProps> = ({ viewMode, onViewChange }) => {
  const views: { mode: ViewMode; icon: React.ElementType; label: string }[] = [
    { mode: 'grid', icon: Grid, label: 'Grid view' },
    { mode: 'list', icon: List, label: 'List view' },
    { mode: 'table', icon: Table, label: 'Table view' },
  ];

  return (
    <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-lg p-1 shadow-sm">
      {views.map(({ mode, icon: Icon, label }) => (
        <button
          key={mode}
          onClick={() => onViewChange(mode)}
          className={`
            p-2 rounded-md transition-colors duration-200
            ${viewMode === mode
              ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
              : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
            }
          `}
          aria-label={label}
        >
          <Icon className="w-5 h-5" />
        </button>
      ))}
    </div>
  );
};

export default FeedViewToggle;