import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheckIcon, LockClosedIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export default function PrivacyPolicyPage() {
  // Animación de entrada
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Variantes para animaciones
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  // Datos de las secciones de la política de privacidad
  const privacySections = [
    {
      id: "overview",
      title: "Descripción General",
      content: "En LexaGen, priorizamos la protección de su privacidad. Esta Política de Privacidad explica cómo recopilamos, utilizamos y protegemos su información cuando utiliza nuestra plataforma de generación de documentos legales. Nuestra filosofía es minimizar la recopilación de datos y procesar su información localmente en su dispositivo siempre que sea posible."
    },
    {
      id: "collection",
      title: "Información que Recopilamos",
      content: "Para proporcionar nuestros servicios, podemos recopilar la siguiente información: (1) Información que usted proporciona voluntariamente al utilizar nuestros servicios, como datos personales necesarios para completar documentos legales; (2) Información técnica limitada, como tipo de navegador, sistema operativo y dirección IP, necesaria para el funcionamiento de la plataforma; (3) Información de pago, que se procesa a través de proveedores de pagos seguros y no se almacena en nuestros servidores."
    },
    {
      id: "usage",
      title: "Uso de la Información",
      content: "Utilizamos la información recopilada principalmente para: (1) Generar documentos legales personalizados según sus especificaciones; (2) Procesar transacciones y entregarle los documentos solicitados; (3) Mejorar y optimizar nuestra plataforma y servicios; (4) Cumplir con obligaciones legales y regulatorias. No utilizamos sus datos para crear perfiles de usuario ni para fines de marketing."
    },
    {
      id: "storage",
      title: "Almacenamiento de Datos",
      content: "LexaGen opera principalmente a través de sesiones temporales, lo que significa que la información que proporciona para generar documentos se procesa temporalmente y no se almacena permanentemente en nuestros servidores. Una vez que cierra su navegador o después de un período de inactividad, los datos relacionados con su sesión se eliminan automáticamente. Los documentos generados se entregan después del pago y no se conservan copias en nuestros sistemas."
    },
    {
      id: "cookies",
      title: "Cookies y Tecnologías Similares",
      content: "LexaGen utiliza cookies esenciales para el funcionamiento básico de la plataforma, como mantener su sesión activa mientras navega por diferentes páginas. No utilizamos cookies de rastreo ni de perfilado. Puede configurar su navegador para rechazar todas las cookies o para indicar cuándo se envía una cookie. Sin embargo, si no acepta cookies, es posible que algunas funciones de nuestra plataforma no estén disponibles."
    },
    {
      id: "sharing",
      title: "Compartición de Datos",
      content: "No compartimos, vendemos ni alquilamos su información personal a terceros con fines comerciales o de marketing. Podemos compartir información limitada con proveedores de servicios que nos ayudan a operar nuestra plataforma (como procesadores de pago), siempre bajo estrictas condiciones de confidencialidad y seguridad. También podemos divulgar información si es requerido por la ley o para proteger nuestros derechos legales."
    },
    {
      id: "ai",
      title: "Uso de Inteligencia Artificial",
      content: "Nuestra plataforma utiliza tecnología de inteligencia artificial para generar y optimizar documentos legales. El procesamiento de IA se realiza de manera que protege su privacidad y no conserva su información personal después de completar la tarea específica. No utilizamos sus datos para entrenar nuestros modelos de IA de manera que pueda identificarlo personalmente."
    },
    {
      id: "security",
      title: "Seguridad de Datos",
      content: "Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger su información contra acceso no autorizado, alteración, divulgación o destrucción. Estas medidas incluyen cifrado de datos, acceso restringido a la información y auditorías regulares de seguridad. Sin embargo, ningún método de transmisión por Internet o de almacenamiento electrónico es 100% seguro, por lo que no podemos garantizar su seguridad absoluta."
    },
    {
      id: "rights",
      title: "Sus Derechos",
      content: "Dependiendo de su ubicación, usted puede tener ciertos derechos relacionados con sus datos personales, incluyendo el derecho a acceder, corregir, eliminar o limitar el uso de su información. Dado que operamos principalmente a través de sesiones temporales y no almacenamos datos permanentemente, muchos de estos derechos se ejercen automáticamente a través de nuestro diseño. Si tiene alguna solicitud específica relacionada con sus datos, contáctenos y haremos todo lo posible para atenderla."
    },
    {
      id: "changes",
      title: "Cambios a esta Política",
      content: "Podemos actualizar esta Política de Privacidad periódicamente para reflejar cambios en nuestras prácticas o por otras razones operativas, legales o regulatorias. La versión actualizada se indicará con una fecha de revisión y será efectiva tan pronto como sea accesible. Le recomendamos revisar esta política regularmente para estar informado sobre cómo protegemos su información."
    },
    {
      id: "contact",
      title: "Contáctenos",
      content: "Si tiene preguntas, inquietudes o solicitudes relacionadas con esta Política de Privacidad o el manejo de sus datos personales, puede contactarnos en privacidad@lexagen.com o a través del formulario de contacto disponible en nuestra plataforma."
    }
  ];

  // Listas de lo que hacemos y no hacemos
  const whatWeDo = [
    "Usamos sesiones temporales que se borran al cerrar tu navegador",
    "Procesamos tus datos localmente en tu dispositivo",
    "Utilizamos IA para mejorar tus documentos sin almacenar tu información",
    "Entregamos documentos solo después del pago, sin retener copias",
    "Implementamos medidas de seguridad avanzadas para proteger tus datos"
  ];

  const whatWeDont = [
    "No guardamos tus datos personales",
    "No compartimos tu información con terceros para marketing",
    "No utilizamos cookies de rastreo",
    "No creamos perfiles de usuario",
    "No conservamos documentos después de su entrega"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <motion.main 
        className="flex-1 container mx-auto px-4 py-12"
        initial="hidden"
        animate={mounted ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div 
          className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl border border-white/50 p-8 md:p-12 max-w-4xl mx-auto"
          variants={itemVariants}
        >
          {/* Header with Icon */}
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
            <div className="p-3 bg-indigo-100 rounded-xl">
              <ShieldCheckIcon className="h-8 w-8 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Política de Privacidad</h1>
              <p className="text-gray-500 mt-1">Última actualización: 15 de marzo de 2025</p>
            </div>
          </div>

          {/* Summary Cards */}
          <motion.div 
            className="grid md:grid-cols-2 gap-6 mb-10"
            variants={itemVariants}
          >
            {/* What We Do */}
            <div className="bg-green-50 p-6 rounded-xl border border-green-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-100 p-2 rounded-full">
                  <CheckIcon className="h-5 w-5 text-green-600" />
                </div>
                <h2 className="font-semibold text-lg text-green-800">Lo que hacemos</h2>
              </div>
              <ul className="space-y-3">
                {whatWeDo.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-green-700">
                    <div className="mt-1 text-green-500">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What We Don't Do */}
            <div className="bg-red-50 p-6 rounded-xl border border-red-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-red-100 p-2 rounded-full">
                  <XMarkIcon className="h-5 w-5 text-red-600" />
                </div>
                <h2 className="font-semibold text-lg text-red-800">Lo que NO hacemos</h2>
              </div>
              <ul className="space-y-3">
                {whatWeDont.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-red-700">
                    <div className="mt-1 text-red-500">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Security Banner */}
          <motion.div 
            className="mb-10 p-6 bg-blue-50 rounded-xl border border-blue-100 flex items-start gap-4"
            variants={itemVariants}
          >
            <div className="bg-blue-100 p-2 rounded-full mt-1">
              <LockClosedIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="font-semibold text-lg text-blue-800 mb-2">Diseñado con la privacidad como prioridad</h2>
              <p className="text-blue-700">
                En LexaGen, hemos construido nuestra plataforma siguiendo el principio de "privacidad por diseño". 
                Esto significa que la protección de su información no es un añadido posterior, sino una consideración 
                fundamental en cada aspecto de nuestro servicio.
              </p>
            </div>
          </motion.div>

          {/* Privacy Policy Sections */}
          <div className="space-y-8">
            {privacySections.map((section, index) => (
              <motion.section 
                key={section.id} 
                id={section.id}
                className="pb-6 border-b border-gray-100 last:border-0"
                variants={itemVariants}
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-sm font-bold">
                    {index + 1}
                  </span>
                  {section.title}
                </h2>
                <p className="text-gray-600 leading-relaxed pl-8">{section.content}</p>
              </motion.section>
            ))}
          </div>

          {/* Final Note */}
          <motion.div 
            className="mt-10 p-6 bg-gray-50 rounded-xl border border-gray-100 text-center"
            variants={itemVariants}
          >
            <p className="text-gray-700 font-medium">
              Al utilizar LexaGen, usted acepta las prácticas descritas en esta Política de Privacidad.
            </p>
            <p className="text-gray-500 mt-2">
              Si tiene alguna pregunta o inquietud, no dude en contactarnos en privacidad@lexagen.com
            </p>
          </motion.div>
        </motion.div>
      </motion.main>

      {/* Footer */}
      <Footer />
    </div>
  );
}