import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import axios from 'axios';

const PROCESS_URL = 'https://us-central1-lexagen-e6d7f.cloudfunctions.net/processDocumentRequest';

interface BackendResponse {
  status: 'incomplete' | 'complete';
  questions?: { field: string; question: string }[];
  previewUrl?: string;
  downloadToken?: string;
}

export function useWizardLogic(totalSteps: number) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { formData, setFormData } = useForm();

  useEffect(() => {
    setProgress((step / totalSteps) * 100);
  }, [step, totalSteps]);

  const validateCurrentStep = () => {
    // Validación por paso si se requiere
    return true;
  };

  const goToNextStep = async () => {
    if (!validateCurrentStep()) return;

    if (step === totalSteps) {
      setIsLoading(true);
      try {
        const response = await axios.post<BackendResponse>(PROCESS_URL, { formData });
        const data = response.data;

        console.log('[DEBUG] Respuesta del backend:', data);

        if (data.status === 'incomplete') {
          if (Array.isArray(data.questions) && data.questions.length > 0) {
            navigate('/complete-info', { state: { questions: data.questions } });
          } else {
            console.warn('[WARN] Status "incomplete" pero sin preguntas válidas.');
            alert('Faltan detalles pero no se generaron preguntas. Intenta nuevamente.');
          }
          return;
        }

        if (data.status === 'complete') {
          if (!data.previewUrl || !data.downloadToken) {
            console.error('[ERROR] Faltan datos críticos en la respuesta:', data);
            alert('No se recibió información de descarga válida. Intenta nuevamente.');
            return;
          }

          sessionStorage.setItem('lexagenPreviewUrl', data.previewUrl);
          sessionStorage.setItem('lexagenDownloadToken', data.downloadToken);
          navigate('/payment', {
            state: {
              previewUrl: data.previewUrl,
              token: data.downloadToken
            }
          });
          return;
        }

        console.warn('[WARN] Respuesta no reconocida del servidor:', data);
        alert('Respuesta inesperada del servidor. Intenta más tarde.');
      } catch (error) {
        console.error('❌ Error al generar el documento:', error);
        alert('Ocurrió un error al generar el documento. Intenta nuevamente.');
      } finally {
        setIsLoading(false);
      }
    } else {
      setStep((prev) => prev + 1);
    }
  };

  const goToPrevStep = () => setStep((prev) => prev - 1);

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return {
    step,
    progress,
    isLoading,
    formData,
    handleChange,
    goToNextStep,
    goToPrevStep
  };
}
