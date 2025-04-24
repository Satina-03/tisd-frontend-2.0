'use client';

import { useState } from 'react';
import Link from 'next/link';

const collaborations = [
  {
    id: 1,
    type: "NGO",
    name: "Green Earth Foundation",
    description: "Working on environmental sustainability projects",
    projects: ["Smart Waste Management", "Urban Farming"],
    status: "Active",
  },
  {
    id: 2,
    type: "Industry",
    name: "Tech Innovations Ltd",
    description: "Supporting technology-driven sustainable solutions",
    projects: ["IoT Water Management", "Smart Grid"],
    status: "Active",
  },
  {
    id: 3,
    type: "Academic",
    name: "Global Research Institute",
    description: "Research collaboration on sustainable development",
    projects: ["Renewable Energy", "Climate Action"],
    status: "Upcoming",
  },
  // Add more collaborations as needed
];

const opportunities = [
  {
    id: 1,
    title: "Mentorship Program",
    organization: "EcoTech Solutions",
    type: "Industry",
    duration: "6 months",
    deadline: "2024-04-30",
  },
  {
    id: 2,
    title: "Research Partnership",
    organization: "Sustainable Future NGO",
    type: "NGO",
    duration: "1 year",
    deadline: "2024-05-15",
  },
  // Add more opportunities as needed
];

export default function CollaborationsPage() {
  const [activeTab, setActiveTab] = useState('current');

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Collaborations & Partnerships</h1>
          <p className="text-lg text-gray-600">
            Connect with organizations and explore opportunities for sustainable development
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('current')}
              className={`${
                activeTab === 'current'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-900 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Current Collaborations
            </button>
            <button
              onClick={() => setActiveTab('opportunities')}
              className={`${
                activeTab === 'opportunities'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-900 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Opportunities
            </button>
          </nav>
        </div>

        {/* Content */}
        {activeTab === 'current' ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {collaborations.map((collab) => (
              <div
                key={collab.id}
                className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      collab.type === 'NGO' 
                        ? 'bg-green-100 text-green-800'
                        : collab.type === 'Industry'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {collab.type}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      collab.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {collab.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{collab.name}</h3>
                  <p className="text-gray-600 mb-4">{collab.description}</p>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-900">Active Projects:</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600">
                      {collab.projects.map((project, index) => (
                        <li key={index}>{project}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {opportunities.map((opportunity) => (
              <div
                key={opportunity.id}
                className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      opportunity.type === 'NGO'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {opportunity.type}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{opportunity.title}</h3>
                  <p className="text-gray-600 mb-4">{opportunity.organization}</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Duration:</span>
                      <span className="font-medium">{opportunity.duration}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Deadline:</span>
                      <span className="font-medium">{opportunity.deadline}</span>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Link
                      href={`/collaborations/apply/${opportunity.id}`}
                      className="block w-full text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Apply Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 