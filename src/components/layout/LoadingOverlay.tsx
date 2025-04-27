import { useState, useEffect } from 'react';

export default function ModernLoadingOverlay() {
  const [loadingText, setLoadingText] = useState('Inicializando modelo de IA');
  const loadingPhrases = [
    'Inicializando modelo de IA',
    'Procesando información',
    'Analizando datos',
    'Generando respuesta',
    'Refinando resultados',
    'Optimizando salida'
  ];

  useEffect(() => {
    let currentIndex = 0;

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % loadingPhrases.length; // Avanza al siguiente índice
      setLoadingText(loadingPhrases[currentIndex]);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-900 border border-slate-700 p-8 rounded-xl shadow-2xl max-w-md w-full relative overflow-hidden">
        {/* Glow effect background */}
        <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        
        {/* Content */}
        <div className="relative z-10">
          <div className="flex flex-col items-center">
            {/* Neural network animation */}
            <div className="relative h-24 w-24 mb-6">
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 animate-spin"></div>
              <div className="absolute inset-2 rounded-full border-4 border-transparent border-l-indigo-500 animate-spin" style={{ animationDuration: '1.5s' }}></div>
              <div className="absolute inset-4 rounded-full border-4 border-transparent border-r-purple-500 animate-spin" style={{ animationDuration: '2s' }}></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></div>
              </div>
            </div>
            
            <h3 className="text-xl font-medium text-white mb-3">{loadingText}</h3>
            
            {/* Progress bar */}
            <div className="w-full bg-slate-800 rounded-full h-2 mb-4 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 h-full rounded-full animate-pulse"></div>
            </div>
            
            <p className="text-slate-400 text-center text-sm">
              Nuestro modelo de IA avanzada está procesando tu información para entregar resultados óptimos y personalizados.
            </p>
          </div>
          
          {/* Animated dots */}
          <div className="flex justify-center mt-6 space-x-2">
            <span className="h-2 w-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
            <span className="h-2 w-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
            <span className="h-2 w-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
          </div>
        </div>
      </div>
    </div>
  );
}
