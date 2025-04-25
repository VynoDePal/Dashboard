import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Home, BarChart3, Users, Bell, Settings as SettingsIcon, CheckSquare, Calendar, Globe, MessageSquare, Mail, FolderKanban, StickyNote, CreditCard, Terminal } from 'lucide-react';

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
    element: (
      <React.Suspense fallback={<div>Loading...</div>}>
        <Analytics />
      </React.Suspense>
    ),
  },
  {
    path: '/chat/*',
    element: (
      <React.Suspense fallback={<div>Loading...</div>}>
        <Chat />
      </React.Suspense>
    ),
  },
  {
    path: '/emails/*',
    element: (
      <React.Suspense fallback={<div>Loading...</div>}>
        <Email />
      </React.Suspense>
    ),
  },
  {
    path: '/projects',
    element: (
      <React.Suspense fallback={<div>Loading...</div>}>
        <Projects />
      </React.Suspense>
    ),
  },
  {
    path: '/notes/*',
    element: (
      <React.Suspense fallback={<div>Loading...</div>}>
        <Notes />
      </React.Suspense>
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
    element: (
      <React.Suspense fallback={<div>Loading...</div>}>
        <Tasks />
      </React.Suspense>
    ),
  },
  {
    path: '/calendar/*',
    element: (
      <React.Suspense fallback={<div>Loading...</div>}>
        <CalendarPage />
      </React.Suspense>
    ),
  },
  {
    path: '/feed/*',
    element: (
      <React.Suspense fallback={<div>Loading...</div>}>
        <Feed />
      </React.Suspense>
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
    element: (
      <React.Suspense fallback={<div>Loading...</div>}>
        <Payments />
      </React.Suspense>
    ),
  },
];

export const navigationItems = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: Home,
  },
  {
    name: 'Analytics',
    path: '/analytics',
    icon: BarChart3,
  },
  {
    name: 'Team Chat',
    path: '/chat',
    icon: MessageSquare,
  },
  {
    name: 'Email',
    path: '/emails',
    icon: Mail,
  },
  {
    name: 'Projects',
    path: '/projects',
    icon: FolderKanban,
  },
  {
    name: 'Notes',
    path: '/notes',
    icon: StickyNote,
  },
  {
    name: 'Tasks',
    path: '/tasks',
    icon: CheckSquare,
  },
  {
    name: 'Calendar',
    path: '/calendar',
    icon: Calendar,
  },
  {
    name: 'News Feed',
    path: '/feed',
    icon: Globe,
  },
  {
    name: 'Users',
    path: '/users',
    icon: Users,
  },
  {
    name: 'Payments',
    path: '/payments',
    icon: CreditCard,
  },
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