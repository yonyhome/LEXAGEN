import apiClient from './apiClient';

export async function submitFormData(formData: any) {
  const response = await apiClient.post('/processDocumentRequest', { formData });
  return response.data;
}
