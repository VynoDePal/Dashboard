import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { Notification } from '../../types/notification';
import NotificationItem from './NotificationItem';
import EmptyState from './EmptyState';
import Pagination from '../users/Pagination';

interface NotificationTableProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

const NotificationTable: React.FC<NotificationTableProps> = ({
  notifications,
  onMarkAsRead,
  onDelete,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<keyof Notification>('timestamp');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const itemsPerPage = 10;
  const totalPages = Math.ceil(notifications.length / itemsPerPage);

  const sortedNotifications = [...notifications].sort((a, b) => {
    if (sortField === 'timestamp') {
      const aTime = new Date(a[sortField] || 0).getTime();
      const bTime = new Date(b[sortField] || 0).getTime();
      return sortDirection === 'asc' ? aTime - bTime : bTime - aTime;
    }
    
    if (sortField === 'importance') {
      const importanceOrder: Record<string, number> = { low: 0, medium: 1, high: 2 };
      const aImportance = (a.importance || '').toLowerCase();
      const bImportance = (b.importance || '').toLowerCase();
      const aValue = importanceOrder[aImportance] ?? 0;
      const bValue = importanceOrder[bImportance] ?? 0;
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }

    const aValue = String(a[sortField] || '');
    const bValue = String(b[sortField] || '');
    return sortDirection === 'asc' 
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  });

  const paginatedNotifications = sortedNotifications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (notifications.length === 0) {
    return <EmptyState />;
  }

  const handleSort = (field: keyof Notification) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <div className="bg-background text-text shadow-sm rounded-lg border-2 border-secondary overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-secondary">
          <thead className="bg-secondary/20">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                Type
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                Message
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('timestamp')}
              >
                <div className="flex items-center">
                  Date
                  {sortField === 'timestamp' && (
                    <span className="ml-2">
                      {sortDirection === 'asc' ? (
                        <ChevronUp className="h-4 w-4 text-secondary" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-secondary" />
                      )}
                    </span>
                  )}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('importance')}
              >
                <div className="flex items-center">
                  Importance
                  {sortField === 'importance' && (
                    <span className="ml-2">
                      {sortDirection === 'asc' ? (
                        <ChevronUp className="h-4 w-4 text-secondary" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-secondary" />
                      )}
                    </span>
                  )}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-secondary uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-background divide-y divide-secondary">
            {paginatedNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onMarkAsRead={onMarkAsRead}
                onDelete={onDelete}
                view="table"
              />
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default NotificationTable;