'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import * as FiIcons from 'react-icons/fi';
import ProjectCreationForm from '@/components/ProjectCreationForm';
import MentorshipRequestForm from '@/components/MentorshipRequestForm';
import FileUpload from '@/components/FileUpload';
import ProjectSearch from '@/components/ProjectSearch';
import CollaborationHub from '@/components/CollaborationHub';
import SustainabilityScoreCalculator from '@/components/SustainabilityScoreCalculator';
import ProjectTimeline from '@/components/ProjectTimeline';
import SustainabilityImpactTracker from '@/components/SustainabilityImpactTracker';

export default function StudentDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('my-projects');

  useEffect(() => {
    // Protect the route - only allow students
    if (!user) {
      router.push('/auth/login');
    } else if (user.role !== 'student') {
      router.push(`/dashboard/${user.role}`);
    }
  }, [user, router]);

  if (!user || user.role !== 'student') {
    return null;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'my-projects':
        return (
          <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-white rounded-lg shadow p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome, {user.name}</h1>
              <p className="text-gray-600">Manage your sustainable development projects and track your impact.</p>
            </div>

            {/* Create Project Section */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Create New Project</h3>
                <button
                  onClick={() => setActiveTab('create-project')}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  <FiIcons.FiPlus className="mr-2" /> New Project
                </button>
              </div>
              <p className="text-gray-600">Start a new project and map it to relevant SDGs</p>
            </div>

            {/* Active Projects List */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900">Active Projects</h3>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">Smart Water Management System</h4>
                      <p className="mt-1 text-gray-600">SDGs: Clean Water and Sanitation, Sustainable Cities</p>
                    </div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      In Progress
                    </span>
                  </div>
                  <div className="mt-4 flex items-center space-x-4">
                    <button className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                      <FiIcons.FiUpload className="mr-2" /> Upload Files
                    </button>
                    <button className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                      <FiIcons.FiMessageSquare className="mr-2" /> Mentor Feedback
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'create-project':
        return <ProjectCreationForm />;

      case 'find-projects':
        return <ProjectSearch />;

      case 'mentorship':
        return <MentorshipRequestForm />;

      case 'documentation':
        return <FileUpload />;

      case 'collaboration':
        return <CollaborationHub />;

      case 'sustainability':
        return <SustainabilityScoreCalculator />;

      case 'timeline':
        return <ProjectTimeline />;

      case 'impact-tracker':
        return <SustainabilityImpactTracker />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Navigation */}
          <div className="w-full md:w-64 bg-white rounded-lg shadow p-4 h-fit">
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('my-projects')}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'my-projects'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <FiIcons.FiFolder className="mr-3" />
                My Projects
              </button>
              <button
                onClick={() => setActiveTab('create-project')}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'create-project'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <FiIcons.FiPlus className="mr-3" />
                Create Project
              </button>
              <button
                onClick={() => setActiveTab('find-projects')}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'find-projects'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <FiIcons.FiSearch className="mr-3" />
                Find Projects
              </button>
              <button
                onClick={() => setActiveTab('mentorship')}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'mentorship'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <FiIcons.FiUsers className="mr-3" />
                Mentorship
              </button>
              <button
                onClick={() => setActiveTab('documentation')}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'documentation'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <FiIcons.FiFile className="mr-3" />
                Documentation
              </button>
              <button
                onClick={() => setActiveTab('collaboration')}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'collaboration'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <FiIcons.FiUsers className="mr-3" />
                Collaboration
              </button>
              <button
                onClick={() => setActiveTab('sustainability')}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'sustainability'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <FiIcons.FiTrendingUp className="mr-3" />
                Sustainability Score
              </button>
              <button
                onClick={() => setActiveTab('timeline')}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'timeline'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <FiIcons.FiClock className="mr-3" />
                Project Timeline
              </button>
              <button
                onClick={() => setActiveTab('impact-tracker')}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'impact-tracker'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <FiIcons.FiAward className="mr-3" />
                Impact Tracker
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-white rounded-lg shadow p-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
} 