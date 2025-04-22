const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function processDocument(formData: any) {
  const res = await fetch(`${BASE_URL}/processDocumentRequest`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ formData }),
  });

  if (!res.ok) throw new Error('Error en la API');
  return await res.json();
}

export async function getTransactionStatus(token: string) {
  const res = await fetch(`${BASE_URL}/getTransactionStatusRest`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token }),
  });

  if (!res.ok) throw new Error('No se pudo verificar el estado de la transacción.');
  return await res.json();
}
