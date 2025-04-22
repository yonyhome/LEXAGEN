// src/services/paymentService.ts
import apiClient from './apiClient';

export interface TransactionStatus {
  status: 'success' | 'rejected' | 'canceled' | 'expired' | 'unknown';
  details?: any;
  downloadUrl?: string;
}

export async function getTransactionStatus(token: string): Promise<TransactionStatus> {
  if (!token) {
    throw new Error('Token es requerido para verificar la transacción');
  }

  try {
    const response = await apiClient.get<TransactionStatus>(
      `/getTransactionStatus?token=${encodeURIComponent(token)}`
    );
    return response.data;
  } catch (error: any) {
    console.error('[getTransactionStatus] Error:', error);
    // Podrías inspeccionar error.response.status para manejar 403, 404, etc.
    throw new Error('No se pudo obtener el estado de la transacción');
  }
}


export async function savePaymentOptionRest(token: string, option: 'pdf' | 'pdf-word') {
  try {
    const response = await apiClient.post('/savePaymentOptionRest', { token, option });
    return response.data;
  } catch (error) {
    console.error('[savePaymentOptionRest] Error:', error);
    throw new Error('No se pudo guardar la opción de pago');
  }
}
