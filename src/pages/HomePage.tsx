import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export default function HomePage() {
  const navigate = useNavigate();
  const [showInfo, setShowInfo] = useState(false);
  
  const handleStart = () => {
    navigate('/wizard');
  };

  // Animación de entrada
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <main className={`flex-1 flex flex-col md:flex-row items-center justify-center gap-8 px-6 transition-opacity duration-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
        {/* Left Content */}
        <div className="w-full md:w-1/2 max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Documentos legales <span className="text-indigo-600">simples y efectivos</span>
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Genera documentos legales de calidad siguiendo un proceso guiado paso a paso, sin necesidad de conocimientos jurídicos avanzados.
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="mt-1 bg-indigo-100 p-1 rounded-full">
                <svg className="w-4 h-4 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-800">100% anónimo</p>
                <p className="text-sm text-gray-600">No guardamos tu información personal</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="mt-1 bg-indigo-100 p-1 rounded-full">
                <svg className="w-4 h-4 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-800">Asistido por IA</p>
                <p className="text-sm text-gray-600">GPT-4 verifica y optimiza tu documento</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="mt-1 bg-indigo-100 p-1 rounded-full">
                <svg className="w-4 h-4 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-800">Formatos profesionales</p>
                <p className="text-sm text-gray-600">Documentos en PDF y DOCX listos para presentar</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button 
              onClick={handleStart}
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-indigo-700 shadow-md transition-all flex items-center justify-center"
            >
              Comenzar ahora
              <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </button>

            <button 
              onClick={() => setShowInfo(!showInfo)}
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-all flex items-center justify-center"
            >
              Más información
            </button>
          </div>
        </div>

        {/* Right Content - Document Types */}
        <div className="w-full md:w-1/3 max-w-md">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-indigo-600 px-6 py-4">
              <h3 className="text-white font-medium">Documentos disponibles</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
                <div className="flex-shrink-0 bg-indigo-100 p-2 rounded-lg">
                  <svg className="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Derecho de Petición</p>
                  <p className="text-sm text-gray-600">Solicita información o acciones a entidades</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
                <div className="flex-shrink-0 bg-indigo-100 p-2 rounded-lg">
                  <svg className="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Tutela</p>
                  <p className="text-sm text-gray-600">Protege tus derechos fundamentales</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
                <div className="flex-shrink-0 bg-indigo-100 p-2 rounded-lg">
                  <svg className="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                  </svg>
                </div>
                <div>
                  <p className="font-medium">PQRS</p>
                  <p className="text-sm text-gray-600">Peticiones, quejas, reclamos y sugerencias</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Privacy Info Modal */}
      {showInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Información de privacidad</h3>
              <button onClick={() => setShowInfo(false)} className="text-gray-500 hover:text-gray-700">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <p>En LexaGen, nuestra prioridad es tu privacidad. A diferencia de otros servicios similares:</p>
              
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <h4 className="font-medium text-green-800 mb-2">Lo que hacemos:</h4>
                <ul className="list-disc pl-5 space-y-1 text-green-700">
                  <li>Usamos sesiones temporales que se borran al cerrar tu navegador</li>
                  <li>Procesamos tus datos localmente en tu dispositivo</li>
                  <li>Utilizamos IA para mejorar tus documentos sin almacenar tu información</li>
                  <li>Entregamos documentos solo después del pago, sin retener copias</li>
                </ul>
              </div>
              
              <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                <h4 className="font-medium text-red-800 mb-2">Lo que NO hacemos:</h4>
                <ul className="list-disc pl-5 space-y-1 text-red-700">
                  <li>No guardamos tus datos personales</li>
                  <li>No compartimos tu información con terceros</li>
                  <li>No utilizamos cookies de rastreo</li>
                  <li>No creamos perfiles de usuario</li>
                </ul>
              </div>
              
              <p className="italic text-gray-600">Al utilizar LexaGen, puedes estar seguro de que tu información se maneja con el más alto nivel de confidencialidad y seguridad.</p>
            </div>
            <div className="mt-6 flex justify-end">
              <button 
                onClick={() => setShowInfo(false)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}