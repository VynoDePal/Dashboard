import React from 'react';
import { Search } from 'lucide-react';

interface UserSearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const UserSearchBar: React.FC<UserSearchBarProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white dark:bg-gray-800 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        placeholder="Search users by name or date..."
      />
    </div>
  );
};

export default UserSearchBar;