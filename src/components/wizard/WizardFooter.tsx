interface WizardFooterProps {
    step: number;
    totalSteps: number;
    goToNextStep: () => void;
    goToPrevStep: () => void;
  }
  
  export function WizardFooter({ step, totalSteps, goToNextStep, goToPrevStep }: WizardFooterProps) {
    return (
      <div className="flex justify-between mt-8">
        {step > 1 ? (
          <button onClick={goToPrevStep} className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Anterior
          </button>
        ) : (
          <div></div>
        )}
  
        <button onClick={goToNextStep} className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center">
          {step === totalSteps ? 'Generar documento' : 'Siguiente'}
          {step !== totalSteps && (
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          )}
        </button>
      </div>
    );
  }
  