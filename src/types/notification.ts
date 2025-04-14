export type NotificationType = 'info' | 'success' | 'error' | 'warning';
export type NotificationImportance = 'urgent' | 'normal' | 'low';
export type TimeRange = 'today' | '7d' | '30d' | 'custom';

export interface Notification {
  id: string;
  type: NotificationType;
  importance: NotificationImportance;
  message: string;
  timestamp: string;
  isRead: boolean;
  metadata?: {
    title?: string;
    description?: string;
    link?: string;
  };
}

export interface NotificationFiltersState {
  timeRange: TimeRange;
  importance: NotificationImportance | 'all';
  type: NotificationType | 'all';
  startDate?: string;
  endDate?: string;
}