import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FormContext } from '../context/FormContext';
import LoadingOverlay from '../components/payment/LoadingOverlay';
import PaymentOptions from '../components/payment/PaymentOptions';
import PaymentSummary from '../components/payment/PaymentSummary';
import InfoSection from '../components/payment/InfoSection';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

// Importamos la biblioteca de animaciones (suponiendo que se instalará)
import { motion, AnimatePresence } from 'framer-motion';

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { formData } = useContext(FormContext);
  const [isLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState<'pdf' | 'pdf-word'>('pdf-word');
  const [isPageReady, setIsPageReady] = useState(false);

  // Recupera previewUrl y token (de state o sessionStorage)
  const previewUrl = location.state?.previewUrl || sessionStorage.getItem('lexagenPreviewUrl');
  const token = location.state?.token || sessionStorage.getItem('lexagenDownloadToken');

  useEffect(() => {
    if (location.state?.previewUrl) {
      sessionStorage.setItem('lexagenPreviewUrl', location.state.previewUrl);
    }
    if (location.state?.token) {
      sessionStorage.setItem('lexagenDownloadToken', location.state.token);
    }
    
    // Simula tiempo de carga para una transición suave
    const timer = setTimeout(() => setIsPageReady(true), 200);
    return () => clearTimeout(timer);
  }, [location.state]);

  // Si falta algo, redirige al wizard
  useEffect(() => {
    if (!formData || !formData.tipoDocumento || !previewUrl || !token) {
      navigate('/wizard');
    }
  }, [formData, previewUrl, token, navigate]);

  const userEmail = formData?.contacto?.email || 'anonimo@lexagen.co';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
      <Header />

      <AnimatePresence>
        {isPageReady && (
          <motion.main 
            className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="bg-white shadow-xl rounded-2xl overflow-hidden backdrop-blur-sm bg-white/90">
              <motion.div 
                className="bg-gradient-to-r from-indigo-600 to-indigo-800 px-6 py-5 rounded-t-2xl"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h1 className="text-white text-2xl font-semibold">Finalizar tu pedido</h1>
                    <p className="text-indigo-100 text-sm mt-1">
                      Tu documento está listo para descargar
                    </p>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <span className="inline-flex items-center rounded-full bg-indigo-400/30 px-3 py-1 text-xs font-medium text-white">
                      <span className="mr-1 h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
                      Procesado por IA
                    </span>
                  </div>
                </div>
              </motion.div>

              <div className="p-6 md:p-8">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <PaymentSummary formData={formData!} previewUrl={previewUrl} documentToken={token} />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <PaymentOptions
                    selectedOption={selectedOption}
                    setSelectedOption={setSelectedOption}
                    token={token!}
                    email={userEmail}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <InfoSection />
                </motion.div>
              </div>
            </div>
          </motion.main>
        )}
      </AnimatePresence>

      <Footer />
      {isLoading && <LoadingOverlay />}
    </div>
  );
};

export default PaymentPage;