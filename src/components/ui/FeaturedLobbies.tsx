"use client";

import { useRouter } from "next/navigation";
import { Clock, Users, HeartPulse } from "lucide-react";
import Image from "next/image";

export default function FeaturedLobbies() {
  const router = useRouter();

  const lobbies = [
    {
      id: "XYZ123",
      title: "Midnight Phonk Battles",
      host: "DriftLordZ",
      participants: 24,
      deadline: "2h 15m",
      prize: "$500",
      image:
        "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?auto=format&fit=crop&q=80&w=2070",
    },
    {
      id: "JERK002",
      title: "jerk n' vibez (bring ur A game)",
      host: "DJFlipsta",
      participants: 18,
      deadline: "5h 30m",
      prize: "Free",
      image:
        "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80&w=2070",
    },
    {
      id: "NUJAZZ003",
      title: "Cosmic Jazz Lounge: Play or Chill",
      host: "VinylElla",
      participants: 32,
      deadline: "12h 45m",
      prize: "$1000",
      image:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=2070",
    },
    {
      id: "PLUGNB004",
      title: "pluggnb sound clash",
      host: "2raw_plug",
      participants: 20,
      deadline: "3h 10m",
      prize: "$300",
      image:
        "https://images.unsplash.com/photo-1544785349-c4a5301826fd?auto=format&fit=crop&q=80&w=2070",
    },
    {
      id: "VAPOR005",
      title: "Vaporwave Session // Bring the Aesthetic",
      host: "CyberDreamz99",
      participants: 15,
      deadline: "6h 45m",
      prize: "$200",
      image:
        "https://images.unsplash.com/photo-1564155251900-2d64e6f08c0b?auto=format&fit=crop&q=80&w=2070",
    },
    {
      id: "TRILL006",
      title: "Trillwave Showdown",
      host: "BigTinoBeats",
      participants: 27,
      deadline: "1h 30m",
      prize: "$750",
      image:
        "https://images.unsplash.com/photo-1533575373253-711f5f694d6f?auto=format&fit=crop&q=80&w=2070",
    },
    {
      id: "BOUNCE007",
      title: "Bounce City Bangers Only",
      host: "jerseyBeast88",
      participants: 19,
      deadline: "4h 50m",
      prize: "Free",
      image:
        "https://images.unsplash.com/photo-1485053013851-7b875e3026d1?auto=format&fit=crop&q=80&w=2070",
    },
    {
      id: "PHONK808",
      title: "808 Drift Symphony",
      host: "PhonkRiderZ",
      participants: 40,
      deadline: "30m",
      prize: "$1500",
      image:
        "https://images.unsplash.com/photo-1524135329990-07660cd5bf10?auto=format&fit=crop&q=80&w=2070",
    },
    {
      id: "CHILLTRAP009",
      title: "Chilltrap Kingdom",
      host: "LofiFlow101",
      participants: 22,
      deadline: "8h",
      prize: "$250",
      image:
        "https://images.unsplash.com/photo-1509339022327-2b1a98f9d155?auto=format&fit=crop&q=80&w=2070",
    },
    {
      id: "EXPERIM010",
      title: "Experimental Waves (No Rules)",
      host: "sonicNomad",
      participants: 16,
      deadline: "24h",
      prize: "$600",
      image:
        "https://images.unsplash.com/photo-1522008341862-479cb1c5263e?auto=format&fit=crop&q=80&w=2070",
    },
    {
      id: "MELLOW011",
      title: "Late Night Loops",
      host: "The Vinyl Sage",
      participants: 25,
      deadline: "3h 20m",
      prize: "Free",
      image:
        "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=2070",
    },
    {
      id: "DARKTRAP012",
      title: "Darktrap Apocalypse",
      host: "BeatzInferno",
      participants: 12,
      deadline: "9h 10m",
      prize: "$900",
      image:
        "https://images.unsplash.com/photo-1523580846011-d3a5bc25702d?auto=format&fit=crop&q=80&w=2070",
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
