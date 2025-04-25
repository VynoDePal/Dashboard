import React from 'react';
import { Calendar } from 'lucide-react';
import { NotificationFiltersState, TimeRange, NotificationImportance, NotificationType } from '../../types/notification';

interface NotificationFiltersProps {
  filters: NotificationFiltersState;
  onFiltersChange: (filters: NotificationFiltersState) => void;
}

const NotificationFilters: React.FC<NotificationFiltersProps> = ({ filters, onFiltersChange }) => {
  const timeRanges: { value: TimeRange; label: string }[] = [
    { value: 'today', label: 'Today' },
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: 'custom', label: 'Custom range' },
  ];

  const importanceLevels: { value: NotificationImportance | 'all'; label: string }[] = [
    { value: 'all', label: 'All Importance' },
    { value: 'urgent', label: 'Urgent' },
    { value: 'normal', label: 'Normal' },
    { value: 'low', label: 'Low' },
  ];

  const types: { value: NotificationType | 'all'; label: string }[] = [
    { value: 'all', label: 'All Types' },
    { value: 'info', label: 'Information' },
    { value: 'success', label: 'Success' },
    { value: 'warning', label: 'Warning' },
    { value: 'error', label: 'Error' },
  ];

  return (
    <div className="space-y-4 bg-background text-text rounded-lg border-2 border-secondary p-4 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-text mb-1">
            Time Range
          </label>
          <select
            value={filters.timeRange}
            onChange={(e) => onFiltersChange({ ...filters, timeRange: e.target.value as TimeRange })}
            className="block w-full rounded-md border-secondary shadow-md bg-background text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
          >
            {timeRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        {filters.timeRange === 'custom' && (
          <div className="md:col-span-2 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Start Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={filters.startDate}
                  onChange={(e) => onFiltersChange({ ...filters, startDate: e.target.value })}
                  className="block w-full rounded-md border-secondary shadow-md bg-background text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm pl-10"
                />
                <Calendar className="absolute left-3 top-2 h-5 w-5 text-secondary" aria-hidden="true" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">
                End Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={filters.endDate}
                  onChange={(e) => onFiltersChange({ ...filters, endDate: e.target.value })}
                  className="block w-full rounded-md border-secondary shadow-md bg-background text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm pl-10"
                />
                <Calendar className="absolute left-3 top-2 h-5 w-5 text-secondary" aria-hidden="true" />
              </div>
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-text mb-1">
            Importance
          </label>
          <select
            value={filters.importance}
            onChange={(e) => onFiltersChange({ ...filters, importance: e.target.value as NotificationImportance | 'all' })}
            className="block w-full rounded-md border-secondary shadow-md bg-background text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
          >
            {importanceLevels.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-1">
            Type
          </label>
          <select
            value={filters.type}
            onChange={(e) => onFiltersChange({ ...filters, type: e.target.value as NotificationType | 'all' })}
            className="block w-full rounded-md border-secondary shadow-md bg-background text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
          >
            {types.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default NotificationFilters;