'use client';

import { useState, useEffect } from 'react';
import * as FiIcons from 'react-icons/fi';

interface Milestone {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'completed' | 'in-progress' | 'upcoming' | 'overdue';
  progress: number;
  dependencies?: string[];
}

export default function ProjectTimeline() {
  const [milestones, setMilestones] = useState<Milestone[]>([
    {
      id: '1',
      title: 'Project Proposal',
      description: 'Submit initial project proposal with SDG mapping',
      dueDate: '2024-04-15',
      status: 'completed',
      progress: 100
    },
    {
      id: '2',
      title: 'Research Phase',
      description: 'Complete literature review and market analysis',
      dueDate: '2024-04-30',
      status: 'in-progress',
      progress: 60
    },
    {
      id: '3',
      title: 'Prototype Development',
      description: 'Develop and test initial prototype',
      dueDate: '2024-05-15',
      status: 'upcoming',
      progress: 0
    },
    {
      id: '4',
      title: 'Mentor Review',
      description: 'Present progress to mentor for feedback',
      dueDate: '2024-05-20',
      status: 'upcoming',
      progress: 0
    }
  ]);

  const [showAddMilestone, setShowAddMilestone] = useState(false);
  const [newMilestone, setNewMilestone] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: 'upcoming' as const,
    progress: 0
  });

  const getStatusColor = (status: Milestone['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'upcoming':
        return 'bg-gray-100 text-gray-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: Milestone['status']) => {
    switch (status) {
      case 'completed':
        return <FiIcons.FiCheckCircle className="w-5 h-5" />;
      case 'in-progress':
        return <FiIcons.FiClock className="w-5 h-5" />;
      case 'upcoming':
        return <FiIcons.FiCalendar className="w-5 h-5" />;
      case 'overdue':
        return <FiIcons.FiAlertCircle className="w-5 h-5" />;
      default:
        return <FiIcons.FiCalendar className="w-5 h-5" />;
    }
  };

  const handleAddMilestone = () => {
    if (newMilestone.title && newMilestone.dueDate) {
      const milestone: Milestone = {
        id: Date.now().toString(),
        ...newMilestone,
        progress: 0
      };
      setMilestones([...milestones, milestone]);
      setNewMilestone({
        title: '',
        description: '',
        dueDate: '',
        status: 'upcoming',
        progress: 0
      });
      setShowAddMilestone(false);
    }
  };

  const handleProgressUpdate = (id: string, progress: number) => {
    setMilestones(milestones.map(milestone => {
      if (milestone.id === id) {
        const status = progress === 100 ? 'completed' : 
                      progress > 0 ? 'in-progress' : 'upcoming';
        return { ...milestone, progress, status };
      }
      return milestone;
    }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Project Timeline</h2>
          <button
            onClick={() => setShowAddMilestone(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <FiIcons.FiPlus className="mr-2" />
            Add Milestone
          </button>
        </div>

        {/* Timeline */}
        <div className="space-y-6">
          {milestones.map((milestone, index) => (
            <div key={milestone.id} className="relative pl-8 pb-6">
              {/* Timeline line */}
              {index !== milestones.length - 1 && (
                <div className="absolute left-4 top-4 bottom-0 w-0.5 bg-gray-200"></div>
              )}
              
              {/* Timeline dot */}
              <div className={`absolute left-3 top-4 w-3 h-3 rounded-full ${
                milestone.status === 'completed' ? 'bg-green-500' :
                milestone.status === 'in-progress' ? 'bg-blue-500' :
                milestone.status === 'overdue' ? 'bg-red-500' : 'bg-gray-400'
              }`}></div>

              {/* Milestone card */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium text-gray-900">{milestone.title}</h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(milestone.status)}`}>
                    {getStatusIcon(milestone.status)}
                    <span className="ml-1">{milestone.status.replace('-', ' ')}</span>
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-4">{milestone.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <FiIcons.FiCalendar className="mr-1" />
                    <span>Due: {new Date(milestone.dueDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${milestone.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-700">{milestone.progress}%</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Milestone Modal */}
        {showAddMilestone && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Milestone</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    value={newMilestone.title}
                    onChange={(e) => setNewMilestone({ ...newMilestone, title: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={newMilestone.description}
                    onChange={(e) => setNewMilestone({ ...newMilestone, description: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Due Date</label>
                  <input
                    type="date"
                    value={newMilestone.dueDate}
                    onChange={(e) => setNewMilestone({ ...newMilestone, dueDate: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowAddMilestone(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddMilestone}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Add Milestone
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 