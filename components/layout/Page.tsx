import Link from 'next/link'
import { srcSet } from '@/lib/img'
import { Breadcrumbs } from './Breadcrumbs'
import { JsonLd } from '../seo/JsonLd'
import { faqPage, webPage } from '@/lib/schema'
import type { Faq } from '@/data/faqs'
import { HeroVideo } from '../media/HeroVideo'
import { LeadForm } from '../forms/LeadForm'
import { SITE, waLink } from '@/lib/site'

type Hero = { title: string; intro?: string; image?: string; eyebrow?: string; badges?: string[]; video?: { name: string; label: string } }

export function Page({ crumbs, children, schema, hero }: { crumbs: { name: string; path: string }[]; children: React.ReactNode; schema?: object | object[]; hero?: Hero }) {
  const last = crumbs[crumbs.length - 1]
  return (
    <>
      <JsonLd data={webPage(hero?.title ?? last?.name ?? 'Zenitrix Technologies', last?.path ?? '/', hero?.intro)} />
      {schema && <JsonLd data={schema} />}
      {hero ? (
        <section className="on-dark relative overflow-hidden bg-ink text-white">
          <div className="absolute inset-0 grid-bg" aria-hidden />
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-cyan-400/20 blur-3xl" aria-hidden />
          <div className="absolute -bottom-32 -left-24 w-80 h-80 rounded-full bg-blue-600/20 blur-3xl" aria-hidden />
          <div className="relative mx-auto max-w-6xl px-4 py-6 md:py-14 grid md:grid-cols-5 gap-4 md:gap-8 items-center">
            <div className="md:col-span-3">
              <Breadcrumbs items={crumbs} dark />
              {hero.eyebrow && <p className="eyebrow dark">{hero.eyebrow}</p>}
              <h1 className="h-page mt-3">{hero.title}</h1>
              {hero.intro && <p className="mt-3 text-slate-300 text-base md:text-lg max-w-xl leading-relaxed">{hero.intro}</p>}
              <div className="mt-5 grid grid-cols-2 sm:flex gap-3">
                <Link href="/contact/" className="btn !px-4 text-sm md:text-base">Get Free Site Visit</Link>
                <a href={waLink('Hi Zenitrix, I need a quote')} className="btn btn-ghost-dark !px-4 text-sm md:text-base">WhatsApp Us</a>
              </div>
            </div>
            {hero.video ? <div className="md:col-span-2"><div className="relative aspect-video overflow-hidden rounded-2xl md:rounded-3xl bg-[#0B1E3A] ring-1 ring-cyan-400/30 shadow-[0_20px_60px_-15px_rgba(0,178,255,.45)]"><HeroVideo name={hero.video.name} label={hero.video.label} priority /></div></div> : hero.image && <div className="md:col-span-2"><img src={hero.image} srcSet={srcSet(hero.image)} sizes="(max-width:768px) 100vw, 40vw" alt="" width={800} height={500} fetchPriority="high" decoding="async" className="w-full h-32 md:h-auto object-cover rounded-2xl md:rounded-3xl ring-1 ring-cyan-400/30 shadow-[0_20px_60px_-15px_rgba(0,178,255,.45)]" />{hero.badges && <ul id="certifications" className="mt-3 flex flex-wrap gap-2 scroll-mt-24" aria-label="Certifications">{hero.badges.map(b => <li key={b} className="rounded-full border border-cyan-400/40 bg-white/10 px-4 py-1.5 text-sm font-semibold tracking-wide text-cyan-200 backdrop-blur">{b}</li>)}</ul>}</div>}
          </div>
        </section>
      ) : null}
      <main id="main" className="mx-auto max-w-5xl px-4 py-5 md:py-8">
        {!hero && <Breadcrumbs items={crumbs} />}
        {children}
      </main>
    </>
  )
}
export const H2 = ({ children }: { children: React.ReactNode }) => <h2 className="h-sec mt-7 md:mt-12 mb-3 flex items-center gap-3"><span aria-hidden className="h-7 w-1.5 shrink-0 rounded-full bg-gradient-to-b from-cyan-400 to-blue-700" />{children}</h2>
export const P = ({ children }: { children: React.ReactNode }) => <p className="text-slate-700 leading-7 mb-3">{children}</p>

export function LinkList({ items }: { items: { name: string; href: string }[] }) {
  return <ul className="grid sm:grid-cols-2 gap-3">{items.map(i => <li key={i.href}><Link className="card-glow flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 font-medium" href={i.href}>{i.name}<span aria-hidden className="text-blue-500">→</span></Link></li>)}</ul>
}

export function CardGrid({ items, cols = 3 }: { items: { name: string; href: string; image: string; note?: string }[]; cols?: 2 | 3 | 4 }) {
  const c = cols === 4 ? 'lg:grid-cols-4' : cols === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-3'
  return (
    <ul className={`grid grid-cols-2 ${c} gap-3 md:gap-5`}>
      {items.map(i => (
        <li key={i.href}>
          <Link href={i.href} className="card-glow group block h-full overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="relative overflow-hidden bg-ink after:absolute after:inset-0 after:bg-gradient-to-t after:from-ink/40 after:to-transparent"><img src={i.image} srcSet={srcSet(i.image)} sizes="(max-width:640px) 50vw, (max-width:1024px) 50vw, 33vw" alt={i.name} width={800} height={500} loading="lazy" className="w-full h-auto aspect-[16/10] object-cover group-hover:scale-105 transition-transform duration-500" /></div>
            <div className="p-3 md:p-4"><h3 className="font-heading font-semibold text-[13px] leading-snug md:text-lg group-hover:text-blue-600">{i.name}</h3>{i.note && <p className="hidden md:block text-sm text-slate-600 mt-1">{i.note}</p>}<span className="hidden md:inline-block mt-2 text-sm font-semibold text-blue-600">Learn more →</span></div>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export function FaqBlock({ faqs }: { faqs: Faq[] }) {
  return (<><JsonLd data={faqPage(faqs)} /><H2>Frequently asked questions</H2>
    <div className="rounded-2xl border border-slate-200 divide-y divide-slate-200 bg-white">
      {faqs.map(f => <details key={f.q} className="group p-3 md:p-4"><summary className="cursor-pointer flex justify-between gap-4 list-none"><h3 className="font-semibold text-[15px]">{f.q}</h3><span aria-hidden className="text-blue-500 group-open:rotate-45 transition-transform text-xl leading-none">+</span></summary><div className="pt-2"><P>{f.a}</P></div></details>)}
    </div></>)
}
export function QuoteCta({ product }: { product?: string }) {
  const tick = <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden className="shrink-0 mt-0.5 text-cyan-400"><circle cx="10" cy="10" r="9" fill="currentColor" opacity=".18" /><path d="M6 10.5l2.7 2.7L14 7.8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  return (
    <section className="on-dark relative mt-8 md:mt-12 overflow-hidden rounded-2xl md:rounded-3xl bg-ink text-white p-3 md:p-10 grid lg:grid-cols-5 gap-8 lg:gap-10 items-start ring-1 ring-cyan-400/20">
      <div className="absolute inset-0 grid-bg opacity-60" aria-hidden />
      <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-cyan-400/20 blur-3xl" aria-hidden />
      <div className="relative lg:col-span-2">
        <p className="eyebrow dark hidden md:inline-flex">Free site visit</p>
        <h2 className="h-sec mt-2">Get a free site visit</h2>
        <p className="mt-2 text-slate-300 text-sm hidden md:block">Tell us what you need. We visit, measure, and send a written quote. You can also WhatsApp or call us directly.</p>
        <ul className="mt-6 space-y-3 text-slate-200 hidden md:block">
          {['We visit and measure your site', 'Clear written quote, no guesswork', 'Installation, testing and AMC under one roof', '10+ years of automation experience'].map(t => <li key={t} className="flex gap-3">{tick}{t}</li>)}
        </ul>
        <div className="mt-7 hidden md:flex flex-wrap gap-3">
          <a href={`tel:${SITE.phoneTel}`} className="btn btn-ghost-dark">Call {SITE.phone}</a>
          <a href={waLink('Hi Zenitrix, I need a quote')} className="btn">WhatsApp</a>
        </div>
      </div>
      <div className="relative lg:col-span-3 text-ink bg-white rounded-xl md:rounded-2xl p-3.5 md:p-7 shadow-2xl ring-1 ring-white/20"><LeadForm product={product} /></div>
    </section>
  )
}

export function UL({ items }: { items: string[] }) {
  return <ul className="mb-3 space-y-2">{items.map(i => <li key={i} className="flex gap-3 text-slate-700 leading-7"><span aria-hidden className="mt-2.5 w-2 h-2 rounded-full bg-blue-500 shrink-0" />{i}</li>)}</ul>
}
export function Steps({ items }: { items: string[] }) {
  return <ol className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-3">{items.map((t, i) => <li key={t} className="card-glow rounded-xl border border-slate-200 bg-white p-4"><span className="font-heading font-bold text-grad text-xl">{i + 1}</span><p className="font-medium mt-1">{t}</p></li>)}</ol>
}

// Responsive table: scrolls inside its own container so the page never scrolls sideways (Blueprint 17).
export function DataTable({ head, rows, caption }: { head: string[]; rows: React.ReactNode[][]; caption?: string }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white mb-3">
      <table className="w-full text-left text-sm">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead className="bg-surface"><tr>{head.map(h => <th key={h} scope="col" className="px-4 py-3 font-heading font-semibold">{h}</th>)}</tr></thead>
        <tbody className="divide-y divide-slate-200">{rows.map((r, i) => <tr key={i}>{r.map((c, j) => j === 0 ? <th key={j} scope="row" className="px-4 py-3 font-medium align-top">{c}</th> : <td key={j} className="px-4 py-3 text-slate-700 align-top">{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  )
}
