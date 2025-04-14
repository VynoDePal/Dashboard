import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Plus } from 'lucide-react';
import CalendarHeader from './CalendarHeader';
import CalendarNavigation from './CalendarNavigation';
import CalendarGrid from './CalendarGrid';
import EventForm from './EventForm';
import EventDetails from './EventDetails';
import { ViewType, Event } from '../../types/calendar';

const CalendarMain: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<ViewType>('month');
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isEventFormOpen, setIsEventFormOpen] = useState(false);
  const [isEventDetailsOpen, setIsEventDetailsOpen] = useState(false);

  const handleDateChange = (date: Date) => {
    setCurrentDate(date);
  };

  const handleViewChange = (newView: ViewType) => {
    setView(newView);
  };

  const handleEventAdd = (event: Event) => {
    setEvents([...events, event]);
    navigate('/calendar');
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setIsEventDetailsOpen(true);
    navigate(`/calendar/event/${event.id}`);
  };

  const handleEventEdit = (event: Event) => {
    setSelectedEvent(event);
    setIsEventDetailsOpen(false);
    setIsEventFormOpen(true);
    navigate(`/calendar/event/${event.id}/edit`);
  };

  const handleEventDelete = (eventId: string) => {
    setEvents(events.filter(e => e.id !== eventId));
    setIsEventDetailsOpen(false);
    navigate('/calendar');
  };

  const handleEventUpdate = (updatedEvent: Event) => {
    setEvents(events.map(e => e.id === updatedEvent.id ? updatedEvent : e));
    setIsEventFormOpen(false);
    navigate('/calendar');
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <CalendarHeader 
        view={view} 
        onViewChange={handleViewChange}
        currentDate={currentDate}
      />
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-700">
        <CalendarNavigation 
          currentDate={currentDate} 
          onDateChange={handleDateChange}
        />
        <button
          onClick={() => {
            setIsEventFormOpen(true);
            navigate('/calendar/new');
          }}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Event
        </button>
      </div>
      <CalendarGrid 
        view={view}
        currentDate={currentDate}
        events={events}
        onEventClick={handleEventClick}
      />

      <EventForm
        isOpen={isEventFormOpen}
        onClose={() => {
          setIsEventFormOpen(false);
          navigate('/calendar');
        }}
        onSubmit={selectedEvent ? handleEventUpdate : handleEventAdd}
        initialData={selectedEvent}
      />

      {selectedEvent && (
        <EventDetails
          event={selectedEvent}
          isOpen={isEventDetailsOpen}
          onClose={() => {
            setIsEventDetailsOpen(false);
            navigate('/calendar');
          }}
          onEdit={handleEventEdit}
          onDelete={handleEventDelete}
        />
      )}
    </div>
  );
};

export default CalendarMain;