// Broken internal link checker (Blueprint 17/18). Run after build: npm run check:links
import { existsSync } from 'node:fs'
import { pages } from './_html.mjs'
const all = pages(); const routes = new Set(all.map(p => p.route))
const meta = new Set(['/sitemap.xml', '/robots.txt', '/manifest.webmanifest', '/icon.png', '/apple-icon.png', '/favicon.ico', '/opengraph-image', '/video-sitemap.xml', '/image-sitemap.xml', '/search-index.json'])
let bad = 0
for (const p of all) {
  for (const m of p.html.matchAll(/href="(\/[^"#?]*)/g)) {
    let h = m[1]; if (h.startsWith('//') || h.startsWith('/_next')) continue
    if (meta.has(h.replace(/\/$/, '')) || existsSync('public' + h.replace(/\/$/, ''))) continue
    if (!h.endsWith('/')) h += '/'
    if (!routes.has(h)) { console.log(`BROKEN  ${p.route}  ->  ${h}`); bad++ }
  }
}
console.log(bad ? `\n${bad} broken link(s)` : `All internal links OK across ${all.length} pages`)
process.exit(bad ? 1 : 0)
