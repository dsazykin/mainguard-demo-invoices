import test from 'node:test'
import assert from 'node:assert/strict'
import { formatPrice, roundMoney } from '../src/money.js'

test('roundMoney rounds to whole cents', () => {
  assert.equal(roundMoney(12.344), 12.34)
  assert.equal(roundMoney(12.346), 12.35)
})

test('roundMoney rounds half a cent away from zero', () => {
  assert.equal(roundMoney(1.005), 1.01)
  assert.equal(roundMoney(-1.005), -1.01)
})

test('roundMoney absorbs floating-point noise', () => {
  assert.equal(roundMoney(0.1 + 0.2), 0.3)
})

test('formatPrice shows euros with two decimals and the EUR code', () => {
  assert.equal(formatPrice(12.5), '12.50 EUR')
  assert.equal(formatPrice(7), '7.00 EUR')
})

test('formatPrice uses the code of the currency it is given', () => {
  assert.equal(formatPrice(3.2, 'GBP'), '3.20 GBP')
  assert.equal(formatPrice(1250, 'USD'), '1250.00 USD')
})

test('formatPrice puts the minus sign before the number', () => {
  assert.equal(formatPrice(-3, 'EUR'), '-3.00 EUR')
})

test('formatPrice never shows a negative zero', () => {
  assert.equal(formatPrice(-0.001), '0.00 EUR')
})

test('formatPrice refuses a currency it does not know', () => {
  assert.throws(() => formatPrice(1, 'XYZ'), RangeError)
})
