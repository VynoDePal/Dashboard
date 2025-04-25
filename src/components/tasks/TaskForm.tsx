import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Task, TaskPriority } from '../../types/task';

interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: Partial<Task>) => void;
  initialData?: Task | null;
}

const TaskForm: React.FC<TaskFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [formData, setFormData] = useState<Partial<Task>>({
    title: '',
    priority: 'medium',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({ title: '', priority: 'medium' });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.trim()) return;
    onSubmit(formData);
    setFormData({ title: '', priority: 'medium' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div
          className="fixed inset-0 bg-black bg-opacity-25 transition-opacity"
          onClick={onClose}
        ></div>

        <div className="relative bg-background text-text rounded-lg border-2 border-secondary shadow-xl w-full max-w-md transform transition-all">
          <div className="flex items-center justify-between p-4 bg-background text-text border-b-2 border-secondary">
            <h3 className="text-lg font-semibold text-secondary">
              {initialData ? 'Edit Task' : 'Add New Task'}
            </h3>
            <button onClick={onClose} className="text-text/70 hover:text-text transition-colors duration-200">
              <X className="w-5 h-5 text-text/70" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-text"
              >
                Task Title
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                className="mt-1 block w-full rounded-md border-secondary dark:border-secondary bg-background text-text shadow-sm focus:border-primary focus:ring-primary"
                placeholder="Enter task title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-2">
                Priority
              </label>
              <div className="flex gap-4">
                {(['low', 'medium', 'high'] as TaskPriority[]).map((priority) => (
                  <label
                    key={priority}
                    className="inline-flex items-center"
                  >
                    <input
                      type="radio"
                      name="priority"
                      value={priority}
                      checked={formData.priority === priority}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          priority: e.target.value as TaskPriority,
                        }))
                      }
                      className="form-radio text-primary focus:ring-primary"
                    />
                    <span className="ml-2 text-sm text-text capitalize">
                      {priority}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-text bg-background border-2 border-secondary rounded-md hover:bg-secondary/10 dark:hover:bg-secondary/50 focus:outline-none focus:ring-2 focus:ring-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {initialData ? 'Save Changes' : 'Add Task'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;