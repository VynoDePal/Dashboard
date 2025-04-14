export type NoteStatus = 'active' | 'archived';

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  isPinned: boolean;
  tags: string[];
  status: NoteStatus;
}