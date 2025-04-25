import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import TaskList from './TaskList';
import TaskFilters from './TaskFilters';
import TaskForm from './TaskForm';
import { Task, TaskStatus } from '../../types/task';

interface TaskWidgetProps {
  className?: string;
}

const TaskWidget: React.FC<TaskWidgetProps> = ({ className }) => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Complete dashboard design',
      status: 'in_progress',
      priority: 'high',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Review pull requests',
      status: 'completed',
      priority: 'medium',
      createdAt: new Date().toISOString(),
    },
    {
      id: '3',
      title: 'Update documentation',
      status: 'todo',
      priority: 'low',
      createdAt: new Date().toISOString(),
    },
  ]);

  const [activeFilter, setActiveFilter] = useState<TaskStatus | 'all'>('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleAddTask = (task: Partial<Task>) => {
    const newTask: Task = {
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      title: task.title!,
      priority: task.priority!,
      status: 'todo',
    };
    setTasks((prev) => [...prev, newTask]);
    setIsFormOpen(false);
  };

  const handleEditTask = (taskId: string, updatedTask: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, ...updatedTask } : task
      )
    );
    setEditingTask(null);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const handleToggleStatus = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: task.status === 'completed' ? 'todo' : 'completed',
            }
          : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) =>
    activeFilter === 'all' ? true : task.status === activeFilter
  );

  return (
    <div
      className={`bg-background text-text rounded-lg border-2 border-secondary shadow-sm ${
        className || ''
      }`}
    >
      <div className="p-4 bg-background text-text border-b-2 border-secondary">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-secondary">
            My Tasks
          </h2>
          <button
            onClick={() => setIsFormOpen(true)}
            className="inline-flex items-center justify-center p-2 text-text/70 hover:text-secondary hover:bg-secondary/10 dark:text-text/70 dark:hover:text-secondary dark:hover:bg-secondary/20 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-secondary"
            aria-label="Add new task"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <TaskFilters
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          counts={{
            all: tasks.length,
            todo: tasks.filter((t) => t.status === 'todo').length,
            in_progress: tasks.filter((t) => t.status === 'in_progress').length,
            completed: tasks.filter((t) => t.status === 'completed').length,
          }}
        />
      </div>

      <TaskList
        tasks={filteredTasks}
        onToggleStatus={handleToggleStatus}
        onEdit={(task) => setEditingTask(task)}
        onDelete={handleDeleteTask}
      />

      <TaskForm
        isOpen={isFormOpen || !!editingTask}
        onClose={() => {
          setIsFormOpen(false);
          setEditingTask(null);
        }}
        onSubmit={editingTask ? handleEditTask.bind(null, editingTask.id) : handleAddTask}
        initialData={editingTask}
      />
    </div>
  );
};

export default TaskWidget;