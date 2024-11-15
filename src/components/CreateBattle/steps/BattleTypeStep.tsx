import React from 'react';
import { motion } from 'framer-motion';
import { Swords, MessageCircle } from 'lucide-react';
import { StepProps } from '../types';

export default function BattleTypeStep({ formData, updateFormData }: StepProps) {
  const types = [
    {
      id: 'battle',
      title: 'Battle Lobby',
      description: 'Competitive environment where producers compete for votes and rankings',
      icon: Swords,
      features: ['Leaderboard system', 'Voting mechanics', 'Prize pools', 'Entry fees'],
    },
    {
      id: 'feedback',
      title: 'Feedback Lobby',
      description: 'Collaborative space for live music review and feedback sessions',
      icon: MessageCircle,
      features: ['Live reviews', 'Queue management', 'Audience interaction', 'Constructive feedback'],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white">Choose Lobby Type</h2>
        <p className="mt-2 text-gray-400">Select how you want to organize your session</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {types.map((type) => (
          <motion.button
            key={type.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => updateFormData({ type: type.id })}
            className={`p-6 rounded-lg border-2 text-left transition-colors ${
              formData.type === type.id
                ? 'border-purple-500 bg-purple-500/10'
                : 'border-gray-700 hover:border-gray-600'
            }`}
          >
            <type.icon className="w-8 h-8 text-purple-400 mb-4" />
            <h3 className="text-lg font-semibold text-white">{type.title}</h3>
            <p className="mt-2 text-sm text-gray-400">{type.description}</p>
            <ul className="mt-4 space-y-2">
              {type.features.map((feature, index) => (
                <li key={index} className="text-sm text-gray-500 flex items-center">
                  <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
          </motion.button>
        ))}
      </div>
    </div>
  );
}