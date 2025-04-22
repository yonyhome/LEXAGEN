interface Props {
    formData: any;
    handleChange: (field: string, value: string) => void;
  }
  
  export default function Step1TipoDocumento({ formData, handleChange }: Props) {
    const opciones = [
      {
        tipo: 'Derecho de Petición',
        descripcion:
          'Solicitud formal a entidades públicas o privadas para obtener información o solicitar acciones.',
        tiempo: '15 días hábiles',
      },
      {
        tipo: 'Tutela',
        descripcion:
          'Mecanismo para proteger derechos fundamentales cuando han sido vulnerados.',
        tiempo: '10 días hábiles',
      },
      {
        tipo: 'PQRS',
        descripcion:
          'Peticiones, quejas, reclamos o sugerencias dirigidas a entidades o empresas.',
        tiempo: '15 días hábiles',
      },
    ];
  
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Tipo de Documento</h2>
        <p className="text-gray-500">Selecciona el tipo de documento legal que necesitas</p>
  
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {opciones.map(({ tipo, descripcion, tiempo }) => {
            const seleccionado = formData.tipoDocumento === tipo;
  
            return (
              <div
                key={tipo}
                className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ease-in-out transform hover:shadow-md ${
                  seleccionado
                    ? 'border-indigo-600 bg-indigo-50 shadow-md scale-[1.02] ring-1 ring-indigo-400'
                    : 'border-gray-200 bg-white'
                }`}
                onClick={() => handleChange('tipoDocumento', tipo)}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      seleccionado ? 'border-indigo-600' : 'border-gray-300'
                    }`}
                  >
                    {seleccionado && <div className="w-3 h-3 bg-indigo-600 rounded-full"></div>}
                  </div>
                  <h3 className="font-medium">{tipo}</h3>
                </div>
                <p className="text-sm text-gray-600">{descripcion}</p>
                <p className="text-xs text-indigo-600 mt-2">Tiempo de respuesta: {tiempo}</p>
              </div>
            );
          })}
        </div>
  
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <div className="ml-3 text-sm text-yellow-700">
              <span className="font-medium">Importante:</span> nuestros documentos están diseñados para situaciones generales. Para casos complejos, consulta con un abogado.
            </div>
          </div>
        </div>
      </div>
    );
  }
  