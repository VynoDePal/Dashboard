import React from 'react';
import { ViewType } from '../../types/calendar';
import { Calendar, Clock, ListTodo } from 'lucide-react';

interface CalendarHeaderProps {
  view: ViewType;
  onViewChange: (view: ViewType) => void;
  currentDate: Date;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  view,
  onViewChange,
  currentDate,
}) => {
  const viewOptions: { value: ViewType; label: string; icon: React.ElementType }[] = [
    { value: 'month', label: 'Month', icon: Calendar },
    { value: 'week', label: 'Week', icon: ListTodo },
    { value: 'day', label: 'Day', icon: Clock },
  ];

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
        Calendar
      </h1>
      
      <div className="flex items-center space-x-2">
        {viewOptions.map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            onClick={() => onViewChange(value)}
            className={`
              inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium
              transition-colors duration-200
              ${view === value
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }
            `}
            aria-label={`View as ${label}`}
          >
            <Icon className="w-4 h-4 mr-1.5" />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CalendarHeader;