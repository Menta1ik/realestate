import { Currency } from './components/AppContext'

/**
 * Mock mid-market rates. Base: AED.
 * Replace later with server-side rates or a paid FX provider.
 */
export const AED_RATES: Record<Currency, number> = {
  AED: 1,
  USD: 0.2723,
  EUR: 0.2510,
  GBP: 0.2140,
  CNY: 1.9560,
}

export const CURRENCY_SYMBOL: Record<Currency, string> = {
  AED: 'AED',
  USD: '$',
  EUR: '€',
  GBP: '£',
  CNY: '¥',
}

export function convertFromAED(aed: number, to: Currency) {
  return aed * (AED_RATES[to] ?? 1)
}

export function formatMoney(amount: number, currency: Currency) {
  const sym = CURRENCY_SYMBOL[currency] ?? currency
  const rounded = Math.round(amount)
  const s = rounded.toString()
  const parts: string[] = []
  for (let i = s.length; i > 0; i -= 3) parts.unshift(s.substring(Math.max(0, i - 3), i))
  return `${sym} ${parts.join(currency === 'EUR' ? ' ' : ',')}`
}
