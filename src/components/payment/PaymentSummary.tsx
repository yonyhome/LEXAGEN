import { defaultData } from "@/context/FormContext";

interface Props {
  formData: typeof defaultData;
  previewUrl: string | null;
}

export const PaymentSummary = ({ formData, previewUrl }: Props) => {
  const getDocumentTitle = (): string => {
    switch (formData?.tipoDocumento) {
      case "Derecho de Petición":
        return "Derecho de Petición";
      case "Tutela":
        return "Acción de Tutela";
      case "PQRS":
        return "PQRS";
      default:
        return "Documento Legal";
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-lg font-medium text-gray-800 mb-4">Vista previa del documento</h2>

      <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 w-full overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
          <div>
            <h3 className="font-bold text-xl text-gray-800">{getDocumentTitle()}</h3>
            {formData?.nombre && (
              <div className="mt-2 space-y-1 text-sm">
                <p className="text-gray-600">Solicitante: {formData.nombre}</p>
                <p className="text-gray-600">Dirigido a: {formData.entidad}</p>
              </div>
            )}
          </div>
          <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full whitespace-nowrap mt-2 sm:mt-0">
            Verificado por IA
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4 mt-4">
          <p className="text-sm text-gray-500 mb-2">Vista previa del contenido:</p>

          {previewUrl ? (
            <div className="w-full rounded overflow-hidden">
              <iframe
                src={previewUrl}
                title="Vista previa del documento"
                className="w-full h-[500px] rounded-md border border-gray-200"
              />
            </div>
          ) : (
            <div className="h-[200px] flex items-center justify-center text-sm text-red-600 bg-white border border-gray-200 rounded">
              Vista previa no disponible. Token expirado o enlace incorrecto.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
