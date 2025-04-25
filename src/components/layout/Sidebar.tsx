import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Home, Users, Bell, Settings as SettingsIcon, BarChart3, MessageSquare, Mail, FolderKanban, StickyNote, CheckSquare, Calendar as CalendarIcon, Globe as GlobeIcon, CreditCard } from 'lucide-react';
import { useWidgets } from '../../context/WidgetsContext';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
  isCollapsed: boolean;
  isActive: boolean;
}

interface SidebarProps {
  forceExpanded?: boolean
  onNavigate?: () => void
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, to, isCollapsed, isActive }) => (
  <Link
    to={to}
    className={`flex items-center px-3 py-2 text-text hover:text-primary rounded-lg cursor-pointer transition-colors ${
      isActive ? 'font-semibold text-primary' : ''
    }`}
  >
    <Icon className="w-5 h-5" />
    {!isCollapsed && <span className="ml-3">{label}</span>}
  </Link>
);

const Sidebar: React.FC<SidebarProps> = ({ forceExpanded = false, onNavigate }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const collapsed = forceExpanded ? false : isCollapsed;
  const location = useLocation();
  const { widgets } = useWidgets();

  const widgetNavMap: Record<string, { name: string; path: string; icon: React.ElementType }> = {
    analytics: { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    chat: { name: 'Team Chat', path: '/chat', icon: MessageSquare },
    email: { name: 'Email', path: '/emails', icon: Mail },
    projects: { name: 'Projects', path: '/projects', icon: FolderKanban },
    notes: { name: 'Notes', path: '/notes', icon: StickyNote },
    tasks: { name: 'Tasks', path: '/tasks', icon: CheckSquare },
    calendar: { name: 'Calendar', path: '/calendar', icon: CalendarIcon },
    news: { name: 'News Feed', path: '/feed', icon: GlobeIcon },
    payments: { name: 'Payments', path: '/payments', icon: CreditCard },
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: Home },
    ...widgets.filter(w => w.enabled).map(w => widgetNavMap[w.id]).filter(item => item),
    { name: 'Users', path: '/users', icon: Users },
    { name: 'Notifications', path: '/notifications', icon: Bell },
    { name: 'Settings', path: '/settings', icon: SettingsIcon },
  ];

  return (
    <div
      className={`${
        collapsed ? 'w-16' : 'w-60'
      } h-screen bg-background text-text border-r-2 border-secondary transition-all duration-300 ease-in-out flex flex-col`}
    >
      <div className="flex items-center justify-between p-4 border-b-2 border-secondary">
        {!collapsed && <span className="text-xl font-semibold dark:text-white">Dashboard</span>}
        {!forceExpanded && (
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <ChevronRight className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            ) : (
              <ChevronLeft className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            )}
          </button>
        )}
      </div>
      <nav onClick={() => onNavigate && onNavigate()} className="flex-1 overflow-y-auto p-4 text-text">
        <div className="flex flex-col gap-2">
          {navItems.map((item) => (
            <NavItem
              key={item.path}
              icon={item.icon}
              label={item.name}
              to={item.path}
              isCollapsed={collapsed}
              isActive={location.pathname === item.path}
            />
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;