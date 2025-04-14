import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import SearchBar from './SearchBar';
import NoteList from './NoteList';
import NoteForm from './NoteForm';
import { Note } from '../../types/note';
import { generateMockNotes } from '../../utils/mockNotesData';

const NotesPage: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>(generateMockNotes(12));
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const handleAddNote = (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newNote: Note = {
      ...note,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setNotes([newNote, ...notes]);
    setIsFormOpen(false);
  };

  const handleUpdateNote = (updatedNote: Note) => {
    setNotes(notes.map(note => 
      note.id === updatedNote.id 
        ? { ...updatedNote, updatedAt: new Date().toISOString() }
        : note
    ));
    setIsFormOpen(false);
    setEditingNote(null);
  };

  const handleDeleteNote = (noteId: string) => {
    setNotes(notes.filter(note => note.id !== noteId));
  };

  const handleTogglePin = (noteId: string) => {
    setNotes(notes.map(note =>
      note.id === noteId ? { ...note, isPinned: !note.isPinned } : note
    ));
  };

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTags = selectedTags.length === 0 ||
                       selectedTags.some(tag => note.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  const pinnedNotes = filteredNotes.filter(note => note.isPinned);
  const unpinnedNotes = filteredNotes.filter(note => !note.isPinned);

  const allTags = Array.from(new Set(notes.flatMap(note => note.tags)));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Notes
          </h1>
          <button
            onClick={() => {
              setEditingNote(null);
              setIsFormOpen(true);
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="h-5 w-5 mr-2" />
            New Note
          </button>
        </div>

        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          tags={allTags}
          selectedTags={selectedTags}
          onTagsChange={setSelectedTags}
        />

        {pinnedNotes.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              Pinned Notes
            </h2>
            <NoteList
              notes={pinnedNotes}
              onEdit={(note) => {
                setEditingNote(note);
                setIsFormOpen(true);
              }}
              onDelete={handleDeleteNote}
              onTogglePin={handleTogglePin}
            />
          </div>
        )}

        <div className="space-y-4">
          {pinnedNotes.length > 0 && (
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              Other Notes
            </h2>
          )}
          <NoteList
            notes={unpinnedNotes}
            onEdit={(note) => {
              setEditingNote(note);
              setIsFormOpen(true);
            }}
            onDelete={handleDeleteNote}
            onTogglePin={handleTogglePin}
          />
        </div>
      </div>

      <NoteForm
        isOpen={isFormOpen}
        note={editingNote}
        onClose={() => {
          setIsFormOpen(false);
          setEditingNote(null);
        }}
        onSubmit={editingNote ? handleUpdateNote : handleAddNote}
        availableTags={allTags}
      />
    </div>
  );
};

export default NotesPage;