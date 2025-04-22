import {
    UserIcon,
    IdentificationIcon,
    EnvelopeIcon,
    MapPinIcon,
  } from '@heroicons/react/24/outline';
  
  interface Props {
    formData: any;
    handleChange: (field: string, value: string) => void;
  }
  
  const iconMap: Record<string, JSX.Element> = {
    nombre: <UserIcon className="w-5 h-5 text-gray-400" />,
    identificacion: <IdentificationIcon className="w-5 h-5 text-gray-400" />,
    contacto: <EnvelopeIcon className="w-5 h-5 text-gray-400" />,
    direccion: <MapPinIcon className="w-5 h-5 text-gray-400" />,
  };
  
  export default function Step2PersonalInfo({ formData, handleChange }: Props) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Información Personal</h2>
        <p className="text-sm text-gray-500">Esta información se utilizará solo para generar tu documento</p>
  
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-3">
          {['nombre', 'identificacion', 'contacto', 'direccion'].map((field, idx) => (
            <div key={idx}>
              <label className="block text-sm font-medium text-gray-700 mb-0.5" htmlFor={field}>
                {field === 'nombre'
                  ? 'Nombre completo *'
                  : field === 'identificacion'
                  ? 'Número de identificación *'
                  : field === 'contacto'
                  ? 'Correo electrónico o teléfono *'
                  : 'Dirección (opcional)'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {iconMap[field]}
                </div>
                <input
                  id={field}
                  type="text"
                  className="border border-gray-300 rounded-md w-full pl-10 pr-3 py-1.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  placeholder={
                    field === 'nombre'
                      ? 'Ej. Juan Carlos Pérez Rodríguez'
                      : field === 'identificacion'
                      ? 'Ej. 1098765432'
                      : field === 'contacto'
                      ? 'Ej. ejemplo@correo.com o 3001234567'
                      : 'Ej. Calle 123 # 45-67, Apto 101'
                  }
                  value={formData[field] || ''}
                  onChange={(e) => handleChange(field, e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
  
        <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <div className="ml-2 text-xs text-blue-700">
              Recuerda que esta información no será almacenada permanentemente, solo se utilizará para generar tu documento.
            </div>
          </div>
        </div>
      </div>
    );
  }
  