import React from 'react';
import { Users, Database, LineChart } from 'lucide-react';
import { getAllEntries } from '../utils/onboardingService';
import { formatDate } from '../utils/dateUtils';

const Dashboard = () => {
  const producers = getAllEntries('producer');
  const consumers = getAllEntries('consumer');
  const allEntries = getAllEntries();
  
  // Sort entries by date and get the 5 most recent
  const recentActivity = allEntries
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  // Calculate system uptime (mock data for demo)
  const systemUptime = 98.5;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Producers</p>
              <p className="text-2xl font-semibold text-gray-900">
                {producers.length} Active producers
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Database className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Consumers</p>
              <p className="text-2xl font-semibold text-gray-900">
                {consumers.length} Active consumers
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <LineChart className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Performance</p>
              <p className="text-2xl font-semibold text-gray-900">
                {systemUptime}% System uptime
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
        {recentActivity.length > 0 ? (
          <div className="space-y-4">
            {recentActivity.map((entry) => (
              <div
                key={entry.id}
                className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
              >
                <div>
                  <p className="font-medium text-gray-900">{entry.lobName}</p>
                  <p className="text-sm text-gray-500">
                    {entry.onboardType.charAt(0).toUpperCase() + entry.onboardType.slice(1)} - {entry.domain}
                  </p>
                </div>
                <div className="text-sm text-gray-500">
                  {formatDate(entry.updatedAt)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-500">No recent activity</div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;