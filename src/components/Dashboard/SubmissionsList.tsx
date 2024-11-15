import React from 'react';
import { Play, MoreVertical, ThumbsUp } from 'lucide-react';

export default function SubmissionsList() {
  const submissions = [
    {
      id: 1,
      artist: "BeatMaker99",
      title: "Summer Vibes",
      timestamp: "2h ago",
      votes: 156,
      status: "approved",
    },
    {
      id: 2,
      artist: "ProducerX",
      title: "Midnight Groove",
      timestamp: "1h ago",
      votes: 89,
      status: "pending",
    },
    // Add more submissions as needed
  ];

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Submissions</h2>
        <div className="flex space-x-2">
          <select className="bg-gray-700 text-white rounded-md px-3 py-2 text-sm">
            <option>All Submissions</option>
            <option>Pending</option>
            <option>Approved</option>
          </select>
        </div>
      </div>
      <div className="space-y-4">
        {submissions.map((submission) => (
          <div
            key={submission.id}
            className="bg-gray-700/50 rounded-lg p-4 flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <button className="p-2 bg-purple-500 rounded-full hover:bg-purple-600 transition-colors">
                <Play className="w-4 h-4 text-white" />
              </button>
              <div>
                <h3 className="text-white font-medium">{submission.title}</h3>
                <p className="text-gray-400 text-sm">by {submission.artist}</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <ThumbsUp className="w-4 h-4 text-purple-400" />
                <span className="text-white">{submission.votes}</span>
              </div>
              <span className="text-gray-400 text-sm">{submission.timestamp}</span>
              <button className="p-1 hover:bg-gray-600 rounded-full transition-colors">
                <MoreVertical className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}