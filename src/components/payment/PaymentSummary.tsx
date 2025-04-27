import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShieldCheckIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  LockClosedIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { defaultData } from "@/context/FormContext";

interface Props {
  formData: typeof defaultData;
  previewUrl: string | null;
}

export default function PaymentSummary({ formData, previewUrl }: Props) {
  const navigate = useNavigate();
  const [showSecurityNotice, setShowSecurityNotice] = useState(false);
  const [lockShake, setLockShake] = useState(false);
  const iframeRef = useRef<HTMLDivElement>(null);

  // si intentan scrollear en el preview, sacudir el candado
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (iframeRef.current?.contains(e.target as Node)) {
        setLockShake(true);
        setTimeout(() => setLockShake(false), 600);
      }
    };
    window.addEventListener('wheel', onWheel, { passive: true });
    return () => window.removeEventListener('wheel', onWheel);
  }, []);

  // decide icono y título
  const getDocumentData = () => {
    switch (formData.tipoDocumento) {
      case "Derecho de Petición":
        return { title: "Derecho de Petición", icon: <DocumentTextIcon className="text-blue-600 h-5 w-5" /> };
      case "Tutela":
        return { title: "Acción de Tutela", icon: <ShieldCheckIcon className="text-purple-600 h-5 w-5" /> };
      case "PQRS":
        return { title: "PQRS", icon: <DocumentTextIcon className="text-orange-600 h-5 w-5" /> };
      default:
        return { title: "Documento Legal", icon: <DocumentTextIcon className="text-gray-600 h-5 w-5" /> };
    }
  };
  const { title, icon } = getDocumentData();

  return (
    <div className="mb-8 transition-all duration-300 ease-in-out">
      {/* Cabecera */}
      <div className="flex items-center mb-4 gap-2">
        <h2 className="text-lg font-medium text-gray-800">Vista previa del documento</h2>
        <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full animate-pulse">
          Verificado
        </div>
      </div>

      <div className="rounded-xl overflow-hidden bg-white shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
        {/* Header del documento */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 border-b border-gray-200">
          <div className="flex justify-between items-center gap-3">
            <div className="flex items-center gap-2">
              {icon}
              <h3 className="font-bold text-xl text-gray-800">{title}</h3>
            </div>
            <div className="flex items-center bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-xs font-medium">
              <CheckCircleIcon className="h-4 w-4 mr-1" />
              Verificado por IA
            </div>
          </div>
          {formData.nombre && (
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-sm">
              <div className="flex items-center text-gray-600">
                <span className="font-medium mr-2">Solicitante:</span>
                <span className="truncate">{formData.nombre}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <span className="font-medium mr-2">Dirigido a:</span>
                <span className="truncate">{formData.entidad}</span>
              </div>
            </div>
          )}
        </div>

        {/* Preview recortado + overlay */}
        <div className="relative" ref={iframeRef}>
          {previewUrl ? (
            <div className="relative overflow-hidden h-[400px]">
              <iframe
                src={previewUrl}
                title="Vista previa del documento"
                referrerPolicy="no-referrer"
                className="w-full h-[800px] pointer-events-none select-none"
                sandbox="allow-same-origin allow-scripts"
                onContextMenu={e => e.preventDefault()}
                style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
              />
              <div
                className="absolute inset-0"
                onContextMenu={e => e.preventDefault()}
                onClick={e => e.preventDefault()}
              />

              <motion.div
                className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-white via-white/70 to-transparent backdrop-blur-sm flex flex-col items-center justify-end"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
              >
                <motion.div
                  className="mb-6 text-center px-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.6, ease: 'easeOut' }}
                >
                  <p className="text-gray-700 font-semibold mb-1">Contenido parcial mostrado</p>
                  <p className="text-sm text-gray-500 mb-4">
                    Para ver el documento completo, realiza el pago y desbloquéalo.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowSecurityNotice(true)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm flex items-center gap-2 transition-colors"
                  >
                    <motion.div
                      animate={lockShake ? { rotate: [0, -10, 10, -10, 10, 0] } : {}}
                      transition={{ duration: 0.6 }}
                    >
                      <LockClosedIcon className="h-5 w-5" />
                    </motion.div>
                    Desbloquear Documento
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>
          ) : (
            <div className="h-[300px] flex flex-col items-center justify-center p-6 bg-gray-50">
              <ExclamationTriangleIcon className="h-12 w-12 text-amber-500 mb-4" />
              <p className="text-gray-700 font-medium mb-1">Vista previa no disponible</p>
              <p className="text-sm text-gray-500 text-center max-w-md">
                La vista previa no se puede cargar.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Confirmación de Pago */}
      {showSecurityNotice && (
        <motion.div
          className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800">Acceso Restringido</h3>
              <button
                onClick={() => setShowSecurityNotice(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            <p className="text-gray-600 mb-4">
              Para desbloquear el documento completo, serás redirigido al proceso de pago.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowSecurityNotice(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => navigate('/checkout')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Confirmar Pago
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
