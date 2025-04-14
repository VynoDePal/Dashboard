import React from 'react';
import { Check, Trash2 } from 'lucide-react';
import { format, isValid } from 'date-fns';
import { Notification } from '../../types/notification';
import NotificationIcon from './NotificationIcon';

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
  view: 'timeline' | 'table';
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onMarkAsRead,
  onDelete,
  view,
}) => {
  const importanceClasses = {
    urgent: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    normal: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    low: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
  };

  const getFormattedDate = (timestamp: string | Date) => {
    const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
    return isValid(date) ? format(date, 'HH:mm - dd/MM/yyyy') : 'Invalid date';
  };

  const formattedDate = getFormattedDate(notification.timestamp);

  if (view === 'table') {
    return (
      <tr className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
        <td className="px-6 py-4 whitespace-nowrap">
          <NotificationIcon type={notification.type} />
        </td>
        <td className="px-6 py-4">
          <div className="text-sm text-gray-900 dark:text-gray-100">{notification.message}</div>
          {notification.metadata?.description && (
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {notification.metadata.description}
            </div>
          )}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
          {formattedDate}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${importanceClasses[notification.importance]}`}>
            {notification.importance}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <div className="flex justify-end space-x-2">
            {!notification.isRead && (
              <button
                onClick={() => onMarkAsRead(notification.id)}
                className="text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 rounded-full p-1"
                aria-label="Mark as read"
              >
                <Check className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => onDelete(notification.id)}
              className="text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 rounded-full p-1"
              aria-label="Delete notification"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <div className="relative pl-4 pb-12 group">
      <div className="absolute left-0 top-2 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-700 group-last:h-2"></div>
      <div className="relative flex items-start group">
        <span className="absolute left-0 -ml-2 h-4 w-4 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 group-hover:border-blue-500 dark:group-hover:border-blue-400"></span>
        <div className="min-w-0 flex-1 ml-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-2">
                <NotificationIcon type={notification.type} />
                <span className={`px-2 py-0.5 text-xs rounded-full ${importanceClasses[notification.importance]}`}>
                  {notification.importance}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                {!notification.isRead && (
                  <button
                    onClick={() => onMarkAsRead(notification.id)}
                    className="text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 rounded-full p-1"
                    aria-label="Mark as read"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => onDelete(notification.id)}
                  className="text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 rounded-full p-1"
                  aria-label="Delete notification"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-900 dark:text-gray-100">{notification.message}</p>
            {notification.metadata?.description && (
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {notification.metadata.description}
              </p>
            )}
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">{formattedDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;