// Anti-doorway gate (Blueprint 11.2): indexable service-by-area pages must be <60% similar to a sibling.
// Pages that are still noindex are only reported. Run after build: npm run check:similarity
import { pages, text, isNoindex } from './_html.mjs'
const shingles = s => { const w = s.toLowerCase().split(/\W+/).filter(Boolean); const out = new Set(); for (let i = 0; i + 3 <= w.length; i++) out.add(w.slice(i, i + 3).join(' ')); return out }
const jac = (a, b) => { let n = 0; for (const x of a) if (b.has(x)) n++; return n / (a.size + b.size - n || 1) }
const sa = pages().filter(p => /^\/hyderabad\/[^/]+\/[^/]+\/$/.test(p.route)).map(p => {
  const main = (p.html.match(/<main[\s\S]*<\/main>/) || [p.html])[0]
  return { route: p.route, service: p.route.split('/')[3], noindex: isNoindex(p.html), sh: shingles(text(main)) }
})
let fail = 0, warn = 0; const byService = {}
// Blueprint 11.2: every INDEXABLE service-by-area page needs at least 450 words of main content.
const MIN_WORDS = 450
for (const p of pages().filter(x => /^\/hyderabad\/[^/]+\/[^/]+\/$/.test(x.route) && !isNoindex(x.html))) {
  const main = (p.html.match(/<main[\s\S]*<\/main>/) || [p.html])[0]; const n = text(main).split(/\s+/).length
  if (n < MIN_WORDS) { fail++; console.log(`FAIL ${p.route}: only ${n} words (minimum ${MIN_WORDS})`) }
}
for (const p of sa) (byService[p.service] ??= []).push(p)
for (const list of Object.values(byService)) for (let i = 0; i < list.length; i++) for (let j = i + 1; j < list.length; j++) {
  const s = jac(list[i].sh, list[j].sh)
  if (s > 0.6) { if (!list[i].noindex && !list[j].noindex) { fail++; console.log(`FAIL ${(s * 100) | 0}%  ${list[i].route}  <->  ${list[j].route}`) } else warn++ }
}
console.log(`Checked ${sa.length} service-by-area pages (${sa.filter(p => !p.noindex).length} indexable). Fail: ${fail}. Similar but noindex (needs unique local copy before indexing): ${warn} pairs.`)
process.exit(fail ? 1 : 0)
