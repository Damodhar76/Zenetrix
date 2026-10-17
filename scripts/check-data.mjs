// Pre-build data integrity check (runs without a build): npm run check:data
// Verifies the typed data files: 40 guides, unique slugs, every internal link points at a real route, copy exists for every product/industry/service.
import { createRequire } from 'node:module'
import { readFileSync } from 'node:fs'
import path from 'node:path'
const require = createRequire(import.meta.url)
let ts
try { ts = require('typescript') } catch { ts = require(path.join(process.env.TS_PATH || '', 'typescript')) }
const Module = require('node:module'); const root = process.cwd()
require.extensions['.ts'] = (m, file) => m._compile(ts.transpileModule(readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true } }).outputText, file)
const orig = Module._resolveFilename
Module._resolveFilename = function (req, ...a) { return orig.call(this, req.startsWith('@/') ? path.join(root, req.slice(2)) : req, ...a) }
const L = n => require(path.join(root, n))
const { products, categories, industries, services } = L('data/catalog.ts'); const { areas } = L('data/areas.ts')
const { posts } = L('data/blog.ts'); const { comparisons } = L('data/compare.ts'); const { categoryCopy, productCopy, industryCopy, serviceCopy } = L('data/content.ts')
const { categoryFaqs } = L('data/categoryFaqs.ts'); const { topServices, serviceAreaPages } = L('data/serviceAreaPages.ts'); const { glossary } = L('data/glossary.ts')
const errs = []; const e = m => errs.push(m)
const dup = (arr, what) => { const s = new Set(); for (const x of arr) { if (s.has(x)) e(`duplicate ${what}: ${x}`); s.add(x) } }
dup(posts.map(p => p.slug), 'post slug'); dup(comparisons.map(c => c.slug), 'compare slug'); dup(products.map(p => `${p.category}/${p.slug}`), 'product')
if (posts.length < 40) e(`only ${posts.length} guides (Blueprint 10.2 launch set is 40)`)
for (const p of posts) { if (p.title.length > 70) e(`post title too long: ${p.slug}`); if (p.description.length < 50 || p.description.length > 170) e(`post description length ${p.description.length}: ${p.slug}`) }
for (const p of products) if (!productCopy[p.name]) e(`missing productCopy: ${p.name}`)
for (const c of categories) { if (!categoryCopy[c.slug]) e(`missing categoryCopy: ${c.slug}`); if ((categoryFaqs[c.slug] || []).length < 4) e(`categoryFaqs < 4: ${c.slug}`) }
for (const i of industries) if (!industryCopy[i.slug]) e(`missing industryCopy: ${i.slug}`)
for (const s of services) if (!serviceCopy[s.slug]) e(`missing serviceCopy: ${s.slug}`)
const routes = new Set(['/', '/products/', '/hyderabad/', '/about/', '/contact/', '/faq/', '/blog/', '/compare/', '/which-automation/', '/cost-estimator/', '/glossary/', '/authors/zenitrix-team/', '/videos/', '/gallery/', '/privacy-policy/', '/terms/', '/projects/', '/search/',
  ...categories.map(c => `/products/${c.slug}/`), ...products.map(p => `/products/${p.category}/${p.slug}/`), ...industries.map(i => `/industries/${i.slug}/`), ...services.map(s => `/services/${s.slug}/`),
  ...areas.map(a => `/hyderabad/${a.slug}/`), ...posts.map(p => `/blog/${p.slug}/`), ...comparisons.map(c => `/compare/${c.slug}/`)])
const chk = (from, href) => { if (href.startsWith('/') && !routes.has(href)) e(`broken internal link in ${from}: ${href}`) }
for (const p of posts) for (const l of p.links) chk(`post ${p.slug}`, l.href)
for (const c of comparisons) for (const l of c.links) chk(`compare ${c.slug}`, l.href)
for (const s of topServices) chk(`topService ${s.slug}`, s.href)
console.log(`Guides: ${posts.length} | Comparisons: ${comparisons.length} | Products: ${products.length} | Industries: ${industries.length} | Services: ${services.length} | Areas: ${areas.length} | Service-by-area: ${serviceAreaPages.length} | Glossary terms: ${glossary.length}`)
console.log(errs.length ? errs.join('\n') + `\n\n${errs.length} issue(s)` : 'Data OK')
process.exit(errs.length ? 1 : 0)
