import { roundMoney } from './money.js'

/** Splits an invoice total into `ways` equal payments, for customers who pay in instalments or share a bill. */
export function splitInvoice(total, ways) {
  if (!Number.isInteger(ways) || ways < 1) throw new RangeError(`cannot split into ${ways} parts`)
  if (total <= 0) throw new RangeError(`nothing to split: the total is ${total}`)

  const part = roundMoney(total / ways)
  return Array.from({ length: ways }, () => part)
}
