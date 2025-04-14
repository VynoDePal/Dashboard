export type ViewType = 'month' | 'week' | 'day';
export type EventType = 'meeting' | 'task' | 'reminder';

export interface Event {
  id: string;
  title: string;
  date: string;
  type: EventType;
  description?: string;
}