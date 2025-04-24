'use client';

import { useState } from 'react';
import axios from '../../../api/axiosInstance'; // your custom axios instance
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { UserRole } from '@/types/user';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '' as UserRole,
    department: '',
    rollNumber: '',
    organization: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const { name, email, password, confirmPassword, role, department, rollNumber, organization } = formData;

    if (!name.trim()) return showError('Name is required');
    if (!email.trim()) return showError('Email is required');
    if (!password) return showError('Password is required');
    if (password !== confirmPassword) return showError('Passwords do not match');
    if (!role) return showError('Please select a role');

    if (role === 'student') {
      if (!rollNumber) return showError('Roll number is required for students');
      if (!department) return showError('Department is required for students');
    }

    if (['faculty', 'management'].includes(role) && !department) {
      return showError('Department is required');
    }

    try {
      await axios.post('/auth/register', {
        name,
        email,
        password,
        role,
        department: department || undefined,
        rollNumber: rollNumber || undefined,
        organization: organization || undefined,
      });
      router.push('/dashboard');
    } catch (err: any) {
      const msg = err?.response?.data?.message || err.message || 'Registration failed';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const showError = (msg: string) => {
    setError(msg);
    setIsLoading(false);
  };

  const renderRoleSpecificFields = () => {
    switch (formData.role) {
      case 'student':
        return (
          <>
            <InputField label="Roll Number" name="rollNumber" value={formData.rollNumber} onChange={handleChange} />
            <InputField label="Department" name="department" value={formData.department} onChange={handleChange} />
          </>
        );
      case 'faculty':
      case 'management':
        return <InputField label="Department" name="department" value={formData.department} onChange={handleChange} />;
      case 'viewer':
        return (
          <InputField
            label="Organization (Optional)"
            name="organization"
            value={formData.organization}
            onChange={handleChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link href="/auth/login" className="font-medium text-blue-600 hover:text-blue-500">
            sign in to your existing account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <InputField label="Full Name" name="name" value={formData.name} onChange={handleChange} />
            <InputField label="Email address" name="email" type="email" value={formData.email} onChange={handleChange} />

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
              <select
                name="role"
                id="role"
                required
                value={formData.role}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900"
              >
                <option value="">Select a role</option>
                <option value="student">Student</option>
                <option value="faculty">Faculty</option>
                <option value="admin">Admin</option>
                <option value="management">Management</option>
                <option value="viewer">Viewer (Industry/NGO)</option>
              </select>
            </div>

            {renderRoleSpecificFields()}

            <InputField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} />
            <InputField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="text-sm font-medium text-red-800">{error}</div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                  }`}
              >
                {isLoading ? 'Registering...' : 'Sign Up'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Reusable input component
function InputField({
  label,
  name,
  value,
  onChange,
  type = 'text',
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        id={name}
        required
        value={value}
        onChange={onChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
    </div>
  );
}
