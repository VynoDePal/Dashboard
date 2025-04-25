import React from 'react';
import UserCard from './UserCard';
import UserTableRow from './UserTableRow';
import UserListItem from './UserListItem';
import Pagination from './Pagination';
import { User } from '../../types/user';
import { ViewMode } from './UserFilters';

interface UserListProps {
  users: User[];
  isLoading?: boolean;
  viewMode: ViewMode;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onView: (user: User) => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

const UserList: React.FC<UserListProps> = ({
  users,
  isLoading,
  viewMode,
  currentPage,
  totalPages,
  onPageChange,
  onView,
  onEdit,
  onDelete,
}) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse bg-secondary/20 h-20 rounded-lg"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}

      {viewMode === 'list' && (
        <div className="space-y-4">
          {users.map((user) => (
            <UserListItem
              key={user.id}
              user={user}
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}

      {viewMode === 'table' && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-secondary">
            <thead className="bg-secondary/20">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                  User
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                  Joined
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-secondary uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-background divide-y divide-secondary">
              {users.map((user) => (
                <UserTableRow
                  key={user.id}
                  user={user}
                  onView={onView}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default UserList;