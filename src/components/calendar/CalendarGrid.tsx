import React from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
  addDays,
  startOfWeek,
  endOfWeek
} from 'date-fns';
import { ViewType, Event } from '../../types/calendar';

interface CalendarGridProps {
  view: ViewType;
  currentDate: Date;
  events: Event[];
  onEventClick: (event: Event) => void;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  view,
  currentDate,
  events,
  onEventClick,
}) => {
  const renderMonthView = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const calendarStart = startOfWeek(monthStart);
    const calendarEnd = endOfWeek(monthEnd);

    const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

    return (
      <div className="grid grid-cols-7 gap-px bg-secondary/20 text-text rounded-lg overflow-hidden">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div
            key={day}
            className="bg-background text-text p-2 text-center text-sm font-medium"
          >
            {day}
          </div>
        ))}
        {days.map((day) => {
          const dayEvents = events.filter(event => 
            isSameDay(new Date(event.date), day)
          );

          return (
            <div
              key={day.toISOString()}
              className={`min-h-[100px] p-2 bg-background relative ${
                !isSameMonth(day, currentDate) ? 'opacity-50' : ''
              } ${isToday(day) ? 'bg-secondary/20' : ''}`}
            >
              <span
                className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                  isToday(day) ? 'bg-secondary text-background' : 'text-text/70'
                }`}
              >
                {format(day, 'd')}
              </span>
              <div className="mt-2 space-y-1">
                {dayEvents.map((event) => (
                  <button
                    key={event.id}
                    onClick={() => onEventClick(event)}
                    className={`w-full text-left px-2 py-1 text-xs rounded-md truncate transition-colors duration-200 ${
                      event.type === 'meeting'
                        ? 'bg-primary/20 text-primary'
                        : event.type === 'task'
                        ? 'bg-secondary/20 text-secondary'
                        : 'bg-accent/20 text-accent'
                    }`}
                  >
                    {event.title}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderWeekView = () => {
    const weekStart = startOfWeek(currentDate);
    const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

    return (
      <div className="grid grid-cols-7 gap-4 p-4">
        {days.map((day) => {
          const dayEvents = events.filter(event => 
            isSameDay(new Date(event.date), day)
          );

          return (
            <div
              key={day.toISOString()}
              className="min-h-[600px] border border-gray-200 dark:border-gray-700 rounded-lg p-2"
            >
              <div className="text-center mb-2">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {format(day, 'EEE')}
                </div>
                <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                  isToday(day) ? 'bg-secondary text-background' : 'text-text/70'
                }`}>
                  {format(day, 'd')}
                </div>
              </div>
              <div className="space-y-1">
                {dayEvents.map((event) => (
                  <button
                    key={event.id}
                    onClick={() => onEventClick(event)}
                    className={`w-full text-left px-2 py-1 text-xs rounded-md truncate transition-colors duration-200 ${
                      event.type === 'meeting'
                        ? 'bg-primary/20 text-primary'
                        : event.type === 'task'
                        ? 'bg-secondary/20 text-secondary'
                        : 'bg-accent/20 text-accent'
                    }`}
                  >
                    {event.title}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderDayView = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i);

    return (
      <div className="flex flex-col divide-y divide-gray-200 dark:divide-gray-700">
        {hours.map((hour) => {
          const hourEvents = events.filter(event => 
            new Date(event.date).getHours() === hour
          );

          return (
            <div
              key={hour}
              className="flex items-center min-h-[4rem] group hover:bg-gray-50 dark:hover:bg-gray-800/50"
            >
              <div className="w-20 px-2 py-1 text-right text-sm text-gray-500 dark:text-gray-400">
                {format(new Date().setHours(hour), 'ha')}
              </div>
              <div className="flex-1 border-l border-gray-200 dark:border-gray-700 min-h-[4rem] p-1">
                {hourEvents.map((event) => (
                  <button
                    key={event.id}
                    onClick={() => onEventClick(event)}
                    className={`w-full text-left px-2 py-1 text-xs rounded-md truncate transition-colors duration-200 ${
                      event.type === 'meeting'
                        ? 'bg-primary/20 text-primary'
                        : event.type === 'task'
                        ? 'bg-secondary/20 text-secondary'
                        : 'bg-accent/20 text-accent'
                    }`}
                  >
                    {event.title}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex-1 overflow-auto p-4">
      {view === 'month' && renderMonthView()}
      {view === 'week' && renderWeekView()}
      {view === 'day' && renderDayView()}
    </div>
  );
};

export default CalendarGrid;