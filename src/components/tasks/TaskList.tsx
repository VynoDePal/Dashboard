import React from 'react';
import TaskItem from './TaskItem';
import { Task } from '../../types/task';

interface TaskListProps {
  tasks: Task[];
  onToggleStatus: (taskId: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleStatus,
  onEdit,
  onDelete,
}) => {
  if (tasks.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500 dark:text-gray-400">No tasks found</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleStatus={onToggleStatus}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;