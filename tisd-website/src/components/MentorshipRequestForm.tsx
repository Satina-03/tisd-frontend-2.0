import { useState } from 'react';
import { FiUsers, FiMessageSquare, FiCalendar } from 'react-icons/fi';

interface MentorType {
  id: string;
  name: string;
  type: 'industry' | 'ngo' | 'faculty';
}

export default function MentorshipRequestForm() {
  const [requestData, setRequestData] = useState({
    projectId: '',
    mentorType: '',
    preferredMentor: '',
    meetingFrequency: '',
    preferredDays: [] as string[],
    preferredTime: '',
    objectives: '',
    expectations: '',
  });

  const mentorTypes: MentorType[] = [
    { id: 'industry', name: 'Industry Expert', type: 'industry' },
    { id: 'ngo', name: 'NGO Professional', type: 'ngo' },
    { id: 'faculty', name: 'Faculty Member', type: 'faculty' },
  ];

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const timeSlots = ['Morning (9-12)', 'Afternoon (12-5)', 'Evening (5-8)'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setRequestData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleDay = (day: string) => {
    setRequestData(prev => ({
      ...prev,
      preferredDays: prev.preferredDays.includes(day)
        ? prev.preferredDays.filter(d => d !== day)
        : [...prev.preferredDays, day]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Mentorship Request Data:', requestData);
    // TODO: Implement API call to create mentorship request
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Mentorship Request</h2>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="projectId" className="block text-sm font-medium text-gray-900">Project</label>
            <select
              name="projectId"
              id="projectId"
              value={requestData.projectId}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 text-gray-900 bg-white rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="" className="text-gray-900">Select Project</option>
              <option value="project1" className="text-gray-900">Smart Water Management System</option>
              <option value="project2" className="text-gray-900">Sustainable Energy Initiative</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-900 mb-2">Mentor Type</label>
            <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {mentorTypes.map((type) => (
                <div
                  key={type.id}
                  onClick={() => setRequestData(prev => ({ ...prev, mentorType: type.id }))}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    requestData.mentorType === type.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <FiUsers className={`w-5 h-5 ${
                      requestData.mentorType === type.id ? 'text-blue-500' : 'text-gray-600'
                    }`} />
                    <span className="text-sm font-medium text-gray-900">{type.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="objectives" className="block text-sm font-medium text-gray-900">Mentorship Objectives</label>
            <textarea
              name="objectives"
              id="objectives"
              rows={3}
              value={requestData.objectives}
              onChange={handleInputChange}
              placeholder="What do you hope to achieve through mentorship?"
              className="mt-1 block w-full px-3 py-2 text-gray-900 bg-white rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 placeholder-gray-400"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="expectations" className="block text-sm font-medium text-gray-900">Expectations</label>
            <textarea
              name="expectations"
              id="expectations"
              rows={3}
              value={requestData.expectations}
              onChange={handleInputChange}
              placeholder="What are your expectations from the mentor?"
              className="mt-1 block w-full px-3 py-2 text-gray-900 bg-white rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 placeholder-gray-400"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-900 mb-2">Preferred Meeting Days</label>
            <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {daysOfWeek.map((day) => (
                <div
                  key={day}
                  onClick={() => toggleDay(day)}
                  className={`p-2 rounded border text-center cursor-pointer ${
                    requestData.preferredDays.includes(day)
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-blue-300 text-gray-900'
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-900">Preferred Time Slot</label>
            <select
              name="preferredTime"
              id="preferredTime"
              value={requestData.preferredTime}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 text-gray-900 bg-white rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="" className="text-gray-900">Select Time Slot</option>
              {timeSlots.map((slot) => (
                <option key={slot} value={slot} className="text-gray-900">{slot}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="meetingFrequency" className="block text-sm font-medium text-gray-900">Meeting Frequency</label>
            <select
              name="meetingFrequency"
              id="meetingFrequency"
              value={requestData.meetingFrequency}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 text-gray-900 bg-white rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="" className="text-gray-900">Select Frequency</option>
              <option value="weekly" className="text-gray-900">Weekly</option>
              <option value="biweekly" className="text-gray-900">Bi-weekly</option>
              <option value="monthly" className="text-gray-900">Monthly</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <FiMessageSquare className="mr-2" />
          Submit Request
        </button>
      </div>
    </form>
  );
} 