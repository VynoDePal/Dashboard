import React, { useState } from 'react';
import { User, LogOut, Settings } from 'lucide-react';

const UserMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 focus:outline-none"
      >
        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          <User className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </div>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">John Doe</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 border border-gray-200 dark:border-gray-700">
          <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
            <p className="text-sm font-medium text-gray-900 dark:text-white">John Doe</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">john@example.com</p>
          </div>
          <a
            href="#settings"
            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </a>
          <a
            href="#logout"
            className="flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </a>
        </div>
      )}
    </div>
  );
};

export default UserMenu;