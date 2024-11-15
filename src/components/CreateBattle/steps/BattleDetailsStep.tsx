import React from 'react';
import { motion } from 'framer-motion';
import { StepProps } from '../types';

export default function BattleDetailsStep({ formData, updateFormData }: StepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white">Battle Details</h2>
        <p className="mt-2 text-gray-400">Tell us more about your battle</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-300">
            Battle Title
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => updateFormData({ title: e.target.value })}
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-purple-500 focus:ring-purple-500"
            placeholder="e.g., Summer Beat Championship"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-300">
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            value={formData.description}
            onChange={(e) => updateFormData({ description: e.target.value })}
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-purple-500 focus:ring-purple-500"
            placeholder="Describe your battle, rules, and what makes it special..."
          />
        </div>
      </motion.div>
    </div>
  );
}