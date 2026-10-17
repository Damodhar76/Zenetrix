import { masterKeywordsFor } from '@/lib/keywords'
import { areas, priorityAreas } from '@/data/areas'
import { Page, H2, P, LinkList } from '@/components/layout/Page'
import { meta } from '@/lib/seo'
export const metadata = meta({ title: 'Areas We Serve in Hyderabad', description: 'Zenitrix installs and repairs automatic gates, doors, barriers and shutters across Hyderabad and Secunderabad. Find your locality.', path: '/hyderabad/', keywords: ['gate automation Hyderabad', 'automatic gates Hyderabad areas', 'gate automation Secunderabad', 'automatic door installation Hyderabad', 'boom barrier Hyderabad', 'gate repair Hyderabad', 'gate AMC Hyderabad', ...areas.slice(0, 40).map(a => `gate automation ${a.name}`), ...masterKeywordsFor(['hyderabad','secunderabad','banjara','jubilee','gachibowli','hitech','madhapur','kondapur','kukatpally','miyapur','kompally','manikonda','financial district','near me'], 150)] })
export default function Hub() {
  return (<Page crumbs={[{ name: 'Hyderabad', path: '/hyderabad/' }]} hero={{ eyebrow: 'Coverage', title: 'Gate and Door Automation Across Hyderabad', intro: 'Our office is in Banjara Hills. We serve the localities below.', image: '/images/hero.webp' }}>
    <H2>Priority service areas</H2>
    <P>Fast-growing corridors where we take new gate, door, barrier and shutter projects every week.</P>
    <LinkList items={priorityAreas.map(a => ({ name: a.name, href: `/hyderabad/${a.slug}/` }))} />
    <H2>All localities</H2>
    <LinkList items={areas.map(a => ({ name: a.name, href: `/hyderabad/${a.slug}/` }))} />
  </Page>)
}
