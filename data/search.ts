import { categories, products, industries, services } from './catalog'
import { areas } from './areas'
import { posts } from './blog'
import { comparisons } from './compare'

export type SearchItem = { t: string; u: string; k: string; d?: string }

// One flat index, built at build time and served as /search-index.json (client-side search, no third-party script).
export function searchIndex(): SearchItem[] {
  return [
    ...categories.map(c => ({ t: c.name, u: `/products/${c.slug}/`, k: 'Product family' })),
    ...products.map(p => ({ t: p.name, u: `/products/${p.category}/${p.slug}/`, k: 'Product', d: p.keyword })),
    ...services.map(s => ({ t: s.name, u: `/services/${s.slug}/`, k: 'Service', d: s.keyword })),
    ...industries.map(i => ({ t: i.name, u: `/industries/${i.slug}/`, k: 'Industry' })),
    ...areas.map(a => ({ t: `${a.name}, Hyderabad`, u: `/hyderabad/${a.slug}/`, k: 'Area' })),
    ...posts.map(b => ({ t: b.title, u: `/blog/${b.slug}/`, k: 'Guide', d: b.description })),
    ...comparisons.map(c => ({ t: c.title, u: `/compare/${c.slug}/`, k: 'Comparison' })),
    { t: 'Which automation do I need?', u: '/which-automation/', k: 'Tool' },
    { t: 'Cost factors estimator', u: '/cost-estimator/', k: 'Tool', d: 'what affects the price of gate and door automation' },
    { t: 'Glossary of automation terms', u: '/glossary/', k: 'Tool', d: 'operator photocell duty cycle RFID ANPR dock leveller meanings' },
    { t: 'Videos', u: '/videos/', k: 'Media' }, { t: 'Gallery', u: '/gallery/', k: 'Media' },
    { t: 'Contact and free site visit', u: '/contact/', k: 'Page' }, { t: 'FAQ', u: '/faq/', k: 'Page' }, { t: 'Certifications', u: '/about/', k: 'Page' },
  ]
}
