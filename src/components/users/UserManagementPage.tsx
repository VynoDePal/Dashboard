import React, { useState, useEffect } from 'react';
import UserList from './UserList';
import UserSearchBar from './UserSearchBar';
import UserFilters, { ViewMode, SortField, SortOrder } from './UserFilters';
import UserModal from './modals/UserModal';
import UserEditModal from './modals/UserEditModal';
import DeleteConfirmationModal from './modals/DeleteConfirmationModal';
import { User } from '../../types/user';
import { generateMockUsers } from '../../utils/mockData';

const UserManagementPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [showActiveOnly, setShowActiveOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const usersPerPage = 10;

  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      const mockUsers = generateMockUsers(100);
      setUsers(mockUsers);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let result = [...users];

    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(
        (user) =>
          user.firstName.toLowerCase().includes(searchLower) ||
          user.lastName.toLowerCase().includes(searchLower) ||
          new Date(user.registrationDate)
            .toLocaleDateString()
            .includes(searchTerm)
      );
    }

    // Apply active filter
    if (showActiveOnly) {
      result = result.filter((user) => user.isActive);
    }

    // Apply sorting
    result.sort((a, b) => {
      let compareResult = 0;
      switch (sortField) {
        case 'name':
          compareResult = `${a.lastName} ${a.firstName}`.localeCompare(
            `${b.lastName} ${b.firstName}`
          );
          break;
        case 'date':
          compareResult =
            new Date(a.registrationDate).getTime() -
            new Date(b.registrationDate).getTime();
          break;
        case 'status':
          compareResult = Number(b.isActive) - Number(a.isActive);
          break;
      }
      return sortOrder === 'asc' ? compareResult : -compareResult;
    });

    setFilteredUsers(result);
    setCurrentPage(1);
  }, [users, searchTerm, showActiveOnly, sortField, sortOrder]);

  const handleView = (user: User) => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleDelete = (user: User) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedUser) {
      setUsers(users.filter((u) => u.id !== selectedUser.id));
      setIsDeleteModalOpen(false);
      setSelectedUser(null);
    }
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
    setIsEditModalOpen(false);
    setSelectedUser(null);
  };

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Users
        </h1>
      </div>

      <div className="space-y-4">
        <UserSearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <UserFilters
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          sortField={sortField}
          sortOrder={sortOrder}
          onSortChange={(field, order) => {
            setSortField(field);
            setSortOrder(order);
          }}
          showActiveOnly={showActiveOnly}
          onActiveFilterChange={setShowActiveOnly}
        />
      </div>

      <UserList
        users={paginatedUsers}
        isLoading={isLoading}
        viewMode={viewMode}
        currentPage={currentPage}
        totalPages={Math.ceil(filteredUsers.length / usersPerPage)}
        onPageChange={setCurrentPage}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {selectedUser && (
        <>
          <UserModal
            user={selectedUser}
            isOpen={isViewModalOpen}
            onClose={() => setIsViewModalOpen(false)}
          />
          <UserEditModal
            user={selectedUser}
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onSave={handleUpdateUser}
          />
          <DeleteConfirmationModal
            user={selectedUser}
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={handleDeleteConfirm}
          />
        </>
      )}
    </div>
  );
};

export default UserManagementPage;