import Link from "next/link";
import { Play, Music, Users, Trophy } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-purple-900 to-indigo-900">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-5xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                <span className="block">Host Epic Beat Battles</span>
                <span className="block text-purple-400">
                  For Your Community
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Create engaging music competitions, foster talent, and build
                your community. Perfect for streamers, producers, and music
                enthusiasts.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link
                    href="/create"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 md:py-4 md:text-lg md:px-10"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Start a Battle
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link
                    href="/active-lobbies"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-purple-700 bg-purple-100 hover:bg-purple-200 md:py-4 md:text-lg md:px-10"
                  >
                    Browse Battles
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <div className="h-56 w-full sm:h-72 md:h-96 lg:w-full lg:h-full bg-gradient-to-br from-purple-800 to-indigo-900 flex items-center justify-center">
          <div className="grid grid-cols-2 gap-4 p-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 text-white">
              <Music className="h-8 w-8 mb-4 text-purple-400" />
              <h3 className="text-lg font-semibold">Producer Battles</h3>
              <p className="text-sm text-gray-300">
                Compete with other producers in real-time
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 text-white">
              <Users className="h-8 w-8 mb-4 text-purple-400" />
              <h3 className="text-lg font-semibold">Community Voting</h3>
              <p className="text-sm text-gray-300">
                Let your audience choose the winners
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 text-white">
              <Trophy className="h-8 w-8 mb-4 text-purple-400" />
              <h3 className="text-lg font-semibold">Win Prizes</h3>
              <p className="text-sm text-gray-300">
                Compete for rewards and recognition
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
