// src/components/wizard/StepIndicator.tsx
import { steps } from './stepConfig';
import { motion } from 'framer-motion';

interface StepIndicatorProps {
  currentStep: number;
  progress: number;
}

export function StepIndicator({ currentStep, progress }: StepIndicatorProps) {
  return (
    <div className="mb-10">
      <div className="flex justify-between relative">
        {/* Línea conectora */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-slate-200 dark:bg-slate-700 -z-10" />
        
        {steps.map((step, idx) => {
          const stepNum = idx + 1;
          const isComplete = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;
          
          return (
            <div key={step.id} className="flex flex-col items-center relative">
              <motion.div 
                initial={{ scale: 0.8 }}
                animate={{ scale: isCurrent ? 1.1 : 1 }}
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-medium shadow-md
                  transition-all duration-300 ease-in-out
                  ${isComplete 
                    ? 'bg-gradient-to-br from-green-400 to-green-600 text-white' 
                    : isCurrent 
                      ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white ring-4 ring-indigo-100 dark:ring-indigo-900/30' 
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }
                `}
              >
                {isComplete ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  stepNum
                )}
              </motion.div>
              
              <span className={`
                mt-3 text-sm font-medium text-center max-w-xs px-2
                transition-all duration-300
                ${isCurrent 
                  ? 'text-indigo-600 dark:text-indigo-400' 
                  : isComplete 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-slate-500 dark:text-slate-400'
                }
              `}>
                {step.label}
              </span>
              
              {/* Indicador de paso actual */}
              {isCurrent && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />
                </motion.div>
              )}
            </div>
          );
        })}
      </div>

      {/* Barra de progreso mejorada */}
      <div className="mt-10 w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 h-full rounded-full"
        />
      </div>
    </div>
  );
}
