import React from 'react';
import { Menu } from 'lucide-react';
import UserMenu from '../ui/UserMenu';
import NotificationBell from '../ui/NotificationBell';
import ThemeToggle from '../ui/ThemeToggle';

interface HeaderProps {
  onMenuClick?: () => void
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="h-16 bg-background text-text border-b-2 border-secondary flex justify-between items-center px-6">
      <div className="flex items-center">
        {onMenuClick && (
          <button onClick={onMenuClick} className="md:hidden p-2 rounded-lg hover:bg-secondary/10 focus:outline-none focus:ring-2 focus:ring-secondary mr-4">
            <Menu className="w-6 h-6 text-text" />
          </button>
        )}
        <h1 className="text-xl font-semibold text-primary">Welcome back</h1>
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