import { useState } from 'react';
import { FiUser, FiMail, FiPhone } from 'react-icons/fi';

interface Expert {
  id: string;
  name: string;
  role: string;
  organization: string;
  expertise: string[];
  type: 'industry' | 'ngo' | 'faculty';
}

export default function CollaborationCard() {
  const [experts, setExperts] = useState<Expert[]>([
    {
      id: '1',
      name: 'Dr. Emily Chen',
      role: 'Sustainability Researcher',
      organization: 'Green Tech Institute',
      expertise: ['Renewable Energy', 'Climate Action'],
      type: 'industry',
    },
    {
      id: '2',
      name: 'John Martinez',
      role: 'Program Director',
      organization: 'Water Conservation NGO',
      expertise: ['Water Management', 'Community Engagement'],
      type: 'ngo',
    },
    {
      id: '3',
      name: 'Prof. Sarah Wilson',
      role: 'Department Head',
      organization: 'Environmental Sciences',
      expertise: ['Sustainable Agriculture', 'Biodiversity'],
      type: 'faculty',
    },
  ]);

  const getTypeStyles = (type: Expert['type']) => {
    switch (type) {
      case 'industry':
        return {
          color: 'text-blue-600',
          bg: 'bg-blue-50',
          border: 'border-blue-200',
        };
      case 'ngo':
        return {
          color: 'text-green-600',
          bg: 'bg-green-50',
          border: 'border-green-200',
        };
      case 'faculty':
        return {
          color: 'text-purple-600',
          bg: 'bg-purple-50',
          border: 'border-purple-200',
        };
      default:
        return {
          color: 'text-gray-600',
          bg: 'bg-gray-50',
          border: 'border-gray-200',
        };
    }
  };

  return (
    <div className="space-y-4">
      {experts.map((expert) => {
        const typeStyles = getTypeStyles(expert.type);

        return (
          <div
            key={expert.id}
            className="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="flex items-start space-x-4">
              <div className={`p-3 rounded-full ${typeStyles.bg}`}>
                <FiUser className={`w-6 h-6 ${typeStyles.color}`} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{expert.name}</h3>
                <p className="text-sm text-gray-500">{expert.role} at {expert.organization}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {expert.expertise.map((skill, index) => (
                    <span
                      key={index}
                      className={`px-2 py-1 text-xs font-medium rounded-full ${typeStyles.bg} ${typeStyles.color}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => {/* TODO: Implement email functionality */}}
                  className={`p-2 rounded-full hover:${typeStyles.bg} transition-colors`}
                >
                  <FiMail className={`w-5 h-5 ${typeStyles.color}`} />
                </button>
                <button
                  onClick={() => {/* TODO: Implement call functionality */}}
                  className={`p-2 rounded-full hover:${typeStyles.bg} transition-colors`}
                >
                  <FiPhone className={`w-5 h-5 ${typeStyles.color}`} />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
} 