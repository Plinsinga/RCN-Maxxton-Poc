import React from 'react';
import { BookingStep } from '../types';

interface StepIndicatorProps {
  currentStep: BookingStep;
}

const steps = [
  { id: BookingStep.SELECT_PARK, label: 'Kies Park' },
  { id: BookingStep.SELECT_DATE, label: 'Kies Data' },
  { id: BookingStep.SELECT_TYPE, label: 'Kies Verblijf' },
  { id: BookingStep.CONFIRMATION, label: 'Overzicht' },
];

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-center space-x-2 md:space-x-4">
        {steps.map((step, index) => {
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;
          
          return (
            <div key={step.id} className="flex items-center">
              <div 
                className={`
                  flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold border-2
                  ${isActive ? 'border-brand-600 text-brand-600 bg-white' : ''}
                  ${isCompleted ? 'bg-brand-600 border-brand-600 text-white' : ''}
                  ${!isActive && !isCompleted ? 'border-gray-300 text-gray-400' : ''}
                `}
              >
                {isCompleted ? '✓' : index + 1}
              </div>
              <span className={`ml-2 text-sm hidden md:block ${isActive || isCompleted ? 'text-gray-900 font-medium' : 'text-gray-400'}`}>
                {step.label}
              </span>
              {index < steps.length - 1 && (
                <div className="w-8 h-0.5 bg-gray-200 mx-2 md:mx-4 hidden sm:block"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};