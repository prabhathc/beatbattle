"use client";

import { useParams } from "next/navigation";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import BattleLeaderboard from "@/components/Dashboard/BattleLeaderboard";
import BattlePhaseControl from "@/components/Dashboard/BattlePhaseControl";
import BattleSubmissionQueue from "@/components/Dashboard/BattleSubmissionQueue";
import FeedbackQueue from "@/components/Dashboard/FeedbackQueue";

export default function DashboardPage() {
  const params = useParams();
  if (!params) {
    return <div>Error: No parameters found</div>;
  }
  const id = params.id as string;
  const isFeedbackLobby = false; // TODO: Get this from API

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <DashboardHeader battleId={id} isFeedbackLobby={isFeedbackLobby} />
        
        {isFeedbackLobby ? (
          // Feedback Lobby Layout
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <FeedbackQueue lobbyId={id} />
            </div>
            <div>
              <BattlePhaseControl battleId={id} />
            </div>
          </div>
        ) : (
          // Battle Lobby Layout
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <BattleLeaderboard />
              <BattleSubmissionQueue battleId={id} />
            </div>
            <div>
              <BattlePhaseControl battleId={id} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}