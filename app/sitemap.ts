import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/site'
import { products, categories, industries, services } from '@/data/catalog'
import { areas } from '@/data/areas'
import { districts, andhraDistricts } from '@/data/districts'
import { serviceAreaPages } from '@/data/serviceAreaPages'
import { posts } from '@/data/blog'
import { comparisons } from '@/data/compare'
import { projects } from '@/data/projects'
import { pageCount, pagePath } from '@/components/blog/BlogList'

// lastmod uses real dates (Blueprint 14.4: accurate lastmod): SITE.updated for site content, each post's own date for guides.
export default function sitemap(): MetadataRoute.Sitemap {
  const mod = new Date(SITE.updated)
  const u = (path: string, priority: number, lastModified: Date = mod) => ({ url: `${SITE.base}${path}`, lastModified, priority })
  return [
    u('/', 1), u('/products/', 0.8), u('/services/', 0.8), u('/hyderabad/', 0.8), u('/telangana/', 0.7), u('/andhra-pradesh/', 0.7), u('/about/', 0.5), u('/contact/', 0.6), u('/faq/', 0.5),
    u('/blog/', 0.6), u('/compare/', 0.6), u('/which-automation/', 0.6), u('/cost-estimator/', 0.6), u('/glossary/', 0.5), u('/authors/zenitrix-team/', 0.4),
    u('/videos/', 0.6), u('/gallery/', 0.6), u('/privacy-policy/', 0.2), u('/terms/', 0.2),
    ...(projects.length ? [u('/projects/', 0.6)] : []),
    ...Array.from({ length: Math.max(0, pageCount - 1) }, (_, i) => u(pagePath(i + 2), 0.4)),
    ...posts.map(b => u(`/blog/${b.slug}/`, 0.5, new Date(b.updated))),
    ...comparisons.map(c => u(`/compare/${c.slug}/`, 0.6)),
    ...projects.map(p => u(`/projects/${p.slug}/`, 0.6, p.date ? new Date(p.date) : mod)),
    ...categories.map(c => u(`/products/${c.slug}/`, 0.8)),
    ...products.map(p => u(`/products/${p.category}/${p.slug}/`, 0.8)),
    ...industries.map(i => u(`/industries/${i.slug}/`, 0.7)),
    ...services.map(s => u(`/services/${s.slug}/`, 0.8)),
    ...areas.map(a => u(`/hyderabad/${a.slug}/`, 0.7)),
    ...districts.map(d => u(`/telangana/${d.slug}/`, 0.6)),
    ...andhraDistricts.map(d => u(`/andhra-pradesh/${d.slug}/`, 0.6)),
    // Only indexable service-by-area pages (real local proof AND released batch) are listed
    ...serviceAreaPages.filter(x => x.indexable).map(x => u(`/hyderabad/${x.area}/${x.service}/`, 0.6)),
  ]
}
