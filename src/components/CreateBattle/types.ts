import { ComponentType } from 'react';

export interface FormData {
  type: string;
  title: string;
  description: string;
  entryFee: number;
  deadline: string;
  votingMethod: string;
}

export interface StepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

export interface StepType {
  id: string;
  title: string;
  component: ComponentType<StepProps>;
}