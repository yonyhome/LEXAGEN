// src/hooks/useWizard.ts
import { useState } from 'react';

/**
 * Hook de navegación pura para el wizard.
 * @param totalSteps Número total de pasos en el wizard
 */
export function useWizard(totalSteps: number) {
  const [stepIndex, setStepIndex] = useState(0);

  const next = () => {
    setStepIndex((prev) => Math.min(prev + 1, totalSteps - 1));
  };

  const back = () => {
    setStepIndex((prev) => Math.max(prev - 1, 0));
  };

  return {
    stepIndex,
    next,
    back,
  };
}
