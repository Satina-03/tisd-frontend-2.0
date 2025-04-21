'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '@/types/user';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  department?: string;
  rollNumber?: string;
  organization?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is logged in when the app loads
  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      // TODO: Implement actual API call to check user session
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      console.error('Error checking user session:', err);
      setError('Failed to load user session');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Check if user exists in localStorage (simulating database)
      const allUsers = localStorage.getItem('registeredUsers') || '[]';
      const users = JSON.parse(allUsers);
      const user = users.find((u: User) => u.email === email);

      if (!user) {
        throw new Error('User not found. Please register first.');
      }

      // In a real app, we would verify the password here
      // For now, we'll just check if it matches (NOT SECURE, just for demo)
      if (password !== 'password') { // TODO: Replace with actual password verification
        throw new Error('Invalid password');
      }

      // Store user data
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
    } catch (err) {
      console.error('Login error:', err);
      setError(err instanceof Error ? err.message : 'Failed to login');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      // TODO: Implement actual API call to logout
      localStorage.removeItem('user');
      setUser(null);
    } catch (err) {
      console.error('Logout error:', err);
      setError('Failed to logout');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      setLoading(true);
      setError(null);

      // Get existing users or initialize empty array
      const allUsers = localStorage.getItem('registeredUsers') || '[]';
      const users = JSON.parse(allUsers);

      // Check if email already exists
      if (users.some((u: User) => u.email === userData.email)) {
        throw new Error('Email already registered');
      }

      // Create new user
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: userData.name,
        email: userData.email,
        role: userData.role,
        department: userData.department,
        rollNumber: userData.rollNumber,
        organization: userData.organization,
      };

      // Add to users array and save
      users.push(newUser);
      localStorage.setItem('registeredUsers', JSON.stringify(users));

      // Log user in
      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
    } catch (err) {
      console.error('Registration error:', err);
      setError(err instanceof Error ? err.message : 'Failed to register');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 