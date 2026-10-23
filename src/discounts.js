import { cartSubtotal } from './cart.js'
import { formatPrice, roundMoney } from './money.js'

// Each code knows how much it takes off a cart, and how to describe itself to a customer.
const CODES = {
  WELCOME10: {
    describe: () => '10% off your first order',
    amount: (cart) => cartSubtotal(cart) * 0.1,
  },
  FIVEOFF: {
    describe: (currency) => `${formatPrice(5, currency)} off orders of ${formatPrice(25, currency)} or more`,
    amount: (cart) => (cartSubtotal(cart) >= 25 ? 5 : 0),
  },
}

function lookup(code) {
  const found = CODES[String(code).toUpperCase()]
  if (!found) throw new RangeError(`unknown discount code: ${code}`)
  return found
}

/** Every code the shop accepts. */
export function discountCodes() {
  return Object.keys(CODES)
}

/** How much `code` takes off `cart`. No code at all takes nothing off. Codes are not case-sensitive. */
export function applyDiscount(cart, code) {
  if (code === undefined || code === null || code === '') return 0
  return roundMoney(lookup(code).amount(cart))
}

export function describeDiscount(code, currency = 'EUR') {
  return lookup(code).describe(currency)
}
