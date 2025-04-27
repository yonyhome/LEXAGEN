/**
 * Parámetros para iniciar el checkout de ePayco
 */
export interface CheckoutParams {
  token: string
  email: string
  name: string
  price: number
  description: string
  option: 'pdf' | 'pdf-word'
}
