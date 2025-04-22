const LoadingOverlay: React.FC = () => (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mb-4"></div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Procesando tu Pago</h3>
          </div>
        </div>
      </div>
  );
  
  export default LoadingOverlay;
  