import { Notification, NotificationType, NotificationImportance } from '../types/notification';

const types: NotificationType[] = ['info', 'success', 'error', 'warning'];
const importanceLevels: NotificationImportance[] = ['urgent', 'normal', 'low'];

const messages = [
  'New user registration',
  'Payment processed successfully',
  'System maintenance scheduled',
  'Security alert detected',
  'Database backup completed',
  'API rate limit exceeded',
  'New feature deployment',
  'User feedback received',
  'Performance monitoring alert',
  'Certificate expiration warning',
];

const descriptions = [
  'A new user has registered to the platform',
  'Customer payment has been processed and confirmed',
  'System maintenance is scheduled for tonight at 2 AM UTC',
  'Multiple failed login attempts detected from IP address',
  'Weekly database backup has been completed successfully',
  'The API rate limit has been exceeded for endpoint /api/users',
  'New feature "Dark Mode" has been deployed to production',
  'User feedback survey responses are ready for review',
  'High CPU usage detected on production server',
  'SSL certificate will expire in 30 days',
];

export const generateMockNotifications = (count: number): Notification[] => {
  return Array.from({ length: count }, (_, i) => {
    const type = types[Math.floor(Math.random() * types.length)];
    const importance = importanceLevels[Math.floor(Math.random() * importanceLevels.length)];
    const messageIndex = Math.floor(Math.random() * messages.length);

    return {
      id: `notification-${i + 1}`,
      type,
      importance,
      message: messages[messageIndex],
      timestamp: new Date(
        Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)
      ).toISOString(),
      isRead: Math.random() > 0.5,
      metadata: {
        description: descriptions[messageIndex],
      },
    };
  });
};