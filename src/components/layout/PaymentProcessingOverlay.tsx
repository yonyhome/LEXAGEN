
import { motion } from 'framer-motion';
import { CreditCardIcon } from '@heroicons/react/24/outline';

export default function PaymentProcessingOverlay() {
  return (
    <motion.div
      className="fixed inset-0 bg-gradient-to-br from-indigo-900 via-black to-purple-900 backdrop-blur-md flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 p-8 rounded-2xl shadow-2xl max-w-sm w-full flex flex-col items-center space-y-6"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        {/* Fondo brillante animado */}
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-blue-500 opacity-20 blur-2xl"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "linear",
          }}
        />

        {/* Ícono animado */}
        <motion.div
          className="flex items-center justify-center relative z-10"
          animate={{
            rotate: [0, 15, -15, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
          }}
        >
          <CreditCardIcon className="h-16 w-16 text-indigo-400" />
        </motion.div>

        {/* Mensaje */}
        <div className="relative z-10 text-center">
          <h2 className="text-2xl font-semibold text-white mb-2">Procesando tu pago</h2>
          <p className="text-sm text-slate-400">
            Estamos asegurando una transacción rápida y segura. Por favor, espera unos segundos.
          </p>
        </div>

        {/* Barra de progreso animada */}
        <div className="relative w-full h-2 bg-slate-700 rounded-full overflow-hidden">
          <motion.div
            className="absolute h-full bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 4, repeat: Infinity, repeatType: "loop" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
