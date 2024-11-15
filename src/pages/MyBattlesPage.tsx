import React from "react";
import { useRouter } from "next/router";
import { Music2, Users, Calendar, ChevronRight } from "lucide-react";

export default function MyBattlesPage() {
  const router = useRouter();

  const battles = [
    {
      id: 1,
      title: "Summer Beat Championship",
      type: "battle",
      status: "active",
      participants: 24,
      deadline: "2h 15m remaining",
      prize: "$500",
    },
    {
      id: 2,
      title: "Producer Feedback Session",
      type: "feedback",
      status: "upcoming",
      participants: 12,
      deadline: "Starts in 2 days",
      prize: "Free",
    },
    {
      id: 3,
      title: "Beat Battle Finals",
      type: "battle",
      status: "completed",
      participants: 32,
      deadline: "Ended 3 days ago",
      prize: "$1,000",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-400 border-green-500";
      case "upcoming":
        return "bg-blue-500/10 text-blue-400 border-blue-500";
      case "completed":
        return "bg-gray-500/10 text-gray-400 border-gray-500";
      default:
        return "bg-purple-500/10 text-purple-400 border-purple-500";
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">My Lobbies</h1>
            <p className="text-gray-400 mt-1">
              Manage your battle and feedback sessions
            </p>
          </div>
          <button
            onClick={() => router.push("/create")}
            className="px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-md text-white transition-colors flex items-center"
          >
            <Music2 className="w-4 h-4 mr-2" />
            Create New Lobby
          </button>
        </div>

        <div className="grid gap-6">
          {battles.map((battle) => (
            <div
              key={battle.id}
              className="bg-gray-800 rounded-lg p-6 hover:bg-gray-800/80 transition-colors cursor-pointer"
              onClick={() => router.push(`/dashboard/${battle.id}`)}
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h2 className="text-xl font-semibold text-white">
                    {battle.title}
                  </h2>
                  <div className="flex items-center space-x-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(
                        battle.status
                      )}`}
                    >
                      {battle.status.charAt(0).toUpperCase() +
                        battle.status.slice(1)}
                    </span>
                    <span className="text-sm text-purple-400">
                      {battle.type === "battle"
                        ? "Battle Lobby"
                        : "Feedback Lobby"}
                    </span>
                    <div className="flex items-center text-gray-400">
                      <Users className="w-4 h-4 mr-1" />
                      <span>{battle.participants} participants</span>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{battle.deadline}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-purple-400 font-semibold">
                      {battle.prize}
                    </div>
                    <div className="text-sm text-gray-400">
                      {battle.type === "battle" ? "Prize Pool" : "Entry Fee"}
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
