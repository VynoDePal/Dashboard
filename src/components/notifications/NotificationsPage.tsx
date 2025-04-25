import React, { useState, useEffect } from 'react';
import { Layout, List } from 'lucide-react';
import NotificationFilters from './NotificationFilters';
import NotificationTimeline from './NotificationTimeline';
import NotificationTable from './NotificationTable';
import { Notification, NotificationFiltersState } from '../../types/notification';
import { generateMockNotifications } from '../../utils/mockNotifications';

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [view, setView] = useState<'timeline' | 'table'>('timeline');
  const [filters, setFilters] = useState<NotificationFiltersState>({
    timeRange: 'today',
    importance: 'all',
    type: 'all',
  });

  useEffect(() => {
    // Simulate API call
    const mockData = generateMockNotifications(20);
    setNotifications(mockData);
  }, []);

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  const handleDelete = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  const filteredNotifications = notifications.filter((notification) => {
    const now = new Date();
    const notificationDate = new Date(notification.timestamp);

    // Apply time range filter
    if (filters.timeRange === 'today') {
      if (notificationDate.toDateString() !== now.toDateString()) return false;
    } else if (filters.timeRange === '7d') {
      const sevenDaysAgo = new Date(now.setDate(now.getDate() - 7));
      if (notificationDate < sevenDaysAgo) return false;
    } else if (filters.timeRange === '30d') {
      const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));
      if (notificationDate < thirtyDaysAgo) return false;
    } else if (filters.timeRange === 'custom' && filters.startDate && filters.endDate) {
      const start = new Date(filters.startDate);
      const end = new Date(filters.endDate);
      if (notificationDate < start || notificationDate > end) return false;
    }

    // Apply importance filter
    if (filters.importance !== 'all' && notification.importance !== filters.importance) {
      return false;
    }

    // Apply type filter
    if (filters.type !== 'all' && notification.type !== filters.type) {
      return false;
    }

    return true;
  });

  return (
    <div className="space-y-6 text-text">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-text">
          Notifications
        </h1>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setView('timeline')}
            className={`p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
              view === 'timeline'
                ? 'bg-secondary/20 text-secondary'
                : 'text-text hover:bg-secondary/20'
            }`}
            aria-label="Timeline view"
          >
            <List className="w-5 h-5 text-secondary" />
          </button>
          <button
            onClick={() => setView('table')}
            className={`p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
              view === 'table'
                ? 'bg-secondary/20 text-secondary'
                : 'text-text hover:bg-secondary/20'
            }`}
            aria-label="Table view"
          >
            <Layout className="w-5 h-5 text-secondary" />
          </button>
        </div>
      </div>

      <NotificationFilters filters={filters} onFiltersChange={setFilters} />

      {view === 'timeline' ? (
        <NotificationTimeline
          notifications={filteredNotifications}
          onMarkAsRead={handleMarkAsRead}
          onDelete={handleDelete}
        />
      ) : (
        <NotificationTable
          notifications={filteredNotifications}
          onMarkAsRead={handleMarkAsRead}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default NotificationsPage;