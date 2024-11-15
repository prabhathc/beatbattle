"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import StepIndicator from "./StepIndicator";
import LobbyTypeStep from "./steps/LobbyTypeStep";
import LobbyDetailsStep from "./steps/LobbyDetailsStep";
import RulesStep from "./steps/RulesStep";
import ConfirmationStep from "./steps/ConfirmationStep";
import { FormData, StepType } from "./types";
import React from "react";

interface CreateLobbyFormProps {
  onSubmit: (data: FormData) => void;
  isSubmitting: boolean;
}

export default function CreateLobbyForm({
  onSubmit,
  isSubmitting,
}: CreateLobbyFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    type: "",
    title: "",
    description: "",
    entryFee: 0,
    deadline: "",
    votingMethod: "",
  });

  const steps: StepType[] = [
    { id: "type", title: "Lobby Type", component: LobbyTypeStep },
    { id: "details", title: "Details", component: LobbyDetailsStep },
    { id: "rules", title: "Rules & Settings", component: RulesStep },
    { id: "confirm", title: "Confirmation", component: ConfirmationStep },
  ];

  const handleNext = () => {
    if (currentStep === steps.length - 1) {
      onSubmit(formData);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (data: Partial<FormData>) => {
    setFormData({ ...formData, ...data });
  };

  return (
    <div>
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
                ? "text-gray-400 cursor-not-allowed"
                : "text-white hover:bg-purple-600"
            }`}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={isSubmitting}
            className="flex items-center px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-md text-sm font-medium text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentStep === steps.length - 1 ? (
              isSubmitting ? (
                "Creating..."
              ) : (
                "Create Lobby"
              )
            ) : (
              <>
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
