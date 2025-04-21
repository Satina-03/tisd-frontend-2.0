export type UserRole = 'admin' | 'student' | 'faculty' | 'management' | 'viewer';

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
  department: string;
}

export interface FacultyUser extends User {
  role: 'faculty';
  department: string;
}

export interface AdminUser extends User {
  role: 'admin';
  permissions: string[];
}

export interface ManagementUser extends User {
  role: 'management';
  department: string;
}

export interface ViewerUser extends User {
  role: 'viewer';
  organization?: string;
} 