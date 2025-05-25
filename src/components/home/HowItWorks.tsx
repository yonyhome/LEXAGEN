import React from 'react';
import { motion } from 'framer-motion';
import { 
  ClipboardDocumentListIcon,
  SparklesIcon,
  DocumentArrowDownIcon,
  PaperAirplaneIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: 1,
      title: "Selecciona tu documento",
      description: "Elige el tipo de documento que necesitas: Derecho de Petición, Tutela o PQRS",
      icon: <ClipboardDocumentListIcon className="w-8 h-8" />,
      bgColor: "bg-blue-500",
      lightBg: "bg-blue-50",
      textColor: "text-blue-600",
      borderColor: "border-blue-200",
      details: [
        "Explora las opciones disponibles",
        "Lee cuándo usar cada documento",
        "Elige según tu situación específica"
      ]
    },
    {
      number: 2,
      title: "Responde las preguntas",
      description: "Te guiamos paso a paso con preguntas sencillas en lenguaje claro",
      icon: <ClipboardDocumentListIcon className="w-8 h-8" />,
      bgColor: "bg-green-500",
      lightBg: "bg-green-50",
      textColor: "text-green-600",
      borderColor: "border-green-200",
      details: [
        "Preguntas en lenguaje sencillo",
        "Ayuda contextual en cada paso",
        "Sin conocimientos legales requeridos"
      ]
    },
    {
      number: 3,
      title: "IA optimiza tu documento",
      description: "Nuestra inteligencia artificial revisa y optimiza el contenido jurídico",
      icon: <SparklesIcon className="w-8 h-8" />,
      bgColor: "bg-purple-500",
      lightBg: "bg-purple-50",
      textColor: "text-purple-600",
      borderColor: "border-purple-200",
      details: [
        "Revisión automática de contenido",
        "Optimización jurídica con GPT-4",
        "Formato profesional garantizado"
      ]
    },
    {
      number: 4,
      title: "Vista previa del documento",
      description: "Revisa tu documento completo antes de proceder con la descarga",
      icon: <DocumentArrowDownIcon className="w-8 h-8" />,
      bgColor: "bg-indigo-500",
      lightBg: "bg-indigo-50",
      textColor: "text-indigo-600",
      borderColor: "border-indigo-200",
      details: [
        "Vista previa del documento completo",
        "Verifica que toda la información esté correcta",
        "Formato profesional listo para presentar"
      ]
    },
    {
      number: 5,
      title: "Pagar y descargar",
      description: "Elige tu opción de descarga, realiza el pago y obtén tus archivos",
      icon: <CurrencyDollarIcon className="w-8 h-8" />,
      bgColor: "bg-emerald-500",
      lightBg: "bg-emerald-50",
      textColor: "text-emerald-600",
      borderColor: "border-emerald-200",
      details: [
        "Opción 1: Solo PDF ($10.000)",
        "Opción 2: PDF + Word ($15.000)",
        "Descarga inmediata tras el pago"
      ]
    }
  ];

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            ¿Cómo <span className="text-indigo-600">funciona?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Un proceso simple y guiado que te lleva desde cero hasta tener tu documento legal profesional en minutos
          </p>
        </motion.div>

        {/* Timeline for desktop */}
        <div className="hidden lg:block relative mb-20">
          {/* Connection line */}
          <div className="absolute top-32 left-0 w-full h-0.5 bg-gradient-to-r from-blue-200 via-green-200 via-purple-200 via-indigo-200 to-emerald-200"></div>
          
          <div className="grid grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                {/* Step circle */}
                <div className={`relative z-10 w-16 h-16 ${step.bgColor} rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-6 shadow-lg`}>
                  {step.number}
                </div>
                
                {/* Content card */}
                <motion.div
                  className={`bg-white rounded-xl shadow-lg border-2 ${step.borderColor} p-6 h-full`}
                  whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`${step.lightBg} rounded-lg p-3 w-fit mx-auto mb-4`}>
                    <div className={step.textColor}>
                      {step.icon}
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-gray-800 text-lg mb-3 text-center">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm text-center mb-4">
                    {step.description}
                  </p>
                  
                  <ul className="space-y-2">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="text-xs text-gray-500 flex items-center">
                        <div className={`w-1.5 h-1.5 rounded-full ${step.bgColor} mr-2 flex-shrink-0`}></div>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile/tablet version */}
        <div className="lg:hidden space-y-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <div className="flex items-start gap-6">
                {/* Step circle */}
                <div className={`w-12 h-12 ${step.bgColor} rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-lg`}>
                  {step.number}
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <div className={`bg-white rounded-xl shadow-lg border-2 ${step.borderColor} p-6`}>
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`${step.lightBg} rounded-lg p-3`}>
                        <div className={step.textColor}>
                          {step.icon}
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800 text-lg mb-2">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">
                          {step.description}
                        </p>
                      </div>
                    </div>
                    
                    <ul className="space-y-2 ml-16">
                      {step.details.map((detail, idx) => (
                        <li key={idx} className="text-sm text-gray-500 flex items-center">
                          <div className={`w-1.5 h-1.5 rounded-full ${step.bgColor} mr-3 flex-shrink-0`}></div>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Connection line */}
              {index < steps.length - 1 && (
                <div className="w-0.5 h-8 bg-gray-200 ml-6 mt-4"></div>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <motion.button
            className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-8 py-3 rounded-xl font-semibold shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <PaperAirplaneIcon className="w-5 h-5 inline mr-2" />
            Comenzar ahora
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default HowItWorks;