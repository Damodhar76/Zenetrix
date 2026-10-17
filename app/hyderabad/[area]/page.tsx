import { notFound } from 'next/navigation'
import { areas, getArea, nearby } from '@/data/areas'
import { serviceAreaPages, topServices, localFacts } from '@/data/serviceAreaPages'
import { Page, H2, P, UL, LinkList, FaqBlock, QuoteCta } from '@/components/layout/Page'
import { projects } from '@/data/projects'
import { areaImage } from '@/lib/images'
import { meta } from '@/lib/seo'
import { serviceSchema, howTo } from '@/lib/schema'
import { areaSeo, areaSections, areaFaqs } from '@/data/areaSeo'
import { JsonLd } from '@/components/seo/JsonLd'
import { Steps } from '@/components/layout/Page'

export const dynamicParams = false
export const generateStaticParams = () => areas.map(a => ({ area: a.slug }))
type Props = { params: Promise<{ area: string }> }

export async function generateMetadata({ params }: Props) {
  const a = getArea((await params).area); if (!a) return {}
  const l = areaSeo[a.slug]
  const near = l ? ` near ${l.landmarks.slice(0, 2).join(' and ')}` : ''
  return meta({ title: `Automatic Gates & Doors in ${a.name}, Hyderabad`, description: `Gate automation, boom barriers, doors and shutters in ${a.name}${near}. Installation, repair and AMC by Zenitrix. Free site visit. Call +91 85006 32002.`.slice(0, 158), path: `/hyderabad/${a.slug}/`,
    keywords: [`automatic gates ${a.name}`, `gate automation ${a.name} Hyderabad`, `gate repair ${a.name}`, `boom barrier ${a.name}`, `automatic door ${a.name}`, `sliding gate ${a.name} Hyderabad`, `swing gate ${a.name}`, `rolling shutter ${a.name}`, `sectional garage door ${a.name}`, `automatic glass door ${a.name}`, `RFID access control ${a.name}`, `gate AMC ${a.name}`, `gate automation near ${a.name}`, `automatic gate installation ${a.name} Hyderabad`], image: areaImage(a.type) })
}
const focus = { residential: 'Homes and gated communities here usually look at sliding and swing gates, sectional garage doors and smart control.', it: 'Offices and campuses here usually look at boom barriers with access control, automatic glass doors and planned maintenance.', industrial: 'Industrial sites here usually look at rolling shutters, high-speed doors, dock levellers and heavy-duty gates.' } as const
const buildings = { residential: ['Independent villas and compounds', 'Gated communities and apartment blocks', 'Garages and shopfronts on main roads'], it: ['IT parks and office campuses', 'Business towers with basement parking', 'Showrooms, hotels and food courts'], industrial: ['Factories and workshops', 'Warehouses and cold stores with loading bays', 'Industrial estates with truck traffic'] } as const

export default async function AreaHub({ params }: Props) {
  const a = getArea((await params).area); if (!a) notFound()
  const path = `/hyderabad/${a.slug}/`
  const facts = localFacts[a.slug]
  const pages = serviceAreaPages.filter(x => x.area === a.slug)
  const local = projects.filter(x => x.area === a.slug)
  const popular = topServices.filter(s => (s.for as readonly string[]).includes(a.type) && s.slug !== 'gate-door-repair' && s.slug !== 'amc')
  const qa = [
    a.type === 'residential'
      ? { q: `Do gated communities in ${a.name} need approval before gate automation?`, a: 'Many communities and societies need committee approval. Check with your committee before work starts, and we can supply the details they ask for.' }
      : a.type === 'it'
        ? { q: `What do campuses and offices in ${a.name} usually automate first?`, a: 'Vehicle entry with boom barriers and access control, then automatic doors for lobbies, with planned maintenance so busy entries stay reliable.' }
        : { q: `What do factories and warehouses in ${a.name} usually automate first?`, a: 'Loading bays and large openings first: rolling shutters, high-speed doors and dock levellers, plus heavy-duty gates for truck entry.' },
    { q: `How do I book a site visit in ${a.name}?`, a: 'Call or WhatsApp +91 85006 32002, or use the form on this page.' },
    ...(facts?.faqs ?? []),
    ...areaFaqs(a),
  ]
  const sec = areaSections(a)
  const local2 = sec.local
  return (
    <Page crumbs={[{ name: 'Hyderabad', path: '/hyderabad/' }, { name: a.name, path }]} schema={serviceSchema('Gate and door automation', path, a.name, { description: `Installation, repair and AMC of automatic gates, doors, barriers and shutters in ${a.name}, Hyderabad.` })}
      hero={{ eyebrow: 'Hyderabad', title: `Gate and Door Automation in ${a.name}, Hyderabad`, image: areaImage(a.type) }}>
      <P>Zenitrix, based in Banjara Hills, serves {a.name} and nearby localities. {focus[a.type]} {facts?.notes ?? 'Send us your exact location on WhatsApp and we will confirm the visit slot.'}</P>
      <JsonLd data={howTo(`How to get a gate or door automated in ${a.name}`, sec.steps)} />
      {local2 && <P>{local2.intro}</P>}
      <H2>{sec.whyH} in {a.name}</H2>
      <P>{sec.whyP}</P>
      <H2>What people in {a.name} usually ask for</H2>
      <UL items={[...sec.needs]} />
      <H2>Typical sites in {a.name}</H2>
      <UL items={[...(facts?.buildingTypes ?? local2?.sites ?? buildings[a.type])]} />
      {local2 && (<><h3 className="font-heading font-semibold text-lg mt-4 mb-2">Landmarks and roads we work around</h3>
        <P>We regularly plan visits around {local2.landmarks.join(', ')}, and along {local2.roads.join(', ')}. Send your exact location on WhatsApp so we can confirm a visit slot.</P></>)}
      {facts?.travelTime && <P>Travel time from our Banjara Hills office: {facts.travelTime}.</P>}
      {facts?.landmarks && facts.landmarks.length > 0 && <P>Nearby landmarks we work around: {facts.landmarks.join(', ')}.</P>}
      <H2>Popular solutions in {a.name}</H2>
      <LinkList items={popular.map(s => ({ name: s.name, href: s.href }))} />
      {local.length > 0 && (<><H2>Recent installations near {a.name}</H2><LinkList items={local.map(d => ({ name: d.title, href: `/projects/${d.slug}/` }))} /></>)}
      {pages.length > 0 && (<><H2>Services in {a.name}</H2>
        <LinkList items={pages.map(p => ({ name: topServices.find(s => s.slug === p.service)!.name, href: `/hyderabad/${a.slug}/${p.service}/` }))} /></>)}
      <H2>How it works in {a.name}</H2>
      <Steps items={sec.steps} />
      <H2>Repair and AMC in {a.name}</H2>
      <LinkList items={[{ name: 'Gate and door repair', href: '/services/automatic-gate-repair/' }, { name: 'AMC plans', href: '/services/amc/' }]} />
      <H2>Nearby areas we serve</H2>
      <LinkList items={nearby(a.slug).map(n => ({ name: n.name, href: `/hyderabad/${n.slug}/` }))} />
      <FaqBlock faqs={qa} />
      <QuoteCta />
    </Page>
  )
}
