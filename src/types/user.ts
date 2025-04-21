export type UserRole = 'viewer' | 'admin' | 'faculty' | 'management' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  designation?: string;
  profileImage?: string;
  rollNumber?: string;
  organization?: string;
}

export interface StudentUser extends User {
  role: 'student';
  rollNumber: string;
  year: number;
  projectTeams?: string[];
}

export interface FacultyUser extends User {
  role: 'faculty';
  mentorshipAreas: string[];
  projectsGuided: string[];
}

export interface AdminUser extends User {
  role: 'admin';
  permissions: string[];
}

export interface ManagementUser extends User {
  role: 'management';
  position: string;
  department: string;
}

export interface ViewerUser extends User {
  role: 'viewer';
  organization?: string;
  expertise?: string[];
} 