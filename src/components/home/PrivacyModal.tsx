export default function PrivacyModal({ onClose }: { onClose: () => void }) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-2xl w-full p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Información de privacidad</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div className="space-y-4">
            <p>En LexaGen, nuestra prioridad es tu privacidad...</p>
            {/* Aquí puedes conservar el contenido tal como estaba en el modal original */}
          </div>
          <div className="mt-6 flex justify-end">
            <button 
              onClick={onClose}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700"
            >
              Entendido
            </button>
          </div>
        </div>
      </div>
    );
  }
  