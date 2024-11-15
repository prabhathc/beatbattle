'use client';

import { useRouter } from 'next/navigation';
import { Clock, Users, HeartPulse } from 'lucide-react';
import Image from 'next/image';

export default function FeaturedLobbies() {
  const router = useRouter();
  
  const lobbies = [
    {
      id: 'XYZ123',
      title: "Lo-Fi Beats Championship",
      host: "ChillBeats",
      participants: 24,
      deadline: "2h 15m",
      prize: "$500",
      image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?auto=format&fit=crop&q=80&w=2070",
    },
    {
      id: 'ABC456',
      title: "Trap Music Feedback",
      host: "BeatMaster Pro",
      participants: 18,
      deadline: "5h 30m",
      prize: "Free",
      image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80&w=2070",
    },
    {
      id: 'DEF789',
      title: "House Music Session",
      host: "GrooveMaster",
      participants: 32,
      deadline: "12h 45m",
      prize: "$1000",
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=2070",
    },
  ];

  return (
    <section className="py-24 bg-gray-900">
      <div className="container-xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white">
            Featured Lobbies
          </h2>
          <p className="mt-4 text-xl lg:text-2xl text-gray-300">
            Join the hottest music sessions happening right now
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {lobbies.map((lobby) => (
            <div
              key={lobby.id}
              className="flex flex-col overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105 cursor-pointer bg-gray-800"
              onClick={() => router.push(`/lobby/${lobby.id}`)}
            >
              <div className="relative aspect-video">
                <Image
                  src={lobby.image}
                  alt={lobby.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-base font-medium bg-purple-500 text-white">
                    {lobby.prize}
                  </span>
                </div>
              </div>
              <div className="flex-1 p-8">
                <div className="mb-4">
                  <h3 className="text-2xl font-semibold text-white mb-2">
                    {lobby.title}
                  </h3>
                  <p className="text-lg text-gray-300">
                    Hosted by {lobby.host}
                  </p>
                </div>
                <div className="flex items-center justify-between text-base">
                  <div className="flex items-center text-gray-400">
                    <Users className="h-5 w-5 mr-2" />
                    {lobby.participants} joined
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Clock className="h-5 w-5 mr-2" />
                    {lobby.deadline} left
                  </div>
                  <div className="flex items-center text-purple-400 hover:text-purple-300 transition-colors">
                    <HeartPulse className="h-5 w-5 mr-2" />
                    Join
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}