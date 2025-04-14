import React from 'react';
import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';
import { NotificationType } from '../../types/notification';

interface NotificationIconProps {
  type: NotificationType;
  className?: string;
}

const NotificationIcon: React.FC<NotificationIconProps> = ({ type, className = 'w-5 h-5' }) => {
  const icons = {
    info: <Info className={`${className} text-blue-500`} aria-hidden="true" />,
    success: <CheckCircle className={`${className} text-green-500`} aria-hidden="true" />,
    error: <AlertCircle className={`${className} text-red-500`} aria-hidden="true" />,
    warning: <AlertTriangle className={`${className} text-yellow-500`} aria-hidden="true" />,
  };

  return icons[type] || icons.info;
};

export default NotificationIcon;