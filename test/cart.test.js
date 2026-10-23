import test from 'node:test'
import assert from 'node:assert/strict'
import { addItem, cartSubtotal, createCart, itemCount, removeItem } from '../src/cart.js'

const pen = { sku: 'PEN', name: 'Pen', price: 1.15 }
const pad = { sku: 'PAD', name: 'Notepad', price: 0.1 }

test('a new cart is empty', () => {
  assert.deepEqual(createCart(), { lines: [] })
})

test('addItem adds a line with the quantity given', () => {
  const cart = addItem(createCart(), pen, 3)
  assert.deepEqual(cart.lines, [{ sku: 'PEN', name: 'Pen', price: 1.15, quantity: 3 }])
})

test('addItem raises the quantity of a sku already in the cart', () => {
  const cart = addItem(addItem(createCart(), pen, 2), pen)
  assert.equal(cart.lines.length, 1)
  assert.equal(cart.lines[0].quantity, 3)
})

test('addItem leaves the cart it was given unchanged', () => {
  const before = addItem(createCart(), pen)
  addItem(before, pen, 4)
  assert.equal(before.lines[0].quantity, 1)
})

test('addItem refuses a quantity below one', () => {
  assert.throws(() => addItem(createCart(), pen, 0), RangeError)
  assert.throws(() => addItem(createCart(), pen, 1.5), RangeError)
})

test('addItem refuses a negative price', () => {
  assert.throws(() => addItem(createCart(), { ...pen, price: -1 }), RangeError)
})

test('removeItem drops every unit of a sku', () => {
  const cart = removeItem(addItem(addItem(createCart(), pen, 5), pad), 'PEN')
  assert.deepEqual(cart.lines.map((line) => line.sku), ['PAD'])
})

test('cartSubtotal adds up every line', () => {
  const cart = addItem(addItem(createCart(), pad, 3), pen, 2)
  assert.equal(cartSubtotal(cart), 2.6)
})

test('itemCount counts every unit, not every line', () => {
  const cart = addItem(addItem(createCart(), pen, 4), pad, 2)
  assert.equal(itemCount(cart), 6)
})
