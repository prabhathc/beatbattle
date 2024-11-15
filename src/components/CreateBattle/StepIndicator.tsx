import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { StepType } from './types';

interface StepIndicatorProps {
  steps: StepType[];
  currentStep: number;
}

export default function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex justify-between">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;

        return (
          <div key={step.id} className="flex items-center">
            <div className="relative">
              <motion.div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isCompleted
                    ? 'bg-purple-600'
                    : isCurrent
                    ? 'bg-purple-500'
                    : 'bg-gray-700'
                }`}
                animate={{
                  scale: isCurrent ? 1.1 : 1,
                  transition: { duration: 0.2 },
                }}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5 text-white" />
                ) : (
                  <span className="text-white">{index + 1}</span>
                )}
              </motion.div>
              <motion.div
                className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-sm"
                animate={{
                  opacity: isCurrent ? 1 : 0.6,
                }}
              >
                {step.title}
              </motion.div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-full h-[2px] mx-4 ${
                  index < currentStep ? 'bg-purple-600' : 'bg-gray-700'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}