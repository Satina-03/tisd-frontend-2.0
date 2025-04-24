import { useState } from 'react';
import { FiUsers, FiMail, FiLink, FiMessageSquare, FiCalendar, FiBook } from 'react-icons/fi';

interface Expert {
  id: string;
  name: string;
  organization: string;
  type: 'ngo' | 'industry';
  expertise: string[];
  availability: string;
  lastContact: string;
}

export default function ExpertConnections() {
  const [experts] = useState<Expert[]>([
    {
      id: '1',
      name: 'Dr. Sarah Green',
      organization: 'Green Earth NGO',
      type: 'ngo',
      expertise: ['Renewable Energy', 'Climate Change'],
      availability: 'Available for weekly meetings',
      lastContact: '2 days ago'
    },
    {
      id: '2',
      name: 'Prof. Michael Energy',
      organization: 'Sustainable Solutions Inc.',
      type: 'industry',
      expertise: ['Solar Technology', 'Energy Efficiency'],
      availability: 'Available for monthly reviews',
      lastContact: '1 week ago'
    },
    {
      id: '3',
      name: 'Ms. Lisa Water',
      organization: 'Water Conservation Foundation',
      type: 'ngo',
      expertise: ['Water Management', 'Sustainability'],
      availability: 'Available for project consultations',
      lastContact: '3 days ago'
    }
  ]);

  const getExpertTypeColor = (type: Expert['type']) => {
    switch (type) {
      case 'ngo':
        return 'text-green-600 bg-green-50';
      case 'industry':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">Expert Network</h2>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <FiUsers className="w-4 h-4" />
          <span>Connect with Expert</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {experts.map((expert) => (
          <div key={expert.id} className="bg-white rounded-lg shadow p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{expert.name}</h3>
                  <p className="text-gray-600">{expert.organization}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getExpertTypeColor(expert.type)}`}>
                  {expert.type.toUpperCase()}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-gray-500">
                  <FiBook className="w-4 h-4" />
                  <span className="font-medium">Expertise</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {expert.expertise.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-gray-500">
                  <FiCalendar className="w-4 h-4" />
                  <span className="font-medium">Availability</span>
                </div>
                <p className="text-gray-700">{expert.availability}</p>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">Last contact: {expert.lastContact}</p>
                <div className="space-x-2">
                  <button className="p-2 text-blue-600 hover:text-blue-700">
                    <FiMail className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-blue-600 hover:text-blue-700">
                    <FiMessageSquare className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-blue-600 hover:text-blue-700">
                    <FiCalendar className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 