// Performance budget (Blueprint 5): initial JS (gzip) under 150 KB on inner pages and 220 KB on the home page.
// Run after `npm run build`: npm run check:budget
import { readFileSync, existsSync } from 'node:fs'
import { gzipSync } from 'node:zlib'
const mf = ['.next/app-build-manifest.json', '.next/build-manifest.json'].find(existsSync)
if (!mf) { console.log('No build manifest found. Run `npm run build` first.'); process.exit(2) }
const m = JSON.parse(readFileSync(mf, 'utf8')); const pages = m.pages || {}
const kb = f => { try { return gzipSync(readFileSync(`.next/${f}`)).length / 1024 } catch { return 0 } }
const cache = new Map(); const size = f => cache.get(f) ?? (cache.set(f, kb(f)), cache.get(f))
const shared = new Set(m.rootMainFiles || [])
let fail = 0, worst = 0
for (const [route, files] of Object.entries(pages)) {
  const js = [...new Set([...files, ...shared])].filter(f => f.endsWith('.js'))
  const total = js.reduce((n, f) => n + size(f), 0); worst = Math.max(worst, total)
  const limit = route === '/page' || route === '/' ? 220 : 150
  if (total > limit) { fail++; console.log(`OVER BUDGET ${route}: ${total.toFixed(0)} KB gzip (limit ${limit} KB)`) }
}
console.log(`Checked ${Object.keys(pages).length} routes. Largest initial JS: ${worst.toFixed(0)} KB gzip. Over budget: ${fail}.`)
process.exit(fail ? 1 : 0)
