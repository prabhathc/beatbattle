import Link from 'next/link';
import { Play, Music, Users, Trophy } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-purple-900 to-indigo-900">
      <div className="container-xl">
        <div className="relative z-10 hero-height flex items-center">
          <div className="grid lg:grid-cols-2 gap-12 w-full items-center">
            <div className="text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
              <h1 className="text-5xl lg:text-7xl tracking-tight font-extrabold text-white">
                <span className="block">Host Epic Beat Battles</span>
                <span className="block text-purple-400 mt-2">For Your Community</span>
              </h1>
              <p className="mt-6 text-xl lg:text-2xl text-gray-300 max-w-3xl">
                Create engaging music competitions, foster talent, and build your community. Perfect for streamers, producers, and music enthusiasts.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/create"
                  className="flex items-center justify-center px-8 py-4 text-lg font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 transition-colors"
                >
                  <Play className="w-6 h-6 mr-2" />
                  Create Lobby
                </Link>
                <Link
                  href="/active-lobbies"
                  className="flex items-center justify-center px-8 py-4 text-lg font-medium rounded-lg text-purple-700 bg-purple-100 hover:bg-purple-200 transition-colors"
                >
                  Browse Lobbies
                </Link>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8 text-white transform hover:scale-105 transition-transform">
                    <Music className="h-12 w-12 mb-4 text-purple-400" />
                    <h3 className="text-2xl font-semibold">Producer Battles</h3>
                    <p className="text-lg text-gray-300 mt-2">Compete with other producers in real-time</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8 text-white transform hover:scale-105 transition-transform">
                    <Trophy className="h-12 w-12 mb-4 text-purple-400" />
                    <h3 className="text-2xl font-semibold">Win Prizes</h3>
                    <p className="text-lg text-gray-300 mt-2">Compete for rewards and recognition</p>
                  </div>
                </div>
                <div className="mt-12">
                  <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8 text-white transform hover:scale-105 transition-transform">
                    <Users className="h-12 w-12 mb-4 text-purple-400" />
                    <h3 className="text-2xl font-semibold">Community Voting</h3>
                    <p className="text-lg text-gray-300 mt-2">Let your audience choose the winners</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}