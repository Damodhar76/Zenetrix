import Link from 'next/link'
import { Page, H2, P, UL, Steps, FaqBlock, CardGrid, QuoteCta } from '@/components/layout/Page'
import { TaglineStrip } from '@/components/ui/TaglineStrip'
import { categories, industries, services } from '@/data/catalog'
import { categoryImage } from '@/lib/images'
import { JsonLd } from '@/components/seo/JsonLd'
import { SITE } from '@/lib/site'
import { orgId } from '@/lib/schema'
import { meta } from '@/lib/seo'
import type { Faq } from '@/data/faqs'

export const metadata = meta({
  title: 'About Zenitrix Entrance Automations | Automation Company in Hyderabad',
  description: 'Zenitrix Technologies is a Banjara Hills, Hyderabad company for automatic gates, doors, boom barriers, shutters, speed gates and dock equipment. GeM, CE and TUV certified products, installation, repair and AMC.',
  path: '/about/',
})

const faqs: Faq[] = [
  { q: 'What does Zenitrix Technologies do?', a: 'We supply, install, repair and maintain automatic gates, automatic doors, boom and flap barriers, sectional doors, rolling shutters, high-speed doors, dock equipment and UHF RFID access control in Hyderabad and across Telangana.' },
  { q: 'Do you service automation installed by other companies?', a: 'Yes. Our repair and servicing covers any brand. We inspect the motor, controller, sensors and remotes, then give you a clear quote before any work starts.' },
  { q: 'Are your products certified?', a: 'Our products are GeM registered, CE certified and TUV certified. Contact us for certificate copies for the product you are considering.' },
  { q: 'Do you offer a free site visit?', a: 'Yes. We visit your site, measure the opening, check power and safety needs, and send a written quote with no obligation.' },
  { q: 'Which areas do you cover?', a: 'We are based in Banjara Hills and serve localities across Hyderabad and Secunderabad, with projects across Telangana and Andhra Pradesh. Zenitrix has 10+ years of experience.' },
]

const why = [
  '10+ years of hands-on experience in gate, door, barrier and shutter automation.',
  'One team for the whole job: site visit, supply, installation, testing, repair and AMC.',
  'Certified products: GeM registered, CE certified and TUV certified.',
  'Any-brand repair, so you are never stuck with an abandoned system.',
  'Safety first: photocells, safety edges and loops fitted as standard practice.',
  'Clear written quotes after measuring your site, with no guesswork.',
  'Local team in Banjara Hills for quick response across Hyderabad.',
]

export default function Pg() {
  return (
    <Page crumbs={[{ name: 'About Zenitrix Entrance Automations', path: '/about/' }]}
      hero={{ eyebrow: 'About us', title: 'About Zenitrix Entrance Automations', intro: 'Hyderabad-based specialists with 10+ years of experience in automatic gates, doors, barriers, shutters and dock equipment.', image: '/images/g-speed-gate-lobby.webp', badges: ['GeM', 'CE', 'TUV'] }}
      schema={{ '@context': 'https://schema.org', '@type': 'AboutPage', name: 'About Zenitrix Entrance Automations', url: `${SITE.base}/about/`, about: { '@id': orgId }, mainEntity: { '@id': orgId } }}>
      <H2>Who we are</H2>
      <P>Zenitrix Technologies is an automation company based in Banjara Hills, Hyderabad, with 10+ years of experience serving Hyderabad, Telangana and Andhra Pradesh. We help homes, gated communities, offices, hospitals, hotels, warehouses and factories open, close and secure their entrances with reliable automatic gates, doors and barriers.</P>
      <P>We handle the whole job. That means a site visit and measurement, choosing the right product, supply, neat installation, testing, handover training, repair and annual maintenance. We also service systems installed by other vendors, so you have one dependable team to call.</P>

      <H2>What we do</H2>
      <P>Our product portfolio covers residential, commercial and industrial access requirements, from villa gates and garage doors to factory docks.</P>
      <CardGrid cols={3} items={categories.map(c => ({ name: c.name, href: `/products/${c.slug}/`, image: categoryImage(c.slug) }))} />

      <div className="my-6 -mx-4 md:mx-0 md:rounded-2xl overflow-hidden"><TaglineStrip compact /></div>

      <H2>Why customers choose us</H2>
      <UL items={why} />

      <H2>How we work</H2>
      <Steps items={['Free site visit and measurement', 'Product choice and written quote', 'Neat, safe installation', 'Testing and handover training', 'AMC and breakdown support']} />

      <H2>Our mission</H2>
      <P>To make every entrance in Hyderabad safer, smoother and smarter. Whether you need a gate that opens from your phone, a glass entrance that welcomes visitors, or a high-speed door that keeps a warehouse moving, we aim to give honest advice, solid workmanship and support that lasts long after installation.</P>

      <H2>Who we serve</H2>
      <P>Our work spans villas, apartment communities, IT parks, hospitals, hotels, airports, factories, cold storage, data centres and government sites.</P>
      <ul className="flex flex-wrap gap-2 mb-3">{industries.map(i => <li key={i.slug}><Link href={`/industries/${i.slug}/`} className="block rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm hover:text-blue-600">{i.name}</Link></li>)}</ul>

      <H2>Services after the sale</H2>
      <ul className="grid sm:grid-cols-2 gap-2 mb-3">{services.map(s => <li key={s.slug}><Link href={`/services/${s.slug}/`} className="card-glow block rounded-xl border border-slate-200 bg-white p-3 text-sm font-medium">{s.name.split(':')[0]} <span aria-hidden className="text-blue-500">→</span></Link></li>)}</ul>

      <H2>Visit or contact us</H2>
      <P>{SITE.address.street}, {SITE.address.city}, {SITE.address.region} {SITE.address.zip}. Call {SITE.phone} or email {SITE.email}.</P>

      <FaqBlock faqs={faqs} />
      <QuoteCta />
    </Page>
  )
}
