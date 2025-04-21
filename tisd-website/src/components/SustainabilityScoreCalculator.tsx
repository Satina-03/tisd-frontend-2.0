'use client';

import { useState, useEffect } from 'react';
import { FiTrendingUp, FiAward, FiBarChart2, FiInfo } from 'react-icons/fi';

interface ImpactMetric {
  id: string;
  name: string;
  description: string;
  weight: number;
  value: number;
  unit: string;
}

interface SDGImpact {
  sdg: string;
  score: number;
  metrics: ImpactMetric[];
}

export default function SustainabilityScoreCalculator() {
  const [projectName, setProjectName] = useState('');
  const [impactMetrics, setImpactMetrics] = useState<ImpactMetric[]>([
    {
      id: '1',
      name: 'Carbon Footprint',
      description: 'Total CO2 emissions reduced or offset',
      weight: 0.3,
      value: 0,
      unit: 'tons CO2/year'
    },
    {
      id: '2',
      name: 'Water Conservation',
      description: 'Amount of water saved or recycled',
      weight: 0.2,
      value: 0,
      unit: 'liters/year'
    },
    {
      id: '3',
      name: 'Waste Reduction',
      description: 'Amount of waste reduced or recycled',
      weight: 0.2,
      value: 0,
      unit: 'kg/year'
    },
    {
      id: '4',
      name: 'Energy Efficiency',
      description: 'Energy saved or generated from renewable sources',
      weight: 0.3,
      value: 0,
      unit: 'kWh/year'
    }
  ]);

  const [sdgImpacts, setSDGImpacts] = useState<SDGImpact[]>([
    { sdg: 'SDG 7: Affordable and Clean Energy', score: 0, metrics: [] },
    { sdg: 'SDG 12: Responsible Consumption and Production', score: 0, metrics: [] },
    { sdg: 'SDG 13: Climate Action', score: 0, metrics: [] }
  ]);

  const [overallScore, setOverallScore] = useState(0);
  const [showTips, setShowTips] = useState(false);

  useEffect(() => {
    calculateScores();
  }, [impactMetrics]);

  const calculateScores = () => {
    // Calculate overall score
    const totalScore = impactMetrics.reduce((sum, metric) => {
      return sum + (metric.value * metric.weight);
    }, 0);
    setOverallScore(Math.min(100, Math.round(totalScore * 20))); // Scale to 100

    // Update SDG impacts based on metrics
    const updatedSDGImpacts = sdgImpacts.map(sdg => {
      let score = 0;
      const relevantMetrics = impactMetrics.filter(metric => {
        if (sdg.sdg.includes('Energy')) return metric.name === 'Energy Efficiency';
        if (sdg.sdg.includes('Consumption')) return metric.name === 'Waste Reduction';
        if (sdg.sdg.includes('Climate')) return metric.name === 'Carbon Footprint';
        return false;
      });

      score = relevantMetrics.reduce((sum, metric) => {
        return sum + (metric.value * metric.weight);
      }, 0);

      return {
        ...sdg,
        score: Math.min(100, Math.round(score * 20)),
        metrics: relevantMetrics
      };
    });

    setSDGImpacts(updatedSDGImpacts);
  };

  const handleMetricChange = (id: string, value: number) => {
    setImpactMetrics(prev => 
      prev.map(metric => 
        metric.id === id ? { ...metric, value } : metric
      )
    );
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    if (score >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Sustainability Score Calculator</h2>
          <div className="flex items-center space-x-2">
            <FiTrendingUp className="text-green-500" />
            <span className="text-sm text-gray-500">Measure Your Impact</span>
          </div>
        </div>

        {/* Project Name */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project Name
          </label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Enter your project name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Overall Score */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Overall Sustainability Score</h3>
            <button
              onClick={() => setShowTips(!showTips)}
              className="text-blue-600 hover:text-blue-800"
            >
              <FiInfo className="w-5 h-5" />
            </button>
          </div>
          <div className="mt-4 flex items-center justify-center">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-8 border-gray-200 flex items-center justify-center">
                <span className={`text-4xl font-bold ${getScoreColor(overallScore)}`}>
                  {overallScore}
                </span>
              </div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                <FiAward className="w-8 h-8 text-yellow-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Impact Metrics */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Impact Metrics</h3>
          {impactMetrics.map(metric => (
            <div key={metric.id} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{metric.name}</h4>
                <span className="text-sm text-gray-500">Weight: {metric.weight * 100}%</span>
              </div>
              <p className="text-sm text-gray-500 mb-4">{metric.description}</p>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.1"
                  value={metric.value}
                  onChange={(e) => handleMetricChange(metric.id, parseFloat(e.target.value))}
                  className="w-full"
                />
                <span className="text-sm font-medium text-gray-700">
                  {metric.value.toFixed(1)} {metric.unit}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* SDG Impacts */}
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">SDG Impact Analysis</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sdgImpacts.map(sdg => (
              <div key={sdg.sdg} className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">{sdg.sdg}</h4>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Impact Score</span>
                  <span className={`text-lg font-bold ${getScoreColor(sdg.score)}`}>
                    {sdg.score}
                  </span>
                </div>
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        sdg.score >= 80 ? 'bg-green-500' :
                        sdg.score >= 60 ? 'bg-yellow-500' :
                        sdg.score >= 40 ? 'bg-orange-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${sdg.score}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips Modal */}
        {showTips && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Tips for Improving Your Score</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Implement energy-efficient practices and renewable energy sources</li>
                <li>• Reduce water consumption and implement water recycling systems</li>
                <li>• Minimize waste through recycling and sustainable materials</li>
                <li>• Track and offset carbon emissions</li>
                <li>• Engage in community sustainability initiatives</li>
              </ul>
              <button
                onClick={() => setShowTips(false)}
                className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 