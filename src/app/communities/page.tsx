'use client';

import { Users, Globe, Star } from 'lucide-react';

export default function CommunitiesPage() {
  return (
    <div className="min-h-screen bg-gray-900 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-white">Communities</h1>
          <p className="mt-2 text-gray-400">Connect with music producers and join active communities</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-800/80 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Producer Hub {i}</h3>
                    <p className="text-sm text-gray-400">500+ members</p>
                  </div>
                </div>
                <button className="px-3 py-1 bg-purple-500 hover:bg-purple-600 rounded-full text-sm text-white transition-colors">
                  Join
                </button>
              </div>
              <p className="text-gray-300 mb-4">
                A community of passionate music producers sharing knowledge and feedback.
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <div className="flex items-center">
                  <Globe className="w-4 h-4 mr-1" />
                  <span>Public</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-1" />
                  <span>Featured</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );