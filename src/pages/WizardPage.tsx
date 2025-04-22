import { StepIndicator } from '../components/wizard/StepIndicator';
import { WizardFooter } from '../components/wizard/WizardFooter';
import { LoadingOverlay } from '../components/wizard/LoadingOverlay';
import { useWizardLogic } from '../components/wizard/useWizardLogic';
import Step2PersonalInfo from '../components/wizard/Step2PersonalInfo';
import Step1TipoDocumento from '../components/wizard/Step1TipoDocumento';
import Step3Entidad from '../components/wizard/Step3Entidad';
import Step4Detalles from '../components/wizard/Step4Detalles';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

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
        return <Step1TipoDocumento formData={formData} handleChange={handleChange} />;
      case 2:
        return <Step2PersonalInfo formData={formData} handleChange={handleChange} />;
      case 3:
        return <Step3Entidad formData={formData} handleChange={handleChange} />;
      case 4:
        return <Step4Detalles formData={formData} handleChange={handleChange} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <Header />

      {/* Main */}
      <main className="flex-grow max-w-5xl mx-auto py-8 px-6 w-full">
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
      <Footer />
    </div>
  );
}
