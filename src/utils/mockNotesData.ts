import { Note } from '../types/note';

const sampleTitles = [
  'Meeting Notes',
  'Project Ideas',
  'To-Do List',
  'Research Summary',
  'Design Feedback',
  'Weekly Goals',
  'Important Links',
  'Team Updates',
];

const sampleTags = [
  'work',
  'personal',
  'ideas',
  'urgent',
  'follow-up',
  'research',
  'meeting',
  'project',
];

export const generateMockNotes = (count: number): Note[] => {
  return Array.from({ length: count }, (_, i) => {
    const createdAt = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000);
    const updatedAt = new Date(createdAt.getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000);
    
    return {
      id: `note-${i + 1}`,
      title: sampleTitles[Math.floor(Math.random() * sampleTitles.length)],
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      createdAt: createdAt.toISOString(),
      updatedAt: updatedAt.toISOString(),
      isPinned: Math.random() > 0.8,
      tags: Array.from(
        { length: Math.floor(Math.random() * 3) + 1 },
        () => sampleTags[Math.floor(Math.random() * sampleTags.length)]
      ),
      status: Math.random() > 0.2 ? 'active' : 'archived',
    };
  });
};