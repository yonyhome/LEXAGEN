import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface InfoItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  content: string;
  expanded?: boolean;
}

const InfoSection: React.FC = () => {
  const [infoItems, setInfoItems] = useState<InfoItem[]>([
    {
      id: 'ai-verification',
      icon: (
        <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      title: 'Verificación con IA',
      content: 'Tu documento ha sido verificado por nuestra IA para asegurar la coherencia y el cumplimiento de los requisitos legales básicos.',
      expanded: true
    },
    {
      id: 'security',
      icon: (
        <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: 'Seguridad y privacidad',
      content: 'Una vez realizado el pago, podrás descargar tu documento inmediatamente. No almacenamos tus datos personales ni el contenido de tu documento.'
    },
    {
      id: 'disclaimer',
      icon: (
        <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Aviso legal',
      content: 'LexaGen no es un sustituto del consejo legal profesional. Para situaciones complejas, te recomendamos consultar con un abogado.'
    }
  ]);

  const toggleItem = (id: string) => {
    setInfoItems(items =>
      items.map(item =>
        item.id === id ? { ...item, expanded: !item.expanded } : item
      )
    );
  };

  return (
    <motion.div 
      className="mt-10 bg-gray-50 rounded-xl p-6 w-full overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center mb-6">
        <div className="bg-indigo-100 p-2 rounded-lg">
          <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-gray-800 ml-3">
          Información importante
        </h2>
      </div>
      
      <div className="space-y-4">
        {infoItems.map((item, idx) => (
          <motion.div 
            key={item.id}
            className={`border rounded-lg overflow-hidden transition-all ${
              item.expanded ? 'border-indigo-200 bg-white shadow-sm' : 'border-gray-200'
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.4 }}
          >
            <div 
              className="flex items-center p-4 cursor-pointer"
              onClick={() => toggleItem(item.id)}
            >
              <div className="flex-shrink-0 mr-3">
                {item.icon}
              </div>
              <h3 className="font-medium flex-1 text-gray-700">{item.title}</h3>
              <button className="ml-2 text-gray-400 hover:text-gray-600 transition-colors">
                <svg 
                  className={`w-5 h-5 transform transition-transform ${item.expanded ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            
            {item.expanded && (
              <motion.div 
                className="px-4 pb-4 pt-1 text-sm text-gray-600 border-t border-gray-100"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                <p>{item.content}</p>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
      
      <div className="mt-6 flex items-center justify-center text-xs text-gray-500">
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        Tus datos están protegidos por LexaGen © 2025
      </div>
    </motion.div>
  );
};

export default InfoSection;