import React from 'react';
import { Vote, Lock, Timer } from 'lucide-react';

export default function VotingPhaseControl() {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Voting Phase</h2>
      <div className="space-y-4">
        <div className="bg-purple-500/10 border border-purple-500 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Vote className="w-5 h-5 text-purple-400" />
              <span className="text-white font-medium">Voting Active</span>
            </div>
            <span className="text-sm text-purple-400">1h 30m left</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-md text-white transition-colors">
            <Lock className="w-4 h-4" />
            <span>End Voting</span>
          </button>
          <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-md text-white transition-colors">
            <Timer className="w-4 h-4" />
            <span>Extend Time</span>
          </button>
        </div>
      </div>
    </div>
  );
}