// src/hooks/useEpaycoCheckout.ts
import { useContext } from 'react'
import { savePaymentOptionRest } from '../services/paymentService'
import { FormContext } from '../context/FormContext'
import { CheckoutParams } from '../types/checkoutTypes'


declare global {
  interface Window {
    ePayco: any
  }
}


export function useEpaycoCheckout() {
  const { formData } = useContext(FormContext)

  const launchCheckout = async ({
    token,
    email,
    name,
    price,
    description,
    option,
  }: CheckoutParams) => {
    // Logueamos en consola todo lo que enviamos
    console.log('[ePayco] Launching checkout with params:', {
      token,
      email,
      name,
      price,
      description,
      option,
    })

    if (!window.ePayco) {
      alert('No se ha cargado correctamente el script de ePayco')
      return
    }

    // Guardamos la opción de pago en el backend
    try {
      await savePaymentOptionRest(token, option)
    } catch (err) {
      console.error('[ePayco] Error al guardar la opción de pago:', err)
      alert('No se pudo guardar la opción de pago. Intenta de nuevo.')
      return
    }

    const handler = window.ePayco.checkout.configure({
      key: import.meta.env.VITE_EPAYCO_PUBLIC_KEY,
      test: import.meta.env.NODE_ENV !== 'production',
    })

    handler.open({
      external: false,
      name,
      description,
      invoice: token,
      currency: 'cop',
      amount: price,                              // número en lugar de string
      tax_base: '0',
      tax: '0',
      country: 'co',
      lang: 'es',
      email_billing: formData.contacto,           // correo de facturación
      response: `${window.location.origin}/payment-result?token=${token}`,
      confirmation:
        'https://us-central1-lexagen-e6d7f.cloudfunctions.net/confirmTransactionWebhook',
      method: 'POST',
    })
  }

  return { launchCheckout }
}
