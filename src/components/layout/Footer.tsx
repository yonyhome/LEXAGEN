import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LockClosedIcon, ShieldCheckIcon, ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/outline';

export default function Footer() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // Footer links with icons
  const footerLinks = [
    { 
      label: "Términos de uso", 
      href: "/terms-of-use",
      icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
      </svg>
    },
    { 
      label: "Política de privacidad", 
      href: "/privacy-policy",
      icon: <LockClosedIcon className="w-4 h-4" />
    },
    { 
      label: "Contacto", 
      href: "#",
      icon: <ChatBubbleLeftEllipsisIcon className="w-4 h-4" />
    }
  ];

  return (
    <motion.footer 
      className="bg-white/90 backdrop-blur-sm border-t mt-auto py-6 px-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      {isHome ? (
        <div className="flex flex-col md:flex-row justify-between items-center text-sm max-w-6xl mx-auto">
          <motion.div 
            className="flex items-center gap-2 text-gray-600"
            variants={itemVariants}
          >
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500 font-semibold">
              LexaGen
            </div>
            <span className="text-gray-400">|</span>
            <p>© 2025 - Todos los derechos reservados</p>
          </motion.div>
          
          <motion.div 
            className="flex gap-6 mt-4 md:mt-0"
            variants={itemVariants}
          >
            {footerLinks.map((link, index) => (
              <motion.a 
                key={index}
                href={link.href} 
                className="text-gray-600 hover:text-indigo-600 transition-colors flex items-center gap-1.5 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-gray-400 group-hover:text-indigo-500 transition-colors">{link.icon}</span>
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        </div>
      ) : (
        <motion.div 
          className="max-w-6xl mx-auto text-sm text-center"
          variants={containerVariants}
        >
          <motion.div 
            className="flex justify-center items-center gap-2 text-gray-600 mb-2"
            variants={itemVariants}
          >
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500 font-semibold">
              LexaGen
            </div>
            <span className="text-gray-400">|</span>
            <p>© 2025 - Todos los derechos reservados</p>
          </motion.div>
          
          <motion.div 
            className="flex items-center justify-center gap-2 text-gray-500 mt-3"
            variants={itemVariants}
          >
            <ShieldCheckIcon className="w-4 h-4 text-indigo-500" />
            <p>
              Tus datos no son almacenados permanentemente. LexaGen no es un sustituto del consejo legal profesional.
            </p>
          </motion.div>
        </motion.div>
      )}
    </motion.footer>
  );
}