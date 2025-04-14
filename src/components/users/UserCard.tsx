import React from 'react';
import { User as UserIcon, Moon, Sun, Eye, Edit, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { User } from '../../types/user';
import UserActions from './UserActions';

interface UserCardProps {
  user: User;
  onView: (user: User) => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onView, onEdit, onDelete }) => {
  const initials = `${user.firstName[0]}${user.lastName[0]}`;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 transition-all duration-300 hover:shadow-md">
      <div className="flex items-center space-x-4">
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={`${user.firstName} ${user.lastName}`}
            className="w-12 h-12 rounded-full"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            {user.useIcon ? (
              <UserIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            ) : (
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {initials}
              </span>
            )}
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white">
            {user.firstName} {user.lastName}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Joined {format(new Date(user.registrationDate), 'MM/dd/yyyy')}
          </p>
          <div className="mt-1 flex items-center">
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                user.isActive
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
              }`}
            >
              {user.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-end space-x-2">
        <UserActions user={user} onView={onView} onEdit={onEdit} onDelete={onDelete} />
      </div>
    </div>
  );
};

export default UserCard;