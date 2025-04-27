// src/components/wizard/steps/Step1TipoDocumento.tsx
import { motion } from 'framer-motion';

interface Props {
  formData: any;
  handleChange: (field: string, value: string) => void;
}

// Definición de los tipos de documentos con sus respectivos iconos
const documentTypes = [
  {
    tipo: 'Derecho de Petición',
    descripcion:
      'Solicitud formal a entidades públicas o privadas para obtener información o solicitar acciones.',
    tiempo: '15 días hábiles',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
      </svg>
    )
  },
  {
    tipo: 'Tutela',
    descripcion:
      'Mecanismo para proteger derechos fundamentales cuando han sido vulnerados.',
    tiempo: '10 días hábiles',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"></path>
      </svg>
    )
  },
  {
    tipo: 'PQRS',
    descripcion:
      'Peticiones, quejas, reclamos o sugerencias dirigidas a entidades o empresas.',
    tiempo: '15 días hábiles',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
      </svg>
    )
  },
];

export default function Step1TipoDocumento({ formData, handleChange }: Props) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Selecciona el tipo de documento</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Escoge el documento legal que mejor se adapte a tu necesidad actual
        </p>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {documentTypes.map(({ tipo, descripcion, tiempo, icon }) => {
          const isSelected = formData.tipoDocumento === tipo;

          return (
            <motion.div
              key={tipo}
              variants={item}
              whileHover={{ scale: 1.02 }}
              className={`
                relative border-2 rounded-xl p-6 cursor-pointer transition-all duration-300
                ${isSelected 
                  ? 'border-indigo-500 dark:border-indigo-400 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 shadow-lg' 
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:shadow-md'
                }
              `}
              onClick={() => handleChange('tipoDocumento', tipo)}
            >
              {/* Marca de selección */}
              {isSelected && (
                <div className="absolute top-3 right-3">
                  <div className="bg-indigo-500 text-white rounded-full p-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              )}
              
              {/* Icono y título */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`
                  p-3 rounded-full 
                  ${isSelected 
                    ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' 
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                  }
                `}>
                  {icon}
                </div>
                <h3 className={`
                  font-semibold text-lg
                  ${isSelected 
                    ? 'text-indigo-700 dark:text-indigo-400' 
                    : 'text-slate-700 dark:text-slate-300'
                  }
                `}>
                  {tipo}
                </h3>
              </div>
              
              {/* Descripción */}
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                {descripcion}
              </p>
              
              {/* Tiempo de respuesta */}
              <div className="flex items-center mt-auto">
                <svg className="w-4 h-4 mr-1 text-indigo-500 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
                  Tiempo de respuesta: {tiempo}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Alerta informativa */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 border-l-4 border-amber-400 dark:border-amber-500 p-5 rounded-lg shadow-sm"
      >
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-amber-800 dark:text-amber-400">Importante</h3>
            <p className="mt-1 text-sm text-amber-700 dark:text-amber-300">
              Nuestros documentos están diseñados para situaciones generales. Para casos complejos o específicos, 
              te recomendamos consultar con un profesional del derecho.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}