import React from "react";
import { useRouter } from "next/router";
import { Clock, Users, HeartPulse } from "lucide-react";

export default function FeaturedBattles() {
  const router = useRouter();

  const lobbies = [
    {
      id: "XYZ123",
      title: "Lo-Fi Beats Championship",
      host: "ChillBeats",
      participants: 24,
      deadline: "2h 15m",
      prize: "$500",
      image:
        "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?auto=format&fit=crop&q=80&w=2070",
    },
    {
      id: "ABC456",
      title: "Trap Music Feedback",
      host: "BeatMaster Pro",
      participants: 18,
      deadline: "5h 30m",
      prize: "Free",
      image:
        "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80&w=2070",
    },
    {
      id: "DEF789",
      title: "House Music Session",
      host: "GrooveMaster",
      participants: 32,
      deadline: "12h 45m",
      prize: "$1000",
      image:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=2070",
    },
  ];

  return (
    <section className="py-12 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Featured Lobbies
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-300 sm:mt-4">
            Join the hottest music sessions happening right now
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {lobbies.map((lobby) => (
            <div
              key={lobby.id}
              onClick={() => router.push(`/battle/${lobby.id}`)}
              className="flex flex-col overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105 cursor-pointer"
            >
              <div className="flex-shrink-0 h-48 relative">
                <img
                  className="h-full w-full object-cover"
                  src={lobby.image}
                  alt={lobby.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-500 text-white">
                    {lobby.prize}
                  </span>
                </div>
              </div>
              <div className="flex-1 bg-gray-800 p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white">
                    {lobby.title}
                  </h3>
                  <p className="mt-2 text-gray-300">Hosted by {lobby.host}</p>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center text-gray-400 text-sm">
                    <Users className="h-4 w-4 mr-1" />
                    {lobby.participants} joined
                  </div>
                  <div className="flex items-center text-gray-400 text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    {lobby.deadline} left
                  </div>
                  <div className="flex items-center text-purple-400 hover:text-purple-300 transition-colors">
                    <HeartPulse className="h-4 w-4 mr-1" />
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
