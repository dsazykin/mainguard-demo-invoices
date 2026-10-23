import test from 'node:test'
import assert from 'node:assert/strict'
import { addItem, createCart } from '../src/cart.js'
import { applyDiscount, describeDiscount, discountCodes } from '../src/discounts.js'

const book = { sku: 'BOOK', name: 'Book', price: 12.5 }
const cartOf = (quantity, item = book) => addItem(createCart(), item, quantity)

test('WELCOME10 takes 10% off the subtotal', () => {
  assert.equal(applyDiscount(cartOf(2), 'WELCOME10'), 2.5)
})

test("WELCOME10's discount is rounded to the cent", () => {
  assert.equal(applyDiscount(cartOf(1, { sku: 'MUG', name: 'Mug', price: 9.99 }), 'WELCOME10'), 1)
})

test('FIVEOFF takes 5.00 off an order of 25.00 or more', () => {
  assert.equal(applyDiscount(cartOf(2), 'FIVEOFF'), 5)
})

test('FIVEOFF takes nothing off an order under 25.00', () => {
  assert.equal(applyDiscount(cartOf(1), 'FIVEOFF'), 0)
})

test('discount codes are not case-sensitive', () => {
  assert.equal(applyDiscount(cartOf(2), 'welcome10'), 2.5)
})

test('no code takes nothing off', () => {
  assert.equal(applyDiscount(cartOf(2)), 0)
  assert.equal(applyDiscount(cartOf(2), ''), 0)
})

test('an unknown code is refused', () => {
  assert.throws(() => applyDiscount(cartOf(2), 'FREEBIE'), RangeError)
})

test('an empty cart never gets a discount', () => {
  for (const code of discountCodes()) {
    assert.equal(applyDiscount(createCart(), code), 0, code)
  }
})

test('describeDiscount names the minimum spend in the currency given', () => {
  assert.equal(describeDiscount('FIVEOFF', 'GBP'), '£5.00 off orders of £25.00 or more')
})
