import React from 'react';
import { BarChart3, TrendingUp, Users } from 'lucide-react';

export default function StatsOverview() {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Overview</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
          <div className="flex items-center space-x-3">
            <Users className="w-5 h-5 text-purple-400" />
            <div>
              <p className="text-sm text-gray-400">Total Votes</p>
              <p className="text-lg font-semibold text-white">1,234</p>
            </div>
          </div>
          <div className="flex items-center text-green-400">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span className="text-sm">+12%</span>
          </div>
        </div>
        <div className="p-4 bg-gray-700/50 rounded-lg">
          <div className="flex items-center space-x-2 mb-4">
            <BarChart3 className="w-5 h-5 text-purple-400" />
            <h3 className="text-white font-medium">Voting Activity</h3>
          </div>
          <div className="h-32 flex items-end space-x-2">
            {[40, 60, 45, 80, 75, 90, 65].map((height, index) => (
              <div
                key={index}
                className="flex-1 bg-purple-500/50 rounded-t"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}