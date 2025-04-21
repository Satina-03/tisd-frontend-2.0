import { useState } from 'react';
import { FiUsers, FiBook, FiMail, FiLink, FiPlus } from 'react-icons/fi';

interface FacultyProject {
  id: string;
  title: string;
  description: string;
  students: string[];
  sdgs: string[];
  experts: string[];
  status: 'active' | 'completed' | 'archived';
  lastUpdate: string;
}

export default function FacultyProjectManagement() {
  const [projects] = useState<FacultyProject[]>([
    {
      id: '1',
      title: 'Sustainable Energy Research',
      description: 'Research project on renewable energy solutions',
      students: ['John Doe', 'Sarah Smith'],
      sdgs: ['SDG 7', 'SDG 13'],
      experts: ['Dr. Green (NGO)', 'Prof. Energy (Industry)'],
      status: 'active',
      lastUpdate: '2 days ago'
    },
    {
      id: '2',
      title: 'Waste Management Innovation',
      description: 'Developing smart waste management solutions',
      students: ['Mike Johnson', 'Emily Davis'],
      sdgs: ['SDG 11', 'SDG 12'],
      experts: ['Waste Solutions Inc.', 'Green Earth NGO'],
      status: 'active',
      lastUpdate: '1 week ago'
    }
  ]);

  const getStatusColor = (status: FacultyProject['status']) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-50';
      case 'completed':
        return 'text-blue-600 bg-blue-50';
      case 'archived':
        return 'text-gray-600 bg-gray-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <FiPlus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
                <p className="text-gray-600">{project.description}</p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Students Section */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-gray-500">
                  <FiUsers className="w-4 h-4" />
                  <span className="font-medium">Students</span>
                </div>
                <div className="space-y-1">
                  {project.students.map((student) => (
                    <div key={student} className="flex items-center justify-between">
                      <span className="text-gray-700">{student}</span>
                      <button className="text-blue-600 hover:text-blue-700">
                        <FiMail className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* SDGs Section */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-gray-500">
                  <FiBook className="w-4 h-4" />
                  <span className="font-medium">SDGs</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.sdgs.map((sdg) => (
                    <span
                      key={sdg}
                      className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs"
                    >
                      {sdg}
                    </span>
                  ))}
                </div>
              </div>

              {/* Experts Section */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-gray-500">
                  <FiLink className="w-4 h-4" />
                  <span className="font-medium">Experts</span>
                </div>
                <div className="space-y-1">
                  {project.experts.map((expert) => (
                    <div key={expert} className="flex items-center justify-between">
                      <span className="text-gray-700">{expert}</span>
                      <button className="text-blue-600 hover:text-blue-700">
                        <FiMail className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <p className="text-sm text-gray-500">Last updated: {project.lastUpdate}</p>
              <div className="space-x-2">
                <button className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Update Progress
                </button>
                <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 