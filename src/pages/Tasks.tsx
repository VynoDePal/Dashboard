import React from 'react';
import TaskWidget from '../components/tasks/TaskWidget';

const Tasks: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
        Task Management
      </h1>
      <TaskWidget className="min-h-[600px]" />
    </div>
  );
};

export default Tasks;