import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDownIcon,
  ClockIcon,
  CogIcon,
  CurrencyDollarIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

interface Question {
  question: string;
  answer: string;
}

interface FAQCategory {
  title: string;
  icon: React.ReactElement;
  color: string;
  questions: Question[];
}

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const faqCategories: FAQCategory[] = [
    {
      title: "Uso de la Plataforma",
      icon: <CogIcon className="w-5 h-5" />,
      color: "indigo",
      questions: [
        {
          question: "¿Cómo empiezo a generar un documento?",
          answer: "Simplemente haz clic en 'Comenzar ahora', selecciona el tipo de documento que necesitas y sigue las preguntas paso a paso. El proceso es completamente guiado y no necesitas conocimientos legales previos."
        },
        {
          question: "¿Puedo guardar mi progreso y continuar después?",
          answer: "Por seguridad y privacidad, trabajamos con sesiones temporales. Te recomendamos completar el proceso en una sola sesión (toma solo 10-15 minutos). Si cierras el navegador, deberás empezar de nuevo."
        },
        {
          question: "¿Qué navegadores son compatibles?",
          answer: "LexaGen funciona en todos los navegadores modernos: Chrome, Firefox, Safari, Edge. Recomendamos mantener tu navegador actualizado para la mejor experiencia."
        },
        {
          question: "¿Funciona en móviles y tablets?",
          answer: "Sí, nuestra plataforma está completamente optimizada para dispositivos móviles y tablets. Puedes generar documentos desde cualquier dispositivo con conexión a internet."
        }
      ]
    },
    {
      title: "Documentos y Personalización",
      icon: <DocumentTextIcon className="w-5 h-5" />,
      color: "blue",
      questions: [
        {
          question: "¿Los documentos se adaptan a mi caso específico?",
          answer: "Sí, cada documento se personaliza completamente basándose en las respuestas que proporcionas. La IA adapta el lenguaje y contenido jurídico a tu situación particular."
        },
        {
          question: "¿Puedo revisar el documento antes de pagarlo?",
          answer: "Te mostramos una vista previa del documento antes del pago para que puedas revisar que toda la información esté correcta. Una vez satisfecho, procedes al pago y descarga."
        },
        {
          question: "¿En qué formatos recibo el documento?",
          answer: "Recibes tu documento en dos formatos: PDF (listo para imprimir y presentar) y DOCX (por si necesitas hacer alguna edición menor)."
        },
        {
          question: "¿El documento incluye instrucciones de presentación?",
          answer: "Sí, junto con tu documento recibes una guía clara sobre cómo y dónde presentarlo, qué documentos adicionales podrías necesitar y los pasos a seguir."
        }
      ]
    },
    {
      title: "Procesos y Tiempos",
      icon: <ClockIcon className="w-5 h-5" />,
      color: "green",
      questions: [
        {
          question: "¿Cuánto tiempo toma generar un documento?",
          answer: "El proceso completo toma entre 10-15 minutos. Esto incluye responder las preguntas, que la IA procese y optimice el contenido, y la descarga final."
        },
        {
          question: "¿En cuánto tiempo debo recibir respuesta oficial?",
          answer: "Los tiempos legales son: Derecho de Petición (15 días hábiles), Tutela (10 días máximo), PQRS (15-30 días según el tipo). Te incluimos esta información en tu documento."
        },
        {
          question: "¿Qué hago si no recibo respuesta en el tiempo establecido?",
          answer: "Te proporcionamos una guía de seguimiento que explica qué hacer si no recibes respuesta oportuna, incluyendo cómo presentar derechos de petición por silencio administrativo."
        },
        {
          question: "¿Ofrecen seguimiento del proceso?",
          answer: "Incluimos guías detalladas sobre cómo hacer seguimiento por tu cuenta. Para casos complejos, recomendamos consultar con un abogado."
        }
      ]
    },
    {
      title: "Pagos y Precios",
      icon: <CurrencyDollarIcon className="w-5 h-5" />,
      color: "emerald",
      questions: [
        {
          question: "¿Cuáles son los precios de los documentos?",
          answer: "Tenemos precios transparentes: Documento básico $15.000, Premium con revisión adicional $25.000. Los precios se muestran claramente antes del pago."
        },
        {
          question: "¿Qué métodos de pago aceptan?",
          answer: "Aceptamos tarjetas de crédito y débito (Visa, Mastercard), PSE, Nequi y otros métodos digitales populares en Colombia."
        },
        {
          question: "¿Hay costos adicionales ocultos?",
          answer: "No, el precio que ves es el precio final. No hay suscripciones, comisiones ocultas ni costos adicionales de ningún tipo."
        },
        {
          question: "¿Ofrecen reembolsos?",
          answer: "Sí, si no estás satisfecho con el documento, ofrecemos reembolso completo dentro de las primeras 24 horas de la compra."
        }
      ]
    }
  ];

  const getColorClasses = (color: string): string => {
    const colors: Record<string, string> = {
      indigo: "text-indigo-600 bg-indigo-50 border-indigo-200",
      blue: "text-blue-600 bg-blue-50 border-blue-200",
      green: "text-green-600 bg-green-50 border-green-200",
      emerald: "text-emerald-600 bg-emerald-50 border-emerald-200"
    };
    return colors[color];
  };

  const toggleQuestion = (categoryIndex: number, questionIndex: number): void => {
    const index = `${categoryIndex}-${questionIndex}`;
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Preguntas <span className="text-indigo-600">frecuentes</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Resuelve tus dudas sobre cómo usar la plataforma y el proceso de generación de documentos
        </p>
      </motion.div>

      <div className="space-y-8">
        {faqCategories.map((category, categoryIndex) => (
          <motion.div
            key={categoryIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.1 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
          >
            {/* Category Header */}
            <div className={`px-6 py-4 border-b border-gray-100 ${getColorClasses(category.color)}`}>
              <div className="flex items-center gap-3">
                {category.icon}
                <h3 className="text-lg font-semibold">{category.title}</h3>
              </div>
            </div>

            {/* Questions */}
            <div className="divide-y divide-gray-100">
              {category.questions.map((faq, questionIndex) => {
                const isOpen = openIndex === `${categoryIndex}-${questionIndex}`;
                
                return (
                  <div key={questionIndex}>
                    <motion.button
                      onClick={() => toggleQuestion(categoryIndex, questionIndex)}
                      className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                      whileHover={{ backgroundColor: "rgba(249, 250, 251, 1)" }}
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-gray-800 font-medium pr-4">
                          {faq.question}
                        </h4>
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDownIcon className="w-5 h-5 text-gray-500 flex-shrink-0" />
                        </motion.div>
                      </div>
                    </motion.button>
                    
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-4">
                            <p className="text-gray-600 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Legal Pages Reference */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-12"
      >
        <div className="bg-gray-50 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-4">¿Necesitas más información?</h3>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Para información detallada sobre privacidad, términos legales o políticas, consulta nuestras páginas especializadas
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-indigo-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              📋 Términos de Uso
            </motion.button>
            <motion.button
              className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-green-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🛡️ Política de Privacidad
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Contact Support */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8 text-center"
      >
        <div className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">¿No encontraste tu respuesta?</h3>
          <p className="text-indigo-100 mb-6 max-w-xl mx-auto">
            Nuestro equipo de soporte está listo para ayudarte con cualquier duda específica sobre el uso de la plataforma
          </p>
          <motion.button
            className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            💬 Contactar soporte
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default FAQ;