import { User } from '../types/user';

const firstNames = [
  'John', 'Jane', 'Michael', 'Emily', 'David', 'Sarah', 'James', 'Emma',
  'William', 'Olivia', 'Daniel', 'Sophia', 'Matthew', 'Isabella', 'Joseph', 'Mia'
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson'
];

const departments = [
  'Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations', 'Support'
];

const roles = [
  'Manager', 'Senior Developer', 'Junior Developer', 'Analyst', 'Coordinator',
  'Specialist', 'Director'
];

export const generateMockUsers = (count: number): User[] => {
  return Array.from({ length: count }, (_, i) => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const department = departments[Math.floor(Math.random() * departments.length)];
    const role = roles[Math.floor(Math.random() * roles.length)];
    
    return {
      id: `user-${i + 1}`,
      firstName,
      lastName,
      useIcon: Math.random() > 0.5,
      registrationDate: new Date(
        Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)
      ).toISOString(),
      prefersDarkMode: Math.random() > 0.5,
      activityScore: Math.floor(Math.random() * 100),
      isActive: Math.random() > 0.2,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      phone: `+1${Math.floor(Math.random() * 1000000000)}`,
      department,
      role,
      avatar: Math.random() > 0.7 
        ? `https://i.pravatar.cc/150?u=${firstName}-${lastName}` 
        : undefined
    };
  });
};