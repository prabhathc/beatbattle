'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Filter, Users, Clock, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function ActiveLobbiesPage() {
  const router = useRouter();
  const [lobbyCode, setLobbyCode] = useState('');
  
  const lobbies = [
    {
      id: 'XYZ123',
      title: "Lo-Fi Beats Championship",
      host: "ChillBeats",
      type: "battle",
      participants: 24,
      deadline: "2h 15m",
      prize: "$500",
      image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?auto=format&fit=crop&q=80&w=2070",
    },
    {
      id: 'ABC456',
      title: "Trap Music Feedback",
      host: "BeatMaster Pro",
      type: "feedback",
      participants: 18,
      deadline: "5h 30m",
      prize: "Free",
      image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80&w=2070",
    },
  ];

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (lobbyCode.trim()) {
      router.push(`/lobby/${lobbyCode.trim()}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Active Lobbies</h1>
            <p className="text-gray-400 mt-1">Join ongoing battles and feedback sessions</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search lobbies..."
                className="pl-10 pr-4 py-2 w-full sm:w-64 bg-gray-800 rounded-md border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
            </div>
            <button className="flex items-center justify-center px-4 py-2 bg-gray-800 rounded-md text-white hover:bg-gray-700 transition-colors">
              <Filter className="w-5 h-5 mr-2" />
              Filters
            </button>
          </div>
        </div>

        {/* Lobby Code Input */}
        <div className="mb-8">
          <form onSubmit={handleCodeSubmit} className="bg-gray-800 rounded-lg p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Have a Lobby Code?</h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                value={lobbyCode}
                onChange={(e) => setLobbyCode(e.target.value.toUpperCase())}
                placeholder="Enter lobby code"
                className="flex-1 px-4 py-2 bg-gray-700 rounded-md border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                maxLength={6}
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2 bg-purple-500 hover:bg-purple-600 rounded-md text-white font-medium transition-colors flex items-center justify-center"
              >
                Join <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </form>
        </div>

        <div className="grid gap-6">
          {lobbies.map((lobby) => (
            <div
              key={lobby.id}
              onClick={() => router.push(`/lobby/${lobby.id}`)}
              className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-800/80 transition-colors cursor-pointer"
            >
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-48 h-48 md:h-auto relative">
                  <Image
                    src={lobby.image}
                    alt={lobby.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      lobby.type === 'battle'
                        ? 'bg-purple-500 text-white'
                        : 'bg-blue-500 text-white'
                    }`}>
                      {lobby.type === 'battle' ? 'Battle' : 'Feedback'}
                    </span>
                  </div>
                </div>
                <div className="p-4 sm:p-6 flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-white">{lobby.title}</h2>
                      <p className="text-gray-400 mt-1">Hosted by {lobby.host}</p>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <span className="text-xl font-bold text-purple-400">{lobby.prize}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 mt-4">
                    <div className="flex items-center text-gray-400">
                      <Users className="w-4 h-4 mr-1" />
                      {lobby.participants} participants
                    </div>
                    <div className="flex items-center text-gray-400">
                      <Clock className="w-4 h-4 mr-1" />
                      {lobby.deadline} remaining
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}