import React from 'react';
import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';
import { NotificationType } from '../../types/notification';

interface NotificationIconProps {
  type: NotificationType;
  className?: string;
}

const NotificationIcon: React.FC<NotificationIconProps> = ({ type, className = 'w-5 h-5' }) => {
  const icons = {
    info: <Info className={`${className} text-secondary`} aria-hidden="true" />,
    success: <CheckCircle className={`${className} text-secondary`} aria-hidden="true" />,
    error: <AlertCircle className={`${className} text-secondary`} aria-hidden="true" />,
    warning: <AlertTriangle className={`${className} text-secondary`} aria-hidden="true" />,
  };

  return icons[type] || icons.info;
};

export default NotificationIcon;