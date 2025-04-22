interface ConfirmExitModalProps {
    onCancel: () => void;
    onConfirm: () => void;
  }
  
  export default function ConfirmExitModal({ onCancel, onConfirm }: ConfirmExitModalProps) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full mx-4">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100 mb-4">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M5.06 21h13.88c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.34 18c-.77 1.33.19 3 1.72 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">¡Atención!</h3>
            <p className="text-gray-600 mt-2">
              Asegúrate de descargar tus documentos antes de cerrar esta página. No podrás recuperarlos después.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <button onClick={onCancel} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium">
              Volver
            </button>
            <button onClick={onConfirm} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium">
              Cerrar de todas formas
            </button>
          </div>
        </div>
      </div>
    );
  }
  