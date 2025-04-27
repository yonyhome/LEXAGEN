import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  DocumentTextIcon, 
  ClockIcon, 
  ShieldCheckIcon, 
  DocumentDuplicateIcon, 
  QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export default function HomePage() {
  const navigate = useNavigate();
  const [showInfo, setShowInfo] = useState(false);
  
  const handleStart = () => {
    navigate('/wizard');
  };

  // Controladores para animaciones de hover en tarjetas
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Animación de entrada escalonada
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  // Animación para las tarjetas de documentos
  const cardVariants = {
    hover: { 
      scale: 1.03,
      boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.15)",
      transition: { duration: 0.2 }
    }
  };

  // Features con íconos e información
  const features = [
    {
      icon: <ShieldCheckIcon className="w-5 h-5" />,
      title: "100% anónimo",
      description: "No guardamos tu información personal"
    },
    {
      icon: <ClockIcon className="w-5 h-5" />,
      title: "Asistido por IA",
      description: "GPT-4 verifica y optimiza tu documento"
    },
    {
      icon: <DocumentDuplicateIcon className="w-5 h-5" />,
      title: "Formatos profesionales",
      description: "Documentos en PDF y DOCX listos para presentar"
    }
  ];

  // Documentos disponibles
  const documents = [
    {
      icon: <DocumentTextIcon className="h-6 w-6" />,
      title: "Derecho de Petición",
      description: "Solicita información o acciones a entidades"
    },
    {
      icon: <ShieldCheckIcon className="h-6 w-6" />,
      title: "Tutela",
      description: "Protege tus derechos fundamentales"
    },
    {
      icon: <DocumentTextIcon className="h-6 w-6" />,
      title: "PQRS",
      description: "Peticiones, quejas, reclamos y sugerencias"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <motion.main 
        className="flex-1 flex flex-col md:flex-row items-center justify-center gap-12 px-6 py-16"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Left Content */}
        <motion.div 
          className="w-full md:w-1/2 max-w-xl"
          variants={itemVariants}
        >
          <motion.h1 
            className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            Documentos legales <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500">simples y efectivos</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-600 mb-8 leading-relaxed"
            variants={itemVariants}
          >
            Genera documentos legales de calidad siguiendo un proceso guiado paso a paso, sin necesidad de conocimientos jurídicos avanzados.
          </motion.p>

          <motion.div 
            className="space-y-5"
            variants={itemVariants}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="flex items-start gap-4"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="mt-1 bg-indigo-100 p-2 rounded-full text-indigo-600">
                  {feature.icon}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{feature.title}</p>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="mt-10 flex flex-col sm:flex-row gap-4"
            variants={itemVariants}
          >
            <motion.button 
              onClick={handleStart}
              className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-8 py-4 rounded-xl font-medium shadow-lg hover:shadow-xl group relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300 ease-out transform translate-x-full group-hover:translate-x-0"></span>
              <span className="relative flex items-center justify-center">
                Comenzar ahora
                <svg className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </span>
            </motion.button>

            <motion.button 
              onClick={() => setShowInfo(!showInfo)}
              className="border-2 border-gray-300 bg-white text-gray-700 px-8 py-4 rounded-xl font-medium hover:border-indigo-300 hover:bg-gray-50 transition-all flex items-center justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <QuestionMarkCircleIcon className="w-5 h-5 mr-2" />
              Más información
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right Content - Document Types */}
        <motion.div 
          className="w-full md:w-1/3 max-w-md"
          variants={itemVariants}
        >
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-blue-500 px-6 py-5">
              <h3 className="text-white font-semibold text-lg">Documentos disponibles</h3>
            </div>
            <div className="p-6 space-y-4">
              {documents.map((doc, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 cursor-pointer"
                  variants={cardVariants}
                  whileHover="hover"
                  onHoverStart={() => setHoveredCard(index)}
                  onHoverEnd={() => setHoveredCard(null)}
                >
                  <motion.div 
                    className="flex-shrink-0 bg-indigo-100 p-3 rounded-xl text-indigo-600"
                    animate={hoveredCard === index ? { scale: 1.1, backgroundColor: "#c7d2fe" } : {}}
                  >
                    {doc.icon}
                  </motion.div>
                  <div>
                    <p className="font-semibold text-gray-800">{doc.title}</p>
                    <p className="text-gray-500">{doc.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.main>

      {/* Privacy Info Modal */}
      {showInfo && (
        <motion.div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold text-gray-800">Información de privacidad</h3>
              <motion.button 
                onClick={() => setShowInfo(false)}
                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </motion.button>
            </div>
            <div className="space-y-5">
              <p className="text-lg">En LexaGen, nuestra prioridad es tu privacidad. A diferencia de otros servicios similares:</p>
              
              <motion.div 
                className="bg-green-50 p-5 rounded-xl border border-green-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Lo que hacemos:
                </h4>
                <ul className="list-disc pl-5 space-y-2 text-green-700">
                  <li>Usamos sesiones temporales que se borran al cerrar tu navegador</li>
                  <li>Procesamos tus datos localmente en tu dispositivo</li>
                  <li>Utilizamos IA para mejorar tus documentos sin almacenar tu información</li>
                  <li>Entregamos documentos solo después del pago, sin retener copias</li>
                </ul>
              </motion.div>
              
              <motion.div 
                className="bg-red-50 p-5 rounded-xl border border-red-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h4 className="font-semibold text-red-800 mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                  Lo que NO hacemos:
                </h4>
                <ul className="list-disc pl-5 space-y-2 text-red-700">
                  <li>No guardamos tus datos personales</li>
                  <li>No compartimos tu información con terceros</li>
                  <li>No utilizamos cookies de rastreo</li>
                  <li>No creamos perfiles de usuario</li>
                </ul>
              </motion.div>
              
              <motion.p 
                className="italic text-gray-600 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Al utilizar LexaGen, puedes estar seguro de que tu información se maneja con el más alto nivel de confidencialidad y seguridad.
              </motion.p>
            </div>
            <motion.div 
              className="mt-8 flex justify-end"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <motion.button 
                onClick={() => setShowInfo(false)}
                className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-6 py-3 rounded-xl font-medium shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Entendido
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}