import React, { useState } from 'react';
import { Bell } from 'lucide-react';

const NotificationBell: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 rounded-full"
      >
        <Bell className="w-5 h-5" />
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
          3
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Notifications</h3>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {[1, 2, 3].map((_, i) => (
              <div
                key={i}
                className="p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <p className="text-sm text-gray-800 dark:text-gray-200">
                  New notification message {i + 1}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">2 hours ago</p>
              </div>
            ))}
          </div>
          <div className="p-4">
            <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline w-full text-center">
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;