import { useState } from 'react';
import Image from 'next/image';

interface SDGMapping {
  id: number;
  title: string;
  projects: number;
  color: string;
  bgColor: string;
}

export default function SDGMappingCard() {
  const [sdgs, setSdgs] = useState<SDGMapping[]>([
    {
      id: 6,
      title: 'Clean Water and Sanitation',
      projects: 3,
      color: '#26BDE2',
      bgColor: '#E1F6FB',
    },
    {
      id: 7,
      title: 'Affordable and Clean Energy',
      projects: 2,
      color: '#FCC30B',
      bgColor: '#FEF7E1',
    },
    {
      id: 13,
      title: 'Climate Action',
      projects: 4,
      color: '#3F7E44',
      bgColor: '#E4EEE5',
    },
  ]);

  return (
    <div className="space-y-4">
      {sdgs.map((sdg) => (
        <div
          key={sdg.id}
          className="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
        >
          <div className="flex items-center space-x-4">
            <div 
              className="w-12 h-12 rounded-lg relative overflow-hidden"
              style={{ backgroundColor: sdg.color }}
            >
              <Image
                src={`/sdg-icons/sdg${sdg.id}.png`}
                alt={`SDG ${sdg.id}`}
                fill
                className="object-contain p-1"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">{sdg.title}</h3>
              <div className="mt-1 flex items-center space-x-2">
                <div 
                  className="text-sm font-medium px-2 py-0.5 rounded"
                  style={{ 
                    backgroundColor: sdg.bgColor,
                    color: sdg.color
                  }}
                >
                  {sdg.projects} Projects
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 