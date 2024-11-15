import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { StepType } from './types';
import StepIndicator from './StepIndicator';
import BattleTypeStep from './steps/BattleTypeStep';
import BattleDetailsStep from './steps/BattleDetailsStep';
import RulesStep from './steps/RulesStep';
import ConfirmationStep from './steps/ConfirmationStep';

export default function CreateBattleForm() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = React.useState(0);
  const [formData, setFormData] = React.useState({
    type: '',
    title: '',
    description: '',
    entryFee: 0,
    deadline: '',
    votingMethod: '',
  });

  const steps: StepType[] = [
    { id: 'type', title: 'Lobby Type', component: BattleTypeStep },
    { id: 'details', title: 'Details', component: BattleDetailsStep },
    { id: 'rules', title: 'Rules & Settings', component: RulesStep },
    { id: 'confirm', title: 'Confirmation', component: ConfirmationStep },
  ];

  const generateLobbyCode = () => {
    // Generate a unique 6-character alphanumeric code
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // On final step, generate lobby code and navigate
      const lobbyCode = generateLobbyCode();
      navigate(`/battle/${lobbyCode}`);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleNext();
    }
  };

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStep]);

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData({ ...formData, ...data });
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <StepIndicator steps={steps} currentStep={currentStep} />
        
        <div className="mt-8 bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <div className="p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {React.createElement(steps[currentStep].component, {
                  formData,
                  updateFormData,
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="px-8 py-4 bg-gray-900/50 border-t border-gray-700 flex justify-between">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                currentStep === 0
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-white hover:bg-purple-600'
              }`}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </button>
            <button
              onClick={handleNext}
              className="flex items-center px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-md text-sm font-medium text-white transition-colors"
            >
              {currentStep === steps.length - 1 ? 'Create Lobby' : 'Next'}
              {currentStep < steps.length - 1 && (
                <ChevronRight className="w-4 h-4 ml-2" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}