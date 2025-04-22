import { StepIndicator } from './StepIndicator';
import { WizardFooter } from './WizardFooter';
import { LoadingOverlay } from './LoadingOverlay';
import { useWizardLogic } from './useWizardLogic';
import Step2PersonalInfo from './Step2PersonalInfo';
import Step1TipoDocumento from './Step1TipoDocumento';
import Step3Entidad from './Step3Entidad';
import Step4Detalles from './Step4Detalles';

export default function WizardPage() {
  const totalSteps = 4;
  const {
    step,
    progress,
    isLoading,
    formData,
    handleChange,
    goToNextStep,
    goToPrevStep,
  } = useWizardLogic(totalSteps);

  const renderFormContent = () => {
    switch (step) {
      case 1:
        return <Step2PersonalInfo formData={formData} handleChange={handleChange} />;
      case 2:
        return <Step1TipoDocumento formData={formData} handleChange={handleChange} />;
      case 3:
        return <Step3Entidad formData={formData} handleChange={handleChange} />;
      case 4:
        return <Step4Detalles formData={formData} handleChange={handleChange} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm px-6 py-4">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="text-indigo-600 font-bold text-xl">LexaGen</div>
          <button
            onClick={() => window.location.href = '/'}
            className="text-gray-500 hover:text-indigo-600 font-medium text-sm flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Volver al inicio
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-5xl mx-auto py-8 px-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <StepIndicator currentStep={step} progress={progress} />
          <div className="mt-6">
            {renderFormContent()}
            {isLoading && <LoadingOverlay />}
            <WizardFooter
              step={step}
              totalSteps={totalSteps}
              goToNextStep={goToNextStep}
              goToPrevStep={goToPrevStep}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-auto py-4 px-6">
        <div className="max-w-5xl mx-auto text-sm text-gray-500 text-center">
          <p>© 2025 LexaGen - Todos los derechos reservados</p>
          <p className="mt-1">
            Tus datos no son almacenados permanentemente. LexaGen no es un sustituto del consejo legal profesional.
          </p>
        </div>
      </footer>
    </div>
  );
}
