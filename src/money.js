// Amounts are plain numbers in the currency's major unit (12.5 is twelve euros fifty).
// Every amount the library hands back has been through roundMoney.

const SYMBOLS = {
  EUR: '€',
  GBP: '£',
  USD: '$',
}

/** Rounds to whole cents, half away from zero. */
export function roundMoney(amount) {
  const cents = Math.round(Math.abs(amount) * 100 + Number.EPSILON * 100)
  return Math.sign(amount) * cents / 100
}

/** The currencies formatPrice knows. */
export function currencies() {
  return Object.keys(SYMBOLS)
}

/** An amount for people to read: "€12.50", "-£3.00". */
export function formatPrice(amount, currency = 'EUR') {
  const symbol = SYMBOLS[currency]
  if (!symbol) throw new RangeError(`unknown currency: ${currency}`)
  const rounded = roundMoney(amount)
  const sign = rounded < 0 ? '-' : ''
  return `${sign}${symbol}${Math.abs(rounded).toFixed(2)}`
}
