import React from 'react';
import { User as UserIcon } from 'lucide-react';
import { format } from 'date-fns';
import { User } from '../../types/user';
import UserActions from './UserActions';

interface UserListItemProps {
  user: User;
  onView: (user: User) => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

const UserListItem: React.FC<UserListItemProps> = ({ user, onView, onEdit, onDelete }) => {
  const initials = `${user.firstName[0]}${user.lastName[0]}`;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 transition-all duration-300 hover:shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={`${user.firstName} ${user.lastName}`}
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              {user.useIcon ? (
                <UserIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              ) : (
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {initials}
                </span>
              )}
            </div>
          )}
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">
              {user.firstName} {user.lastName}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Joined {format(new Date(user.registrationDate), 'MM/dd/yyyy')}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
              user.isActive
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
            }`}
          >
            {user.isActive ? 'Active' : 'Inactive'}
          </span>
          <div className="flex items-center space-x-2">
            <UserActions user={user} onView={onView} onEdit={onEdit} onDelete={onDelete} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserListItem;