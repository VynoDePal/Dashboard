import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addMonths, subMonths } from 'date-fns';

interface CalendarNavigationProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
}

const CalendarNavigation: React.FC<CalendarNavigationProps> = ({
  currentDate,
  onDateChange,
}) => {
  const handlePrevMonth = () => {
    onDateChange(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    onDateChange(addMonths(currentDate, 1));
  };

  const handleToday = () => {
    onDateChange(new Date());
  };

  return (
    <div className="flex items-center justify-between p-4 bg-background text-text rounded-lg border-b-2 border-secondary shadow-sm">
      <div className="flex items-center space-x-4">
        <button
          onClick={handleToday}
          className="inline-flex items-center px-4 py-2 text-sm font-medium bg-primary text-white rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          Today
        </button>
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrevMonth}
            className="p-2 rounded-full bg-background border-2 border-secondary text-text/70 hover:bg-secondary/10"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-5 h-5 text-text" />
          </button>
          <button
            onClick={handleNextMonth}
            className="p-2 rounded-full bg-background border-2 border-secondary text-text/70 hover:bg-secondary/10"
            aria-label="Next month"
          >
            <ChevronRight className="w-5 h-5 text-text" />
          </button>
        </div>
      </div>
      
      <h2 className="text-xl font-semibold text-secondary">
        {format(currentDate, 'MMMM yyyy')}
      </h2>
    </div>
  );
};

export default CalendarNavigation;