export default function AboutPage() {
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">About TISD</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Tracking Innovation & Sustainable Development (TISD) is a comprehensive platform
            designed to document, monitor, and foster collaboration on academic projects
            aligned with UN Sustainable Development Goals.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-16">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="bg-white px-4 py-6 shadow rounded-lg text-center"
            >
              <dt className="text-sm font-medium text-gray-500">{stat.name}</dt>
              <dd className="mt-2">
                <span className="text-3xl font-semibold text-blue-600">
                  {stat.value}
                </span>
                <span className="ml-2 text-sm text-gray-600">{stat.unit}</span>
              </dd>
            </div>
          ))}
        </div>

        {/* Mission Section */}
        <div className="prose prose-lg mx-auto mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-600">
            TISD aims to create a transparent and collaborative environment where students,
            faculty, and industry partners can work together to drive sustainable innovation.
            By systematically tracking and showcasing academic projects, we facilitate
            knowledge sharing and impact assessment aligned with global sustainability goals.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-16">
          {features.map((feature) => (
            <div key={feature.name} className="relative">
              <dt>
                <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-blue-600 text-white">
                  {feature.icon}
                </div>
                <p className="ml-16 text-lg font-medium leading-6 text-gray-900">
                  {feature.name}
                </p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-600">
                {feature.description}
              </dd>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="bg-gray-50 rounded-lg p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <p className="text-gray-600 mb-6">
              Have questions about TISD? We'd love to hear from you.
            </p>
            <a
              href="mailto:contact@tisd.edu"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

const stats = [
  { name: 'Active Projects', value: '150+', unit: 'projects' },
  { name: 'Faculty Mentors', value: '45', unit: 'mentors' },
  { name: 'Industry Partners', value: '25', unit: 'partners' },
  { name: 'SDGs Addressed', value: '17', unit: 'goals' },
];

const features = [
  {
    name: 'Project Tracking',
    description: 'Comprehensive system to monitor and document academic projects throughout their lifecycle.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    name: 'SDG Alignment',
    description: 'Map and track project contributions to UN Sustainable Development Goals.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
      </svg>
    ),
  },
  {
    name: 'Collaboration Hub',
    description: 'Connect students with faculty mentors, NGOs, and industry experts.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
]; 