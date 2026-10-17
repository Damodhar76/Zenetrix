import { masterKeywordsFor } from '@/lib/keywords'
import Link from 'next/link'
import { Page, H2, P, FaqBlock, QuoteCta } from '@/components/layout/Page'
import { services } from '@/data/catalog'
import { serviceCopy } from '@/data/content'
import { faqs } from '@/data/faqs'
import { areas } from '@/data/areas'
import { ServiceIcon } from '@/components/ui/ServiceIcon'
import { meta } from '@/lib/seo'

export const metadata = meta({
  title: 'Gate & Door Services in Hyderabad',
  description: 'Automatic gate installation, repair, AMC, retrofit, smart control, access control and spare parts in Hyderabad. Any brand. Call +91 85006 32002.',
  path: '/services/',
  keywords: masterKeywordsFor(['repair','amc','maintenance','installation','retrofit','existing','convert','spare parts','upgrade','service','quotation','warranty'], 150),
})

export default function Services() {
  return (
    <Page crumbs={[{ name: 'Services', path: '/services/' }]}
      hero={{ eyebrow: 'Services', title: 'Automatic Gate and Door Services in Hyderabad', intro: 'Installation, repair, AMC, retrofit, smart control, access control and spare parts for systems from any brand.', image: '/images/service.webp' }}>
      <P>From a new automatic gate to a one-time repair or a yearly maintenance plan, Zenitrix Technologies handles the full life of your gate, door or barrier across Hyderabad and Telangana. Pick a service below.</P>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {services.map(s => (
          <li key={s.slug}>
            <Link href={`/services/${s.slug}/`} className="svc-card card-glow flex h-full gap-4 rounded-2xl border border-slate-200 bg-white p-5">
              <ServiceIcon slug={s.slug} size={64} />
              <span>
                <span className="block font-heading text-lg font-semibold">{s.name.split(':')[0].replace(' (Any Brand)', '')}</span>
                <span className="mt-1 block text-sm leading-6 text-slate-600">{serviceCopy[s.slug]?.intro.split('. ')[0].replace(/\.$/, '')}.</span>
                <span className="mt-2 inline-block text-sm font-semibold text-blue-600">Learn more →</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <H2>Areas we serve</H2>
      <ul className="flex flex-wrap gap-2">{areas.slice(0, 12).map(a => <li key={a.slug}><Link className="block rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-sm hover:text-blue-600" href={`/hyderabad/${a.slug}/`}>{a.name}</Link></li>)}</ul>
      <FaqBlock faqs={faqs.slice(0, 5)} />
      <QuoteCta product="Gate and door services" />
    </Page>
  )
}
