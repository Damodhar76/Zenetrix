// Page-count check against Blueprint 10.2 (run after build: npm run check:pages)
import { pages, isNoindex } from './_html.mjs'
const all = pages(); const idx = all.filter(p => !isNoindex(p.html))
console.log(`Static HTML pages: ${all.length}`)
console.log(`Indexable (in sitemap candidates): ${idx.length}`)
console.log(`Noindex (thin until real local proof exists): ${all.length - idx.length}`)
