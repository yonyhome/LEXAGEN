import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FormData } from '@/types/formTypes';

interface PaymentSummaryProps {
  formData: FormData;
  previewUrl: string | null;
  documentToken: string;
}

const LOCK_DURATION_MS = 30_000; // 30 segundos

const PaymentSummary: React.FC<PaymentSummaryProps> = ({
  formData,
  previewUrl,
  documentToken
}) => {
  const [isPreviewFullscreen, setIsPreviewFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);
  const [_locked, _setLocked] = useState(false);
  const [_secondsLeft, _setSecondsLeft] = useState(30);

  // Simula la carga del PDF
  useEffect(() => {
    if (previewUrl) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [previewUrl]);

  // Control de bloqueo por token (30 segundos)
  useEffect(() => {
    if (!previewUrl) return;

    const now = Date.now();
    const storedToken = localStorage.getItem('previewToken');
    const storedLockTime = localStorage.getItem('lockTime');

    if (storedToken === documentToken && storedLockTime) {
      const lockTime = Number(storedLockTime);

      // Si ya pasó el tiempo de preview, bloqueamos y limpiamos storage
      if (now >= lockTime) {
        _setLocked(true);
        _setSecondsLeft(0);
        localStorage.removeItem('previewToken');
        localStorage.removeItem('lockTime');
        return;
      }

      // Si aún no expira, calculamos segundos restantes
      _setLocked(false);
      _setSecondsLeft(Math.ceil((lockTime - now) / 1000));
    } else {
      // Nuevo documento o token distinto: reiniciamos contador
      const newLockTime = now + LOCK_DURATION_MS;
      localStorage.setItem('previewToken', documentToken);
      localStorage.setItem('lockTime', newLockTime.toString());
      _setLocked(false);
      _setSecondsLeft(Math.ceil(LOCK_DURATION_MS / 1000));
    }

    const interval = setInterval(() => {
      _setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          _setLocked(true);
          localStorage.removeItem('previewToken');
          localStorage.removeItem('lockTime');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [previewUrl, documentToken]);

  const getDocumentIcon = () => {
    const tipo = formData.tipoDocumento.toLowerCase();
    if (tipo.includes('contrato')) {
      return (
        <svg className="w-6 h-6 text-indigo-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm0 4c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H6v-1.4c0-2 4-3.1 6-3.1s6 1.1 6 3.1V19z" />
        </svg>
      );
    } else if (tipo.includes('carta') || tipo.includes('solicitud')) {
      return (
        <svg className="w-6 h-6 text-indigo-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      );
    } else if (tipo.includes('acta') || tipo.includes('certificado')) {
      return (
        <svg className="w-6 h-6 text-indigo-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
        </svg>
      );
    } else {
      return (
        <svg className="w-6 h-6 text-indigo-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
        </svg>
      );
    }
  };

  const toggleFullscreen = () => setIsPreviewFullscreen(!isPreviewFullscreen);
  const closeFullscreen = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) setIsPreviewFullscreen(false);
  };

  return (
    <div className="mb-10">
      <motion.div 
        className="flex flex-col md:flex-row gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* --- PREVIEW --- */}
        <motion.div 
          className="flex-1 border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm relative"
          whileHover={{ boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}
          transition={{ duration: 0.2 }}
        >
          <div className="bg-gray-50 border-b px-4 py-3 flex items-center justify-between">
            <div className="flex items-center">
              {getDocumentIcon()}
              <h3 className="ml-2 font-medium text-gray-800 truncate max-w-xs">
                {formData.tipoDocumento}
              </h3>
            </div>
            <div className="flex space-x-2">
              <button 
                className="p-1.5 rounded-md hover:bg-gray-200"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </button>
              {showTooltip && (
                <div className="absolute right-0 mt-12 w-48 p-2 bg-gray-800 text-xs text-white rounded shadow-lg z-10">
                  Esta es una vista previa. Tras el pago, obtendrás la versión completa.
                </div>
              )}
              <button 
                className="p-1.5 rounded-md hover:bg-gray-200"
                onClick={toggleFullscreen}
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"/>
                </svg>
              </button>
            </div>
          </div>

          <div className="aspect-[3/4] w-full bg-white relative">
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50">
                <svg className="animate-spin h-10 w-10 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                <p className="mt-3 text-sm text-gray-600">Cargando vista previa...</p>
              </div>
            )}
            {!isLoading && previewUrl && (
              <>
                <iframe
                  src={previewUrl}
                  title="Vista previa del documento"
                  className="w-full h-full select-none overflow-hidden pointer-events-none"
                  
                />
                <div className="absolute inset-0 bg-transparent" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="rotate-45 opacity-25 text-3xl font-bold text-indigo-900">
                    VISTA PREVIA
                  </span>
                </div>
              </>
            )}
          </div>
        </motion.div>

        {/* --- DETALLES --- */}
        <motion.div 
          className="md:w-1/3 bg-indigo-50 rounded-xl p-5 border border-indigo-100"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h3 className="font-medium text-lg text-gray-800 mb-3">Detalles del documento</h3>
          <div className="space-y-4 text-gray-700 text-sm">
            {/* Tipo */}
            <div>
              <p className="text-xs text-gray-500">Tipo de documento</p>
              <p className="font-medium">{formData.tipoDocumento}</p>
            </div>
            {/* Solicitante */}
            <div>
              <p className="text-xs text-gray-500">Solicitante</p>
              <p className="font-medium">
                {formData.nombre} — C.C. {formData.identificacion}
              </p>
            </div>
            {/* Condicionales */}
            {formData.entidad && (
              <div>
                <p className="text-xs text-gray-500">Entidad destinataria</p>
                <p className="font-medium">{formData.entidad}</p>
              </div>
            )}
            {formData.ciudad && (
              <div>
                <p className="text-xs text-gray-500">Ciudad</p>
                <p className="font-medium">{formData.ciudad}</p>
              </div>
            )}
            {formData.direccion && (
              <div>
                <p className="text-xs text-gray-500">Dirección remitente</p>
                <p className="font-medium">{formData.direccion}</p>
              </div>
            )}
            {formData.direccionEntidad && (
              <div>
                <p className="text-xs text-gray-500">Dirección de la entidad</p>
                <p className="font-medium">{formData.direccionEntidad}</p>
              </div>
            )}
            {formData.contacto?.email && (
              <div>
                <p className="text-xs text-gray-500">Contacto remitente</p>
                <p className="font-medium">{formData.contacto.email}</p>
              </div>
            )}
            {formData.contactoEntidad && (
              <div>
                <p className="text-xs text-gray-500">Contacto de la entidad</p>
                <p className="font-medium">{formData.contactoEntidad}</p>
              </div>
            )}
            {/* Estado listo */}
            <div className="pt-2">
              <div className="flex items-center text-green-600">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                <p className="font-medium">Documento listo para descargar</p>
              </div>
              <p className="text-xs text-gray-500 mt-1">Generado automáticamente por IA</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* --- FULLSCREEN MODAL --- */}
      <AnimatePresence>
        {isPreviewFullscreen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeFullscreen}
          >
            <motion.div
              className="bg-white rounded-lg overflow-hidden max-w-5xl w-full max-h-[90vh] flex flex-col relative"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="bg-gray-50 border-b px-4 py-3 flex items-center justify-between">
                <div className="flex items-center">
                  {getDocumentIcon()}
                  <h3 className="ml-2 font-medium text-gray-800 truncate">
                    {formData.tipoDocumento}
                  </h3>
                </div>
                <button
                  className="p-1.5 rounded-md hover:bg-gray-200"
                  onClick={toggleFullscreen}
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
              <div className="relative flex-1 overflow-hidden">
                {previewUrl ? (
                  <>
                    <iframe
                      src={previewUrl}
                      
                      className="w-full h-full select-none overflow-hidden pointer-events-none"
                     
                    />
                    <div className="absolute inset-0 bg-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="rotate-45 opacity-10 text-6xl font-bold text-indigo-900">
                        VISTA PREVIA
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-50">
                    <p className="text-gray-500">No se pudo cargar la vista previa</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PaymentSummary;
