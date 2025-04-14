import { Email } from '../types/email';

const sampleContent = `
Dear [Name],

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Best regards,
[Sender]
`;

const senders = [
  { name: 'John Doe', email: 'john.doe@example.com', avatar: 'https://i.pravatar.cc/150?u=john' },
  { name: 'Jane Smith', email: 'jane.smith@example.com', avatar: 'https://i.pravatar.cc/150?u=jane' },
  { name: 'Mike Johnson', email: 'mike.j@example.com' },
  { name: 'Sarah Wilson', email: 'sarah.w@example.com', avatar: 'https://i.pravatar.cc/150?u=sarah' },
];

const subjects = [
  'Project Update - Q1 2024',
  'Meeting Notes from Yesterday',
  'Important: Security Update',
  'Team Building Event Next Week',
  'Quarterly Review Documents',
  'New Feature Release',
  'Holiday Schedule',
  'Budget Approval Required',
];

const attachments = [
  { name: 'document.pdf', size: '2.4 MB', type: 'application/pdf' },
  { name: 'presentation.pptx', size: '5.1 MB', type: 'application/vnd.ms-powerpoint' },
  { name: 'report.xlsx', size: '1.8 MB', type: 'application/vnd.ms-excel' },
  { name: 'image.jpg', size: '3.2 MB', type: 'image/jpeg' },
];

export const generateMockEmails = (count: number): Email[] => {
  return Array.from({ length: count }, (_, i) => {
    const sender = senders[Math.floor(Math.random() * senders.length)];
    const hasAttachments = Math.random() > 0.7;
    
    return {
      id: `email-${i + 1}`,
      from: sender,
      to: [
        { name: 'Me', email: 'me@example.com' },
        ...Array.from({ length: Math.floor(Math.random() * 3) }, () => 
          senders[Math.floor(Math.random() * senders.length)]
        )
      ],
      subject: subjects[Math.floor(Math.random() * subjects.length)],
      preview: sampleContent.split('\n')[3].slice(0, 100) + '...',
      content: sampleContent
        .replace('[Name]', 'Team')
        .replace('[Sender]', sender.name),
      date: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)).toISOString(),
      read: Math.random() > 0.3,
      starred: Math.random() > 0.8,
      hasAttachments,
      ...(hasAttachments && {
        attachments: Array.from(
          { length: Math.floor(Math.random() * 3) + 1 },
          () => attachments[Math.floor(Math.random() * attachments.length)]
        )
      }),
      labels: Math.random() > 0.5 ? ['important'] : undefined,
    };
  });
};