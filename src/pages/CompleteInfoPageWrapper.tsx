import { useEffect, useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CompleteInfoPage, { Question } from './CompleteInfoPage';
import { FormContext } from '../context/FormContext';
import { processDocument } from '../services/apiService';

export default function CompleteInfoPageWrapper() {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData, setFormData } = useContext(FormContext);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const qs = location.state?.questions;

    if (Array.isArray(qs) && qs.length > 0) {
      setQuestions(qs);
    } else {
      console.warn('⚠️ No hay preguntas válidas. Redirigiendo a /payment...');
      navigate('/payment');
    }
  }, [location.state, navigate]);

  const handleSubmit = async (updatedDetails: string) => {
    const updatedData = { ...formData, detalles: updatedDetails };

    try {
      const result = await processDocument(updatedData);

      if (result.status === 'complete') {
        setFormData(updatedData);

        if (result.previewUrl && result.downloadToken) {
          navigate('/payment', {
            state: {
              previewUrl: result.previewUrl,
              token: result.downloadToken,
            },
          });
        } else {
          console.warn('⚠️ Datos incompletos en respuesta del backend. Redirigiendo a /wizard...');
          navigate('/wizard');
        }

      } else {
        alert('Aún faltan datos importantes. Intenta ser más específico.');
      }

    } catch (err) {
      console.error('❌ Error al procesar el documento:', err);
      alert('Error al procesar el documento. Inténtalo más tarde.');
    }
  };

  return questions.length > 0 ? (
    <CompleteInfoPage questions={questions} onSubmit={handleSubmit} />
  ) : null;
}
