import React from 'react';
import { UserStatus } from '../../types/chat';

interface OnlineIndicatorProps {
  status: UserStatus;
}

const OnlineIndicator: React.FC<OnlineIndicatorProps> = ({ status }) => {
  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    away: 'bg-yellow-500',
    busy: 'bg-red-500',
  };

  return (
    <span
      className={`
        absolute bottom-0 right-0 block h-3 w-3 rounded-full
        ${statusColors[status]}
        ring-2 ring-white dark:ring-gray-800
      `}
      aria-label={`Status: ${status}`}
    />
  );
};

export default OnlineIndicator