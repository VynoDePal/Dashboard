import React from 'react';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { User } from '../../types/user';

interface UserActionsProps {
  user: User;
  onView: (user: User) => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

const UserActions: React.FC<UserActionsProps> = ({ user, onView, onEdit, onDelete }) => {
  return (
    <>
      <button
        onClick={() => onView(user)}
        className="p-1 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
        aria-label="View details"
      >
        <Eye className="h-4 w-4" />
      </button>
      <button
        onClick={() => onEdit(user)}
        className="p-1 text-gray-500 hover:text-yellow-600 dark:text-gray-400 dark:hover:text-yellow-400"
        aria-label="Edit user"
      >
        <Edit className="h-4 w-4" />
      </button>
      <button
        onClick={() => onDelete(user)}
        className="p-1 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
        aria-label="Delete user"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </>
  );
};

export default UserActions;