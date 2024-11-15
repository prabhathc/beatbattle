'use client';

import { motion } from 'framer-motion';
import { StepProps } from '../types';

export default function RulesStep({ formData, updateFormData }: StepProps) {
  const isBattleLobby = formData.type === 'battle';

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white">Rules & Settings</h2>
        <p className="mt-2 text-gray-400">Set up your {isBattleLobby ? 'battle' : 'feedback session'} parameters</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        {isBattleLobby && (
          <div>
            <label htmlFor="entryFee" className="block text-sm font-medium text-gray-300">
              Entry Fee (USD)
            </label>
            <input
              type="number"
              id="entryFee"
              min="0"
              step="1"
              value={formData.entryFee}
              onChange={(e) => updateFormData({ entryFee: Number(e.target.value) })}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
        )}

        <div>
          <label htmlFor="deadline" className="block text-sm font-medium text-gray-300">
            {isBattleLobby ? 'Submission Deadline' : 'Session End Time'}
          </label>
          <input
            type="datetime-local"
            id="deadline"
            value={formData.deadline}
            onChange={(e) => updateFormData({ deadline: e.target.value })}
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-purple-500 focus:ring-purple-500"
          />
        </div>

        {isBattleLobby && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Voting Method
            </label>
            <div className="space-y-2">
              {[
                { id: 'community', label: 'Community Voting' },
                { id: 'jury', label: 'Jury Selection' },
                { id: 'hybrid', label: 'Hybrid (Community + Jury)' },
              ].map((method) => (
                <label
                  key={method.id}
                  className="flex items-center space-x-3 p-3 rounded-md hover:bg-gray-700 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="votingMethod"
                    value={method.id}
                    checked={formData.votingMethod === method.id}
                    onChange={(e) => updateFormData({ votingMethod: e.target.value })}
                    className="text-purple-500 focus:ring-purple-500"
                  />
                  <span className="text-white">{method.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {!isBattleLobby && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Feedback Settings
            </label>
            <div className="space-y-2">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  className="text-purple-500 focus:ring-purple-500 rounded"
                />
                <span className="text-white">Allow audience feedback</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  className="text-purple-500 focus:ring-purple-500 rounded"
                />
                <span className="text-white">Enable queue prioritization</span>
              </label>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}