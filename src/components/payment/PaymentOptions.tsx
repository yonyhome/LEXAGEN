import { useState, useRef, useEffect } from 'react';
import { useEpaycoCheckout } from '../../hooks/useEpaycoCheckout';
import PaymentProcessingOverlay from '../layout/PaymentProcessingOverlay';
import { CheckoutParams } from '../../types/checkoutTypes';
import { motion } from 'framer-motion';

interface Props {
  selectedOption: 'pdf' | 'pdf-word';
  setSelectedOption: (value: 'pdf' | 'pdf-word') => void;
  token: string;
  email: string;
}

type DownloadOption = {
  id: 'pdf' | 'pdf-word';
  title: string;
  priceValue: number;
  priceLabel: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  badge?: string;
};

const options: DownloadOption[] = [
  {
    id: 'pdf',
    title: 'Solo PDF',
    priceValue: 10000,
    priceLabel: '$10.000',
    description: 'Documento en formato PDF listo para imprimir',
    features: ['Documento en PDF', 'Formato profesional', 'Listo para presentar'],
    icon: (
      <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
      </svg>
    )
  },
  {
    id: 'pdf-word',
    title: 'PDF + Word',
    priceValue: 15000,
    priceLabel: '$15.000',
    description: 'Documento en ambos formatos para máxima flexibilidad',
    features: ['Documento en PDF', 'Documento editable (Word)', 'Opción recomendada'],
    badge: 'Recomendado',
    icon: (
      <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 16H6c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1z" />
        <path d="M9.5 12c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5 1.5.67 1.5 1.5zm3.5 3h-7v-1h7v1zm3-2h-2v-1h2v1zm0-2h-2v-1h2v1z" />
      </svg>
    )
  }
];

export default function PaymentOptions({
  selectedOption,
  setSelectedOption,
  token,
  email,
}: Props) {
  const { launchCheckout } = useEpaycoCheckout();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentInitiated, setPaymentInitiated] = useState(false);
  const payButtonRef = useRef<HTMLButtonElement>(null);

  const handlePay = () => {
    const chosen = options.find(o => o.id === selectedOption)!;
    const payload: CheckoutParams = {
      token,
      email,
      name: 'LexaGen - Documento Legal',
      price: chosen.priceValue,
      description:
        chosen.id === 'pdf'
          ? 'Generación de documento legal (PDF)'
          : 'Generación de documento legal (PDF + Word)',
      option: chosen.id,
    };

    console.log('Iniciando pago con payload:', payload);
    setIsProcessing(true);
    setPaymentInitiated(true);
    launchCheckout(payload);
  };

  // Efecto para el botón de pago - animación sutil para llamar la atención
  useEffect(() => {
    if (payButtonRef.current && !paymentInitiated) {
      const timer = setTimeout(() => {
        payButtonRef.current?.classList.add('animate-pulse');
        setTimeout(() => {
          payButtonRef.current?.classList.remove('animate-pulse');
        }, 1500);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [paymentInitiated]);

  const selectedPrice = options.find(o => o.id === selectedOption)?.priceLabel || '';

  return (
    <>
      <div className="mb-2 mt-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Selecciona tu opción de descarga
        </h2>
        <p className="text-gray-500 text-sm">
          Elige la opción que mejor se adapte a tus necesidades
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {options.map((option, index) => (
          <motion.div
            key={option.id}
            className={`border rounded-xl p-5 cursor-pointer transition-all hover:shadow-md ${
              selectedOption === option.id
                ? 'border-indigo-500 bg-indigo-50 shadow-md'
                : 'border-gray-200 hover:border-indigo-300'
            }`}
            onClick={() => !isProcessing && setSelectedOption(option.id)}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.2, duration: 0.4 }}
          >
            <div className="flex items-center mb-4">
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                selectedOption === option.id ? 'border-indigo-600' : 'border-gray-300'
              }`}>
                {selectedOption === option.id && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-3 h-3 rounded-full bg-indigo-600" 
                  />
                )}
              </div>
              <div className="ml-3 font-medium text-gray-800 flex items-center">
                {option.icon && <span className="mr-2">{option.icon}</span>}
                <h3>{option.title}</h3>
              </div>
              {option.badge && (
                <span className="ml-auto inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800">
                  {option.badge}
                </span>
              )}
            </div>

            <div className="flex justify-between items-center">
              <div className="flex-1">
                <p className="text-gray-600 text-sm">{option.description}</p>
                <ul className="mt-3 space-y-2">
                  {option.features.map((f, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className={f.includes('recomendada') ? 'font-medium text-indigo-600' : ''}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-right ml-4">
                <p className="text-2xl font-bold text-gray-800">{option.priceLabel}</p>
                <p className="text-xs text-gray-500">COP</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        className="flex flex-col sm:flex-row justify-between items-center border-t border-gray-200 pt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <div className="mb-4 sm:mb-0">
          <p className="text-sm text-gray-600">Pago seguro con:</p>
          <div className="flex items-center space-x-3 mt-2">
            <div className="bg-blue-50 px-3 py-1 rounded-lg text-sm font-medium text-blue-600 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
              </svg>
              ePayco
            </div>
            <div className="flex items-center text-xs text-gray-500">
              <svg className="w-4 h-4 mr-1 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
              </svg>
              Pasarela segura
            </div>
          </div>
        </div>
        <motion.button
          ref={payButtonRef}
          onClick={handlePay}
          disabled={isProcessing}
          className={`flex items-center px-6 py-3 rounded-xl font-medium shadow-md transition-all w-full sm:w-auto ${
            isProcessing
              ? 'bg-indigo-600 text-white opacity-50 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isProcessing ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Procesando...
            </>
          ) : (
            <>
              Pagar {selectedPrice} COP
              <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </>
          )}
        </motion.button>
      </motion.div>

      {isProcessing && <PaymentProcessingOverlay />}
    </>
  );
}