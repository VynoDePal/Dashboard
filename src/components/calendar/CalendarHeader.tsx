import React from 'react';
import { ViewType } from '../../types/calendar';
import { Calendar, Clock, ListTodo } from 'lucide-react';

interface CalendarHeaderProps {
  view: ViewType;
  onViewChange: (view: ViewType) => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({ view, onViewChange }) => {
  const viewOptions: { value: ViewType; label: string; icon: React.ElementType }[] = [
    { value: 'month', label: 'Month', icon: Calendar },
    { value: 'week', label: 'Week', icon: ListTodo },
    { value: 'day', label: 'Day', icon: Clock },
  ];

  return (
    <div className="flex items-center justify-between p-4 bg-background text-text rounded-lg border-b-2 border-secondary shadow-sm">
      <h1 className="text-2xl font-semibold text-secondary">
        Calendar
      </h1>
      
      <div className="flex items-center space-x-2">
        {viewOptions.map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            onClick={() => onViewChange(value)}
            className={`inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 ${view === value
                ? 'bg-secondary/20 text-secondary dark:bg-secondary dark:text-secondary'
                : 'text-text/70 dark:text-text/70 hover:bg-secondary/10 dark:hover:bg-secondary/50'
              }`}
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