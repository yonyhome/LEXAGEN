import { useState } from 'react';
import { useEpaycoCheckout } from '../../hooks/useEpaycoCheckout';
import PaymentProcessingOverlay from '../layout/PaymentProcessingOverlay';
import { CheckoutParams } from '../../types/checkoutTypes';

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
};

const options: DownloadOption[] = [
  {
    id: 'pdf',
    title: 'Solo PDF',
    priceValue: 10000,
    priceLabel: '$10.000',
    description: 'Documento en formato PDF listo para imprimir',
    features: ['Documento en PDF', 'Formato profesional', 'Listo para presentar']
  },
  {
    id: 'pdf-word',
    title: 'PDF + Word',
    priceValue: 15000,
    priceLabel: '$15.000',
    description: 'Documento en ambos formatos para máxima flexibilidad',
    features: ['Documento en PDF', 'Documento editable (Word)', 'Opción recomendada']
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
    launchCheckout(payload);
  };

  return (
    <>
      <h2 className="text-lg font-medium text-gray-800 mb-4">
        Selecciona tu opción de descarga
      </h2>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {options.map(option => (
          <div
            key={option.id}
            className={`border rounded-lg p-5 cursor-pointer transition-all ${
              selectedOption === option.id
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-gray-200 hover:border-indigo-300'
            }`}
            onClick={() => !isProcessing && setSelectedOption(option.id)}
          >
            <div className="flex items-center mb-4">
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                selectedOption === option.id ? 'border-indigo-600' : 'border-gray-300'
              }`}>
                {selectedOption === option.id && (
                  <div className="w-3 h-3 rounded-full bg-indigo-600" />
                )}
              </div>
              <h3 className="ml-3 font-medium text-gray-800">{option.title}</h3>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600 text-sm">{option.description}</p>
                <ul className="mt-2 text-sm text-gray-600 space-y-1">
                  {option.features.map((f, i) => (
                    <li key={i} className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className={f.includes('recomendada') ? 'font-medium text-indigo-600' : ''}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-800">{option.priceLabel}</p>
                <p className="text-xs text-gray-500">COP</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center border-t border-gray-200 pt-6">
        <div className="mb-4 sm:mb-0">
          <p className="text-sm text-gray-500">Pago seguro con:</p>
          <div className="flex items-center space-x-2 mt-2">
            <div className="bg-blue-50 px-2 py-1 rounded text-xs font-medium text-blue-600">
              ePayco
            </div>
            <div className="text-xs text-gray-400">•</div>
            <div className="text-xs text-gray-500">Pasarela segura</div>
          </div>
        </div>
        <button
          onClick={handlePay}
          disabled={isProcessing}
          className={`flex items-center px-6 py-3 rounded-lg font-medium shadow-md transition-all w-full sm:w-auto ${
            isProcessing
              ? 'bg-indigo-600 text-white opacity-50 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
          }`}
        >
          {selectedOption === 'pdf' ? 'Pagar $10.000 COP' : 'Pagar $15.000 COP'}
          <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>

      {isProcessing && <PaymentProcessingOverlay />}
    </>
  );
}
