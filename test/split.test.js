import test from 'node:test'
import assert from 'node:assert/strict'
import { splitInvoice } from '../src/split.js'

test('splitInvoice splits a total into equal parts', () => {
  assert.deepEqual(splitInvoice(90, 3), [30, 30, 30])
  assert.deepEqual(splitInvoice(25.5, 2), [12.75, 12.75])
})

test('splitInvoice one way returns the whole total', () => {
  assert.deepEqual(splitInvoice(41.2, 1), [41.2])
})

test('splitInvoice refuses anything but a whole number of parts', () => {
  assert.throws(() => splitInvoice(90, 0), RangeError)
  assert.throws(() => splitInvoice(90, 2.5), RangeError)
})

test('splitInvoice refuses a negative total', () => {
  assert.throws(() => splitInvoice(-10, 2), RangeError)
})
