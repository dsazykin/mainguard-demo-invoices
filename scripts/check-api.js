// The checks `npm test` runs after the suite.
//
// The public API is src/index.js, and the README's API table documents it, so the three must agree: every function a
// module in src/ exports is exported from src/index.js, and every one of them has a row in the table.
//
// invoices.json holds the shop's invoice counter. The repository's copy starts every shop at zero.
import { readFileSync, readdirSync } from 'node:fs'

const root = new URL('../', import.meta.url)
const problems = []

const functions = (module) => Object.keys(module).filter((name) => typeof module[name] === 'function')

const index = new Set(functions(await import(new URL('src/index.js', root))))
const exported = new Map()
for (const file of readdirSync(new URL('src/', root)).filter((f) => f.endsWith('.js') && f !== 'index.js').sort()) {
  for (const name of functions(await import(new URL(`src/${file}`, root)))) exported.set(name, `src/${file}`)
}

const readme = readFileSync(new URL('README.md', root), 'utf8')
const table = readme.split(/^## /m).find((section) => section.startsWith('API')) ?? ''
const documented = new Set([...table.matchAll(/^\|\s*`([A-Za-z_$][\w$]*)/gm)].map((m) => m[1]))

for (const [name, file] of exported) {
  if (!index.has(name)) problems.push(`${file} exports ${name}, and src/index.js does not export it`)
}
for (const name of new Set([...index, ...exported.keys()])) {
  if (!documented.has(name)) problems.push(`${name} is not listed in the README's API table`)
}

let counter
try {
  counter = JSON.parse(readFileSync(new URL('invoices.json', root), 'utf8')).counter
} catch (error) {
  problems.push(`invoices.json cannot be read: ${error.message}`)
}
if (counter !== undefined && counter !== 0) problems.push(`invoices.json's counter is ${JSON.stringify(counter)}, not 0`)

if (problems.length > 0) {
  for (const problem of problems) console.error(`check-api: ${problem}`)
  process.exit(1)
}
console.log(`check-api: ${index.size} functions exported from src/index.js and listed in the README; invoices.json's counter is 0`)
