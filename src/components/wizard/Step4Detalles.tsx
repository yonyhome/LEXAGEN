interface Props {
    formData: any;
    handleChange: (field: string, value: string) => void;
  }
  
  export default function Step4Detalles({ formData, handleChange }: Props) {
    const recomendaciones = {
      'Derecho de Petición': [
        'Sé específico sobre la información o acción que solicitas',
        'Menciona fechas y referencias de comunicaciones previas (si existen)',
        'Explica por qué necesitas lo que estás solicitando',
        'Indica el plazo en el que esperas respuesta (usualmente 15 días hábiles)'
      ],
      'Tutela': [
        'Describe claramente cuál derecho fundamental está siendo vulnerado',
        'Detalla cuándo y cómo ocurrió la vulneración',
        'Menciona las gestiones previas que has realizado',
        'Explica por qué necesitas protección urgente'
      ],
      'PQRS': [
        'Describe de manera objetiva la situación',
        'Incluye detalles como fechas, lugares y personas involucradas',
        'Especifica qué solución o respuesta esperas',
        'Adjunta referencias de facturas, contratos u otros documentos (si aplica)'
      ]
    };
  
    const recomendacionesActuales = recomendaciones[formData.tipoDocumento as keyof typeof recomendaciones] || [];
  
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Detalles de tu Solicitud</h2>
        <p className="text-gray-500">Explica de manera clara y concisa qué estás solicitando</p>
  
        {formData.tipoDocumento && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
            <p className="font-medium text-gray-700 mb-2">Recomendaciones para tu {formData.tipoDocumento}:</p>
            <ul className="list-disc pl-5 space-y-1 text-gray-600 text-sm">
              {recomendacionesActuales.map((rec, idx) => (
                <li key={idx}>{rec}</li>
              ))}
            </ul>
          </div>
        )}
  
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="detalles">
            Detalles de tu solicitud *
          </label>
          <textarea
            id="detalles"
            className="border border-gray-300 rounded-lg w-full px-4 py-2 h-48 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            placeholder="Explica tu caso con el mayor detalle posible..."
            value={formData.detalles || ''}
            onChange={(e) => handleChange('detalles', e.target.value)}
          ></textarea>
          <p className="text-xs text-gray-500 mt-1">
            Caracteres: {formData.detalles?.length || 0}/1000 (mínimo 50)
          </p>
        </div>
      </div>
    );
  }
  