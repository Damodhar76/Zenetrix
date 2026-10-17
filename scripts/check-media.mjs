// Fails if any product, category or industry is missing its image, or a video is missing a file/poster (run: npm run check:media).
import { existsSync, statSync } from 'node:fs'
import { readFileSync } from 'node:fs'
const must = []
const cat = readFileSync('data/catalog.ts', 'utf8')
const slugify = s => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
for (const m of cat.matchAll(/\['([^']+)', '[^']+'(?:, true)?\]/g)) must.push(`public/images/p-${slugify(m[1])}.webp`)
for (const m of cat.matchAll(/slug: '([a-z-]+)', name: '[^']+' \}/g)) if (!m[1].match(/^(automatic-gate|amc|convert|smart|access|safety|spare)/)) must.push(`public/images/${m[1]}.webp`)
for (const v of readFileSync('data/media.ts', 'utf8').matchAll(/slug: '([a-z-]+)', title/g)) for (const ext of ['.mp4', '.webm', '-poster.webp']) must.push(`public/videos/${v[1]}${ext}`)
for (const f of ['hero', 'hero-poster', 'service']) must.push(`public/images/${f}.webp`)
// Case-exact check: Windows/macOS find 'Hero.webp' when code asks for 'hero.webp', Vercel (Linux) does not.
import { readdirSync } from 'node:fs'
const caseBad = must.filter(f => { const i = f.lastIndexOf('/'); const dir = f.slice(0, i); return existsSync(dir) && !readdirSync(dir).includes(f.slice(i + 1)) && existsSync(f) })
if (caseBad.length) console.log(`Wrong upper/lower case in file name (works locally, breaks on Vercel):\n${caseBad.join('\n')}`)
const missing = [...must.filter(f => !existsSync(f) || statSync(f).size < 500), ...caseBad]
const mp4 = must.filter(f => f.endsWith('.mp4') && existsSync(f)).filter(f => statSync(f).size > 1.5 * 1024 * 1024)
console.log(missing.length ? `Missing media:\n${missing.join('\n')}` : `Media OK (${must.length} files checked)`)
if (mp4.length) console.log(`Warning: videos over 1.5 MB budget: ${mp4.join(', ')}`)
process.exit(missing.length ? 1 : 0)
