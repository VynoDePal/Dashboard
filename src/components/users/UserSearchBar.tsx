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
        <Search className="h-5 w-5 text-secondary" aria-hidden="true" />
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="block w-full pl-10 pr-3 py-2 border-2 border-secondary rounded-md leading-5 bg-background text-text placeholder-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
        placeholder="Search users by name or date..."
      />
    </div>
  );
};

export default UserSearchBar;