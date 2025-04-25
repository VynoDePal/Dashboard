import React from 'react';
import { X } from 'lucide-react';
import { format } from 'date-fns';
import { User } from '../../../types/user';

interface UserModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
}

const UserModal: React.FC<UserModalProps> = ({ user, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          onClick={onClose}
        ></div>

        <div
          className="inline-block align-bottom bg-background text-text rounded-lg border-2 border-secondary overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        >
          <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4 bg-background text-text">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-medium text-text">
                User Details
              </h3>
              <button
                onClick={onClose}
                className="text-secondary hover:text-primary transition-colors"
              >
                <X className="h-6 w-6 text-secondary" />
              </button>
            </div>
            <div className="mt-4 space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Name
                </h4>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                  {user.firstName} {user.lastName}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Email
                </h4>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                  {user.email}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Phone
                </h4>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                  {user.phone}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Department
                </h4>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                  {user.department}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Role
                </h4>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                  {user.role}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Registration Date
                </h4>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                  {format(new Date(user.registrationDate), 'MM/dd/yyyy')}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Status
                </h4>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                    user.isActive
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {user.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>
          <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border-2 border-secondary bg-background text-text hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary sm:mt-0 sm:w-auto sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;