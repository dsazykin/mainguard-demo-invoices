import { roundMoney } from './money.js'

// A cart is { lines: [{ sku, name, price, quantity }] }. The functions here never change the cart
// they are given; they return a new one.

export function createCart() {
  return { lines: [] }
}

/** Adds `quantity` of an item. Adding a sku the cart already holds raises that line's quantity. */
export function addItem(cart, { sku, name, price }, quantity = 1) {
  if (!Number.isInteger(quantity) || quantity < 1) {
    throw new RangeError(`quantity must be a whole number of at least 1, not ${quantity}`)
  }
  if (!(price >= 0)) throw new RangeError(`price must not be negative, not ${price}`)

  const existing = cart.lines.find((line) => line.sku === sku)
  if (existing) {
    return {
      ...cart,
      lines: cart.lines.map((line) => (line === existing ? { ...line, quantity: line.quantity + quantity } : line)),
    }
  }
  return { ...cart, lines: [...cart.lines, { sku, name, price, quantity }] }
}

export function removeItem(cart, sku) {
  return { ...cart, lines: cart.lines.filter((line) => line.sku !== sku) }
}

export function lineTotal(line) {
  return roundMoney(line.price * line.quantity)
}

export function cartSubtotal(cart) {
  return roundMoney(cart.lines.reduce((sum, line) => sum + lineTotal(line), 0))
}

/** How many items the cart holds, counting every unit of every line. */
export function itemCount(cart) {
  return cart.lines.map((line) => line.quantity).reduce((a, b) => a + b)
}
