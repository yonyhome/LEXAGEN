import { useContext } from 'react';
import { savePaymentOptionRest } from '../services/paymentService';
import { FormContext } from '../context/FormContext'; // Asegúrate que el path sea correcto

declare global {
  interface Window {
    ePayco: any;
  }
}

interface CheckoutParams {
  token: string;
  email: string;
  name: string;
  price: number;
  description: string;
  option: 'pdf' | 'pdf-word';
}

export function useEpaycoCheckout() {
  const { formData } = useContext(FormContext);

  const launchCheckout = async ({
    token,
    email,
    name,
    price,
    description,
    option,
  }: CheckoutParams) => {
    if (!window.ePayco) {
      alert("No se ha cargado correctamente el script de ePayco");
      return;
    }

    try {
      await savePaymentOptionRest(token, option);
    } catch (err) {
      console.error('[ePayco] Error al guardar la opción de pago:', err);
      alert('No se pudo guardar la opción de pago. Intenta de nuevo.');
      return;
    }

    const handler = window.ePayco.checkout.configure({
      key: import.meta.env.VITE_EPAYCO_PUBLIC_KEY,
      test: true, // Cambiar a false en producción
    });

    handler.open({
      external: true,
      name,
      description,
      invoice: token,
      currency: 'cop',
      amount: price.toFixed(0),
      tax_base: '0',
      tax: '0',
      country: 'co',
      lang: 'es',
      email,
      email_billing: formData.contacto, // ✅ Usamos el contacto del form como email_billing
      response: `${window.location.origin}/payment-result?token=${token}`, // ✅ Ahora usamos el token
      confirmation: 'https://us-central1-lexagen-e6d7f.cloudfunctions.net/confirmTransactionWebhook',
      method: 'POST',
    });
  };

  return { launchCheckout };
}
