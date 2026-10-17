import { comparisons } from '@/data/compare'
import { Page, LinkList, H2, P } from '@/components/layout/Page'
import { meta } from '@/lib/seo'
export const metadata = meta({ title: 'Compare Gates, Doors and Barriers', description: 'Side-by-side comparisons of sliding and swing gates, boom barriers, rolling shutters, sectional doors and dock equipment.', path: '/compare/' })
export default function Compare() {
  return (<Page crumbs={[{ name: 'Compare', path: '/compare/' }]} hero={{ eyebrow: 'Compare', title: 'Compare Gates, Doors and Barriers', intro: 'Simple side-by-side comparisons to help you decide.', image: '/images/p-folding-door-automation.webp' }}>
    <LinkList items={comparisons.map(c => ({ name: c.title, href: `/compare/${c.slug}/` }))} />
    <H2>Not sure yet?</H2><P>Try our <a className="underline text-blue-600" href="/which-automation/">Which automation do I need?</a> tool or book a free site visit.</P>
  </Page>)
}
