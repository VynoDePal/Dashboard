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
    meeting: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    task: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    reminder: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center sm:items-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-25 transition-opacity"></div>

        <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md transform transition-all">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="p-6">
            <div className="flex items-start space-x-3">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {event.title}
                </h3>
                <div className="mt-2 space-y-3">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <CalendarIcon className="h-5 w-5 mr-2" />
                    {format(new Date(event.date), 'MMMM d, yyyy')}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="h-5 w-5 mr-2" />
                    {format(new Date(event.date), 'h:mm a')}
                  </div>
                  <div className="flex items-center">
                    <Tag className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" />
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeColors[event.type]}`}>
                      {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                    </span>
                  </div>
                </div>
                {event.description && (
                  <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
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
              <button
                onClick={() => onEdit(event)}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
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