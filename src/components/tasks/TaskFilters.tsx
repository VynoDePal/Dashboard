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
          className={`px-4 py-2 rounded-full text-sm whitespace-nowrap border-2 ${
            activeFilter === value
              ? 'border-primary bg-primary/20 text-primary'
              : 'border-secondary bg-background text-text hover:border-primary'
          }`}
        >
          {label}
          <span className="ml-2 text-xs">({counts[value]})</span>
        </button>
      ))}
    </div>
  );
};

export default TaskFilters;