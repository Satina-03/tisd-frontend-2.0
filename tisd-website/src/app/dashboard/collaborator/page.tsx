'use client';

import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function CollaboratorDashboard() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Protect the route - only allow collaborators
    if (!user) {
      router.push('/auth/login');
    } else if (user.role !== 'collaborator') {
      router.push(`/dashboard/${user.role}`);
    }
  }, [user, router]);

  if (!user || user.role !== 'collaborator') {
    return null; // or loading spinner
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">Collaborator Dashboard</h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            {/* Main Content */}
            <div className="px-4 py-8 sm:px-0">
              <div className="border-4 border-dashed border-gray-200 rounded-lg p-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {/* Available Projects Card */}
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <h3 className="text-lg font-medium text-gray-900">Available Projects</h3>
                      <p className="mt-1 text-sm text-gray-500">View ongoing projects for collaboration</p>
                    </div>
                  </div>

                  {/* My Collaborations Card */}
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <h3 className="text-lg font-medium text-gray-900">My Collaborations</h3>
                      <p className="mt-1 text-sm text-gray-500">Track your project collaborations</p>
                    </div>
                  </div>

                  {/* Resources Card */}
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <h3 className="text-lg font-medium text-gray-900">Resources</h3>
                      <p className="mt-1 text-sm text-gray-500">Share and access project resources</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 