// src/components/wizard/steps/Step4Detalles.tsx
import { useState, useEffect, useRef } from 'react';
import { StepComponentProps } from '../stepConfig';
import { motion } from 'framer-motion';
import { LightBulbIcon, PencilIcon } from '@heroicons/react/24/outline';

export default function Step4Detalles({
  formData,
  handleChange,
}: StepComponentProps) {
  const [error, setError] = useState<string>('');
  const [touched, setTouched] = useState<boolean>(false);
  const [charCount, setCharCount] = useState<number>(0);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Validación: mínimo 50 caracteres
  useEffect(() => {
    const content = formData.detalles?.trim() || '';
    const len = content.length;
    setCharCount(len);
    
    if (len === 0) {
      setError('Este campo es obligatorio.');
    } else if (len < 50) {
      setError(`Por favor ingresa al menos 50 caracteres (faltan ${50 - len}).`);
    } else {
      setError('');
    }
  }, [formData.detalles]);

  const recomendaciones: Record<string, {
    icon: string,
    items: string[]
  }> = {
    'Derecho de Petición': {
      icon: '📝',
      items: [
        'Sé específico sobre la información o acción que solicitas',
        'Menciona fechas y referencias de comunicaciones previas (si existen)',
        'Explica por qué necesitas lo que estás solicitando',
        'Indica el plazo en el que esperas respuesta (usualmente 15 días hábiles)',
      ]
    },
    'Tutela': {
      icon: '⚖️',
      items: [
        'Describe claramente cuál derecho fundamental está siendo vulnerado',
        'Detalla cuándo y cómo ocurrió la vulneración',
        'Menciona las gestiones previas que has realizado',
        'Explica por qué necesitas protección urgente',
      ]
    },
    'PQRS': {
      icon: '📋',
      items: [
        'Describe de manera objetiva la situación',
        'Incluye detalles como fechas, lugares y personas involucradas',
        'Especifica qué solución o respuesta esperas',
        'Adjunta referencias de facturas, contratos u otros documentos (si aplica)',
      ]
    },
  };

  const docType = formData.tipoDocumento as keyof typeof recomendaciones;
  const recs = recomendaciones[docType]?.items || [];
  const icon = recomendaciones[docType]?.icon || '📄';

  const focusTextarea = () => {
    textareaRef.current?.focus();
  };

  // Calcular el color de la barra de progreso
  const getProgressColor = () => {
    if (charCount < 50) return 'bg-red-400';
    if (charCount < 100) return 'bg-yellow-400';
    if (charCount < 200) return 'bg-green-400';
    return 'bg-emerald-400';
  };

  // Calcular el porcentaje de progreso (máximo 100%)
  const getProgress = () => {
    return Math.min((charCount / 300) * 100, 100);
  };

  // Variantes de animación
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const suggestionItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.div
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="space-y-2">
        <motion.div 
          className="flex items-center" 
          variants={itemVariants}
        >
          <span className="mr-2 text-2xl">{icon}</span>
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">
            Detalles de tu {docType || 'Solicitud'}
          </h2>
        </motion.div>
        <motion.p 
          className="text-sm text-gray-500"
          variants={itemVariants}
        >
          Explica de manera clara y concisa qué estás solicitando
        </motion.p>
      </div>

      {recs.length > 0 && (
        <motion.div
          className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 rounded-xl p-5 shadow-sm"
          variants={itemVariants}
        >
          <div className="flex items-start">
            <LightBulbIcon className="w-6 h-6 text-purple-500 flex-shrink-0" />
            <div className="ml-3 flex-1">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium text-purple-700">
                  Recomendaciones para tu {docType}
                </h3>
                <button 
                  className="text-xs text-purple-500 hover:text-purple-700 transition-colors"
                  onClick={() => setShowSuggestions(!showSuggestions)}
                >
                  {showSuggestions ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>
              
              {showSuggestions && (
                <motion.ul 
                  className="space-y-2 text-gray-600 text-sm"
                  initial="hidden"
                  animate="visible"
                  variants={containerVariants}
                >
                  {recs.map((rec, idx) => (
                    <motion.li 
                      key={idx} 
                      className="flex items-start"
                      variants={suggestionItemVariants}
                    >
                      <span className="inline-block h-5 w-5 rounded-full bg-purple-100 text-purple-500 text-xs flex items-center justify-center mr-2 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{rec}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </div>
          </div>
        </motion.div>
      )}

      <motion.div variants={itemVariants}>
        <div className="flex justify-between items-center mb-1.5">
          <label
            htmlFor="detalles"
            className="block text-sm font-medium text-gray-700 flex items-center"
          >
            <PencilIcon className="w-4 h-4 mr-1" />
            Detalles de tu solicitud <span className="text-purple-500 ml-1">*</span>
          </label>
          <div className="text-xs font-medium">
            <span className={charCount < 50 ? 'text-red-500' : 'text-green-500'}>
              {charCount}
            </span>
            <span className="text-gray-400">/1000 caracteres</span>
          </div>
        </div>
        
        <div className="relative">
          <textarea
            ref={textareaRef}
            id="detalles"
            className={`border-2 rounded-lg w-full px-4 py-3 h-48 focus:outline-none transition-colors duration-200 ${
              touched
                ? error
                  ? 'border-red-400 focus:ring-2 focus:ring-red-200'
                  : 'border-purple-300 focus:border-purple-400 focus:ring-2 focus:ring-purple-100'
                : 'border-gray-200 hover:border-purple-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100'
            }`}
            placeholder="Explica tu caso con el mayor detalle posible..."
            value={formData.detalles || ''}
            onChange={(e) => handleChange('detalles', e.target.value)}
            onBlur={() => setTouched(true)}
          />
          
          {charCount === 0 && !touched && (
            <motion.button
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full shadow-md transition-all duration-200 flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={focusTextarea}
            >
              <PencilIcon className="w-4 h-4 mr-2" />
              Comienza a escribir aquí
            </motion.button>
          )}
        </div>
        
        <div className="mt-2">
          <div className="bg-gray-200 h-1.5 rounded-full overflow-hidden">
            <motion.div 
              className={`h-full ${getProgressColor()}`}
              initial={{ width: 0 }}
              animate={{ width: `${getProgress()}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Mínimo: 50 caracteres</span>
            <span>Recomendado: 300+ caracteres</span>
          </div>
        </div>

        {touched && error && (
          <motion.p 
            className="text-red-600 text-sm mt-2 font-medium flex items-center"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.2 }}
          >
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </motion.p>
        )}
      </motion.div>

      <motion.div 
        className="mt-8"
        variants={itemVariants}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {charCount >= 50 && !error && (
          <motion.div 
            className="flex items-center justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center text-emerald-500 bg-emerald-50 px-4 py-2 rounded-full">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Excelente descripción</span>
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}