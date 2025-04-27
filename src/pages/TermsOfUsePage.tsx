import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DocumentTextIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export default function TermsOfUsePage() {
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

  const sectionData = [
    {
      id: "intro",
      title: "Introducción",
      content: "Estos Términos de Uso (\"Términos\") constituyen un acuerdo legalmente vinculante entre usted y LexaGen (\"nosotros\", \"nuestro\" o \"la Plataforma\") que rige su acceso y uso de los servicios de generación de documentos legales ofrecidos a través de nuestra plataforma web. Al utilizar nuestros servicios, usted acepta estos Términos en su totalidad. Si no está de acuerdo con alguna parte de estos Términos, no debe utilizar nuestros servicios."
    },
    {
      id: "services",
      title: "Descripción de Servicios",
      content: "LexaGen ofrece una plataforma digital que utiliza tecnología de inteligencia artificial para la generación de documentos legales, incluyendo pero no limitado a derechos de petición, tutelas y PQRS. Nuestros servicios están diseñados para facilitar la creación de documentos basados en la información proporcionada por el usuario. La plataforma guía al usuario a través de un proceso paso a paso para reunir la información necesaria y generar documentos personalizados."
    },
    {
      id: "disclaimer",
      title: "Descargo de Responsabilidad Legal",
      content: "LexaGen no es un bufete de abogados y no proporciona asesoramiento legal. Los documentos generados a través de nuestra plataforma son herramientas para ayudar a los usuarios, pero no sustituyen el consejo legal profesional. Recomendamos encarecidamente consultar con un abogado calificado antes de tomar decisiones legales importantes. No garantizamos que los documentos generados sean aplicables a su situación específica o que cumplan con todos los requisitos legales actuales en su jurisdicción."
    },
    {
      id: "eligibility",
      title: "Elegibilidad",
      content: "Para utilizar nuestros servicios, debe tener al menos 18 años de edad y la capacidad legal para celebrar acuerdos vinculantes. Al utilizar nuestros servicios, usted confirma que cumple con estos requisitos. Si utiliza nuestros servicios en nombre de una organización, usted declara y garantiza que tiene la autoridad para vincular a dicha organización a estos Términos."
    },
    {
      id: "account",
      title: "Cuentas de Usuario",
      content: "LexaGen opera principalmente a través de sesiones temporales sin la necesidad de crear una cuenta permanente. Sin embargo, si decidimos implementar funciones que requieran la creación de cuentas en el futuro, usted será responsable de mantener la confidencialidad de su información de inicio de sesión y de todas las actividades que ocurran bajo su cuenta. Usted acepta notificarnos inmediatamente sobre cualquier uso no autorizado de su cuenta o cualquier otra violación de seguridad."
    },
    {
      id: "privacy",
      title: "Privacidad y Datos",
      content: "La protección de su privacidad es fundamental para nosotros. Nuestro enfoque es procesar sus datos localmente en su dispositivo siempre que sea posible. Para obtener información detallada sobre cómo recopilamos, usamos y protegemos su información, consulte nuestra Política de Privacidad, que forma parte integral de estos Términos."
    },
    {
      id: "intellectual",
      title: "Propiedad Intelectual",
      content: "Todos los derechos de propiedad intelectual relacionados con LexaGen, incluyendo pero no limitado a nuestro sitio web, logotipos, marcas comerciales, software, textos y gráficos, son propiedad de LexaGen o de nuestros licenciantes. Usted recibe una licencia limitada, no exclusiva y no transferible para utilizar nuestros servicios de acuerdo con estos Términos. Los documentos generados a través de nuestra plataforma son propiedad del usuario que proporcionó la información para su creación."
    },
    {
      id: "payments",
      title: "Pagos y Tarifas",
      content: "LexaGen puede cobrar tarifas por el uso de ciertos servicios o funciones. Todas las tarifas se mostrarán claramente antes de que se le solicite realizar un pago. Al efectuar un pago, usted autoriza a LexaGen o a nuestros procesadores de pago a cargar la cantidad especificada utilizando el método de pago seleccionado. Todos los pagos son finales y no reembolsables, excepto según lo exija la ley aplicable o a discreción de LexaGen."
    },
    {
      id: "termination",
      title: "Terminación",
      content: "LexaGen se reserva el derecho, a su sola discreción, de suspender o terminar su acceso a nuestros servicios en cualquier momento y por cualquier motivo, incluyendo pero no limitado a una violación de estos Términos. Usted puede dejar de usar nuestros servicios en cualquier momento. Tras la terminación, continuarán vigentes las disposiciones de estos Términos que por su naturaleza deban sobrevivir a la terminación."
    },
    {
      id: "modifications",
      title: "Modificaciones",
      content: "LexaGen se reserva el derecho de modificar estos Términos en cualquier momento. Las modificaciones entrarán en vigor inmediatamente después de su publicación en nuestra plataforma. Su uso continuado de nuestros servicios después de la publicación de las modificaciones constituye su aceptación de los Términos modificados. Es su responsabilidad revisar regularmente estos Términos para estar al tanto de cualquier cambio."
    },
    {
      id: "liability",
      title: "Limitación de Responsabilidad",
      content: "En la máxima medida permitida por la ley aplicable, LexaGen y sus directores, empleados, socios y agentes no serán responsables por daños indirectos, incidentales, especiales, consecuentes o punitivos, incluyendo pero no limitado a pérdida de beneficios, datos, uso, fondo de comercio u otras pérdidas intangibles, resultantes de su acceso o uso o incapacidad para acceder o usar los servicios."
    },
    {
      id: "indemnity",
      title: "Indemnización",
      content: "Usted acepta indemnizar, defender y eximir de responsabilidad a LexaGen y a sus directores, empleados, socios y agentes, de y contra cualquier reclamación, responsabilidad, daño, pérdida y gasto, incluyendo honorarios y costos legales razonables, que surjan de o estén de alguna manera relacionados con su uso de nuestros servicios o cualquier violación de estos Términos."
    },
    {
      id: "law",
      title: "Ley Aplicable",
      content: "Estos Términos se regirán e interpretarán de acuerdo con las leyes de Colombia, sin tener en cuenta sus disposiciones sobre conflictos de leyes. Cualquier disputa que surja en relación con estos Términos estará sujeta a la jurisdicción exclusiva de los tribunales de Colombia."
    },
    {
      id: "contact",
      title: "Contacto",
      content: "Si tiene alguna pregunta sobre estos Términos, puede contactarnos en legal@lexagen.com o a través del formulario de contacto disponible en nuestra plataforma."
    }
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
              <DocumentTextIcon className="h-8 w-8 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Términos de Uso</h1>
              <p className="text-gray-500 mt-1">Última actualización: 15 de marzo de 2025</p>
            </div>
          </div>

          {/* Introduction */}
          <motion.div 
            className="mb-8 p-6 bg-indigo-50 rounded-xl border border-indigo-100"
            variants={itemVariants}
          >
            <div className="flex items-start gap-3">
              <ExclamationTriangleIcon className="h-6 w-6 text-indigo-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="font-semibold text-lg text-indigo-800 mb-2">Información importante</h2>
                <p className="text-indigo-700">
                  Al utilizar LexaGen, usted acepta estos términos de uso en su totalidad. Nuestros servicios no constituyen asesoramiento legal y recomendamos consultar con un profesional del derecho para situaciones complejas o de alto riesgo.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Terms Sections */}
          <div className="space-y-8">
            {sectionData.map((section, index) => (
              <motion.section 
                key={section.id} 
                id={section.id}
                className="pb-6 border-b border-gray-100 last:border-0"
                variants={itemVariants}
              >
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircleIcon className="h-5 w-5 text-indigo-500" />
                  <h2 className="text-xl font-semibold text-gray-800">{index + 1}. {section.title}</h2>
                </div>
                <p className="text-gray-600 leading-relaxed pl-7">{section.content}</p>
              </motion.section>
            ))}
          </div>

          {/* Acceptance Section */}
          <motion.div 
            className="mt-10 p-6 bg-gray-50 rounded-xl border border-gray-100"
            variants={itemVariants}
          >
            <p className="text-gray-700 text-center font-medium">
              Al utilizar LexaGen, usted confirma que ha leído, entendido y aceptado estos Términos de Uso.
            </p>
          </motion.div>
        </motion.div>
      </motion.main>

      {/* Footer */}
      <Footer />
    </div>
  );
}