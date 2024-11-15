'use client';

import { Music2, Trophy, Star, Calendar } from 'lucide-react';
import Image from 'next/image';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Header */}
        <div className="bg-gray-800 rounded-lg p-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative w-32 h-32">
              <Image
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
                alt="Profile"
                fill
                className="object-cover rounded-full"
              />
            </div>
            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl font-bold text-white">John Producer</h1>
              <p className="text-gray-400 mt-1">Producer since 2020</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                <div className="flex items-center gap-2 text-purple-400">
                  <Trophy className="w-5 h-5" />
                  <span>12 Wins</span>
                </div>
                <div className="flex items-center gap-2 text-purple-400">
                  <Music2 className="w-5 h-5" />
                  <span>45 Submissions</span>
                </div>
                <div className="flex items-center gap-2 text-purple-400">
                  <Star className="w-5 h-5" />
                  <span>4.8 Avg Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-gray-700/50 rounded-lg">
                <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-purple-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-medium">Won 1st Place</h3>
                  <p className="text-gray-400 text-sm">Summer Beat Championship</p>
                </div>
                <div className="flex items-center text-gray-400 text-sm">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>2 days ago</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-medium text-white mb-4">Battle Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Total Battles</span>
                <span className="text-white font-medium">24</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Win Rate</span>
                <span className="text-white font-medium">50%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Top 3 Finishes</span>
                <span className="text-white font-medium">15</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-medium text-white mb-4">Feedback Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Sessions Joined</span>
                <span className="text-white font-medium">32</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Feedback Given</span>
                <span className="text-white font-medium">128</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Avg. Rating Given</span>
                <span className="text-white font-medium">4.2/5</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-medium text-white mb-4">Community Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Following</span>
                <span className="text-white font-medium">156</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Followers</span>
                <span className="text-white font-medium">243</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Communities</span>
                <span className="text-white font-medium">5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}