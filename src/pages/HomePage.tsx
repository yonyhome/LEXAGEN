import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/home/HeroSection';
import DocumentList from '../components/home/DocumentList';
import PrivacyModal from '../components/home/PrivacyModal';

export default function HomePage() {
  const navigate = useNavigate();
  const [showInfo, setShowInfo] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleStart = () => {
    navigate('/wizard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col">
      <Header />

      <main className={`flex-1 flex flex-col md:flex-row items-center justify-center gap-8 px-6 transition-opacity duration-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
        <HeroSection handleStart={handleStart} showInfo={showInfo} setShowInfo={setShowInfo} />
        <DocumentList />
      </main>
      {showInfo && <PrivacyModal onClose={() => setShowInfo(false)} />}
      
      <Footer />
    </div>
  );
}
