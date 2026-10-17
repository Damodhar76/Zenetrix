import { notFound } from 'next/navigation'
import { services, categories } from '@/data/catalog'
import { areas } from '@/data/areas'
import { faqs } from '@/data/faqs'
import { serviceCopy } from '@/data/content'
import { Page, H2, P, UL, Steps, LinkList, FaqBlock, QuoteCta, DataTable } from '@/components/layout/Page'
import { amcPlans, commitments } from '@/data/amc'
import { serviceImage, repairShots } from '@/lib/images'
import { srcSet } from '@/lib/img'
import { meta } from '@/lib/seo'
import { serviceSchema, howTo } from '@/lib/schema'
import { serviceSeo } from '@/data/serviceSeo'
import { JsonLd } from '@/components/seo/JsonLd'

export const dynamicParams = false
export const generateStaticParams = () => services.map(s => ({ slug: s.slug }))
type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props) {
  const { slug } = await params; const s = services.find(x => x.slug === slug); if (!s) return {}
  const seo = serviceSeo[s.slug]
  return meta({ title: seo?.title ?? `${s.name} in Hyderabad`, description: seo?.description ?? `${s.name} by Zenitrix in Hyderabad, covering systems from any brand. Call or WhatsApp +91 85006 32002 for a quote.`, path: `/services/${s.slug}/`, keywords: seo?.keywords, image: serviceImage(s.slug) })
}
export default async function Service({ params }: Props) {
  const { slug } = await params; const s = services.find(x => x.slug === slug); if (!s) notFound()
  const path = `/services/${s.slug}/`
  const copy = serviceCopy[s.slug]
  const seo = serviceSeo[s.slug]
  const faqList = seo ? [...seo.faqs, ...faqs.slice(3, 5)] : faqs.slice(3, 7)
  return (
    <Page crumbs={[{ name: s.name, path }]} schema={serviceSchema(s.name, path, undefined, { description: seo?.description, keywords: seo?.keywords })}
      hero={{ eyebrow: 'Services', title: `${s.name} in Hyderabad`, intro: 'Covering systems from any brand, with fast response across Hyderabad.', image: serviceImage(s.slug) }}>
      <JsonLd data={howTo(`How ${s.name} works`, copy.process)} />
      {seo ? seo.intro.map(t => <P key={t}>{t}</P>) : <P>{copy.intro}</P>}
      {seo && seo.sections.map(sec => (<section key={sec.h}><H2>{sec.h}</H2><div className="grid sm:grid-cols-2 gap-4">{sec.items.map(it => (<div key={it.h} className="card-glow rounded-2xl border border-slate-200 bg-white p-4 md:p-5"><h3 className="font-heading font-semibold text-lg">{it.h}</h3><p className="mt-1.5 text-slate-700 leading-7">{it.p}</p></div>))}</div></section>))}
      {s.slug === 'automatic-gate-repair' && (
        <>
          <H2>What we repair</H2>
          <div className="grid sm:grid-cols-3 gap-4 mt-3">
            {repairShots.map(r => (
              <figure key={r.src} className="m-0">
                <img src={r.src} srcSet={srcSet(r.src)} sizes="(max-width:640px) 100vw, 33vw" alt={`${r.label} repair in Hyderabad`} width={640} height={400} loading="lazy" decoding="async" className="w-full h-auto rounded-xl ring-1 ring-slate-200" />
                <figcaption className="mt-2 text-sm text-slate-600">{r.label}</figcaption>
              </figure>
            ))}
          </div>
        </>
      )}
      <H2>What is included</H2><UL items={copy.scope} />
      <H2>How it works</H2><Steps items={copy.process} />
      {commitments.length > 0 ? (<><H2>Our service commitments</H2><UL items={commitments} /></>) : <P>Tell us about the fault or the site and we will confirm response time and warranty terms in your written quote.</P>}
      {s.slug === 'amc' && (amcPlans.length > 0
        ? (<><H2>AMC plans</H2><DataTable caption="AMC plans" head={['Plan', 'Visits', 'Response', 'Coverage']} rows={amcPlans.map(x => [x.name, x.visits, x.response, x.coverage])} /></>)
        : <P>AMC plans, visit frequency and parts cover are set per site. Request a free site visit and we will propose a plan in writing.</P>)}
      <H2>Related products</H2>
      <LinkList items={categories.map(c => ({ name: c.name, href: `/products/${c.slug}/` }))} />
      <H2>Areas we serve</H2>
      <LinkList items={areas.slice(0, 8).map(a => ({ name: a.name, href: `/hyderabad/${a.slug}/` }))} />
      <FaqBlock faqs={faqList} />
      <QuoteCta product={s.name} />
    </Page>
  )
}
