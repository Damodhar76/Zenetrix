import { masterKeywordsFor } from '@/lib/keywords'
import { notFound } from 'next/navigation'
import { STATES, districtHref, type StateKey } from '@/data/districts'
import type { RegionDistrict } from '@/data/regions'
import { categories } from '@/data/catalog'
import { Page, H2, P, UL, LinkList, FaqBlock, QuoteCta } from '@/components/layout/Page'
import { meta } from '@/lib/seo'
import { serviceSchema } from '@/lib/schema'
import { SITE } from '@/lib/site'

const order = { 'Very High': 0, High: 1, Medium: 2 } as const

export function stateMetadata(state: StateKey) {
  const s = STATES[state]
  return meta({
    title: `Gate and Door Automation Across ${s.name} | Zenitrix`,
    description: `Zenitrix supplies and installs automatic gates, doors, barriers and shutters in all ${s.list.length} districts of ${s.name}. ${SITE.years}+ years of experience. WhatsApp for a quote.`.slice(0, 158),
    path: s.path,
    keywords: masterKeywordsFor(state === 'telangana' ? ['telangana','warangal','karimnagar','nizamabad','khammam','nalgonda','mahbubnagar','siddipet','sangareddy','medchal','hanamkonda','secunderabad'] : ['andhra','vijayawada','visakhapatnam','guntur','tirupati','nellore','rajahmundry','kakinada','kurnool','kadapa','anantapur','eluru','mangalagiri','amaravati'], 150),
  })
}

export function StateHub({ state }: { state: StateKey }) {
  const s = STATES[state]
  const top = s.list.filter(d => d.priority === 'Very High')
  return (
    <Page crumbs={[{ name: s.name, path: s.path }]} hero={{ eyebrow: `${s.name} districts`, title: `Gate and Door Automation Across ${s.name}`, intro: `${SITE.years}+ years of experience. From our Hyderabad office we supply, install and service in every district of ${s.name}.`, image: '/images/hero.webp' }}>
      <P>Zenitrix serves all of Telangana and Andhra Pradesh. Send your location and requirement on WhatsApp and we will confirm the visit schedule and a written quote.</P>
      {top.length > 0 && (<><H2>Priority districts</H2><LinkList items={top.map(d => ({ name: d.name, href: districtHref(state, d) }))} /></>)}
      <H2>All {s.list.length} districts we serve</H2>
      <LinkList items={[...s.list].sort((a, b) => a.name.localeCompare(b.name)).map(d => ({ name: d.name, href: districtHref(state, d) }))} />
      <H2>Also serving</H2>
      <LinkList items={[state === 'telangana' ? { name: 'Andhra Pradesh', href: '/andhra-pradesh/' } : { name: 'Telangana', href: '/telangana/' }, { name: 'Hyderabad localities', href: '/hyderabad/' }]} />
      <QuoteCta />
    </Page>
  )
}

export async function districtMetadata(state: StateKey, d: RegionDistrict | undefined) {
  if (!d) return {}
  const s = STATES[state]
  return meta({ title: `Gate & Door Automation in ${d.name}, ${s.name}`, description: `Zenitrix supplies and installs automatic gates, doors, boom barriers, flap barriers and shutters in ${d.name}, ${s.name}. ${SITE.years}+ years of experience. WhatsApp for a quote.`.slice(0, 158), path: `${s.path}${d.slug}/` })
}

export function DistrictView({ state, d }: { state: StateKey; d: RegionDistrict | undefined }) {
  if (!d) notFound()
  const s = STATES[state]
  const path = `${s.path}${d.slug}/`
  const qa = [
    { q: `Do you install in ${d.name}?`, a: `Yes. Zenitrix works from Hyderabad and takes projects in ${d.name}, ${s.name}. Call or WhatsApp ${SITE.phone} with your location and requirement and we will confirm the visit and quote.` },
    { q: `Can you repair gates and doors installed by another vendor in ${d.name}?`, a: 'Yes. Send a photo or video of the issue on WhatsApp and we will advise on the next step.' },
    { q: 'What should I send for a quick quote?', a: 'Opening width, a photo of the gate, door or entrance, and your location. That is usually enough for a first estimate before a site visit.' },
    { q: 'How much experience does Zenitrix have?', a: `Zenitrix has ${SITE.years} years of experience in gate, door, barrier and shutter automation.` },
  ]
  const others = [...s.list].filter(x => x.slug !== d.slug).sort((a, b) => order[a.priority] - order[b.priority]).slice(0, 8)
  return (
    <Page crumbs={[{ name: s.name, path: s.path }, { name: d.name, path }]} schema={serviceSchema('Gate and door automation', path, `${d.name}, ${s.name}`)}
      hero={{ eyebrow: s.name, title: `Gate and Door Automation in ${d.name}`, intro: `Supply, installation, repair and AMC for homes, businesses and industry in ${d.name}. ${SITE.years}+ years of experience.`, image: '/images/hero.webp' }}>
      <P>Zenitrix is based in Banjara Hills, Hyderabad, and serves {d.name} and nearby towns across {s.name}. Tell us what you need and we will plan the visit, measure the site and send a written quote.</P>
      {d.towns.length > 0 && (<><H2>Towns and residential areas we cover in {d.name}</H2><UL items={d.towns} /></>)}
      <P>{d.name} district has {d.pins} postal PIN codes. We take projects in all of them.</P>
      <H2>What we supply in {d.name}</H2>
      <UL items={['Sliding, cantilever trackless and swing gate automation for homes, farms and compounds', 'Boom barriers and flap barriers for offices, schools, hospitals and parking', 'Automatic glass doors for showrooms, hospitals and shops', 'Rolling shutters, sectional doors, skylight roof shutters and high-speed doors for factories and warehouses', 'Repair and AMC for systems from any vendor']} />
      <H2>Products</H2>
      <LinkList items={categories.map(c => ({ name: c.name, href: `/products/${c.slug}/` }))} />
      <H2>Other districts</H2>
      <LinkList items={others.map(x => ({ name: x.name, href: districtHref(state, x) }))} />
      <FaqBlock faqs={qa} />
      <QuoteCta />
    </Page>
  )
}
