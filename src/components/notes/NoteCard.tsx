import React from 'react';
import { format } from 'date-fns';
import { Edit2, Trash2, Pin, PinOff } from 'lucide-react';
import { Note } from '../../types/note';

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
  onTogglePin: (id: string) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({
  note,
  onEdit,
  onDelete,
  onTogglePin,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {note.title}
          </h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onTogglePin(note.id)}
              className={`p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 ${
                note.isPinned ? 'text-blue-500' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
              }`}
              aria-label={note.isPinned ? 'Unpin note' : 'Pin note'}
            >
              {note.isPinned ? (
                <Pin className="h-5 w-5" />
              ) : (
                <PinOff className="h-5 w-5" />
              )}
            </button>
            <button
              onClick={() => onEdit(note)}
              className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Edit note"
            >
              <Edit2 className="h-5 w-5" />
            </button>
            <button
              onClick={() => onDelete(note.id)}
              className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Delete note"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>

        <p className="mt-2 text-gray-600 dark:text-gray-300 line-clamp-3">
          {note.content}
        </p>

        {note.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {note.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
          Last updated {format(new Date(note.updatedAt), 'MMM d, yyyy')}
        </div>
      </div>
    </div>
  );
};

export default NoteCard;