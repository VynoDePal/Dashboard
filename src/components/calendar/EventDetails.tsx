import React from 'react';
import { X, Clock, Calendar as CalendarIcon, Tag } from 'lucide-react';
import { format } from 'date-fns';
import { Event } from '../../types/calendar';

interface EventDetailsProps {
  event: Event;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (event: Event) => void;
  onDelete: (eventId: string) => void;
}

const EventDetails: React.FC<EventDetailsProps> = ({
  event,
  isOpen,
  onClose,
  onEdit,
  onDelete,
}) => {
  if (!isOpen) return null;

  const typeColors = {
    meeting: 'bg-primary/20 text-primary',
    task: 'bg-secondary/20 text-secondary',
    reminder: 'bg-accent/20 text-accent',
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center sm:items-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-25 transition-opacity"></div>

        <div className="relative bg-background text-text rounded-lg border-2 border-secondary shadow-xl w-full max-w-md transform transition-all">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button onClick={onClose} className="text-text/70 hover:text-text transition-colors duration-200">
              <X className="h-6 w-6 text-text/70" />
            </button>
          </div>

          <div className="p-6">
            <div className="flex items-start space-x-3">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-secondary">
                  {event.title}
                </h3>
                <div className="mt-2 space-y-3">
                  <div className="flex items-center text-sm text-text/70">
                    <CalendarIcon className="h-5 w-5 mr-2 text-text/70" />
                    {format(new Date(event.date), 'MMMM d, yyyy')}
                  </div>
                  <div className="flex items-center text-sm text-text/70">
                    <Clock className="h-5 w-5 mr-2 text-text/70" />
                    {format(new Date(event.date), 'h:mm a')}
                  </div>
                  <div className="flex items-center">
                    <Tag className="h-5 w-5 mr-2 text-text/70" />
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeColors[event.type]}`}>
                      {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                    </span>
                  </div>
                </div>
                {event.description && (
                  <p className="mt-4 text-sm text-text/70">
                    {event.description}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => onDelete(event.id)}
                className="px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md"
              >
                Delete
              </button>
              <button onClick={() => onEdit(event)} className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary">
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;