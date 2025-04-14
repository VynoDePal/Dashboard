import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { navigationItems } from '../../routes';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
  isCollapsed: boolean;
  isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, to, isCollapsed, isActive }) => (
  <Link
    to={to}
    className={`flex items-center px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer transition-colors ${
      isActive ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-200' : ''
    }`}
  >
    <Icon className="w-5 h-5" />
    {!isCollapsed && <span className="ml-3">{label}</span>}
  </Link>
);

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div
      className={`${
        isCollapsed ? 'w-16' : 'w-60'
      } h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out flex flex-col`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        {!isCollapsed && <span className="text-xl font-semibold dark:text-white">Dashboard</span>}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          )}
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-col gap-2">
          {navigationItems.map((item) => (
            <NavItem
              key={item.path}
              icon={item.icon}
              label={item.name}
              to={item.path}
              isCollapsed={isCollapsed}
              isActive={location.pathname === item.path}
            />
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;