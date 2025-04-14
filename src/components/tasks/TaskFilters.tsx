import React from 'react';
import { TaskStatus } from '../../types/task';

interface TaskFiltersProps {
  activeFilter: TaskStatus | 'all';
  onFilterChange: (filter: TaskStatus | 'all') => void;
  counts: {
    all: number;
    todo: number;
    in_progress: number;
    completed: number;
  };
}

const TaskFilters: React.FC<TaskFiltersProps> = ({
  activeFilter,
  onFilterChange,
  counts,
}) => {
  const filters: { value: TaskStatus | 'all'; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'todo', label: 'To Do' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onFilterChange(value)}
          className={`
            inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium
            ${
              activeFilter === value
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }
            transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900
          `}
        >
          {label}
          <span className="ml-2 text-xs">({counts[value]})</span>
        </button>
      ))}
    </div>
  );
};

export default TaskFilters;