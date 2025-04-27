import apiClient from './apiClient';
import { FormData } from '../types/formTypes';
import { BackendResponse } from '../types/BackendResponse';

export async function submitFormData(
  formData: FormData
): Promise<BackendResponse> {
  const response = await apiClient.post<BackendResponse>(
    '/processDocumentRequest',
    { formData }
  );
  return response.data;
}
