import React, { useContext, useEffect, useRef, useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { FormContext } from '../context/FormContext';
import  ModernLoadingOverlay  from '../components/layout/LoadingOverlay';
import { motion } from 'framer-motion';
import { 
  ExclamationCircleIcon,
  PencilSquareIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  QuestionMarkCircleIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

export interface Question {
  field: string;
  question: string;
  placeholder?: string;
}

interface Props {
  questions: Question[];
  onSubmit: (updatedDetails: string) => void;
}

const CompleteInfoPage: React.FC<Props> = ({ questions, onSubmit }) => {
  const { formData, setFormData } = useContext(FormContext);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [currentQuestionIndex]);

  const handleChange = (field: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  const goToNextQuestion = () => {
    const currentField = `${questions[currentQuestionIndex].field}-${currentQuestionIndex}`;
    
    if (!answers[currentField]?.trim()) {
      setError('Por favor responde esta pregunta antes de continuar.');
      return;
    }
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      completeAllQuestions();
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  // Dentro de CompleteInfoPage.tsx
  const completeAllQuestions = () => {
    setIsLoading(true);

    setTimeout(() => {
      // Construimos el contexto enriquecido con pregunta + respuesta
      const enrichedContext = questions
        .map((q, idx) => {
          const key = `${q.field}-${idx}`;
          const answer = answers[key]?.trim() || '';
          return `\n\n**contexto:** ${q.question}\n**Respuesta:** ${answer}`;
        })
        .join('');

      // Concatenamos al detalle original
      const updatedDetails = formData.detalles + enrichedContext;

      // Actualizamos el contexto global
      setFormData({ ...formData, detalles: updatedDetails });
      setIsComplete(true);
      setIsLoading(false);

      // Pequeña pausa para mostrar animación antes de continuar
      setTimeout(() => {
        onSubmit(updatedDetails);
      }, 1000);
    }, 1500);
  };


  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const currentQuestion = questions[currentQuestionIndex];
  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
  
  if (!questions || questions.length === 0) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex flex-col">
      <Header />

      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-12">
        {/* Tarjeta Principal */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Cabecera */}
          <div className="bg-indigo-600 p-6 flex items-start">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white">Completar información</h1>
              <p className="text-indigo-200 mt-1">
                Necesitamos algunos detalles adicionales para tu {formData.tipoDocumento?.replace('-', ' ')}
              </p>
            </div>
            <DocumentTextIcon className="h-10 w-10 text-indigo-300" />
          </div>

          {/* Barra de Progreso */}
          <div className="relative h-1 bg-gray-200">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-green-500"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Indicador numérico de progreso */}
          <div className="bg-gray-50 py-2 px-6 flex justify-between text-sm text-gray-500 border-b border-gray-200">
            <span>Pregunta {currentQuestionIndex + 1} de {questions.length}</span>
            <span>{Math.round(progressPercentage)}% completado</span>
          </div>

          {/* Contenido Principal */}
          <div className="p-6">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex items-start mb-4">
                <QuestionMarkCircleIcon className="h-6 w-6 text-indigo-500 mr-2 mt-1 flex-shrink-0" />
                <h2 className="text-xl font-medium text-gray-800">{currentQuestion.question}</h2>
              </div>

              <div className="relative">
                <div className="flex items-center absolute left-3 top-3">
                  <PencilSquareIcon className="h-5 w-5 text-gray-400" />
                </div>
                <textarea
                  ref={inputRef}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none min-h-[120px]"
                  placeholder={currentQuestion.placeholder || 'Escribe tu respuesta detallada aquí...'}
                  value={answers[`${currentQuestion.field}-${currentQuestionIndex}`] || ''}
                  onChange={(e) => handleChange(`${currentQuestion.field}-${currentQuestionIndex}`, e.target.value)}
                />
              </div>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center text-red-600 mt-2"
                >
                  <ExclamationCircleIcon className="h-5 w-5 mr-1" />
                  <p className="text-sm">{error}</p>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Pie y Controles */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
            <button
              onClick={goToPreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                currentQuestionIndex === 0 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              <ArrowLeftIcon className="h-4 w-4 mr-1" />
              Anterior
            </button>
            
            <button
              onClick={goToNextQuestion}
              className="flex items-center px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium shadow transition-colors"
            >
              {isLastQuestion ? 'Finalizar' : 'Siguiente'}
              <ArrowRightIcon className="h-4 w-4 ml-1" />
            </button>
          </div>
        </motion.div>

      </main>

      <Footer />

      {/* Overlay de carga */}
      {isLoading && <ModernLoadingOverlay />}
      
      {/* Animación de completado */}
      {isComplete && <ModernLoadingOverlay />}
    </div>
  );
};

export default CompleteInfoPage;