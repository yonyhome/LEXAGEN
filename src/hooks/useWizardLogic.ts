// src/components/wizard/useWizardLogic.ts
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from './useForm';

interface BackendResponse {
  status: 'incomplete' | 'complete';
  questions?: { field: string; question: string }[];
  previewUrl?: string;
  downloadToken?: string;
}

const PROCESS_URL =
  'https://us-central1-lexagen-e6d7f.cloudfunctions.net/processDocumentRequest';

// Expresiones regulares para validación
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+?\d{7,14}$/;
const idRegex = /^\d{6,20}$/;

export function useWizardLogic(
  totalSteps: number,
  currentStep: number,
  onNext: () => void,
  onBack: () => void
) {
  const navigate = useNavigate();
  const { formData, setFormData } = useForm();

  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [canProceed, setCanProceed] = useState(false);

  // Actualiza la barra de progreso
  useEffect(() => {
    setProgress((currentStep / totalSteps) * 100);
  }, [currentStep, totalSteps]);

  // Validación específica por paso
  const validateCurrentStep = useCallback((): boolean => {
    switch (currentStep) {
      case 1:
        return !!formData.tipoDocumento && formData.tipoDocumento.trim().length > 0;

      case 2: {
        const nameOk = formData.nombre.trim().length > 0;
        const idOk = idRegex.test(formData.identificacion);
        const contact = formData.contacto.trim();
        const contactOk =
          emailRegex.test(contact) || phoneRegex.test(contact);
        return nameOk && idOk && contactOk;
      }
      case 3: {
        const entOk = formData.entidad.trim().length > 0;
        const cityOk = formData.ciudad.trim().length > 0;
        const cont = formData.contactoEntidad.trim();
        const contOk =
          cont === '' ||
          emailRegex.test(cont) ||
          phoneRegex.test(cont);
        return entOk && cityOk && contOk;
      }
      case 4:
        return (formData.detalles?.trim().length || 0) >= 50;
      default:
        return false;
    }
  }, [formData, currentStep]);

  // Habilita o deshabilita el avance
  useEffect(() => {
    setCanProceed(validateCurrentStep());
  }, [validateCurrentStep]);

  // Maneja el clic en "Siguiente" o "Generar documento"
  const handleNext = useCallback(async () => {
    if (!validateCurrentStep()) return;

    if (currentStep === totalSteps) {
      setIsLoading(true);
      try {
        const { data } = await axios.post<BackendResponse>(
          PROCESS_URL,
          { formData }
        );

        if (data.status === 'incomplete') {
          if (Array.isArray(data.questions) && data.questions.length) {
            navigate('/complete-info', {
              state: { questions: data.questions },
            });
          } else {
            alert(
              'Faltan detalles pero no se generaron preguntas. Intenta nuevamente.'
            );
          }
          return;
        }

        if (data.status === 'complete') {
          if (!data.previewUrl || !data.downloadToken) {
            alert(
              'No se recibió información de descarga válida. Intenta nuevamente.'
            );
            return;
          }
          sessionStorage.setItem('lexagenPreviewUrl', data.previewUrl);
          sessionStorage.setItem(
            'lexagenDownloadToken',
            data.downloadToken
          );
          navigate('/payment', {
            state: {
              previewUrl: data.previewUrl,
              token: data.downloadToken,
            },
          });
          return;
        }
      } catch (err) {
        console.error('❌ Error al generar el documento:', err);
        alert('Ocurrió un error al generar el documento. Intenta nuevamente.');
      } finally {
        setIsLoading(false);
      }
    } else {
      // Avanza al siguiente paso
      onNext();
    }
  }, [
    currentStep,
    totalSteps,
    formData,
    navigate,
    onNext,
    validateCurrentStep,
  ]);

  // Maneja el clic en "Anterior"
  const handleBack = useCallback(() => {
    onBack();
  }, [onBack]);

  // Actualiza el contexto de formulario
  const handleChange = useCallback(
    (field: string, value: string) => {
      setFormData({ ...formData, [field]: value });
    },
    [formData, setFormData]
  );

  return {
    progress,
    isLoading,
    canProceed,
    handleNext,
    handleBack,
    handleChange,
    formData,
  };
}
