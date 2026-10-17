import { SITE } from './site'
import type { Faq } from '@/data/faqs'

const abs = (p: string) => `${SITE.base}${p}`
export const orgId = `${SITE.base}/#organization`

export const organization = () => ({
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  '@id': orgId,
  name: SITE.name, url: `${SITE.base}/`,
  description: 'Supply, installation, repair and AMC of automatic gates, doors, boom barriers, shutters and dock equipment in Hyderabad, Telangana and Andhra Pradesh. 10+ years of experience.',
  knowsAbout: ['Automatic gate installation', 'Sliding gate automation', 'Swing gate automation', 'Boom barriers', 'Automatic sliding doors', 'Rolling shutters', 'Garage doors', 'Sectional doors', 'Gate repair and AMC', 'Access control'],
  logo: abs('/images/zenitrix-logo.png'),
  telephone: SITE.phoneTel, email: SITE.email,
  address: { '@type': 'PostalAddress', streetAddress: SITE.address.street, addressLocality: SITE.address.city,
    addressRegion: SITE.address.region, postalCode: SITE.address.zip, addressCountry: SITE.address.country },
  ...(SITE.geo.lat ? { geo: { '@type': 'GeoCoordinates', latitude: SITE.geo.lat, longitude: SITE.geo.lng } } : {}),
  areaServed: [{ '@type': 'City', name: 'Hyderabad' }, { '@type': 'AdministrativeArea', name: 'Telangana' }, { '@type': 'AdministrativeArea', name: 'Andhra Pradesh' }],
  image: abs('/opengraph-image'),
  ...(SITE.maps ? { hasMap: SITE.maps } : {}),
  ...(SITE.sameAs.length || SITE.maps ? { sameAs: [...SITE.sameAs, ...(SITE.maps ? [SITE.maps] : [])] } : {}),
  ...(SITE.hours.length ? { openingHours: SITE.hours } : {}),
  contactPoint: { '@type': 'ContactPoint', telephone: SITE.phoneTel, contactType: 'customer service', areaServed: 'IN', availableLanguage: ['English', 'Telugu', 'Hindi'] },
})

export const website = () => ({
  '@context': 'https://schema.org', '@type': 'WebSite', '@id': `${SITE.base}/#website`, name: SITE.name, url: `${SITE.base}/`, publisher: { '@id': orgId },
  potentialAction: { '@type': 'SearchAction', target: { '@type': 'EntryPoint', urlTemplate: `${SITE.base}/search/?q={search_term_string}` }, 'query-input': 'required name=search_term_string' },
})

export const breadcrumb = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.path) })),
})

export const faqPage = (faqs: Faq[]) => ({
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
})

// No offers, ratings or invented specs (Blueprint 13).
export const productSchema = (name: string, description: string, path: string, image?: string, specs?: [string, string][]) => ({
  '@context': 'https://schema.org', '@type': 'Product', name, description, url: abs(path), brand: { '@type': 'Brand', name: SITE.brand },
  ...(image ? { image: abs(image) } : {}),
  // Specs appear only when the client supplied a datasheet (data/specs.ts). Never invented.
  ...(specs?.length ? { additionalProperty: specs.map(([n, v]) => ({ '@type': 'PropertyValue', name: n, value: v })) } : {}),
})

// WebPage on every page (Blueprint 13), tied to the WebSite and Organization.
export const webPage = (name: string, path: string, description?: string) => ({
  '@context': 'https://schema.org', '@type': 'WebPage', name, url: abs(path), ...(description ? { description } : {}),
  isPartOf: { '@id': `${SITE.base}/#website` }, about: { '@id': orgId }, inLanguage: 'en-IN',
})

export const videoObject = (v: { slug: string; title: string; description: string; seconds: number; uploaded: string }) => ({
  '@context': 'https://schema.org', '@type': 'VideoObject', name: v.title, description: v.description,
  thumbnailUrl: abs(`/videos/${v.slug}-poster.webp`), uploadDate: v.uploaded, duration: `PT${v.seconds}S`,
  contentUrl: abs(`/videos/${v.slug}.mp4`), publisher: { '@id': orgId },
})

export const imageObject = (src: string, caption: string) => ({
  '@context': 'https://schema.org', '@type': 'ImageObject', contentUrl: abs(src), caption, creator: { '@id': orgId },
})

export const serviceSchema = (name: string, path: string, area?: string, extra?: { description?: string; keywords?: string[] }) => ({
  '@context': 'https://schema.org', '@type': 'Service', name, serviceType: name, url: abs(path), provider: { '@id': orgId },
  ...(extra?.description ? { description: extra.description } : {}), ...(extra?.keywords?.length ? { keywords: extra.keywords.join(', ') } : {}),
  areaServed: { '@type': area ? 'Place' : 'City', name: area ? `${area}, Hyderabad` : 'Hyderabad' },
})

export const collection = (name: string, path: string, items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org', '@type': 'CollectionPage', name, url: abs(path),
  mainEntity: { '@type': 'ItemList', itemListElement: items.map((x, i) => ({ '@type': 'ListItem', position: i + 1, url: abs(x.path), name: x.name })) },
})

export const howTo = (name: string, steps: string[]) => ({
  '@context': 'https://schema.org', '@type': 'HowTo', name,
  step: steps.map((t, i) => ({ '@type': 'HowToStep', position: i + 1, name: t, text: t })),
})

export const articleSchema = (headline: string, description: string, path: string, updated: string, image?: string, extra?: { words?: number; keywords?: string[]; section?: string }) => ({
  '@context': 'https://schema.org', '@type': 'BlogPosting', headline, description, url: abs(path), inLanguage: 'en-IN',
  ...(extra?.words ? { wordCount: extra.words } : {}), ...(extra?.keywords?.length ? { keywords: extra.keywords.join(', ') } : {}), ...(extra?.section ? { articleSection: extra.section } : {}),
  datePublished: updated, dateModified: updated,
  ...(image ? { image: abs(image) } : {}),
  author: { '@type': 'Organization', name: SITE.name, '@id': orgId, url: abs('/authors/zenitrix-team/') }, publisher: { '@id': orgId },
  mainEntityOfPage: abs(path),
})

export const authorPage = () => ({
  '@context': 'https://schema.org', '@type': 'ProfilePage', name: 'Zenitrix Technologies editorial team', url: abs('/authors/zenitrix-team/'), mainEntity: { '@id': orgId },
})

// Project case study (Blueprint 13): CreativeWork with locationCreated and an ImageObject when a photo exists.
export const projectSchema = (p: { title: string; summary: string; path: string; area: string; image?: string; date?: string }) => ({
  '@context': 'https://schema.org', '@type': 'CreativeWork', name: p.title, description: p.summary, url: abs(p.path),
  locationCreated: { '@type': 'Place', name: `${p.area}, Hyderabad` }, creator: { '@id': orgId },
  ...(p.date ? { dateCreated: p.date } : {}),
  ...(p.image ? { image: { '@type': 'ImageObject', contentUrl: abs(p.image), caption: p.title } } : {}),
})

// Verified certificates only (Blueprint 13): a simple ItemList, generated from data/certificates.ts.
export const certificateList = (items: { body: string; number: string; products: string; pdf?: string }[]) => ({
  '@context': 'https://schema.org', '@type': 'ItemList', name: 'Zenitrix Technologies certificates',
  itemListElement: items.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: `${c.body} certificate ${c.number}`, description: c.products, ...(c.pdf ? { url: abs(c.pdf) } : {}) })),
})

export const glossarySchema = (terms: { term: string; def: string }[]) => ({
  '@context': 'https://schema.org', '@type': 'DefinedTermSet', name: 'Gate, door and dock automation glossary', url: abs('/glossary/'),
  hasDefinedTerm: terms.map(t => ({ '@type': 'DefinedTerm', name: t.term, description: t.def })),
})
