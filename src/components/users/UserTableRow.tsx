import React from 'react';
import { User as UserIcon } from 'lucide-react';
import { format } from 'date-fns';
import { User } from '../../types/user';
import UserActions from './UserActions';

interface UserTableRowProps {
  user: User;
  onView: (user: User) => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

const UserTableRow: React.FC<UserTableRowProps> = ({ user, onView, onEdit, onDelete }) => {
  const initials = `${user.firstName[0]}${user.lastName[0]}`;

  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={`${user.firstName} ${user.lastName}`}
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              {user.useIcon ? (
                <UserIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              ) : (
                <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                  {initials}
                </span>
              )}
            </div>
          )}
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {user.lastName}, {user.firstName}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
            user.isActive
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
          }`}
        >
          {user.isActive ? 'Active' : 'Inactive'}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {format(new Date(user.registrationDate), 'MM/dd/yyyy')}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right">
        <div className="flex justify-end space-x-2">
          <UserActions user={user} onView={onView} onEdit={onEdit} onDelete={onDelete} />
        </div>
      </td>
    </tr>
  );
};

export default UserTableRow;