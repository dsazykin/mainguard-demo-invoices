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

test('formatPrice shows euros with the euro sign and two decimals', () => {
  assert.equal(formatPrice(12.5), '€12.50')
  assert.equal(formatPrice(7), '€7.00')
})

test('formatPrice uses the symbol of the currency it is given', () => {
  assert.equal(formatPrice(3.2, 'GBP'), '£3.20')
  assert.equal(formatPrice(1250, 'USD'), '$1250.00')
})

test('formatPrice puts the minus sign before the symbol', () => {
  assert.equal(formatPrice(-3, 'EUR'), '-€3.00')
})

test('formatPrice refuses a currency it does not know', () => {
  assert.throws(() => formatPrice(1, 'XYZ'), RangeError)
})
