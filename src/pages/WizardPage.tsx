// src/pages/WizardPage.tsx
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { StepIndicator } from '../components/wizard/StepIndicator';
import { WizardFooter } from '../components/wizard/WizardFooter';
import ModernLoadingOverlay from '../components/layout/LoadingOverlay';
import { steps } from '../components/wizard/stepConfig';
import { useWizard } from '../hooks/useWizard';
import { useWizardLogic } from '../hooks/useWizardLogic';
import { motion } from 'framer-motion';

export default function WizardPage() {
  const totalSteps = steps.length;
  const { stepIndex, next, back } = useWizard(totalSteps);
  const currentStep = stepIndex + 1;

  const {
    progress,
    isLoading,
    canProceed,
    handleNext,
    handleBack,
    handleChange,
    formData,
  } = useWizardLogic(totalSteps, currentStep, next, back);

  const { Component, label } = steps[stepIndex];

  // Variants for page animations
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <Header />

      {/* Main */}
      <main className="flex-grow max-w-5xl mx-auto py-12 px-6 w-full">
        <motion.div 
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="bg-white dark:bg-slate-800 shadow-xl rounded-2xl p-8 border border-slate-100 dark:border-slate-700"
        >
          <StepIndicator currentStep={currentStep} progress={progress} />

          {/* Título del paso con icono dinámico */}
          <div className="flex items-center mb-6">
            <div className="mr-3 p-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30">
              {steps[stepIndex].icon || (
                <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                  <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
                </svg>
              )}
            </div>
            <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
              Paso {currentStep} de {totalSteps}: <span className="text-indigo-600 dark:text-indigo-400">{label}</span>
            </h2>
          </div>

          {/* Card para el componente */}
          <motion.div 
            key={currentStep}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700"
          >
            {/* Renderiza el componente del paso */}
            <Component
              formData={formData}
              handleChange={handleChange}
              onNext={handleNext}
              onBack={handleBack}
            />
          </motion.div>

          {/* Overlay de carga */}
          {isLoading && <ModernLoadingOverlay />}

          {/* Navegación */}
          <WizardFooter
            step={currentStep}
            totalSteps={totalSteps}
            onNext={handleNext}
            onBack={handleBack}
            canProceed={canProceed}
          />
        </motion.div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}