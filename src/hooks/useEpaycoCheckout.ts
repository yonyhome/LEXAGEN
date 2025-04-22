// src/hooks/useEpaycoCheckout.ts
import { useContext } from 'react';
import { savePaymentOptionRest } from '../services/paymentService';
import { FormContext } from '../context/FormContext';

declare global {
  interface Window {
    ePayco: any;
  }
}

interface CheckoutParams {
  token: string;
  price: number;
  description: string;
  option: 'pdf' | 'pdf-word';
}

export function useEpaycoCheckout() {
  const { formData } = useContext(FormContext);

  const launchCheckout = async ({ token, price, description, option}: CheckoutParams) => {
    if (!window.ePayco) {
      alert('No se ha cargado correctamente el script de ePayco');
      return;
    }

    // Guardamos la opción de pago en backend
    try {
      await savePaymentOptionRest(token, option);
    } catch (err) {
      console.error('[ePayco] Error al guardar la opción de pago:', err);
      alert('No se pudo guardar la opción de pago. Intenta de nuevo.');
      return;
    }

    // Configuración del handler de ePayco
    const handler = window.ePayco.checkout.configure({
      key: import.meta.env.VITE_EPAYCO_PUBLIC_KEY,
      test: true // Cambiar a false en producción
    });

    // Lanzamos el checkout
    handler.open({
      external: true,
      name: description,
      description: description,
      invoice: token,
      currency: 'cop',
      amount: price.toFixed(0),
      tax_base: '0',
      tax: '0',
      country: 'co',
      lang: 'es',
      email: formData.contacto.email,
      email_billing: formData.contacto.email,
      response: `${window.location.origin}/payment-result`,
      confirmation: "https://us-central1-lexagen-e6d7f.cloudfunctions.net/confirmTransactionWebhook",
      method: 'POST'
    });
  };

  return { launchCheckout };
}