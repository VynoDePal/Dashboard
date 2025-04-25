import React from 'react';
import { Download, Share2 } from 'lucide-react';

interface HeaderSectionProps {
  dateRange: 'today' | '7d' | '30d' | 'custom';
  onDateRangeChange: (range: 'today' | '7d' | '30d' | 'custom') => void;
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({
  dateRange,
  onDateRangeChange,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}) => {
  return (
    <div className="bg-background text-text rounded-lg border-2 border-secondary shadow-sm p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <select
            value={dateRange}
            onChange={(e) => onDateRangeChange(e.target.value as any)}
            className="rounded-md shadow-md border-secondary bg-background text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="today">Today</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="custom">Custom range</option>
          </select>

          {dateRange === 'custom' && (
            <div className="flex items-center space-x-2">
              <input
                type="date"
                value={startDate}
                onChange={(e) => onStartDateChange(e.target.value)}
                className="rounded-md border-2 border-secondary bg-background text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
              <span className="text-gray-500 dark:text-gray-400">to</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => onEndDateChange(e.target.value)}
                className="rounded-md border-2 border-secondary bg-background text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <button
            className="inline-flex items-center px-4 py-2 border-2 border-secondary rounded-md shadow-sm text-sm font-medium text-text bg-background hover:bg-secondary/20 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Export data"
          >
            <Download className="h-4 w-4 mr-2 text-secondary" />
            Export
          </button>
          <button
            className="inline-flex items-center px-4 py-2 border-2 border-secondary rounded-md shadow-sm text-sm font-medium text-text bg-background hover:bg-secondary/20 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Share dashboard"
          >
            <Share2 className="h-4 w-4 mr-2 text-secondary" />
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderSection;