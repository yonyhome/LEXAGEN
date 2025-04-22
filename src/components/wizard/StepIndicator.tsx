interface StepIndicatorProps {
    currentStep: number;
    progress: number;
  }
  
  export function StepIndicator({ currentStep,  progress }: StepIndicatorProps) {
    const stepLabels = ['Datos personales', 'Tipo documento', 'Entidad', 'Detalles'];
    
    return (
      <div className="mb-8">
        <div className="flex justify-between">
          {stepLabels.map((label, idx) => {
            const stepNum = idx + 1;
            const isComplete = stepNum < currentStep;
            const isCurrent = stepNum === currentStep;
  
            return (
              <div key={stepNum} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                  isComplete ? 'bg-green-500 text-white' :
                  isCurrent ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {isComplete ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    stepNum
                  )}
                </div>
                <span className={`text-xs mt-2 hidden md:block ${isCurrent ? 'text-indigo-600 font-medium' : 'text-gray-500'}`}>
                  {label}
                </span>
              </div>
            );
          })}
        </div>
  
        <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
          <div className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
        </div>
      </div>
    );
  }
  