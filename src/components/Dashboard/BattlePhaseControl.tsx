'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Vote, Trophy, Lock, Timer, AlertCircle } from 'lucide-react';

type BattlePhase = 'submission' | 'voting' | 'results';

interface BattlePhaseControlProps {
  battleId: string;
}

export default function BattlePhaseControl({ battleId }: BattlePhaseControlProps) {
  const [currentPhase, setCurrentPhase] = useState<BattlePhase>('submission');
  const [timeRemaining, setTimeRemaining] = useState('30:00');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const phases = [
    {
      id: 'submission',
      title: 'Submission Phase',
      description: 'Producers can submit their tracks',
      icon: Play,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/50',
    },
    {
      id: 'voting',
      title: 'Voting Phase',
      description: 'Audience can vote on submissions',
      icon: Vote,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/50',
    },
    {
      id: 'results',
      title: 'Results Phase',
      description: 'Winners are announced',
      icon: Trophy,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/50',
    },
  ];

  const handlePhaseChange = (phase: BattlePhase) => {
    setShowConfirmation(true);
  };

  const confirmPhaseChange = (phase: BattlePhase) => {
    setCurrentPhase(phase);
    setShowConfirmation(false);
  };

  const getCurrentPhase = () => {
    return phases.find(phase => phase.id === currentPhase);
  };

  const phase = getCurrentPhase();

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-6">Battle Phase Control</h2>

      {/* Current Phase Display */}
      {phase && (
        <div className={`${phase.bgColor} border ${phase.borderColor} rounded-lg p-4 mb-6`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <phase.icon className={`w-5 h-5 ${phase.color}`} />
              <span className="text-white font-medium">{phase.title}</span>
            </div>
            <div className="flex items-center gap-2">
              <Timer className="w-4 h-4 text-gray-400" />
              <span className="text-gray-300">{timeRemaining}</span>
            </div>
          </div>
          <p className="text-sm text-gray-300">{phase.description}</p>
        </div>
      )}

      {/* Phase Controls */}
      <div className="space-y-4">
        {phases.map((phase) => (
          <button
            key={phase.id}
            onClick={() => handlePhaseChange(phase.id as BattlePhase)}
            disabled={phase.id === currentPhase}
            className={`w-full flex items-center justify-between p-4 rounded-lg transition-colors ${
              phase.id === currentPhase
                ? 'bg-gray-700 cursor-not-allowed'
                : 'bg-gray-700/50 hover:bg-gray-700'
            }`}
          >
            <div className="flex items-center gap-3">
              <phase.icon className={`w-5 h-5 ${phase.color}`} />
              <span className="text-white">{phase.title}</span>
            </div>
            {phase.id === currentPhase ? (
              <span className="text-sm text-gray-400">Current Phase</span>
            ) : (
              <Lock className="w-4 h-4 text-gray-400" />
            )}
          </button>
        ))}
      </div>

      {/* Phase Change Confirmation Modal */}
      {showConfirmation && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
        >
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-yellow-400" />
              <h3 className="text-lg font-semibold text-white">Confirm Phase Change</h3>
            </div>
            <p className="text-gray-300 mb-6">
              Are you sure you want to change the phase? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => confirmPhaseChange('voting')}
                className="px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-md text-white transition-colors"
              >
                Confirm Change
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}