// src/components/wizard/WizardFooter.tsx
import { motion } from 'framer-motion';

interface WizardFooterProps {
  step: number;
  totalSteps: number;
  onNext(): void;
  onBack(): void;
  canProceed: boolean;
}

export function WizardFooter({
  step, totalSteps, onNext, onBack, canProceed
}: WizardFooterProps) {
  const isLastStep = step === totalSteps;
  
  return (
    <div className="flex justify-between mt-10 pt-6 border-t border-slate-200 dark:border-slate-700">
      {step > 1 ? (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onBack}
          className="flex items-center px-6 py-2.5 rounded-lg text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-200 font-medium"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
          </svg>
          Anterior
        </motion.button>
      ) : (
        <div />
      )}
      
      <motion.button
        whileHover={canProceed ? { scale: 1.02 } : {}}
        whileTap={canProceed ? { scale: 0.98 } : {}}
        onClick={onNext}
        disabled={!canProceed}
        className={`
          px-6 py-2.5 rounded-lg font-medium flex items-center shadow-md
          transition-all duration-200
          ${canProceed
            ? isLastStep 
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white'
              : 'bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white'
            : 'bg-slate-400 dark:bg-slate-700 text-white opacity-50 cursor-not-allowed'
          }
        `}
      >
        {isLastStep ? (
          <>
            Generar documento
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </>
        ) : (
          <>
            Siguiente
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
            </svg>
          </>
        )}
      </motion.button>
    </div>
  );
}