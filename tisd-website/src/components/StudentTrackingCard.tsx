'use client';

import { useState } from 'react';
import { FiUser, FiBook, FiCheckCircle, FiAlertCircle, FiMessageSquare, FiLink, FiUpload, FiUsers } from 'react-icons/fi';

interface Student {
  id: string;
  name: string;
  project: string;
  progress: number;
  lastSubmission: string;
  status: 'on-track' | 'needs-attention' | 'at-risk';
  feedback: string;
  sdgFocus: string[];
  researchPapers: string[];
  expertConnections: string[];
}

export default function StudentTrackingCard() {
  const [students] = useState<Student[]>([
    {
      id: '1',
      name: 'John Doe',
      project: 'Sustainable Energy Project',
      progress: 75,
      lastSubmission: '2 days ago',
      status: 'on-track',
      feedback: 'Good progress on the energy efficiency calculations',
      sdgFocus: ['SDG 7', 'SDG 13'],
      researchPapers: ['Energy Efficiency in Urban Areas.pdf'],
      expertConnections: ['Dr. Sarah Green - Renewable Energy Expert']
    },
    {
      id: '2',
      name: 'Jane Smith',
      project: 'Waste Management System',
      progress: 45,
      lastSubmission: '5 days ago',
      status: 'needs-attention',
      feedback: 'Need to improve documentation',
      sdgFocus: ['SDG 11', 'SDG 12'],
      researchPapers: [],
      expertConnections: ['Prof. Michael Brown - Waste Management Specialist']
    }
  ]);

  const getStatusColor = (status: Student['status']) => {
    switch (status) {
      case 'on-track':
        return 'text-green-600 bg-green-50';
      case 'needs-attention':
        return 'text-yellow-600 bg-yellow-50';
      case 'at-risk':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      {students.map((student) => (
        <div key={student.id} className="bg-white rounded-lg shadow-sm border border-gray-100">
          {/* Header Section */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                  <FiUser className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{student.name}</h3>
                  <p className="text-sm text-gray-500">{student.project}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(student.status)}`}>
                {student.status.replace('-', ' ')}
              </span>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-12 gap-4">
              {/* Left Column */}
              <div className="col-span-8 space-y-4">
                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between text-sm text-gray-500 mb-1">
                    <span>Progress</span>
                    <span>{student.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-blue-600"
                      style={{ width: `${student.progress}%` }}
                    />
                  </div>
                </div>

                {/* SDG Tags */}
                <div className="flex flex-wrap gap-2">
                  {student.sdgFocus.map((sdg) => (
                    <span key={sdg} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
                      {sdg}
                    </span>
                  ))}
                </div>

                {/* Last Submission */}
                <div className="text-sm text-gray-500">
                  Last submission: {student.lastSubmission}
                </div>
              </div>

              {/* Right Column */}
              <div className="col-span-4 space-y-4">
                {/* Research Papers */}
                <div className="space-y-2">
                  <h4 className="text-xs font-medium text-gray-500 uppercase">Research Papers</h4>
                  <div className="space-y-1">
                    {student.researchPapers.length > 0 ? (
                      student.researchPapers.map((paper, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                          <FiUpload className="w-4 h-4 flex-shrink-0" />
                          <span className="truncate">{paper}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-400">No papers uploaded</p>
                    )}
                  </div>
                </div>

                {/* Expert Connections */}
                <div className="space-y-2">
                  <h4 className="text-xs font-medium text-gray-500 uppercase">Expert Connections</h4>
                  <div className="space-y-1">
                    {student.expertConnections.map((expert, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                        <FiUsers className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{expert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2 pt-2 border-t border-gray-100">
              <button className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">
                <FiMessageSquare className="w-4 h-4" />
                <span className="text-sm">Feedback</span>
              </button>
              <button className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100">
                <FiLink className="w-4 h-4" />
                <span className="text-sm">Resources</span>
              </button>
              <button className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100">
                <FiUsers className="w-4 h-4" />
                <span className="text-sm">Experts</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 