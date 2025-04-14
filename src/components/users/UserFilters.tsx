import React from 'react';
import { SortAsc, SortDesc, Grid, List, Table } from 'lucide-react';

export type ViewMode = 'grid' | 'list' | 'table';
export type SortField = 'name' | 'date' | 'status';
export type SortOrder = 'asc' | 'desc';

interface UserFiltersProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  sortField: SortField;
  sortOrder: SortOrder;
  onSortChange: (field: SortField, order: SortOrder) => void;
  showActiveOnly: boolean;
  onActiveFilterChange: (value: boolean) => void;
}

const UserFilters: React.FC<UserFiltersProps> = ({
  viewMode,
  onViewModeChange,
  sortField,
  sortOrder,
  onSortChange,
  showActiveOnly,
  onActiveFilterChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onViewModeChange('grid')}
          className={`p-2 rounded-md ${
            viewMode === 'grid'
              ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
          aria-label="Grid view"
        >
          <Grid className="h-5 w-5" />
        </button>
        <button
          onClick={() => onViewModeChange('list')}
          className={`p-2 rounded-md ${
            viewMode === 'list'
              ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
          aria-label="List view"
        >
          <List className="h-5 w-5" />
        </button>
        <button
          onClick={() => onViewModeChange('table')}
          className={`p-2 rounded-md ${
            viewMode === 'table'
              ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
          aria-label="Table view"
        >
          <Table className="h-5 w-5" />
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <select
          value={`${sortField}-${sortOrder}`}
          onChange={(e) => {
            const [field, order] = e.target.value.split('-') as [SortField, SortOrder];
            onSortChange(field, order);
          }}
          className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
          <option value="date-asc">Date (Oldest)</option>
          <option value="date-desc">Date (Newest)</option>
          <option value="status-asc">Status (Active First)</option>
          <option value="status-desc">Status (Inactive First)</option>
        </select>

        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={showActiveOnly}
            onChange={(e) => onActiveFilterChange(e.target.checked)}
            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
          <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
            Active Only
          </span>
        </label>
      </div>
    </div>
  );
};

export default UserFilters;