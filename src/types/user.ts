export interface User {
  id: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  useIcon?: boolean;
  registrationDate: string;
  prefersDarkMode: boolean;
  activityScore: number;
  isActive: boolean;
  email: string;
  phone: string;
  department: string;
  role: string;
}