'use client';

import { motion } from 'framer-motion';
import { StepProps } from '../types';

export default function ConfirmationStep({ formData }: StepProps) {
  const isBattleLobby = formData.type === 'battle';

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white">Confirm Your {isBattleLobby ? 'Battle' : 'Feedback Session'}</h2>
        <p className="mt-2 text-gray-400">Review your details before creating</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="bg-gray-700/50 rounded-lg p-6 space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-400">Lobby Type</h3>
            <p className="mt-1 text-white">{isBattleLobby ? 'Battle Lobby' : 'Feedback Lobby'}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-400">Title</h3>
            <p className="mt-1 text-white">{formData.title}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-400">Description</h3>
            <p className="mt-1 text-white">{formData.description}</p>
          </div>

          {isBattleLobby && (
            <>
              <div>
                <h3 className="text-sm font-medium text-gray-400">Entry Fee</h3>
                <p className="mt-1 text-white">${formData.entryFee}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-400">Voting Method</h3>
                <p className="mt-1 text-white capitalize">{formData.votingMethod}</p>
              </div>
            </>
          )}

          <div>
            <h3 className="text-sm font-medium text-gray-400">
              {isBattleLobby ? 'Submission Deadline' : 'Session End Time'}
            </h3>
            <p className="mt-1 text-white">
              {new Date(formData.deadline).toLocaleString()}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}