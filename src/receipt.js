import { itemCount, lineTotal } from './cart.js'
import { formatPrice } from './money.js'
import { invoiceTotal } from './invoice.js'

/** A printable receipt for an invoice, one string per line. */
export function renderReceipt(invoice) {
  const price = (amount) => formatPrice(amount, invoice.currency)
  const count = itemCount(invoice)
  const out = [`Receipt for ${invoice.customer} (${count} ${count === 1 ? 'item' : 'items'})`]

  for (const line of invoice.lines) {
    out.push(`${line.quantity} x ${line.name}  ${price(lineTotal(line))}`)
  }
  if (invoice.discount > 0) out.push(`Discount ${invoice.code}  -${price(invoice.discount)}`)
  out.push(`Total  ${price(invoiceTotal(invoice))}`)
  return out
}

/** One line for an invoice: "Bea Jansen: 5 items, €27.00". */
export function invoiceSummary(invoice) {
  const count = itemCount(invoice)
  const total = formatPrice(invoiceTotal(invoice), invoice.currency)
  return `${invoice.customer}: ${count} ${count === 1 ? 'item' : 'items'}, ${total}`
}
