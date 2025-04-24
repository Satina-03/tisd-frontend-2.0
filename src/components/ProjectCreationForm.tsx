import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import Image from 'next/image';

interface SDG {
  id: number;
  title: string;
  description: string;
  selected: boolean;
  color: string;
  bgColor: string;
}

export default function ProjectCreationForm() {
  const [projectData, setProjectData] = useState({
    title: '',
    description: '',
    objectives: '',
    expectedOutcomes: '',
    startDate: '',
    endDate: '',
    teamSize: '',
    requiredSkills: '',
  });

  const [sdgs, setSdgs] = useState<SDG[]>([
    { 
      id: 1, 
      title: 'No Poverty', 
      description: 'End poverty in all its forms everywhere', 
      selected: false,
      color: '#E5243B',
      bgColor: '#FDE8EA',
    },
    { 
      id: 2, 
      title: 'Zero Hunger', 
      description: 'End hunger, achieve food security and improved nutrition', 
      selected: false,
      color: '#DDA63A',
      bgColor: '#FBF3E2',
    },
    { 
      id: 3, 
      title: 'Good Health and Well-being', 
      description: 'Ensure healthy lives and promote well-being for all', 
      selected: false,
      color: '#4C9F38',
      bgColor: '#E6F3E3',
    },
    { 
      id: 4, 
      title: 'Quality Education', 
      description: 'Ensure inclusive and equitable quality education', 
      selected: false,
      color: '#C5192D',
      bgColor: '#F9E6E8',
    },
    { 
      id: 5, 
      title: 'Gender Equality', 
      description: 'Achieve gender equality and empower all women and girls', 
      selected: false,
      color: '#FF3A21',
      bgColor: '#FFE8E5',
    },
    { 
      id: 6, 
      title: 'Clean Water and Sanitation', 
      description: 'Ensure availability and sustainable management of water', 
      selected: false,
      color: '#26BDE2',
      bgColor: '#E1F6FB',
    },
    { 
      id: 7, 
      title: 'Affordable and Clean Energy', 
      description: 'Ensure access to affordable, reliable, sustainable energy', 
      selected: false,
      color: '#FCC30B',
      bgColor: '#FEF7E1',
    },
    { 
      id: 8, 
      title: 'Decent Work and Economic Growth', 
      description: 'Promote sustained, inclusive and sustainable economic growth', 
      selected: false,
      color: '#A21942',
      bgColor: '#F5E2E7',
    },
    { 
      id: 9, 
      title: 'Industry, Innovation and Infrastructure', 
      description: 'Build resilient infrastructure, promote inclusive and sustainable industrialization', 
      selected: false,
      color: '#FD6925',
      bgColor: '#FFEDE5',
    },
    { 
      id: 10, 
      title: 'Reduced Inequalities', 
      description: 'Reduce inequality within and among countries', 
      selected: false,
      color: '#DD1367',
      bgColor: '#FBE2EC',
    },
    { 
      id: 11, 
      title: 'Sustainable Cities and Communities', 
      description: 'Make cities and human settlements inclusive, safe, resilient and sustainable', 
      selected: false,
      color: '#FD9D24',
      bgColor: '#FEF2E5',
    },
    { 
      id: 12, 
      title: 'Responsible Consumption and Production', 
      description: 'Ensure sustainable consumption and production patterns', 
      selected: false,
      color: '#BF8B2E',
      bgColor: '#F7F0E2',
    },
    { 
      id: 13, 
      title: 'Climate Action', 
      description: 'Take urgent action to combat climate change and its impacts', 
      selected: false,
      color: '#3F7E44',
      bgColor: '#E4EEE5',
    },
    { 
      id: 14, 
      title: 'Life Below Water', 
      description: 'Conserve and sustainably use the oceans, seas and marine resources', 
      selected: false,
      color: '#0A97D9',
      bgColor: '#E1F2F9',
    },
    { 
      id: 15, 
      title: 'Life on Land', 
      description: 'Protect, restore and promote sustainable use of terrestrial ecosystems', 
      selected: false,
      color: '#56C02B',
      bgColor: '#E8F6E5',
    },
    { 
      id: 16, 
      title: 'Peace, Justice and Strong Institutions', 
      description: 'Promote peaceful and inclusive societies for sustainable development', 
      selected: false,
      color: '#00689D',
      bgColor: '#E0EEF5',
    },
    { 
      id: 17, 
      title: 'Partnerships for the Goals', 
      description: 'Strengthen the means of implementation and revitalize the global partnership', 
      selected: false,
      color: '#19486A',
      bgColor: '#E2E7EC',
    },
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProjectData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleSDG = (id: number) => {
    setSdgs(prev => prev.map(sdg => 
      sdg.id === id ? { ...sdg, selected: !sdg.selected } : sdg
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedSDGs = sdgs.filter(sdg => sdg.selected);
    console.log('Project Data:', projectData);
    console.log('Selected SDGs:', selectedSDGs);
    // TODO: Implement API call to create project
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Details</h2>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-900">
              Project Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={projectData.title}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 text-gray-900 bg-white rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="teamSize" className="block text-sm font-medium text-gray-900">
              Team Size
            </label>
            <input
              type="number"
              name="teamSize"
              id="teamSize"
              value={projectData.teamSize}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 text-gray-900 bg-white rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-900">
              Project Description
            </label>
            <textarea
              name="description"
              id="description"
              rows={3}
              value={projectData.description}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 text-gray-900 bg-white rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="objectives" className="block text-sm font-medium text-gray-900">
              Project Objectives
            </label>
            <textarea
              name="objectives"
              id="objectives"
              rows={3}
              value={projectData.objectives}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 text-gray-900 bg-white rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="expectedOutcomes" className="block text-sm font-medium text-gray-900">
              Expected Outcomes
            </label>
            <textarea
              name="expectedOutcomes"
              id="expectedOutcomes"
              rows={3}
              value={projectData.expectedOutcomes}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 text-gray-900 bg-white rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-900">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              id="startDate"
              value={projectData.startDate}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 text-gray-900 bg-white rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-900">
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              id="endDate"
              value={projectData.endDate}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 text-gray-900 bg-white rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="requiredSkills" className="block text-sm font-medium text-gray-900">
              Required Skills
            </label>
            <input
              type="text"
              name="requiredSkills"
              id="requiredSkills"
              value={projectData.requiredSkills}
              onChange={handleInputChange}
              placeholder="e.g., Python, Machine Learning, Data Analysis"
              className="mt-1 block w-full px-3 py-2 text-gray-900 bg-white rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">SDG Mapping</h2>
        <p className="text-sm text-gray-600 mb-6">Select the Sustainable Development Goals that your project aligns with</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sdgs.map((sdg) => (
            <div
              key={sdg.id}
              onClick={() => toggleSDG(sdg.id)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all transform hover:scale-105 ${
                sdg.selected ? 'border-opacity-100' : 'border-transparent hover:border-opacity-50'
              }`}
              style={{
                borderColor: sdg.color,
                backgroundColor: sdg.selected ? sdg.bgColor : 'white',
              }}
            >
              <div className="flex items-center space-x-3">
                <div 
                  className="w-16 h-16 rounded-lg flex items-center justify-center relative overflow-hidden p-2"
                  style={{
                    backgroundColor: sdg.color
                  }}
                >
                  <Image
                    src={`/sdg-icons/sdg${sdg.id}.png`}
                    alt={`SDG ${sdg.id} icon`}
                    fill
                    sizes="(max-width: 64px) 100vw"
                    className="object-contain p-1"
                    priority
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 
                    className="text-sm font-medium truncate"
                    style={{ color: sdg.selected ? sdg.color : '#111827' }}
                  >
                    {sdg.title}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2">{sdg.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <FiPlus className="mr-2" />
          Create Project
        </button>
      </div>
    </form>
  );
} 