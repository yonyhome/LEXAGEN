import { motion } from 'framer-motion';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import DocumentInfo from '../components/home/DocumentInfo';
import FAQ from '../components/home/FAQ';
import HowItWorks from '../components/home/HowItWorks';

export default function InfoPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold text-gray-800 mb-6"
          >
            Todo lo que necesitas <span className="text-indigo-600">saber</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Aprende sobre tus derechos, comprende cuándo usar cada documento y domina el proceso para defender tus intereses legalmente
          </motion.p>
        </div>
      </section>

      {/* Document Information Section */}
      <section id="documentos">
        <DocumentInfo />
      </section>

      {/* How It Works Section */}
      <section id="como-funciona" className="bg-gray-50">
        <HowItWorks />
      </section>

      {/* FAQ Section */}
      <section id="preguntas-frecuentes">
        <FAQ />
      </section>

      {/* Educational Resources Section */}
      <section className="bg-gradient-to-br from-indigo-50 to-blue-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Recursos <span className="text-indigo-600">educativos</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Amplía tu conocimiento sobre derechos fundamentales y procedimientos legales
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Constitución Política de Colombia",
                description: "Artículos relevantes sobre derechos fundamentales y mecanismos de protección",
                link: "#",
                category: "Legal",
                readTime: "15 min"
              },
              {
                title: "Guía del Derecho de Petición",
                description: "Todo lo que necesitas saber sobre cómo y cuándo presentar un derecho de petición",
                link: "#",
                category: "Guía",
                readTime: "10 min"
              },
              {
                title: "Casos exitosos de Tutela",
                description: "Ejemplos reales de tutelas que han protegido derechos fundamentales",
                link: "#",
                category: "Casos",
                readTime: "20 min"
              },
              {
                title: "PQRS efectivos",
                description: "Cómo redactar quejas y reclamos que obtengan resultados",
                link: "#",
                category: "Guía",
                readTime: "8 min"
              },
              {
                title: "Derechos del Consumidor",
                description: "Conoce tus derechos como consumidor y cómo hacerlos valer",
                link: "#",
                category: "Legal",
                readTime: "12 min"
              },
              {
                title: "Seguimiento de Procesos",
                description: "Aprende a hacer seguimiento efectivo a tus solicitudes y documentos",
                link: "#",
                category: "Procedimiento",
                readTime: "7 min"
              }
            ].map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer group"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-3 py-1 rounded-full">
                    {resource.category}
                  </span>
                  <span className="text-gray-500 text-sm">{resource.readTime}</span>
                </div>
                
                <h3 className="font-bold text-gray-800 text-lg mb-3 group-hover:text-indigo-600 transition-colors">
                  {resource.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4">
                  {resource.description}
                </p>
                
                <div className="flex items-center text-indigo-600 text-sm font-medium">
                  Leer más
                  <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      

      {/* Footer */}
      <Footer />
    </div>
  );
}