import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { StarIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid';
import { UserCircleIcon } from '@heroicons/react/24/outline';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  document: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

interface Stat {
  number: string;
  label: string;
}

const Testimonials: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState<number>(0);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "María González",
      location: "Bogotá",
      document: "Derecho de Petición",
      rating: 5,
      date: "Hace 2 semanas",
      comment: "Increíble servicio. Necesitaba un derecho de petición para solicitar información sobre mi pensión y el proceso fue súper fácil. El documento quedó perfecto y recibí respuesta en 10 días. 100% recomendado.",
      verified: true
    },
    {
      id: 2,
      name: "Carlos Rodríguez",
      location: "Medellín",
      document: "Tutela",
      rating: 5,
      date: "Hace 1 mes",
      comment: "Me ayudaron con una tutela por negación de servicios de salud. El documento generado fue muy profesional y logramos que me autorizaran el procedimiento. Excelente herramienta.",
      verified: true
    },
    {
      id: 3,
      name: "Ana Martínez",
      location: "Cali",
      document: "PQRS",
      rating: 4,
      date: "Hace 3 semanas",
      comment: "Perfecto para hacer quejas formales. Usé la plataforma para reclamar por un servicio deficiente y el formato del documento fue muy profesional. La empresa me respondió rápidamente.",
      verified: true
    },
    {
      id: 4,
      name: "Roberto Silva",
      location: "Barranquilla",
      document: "Derecho de Petición",
      rating: 5,
      date: "Hace 1 semana",
      comment: "Como no soy abogado, me daba miedo redactar mal el documento. Esta herramienta me salvó. El resultado fue impecable y logré obtener la información que necesitaba de la alcaldía.",
      verified: true
    },
    {
      id: 5,
      name: "Lucía Herrera",
      location: "Bucaramanga",
      document: "Tutela",
      rating: 5,
      date: "Hace 2 meses",
      comment: "Excelente servicio. La IA realmente optimiza el contenido y el documento final es muy sólido jurídicamente. Me ayudó con una tutela laboral que fue exitosa.",
      verified: true
    },
    {
      id: 6,
      name: "Diego Ramírez",
      location: "Pereira",
      document: "PQRS",
      rating: 4,
      date: "Hace 1 mes",
      comment: "Muy útil para formalizar quejas. El proceso es intuitivo y el documento final se ve muy profesional. Lo recomiendo para cualquier tipo de reclamo.",
      verified: false
    }
  ];

  const stats: Stat[] = [
    { number: "2,847", label: "Documentos generados" },
    { number: "4.8", label: "Calificación promedio" },
    { number: "95%", label: "Casos exitosos" },
    { number: "24h", label: "Tiempo promedio de respuesta" }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const renderStars = (rating: number): React.ReactElement[] => {
    return [...Array(5)].map((_, i) => (
      <StarIcon
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Lo que dicen nuestros <span className="text-indigo-600">usuarios</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Miles de personas han defendido sus derechos con documentos generados en nuestra plataforma
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center bg-white p-6 rounded-xl shadow-lg"
            >
              <div className="text-3xl font-bold text-indigo-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Featured Testimonial */}
        <motion.div
          key={currentTestimonial}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-12 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-600 to-blue-500"></div>
          
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="flex items-start gap-4 mb-4">
                <ChatBubbleLeftRightIcon className="w-8 h-8 text-indigo-200 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    "{testimonials[currentTestimonial].comment}"
                  </p>
                  
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex">
                      {renderStars(testimonials[currentTestimonial].rating)}
                    </div>
                    <span className="text-sm text-gray-500">
                      {testimonials[currentTestimonial].date}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <UserCircleIcon className="w-8 h-8 text-gray-400" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-800">
                          {testimonials[currentTestimonial].name}
                        </span>
                        {testimonials[currentTestimonial].verified && (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            ✓ Verificado
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        {testimonials[currentTestimonial].location} • {testimonials[currentTestimonial].document}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentTestimonial
                    ? 'bg-indigo-600 w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* All Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="flex">
                  {renderStars(testimonial.rating)}
                </div>
                <span className="text-sm text-gray-500">{testimonial.date}</span>
              </div>
              
              <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                "{testimonial.comment}"
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <UserCircleIcon className="w-6 h-6 text-gray-400" />
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium text-gray-800 text-sm">
                        {testimonial.name}
                      </span>
                      {testimonial.verified && (
                        <span className="text-green-500 text-xs">✓</span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500">
                      {testimonial.location}
                    </div>
                  </div>
                </div>
                
                <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
                  {testimonial.document}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              ¿Listo para generar tu documento?
            </h3>
            <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
              Únete a miles de usuarios que han defendido sus derechos exitosamente
            </p>
            <motion.button
              className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Comenzar ahora gratis
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Testimonials;