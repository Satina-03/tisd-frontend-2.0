import { useState } from 'react';
import { FiSearch, FiFilter, FiX, FiStar, FiUsers } from 'react-icons/fi';

interface Project {
  id: string;
  title: string;
  description: string;
  sdgs: number[];
  skills: string[];
  teamSize: number;
  currentMembers: number;
  status: 'open' | 'in-progress' | 'completed';
  createdAt: string;
}

export default function ProjectSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSDGs, setSelectedSDGs] = useState<number[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Sample projects data - replace with actual API call
  const projects: Project[] = [
    {
      id: '1',
      title: 'Smart Water Management System',
      description: 'Developing an IoT-based system for efficient water usage in urban areas',
      sdgs: [6, 11],
      skills: ['IoT', 'Python', 'Data Analysis'],
      teamSize: 4,
      currentMembers: 2,
      status: 'open',
      createdAt: '2024-03-15'
    },
    {
      id: '2',
      title: 'AI for Sustainable Agriculture',
      description: 'Using machine learning to optimize crop yields and reduce water usage',
      sdgs: [2, 9],
      skills: ['Machine Learning', 'Python', 'Agriculture'],
      teamSize: 5,
      currentMembers: 3,
      status: 'in-progress',
      createdAt: '2024-03-10'
    }
  ];

  const allSkills = Array.from(new Set(projects.flatMap(p => p.skills)));
  const allSDGs = Array.from(new Set(projects.flatMap(p => p.sdgs)));

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSDGs = selectedSDGs.length === 0 || 
                       project.sdgs.some(sdg => selectedSDGs.includes(sdg));
    
    const matchesSkills = selectedSkills.length === 0 || 
                         project.skills.some(skill => selectedSkills.includes(skill));
    
    return matchesSearch && matchesSDGs && matchesSkills;
  });

  const toggleSDG = (sdg: number) => {
    setSelectedSDGs(prev => 
      prev.includes(sdg) 
        ? prev.filter(s => s !== sdg)
        : [...prev, sdg]
    );
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const clearFilters = () => {
    setSelectedSDGs([]);
    setSelectedSkills([]);
    setSearchQuery('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search projects by title or description"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <FiFilter className="mr-2" />
          Filters
        </button>
      </div>

      {showFilters && (
        <div className="bg-white p-4 rounded-lg shadow space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Filters</h3>
            <button
              onClick={clearFilters}
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              Clear all
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">SDGs</h4>
              <div className="flex flex-wrap gap-2">
                {allSDGs.map(sdg => (
                  <button
                    key={sdg}
                    onClick={() => toggleSDG(sdg)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedSDGs.includes(sdg)
                        ? 'bg-blue-100 text-blue-700 border border-blue-500'
                        : 'bg-gray-100 text-gray-700 border border-gray-200'
                    }`}
                  >
                    SDG {sdg}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {allSkills.map(skill => (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedSkills.includes(skill)
                        ? 'bg-blue-100 text-blue-700 border border-blue-500'
                        : 'bg-gray-100 text-gray-700 border border-gray-200'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {filteredProjects.map(project => (
          <div key={project.id} className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{project.title}</h3>
                <p className="mt-1 text-sm text-gray-500">{project.description}</p>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                project.status === 'open' ? 'bg-green-100 text-green-800' :
                project.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {project.status}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.sdgs.map(sdg => (
                <span
                  key={sdg}
                  className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
                >
                  SDG {sdg}
                </span>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.skills.map(skill => (
                <span
                  key={skill}
                  className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-sm text-gray-500">
                  <FiUsers className="mr-1" />
                  {project.currentMembers}/{project.teamSize} members
                </div>
                <div className="text-sm text-gray-500">
                  Created {new Date(project.createdAt).toLocaleDateString()}
                </div>
              </div>
              <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                Join Project
              </button>
            </div>
          </div>
        ))}

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No projects found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
} 