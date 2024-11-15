import React from "react";
import Link from "next/link";
import { Clock, Users, Trophy, Settings, ArrowLeft } from "lucide-react";

interface DashboardHeaderProps {
  battleId?: string;
  isFeedbackLobby?: boolean;
}

export default function DashboardHeader({
  isFeedbackLobby,
}: DashboardHeaderProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center mb-6">
        <Link
          href="/my-battles"
          className="flex items-center text-purple-400 hover:text-purple-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to My Battles
        </Link>
      </div>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">
            {isFeedbackLobby
              ? "Producer Feedback Session"
              : "Summer Beat Championship"}
          </h1>
          <p className="text-gray-400 mt-1">Organized by BeatMaster Pro</p>
        </div>
        <div className="mt-4 lg:mt-0">
          <button className="inline-flex items-center px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-md text-white transition-colors">
            <Settings className="w-4 h-4 mr-2" />
            {isFeedbackLobby ? "Session Settings" : "Battle Settings"}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="flex items-center space-x-3 bg-gray-700/50 rounded-lg p-4">
          <Clock className="w-5 h-5 text-purple-400" />
          <div>
            <p className="text-sm text-gray-400">Time Remaining</p>
            <p className="text-lg font-semibold text-white">2h 15m</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 bg-gray-700/50 rounded-lg p-4">
          <Users className="w-5 h-5 text-purple-400" />
          <div>
            <p className="text-sm text-gray-400">
              {isFeedbackLobby ? "Queue Size" : "Participants"}
            </p>
            <p className="text-lg font-semibold text-white">24</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 bg-gray-700/50 rounded-lg p-4">
          {isFeedbackLobby ? (
            <>
              <Users className="w-5 h-5 text-purple-400" />
              <div>
                <p className="text-sm text-gray-400">Active Listeners</p>
                <p className="text-lg font-semibold text-white">156</p>
              </div>
            </>
          ) : (
            <>
              <Trophy className="w-5 h-5 text-purple-400" />
              <div>
                <p className="text-sm text-gray-400">Prize Pool</p>
                <p className="text-lg font-semibold text-white">$500</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
