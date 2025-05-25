import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DocumentTextIcon, 
  ShieldCheckIcon, 
  ClockIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

interface DocumentData {
  id: string;
  title: string;
  icon: React.ReactElement;
  color: string;
  description: string;
  when: string[];
  requirements: string[];
  timeframe: string;
  examples: string[];
  tips: string[];
}

interface ColorClasses {
  bg: string;
  border: string;
  text: string;
  icon: string;
  button: string;
}

const DocumentInfo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const documents: DocumentData[] = [
    {
      id: 'derecho-peticion',
      title: 'Derecho de Petición',
      icon: <DocumentTextIcon className="w-6 h-6" />,
      color: 'blue',
      description: 'Mecanismo constitucional para solicitar información o acciones a entidades públicas o privadas',
      when: [
        'Solicitar información de entidades públicas',
        'Pedir certificados o documentos',
        'Consultar el estado de un trámite',
        'Solicitar servicios públicos',
        'Pedir explicaciones sobre decisiones que te afectan'
      ],
      requirements: [
        'Identificación completa del solicitante',
        'Descripción clara de lo solicitado',
        'Dirección para recibir respuesta',
        'Fundamentación (opcional pero recomendada)'
      ],
      timeframe: '15 días hábiles para respuesta',
      examples: [
        'Solicitar copia del contrato de servicios públicos',
        'Pedir información sobre un proceso de contratación',
        'Consultar sobre requisitos para un trámite específico'
      ],
      tips: [
        'Sé específico en tu solicitud',
        'Incluye toda la información de contacto',
        'Guarda copia del documento enviado',
        'Haz seguimiento si no recibes respuesta'
      ]
    },
    {
      id: 'tutela',
      title: 'Tutela',
      icon: <ShieldCheckIcon className="w-6 h-6" />,
      color: 'red',
      description: 'Acción constitucional para proteger derechos fundamentales cuando están siendo vulnerados',
      when: [
        'Violación de derechos fundamentales',
        'Amenaza inminente a tus derechos',
        'No hay otro mecanismo de defensa eficaz',
        'Necesitas protección urgente',
        'Entidades públicas o privadas vulneran tus derechos'
      ],
      requirements: [
        'Identificación del derecho vulnerado',
        'Descripción de los hechos',
        'Identificación del responsable',
        'Solicitud específica de protección',
        'Que no exista otro medio de defensa judicial'
      ],
      timeframe: '10 días para fallo en primera instancia',
      examples: [
        'Negación de servicios de salud urgentes',
        'Discriminación laboral o educativa',
        'Violación del debido proceso',
        'Restricción de libertad de expresión'
      ],
      tips: [
        'Documenta la vulneración del derecho',
        'Identifica claramente al responsable',
        'Explica por qué es urgente',
        'Solicita medidas específicas'
      ]
    },
    {
      id: 'pqrs',
      title: 'PQRS',
      icon: <DocumentTextIcon className="w-6 h-6" />,
      color: 'green',
      description: 'Sistema para presentar Peticiones, Quejas, Reclamos y Sugerencias ante cualquier entidad',
      when: [
        'Presentar una queja por mal servicio',
        'Hacer un reclamo por productos defectuosos',
        'Sugerir mejoras en servicios',
        'Presentar una petición específica',
        'Reportar irregularidades'
      ],
      requirements: [
        'Datos del peticionario',
        'Descripción del motivo',
        'Hechos o situación específica',
        'Solicitud o sugerencia clara'
      ],
      timeframe: '15-30 días según el tipo',
      examples: [
        'Queja por demora en atención médica',
        'Reclamo por facturación incorrecta',
        'Sugerencia para mejorar un trámite',
        'Petición de nuevo servicio en el barrio'
      ],
      tips: [
        'Clasifica correctamente tu solicitud',
        'Adjunta evidencias si las tienes',
        'Sé constructivo en las sugerencias',
        'Da seguimiento a tu solicitud'
      ]
    }
  ];

  const getColorClasses = (color: string): ColorClasses => {
    const colors: Record<string, ColorClasses> = {
      blue: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        text: 'text-blue-800',
        icon: 'text-blue-600',
        button: 'bg-blue-600 hover:bg-blue-700'
      },
      red: {
        bg: 'bg-red-50',
        border: 'border-red-200',
        text: 'text-red-800',
        icon: 'text-red-600',
        button: 'bg-red-600 hover:bg-red-700'
      },
      green: {
        bg: 'bg-green-50',
        border: 'border-green-200',
        text: 'text-green-800',
        icon: 'text-green-600',
        button: 'bg-green-600 hover:bg-green-700'
      }
    };
    return colors[color];
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Conoce tus <span className="text-indigo-600">documentos legales</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprende cuándo y cómo usar cada tipo de documento para defender tus derechos efectivamente
        </p>
      </motion.div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center mb-8 gap-2">
        {documents.map((doc, index) => {
          const colors = getColorClasses(doc.color);
          return (
            <motion.button
              key={doc.id}
              onClick={() => setActiveTab(index)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === index
                  ? `${colors.button} text-white shadow-lg`
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {doc.icon}
              {doc.title}
            </motion.button>
          );
        })}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
        >
          {(() => {
            const doc = documents[activeTab];
            const colors = getColorClasses(doc.color);
            
            return (
              <>
                {/* Header */}
                <div className={`${colors.bg} ${colors.border} border-b px-8 py-6`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`${colors.icon} p-3 bg-white rounded-xl shadow-sm`}>
                      {doc.icon}
                    </div>
                    <div>
                      <h3 className={`text-2xl font-bold ${colors.text}`}>{doc.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <ClockIcon className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{doc.timeframe}</span>
                      </div>
                    </div>
                  </div>
                  <p className={`text-lg ${colors.text} opacity-90`}>{doc.description}</p>
                </div>

                {/* Content Grid */}
                <div className="p-8 grid md:grid-cols-2 gap-8">
                  {/* Cuándo usar */}
                  <div>
                    <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
                      <InformationCircleIcon className="w-5 h-5 text-indigo-600" />
                      ¿Cuándo usar este documento?
                    </h4>
                    <ul className="space-y-2">
                      {doc.when.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircleIcon className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Requisitos */}
                  <div>
                    <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
                      <ExclamationTriangleIcon className="w-5 h-5 text-orange-500" />
                      Requisitos necesarios
                    </h4>
                    <ul className="space-y-2">
                      {doc.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-600">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Ejemplos */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">
                      💡 Ejemplos comunes
                    </h4>
                    <div className="space-y-3">
                      {doc.examples.map((example, idx) => (
                        <div key={idx} className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-gray-700 text-sm">{example}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tips */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">
                      🎯 Consejos útiles
                    </h4>
                    <ul className="space-y-2">
                      {doc.tips.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-indigo-500 font-bold">•</span>
                          <span className="text-gray-600 text-sm">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTA */}
                <div className={`${colors.bg} px-8 py-6 border-t ${colors.border}`}>
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <p className={`font-medium ${colors.text}`}>
                        ¿Necesitas generar este documento?
                      </p>
                      <p className="text-sm text-gray-600">
                        Te guiamos paso a paso en el proceso
                      </p>
                    </div>
                    <motion.button
                      className={`${colors.button} text-white px-6 py-3 rounded-xl font-medium shadow-lg`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Generar {doc.title}
                    </motion.button>
                  </div>
                </div>
              </>
            );
          })()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default DocumentInfo;