import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Event, EventType } from '../../types/calendar';

interface EventFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (event: Event) => void;
  initialData?: Event;
}

const EventForm: React.FC<EventFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [formData, setFormData] = useState<Partial<Event>>(
    initialData || {
      title: '',
      date: new Date().toISOString(),
      type: 'meeting',
      description: '',
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.date) return;

    // On envoie formData (avec id éventuel), puis on écrase id
    onSubmit({
      ...(formData as Event),
      id: initialData?.id || Math.random().toString(36).substr(2, 9),
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-25 transition-opacity"></div>

        <div className="relative bg-background text-text rounded-lg border-2 border-secondary shadow-xl w-full max-w-md transform transition-all">
          <div className="flex items-center justify-between p-4 bg-background text-text border-b-2 border-secondary">
            <h3 className="text-lg font-semibold text-secondary">
              {initialData ? 'Edit Event' : 'New Event'}
            </h3>
            <button
              onClick={onClose}
              className="text-text/70 hover:text-text transition-colors duration-200"
            >
              <X className="h-6 w-6 text-text/70" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-text">
                Title
              </label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="mt-1 block w-full rounded-md border-secondary dark:border-secondary bg-background text-text shadow-sm focus:border-primary focus:ring-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text">
                Date & Time
              </label>
              <input
                type="datetime-local"
                value={formData.date?.slice(0, 16) || ''}
                onChange={(e) => setFormData({ ...formData, date: new Date(e.target.value).toISOString() })}
                className="mt-1 block w-full rounded-md border-secondary dark:border-secondary bg-background text-text shadow-sm focus:border-primary focus:ring-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text">
                Type
              </label>
              <select
                value={formData.type || 'meeting'}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as EventType })}
                className="mt-1 block w-full rounded-md border-secondary dark:border-secondary bg-background text-text shadow-sm focus:border-primary focus:ring-primary"
              >
                <option value="meeting">Meeting</option>
                <option value="task">Task</option>
                <option value="reminder">Reminder</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text">
                Description
              </label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="mt-1 block w-full rounded-md border-secondary dark:border-secondary bg-background text-text shadow-sm focus:border-primary focus:ring-primary"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-text bg-background border-2 border-secondary rounded-md hover:bg-secondary/10 dark:hover:bg-secondary/50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {initialData ? 'Save Changes' : 'Create Event'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventForm;