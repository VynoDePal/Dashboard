import React from 'react';
import { Outlet } from 'react-router-dom';
import CalendarMain from '../components/calendar/CalendarMain';

const Calendar: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <CalendarMain />
      <Outlet />
    </div>
  );
};

export default Calendar;