import React from 'react';
import { Check, Pencil, Trash2 } from 'lucide-react';
import { Task } from '../../types/task';

interface TaskItemProps {
  task: Task;
  onToggleStatus: (taskId: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggleStatus,
  onEdit,
  onDelete,
}) => {
  const priorityColors = {
    low: 'bg-gray-400',
    medium: 'bg-yellow-400',
    high: 'bg-red-500',
  };

  return (
    <div
      className={`group p-4 flex items-center gap-4 transition-all duration-300 hover:bg-background/10 dark:hover:bg-background/20 ${
        task.status === 'completed' ? 'bg-background/20 dark:bg-background/20 line-through' : ''
      }`}
    >
      <button
        onClick={() => onToggleStatus(task.id)}
        className={`
          flex-shrink-0 w-5 h-5 rounded border-2 
          ${
            task.status === 'completed'
              ? 'bg-blue-500 border-blue-500'
              : 'border-gray-300 dark:border-gray-600'
          }
          hover:border-blue-500 dark:hover:border-blue-400
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900
        `}
        aria-label={`Mark task as ${
          task.status === 'completed' ? 'incomplete' : 'complete'
        }`}
      >
        {task.status === 'completed' && (
          <Check className="w-full h-full text-white" />
        )}
      </button>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <div
            className={`h-2 w-2 rounded-full ${
              priorityColors[task.priority]
            }`}
            aria-label={`Priority: ${task.priority}`}
          />
          <p
            className={`
              text-sm font-medium truncate
              ${
                task.status === 'completed'
                  ? 'text-gray-500 dark:text-gray-400 line-through'
                  : 'text-gray-900 dark:text-white'
              }
            `}
          >
            {task.title}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onEdit(task)}
          className="p-1 text-text/70 hover:text-secondary focus:outline-none focus:ring-2 focus:ring-secondary rounded-full"
          aria-label="Edit task"
        >
          <Pencil className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="p-1 text-text/70 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-full"
          aria-label="Delete task"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;