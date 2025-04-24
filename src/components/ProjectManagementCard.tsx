import { useState } from 'react';
import { FiBook, FiCalendar, FiUsers, FiLink, FiUpload, FiMessageSquare, FiPlus } from 'react-icons/fi';
import SDGIcon from './SDGIcon';

interface Project {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'completed' | 'on-hold';
  startDate: string;
  endDate: string;
  teamSize: number;
  sdgFocus: number[];
  resources: string[];
  expertConnections: string[];
  milestones: {
    title: string;
    dueDate: string;
    status: 'completed' | 'in-progress' | 'pending';
  }[];
}

export default function ProjectManagementCard() {
  const [projects] = useState<Project[]>([
    {
      id: '1',
      title: 'Sustainable Energy Project',
      description: 'Developing renewable energy solutions for urban areas',
      status: 'active',
      startDate: '2024-01-15',
      endDate: '2024-06-15',
      teamSize: 4,
      sdgFocus: [7, 13],
      resources: [
        'Energy Efficiency Guidelines.pdf',
        'Renewable Energy Case Studies.pdf'
      ],
      expertConnections: [
        'Dr. Sarah Green - Renewable Energy Expert',
        'Prof. John Smith - Urban Planning Specialist'
      ],
      milestones: [
        {
          title: 'Initial Research Phase',
          dueDate: '2024-02-15',
          status: 'completed'
        },
        {
          title: 'Prototype Development',
          dueDate: '2024-04-15',
          status: 'in-progress'
        },
        {
          title: 'Final Implementation',
          dueDate: '2024-06-15',
          status: 'pending'
        }
      ]
    }
  ]);

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'active':
        return 'text-green-600';
      case 'completed':
        return 'text-blue-600';
      case 'on-hold':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  const getMilestoneStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-[#00AB55]';
      case 'in-progress':
        return 'text-[#2F80ED]';
      case 'pending':
        return 'text-[#FF8B00]';
      default:
        return 'text-gray-600';
    }
  };

  const formatMilestoneStatus = (status: string) => {
    switch (status) {
      case 'completed':
        return 'completed';
      case 'in-progress':
        return 'in-progress';
      case 'pending':
        return 'pending';
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    const [_, month, day] = dateString.split('-');
    return `${month.padStart(2, '0')} ${day.padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {projects.map((project) => (
        <div key={project.id} className="bg-white rounded-lg p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start space-x-3">
              <FiBook className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <h3 className="font-medium text-gray-900">{project.title}</h3>
                <p className="text-sm text-gray-500">{project.description}</p>
              </div>
            </div>
            <span className={`text-sm font-medium ${getStatusColor(project.status)}`}>
              {project.status}
            </span>
          </div>

          {/* Project Info */}
          <div className="flex items-center space-x-6 mb-6 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <FiCalendar className="w-4 h-4" />
              <span>Start: Jan 15</span>
            </div>
            <div className="flex items-center space-x-2">
              <FiCalendar className="w-4 h-4" />
              <span>End: Jun 15</span>
            </div>
            <div className="flex items-center space-x-2">
              <FiUsers className="w-4 h-4" />
              <span>Team: 4</span>
            </div>
          </div>

          {/* SDG Focus */}
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <div className="flex items-center space-x-2 mb-3">
              <FiBook className="w-4 h-4 text-gray-600" />
              <h4 className="text-sm font-medium text-gray-900">SDG Focus</h4>
            </div>
            <div className="flex items-center gap-4">
              {project.sdgFocus.map((sdgNumber) => (
                <SDGIcon key={sdgNumber} sdgNumber={sdgNumber} size={32} />
              ))}
            </div>
          </div>

          {/* Milestones */}
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <div className="flex items-center space-x-2 mb-4">
              <FiCalendar className="w-4 h-4 text-gray-600" />
              <h4 className="text-sm font-medium text-gray-900">Milestones</h4>
            </div>
            <div className="space-y-3">
              {project.milestones.map((milestone, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-sm ${getMilestoneStatusColor(milestone.status)}`}>
                      {formatMilestoneStatus(milestone.status)}
                    </span>
                    <span className="text-sm text-gray-600">{milestone.title}</span>
                  </div>
                  <span className="text-sm text-gray-500 tabular-nums">{formatDate(milestone.dueDate)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Project Resources */}
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <h4 className="text-sm font-medium text-blue-900 mb-3">Project Resources</h4>
            <div className="space-y-2">
              {project.resources.map((resource, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                  <FiUpload className="w-4 h-4 text-blue-600" />
                  <span>{resource}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Project Review & Expert Network */}
          <div className="space-y-4">
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-purple-900 mb-3">Project Review</h4>
              <div className="space-y-2">
                <button className="w-full flex items-center justify-between p-2 rounded-md hover:bg-purple-100 transition-colors">
                  <div className="flex items-center space-x-2">
                    <FiMessageSquare className="w-4 h-4 text-purple-600" />
                    <span className="text-sm text-gray-600">Review Progress</span>
                  </div>
                  <FiMessageSquare className="w-4 h-4 text-purple-600" />
                </button>
                <button className="w-full flex items-center justify-between p-2 rounded-md hover:bg-purple-100 transition-colors">
                  <div className="flex items-center space-x-2">
                    <FiMessageSquare className="w-4 h-4 text-purple-600" />
                    <span className="text-sm text-gray-600">Add Feedback</span>
                  </div>
                  <FiMessageSquare className="w-4 h-4 text-purple-600" />
                </button>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-green-900 mb-3">Expert Network</h4>
              <div className="space-y-2">
                {project.expertConnections.map((expert, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded-md hover:bg-green-100 transition-colors">
                    <div className="flex items-center space-x-2">
                      <FiUsers className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-600 truncate">{expert.split(' - ')[0]}</span>
                    </div>
                    <FiLink className="w-4 h-4 text-green-600" />
                  </div>
                ))}
                <button className="w-full flex items-center justify-between p-2 rounded-md hover:bg-green-100 transition-colors text-green-700">
                  <div className="flex items-center space-x-2">
                    <FiUsers className="w-4 h-4" />
                    <span className="text-sm">Connect with More Experts</span>
                  </div>
                  <FiPlus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 mt-6">
            <button className="flex items-center space-x-2 text-blue-600">
              <FiMessageSquare className="w-4 h-4" />
              <span className="text-sm">Feedback</span>
            </button>
            <button className="flex items-center space-x-2 text-green-600">
              <FiLink className="w-4 h-4" />
              <span className="text-sm">Resources</span>
            </button>
            <button className="flex items-center space-x-2 text-purple-600">
              <FiUsers className="w-4 h-4" />
              <span className="text-sm">Experts</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
} 