import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Home, BarChart3, Users, Bell, Settings as SettingsIcon, CheckSquare, Calendar, Globe, MessageSquare, Mail, FolderKanban, StickyNote, CreditCard, Terminal } from 'lucide-react';
import { getWidgetConfig } from './utils/GetWidgetConfig';

const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Analytics = React.lazy(() => import('./pages/Analytics'));
const UserManagement = React.lazy(() => import('./pages/UserManagement'));
const SettingsPage = React.lazy(() => import('./pages/Settings'));
const Notifications = React.lazy(() => import('./components/notifications/NotificationsPage'));
const Tasks = React.lazy(() => import('./pages/Tasks'));
const CalendarPage = React.lazy(() => import('./pages/Calendar'));
const Feed = React.lazy(() => import('./pages/Feed'));
const Chat = React.lazy(() => import('./pages/Chat'));
const Email = React.lazy(() => import('./pages/Email'));
const Projects = React.lazy(() => import('./pages/Projects'));
const Notes = React.lazy(() => import('./pages/Notes'));
const Payments = React.lazy(() => import('./pages/Payments'));

export const routes = [
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: '/dashboard',
    element: (
      <React.Suspense fallback={<div>Loading...</div>}>
        <Dashboard />
      </React.Suspense>
    ),
  },
  {
    path: '/analytics',
    element: getWidgetConfig().find(w => w.id === 'analytics' && w.enabled) ? (
      <React.Suspense fallback={<div>Loading...</div>}>
        <Analytics />
      </React.Suspense>
    ) : (
      <Navigate to="/dashboard" replace />
    ),
  },
  {
    path: '/chat/*',
    element: getWidgetConfig().find(w => w.id === 'chat' && w.enabled) ? (
      <React.Suspense fallback={<div>Loading...</div>}>
        <Chat />
      </React.Suspense>
    ) : (
      <Navigate to="/dashboard" replace />
    ),
  },
  {
    path: '/emails/*',
    element: getWidgetConfig().find(w => w.id === 'email' && w.enabled) ? (
      <React.Suspense fallback={<div>Loading...</div>}>
        <Email />
      </React.Suspense>
    ) : (
      <Navigate to="/dashboard" replace />
    ),
  },
  {
    path: '/projects',
    element: getWidgetConfig().find(w => w.id === 'projects' && w.enabled) ? (
      <React.Suspense fallback={<div>Loading...</div>}>
        <Projects />
      </React.Suspense>
    ) : (
      <Navigate to="/dashboard" replace />
    ),
  },
  {
    path: '/notes/*',
    element: getWidgetConfig().find(w => w.id === 'notes' && w.enabled) ? (
      <React.Suspense fallback={<div>Loading...</div>}>
        <Notes />
      </React.Suspense>
    ) : (
      <Navigate to="/dashboard" replace />
    ),
  },
  {
    path: '/users',
    element: (
      <React.Suspense fallback={<div>Loading...</div>}>
        <UserManagement />
      </React.Suspense>
    ),
  },
  {
    path: '/tasks',
    element: getWidgetConfig().find(w => w.id === 'tasks' && w.enabled) ? (
      <React.Suspense fallback={<div>Loading...</div>}>
        <Tasks />
      </React.Suspense>
    ) : (
      <Navigate to="/dashboard" replace />
    ),
  },
  {
    path: '/calendar/*',
    element: getWidgetConfig().find(w => w.id === 'calendar' && w.enabled) ? (
      <React.Suspense fallback={<div>Loading...</div>}>
        <CalendarPage />
      </React.Suspense>
    ) : (
      <Navigate to="/dashboard" replace />
    ),
  },
  {
    path: '/feed/*',
    element: getWidgetConfig().find(w => w.id === 'news' && w.enabled) ? (
      <React.Suspense fallback={<div>Loading...</div>}>
        <Feed />
      </React.Suspense>
    ) : (
      <Navigate to="/dashboard" replace />
    ),
  },
  {
    path: '/notifications',
    element: (
      <React.Suspense fallback={<div>Loading...</div>}>
        <Notifications />
      </React.Suspense>
    ),
  },
  {
    path: '/settings',
    element: (
      <React.Suspense fallback={<div>Loading...</div>}>
        <SettingsPage />
      </React.Suspense>
    ),
  },
  {
    path: '/payments',
    element: getWidgetConfig().find(w => w.id === 'payments' && w.enabled) ? (
      <React.Suspense fallback={<div>Loading...</div>}>
        <Payments />
      </React.Suspense>
    ) : (
      <Navigate to="/dashboard" replace />
    ),
  },
];

export const navigationItems = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: Home,
  },
  ...(getWidgetConfig().find(w => w.id === 'analytics' && w.enabled) ? [
    {
      name: 'Analytics',
      path: '/analytics',
      icon: BarChart3,
    }
  ] : []),
  ...(getWidgetConfig().find(w => w.id === 'chat' && w.enabled) ? [
    {
      name: 'Team Chat',
      path: '/chat',
      icon: MessageSquare,
    }
  ] : []),
  ...(getWidgetConfig().find(w => w.id === 'email' && w.enabled) ? [
    {
      name: 'Email',
      path: '/emails',
      icon: Mail,
    }
  ] : []),
  ...(getWidgetConfig().find(w => w.id === 'projects' && w.enabled) ? [
    {
      name: 'Projects',
      path: '/projects',
      icon: FolderKanban,
    }
  ] : []),
  ...(getWidgetConfig().find(w => w.id === 'notes' && w.enabled) ? [
    {
      name: 'Notes',
      path: '/notes',
      icon: StickyNote,
    }
  ] : []),
  ...(getWidgetConfig().find(w => w.id === 'tasks' && w.enabled) ? [
    {
      name: 'Tasks',
      path: '/tasks',
      icon: CheckSquare,
    }
  ] : []),
  ...(getWidgetConfig().find(w => w.id === 'calendar' && w.enabled) ? [
    {
      name: 'Calendar',
      path: '/calendar',
      icon: Calendar,
    }
  ] : []),
  ...(getWidgetConfig().find(w => w.id === 'news' && w.enabled) ? [
    {
      name: 'News Feed',
      path: '/feed',
      icon: Globe,
    }
  ] : []),
  {
    name: 'Users',
    path: '/users',
    icon: Users,
  },
  ...(getWidgetConfig().find(w => w.id === 'payments' && w.enabled) ? [
    {
      name: 'Payments',
      path: '/payments',
      icon: CreditCard,
    }
  ] : []),
  {
    name: 'Notifications',
    path: '/notifications',
    icon: Bell,
  },
  {
    name: 'Settings',
    path: '/settings',
    icon: SettingsIcon,
  },
];