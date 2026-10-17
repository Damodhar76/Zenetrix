// Prints every media file the code expects in public/ (exact, lowercase names) and checks what you have.
// Run: node scripts/list-media.mjs   -> writes MEDIA-MANIFEST.txt, reports missing files and wrong-case names.
// Linux (Vercel) file names are case-sensitive: Hero.webp is NOT hero.webp. Keep every name lowercase.
import { readFileSync, existsSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
const slugify = s => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const src = f => readFileSync(f, 'utf8')
const exp = new Set()
const add = f => exp.add(f)
const cat = src('data/catalog.ts')
for (const m of cat.matchAll(/\['([^']+)', '[^']+'(?:, true)?\]/g)) add(`images/p-${slugify(m[1])}.webp`)
for (const m of cat.matchAll(/slug: '([a-z0-9-]+)', name: '[^']+' \}/g)) { add(`images/${m[1]}.webp`); add(`images/svc-${m[1]}.webp`) }
for (const f of ['lib/images.ts', 'lib/blogImages.ts', 'data/media.ts', 'data/projects.ts', 'data/testimonials.ts', 'data/certificates.ts']) {
  if (!existsSync(f)) continue
  const t = src(f)
  for (const m of t.matchAll(/\/images\/([A-Za-z0-9_.-]+\.(?:webp|png|jpg|svg|avif))/g)) add(`images/${m[1]}`)
  for (const m of t.matchAll(/'((?:p|svc|ind|g)-[A-Za-z0-9-]+)'/g)) add(`images/${m[1]}.webp`)
  for (const m of t.matchAll(/(?:ind|g)-[a-z0-9-]+/g)) add(`images/${m[0]}.webp`)
}
for (const v of src('data/media.ts').matchAll(/slug: '([a-z0-9-]+)', title/g)) for (const e of ['.mp4', '.webm', '-poster.webp', '-poster-640.webp', '-poster-800.webp']) add(`videos/${v[1]}${e}`)
for (const f of ['hero', 'hero-poster', 'service']) add(`images/${f}.webp`)
add('images/zenitrix-logo-white.png'); add('fonts/inter-latin.woff2'); add('fonts/sora-latin.woff2')
// 640px phone twin of every .webp image
for (const f of [...exp]) if (/^images\/.*\.webp$/.test(f) && !/-(640|poster)\.webp$/.test(f) && !f.includes('hero-poster')) add(f.replace('.webp', '-640.webp'))
const list = [...exp].filter(f => !f.includes('${')).sort()
writeFileSync('MEDIA-MANIFEST.txt', list.map(f => 'public/' + f).join('\n') + '\n')
console.log(`Expected files: ${list.length} (written to MEDIA-MANIFEST.txt)`)
if (!existsSync('public')) { console.log('public/ folder not found yet. Add it, then run this again.'); process.exit(0) }
// case problems: any file or folder in public/ containing uppercase letters or spaces
const bad = []
const walk = d => { for (const n of readdirSync(d)) { const p = join(d, n); if (/[A-Z\s]/.test(n)) bad.push(p); if (statSync(p).isDirectory()) walk(p) } }
walk('public')
if (bad.length) console.log(`\nUPPERCASE/SPACE in file names (rename to lowercase, breaks on Linux):\n${bad.join('\n')}`)
// expected-name present but only with different case
const wrongCase = [], missing = []
for (const f of list) {
  const dir = join('public', f.slice(0, f.lastIndexOf('/'))), name = f.slice(f.lastIndexOf('/') + 1)
  const have = existsSync(dir) ? readdirSync(dir) : []
  if (have.includes(name)) continue
  const alt = have.find(h => h.toLowerCase() === name.toLowerCase())
  alt ? wrongCase.push(`${dir}/${alt}  ->  rename to ${name}`) : missing.push('public/' + f)
}
if (wrongCase.length) console.log(`\nWRONG CASE:\n${wrongCase.join('\n')}`)
if (missing.length) console.log(`\nMISSING (${missing.length}):\n${missing.join('\n')}`)
if (!bad.length && !wrongCase.length && !missing.length) console.log('All media present with correct lowercase names.')
process.exit(bad.length || wrongCase.length ? 1 : 0)
