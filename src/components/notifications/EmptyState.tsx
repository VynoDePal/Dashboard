import React from 'react';
import { Bell } from 'lucide-react';

const EmptyState: React.FC = () => {
  return (
    <div className="text-center py-12">
      <Bell className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600" aria-hidden="true" />
      <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">No notifications</h3>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        You're all caught up! No new notifications to display.
      </p>
    </div>
  );
};

export default EmptyState;