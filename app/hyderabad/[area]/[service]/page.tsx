import { lc } from '@/lib/text'
import { areaImage } from '@/lib/images'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getArea, nearby } from '@/data/areas'
import { serviceAreaPages, getTopService, localFacts } from '@/data/serviceAreaPages'
import { Page, H2, P, UL, LinkList, FaqBlock, QuoteCta } from '@/components/layout/Page'
import { meta } from '@/lib/seo'
import { serviceSchema } from '@/lib/schema'

export const dynamicParams = false
export const generateStaticParams = () => serviceAreaPages.map(x => ({ area: x.area, service: x.service }))
type Props = { params: Promise<{ area: string; service: string }> }

const typeCopy = { residential: 'villas and gated communities', it: 'IT campuses and offices', industrial: 'factories and warehouses' } as const
const typeShort = { residential: 'homes and communities', it: 'campuses and offices', industrial: 'factories and warehouses' } as const
const typeWhy = {
  residential: 'Residential entries need a gate that is quiet, safe around children and pets, and easy to use for family and visitors. Approvals from a community committee may be needed.',
  it: 'Campus and office entries need reliable throughput at peak hours, access control for staff and visitors, and maintenance that does not interrupt work.',
  industrial: 'Industrial entries need heavy-duty equipment that handles truck traffic, dust and long working hours, with safety devices suited to forklifts and loading bays.',
} as const

export async function generateMetadata({ params }: Props) {
  const { area, service } = await params; const a = getArea(area); const s = getTopService(service); if (!a || !s) return {}
  const page = serviceAreaPages.find(x => x.area === area && x.service === service)!
  return meta({
    title: `${s.name} in ${a.name}, Hyderabad | Zenitrix`,
    description: `Need ${lc(s.name)} in ${a.name}? Zenitrix serves ${a.name} and nearby localities with installation, repair and AMC. WhatsApp for a quick quote.`,
    path: `/hyderabad/${area}/${service}/`,
    noindex: !page.indexable, // thin until real local proof exists and its release batch is live (Blueprint 11.2, 14.3)
  })
}

export default async function ServiceArea({ params }: Props) {
  const { area, service } = await params
  const a = getArea(area); const s = getTopService(service)
  if (!a || !s || !serviceAreaPages.some(x => x.area === area && x.service === service)) notFound()
  const path = `/hyderabad/${area}/${service}/`
  const facts = localFacts[area]
  const faqs = [
    { q: `Do you provide ${lc(s.name)} in ${a.name}?`, a: `Yes, Zenitrix serves ${a.name} from its Banjara Hills office.` },
    { q: `What do ${typeCopy[a.type]} in ${a.name} need to check before installation?`, a: 'Check whether your society or committee needs to approve the work, and confirm power-backup arrangements. We can supply the technical details they ask for.' },
    { q: `How do I book a site visit in ${a.name}?`, a: 'Call or WhatsApp +91 85006 32002.' },
    ...(facts?.faqs ?? []),
  ]
  const steps = [
    ['Site visit and gate survey', `We visit the ${a.name} site, measure the opening, check power, ground level and access, and note any safety risks.`],
    ['Motor and controller selection', `We match the operator, controller and safety devices to your use, then send a written quote.`],
    ['Installation', 'Trained technicians fit the equipment, set limits and safety devices, and test every control.'],
    ['Handover', 'We train you on remotes, the manual release and basic care, and explain how AMC support works.'],
  ]
  return (
    <Page crumbs={[{ name: 'Hyderabad', path: '/hyderabad/' }, { name: a.name, path: `/hyderabad/${area}/` }, { name: s.name, path }]} schema={serviceSchema(`${s.name} in ${a.name}`, path, a.name)} hero={{ eyebrow: a.name, title: `${s.name} in ${a.name}, Hyderabad`, image: areaImage(a.type) }}>
      <P>Zenitrix serves {typeCopy[a.type]} in {a.name}. {facts?.notes ?? 'Send us your exact location on WhatsApp and we will confirm the visit slot.'}</P>
      <P><Link className="underline" href={s.href}>Learn more about {lc(s.name)}</Link></P>
      <H2>Why {a.name} {typeShort[a.type]} choose {lc(s.name)}</H2>
      <P>{s.why}</P><P>{typeWhy[a.type]}</P>
      {facts?.buildingTypes && facts.buildingTypes.length > 0 && <UL items={facts.buildingTypes} />}
      <H2>Our process for {a.name} {typeShort[a.type]}</H2>
      {steps.map(([h, t]) => (<div key={h}><h3 className="font-semibold text-lg mt-4">{h}</h3><P>{t}</P></div>))}
      <H2>Recent installations near {a.name}</H2>
      <P>{facts?.project ?? '[CLIENT TO PROVIDE a real project or photo; this page stays noindex until then]'}</P>
      {facts?.projectSlug && <P><Link className="underline" href={`/projects/${facts.projectSlug}/`}>See the project</Link></P>}
      {(facts?.roads?.length || facts?.travelTime) && (<><H2>Getting to {a.name}</H2>
        {facts?.travelTime && <P>Travel time from our Banjara Hills office: {facts.travelTime}.</P>}
        {facts?.roads && facts.roads.length > 0 && <P>Main roads and approaches we use: {facts.roads.join(', ')}.</P>}</>)}
      <H2>Control options: remote, mobile app, smartwatch</H2><P>Remote, mobile app and smartwatch control depend on the controller supplied. We confirm what fits your site at the visit.</P>
      <H2>Repair and AMC for {lc(s.name)} in {a.name}</H2>
      <LinkList items={[{ name: 'Gate and door repair', href: '/services/automatic-gate-repair/' }, { name: 'AMC plans', href: '/services/amc/' }]} />
      <FaqBlock faqs={faqs} />
      <H2>Nearby areas we serve</H2>
      <LinkList items={[{ name: `All services in ${a.name}`, href: `/hyderabad/${area}/` }, ...nearby(area, 2).map(n => ({ name: `${s.name} in ${n.name}`, href: `/hyderabad/${n.slug}/${service}/` }))]} />
      <QuoteCta product={s.name} />
    </Page>
  )
}
