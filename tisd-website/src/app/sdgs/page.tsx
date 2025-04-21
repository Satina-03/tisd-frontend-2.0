'use client';

import Link from 'next/link';

const sdgs = [
  {
    id: 1,
    title: "No Poverty",
    color: "bg-red-500",
    description: "End poverty in all its forms everywhere",
    projectCount: 12,
  },
  {
    id: 2,
    title: "Zero Hunger",
    color: "bg-yellow-500",
    description: "End hunger, achieve food security and improved nutrition",
    projectCount: 8,
  },
  {
    id: 3,
    title: "Good Health and Well-being",
    color: "bg-green-500",
    description: "Ensure healthy lives and promote well-being for all",
    projectCount: 15,
  },
  {
    id: 4,
    title: "Quality Education",
    color: "bg-red-600",
    description: "Ensure inclusive and equitable quality education",
    projectCount: 20,
  },
  {
    id: 5,
    title: "Gender Equality",
    color: "bg-orange-500",
    description: "Achieve gender equality and empower all women and girls",
    projectCount: 10,
  },
  {
    id: 6,
    title: "Clean Water and Sanitation",
    color: "bg-blue-500",
    description: "Ensure availability and sustainable management of water",
    projectCount: 7,
  },
  // Add more SDGs as needed
];

export default function SDGsPage() {
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Sustainable Development Goals</h1>
          <p className="text-lg text-gray-600">
            Explore projects aligned with the United Nations Sustainable Development Goals
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sdgs.map((sdg) => (
            <Link
              key={sdg.id}
              href={`/projects?sdg=${sdg.id}`}
              className="group block"
            >
              <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow">
                <div className={`h-2 ${sdg.color}`} />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                      {sdg.title}
                    </h3>
                    <span className="text-sm font-medium text-gray-500">
                      SDG {sdg.id}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{sdg.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {sdg.projectCount} Projects
                    </span>
                    <span className="text-blue-600 group-hover:text-blue-800">
                      View Projects →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 