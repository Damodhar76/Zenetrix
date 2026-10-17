// Shared helpers: read statically generated HTML from .next/server/app (run `npm run build` first).
import { readdirSync, statSync, readFileSync, existsSync } from 'node:fs'
import { join, relative } from 'node:path'
export const ROOT = '.next/server/app'
const walk = d => readdirSync(d).flatMap(f => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') ? [p] : [] })
export function pages() {
  if (!existsSync(ROOT)) { console.error('Run `npm run build` first.'); process.exit(2) }
  return walk(ROOT).map(f => {
    let route = '/' + relative(ROOT, f).replace(/\\/g, '/').replace(/\.html$/, '')
    route = route.replace(/\/?index$/, '') + '/'
    return { file: f, route: route.replace(/^\/\//, '/'), html: readFileSync(f, 'utf8') }
  }).filter(p => !/^\/(_not-found|404|500)\/$/.test(p.route))
}
export const text = html => html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/g, ' ').replace(/\s+/g, ' ').trim()
export const isNoindex = html => /<meta name="robots" content="[^"]*noindex/i.test(html)
