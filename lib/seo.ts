import type { Metadata } from 'next'
import { SITE } from './site'

// Title 50-60 chars, description 140-155 chars (Blueprint 12.1). Titles get " | Zenitrix" via template in layout.
// Keeps the final <title> (page title + " | Zenitrix") close to what Google displays (~60 chars) by dropping trailing "| extra" segments only.
const BRAND_SUFFIX = ' | Zenitrix'
export function fitTitle(t: string, max = 60): string {
  let parts = t.split(' | ')
  while (parts.length > 1 && (parts.join(' | ') + BRAND_SUFFIX).length > max) parts = parts.slice(0, -1)
  let out = parts.join(' | ')
  // Second pass: tighter wording of the same title (never removes the place or the product name).
  const tighten: [RegExp, string][] = [
    [/^Gate & Door Automation for /, 'Gate Automation for '], [/^Gate & Door Automation in /, 'Gate Automation in '],
    [/^Automatic Gates & Doors in /, 'Gates & Doors in '], [/ and /g, ' & '], [/: Side-by-Side Comparison$/, ': Comparison'],
    [/: What to Look For$/, ''], [/ in Hyderabad$/, ', Hyderabad'], [/^Gate Automation for /, 'Gates for '],
  ]
  for (const [re, rep] of tighten) { if ((out + BRAND_SUFFIX).length <= max + 5) break; out = out.replace(re, rep) }
  return out
}
export function meta(o: { title: string; description: string; path: string; noindex?: boolean; keywords?: string[]; image?: string; article?: { published: string; modified: string; section?: string } }): Metadata {
  return {
    title: fitTitle(o.title), description: o.description,
    alternates: { canonical: o.path },
    robots: o.noindex ? { index: false, follow: true } : undefined,
    ...(o.keywords?.length ? { keywords: o.keywords } : {}),
    ...(o.article ? { authors: [{ name: SITE.name, url: `${SITE.base}/authors/zenitrix-team/` }] } : {}),
    openGraph: {
      title: o.title, description: o.description, url: `${SITE.base}${o.path}`, siteName: SITE.name, locale: 'en_IN',
      ...(o.article ? { type: 'article' as const, publishedTime: o.article.published, modifiedTime: o.article.modified, section: o.article.section, authors: [SITE.name] } : { type: 'website' as const }),
      ...(o.image ? { images: [{ url: o.image, width: 1280, height: 800, alt: o.title }] } : {}),
    },
    twitter: { card: 'summary_large_image', title: o.title, description: o.description, ...(o.image ? { images: [o.image] } : {}) },
  }
}
