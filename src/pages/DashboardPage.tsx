import React from "react";
import { useParams } from "react-router-dom";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import SubmissionsList from "../components/Dashboard/SubmissionsList";
import VotingPhaseControl from "../components/Dashboard/VotingPhaseControl";
import StatsOverview from "../components/Dashboard/StatsOverview";

export default function DashboardPage() {
  const { id } = useParams();

  if (!id) {
    return <div>Error: Battle ID is required.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <DashboardHeader battleId={id} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <SubmissionsList battleId={id} />
          </div>
          <div className="space-y-6">
            <StatsOverview battleId={id} />
            <VotingPhaseControl battleId={id} />
          </div>
        </div>
      </div>
    </div>
  );
}
