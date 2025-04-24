'use client';

import { useState } from 'react';
import Link from 'next/link';

// Mock data for projects
const mockProjects = [
  {
    id: 1,
    title: "Smart Waste Management System",
    description: "IoT-based solution for efficient waste collection and segregation",
    sdgs: ["11", "12", "13"],
    department: "Computer Science",
    status: "Ongoing",
  },
  {
    id: 2,
    title: "Solar-Powered Water Purifier",
    description: "Sustainable water purification system for rural communities",
    sdgs: ["6", "7", "3"],
    department: "Mechanical Engineering",
    status: "Completed",
  },
  {
    id: 3,
    title: "Urban Farming Initiative",
    description: "Vertical farming solution for urban food security",
    sdgs: ["2", "11", "12"],
    department: "Agriculture",
    status: "Ongoing",
  },
  // Add more mock projects as needed
];

export default function ProjectsPage() {
  const [filter, setFilter] = useState('all');

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">Projects</h1>
          <div className="flex space-x-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900"
            >
              <option value="all" className="text-gray-900">All Projects</option>
              <option value="ongoing" className="text-gray-900">Ongoing</option>
              <option value="completed" className="text-gray-900">Completed</option>
            </select>
            <Link
              href="/projects/new"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Add Project
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mockProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    project.status === 'Ongoing' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.sdgs.map((sdg) => (
                    <span
                      key={sdg}
                      className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
                    >
                      SDG {sdg}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{project.department}</span>
                  <Link
                    href={`/projects/${project.id}`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 