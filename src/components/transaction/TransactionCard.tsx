import {
  ShieldCheckIcon,
  ArrowDownTrayIcon,
} from '@heroicons/react/24/solid';

interface Config {
  bgGradient: string;
  bannerBg: string;
  iconBg: string;
  buttonBg: string;
  title: string;
  message: string;
  showDownload: boolean;
  icon: React.ElementType;
}

interface TransactionDetails {
  transactionId?: string;
  fecha?: string;
  tipoDocumento?: string;
  valor?: number;
  metodoPago?: string;
  reason?: string;
}

interface Props {
  config: Config;
  transactionStatus: string;
  isDownloading: boolean;
  onDownload: () => void;
  onTryAgain: () => void;
  configDetails?: TransactionDetails;
}

export default function TransactionCard({
  config,
  transactionStatus,
  isDownloading,
  onDownload,
  onTryAgain,
  configDetails,
}: Props) {
  const StatusIcon = config.icon;

  return (
    <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden">
      {/* Banner superior */}
      <div className={`${config.bannerBg} p-6 flex items-center justify-center`}>
        <div className="bg-white rounded-full p-3 shadow-lg">
          <StatusIcon className={`h-9 w-9 ${config.iconBg}`} />
        </div>
      </div>

      <div className="p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">{config.title}</h1>
        <p className="text-gray-600 mb-8">{config.message}</p>

        {/* Detalles de la transacción */}
        {transactionStatus !== 'canceled' && configDetails && (
          <div className="bg-gray-50 rounded-2xl p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center justify-center">
              <ShieldCheckIcon className={`h-5 w-5 mr-2 ${config.iconBg}`} />
              Detalles de la Transacción
            </h2>
            <div className="grid grid-cols-2 gap-3 text-left text-sm">
              <div className="text-gray-500">ID Transacción:</div>
              <div className="text-gray-800 font-medium">{configDetails.transactionId || 'N/A'}</div>

              <div className="text-gray-500">Fecha:</div>
              <div className="text-gray-800 font-medium">{configDetails.fecha || 'N/A'}</div>

              <div className="text-gray-500">Documento:</div>
              <div className="text-gray-800 font-medium">
                {configDetails.tipoDocumento || 'Documento Legal'}
              </div>

              <div className="text-gray-500">Valor:</div>
              <div className="text-gray-800 font-medium">
                {configDetails.valor ? `$${configDetails.valor.toLocaleString()} COP` : 'N/A'}
              </div>

              <div className="text-gray-500">Método de pago:</div>
              <div className="text-gray-800 font-medium">
                {configDetails.metodoPago || 'ePayco'}
              </div>

              {transactionStatus === 'rejected' && (
                <>
                  <div className="text-gray-500">Motivo:</div>
                  <div className="text-red-600 font-medium">
                    {configDetails.reason || 'Transacción rechazada'}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Botón de acción */}
        {config.showDownload ? (
          <button
            onClick={onDownload}
            disabled={isDownloading}
            className={`w-full py-4 px-6 ${config.buttonBg} text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center`}
          >
            {isDownloading ? (
              'Procesando...'
            ) : (
              <>
                <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
                Descargar Documentos
              </>
            )}
          </button>
        ) : (
          <button
            onClick={onTryAgain}
            disabled={isDownloading}
            className={`w-full py-4 px-6 ${config.buttonBg} text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center`}
          >
            Volver a Intentar
          </button>
        )}

        {config.showDownload && (
          <p className="mt-4 text-xs text-gray-500">
            Recuerda guardar estos archivos en un lugar seguro. No se almacena información en nuestros servidores.
          </p>
        )}
      </div>
    </div>
  );
}
