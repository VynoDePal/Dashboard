import React from 'react';
import { Menu, Bell } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  onMenuClick: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, onMenuClick }) => {
  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h2 className="ml-3 text-xl font-semibold text-gray-900 dark:text-white">{title}</h2>
        </div>

        <div className="flex items-center space-x-4">
          <button
            className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
          </button>
          <div className="w-8 h-8 rounded-full bg-blue-500" />
        </div>
      </div>
    </header>
  );
};

export default PageHeader;