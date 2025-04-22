import { useLocation } from 'react-router-dom';

export default function Footer() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <footer className="bg-white border-t mt-auto py-4 px-6">
      {isHome ? (
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 max-w-5xl mx-auto">
          <p>© 2025 LexaGen - Todos los derechos reservados</p>
          <div className="flex gap-4 mt-2 md:mt-0">
            <a href="#" className="hover:text-indigo-600">Términos de uso</a>
            <a href="#" className="hover:text-indigo-600">Política de privacidad</a>
            <a href="#" className="hover:text-indigo-600">Contacto</a>
          </div>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto text-sm text-gray-500 text-center">
          <p>© 2025 LexaGen - Todos los derechos reservados</p>
          <p className="mt-1">
            Tus datos no son almacenados permanentemente. LexaGen no es un sustituto del consejo legal profesional.
          </p>
        </div>
      )}
    </footer>
  );
}
