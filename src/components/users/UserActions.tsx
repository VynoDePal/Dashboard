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
        className="p-1 text-secondary hover:text-primary transition-colors"
        aria-label="View details"
      >
        <Eye className="h-4 w-4 text-secondary" />
      </button>
      <button
        onClick={() => onEdit(user)}
        className="p-1 text-secondary hover:text-primary transition-colors"
        aria-label="Edit user"
      >
        <Edit className="h-4 w-4 text-secondary" />
      </button>
      <button
        onClick={() => onDelete(user)}
        className="p-1 text-secondary hover:text-primary transition-colors"
        aria-label="Delete user"
      >
        <Trash2 className="h-4 w-4 text-secondary" />
      </button>
    </>
  );
};

export default UserActions;