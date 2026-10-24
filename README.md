# mainguard-demo-invoices

A small invoices library for Node: carts, discount codes, invoices, printable receipts and split
payments. Plain JavaScript modules, no dependencies, tested with Node's own test runner.

```sh
npm test
```

## API

Everything is exported from `src/index.js`.

| Function | Module | What it does |
|---|---|---|
| `roundMoney(amount)` | `money.js` | Rounds an amount to whole cents, half away from zero. |
| `currencies()` | `money.js` | The ISO 4217 codes of the currencies the library knows. |
| `currencyInfo(code)` | `money.js` | A currency's entry in the table: its minor-unit digits and its symbol. |
| `formatPrice(amount, currency)` | `money.js` | An amount for people to read, in the currency given. |
| `createCart()` | `cart.js` | An empty cart. |
| `addItem(cart, item, quantity)` | `cart.js` | A cart with `quantity` more of an item. |
| `removeItem(cart, sku)` | `cart.js` | A cart without any unit of a sku. |
| `lineTotal(line)` | `cart.js` | One line's price times its quantity. |
| `cartSubtotal(cart)` | `cart.js` | The total of every line. |
| `itemCount(cart)` | `cart.js` | How many units the cart holds. |
| `discountCodes()` | `discounts.js` | Every code the shop accepts. |
| `applyDiscount(cart, code)` | `discounts.js` | How much a code takes off a cart. |
| `describeDiscount(code, currency)` | `discounts.js` | A code's offer, in words for a customer. |
| `createInvoice(cart, options)` | `invoice.js` | Freezes a cart into an invoice for a customer. |
| `invoiceTotal(invoice)` | `invoice.js` | What the customer pays. |
| `renderReceipt(invoice)` | `receipt.js` | A printable receipt, one string per line. |
| `splitInvoice(total, ways)` | `split.js` | A total split into equal payments. |

## Why this repository exists

It was written for the Mainguard demo, the way a benchmark task is written: a small, ordinary
codebase that coding agents are given real tasks in, so that a recording of what they did, and of
what Mainguard's verifier did about it, can be published and checked by anyone. It is not a product,
and nobody uses it to send invoices.

Changes land on `develop`.

## Licence

MIT. See [LICENSE](LICENSE).
