import React from 'react';
import { Search } from 'lucide-react';
import { SortOption } from '../../types/feed';

interface FeedFilterBarProps {
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const FeedFilterBar: React.FC<FeedFilterBarProps> = ({
  sortOption,
  onSortChange,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
      <div className="relative flex-1 max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search posts..."
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div className="flex items-center space-x-2">
        <label className="text-sm text-gray-700 dark:text-gray-300">Sort by:</label>
        <select
          value={sortOption}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="latest">Latest</option>
          <option value="popular">Most Popular</option>
          <option value="trending">Trending</option>
        </select>
      </div>
    </div>
  );
};

export default FeedFilterBar;