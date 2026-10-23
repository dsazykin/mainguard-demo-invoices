import { cartSubtotal } from './cart.js'
import { currencies, roundMoney } from './money.js'
import { applyDiscount } from './discounts.js'

/**
 * Freezes a cart into an invoice for `customer`. The discount is worked out once, here, so an invoice
 * keeps the amount it was issued with.
 */
export function createInvoice(cart, { customer, code = null, currency = 'EUR' } = {}) {
  if (!customer) throw new TypeError('an invoice needs a customer')
  if (cart.lines.length === 0) throw new RangeError('cannot invoice an empty cart')
  if (!currencies().includes(currency)) throw new RangeError(`unknown currency: ${currency}`)

  return {
    customer,
    currency,
    lines: cart.lines.map((line) => ({ ...line })),
    code: code ? String(code).toUpperCase() : null,
    subtotal: cartSubtotal(cart),
    discount: applyDiscount(cart, code),
  }
}

/** What the customer pays. */
export function invoiceTotal(invoice) {
  return roundMoney(invoice.subtotal - invoice.discount)
}
