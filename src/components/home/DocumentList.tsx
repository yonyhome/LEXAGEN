export default function DocumentList() {
  const documents = [
    {
      title: 'Derecho de Petición',
      description: 'Solicita información o acciones a entidades',
      icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414',
    },
    {
      title: 'Tutela',
      description: 'Protege tus derechos fundamentales',
      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    },
    {
      title: 'PQRS',
      description: 'Peticiones, quejas, reclamos y sugerencias',
      icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z',
    },
  ];

  return (
    <div className="w-full md:w-1/3 max-w-md">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-indigo-600 px-6 py-4">
          <h3 className="text-white font-medium">Documentos disponibles</h3>
        </div>
        <div className="p-6 space-y-4">
          {documents.map(doc => (
            <div
              key={doc.title}
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors"
            >
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-indigo-100 rounded-lg">
                <svg className="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={doc.icon}></path>
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800">{doc.title}</p>
                <p className="text-sm text-gray-600">{doc.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
