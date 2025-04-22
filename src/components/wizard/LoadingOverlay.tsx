export function LoadingOverlay() {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mb-4"></div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Analizando tu información</h3>
            <p className="text-gray-600 text-center">
              Nuestro asistente IA está procesando tu solicitud para generar el documento más adecuado...
            </p>
          </div>
        </div>
      </div>
    );
  }
  