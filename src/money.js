// Amounts are plain numbers in the currency's major unit (12.5 is twelve euros fifty).
// Every amount the library hands back has been through roundMoney.

// ISO 4217: every currency in use, with how many digits its minor unit has (2 for cents), and the symbol the
// library prints for the ones that have one. A currency without a symbol is printed with its code.
const CURRENCIES = {
  AED: { digits: 2 }, AFN: { digits: 2 }, ALL: { digits: 2 }, AMD: { digits: 2 }, AOA: { digits: 2 },
  ARS: { digits: 2 }, AUD: { digits: 2, symbol: 'A$' }, AWG: { digits: 2 }, AZN: { digits: 2 }, BAM: { digits: 2 },
  BBD: { digits: 2 }, BDT: { digits: 2 }, BGN: { digits: 2 }, BHD: { digits: 3 }, BIF: { digits: 0 },
  BMD: { digits: 2 }, BND: { digits: 2 }, BOB: { digits: 2 }, BRL: { digits: 2, symbol: 'R$' }, BSD: { digits: 2 },
  BTN: { digits: 2 }, BWP: { digits: 2 }, BYN: { digits: 2 }, BZD: { digits: 2 }, CAD: { digits: 2, symbol: 'C$' },
  CDF: { digits: 2 }, CHF: { digits: 2 }, CLP: { digits: 0 }, CNY: { digits: 2 }, COP: { digits: 2 },
  CRC: { digits: 2 }, CUP: { digits: 2 }, CVE: { digits: 2 }, CZK: { digits: 2 }, DJF: { digits: 0 },
  DKK: { digits: 2 }, DOP: { digits: 2 }, DZD: { digits: 2 }, EGP: { digits: 2 }, ERN: { digits: 2 },
  ETB: { digits: 2 }, EUR: { digits: 2, symbol: '€' }, FJD: { digits: 2 }, FKP: { digits: 2 }, GBP: { digits: 2, symbol: '£' },
  GEL: { digits: 2 }, GHS: { digits: 2 }, GIP: { digits: 2 }, GMD: { digits: 2 }, GNF: { digits: 0 },
  GTQ: { digits: 2 }, GYD: { digits: 2 }, HKD: { digits: 2 }, HNL: { digits: 2 }, HTG: { digits: 2 },
  HUF: { digits: 2 }, IDR: { digits: 2 }, ILS: { digits: 2 }, INR: { digits: 2, symbol: '₹' }, IQD: { digits: 3 },
  IRR: { digits: 2 }, ISK: { digits: 0 }, JMD: { digits: 2 }, JOD: { digits: 3 }, JPY: { digits: 0, symbol: '¥' },
  KES: { digits: 2 }, KGS: { digits: 2 }, KHR: { digits: 2 }, KMF: { digits: 0 }, KPW: { digits: 2 },
  KRW: { digits: 0 }, KWD: { digits: 3 }, KYD: { digits: 2 }, KZT: { digits: 2 }, LAK: { digits: 2 },
  LBP: { digits: 2 }, LKR: { digits: 2 }, LRD: { digits: 2 }, LSL: { digits: 2 }, LYD: { digits: 3 },
  MAD: { digits: 2 }, MDL: { digits: 2 }, MGA: { digits: 2 }, MKD: { digits: 2 }, MMK: { digits: 2 },
  MNT: { digits: 2 }, MOP: { digits: 2 }, MRU: { digits: 2 }, MUR: { digits: 2 }, MVR: { digits: 2 },
  MWK: { digits: 2 }, MXN: { digits: 2 }, MYR: { digits: 2 }, MZN: { digits: 2 }, NAD: { digits: 2 },
  NGN: { digits: 2 }, NIO: { digits: 2 }, NOK: { digits: 2 }, NPR: { digits: 2 }, NZD: { digits: 2 },
  OMR: { digits: 3 }, PAB: { digits: 2 }, PEN: { digits: 2 }, PGK: { digits: 2 }, PHP: { digits: 2 },
  PKR: { digits: 2 }, PLN: { digits: 2 }, PYG: { digits: 0 }, QAR: { digits: 2 }, RON: { digits: 2 },
  RSD: { digits: 2 }, RUB: { digits: 2 }, RWF: { digits: 0 }, SAR: { digits: 2 }, SBD: { digits: 2 },
  SCR: { digits: 2 }, SDG: { digits: 2 }, SEK: { digits: 2 }, SGD: { digits: 2 }, SHP: { digits: 2 },
  SLE: { digits: 2 }, SOS: { digits: 2 }, SRD: { digits: 2 }, SSP: { digits: 2 }, STN: { digits: 2 },
  SVC: { digits: 2 }, SYP: { digits: 2 }, SZL: { digits: 2 }, THB: { digits: 2 }, TJS: { digits: 2 },
  TMT: { digits: 2 }, TND: { digits: 3 }, TOP: { digits: 2 }, TRY: { digits: 2 }, TTD: { digits: 2 },
  TWD: { digits: 2 }, TZS: { digits: 2 }, UAH: { digits: 2 }, UGX: { digits: 0 }, USD: { digits: 2, symbol: '$' },
  UYU: { digits: 2 }, UZS: { digits: 2 }, VES: { digits: 2 }, VND: { digits: 0 }, VUV: { digits: 0 },
  WST: { digits: 2 }, XAF: { digits: 0 }, XCD: { digits: 2 }, XOF: { digits: 0 }, XPF: { digits: 0 },
  YER: { digits: 2 }, ZAR: { digits: 2 }, ZMW: { digits: 2 }, ZWG: { digits: 2 },
}

/** Rounds to whole cents, half away from zero. */
export function roundMoney(amount) {
  const cents = Math.round(Math.abs(amount) * 100 + Number.EPSILON * 100)
  return Math.sign(amount) * cents / 100
}

/** The currencies the library knows, by ISO 4217 code. */
export function currencies() {
  return Object.keys(CURRENCIES)
}

/** A currency's entry in the table: `{ digits, symbol }`. Refuses a code the table does not hold. */
export function currencyInfo(code) {
  if (!currencies().includes(code)) throw new RangeError(`unknown currency: ${code}`)
  return CURRENCIES[code]
}

/** An amount for people to read: "€12.50", "-£3.00". */
export function formatPrice(amount, currency = 'EUR') {
  const symbol = currencyInfo(currency).symbol ?? `${currency} `
  const rounded = roundMoney(amount)
  const sign = rounded < 0 ? '-' : ''
  return `${sign}${symbol}${Math.abs(rounded).toFixed(2)}`
}
