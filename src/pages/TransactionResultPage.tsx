import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  CheckIcon,
  XMarkIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/solid';

import AnimatedBackground from '../components/transaction/AnimatedBackground';
import TransactionCard from '../components/transaction/TransactionCard';
import ConfirmExitModal from '../components/transaction/ConfirmExitModal';
import { getTransactionStatus } from '../services/paymentService';

const statusConfig = {
  success: {
    bgGradient: 'from-emerald-500 to-green-400',
    bannerBg: 'bg-lime-500',
    iconBg: 'text-lime-500',
    buttonBg: 'bg-lime-600 hover:bg-lime-700',
    title: '¡Pago Completado!',
    message: 'Tus documentos han sido generados exitosamente y están listos para descargar',
    showDownload: true,
    icon: CheckIcon,
  },
  rejected: {
    bgGradient: 'from-red-600 to-red-400',
    bannerBg: 'bg-red-500',
    iconBg: 'text-red-500',
    buttonBg: 'bg-red-600 hover:bg-red-700',
    title: 'Pago Rechazado',
    message: 'El pago no pudo ser procesado. Intenta nuevamente.',
    showDownload: false,
    icon: ExclamationCircleIcon,
  },
  canceled: {
    bgGradient: 'from-amber-500 to-amber-400',
    bannerBg: 'bg-amber-500',
    iconBg: 'text-amber-500',
    buttonBg: 'bg-amber-600 hover:bg-amber-700',
    title: 'Transacción Cancelada',
    message: 'Has cancelado la transacción. Puedes intentarlo nuevamente.',
    showDownload: false,
    icon: XMarkIcon,
  },
  expired: {
    bgGradient: 'from-gray-400 to-gray-300',
    bannerBg: 'bg-gray-400',
    iconBg: 'text-gray-600',
    buttonBg: 'bg-gray-600 hover:bg-gray-700',
    title: 'Descarga no disponible',
    message: 'La descarga ya fue realizada o ha expirado.',
    showDownload: false,
    icon: XMarkIcon,
  },
};

const TransactionResultPage = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState<keyof typeof statusConfig | null>(null);
  const [downloadUrl, setDownloadUrl] = useState('');
  const [details, setDetails] = useState<any>(null);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const ref_payco = searchParams.get('ref_payco'); // ✅ Cambiado ref_payco → ref_payco

  useEffect(() => {
    const fetchStatus = async () => {
      if (!ref_payco) {
        setTransactionStatus('canceled');
        return;
      }

      try {
        const result = await getTransactionStatus(ref_payco);
        setTransactionStatus(result.status);
        setDetails(result.details);
        if (result.downloadUrl) setDownloadUrl(result.downloadUrl);
      } catch (error) {
        console.error('Error verificando transacción:', error);
        setTransactionStatus('rejected');
      }
    };

    fetchStatus();
  }, [ref_payco]);

  if (!transactionStatus) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-700 text-lg">
        Validando transacción con ePayco...
      </div>
    );
  }

  const currentConfig = statusConfig[transactionStatus];

  const handleDownload = async () => {
    if (!downloadUrl) return;
    setIsDownloading(true);
    try {
      window.location.href = downloadUrl;
    } catch (error) {
      console.error('Error al descargar:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCloseClick = () => {
    if (transactionStatus === 'success') {
      setShowConfirmModal(true);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatedBackground gradient={currentConfig.bgGradient} />

      <button
        className="absolute top-4 right-4 z-50 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
        onClick={handleCloseClick}
      >
        <XMarkIcon className="h-6 w-6 text-gray-700" />
      </button>

      <div className="relative min-h-screen flex flex-col items-center justify-center p-4 z-10">
        <TransactionCard
          config={currentConfig}
          transactionStatus={transactionStatus}
          isDownloading={isDownloading}
          onDownload={handleDownload}
          onTryAgain={() => navigate('/payment')}
          configDetails={details}
        />

        {transactionStatus === 'success' && (
          <div className="mt-6 text-white text-sm max-w-md text-center opacity-80">
            Tu privacidad es nuestra prioridad. Los documentos se eliminan después de la descarga.
          </div>
        )}
      </div>

      {showConfirmModal && (
        <ConfirmExitModal
          onCancel={() => setShowConfirmModal(false)}
          onConfirm={() => navigate('/')}
        />
      )}
    </div>
  );
};

export default TransactionResultPage;
