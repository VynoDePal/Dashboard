import { Widget } from '../types/settings';

export const getWidgetConfig = () => {
  const widgets: Widget[] = [
    {
      id: 'analytics',
      name: 'Analytics',
      description: 'Track key metrics and performance indicators',
      category: 'monitoring',
      icon: 'BarChart2',
      enabled: true
    },
    {
      id: 'calendar',
      name: 'Calendar',
      description: 'View and manage calendar events',
      category: 'productivity',
      icon: 'Calendar',
      enabled: false
    },
    {
      id: 'tasks',
      name: 'Tasks',
      description: 'Manage your to-do list and tasks',
      category: 'productivity',
      icon: 'CheckSquare',
      enabled: false
    },
    {
      id: 'weather',
      name: 'Weather',
      description: 'Check local weather conditions',
      category: 'utilities',
      icon: 'Cloud',
      enabled: false
    },
    {
      id: 'news',
      name: 'News Feed',
      description: 'Stay updated with latest news',
      category: 'information',
      icon: 'Globe',
      enabled: false
    },
    {
      id: 'chat',
      name: 'Team Chat',
      description: 'Quick access to team conversations',
      category: 'communication',
      icon: 'MessageSquare',
      enabled: false
    },
    {
      id: 'email',
      name: 'Email',
      description: 'View and manage your emails',
      category: 'communication',
      icon: 'Mail',
      enabled: false
    },
    {
      id: 'projects',
      name: 'Projects',
      description: 'Manage and track projects',
      category: 'productivity',
      icon: 'FolderKanban',
      enabled: false
    },
    {
      id: 'notes',
      name: 'Quick Notes',
      description: 'Take and manage quick notes',
      category: 'productivity',
      icon: 'StickyNote',
      enabled: false
    },
    {
      id: 'payments',
      name: 'Payments',
      description: 'Process and manage payments',
      category: 'finance',
      icon: 'CreditCard',
      enabled: true
    },
    {
      id: 'api',
      name: 'API Management',
      description: 'Monitor and manage API endpoints',
      category: 'development',
      icon: 'Terminal',
      enabled: true
    }
  ];
  return widgets;
};