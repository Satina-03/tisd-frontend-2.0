'use client';

import { useState, useEffect } from 'react';
import { FiUsers, FiSearch, FiMessageSquare, FiStar, FiFilter } from 'react-icons/fi';

interface Skill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced';
}

interface User {
  id: string;
  name: string;
  role: string;
  skills: Skill[];
  interests: string[];
  projects: string[];
  availability: 'full-time' | 'part-time' | 'flexible';
  rating: number;
  bio: string;
}

export default function CollaborationHub() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Sample data - replace with actual API call
  useEffect(() => {
    const sampleUsers: User[] = [
      {
        id: '1',
        name: 'John Doe',
        role: 'Student',
        skills: [
          { id: '1', name: 'Python', level: 'advanced' },
          { id: '2', name: 'Machine Learning', level: 'intermediate' }
        ],
        interests: ['AI', 'Sustainability', 'Data Science'],
        projects: ['Smart Water Management'],
        availability: 'part-time',
        rating: 4.5,
        bio: 'Passionate about using technology for sustainable development'
      },
      {
        id: '2',
        name: 'Jane Smith',
        role: 'Student',
        skills: [
          { id: '3', name: 'UI/UX Design', level: 'advanced' },
          { id: '4', name: 'Frontend Development', level: 'intermediate' }
        ],
        interests: ['Web Development', 'Sustainability', 'Design'],
        projects: ['Eco-Friendly E-commerce'],
        availability: 'flexible',
        rating: 4.8,
        bio: 'Design enthusiast focused on creating sustainable digital solutions'
      }
    ];
    setUsers(sampleUsers);
    setIsLoading(false);
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.bio.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSkills = selectedSkills.length === 0 || 
                         user.skills.some(skill => selectedSkills.includes(skill.name));
    
    const matchesInterests = selectedInterests.length === 0 || 
                           user.interests.some(interest => selectedInterests.includes(interest));
    
    return matchesSearch && matchesSkills && matchesInterests;
  });

  const allSkills = Array.from(new Set(users.flatMap(user => user.skills.map(skill => skill.name))));
  const allInterests = Array.from(new Set(users.flatMap(user => user.interests)));

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Collaboration Hub</h2>
          <div className="flex items-center space-x-2">
            <FiUsers className="text-blue-500" />
            <span className="text-sm text-gray-500">Find Collaborators</span>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4 mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name or bio..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
              <div className="flex flex-wrap gap-2">
                {allSkills.map(skill => (
                  <button
                    key={skill}
                    onClick={() => setSelectedSkills(prev => 
                      prev.includes(skill) 
                        ? prev.filter(s => s !== skill)
                        : [...prev, skill]
                    )}
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Interests</label>
              <div className="flex flex-wrap gap-2">
                {allInterests.map(interest => (
                  <button
                    key={interest}
                    onClick={() => setSelectedInterests(prev => 
                      prev.includes(interest)
                        ? prev.filter(i => i !== interest)
                        : [...prev, interest]
                    )}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedInterests.includes(interest)
                        ? 'bg-green-100 text-green-700 border border-green-500'
                        : 'bg-gray-100 text-gray-700 border border-gray-200'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* User Cards */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-500">Loading collaborators...</p>
          </div>
        ) : filteredUsers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredUsers.map(user => (
              <div key={user.id} className="bg-white rounded-lg shadow p-6 border border-gray-200">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                    <p className="text-sm text-gray-500">{user.role}</p>
                  </div>
                  <div className="flex items-center">
                    <FiStar className="text-yellow-400" />
                    <span className="ml-1 text-sm text-gray-600">{user.rating}</span>
                  </div>
                </div>

                <p className="mt-2 text-sm text-gray-600">{user.bio}</p>

                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {user.skills.map(skill => (
                      <span
                        key={skill.id}
                        className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
                      >
                        {skill.name} ({skill.level})
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Interests</h4>
                  <div className="flex flex-wrap gap-2">
                    {user.interests.map(interest => (
                      <span
                        key={interest}
                        className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Availability: {user.availability}
                  </span>
                  <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                    <FiMessageSquare className="mr-2" />
                    Contact
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FiUsers className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No collaborators found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 