import { siteKeywords } from '@/lib/keywords'
import Link from 'next/link'
import { Hero } from '@/components/hero/Hero'
import { categories, industries, services, productsIn } from '@/data/catalog'
import { areas } from '@/data/areas'
import { faqs } from '@/data/faqs'
import { FaqBlock, CardGrid, QuoteCta } from '@/components/layout/Page'
import { categoryImage, industryImage } from '@/lib/images'
import { meta } from '@/lib/seo'
import { VideoPlayer } from '@/components/media/VideoPlayer'
import { Gallery } from '@/components/media/Gallery'
import { getVideo, gallery } from '@/data/media'
import { waLink } from '@/lib/site'
import { trustFacts } from '@/data/certificates'
import { testimonials } from '@/data/testimonials'
import { projects } from '@/data/projects'
import { JsonLd } from '@/components/seo/JsonLd'
import { webPage } from '@/lib/schema'
import { ServiceIcon, StepIcon } from '@/components/ui/ServiceIcon'
import { posts } from '@/data/blog'
import { BlogCard } from '@/components/blog/BlogCard'
import { homeSeo } from '@/data/seoContent'
import { TaglineStrip } from '@/components/ui/TaglineStrip'

export const metadata = {
  ...meta({
    title: 'Automatic Gates & Doors in Hyderabad | Zenitrix Technologies',
    description: 'Automatic gate installation, repair and AMC in Hyderabad. Sliding and swing gates, boom barriers, glass doors, shutters. Free site visit. Call +91 85006 32002.',
    path: '/',
    keywords: Array.from(new Set(['automatic gates Hyderabad', 'gate automation Hyderabad', 'automatic gate installation Hyderabad', 'sliding gate Hyderabad', 'swing gate opener Hyderabad', 'boom barrier Hyderabad', 'automatic glass door Hyderabad', 'rolling shutter Hyderabad', 'sectional garage door Hyderabad', 'UHF RFID Hyderabad', 'gate repair Hyderabad', 'gate AMC Hyderabad', 'Zenitrix Technologies', ...siteKeywords()])),
  }),
  title: { absolute: 'Automatic Gates & Doors in Hyderabad | Zenitrix Technologies' },
}

const Section = ({ title, sub, children, tone = 'white', eyebrow }: { title: string; sub?: string; children: React.ReactNode; tone?: 'white' | 'surface'; eyebrow?: string }) => (
  <section className={tone === 'surface' ? 'sec-surface' : 'sec-premium'}>
    <div className="mx-auto max-w-7xl px-4 lg:px-6 py-7 md:py-20">
      <div className="max-w-2xl mb-4 md:mb-10">{eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}<h2 className="h-sec">{title}</h2>{sub && <p className="mt-3 text-slate-600 text-base md:text-lg">{sub}</p>}</div>
      {children}
    </div>
  </section>
)

const steps = [
  ['Site visit', 'We visit, measure and check power, safety and access.', 'visit'],
  ['Design and quote', 'You get a clear written quote with the right product.', 'quote'],
  ['Installation', 'Neat installation by trained technicians.', 'install'],
  ['Training and handover', 'We show you every control, remote and safety feature.', 'handover'],
  ['AMC support', 'Scheduled servicing and fast breakdown response.', 'amc'],
] as const
const controls = ['Mobile app', 'Smartwatch', 'Remote access', 'Push button', 'RFID', 'Keypad', 'ANPR', 'Voice assistants']

export default function Home() {
  return (
    <>
      <JsonLd data={webPage('Automatic Gates & Doors in Hyderabad', '/', 'Supply, installation, repair and AMC of automatic gates, doors, boom barriers and shutters in Hyderabad.')} />
      <Hero />

      <section className="border-b border-slate-200 bg-white relative z-10">
        <h2 className="sr-only">Automation Company in Hyderabad</h2>
        <ul className="mx-auto max-w-7xl px-4 lg:px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
          {[['Hyderabad based', 'Office in Banjara Hills'], ['Any-brand repair', 'We service other vendors’ systems'], ['AMC plans', 'Planned maintenance cover'], ['Free site visit', 'Written quote, no pressure'],
            ...(trustFacts.yearsInBusiness ? [[`${trustFacts.yearsInBusiness}+ years`, 'Of experience']] : []), ...(trustFacts.installations ? [[`${trustFacts.installations}+`, 'Installations completed']] : []),
            ].map(([a, b]) => (
            <li key={a} className="rounded-xl bg-surface px-3 py-3"><p className="font-heading font-semibold text-ink text-sm md:text-base">{a}</p><p className="text-slate-500 text-xs md:text-sm">{b}</p></li>
          ))}
        </ul>
      </section>

      <TaglineStrip />

      <main id="main">
        <Section eyebrow="Products" title="Our Automation Solutions" sub="Professionally selected access and door systems for residential, commercial and industrial environments.">
          <CardGrid items={categories.map(c => ({ name: c.name, href: `/products/${c.slug}/`, image: categoryImage(c.slug), note: productsIn(c.slug).slice(0, 3).map(p => p.name.replace(' Automation', '')).join(' · ') }))} />
        </Section>

        <Section eyebrow="Glass entrances" title="Glass speed gates and automatic entrances" sub="Sleek, secure access for lobbies, offices, hospitals and hotels, with RFID or card readers built in.">
          <div className="grid md:grid-cols-2 gap-5 md:gap-8 items-center">
            <VideoPlayer name="lobby-speed-gate" title="Stainless steel and glass speed gates with RFID in an office lobby" />
            <div>
              <ul className="space-y-2 text-slate-700 text-sm md:text-base">{['Glass flap leaves that open only for a valid card, tag or fingerprint', 'Stainless steel body that suits premium lobbies', 'Works with automatic sliding glass doors at the same entrance', 'Safety sensors stop the leaves if someone is in the way'].map(t => <li key={t} className="flex gap-2"><span aria-hidden className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-500" />{t}</li>)}</ul>
              <div className="mt-5 flex flex-wrap gap-3"><Link href="/products/boom-barriers/" className="btn !py-2.5 text-sm">Speed gates and flap barriers</Link><Link href="/products/automatic-doors/" className="btn btn-ghost !py-2.5 text-sm">Automatic glass doors</Link></div>
            </div>
          </div>
        </Section>

        <Section eyebrow="Process" tone="surface" title="How it works" sub="From first visit to ongoing support in five simple steps.">
          <ol className="relative grid gap-7 lg:grid-cols-5 lg:gap-5">
            <li aria-hidden className="proc-line pointer-events-none absolute left-[10%] right-[10%] top-8 hidden h-0.5 lg:block" />
            {steps.map(([t, d, ic], i) => (
              <li key={t} className={`relative flex gap-4 lg:flex-col lg:items-center lg:text-center ${i < steps.length - 1 ? 'max-lg:before:absolute max-lg:before:left-8 max-lg:before:top-[4.25rem] max-lg:before:-bottom-7 max-lg:before:w-px max-lg:before:bg-blue-500/30' : ''}`}>
                <span className="proc-node relative z-10 grid h-16 w-16 shrink-0 place-items-center rounded-full text-blue-600 ring-1 ring-blue-500/25">
                  <StepIcon name={ic} size={28} />
                  <span className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-blue-600 text-xs font-bold text-white">{i + 1}</span>
                </span>
                <div className="lg:mt-4"><h3 className="font-heading font-semibold text-lg">{t}</h3><p className="mt-1 text-sm text-slate-600">{d}</p></div>
              </li>
            ))}
          </ol>
        </Section>

        <Section eyebrow="Smart control" title="Smart Control Options" sub="Choose how your gate or door opens. Final options depend on the controller supplied.">
          <ul className="flex flex-wrap gap-3">{controls.map(c => <li key={c} className="card-glow rounded-full border border-slate-200 bg-white px-4 py-2 md:px-5 md:py-2.5 text-sm md:text-base font-medium shadow-sm">{c}</li>)}</ul>
          
          <Link href="/services/smart-control/" className="inline-block mt-5 font-semibold text-blue-600">Explore smart control →</Link>
        </Section>

        <Section eyebrow="Videos" tone="surface" title="See it in action" sub="Short clips of gates, barriers, doors and shutters at work.">
          <ul className="no-scrollbar flex md:grid md:grid-cols-3 gap-3 md:gap-5 overflow-x-auto snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0">
            {['hero-car-gate', 'lobby-speed-gate', 'automatic-glass-door'].map(s => { const v = getVideo(s)!; return (
              <li key={s} className="snap-center shrink-0 w-[82%] md:w-auto"><VideoPlayer name={v.slug} title={v.title} caption={v.title} /></li>) })}
          </ul>
          <Link href="/videos/" className="inline-block mt-6 font-semibold text-blue-600">Watch all videos →</Link>
        </Section>

        <section className="on-dark sec-dark relative overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-60" aria-hidden />
          <div className="relative mx-auto max-w-7xl px-4 lg:px-6 py-12 md:py-20 grid md:grid-cols-2 gap-8 md:gap-10 items-center">
            <div>
              <p className="eyebrow dark mb-3">Repair and AMC</p>
              <h2 className="h-sec">Reliable Repair, Maintenance & AMC Support</h2>
              <p className="mt-4 text-slate-300 text-base md:text-lg">Keep your gates, doors and access systems operating with dependable diagnostics, preventive maintenance and responsive support. Our team works across brands and site types in Hyderabad.</p>
              <div className="mt-6 flex flex-wrap gap-3"><Link href="/services/automatic-gate-repair/" className="btn">Repair and Servicing</Link><Link href="/services/amc/" className="btn btn-ghost-dark">AMC Plans</Link></div>
            </div>
            <ul className="grid sm:grid-cols-2 gap-3">{services.map(s => <li key={s.slug}><Link href={`/services/${s.slug}/`} className="glass flex h-full items-center gap-3 rounded-2xl p-3.5 hover:bg-white/10 hover:border-cyan-400/50 transition text-sm font-medium"><ServiceIcon slug={s.slug} size={48} />{s.name.split(':')[0].replace(' (Any Brand)', '')}</Link></li>)}</ul>
          </div>
        </section>

        <Section eyebrow="Industries" title="Industries we serve" sub="Automation matched to how each site is used.">
          <CardGrid cols={4} items={industries.slice(0, 8).map(i => ({ name: i.name, href: `/industries/${i.slug}/`, image: industryImage(i.slug) }))} />
          <p className="mt-6"><span className="text-slate-600">Also: {industries.slice(8).map(i => i.name).join(', ')}.</span></p>
        </Section>

        <Section eyebrow="Gallery" title="Gallery" sub="Gates, doors, barriers and shutters in typical Hyderabad settings. Illustrative scenes; our project photos are added with owner permission.">
          <Gallery items={gallery.slice(0, 4)} />
          <Link href="/gallery/" className="inline-block mt-6 font-semibold text-blue-600">See the full gallery →</Link>
        </Section>

        {projects.length > 0 && (
          <Section title="Recent projects" sub="Real installations across Hyderabad.">
            <CardGrid items={projects.slice(0, 6).map(p => ({ name: p.title, href: `/projects/${p.slug}/`, image: p.image ?? '/images/hero.webp', note: areas.find(a => a.slug === p.area)?.name }))} />
            <Link href="/projects/" className="inline-block mt-6 font-semibold text-blue-600">See all projects →</Link>
          </Section>
        )}

        <Section eyebrow="Coverage" tone="surface" title="Serving Hyderabad" sub="Based in Banjara Hills, serving localities across the city and Secunderabad.">
          <ul className="flex flex-wrap gap-2">{areas.slice(0, 20).map(a => <li key={a.slug}><Link href={`/hyderabad/${a.slug}/`} className="card-glow block rounded-full bg-white border border-slate-200 px-3.5 py-1.5 md:px-4 md:py-2 text-sm hover:text-blue-600">{a.name}</Link></li>)}</ul>
          <Link className="inline-block mt-6 font-semibold text-blue-600" href="/hyderabad/">See all areas →</Link>
        </Section>

        {testimonials.length > 0 && (
          <Section tone="surface" title="What our clients say" sub="Reviews shared with permission.">
            <ul className="grid md:grid-cols-3 gap-5">{testimonials.map(t => (
              <li key={t.name + t.text.slice(0, 12)} className="rounded-2xl bg-white border border-slate-200 p-5"><blockquote className="text-slate-700">“{t.text}”</blockquote>
                <p className="mt-3 text-sm font-semibold">{t.name}{t.area ? `, ${t.area}` : ''}</p>{t.product && <p className="text-xs text-slate-500">{t.product}</p>}</li>))}</ul>
          </Section>
        )}

        <Section eyebrow="Blog" title="Latest from the Zenitrix blog" sub="Plain-language guides on gates, doors, barriers and AMC for Hyderabad properties.">
          <ul className="grid gap-5 md:grid-cols-3">{posts.slice(0, 3).map(p => <li key={p.slug}><BlogCard post={p} /></li>)}</ul>
          <Link href="/blog/" className="inline-block mt-6 font-semibold text-blue-600">Read all {posts.length} guides →</Link>
        </Section>

        <Section eyebrow="About Zenitrix" tone="surface" title="Automatic gates, doors and barriers in Hyderabad: what to know">
          <div className="grid gap-8 md:grid-cols-2 max-w-6xl">
            {homeSeo.map(x => (<article key={x.h}><h3 className="font-heading text-lg font-semibold mb-2">{x.h}</h3>{x.p.map((t, k) => <p key={k} className="text-slate-700 leading-7 mb-3">{t}</p>)}</article>))}
          </div>
        </Section>

        <Section eyebrow="Resources" title="Guides and tools" sub="Learn how automation works and find what suits your site.">
          <ul className="grid sm:grid-cols-3 gap-4">{[['Which automation do I need?', '/which-automation/', 'Three questions, one clear starting point.'], ['Compare options', '/compare/', 'Sliding vs swing, shutters vs sectional doors and more.'], ['Read our guides', '/blog/', 'Plain-language answers on gates, doors and barriers.']].map(([n, h, d]) => (
            <li key={h}><Link href={h} className="card-glow block h-full rounded-2xl border border-slate-200 bg-white p-5"><h3 className="font-heading font-semibold text-lg">{n}</h3><p className="text-sm text-slate-600 mt-1">{d}</p></Link></li>))}</ul>
        </Section>

        <div className="mx-auto max-w-4xl px-4 pb-4">
          <FaqBlock faqs={faqs} />
          <QuoteCta />
          <p className="text-center mt-6 text-sm text-slate-500">Prefer chat? <a className="underline" href={waLink('Hi Zenitrix, I need a quote')}>WhatsApp us</a></p>
        </div>
      </main>
    </>
  )
}
