import { useState, useEffect } from 'react';
import { FiTrendingUp, FiTarget, FiBarChart2, FiUsers } from 'react-icons/fi';

interface ImpactMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  description: string;
}

interface SDGImpact {
  sdgId: number;
  metrics: ImpactMetric[];
  progress: number;
  target: number;
  timeline: {
    date: string;
    value: number;
  }[];
}

export default function SDGImpactTracker() {
  const [selectedSDG, setSelectedSDG] = useState<number>(1);
  const [impacts, setImpacts] = useState<SDGImpact[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Sample data - replace with actual API call
  useEffect(() => {
    const sampleImpacts: SDGImpact[] = [
      {
        sdgId: 6,
        metrics: [
          {
            id: 'water-saved',
            name: 'Water Saved',
            value: 5000,
            unit: 'liters',
            description: 'Amount of water saved through efficient management'
          },
          {
            id: 'communities-impacted',
            name: 'Communities Impacted',
            value: 3,
            unit: 'communities',
            description: 'Number of communities with improved water access'
          }
        ],
        progress: 75,
        target: 100,
        timeline: [
          { date: '2024-01', value: 20 },
          { date: '2024-02', value: 45 },
          { date: '2024-03', value: 75 }
        ]
      }
    ];
    setImpacts(sampleImpacts);
    setIsLoading(false);
  }, []);

  const getSDGColor = (sdgId: number) => {
    const colors = {
      1: 'bg-red-500',
      2: 'bg-orange-500',
      3: 'bg-green-500',
      4: 'bg-red-600',
      5: 'bg-pink-500',
      6: 'bg-blue-500',
      7: 'bg-yellow-500',
      8: 'bg-red-700',
      9: 'bg-orange-600',
      10: 'bg-red-800',
      11: 'bg-yellow-600',
      12: 'bg-yellow-700',
      13: 'bg-green-600',
      14: 'bg-blue-600',
      15: 'bg-green-700',
      16: 'bg-blue-700',
      17: 'bg-blue-800'
    };
    return colors[sdgId as keyof typeof colors] || 'bg-gray-500';
  };

  const currentImpact = impacts.find(impact => impact.sdgId === selectedSDG);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">SDG Impact Tracker</h2>
          <div className="flex items-center space-x-2">
            <FiTrendingUp className="text-blue-500" />
            <span className="text-sm text-gray-500">Real-time Impact</span>
          </div>
        </div>

        {/* SDG Selection */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map((sdgId) => (
            <button
              key={sdgId}
              onClick={() => setSelectedSDG(sdgId)}
              className={`p-4 rounded-lg text-white text-center transition-all ${
                selectedSDG === sdgId ? 'ring-2 ring-offset-2 ring-blue-500' : ''
              } ${getSDGColor(sdgId)}`}
            >
              SDG {sdgId}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-500">Loading impact data...</p>
          </div>
        ) : currentImpact ? (
          <div className="space-y-6">
            {/* Progress Overview */}
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Progress Overview</h3>
                <div className="flex items-center space-x-2">
                  <FiTarget className="text-blue-500" />
                  <span className="text-sm text-gray-600">Target: {currentImpact.target}%</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-blue-500 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${currentImpact.progress}%` }}
                ></div>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Current Progress: {currentImpact.progress}%
              </p>
            </div>

            {/* Impact Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentImpact.metrics.map((metric) => (
                <div key={metric.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-gray-900">{metric.name}</h4>
                    <FiBarChart2 className="text-blue-500" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {metric.value} {metric.unit}
                  </div>
                  <p className="text-sm text-gray-600">{metric.description}</p>
                </div>
              ))}
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Progress Timeline</h3>
              <div className="flex items-end h-48 space-x-4">
                {currentImpact.timeline.map((point, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-blue-500 rounded-t-lg transition-all duration-500"
                      style={{ height: `${(point.value / 100) * 100}%` }}
                    ></div>
                    <span className="text-xs text-gray-500 mt-2">{point.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <FiUsers className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No Impact Data</h3>
            <p className="mt-1 text-sm text-gray-500">
              Start tracking your project's impact on SDG {selectedSDG}
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 