import { useLocation, useNavigate } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === '/';
  const isWizard = location.pathname === '/wizard';
  const isPayment = location.pathname === '/payment';

  const showHelp = isHome;
  const showBadge = isHome;
  const showBackToHome = isWizard || isPayment;
  const showBack = !isHome && !showBackToHome;

  const handleBack = () => {
    if (showBackToHome) {
      navigate('/');
    } else {
      navigate(-1);
    }
  };

  return (
    <header className="w-full px-6 py-4 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="text-indigo-700 font-bold text-2xl tracking-tight">
            LexaGen
          </div>
          {showBadge && (
            <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              Beta
            </span>
          )}
        </div>

        <div className="flex items-center gap-6">
          {showHelp && (
            <button className="text-gray-600 hover:text-indigo-700 transition-colors duration-200 font-medium">
              Ayuda
            </button>
          )}
          
          {(showBackToHome || showBack) && (
            <button
              onClick={handleBack}
              className="text-gray-600 hover:text-indigo-700 transition-colors duration-200 font-medium flex items-center gap-1.5 group"
            >
              <svg 
                className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M10 19l-7-7m0 0l7-7m-7 7h18" 
                />
              </svg>
              <span>{showBackToHome ? 'Volver al inicio' : 'Volver'}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}