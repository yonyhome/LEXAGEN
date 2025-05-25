import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HomeIcon, ArrowLeftIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === '/';
  const isWizard = location.pathname === '/wizard';
  const isPayment = location.pathname === '/payment';
  const isInfo = location.pathname === '/info';

  const showHelp = isHome;
  const showBadge = isHome;
  const showBackToHome = isWizard || isPayment;
  const showBack = !isHome && !showBackToHome;

  const handleBack = (): void => {
    if (showBackToHome) {
      navigate('/');
    } else {
      navigate(-1);
    }
  };

  const handleHelpClick = (): void => {
    navigate('/info');
  };

  // Logo animation variants
  const logoVariants = {
    hover: {
      scale: 1.03,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.97,
      transition: { duration: 0.1 }
    }
  };

  return (
    <header className="w-full px-6 py-5 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.div 
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate('/')}
          whileHover="hover"
          whileTap="tap"
          variants={logoVariants}
        >
          <div className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white p-2 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div className="flex items-center">
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500 font-bold text-2xl tracking-tight">
              LexaGen
            </div>
            {showBadge && (
              <motion.span 
                className="ml-2 bg-gradient-to-r from-indigo-100 to-blue-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full border border-indigo-200"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                Beta
              </motion.span>
            )}
          </div>
        </motion.div>

        <div className="flex items-center gap-6">
          {/* Botón de Ayuda - solo en home */}
          {showHelp && (
            <motion.button 
              onClick={handleHelpClick}
              className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 font-medium flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-indigo-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <QuestionMarkCircleIcon className="w-5 h-5" />
              <span>Ayuda</span>
            </motion.button>
          )}

          {/* Indicador de página actual - solo en página de info */}
          {isInfo && (
            <div className="flex items-center gap-2 text-indigo-600 bg-indigo-50 px-3 py-2 rounded-lg">
              <QuestionMarkCircleIcon className="w-5 h-5" />
              <span className="font-medium">Centro de Ayuda</span>
            </div>
          )}
          
          {/* Botones de navegación hacia atrás */}
          {(showBackToHome || showBack) && (
            <motion.button
              onClick={handleBack}
              className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 font-medium flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-indigo-50 group"
              whileHover={{ x: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {showBackToHome ? (
                <HomeIcon className="w-5 h-5 group-hover:text-indigo-600" />
              ) : (
                <ArrowLeftIcon className="w-5 h-5 group-hover:text-indigo-600" />
              )}
              <span>{showBackToHome ? 'Volver al inicio' : 'Volver'}</span>
            </motion.button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;