// SEO + schema gate (Blueprint 12, 13, 14). Run after build: npm run check:seo
import { pages, isNoindex } from './_html.mjs'
const all = pages(); const errs = []; const titles = new Map()
const BANNED = ['AggregateRating', 'Review', 'Offer', 'aggregateRating', 'offers']
for (const p of all) {
  const e = m => errs.push(`${p.route}: ${m}`)
  const h1 = (p.html.match(/<h1[\s>]/g) || []).length
  if (h1 !== 1) e(`expected 1 <h1>, found ${h1}`)
  const t = ((p.html.match(/<title>([^<]*)<\/title>/) || [])[1] || '').replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"') || undefined
  if (!t) e('missing <title>'); else { if (t.length > 70) e(`title too long (${t.length})`); (titles.get(t) ?? titles.set(t, []).get(t)).push(p.route) }
  if (!/<meta name="description" content="[^"]{50,}/.test(p.html)) e('missing/short meta description')
  if (!/<link rel="canonical"/.test(p.html)) e('missing canonical')
  for (const m of p.html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    let j; try { j = JSON.parse(m[1].replace(/\\u003c/g, '<')) } catch { e('invalid JSON-LD'); continue }
    for (const o of [].concat(j)) {
      if (!o['@type']) e('JSON-LD without @type')
      for (const k of BANNED) if (JSON.stringify(o).includes(`"${k}"`)) e(`forbidden schema key ${k} (never invent ratings/prices)`)
    }
  }
}
for (const [t, r] of titles) if (r.length > 1) errs.push(`duplicate title "${t}": ${r.slice(0, 4).join(', ')}${r.length > 4 ? '…' : ''}`)
console.log(errs.length ? errs.join('\n') + `\n\n${errs.length} issue(s)` : `SEO + schema OK across ${all.length} pages`)
process.exit(errs.length ? 1 : 0)
