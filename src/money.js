// Amounts are plain numbers in the currency's major unit (12.5 is twelve euros fifty).
// Every amount the library hands back has been through roundMoney.

const CURRENCIES = ['EUR', 'GBP', 'USD']

/** Rounds to whole cents, half away from zero. */
export function roundMoney(amount) {
  const cents = Math.round(Math.abs(amount) * 100 + Number.EPSILON * 100)
  return Math.sign(amount) * cents / 100
}

/** The currencies formatPrice knows. */
export function currencies() {
  return [...CURRENCIES]
}

/** An amount for people to read, with its currency code: "12.50 EUR", "-3.00 GBP". */
export function formatPrice(amount, currency = 'EUR') {
  if (!CURRENCIES.includes(currency)) throw new RangeError(`unknown currency: ${currency}`)
  const rounded = roundMoney(amount)
  const sign = rounded < 0 ? '-' : ''
  return `${sign}${Math.abs(rounded).toFixed(2)} ${currency}`
}
