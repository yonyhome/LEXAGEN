import apiClient from './apiClient';

export async function getTransactionStatus(refPayco: string) {
  try {
    const response = await apiClient.get(`/getTransactionStatus?ref_payco=${refPayco}`);
    return response.data;
  } catch (error) {
    console.error('[getTransactionStatus] Error:', error);
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
