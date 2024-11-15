"use client";

import { useState } from "react";
import { Trophy, TrendingUp, TrendingDown, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Track {
  id: string;
  title: string;
  artist: string;
  artwork?: string;
  votes: number;
  averageScore: number;
  upvotes: number;
  downvotes: number;
  previousRank?: number;
  currentRank: number;
}

export default function BattleLeaderboard() {
  const [tracks] = useState<Track[]>([
    {
      id: "1",
      title: "Summer Vibes",
      artist: "Producer123",
      artwork: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89",
      votes: 156,
      averageScore: 8.7,
      upvotes: 145,
      downvotes: 11,
      previousRank: 2,
      currentRank: 1,
    },
    {
      id: "2",
      title: "Midnight Groove",
      artist: "BeatMaker99",
      artwork: "https://images.unsplash.com/photo-1511379938547-c1f69419868d",
      votes: 142,
      averageScore: 8.4,
      upvotes: 130,
      downvotes: 12,
      previousRank: 1,
      currentRank: 2,
    },
    // Add more tracks as needed
  ]);

  const getRankChange = (track: Track) => {
    if (!track.previousRank) return "same";
    if (track.currentRank < track.previousRank) return "up";
    if (track.currentRank > track.previousRank) return "down";
    return "same";
  };

  const getRankChangeColor = (change: string) => {
    switch (change) {
      case "up":
        return "text-green-400";
      case "down":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  const getRankIcon = (change: string) => {
    switch (change) {
      case "up":
        return <TrendingUp className="w-4 h-4" />;
      case "down":
        return <TrendingDown className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-400" />
          Live Leaderboard
        </h2>
        <div className="text-sm text-gray-400">Updated in real-time</div>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {tracks
            .sort((a, b) => a.currentRank - b.currentRank)
            .map((track) => {
              const rankChange = getRankChange(track);

              return (
                <motion.div
                  key={track.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`bg-gray-700/50 rounded-lg p-4 ${
                    track.currentRank === 1 ? "border border-yellow-500/50" : ""
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8 h-8 bg-gray-800 rounded-full">
                      <span className="text-lg font-bold text-white">
                        {track.currentRank}
                      </span>
                    </div>

                    <div className="relative w-12 h-12">
                      {track.artwork ? (
                        <Image
                          src={track.artwork}
                          alt={track.title}
                          fill
                          className="object-cover rounded-md"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-600 rounded-md" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-white font-medium">
                          {track.title}
                        </h3>
                        {track.currentRank === 1 && (
                          <Star className="w-4 h-4 text-yellow-400" />
                        )}
                      </div>
                      <p className="text-gray-400 text-sm">{track.artist}</p>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-sm text-gray-400">Votes</div>
                        <div className="text-white font-medium">
                          {track.votes}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Score</div>
                        <div className="text-white font-medium">
                          {track.averageScore.toFixed(1)}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Up/Down</div>
                        <div className="text-white font-medium">
                          {track.upvotes}/{track.downvotes}
                        </div>
                      </div>
                    </div>

                    <div
                      className={`flex items-center gap-1 ${getRankChangeColor(
                        rankChange
                      )}`}
                    >
                      {getRankIcon(rankChange)}
                      {rankChange !== "same" && (
                        <span className="text-sm">
                          {Math.abs(
                            track.currentRank -
                              (track.previousRank || track.currentRank)
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
        </AnimatePresence>
      </div>
    </div>
  );
}
