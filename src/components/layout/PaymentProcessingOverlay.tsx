
import { motion } from 'framer-motion';
import { CreditCardIcon } from '@heroicons/react/24/outline';

export default function PaymentProcessingOverlay() {
  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white p-6 rounded-lg flex flex-col items-center"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <CreditCardIcon className="h-12 w-12 text-indigo-600 mb-4 animate-pulse" />
        <p className="text-lg font-medium text-gray-700">Procesando pago...</p>
      </motion.div>
    </motion.div>
  );
}
