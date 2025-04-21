'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { UserRole } from '@/types/user';

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '' as UserRole | '',
  });
  const [userRole, setUserRole] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login, register, user } = useAuth();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (isSignUp) {
        // Register new user
        if (!formData.role) {
          setError('Please select a role to register');
          return;
        }
        await register({
          name: formData.email.split('@')[0],
          email: formData.email,
          password: formData.password,
          role: formData.role as UserRole,
        });
        // Redirect to role-specific dashboard
        router.push(`/dashboard/${formData.role}`);
      } else {
        // Login existing user
        await login(formData.email, formData.password);
        // After successful login, user will be set in context
        if (user?.role) {
          setUserRole(user.role);
          // Wait for 1 second to show the role before redirecting
          setTimeout(() => {
            router.push(`/dashboard/${user.role}`);
          }, 1000);
        }
      }
    } catch (err) {
      setError(isSignUp ? 'Failed to register' : 'Failed to login. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {isSignUp ? 'Create an Account' : 'Sign in to your Account'}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* Toggle Buttons */}
          <div className="flex space-x-4 mb-6">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(false);
                setUserRole('');
              }}
              className={`flex-1 py-2 px-4 rounded-md ${
                !isSignUp
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => {
                setIsSignUp(true);
                setUserRole('');
              }}
              className={`flex-1 py-2 px-4 rounded-md ${
                isSignUp
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete={isSignUp ? 'new-password' : 'current-password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {isSignUp && (
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-900">
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  required={isSignUp}
                  value={formData.role}
                  onChange={handleChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md text-gray-900"
                >
                  <option value="">Select your role</option>
                  <option value="student">Student</option>
                  <option value="mentor">Mentor</option>
                  <option value="admin">Admin</option>
                  <option value="collaborator">Collaborator</option>
                </select>
              </div>
            )}

            {!isSignUp && userRole && (
              <div className="rounded-md bg-blue-50 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">
                      Logged in as: {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                    </h3>
                    <div className="mt-2 text-sm text-blue-700">
                      <p>Redirecting to your dashboard...</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="text-red-600 text-sm">{error}</div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Login'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 