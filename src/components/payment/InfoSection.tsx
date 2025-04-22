const InfoSection = () => (
  <div className="mt-6 bg-white shadow-md rounded-lg p-6 w-full overflow-hidden">
    <h2 className="text-lg font-medium text-gray-800 mb-4">Información importante</h2>
    <div className="space-y-4 text-sm text-gray-600">
      {[
        'Tu documento ha sido verificado por nuestra IA para asegurar la coherencia y el cumplimiento de los requisitos legales básicos.',
        'Una vez realizado el pago, podrás descargar tu documento inmediatamente. No almacenamos tus datos personales ni el contenido de tu documento.',
        'LexaGen no es un sustituto del consejo legal profesional. Para situaciones complejas, te recomendamos consultar con un abogado.'
      ].map((text, idx) => (
        <div key={idx} className="flex items-start">
          <svg className="w-5 h-5 text-indigo-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="flex-1">{text}</p>
        </div>
      ))}
    </div>
  </div>
);

export default InfoSection;
