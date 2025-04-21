import { useState, useEffect } from 'react';
import { FiAward, FiTrendingUp, FiBarChart2 } from 'react-icons/fi';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface SDGProgress {
  id: number;
  name: string;
  progress: number;
  target: number;
  color: string;
}

interface Achievement {
  title: string;
  description: string;
  icon: string;
  bgColor: string;
}

const SustainabilityImpactTracker = () => {
  const [sdgProgress, setSdgProgress] = useState<SDGProgress[]>([
    { id: 1, name: 'No Poverty', progress: 65, target: 100, color: '#E5243B' },
    { id: 2, name: 'Zero Hunger', progress: 45, target: 100, color: '#DDA63A' },
    { id: 3, name: 'Good Health', progress: 80, target: 100, color: '#4C9F38' },
    { id: 4, name: 'Quality Education', progress: 90, target: 100, color: '#C5192D' },
    { id: 5, name: 'Gender Equality', progress: 70, target: 100, color: '#FF3A21' },
  ]);

  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      title: 'SDG Champion',
      description: 'Contributed to 3 SDGs',
      icon: '🏆',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Sustainability Leader',
      description: 'Reached 80% in any SDG',
      icon: '🌱',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Innovation Master',
      description: 'Completed 5 sustainable projects',
      icon: '💡',
      bgColor: 'bg-purple-50',
    },
  ]);

  return (
    <div className="space-y-6">
      {/* Progress Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">SDG Progress</h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700">Quality Education</span>
              <span className="text-sm font-medium text-gray-700">85%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-red-600 h-2.5 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700">Gender Equality</span>
              <span className="text-sm font-medium text-gray-700">70%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '70%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center mb-6">
          <FiAward className="w-8 h-8 text-yellow-500 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">Achievements</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg ${achievement.bgColor} border border-gray-200 hover:border-gray-300 transition-colors`}
            >
              <div className="flex items-start space-x-3">
                <span className="text-2xl">{achievement.icon}</span>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-gray-700">
                    {achievement.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SustainabilityImpactTracker; 