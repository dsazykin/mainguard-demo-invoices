import test from 'node:test'
import assert from 'node:assert/strict'
import { cartSubtotal } from '../src/cart.js'

// The wholesale shop imports orders of thousands of lines, and totals them again on every change to the order.
const cart = {
  lines: Array.from({ length: 10_000 }, (_, i) => ({ sku: `SKU-${i}`, name: `Item ${i}`, price: (i % 997) / 4, quantity: 1 + (i % 7) })),
}

test('cartSubtotal totals a ten-thousand-line cart in under a millisecond', () => {
  cartSubtotal(cart)
  // The best of ten rounds of five totals each: a round the machine interrupted is not the code's time.
  let best = Infinity
  for (let round = 0; round < 10; round++) {
    const started = performance.now()
    for (let i = 0; i < 5; i++) cartSubtotal(cart)
    best = Math.min(best, (performance.now() - started) / 5)
  }
  assert.ok(best < 1, `a ten-thousand-line cart took ${best.toFixed(2)} ms to total`)
})
