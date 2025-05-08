interface HeroSectionProps {
  handleStart: () => void;
  showInfo: boolean;
  setShowInfo: (value: boolean) => void;
}

export default function HeroSection({ handleStart, showInfo, setShowInfo }: HeroSectionProps) {
    return (
      <div className="w-full md:w-1/2 max-w-xl">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Documentos legales <span className="text-indigo-600">simples y efectivos</span>
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Genera documentos legales de calidad siguiendo un proceso guiado paso a paso, sin necesidad de conocimientos jurídicos avanzados.
        </p>
  
        <FeatureList />
  
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <button 
            onClick={handleStart}
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-indigo-700 shadow-md transition-all flex items-center justify-center"
          >
            Comenzar ahora
            <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </button>
          <button 
            onClick={() => setShowInfo(!showInfo)}
            className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-all flex items-center justify-center"
          >
            Más información
          </button>
        </div>
      </div>
    );
  }
  
  function FeatureList() {
    const features = [
      {
        title: '100% anónimo',
        description: 'No guardamos tu información personal',
      },
      {
        title: 'Asistido por IA',
        description: 'GPT-4o-mini verifica y optimiza tu documento',
      },
      {
        title: 'Formatos profesionales',
        description: 'Documentos en PDF y DOCX listos para presentar',
      },
    ];
  
    return (
      <div className="space-y-4">
        {features.map(({ title, description }) => (
          <div className="flex items-start gap-3" key={title}>
            <div className="mt-1 bg-indigo-100 p-1 rounded-full">
              <svg className="w-4 h-4 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-800">{title}</p>
              <p className="text-sm text-gray-600">{description}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
  