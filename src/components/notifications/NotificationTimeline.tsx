import React from 'react';
import { Notification } from '../../types/notification';
import NotificationItem from './NotificationItem';
import EmptyState from './EmptyState';

interface NotificationTimelineProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

const NotificationTimeline: React.FC<NotificationTimelineProps> = ({
  notifications,
  onMarkAsRead,
  onDelete,
}) => {
  if (notifications.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onMarkAsRead={onMarkAsRead}
          onDelete={onDelete}
          view="timeline"
        />
      ))}
    </div>
  );
};

export default NotificationTimeline;