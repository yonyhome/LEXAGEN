import {
    BuildingOfficeIcon,
    MapPinIcon,
    MapIcon,
    EnvelopeIcon,
  } from '@heroicons/react/24/outline';
  
  interface Props {
    formData: any;
    handleChange: (field: string, value: string) => void;
  }
  
  const iconMap: Record<string, JSX.Element> = {
    entidad: <BuildingOfficeIcon className="w-5 h-5 text-gray-400" />,
    ciudad: <MapPinIcon className="w-5 h-5 text-gray-400" />,
    direccionEntidad: <MapIcon className="w-5 h-5 text-gray-400" />,
    contactoEntidad: <EnvelopeIcon className="w-5 h-5 text-gray-400" />,
  };
  
  export default function Step3Entidad({ formData, handleChange }: Props) {
    const campos = [
      {
        id: 'entidad',
        label: 'Nombre de la entidad o persona *',
        placeholder: 'Ej. Empresa de Servicios Públicos ABC',
      },
      {
        id: 'ciudad',
        label: 'Ciudad *',
        placeholder: 'Ej. Bogotá',
      },
      {
        id: 'direccionEntidad',
        label: 'Dirección de la entidad',
        placeholder: 'Ej. Av. El Dorado # 68C-61',
      },
      {
        id: 'contactoEntidad',
        label: 'Correo o teléfono de contacto (opcional)',
        placeholder: 'Ej. contacto@empresa.com',
      },
    ];
  
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Información de la Entidad</h2>
        <p className="text-sm text-gray-500">Indica a quién va dirigido el documento</p>
  
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-3">
          {campos.map(({ id, label, placeholder }) => (
            <div key={id}>
              <label className="block text-sm font-medium text-gray-700 mb-0.5" htmlFor={id}>
                {label}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {iconMap[id]}
                </div>
                <input
                  id={id}
                  type="text"
                  className="border border-gray-300 rounded-md w-full pl-10 pr-3 py-1.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  placeholder={placeholder}
                  value={formData[id] || ''}
                  onChange={(e) => handleChange(id, e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
  
        {formData.tipoDocumento === 'Tutela' && (
          <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <div className="ml-2 text-xs text-green-700">
                Para acciones de tutela, la entidad debe ser aquella que presuntamente ha vulnerado tus derechos fundamentales.
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  