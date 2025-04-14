import React from 'react';
import { User } from 'lucide-react';
import { User as UserType } from '../../types/chat';

interface UserAvatarProps {
  user?: UserType;
  groupName?: string;
  groupAvatar?: string;
  size?: 'sm' | 'md' | 'lg';
}

const UserAvatar: React.FC<UserAvatarProps> = ({
  user,
  groupName,
  groupAvatar,
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  if (groupAvatar) {
    return (
      <img
        src={groupAvatar}
        alt={groupName}
        className={`${sizeClasses[size]} rounded-full object-cover`}
      />
    );
  }

  if (user?.avatar) {
    return (
      <img
        src={user.avatar}
        alt={user.name}
        className={`${sizeClasses[size]} rounded-full object-cover`}
      />
    );
  }

  const initials = groupName
    ? groupName.split(' ').map(n => n[0]).join('').toUpperCase()
    : user?.name.split(' ').map(n => n[0]).join('').toUpperCase();

  if (initials) {
    return (
      <div
        className={`
          ${sizeClasses[size]} rounded-full bg-blue-100 dark:bg-blue-900
          flex items-center justify-center text-blue-600 dark:text-blue-200
          font-medium
        `}
      >
        {initials}
      </div>
    );
  }

  return (
    <div
      className={`
        ${sizeClasses[size]} rounded-full bg-gray-200 dark:bg-gray-700
        flex items-center justify-center text-gray-500 dark:text-gray-400
      `}
    >
      <User className={size === 'sm' ? 'h-4 w-4' : 'h-6 w-6'} />
    </div>
  );
};

export default UserAvatar