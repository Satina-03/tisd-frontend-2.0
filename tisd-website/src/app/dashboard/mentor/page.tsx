'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  FiUsers, 
  FiBook, 
  FiBarChart2, 
  FiCheckCircle, 
  FiMessageSquare,
  FiCalendar,
  FiFileText,
  FiAward,
  FiLink,
  FiHome,
  FiSettings,
  FiSearch
} from 'react-icons/fi';
import ProjectManagementCard from '@/components/ProjectManagementCard';
import StudentTrackingCard from '@/components/StudentTrackingCard';
import FacultyProjectManagement from '@/components/FacultyProjectManagement';
import ExpertConnections from '@/components/ExpertConnections';

export default function MentorDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: FiHome },
    { id: 'students', label: 'Student Progress', icon: FiBarChart2 },
    { id: 'projects', label: 'Project Management', icon: FiBook },
    { id: 'reviews', label: 'Project Reviews', icon: FiAward },
    { id: 'experts', label: 'Expert Network', icon: FiUsers },
    { id: 'faculty', label: 'Projects', icon: FiFileText },
    { id: 'settings', label: 'Settings', icon: FiSettings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div>
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <motion.div 
                className="bg-gradient-to-br from-rose-500 to-rose-600 rounded-lg shadow-lg p-6 relative overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="absolute right-0 top-0 -mt-4 -mr-4 w-24 h-24 rounded-full bg-rose-400/20 blur-2xl transform group-hover:scale-150 transition-transform duration-500"></div>
                <div className="flex items-center space-x-4 relative z-10">
                  <div className="p-3 bg-white/20 backdrop-blur-sm rounded-lg">
                    <FiUsers className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-white/80">Active Students</p>
                    <motion.p 
                      className="text-3xl font-bold text-white"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      12
                    </motion.p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg shadow-lg p-6 relative overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="absolute right-0 top-0 -mt-4 -mr-4 w-24 h-24 rounded-full bg-emerald-400/20 blur-2xl transform group-hover:scale-150 transition-transform duration-500"></div>
                <div className="flex items-center space-x-4 relative z-10">
                  <div className="p-3 bg-white/20 backdrop-blur-sm rounded-lg">
                    <FiBook className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-white/80">Active Projects</p>
                    <motion.p 
                      className="text-3xl font-bold text-white"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      8
                    </motion.p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg shadow-lg p-6 relative overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="absolute right-0 top-0 -mt-4 -mr-4 w-24 h-24 rounded-full bg-amber-400/20 blur-2xl transform group-hover:scale-150 transition-transform duration-500"></div>
                <div className="flex items-center space-x-4 relative z-10">
                  <div className="p-3 bg-white/20 backdrop-blur-sm rounded-lg">
                    <FiCheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-white/80">Pending Feedback</p>
                    <motion.p 
                      className="text-3xl font-bold text-white"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      3
                    </motion.p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="bg-gradient-to-br from-violet-500 to-violet-600 rounded-lg shadow-lg p-6 relative overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="absolute right-0 top-0 -mt-4 -mr-4 w-24 h-24 rounded-full bg-violet-400/20 blur-2xl transform group-hover:scale-150 transition-transform duration-500"></div>
                <div className="flex items-center space-x-4 relative z-10">
                  <div className="p-3 bg-white/20 backdrop-blur-sm rounded-lg">
                    <FiMessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-white/80">Unread Messages</p>
                    <motion.p 
                      className="text-3xl font-bold text-white"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      5
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            </div>
            <div className="grid grid-cols-1 gap-6">
              <StudentTrackingCard />
              <ProjectManagementCard />
            </div>
          </div>
        );
      case 'students':
        return <StudentTrackingCard />;
      case 'projects':
        return <ProjectManagementCard />;
      case 'faculty':
        return <FacultyProjectManagement />;
      case 'experts':
        return <ExpertConnections />;
      case 'reviews':
        return (
          <div className="space-y-6">
            {/* Filters and Search */}
            <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
              <div className="flex space-x-4">
                <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200">
                  All Reviews
                </button>
                <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
                  Pending
                </button>
                <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
                  Completed
                </button>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search projects..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                <FiSearch className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>

            {/* Project Review Cards */}
            <div className="grid gap-6">
              {/* Urgent Review */}
              <div className="bg-red-50 rounded-lg p-6 border border-red-100">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium text-gray-900">Sustainable Energy Project</h3>
                      <span className="px-2.5 py-0.5 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                        Urgent Review
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">Due: May 15, 2024</p>
                    <div className="mt-4 flex items-center space-x-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <FiUsers className="mr-1" />
                        <span>4 Students</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <FiCalendar className="mr-1" />
                        <span>Phase 2 Review</span>
                      </div>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                    Review Now
                  </button>
                </div>
              </div>

              {/* Pending Review */}
              <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-100">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium text-gray-900">Waste Management System</h3>
                      <span className="px-2.5 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                        Pending Review
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">Due: May 20, 2024</p>
                    <div className="mt-4 flex items-center space-x-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <FiUsers className="mr-1" />
                        <span>3 Students</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <FiCalendar className="mr-1" />
                        <span>Initial Review</span>
                      </div>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700">
                    Review
                  </button>
                </div>
              </div>

              {/* In Progress Review */}
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium text-gray-900">Smart City Solutions</h3>
                      <span className="px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        In Progress
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">Due: May 25, 2024</p>
                    <div className="mt-4 flex items-center space-x-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <FiUsers className="mr-1" />
                        <span>5 Students</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <FiCalendar className="mr-1" />
                        <span>Final Review</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="w-full bg-blue-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                      </div>
                      <span className="text-sm text-gray-500 mt-1">Review Progress: 60%</span>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Continue Review
                  </button>
                </div>
              </div>

              {/* Completed Review */}
              <div className="bg-green-50 rounded-lg p-6 border border-green-100">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium text-gray-900">Renewable Energy Grid</h3>
                      <span className="px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                        Completed
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">Reviewed: May 10, 2024</p>
                    <div className="mt-4 flex items-center space-x-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <FiUsers className="mr-1" />
                        <span>3 Students</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <FiCalendar className="mr-1" />
                        <span>Phase 1 Review</span>
                      </div>
                    </div>
                  </div>
                  <button className="px-4 py-2 border border-green-600 text-green-600 rounded-md hover:bg-green-50">
                    View Feedback
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50/50">
      {/* Sidebar */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-64 bg-white shadow-xl rounded-r-2xl"
      >
        <div className="p-6 border-b border-gray-100">
          <motion.h1 
            className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Mentor Dashboard
          </motion.h1>
        </div>
        <nav className="mt-2">
          {navigationItems.map((item, index) => (
            <motion.button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-2 px-6 py-3 text-sm font-medium transition-all duration-200 ${
                activeTab === item.id
                ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600 shadow-sm'
                : 'text-gray-600 hover:bg-blue-50/50 hover:text-blue-600'
              }`}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ x: 4 }}
            >
              <item.icon className={`w-5 h-5 transition-transform duration-200 ${activeTab === item.id ? 'scale-110' : ''}`} />
              <span>{item.label}</span>
            </motion.button>
          ))}
        </nav>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <motion.div 
          className="p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-7xl mx-auto">
            <motion.div 
              className="flex items-center justify-between mb-6"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                {navigationItems.find(item => item.id === activeTab)?.label}
              </h2>
            </motion.div>
            {renderContent()}
          </div>
        </motion.div>
      </div>
    </div>
  );
} 