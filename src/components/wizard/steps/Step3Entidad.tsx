// src/components/wizard/steps/Step3Entidad.tsx
import { useState, useEffect } from 'react';
import {
  BuildingOfficeIcon,
  MapPinIcon,
  MapIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';
import { StepComponentProps } from '../stepConfig';
import { motion } from 'framer-motion';

export type FieldKey = 
  | 'entidad'
  | 'ciudad'
  | 'direccionEntidad'
  | 'contactoEntidad';

// Iconos por campo con color actualizado
const iconMap: Record<FieldKey, JSX.Element> = {
  entidad: <BuildingOfficeIcon className="w-5 h-5 text-violet-400" />,
  ciudad: <MapPinIcon className="w-5 h-5 text-violet-400" />,
  direccionEntidad: <MapIcon className="w-5 h-5 text-violet-400" />,
  contactoEntidad: <EnvelopeIcon className="w-5 h-5 text-violet-400" />,
};

const fields: {
  key: FieldKey
  label: string
  placeholder: string
  required: boolean
}[] = [
  {
    key: 'entidad',
    label: 'Nombre de la entidad o persona',
    placeholder: 'Ej. Empresa de Servicios Públicos ABC',
    required: true,
  },
  {
    key: 'ciudad',
    label: 'Ciudad',
    placeholder: 'Ej. Bogotá',
    required: true,
  },
  {
    key: 'direccionEntidad',
    label: 'Dirección de la entidad',
    placeholder: 'Ej. Av. El Dorado # 68C-61',
    required: false,
  },
  {
    key: 'contactoEntidad',
    label: 'Correo o teléfono de contacto',
    placeholder: 'Ej. contacto@empresa.com',
    required: false,
  },
];

// Regex para validaciones
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRe = /^\+?\d{7,14}$/;

export default function Step3Entidad({
  formData,
  handleChange,
}: StepComponentProps) {
  // errores y touched
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const [touched, setTouched] = useState<Record<FieldKey, boolean>>({
    entidad: false,
    ciudad: false,
    direccionEntidad: false,
    contactoEntidad: false,
  });

  // validación
  useEffect(() => {
    const newErr: typeof errors = {};
    fields.forEach(({ key, label, required }) => {
      const val = (formData[key] as string || '').trim();
      if (required && !val) {
        newErr[key] = `${label} es obligatorio`;
      }
      if (key === 'contactoEntidad' && val) {
        // opcional: validar email o teléfono
        if (!emailRe.test(val) && !phoneRe.test(val)) {
          newErr[key] = 'Debes ingresar un email o teléfono válido';
        }
      }
    });
    setErrors(newErr);
  }, [
    formData.entidad,
    formData.ciudad,
    formData.direccionEntidad,
    formData.contactoEntidad,
  ]);

  const handleBlur = (key: FieldKey) => {
    setTouched((t) => ({ ...t, [key]: true }));
  };

  const showError = (key: FieldKey) =>
    Boolean(touched[key] && errors[key]);

  // Animaciones con Framer Motion
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

  return (
    <motion.div
      className="space-y-6" 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="space-y-2">
        <motion.h2 
          className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-fuchsia-500"
          variants={itemVariants}
        >
          Información de la Entidad
        </motion.h2>
        <motion.p 
          className="text-sm text-gray-500"
          variants={itemVariants}
        >
          Indica a quién va dirigido el documento
        </motion.p>
      </div>

      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-4"
        variants={containerVariants}
      >
        {fields.map(({ key, label, placeholder, required }) => (
          <motion.div key={key} variants={itemVariants}>
            <label
              htmlFor={key}
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              {label} {required && <span className="text-violet-500">*</span>}
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-200 group-hover:text-violet-600">
                {iconMap[key]}
              </div>
              <input
                id={key}
                type="text"
                className={`rounded-lg w-full pl-10 pr-3 py-2.5 text-sm focus:outline-none transition-all duration-200 border-2 ${
                  showError(key)
                    ? 'border-red-400 focus:ring-2 focus:ring-red-200'
                    : 'border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 hover:border-violet-300'
                } bg-white shadow-sm`}
                placeholder={placeholder}
                value={(formData[key] as string) || ''}
                onChange={(e) => handleChange(key, e.target.value)}
                onBlur={() => handleBlur(key)}
              />
              {required && !showError(key) && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
                  Requerido
                </div>
              )}
            </div>
            {showError(key) && (
              <motion.p 
                className="text-red-600 text-sm mt-1 font-medium flex items-center"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.2 }}
              >
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors[key]}
              </motion.p>
            )}
          </motion.div>
        ))}
      </motion.div>

      {formData.tipoDocumento === 'Tutela' && (
        <motion.div 
          className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-emerald-400 p-4 rounded-lg shadow-sm"
          variants={itemVariants}
        >
          <div className="flex items-start">
            <svg
              className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <div className="ml-3 text-sm text-emerald-700">
              Para acciones de tutela, la entidad debe ser aquella que
              presuntamente ha vulnerado tus derechos fundamentales.
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}