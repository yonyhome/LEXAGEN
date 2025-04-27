// src/components/wizard/steps/Step2PersonalInfo.tsx
import { useState, useEffect } from 'react';
import {
  UserIcon,
  IdentificationIcon,
  EnvelopeIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';
import { StepComponentProps } from '../stepConfig';
import { motion } from 'framer-motion';

type FieldKey = 'nombre' | 'identificacion' | 'contacto' | 'direccion';

const iconMap: Record<FieldKey, JSX.Element> = {
  nombre: <UserIcon className="w-5 h-5 text-indigo-400" />,
  identificacion: <IdentificationIcon className="w-5 h-5 text-indigo-400" />,
  contacto: <EnvelopeIcon className="w-5 h-5 text-indigo-400" />,
  direccion: <MapPinIcon className="w-5 h-5 text-indigo-400" />,
};

export default function Step2PersonalInfo({
  formData,
  handleChange,
}: StepComponentProps) {
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const [touched, setTouched] = useState<Record<FieldKey, boolean>>({
    nombre: false,
    identificacion: false,
    contacto: false,
    direccion: false,
  });

  // Validaciones
  useEffect(() => {
    const newErrors: typeof errors = {};
    if (!formData.nombre?.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
    }
    if (!formData.identificacion?.trim()) {
      newErrors.identificacion = 'La identificación es obligatoria';
    }
    const contactVal = formData.contacto?.trim() || '';
    if (!contactVal) {
      newErrors.contacto = 'El correo o teléfono es obligatorio';
    } else {
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRe = /^\+?\d{7,14}$/;
      if (!emailRe.test(contactVal) && !phoneRe.test(contactVal)) {
        newErrors.contacto = 'Debes ingresar un email o teléfono válido';
      }
    }
    setErrors(newErrors);
  }, [formData.nombre, formData.identificacion, formData.contacto]);

  const handleBlur = (field: FieldKey) => {
    setTouched((t) => ({ ...t, [field]: true }));
  };

  const showError = (field: FieldKey) =>
    Boolean(errors[field] && touched[field]);

  const fields: Array<{
    key: FieldKey;
    label: string;
    placeholder: string;
  }> = [
    {
      key: 'nombre',
      label: 'Nombre completo',
      placeholder: 'Ej. Juan Carlos Pérez Rodríguez',
    },
    {
      key: 'identificacion',
      label: 'Número de identificación',
      placeholder: 'Ej. 1098765432',
    },
    {
      key: 'contacto',
      label: 'Correo electrónico',
      placeholder: 'Ej. ejemplo@correo.com',
    },
    {
      key: 'direccion',
      label: 'Dirección (opcional)',
      placeholder: 'Ej. Calle 123 # 45-67, Apto 101',
    },
  ];

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
          className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500"
          variants={itemVariants}
        >
          Información Personal
        </motion.h2>
        <motion.p 
          className="text-sm text-gray-500"
          variants={itemVariants}
        >
          Esta información se utilizará solo para generar tu documento
        </motion.p>
      </div>

      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-4"
        variants={containerVariants}
      >
        {fields.map(({ key, label, placeholder }) => (
          <motion.div key={key} variants={itemVariants}>
            <label
              htmlFor={key}
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              {label} {key !== 'direccion' && <span className="text-indigo-500">*</span>}
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-200 group-hover:text-indigo-600">
                {iconMap[key]}
              </div>
              <input
                id={key}
                type="text"
                className={`rounded-lg w-full pl-10 pr-3 py-2.5 text-sm focus:outline-none transition-all duration-200 border-2 ${
                  showError(key)
                    ? 'border-red-400 focus:ring-2 focus:ring-red-200'
                    : 'border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 hover:border-indigo-300'
                } bg-white shadow-sm`}
                placeholder={placeholder}
                value={formData[key] || ''}
                onChange={(e) => handleChange(key, e.target.value)}
                onBlur={() => handleBlur(key)}
              />
              {key !== 'direccion' && !showError(key) && (
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

      <motion.div 
        className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-indigo-400 p-4 rounded-lg shadow-sm"
        variants={itemVariants}
      >
        <div className="flex items-start">
          <svg
            className="h-5 w-5 text-indigo-500 flex-shrink-0 mt-0.5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <p className="ml-3 text-sm text-indigo-700">
            Recuerda que esta información no será almacenada permanentemente,
            solo se utilizará para generar tu documento.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}