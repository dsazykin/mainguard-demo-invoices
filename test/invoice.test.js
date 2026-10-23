import test from 'node:test'
import assert from 'node:assert/strict'
import { addItem, createCart } from '../src/cart.js'
import { createInvoice, invoiceTotal } from '../src/invoice.js'

const lamp = { sku: 'LAMP', name: 'Desk lamp', price: 18 }
const bulb = { sku: 'BULB', name: 'Bulb', price: 2.25 }
const cart = () => addItem(addItem(createCart(), lamp), bulb, 4)

test('createInvoice records the customer, the currency and the lines', () => {
  const invoice = createInvoice(cart(), { customer: 'Acme Ltd', currency: 'GBP' })
  assert.equal(invoice.customer, 'Acme Ltd')
  assert.equal(invoice.currency, 'GBP')
  assert.deepEqual(invoice.lines.map((line) => [line.sku, line.quantity]), [['LAMP', 1], ['BULB', 4]])
})

test('createInvoice copies the lines, so later changes to the cart do not reach it', () => {
  const source = cart()
  const invoice = createInvoice(source, { customer: 'Acme Ltd' })
  source.lines[0].quantity = 99
  assert.equal(invoice.lines[0].quantity, 1)
})

test('createInvoice records the discount the code gave', () => {
  const invoice = createInvoice(cart(), { customer: 'Acme Ltd', code: 'FIVEOFF' })
  assert.equal(invoice.subtotal, 27)
  assert.equal(invoice.discount, 5)
})

test('createInvoice stores the code in capitals', () => {
  assert.equal(createInvoice(cart(), { customer: 'Acme Ltd', code: 'welcome10' }).code, 'WELCOME10')
})

test('createInvoice refuses an invoice without a customer', () => {
  assert.throws(() => createInvoice(cart(), {}), TypeError)
})

test('createInvoice refuses an empty cart', () => {
  assert.throws(() => createInvoice(createCart(), { customer: 'Acme Ltd' }), RangeError)
})

test('createInvoice refuses a currency the library cannot show', () => {
  assert.throws(() => createInvoice(cart(), { customer: 'Acme Ltd', currency: 'XYZ' }), RangeError)
})

test('invoiceTotal is the subtotal less the discount', () => {
  assert.equal(invoiceTotal(createInvoice(cart(), { customer: 'Acme Ltd', code: 'WELCOME10' })), 24.3)
  assert.equal(invoiceTotal(createInvoice(cart(), { customer: 'Acme Ltd' })), 27)
})
