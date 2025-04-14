import React from 'react';
import UserMenu from '../ui/UserMenu';
import NotificationBell from '../ui/NotificationBell';
import ThemeToggle from '../ui/ThemeToggle';

const Header: React.FC = () => {
  return (
    <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center px-6">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Welcome back</h1>
      </div>
      <div className="flex items-center space-x-4">
        <NotificationBell />
        <ThemeToggle />
        <UserMenu />
      </div>
    </header>
  );
};

export default Header;