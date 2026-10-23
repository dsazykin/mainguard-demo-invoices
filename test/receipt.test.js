import test from 'node:test'
import assert from 'node:assert/strict'
import { addItem, createCart } from '../src/cart.js'
import { createInvoice } from '../src/invoice.js'
import { renderReceipt } from '../src/receipt.js'

const tea = { sku: 'TEA', name: 'Green tea', price: 4.5 }
const cup = { sku: 'CUP', name: 'Cup', price: 6 }
const invoice = (options = {}) =>
  createInvoice(addItem(addItem(createCart(), tea, 2), cup, 3), { customer: 'Bea Jansen', ...options })

test('renderReceipt starts with the customer and the item count', () => {
  assert.equal(renderReceipt(invoice())[0], 'Receipt for Bea Jansen (5 items)')
  const single = createInvoice(addItem(createCart(), cup), { customer: 'Bea Jansen' })
  assert.equal(renderReceipt(single)[0], 'Receipt for Bea Jansen (1 item)')
})

test('renderReceipt shows one line per cart line with its total', () => {
  assert.deepEqual(renderReceipt(invoice()).slice(1, 3), ['2 x Green tea  €9.00', '3 x Cup  €18.00'])
})

test('renderReceipt shows the discount when there is one', () => {
  const lines = renderReceipt(invoice({ code: 'FIVEOFF' }))
  assert.deepEqual(lines.slice(-2), ['Discount FIVEOFF  -€5.00', 'Total  €22.00'])
})

test('renderReceipt leaves the discount out when there is none', () => {
  const lines = renderReceipt(invoice())
  assert.equal(lines.length, 4)
  assert.equal(lines.at(-1), 'Total  €27.00')
})

test("renderReceipt prints amounts in the invoice's currency", () => {
  assert.equal(renderReceipt(invoice({ currency: 'USD' })).at(-1), 'Total  $27.00')
})
