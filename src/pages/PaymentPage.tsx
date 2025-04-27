import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FormContext } from '../context/FormContext';
import LoadingOverlay from '../components/payment/LoadingOverlay';
import PaymentOptions from '../components/payment/PaymentOptions';
import PaymentSummary from '../components/payment/PaymentSummary';
import InfoSection from '../components/payment/InfoSection';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { formData } = useContext(FormContext);
  const [isLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState<'pdf' | 'pdf-word'>('pdf-word');

  // Recupera previewUrl y token (de state o sessionStorage)
  const previewUrl = location.state?.previewUrl || sessionStorage.getItem('lexagenPreviewUrl');
  const token      = location.state?.token      || sessionStorage.getItem('lexagenDownloadToken');

  useEffect(() => {
    if (location.state?.previewUrl) {
      sessionStorage.setItem('lexagenPreviewUrl', location.state.previewUrl);
    }
    if (location.state?.token) {
      sessionStorage.setItem('lexagenDownloadToken', location.state.token);
    }
  }, [location.state]);

  // Si falta algo, redirige al wizard
  useEffect(() => {
    if (!formData || !formData.tipoDocumento || !previewUrl || !token) {
      navigate('/wizard');
    }
  }, [formData, previewUrl, token, navigate]);

  const userEmail = formData?.contacto?.email || 'anonimo@lexagen.co';

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-5xl mx-auto py-8 px-6">
        <div className="bg-white shadow-md rounded-lg overflow-hidden p-6">
          <div className="bg-indigo-600 px-6 py-4 rounded-md mb-6">
            <h1 className="text-white text-xl font-semibold">Finalizar tu pedido</h1>
            <p className="text-indigo-100 text-sm mt-1">
              Tu documento está listo para descargar
            </p>
          </div>

          {/* Aquí está el preview mejorado */}
          <PaymentSummary formData={formData!} previewUrl={previewUrl} />

          {/* Aquí aparecen las dos opciones de pago y su lógica */}
          <PaymentOptions
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            token={token!}
            email={userEmail}
          />

          <InfoSection />
        </div>
      </main>

      <Footer />
      {isLoading && <LoadingOverlay />}
    </div>
  );
};

export default PaymentPage;
