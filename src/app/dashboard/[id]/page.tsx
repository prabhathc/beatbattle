'use client';

import { useParams } from 'next/navigation';
import DashboardHeader from '@/components/Dashboard/DashboardHeader';
import SubmissionsList from '@/components/Dashboard/SubmissionsList';
import VotingPhaseControl from '@/components/Dashboard/VotingPhaseControl';
import StatsOverview from '@/components/Dashboard/StatsOverview';
import FeedbackQueue from '@/components/Dashboard/FeedbackQueue';

export default function DashboardPage() {
  const params = useParams();
  const id = params.id as string;
  const isFeedbackLobby = true; // TODO: Get this from API

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <DashboardHeader battleId={id} isFeedbackLobby={isFeedbackLobby} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {isFeedbackLobby ? (
              <FeedbackQueue lobbyId={id} />
            ) : (
              <SubmissionsList battleId={id} />
            )}
          </div>
          <div className="space-y-6">
            <StatsOverview battleId={id} isFeedbackLobby={isFeedbackLobby} />
            {!isFeedbackLobby && <VotingPhaseControl battleId={id} />}
          </div>
        </div>
      </div>
    </div>
  );
}