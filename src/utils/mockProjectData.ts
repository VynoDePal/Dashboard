import { Project } from '../types/project';

const projectNames = [
  'Website Redesign',
  'Mobile App Development',
  'Marketing Campaign',
  'Product Launch',
  'Infrastructure Upgrade',
  'Customer Portal',
  'Data Migration',
  'Security Audit',
];

const members = [
  { id: '1', name: 'John Doe', avatar: 'https://i.pravatar.cc/150?u=john', role: 'Lead Developer' },
  { id: '2', name: 'Jane Smith', avatar: 'https://i.pravatar.cc/150?u=jane', role: 'Designer' },
  { id: '3', name: 'Mike Johnson', role: 'Project Manager' },
  { id: '4', name: 'Sarah Wilson', avatar: 'https://i.pravatar.cc/150?u=sarah', role: 'Developer' },
  { id: '5', name: 'Alex Brown', avatar: 'https://i.pravatar.cc/150?u=alex', role: 'QA Engineer' },
];

const tags = [
  'Frontend',
  'Backend',
  'Design',
  'Marketing',
  'Infrastructure',
  'Security',
  'Mobile',
  'Web',
];

export const generateMockProjects = (count: number): Project[] => {
  return Array.from({ length: count }, (_, i) => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - Math.floor(Math.random() * 30));
    
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + Math.floor(Math.random() * 60) + 30);

    const progress = Math.floor(Math.random() * 100);
    let status: Project['status'] = 'active';
    
    if (progress === 100) {
      status = 'completed';
    } else if (progress > 0) {
      status = 'in_progress';
    }

    return {
      id: `project-${i + 1}`,
      name: projectNames[Math.floor(Math.random() * projectNames.length)],
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      status,
      progress,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      members: Array.from(
        { length: Math.floor(Math.random() * 4) + 2 },
        () => members[Math.floor(Math.random() * members.length)]
      ),
      tags: Array.from(
        { length: Math.floor(Math.random() * 3) + 1 },
        () => tags[Math.floor(Math.random() * tags.length)]
      ),
    };
  });
};