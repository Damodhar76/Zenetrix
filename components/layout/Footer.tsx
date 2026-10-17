import Link from 'next/link'
import { SITE, waLink } from '@/lib/site'
import { categories, services, industries } from '@/data/catalog'
import { priorityAreas } from '@/data/areas'
import { districts, andhraDistricts } from '@/data/districts'
import { JsonLd } from '../seo/JsonLd'
import { organization, website } from '@/lib/schema'
import { Social } from '@/components/ui/Social'

const Icon = ({ d }: { d: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden className="shrink-0 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
)

export function Footer() {
  const h = 'font-heading font-semibold text-white mb-4 text-base tracking-wide'
  const a = 'text-slate-300 hover:text-cyan-400 transition-colors inline-block'
  const more = 'text-cyan-400 font-medium hover:text-cyan-300 inline-block'
  const stripName = (n: string) => n.split(':')[0].replace(' (Any Brand)', '')
  return (
    <footer className="on-dark relative bg-ink text-white mt-16 md:mt-20 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-50" aria-hidden />
      <JsonLd data={[organization(), website()]} />
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-cyan-400/10 blur-3xl" aria-hidden />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl" aria-hidden />

      <div className="relative bg-gradient-to-r from-[#00B2FF] to-[#0047AB]">
        <div className="mx-auto max-w-7xl px-4 lg:px-6 py-8 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div>
            <p className="font-heading text-lg md:text-2xl font-semibold">Ready to automate your entry?</p>
            <p className="text-white/85 mt-1">Free site visit across Hyderabad, Telangana and Andhra Pradesh. 10+ years of experience. Written quote after measurement.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact/" className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 font-semibold text-blue-700 shadow-lg hover:-translate-y-0.5 transition">Get Free Quote</Link>
            <a href={waLink('Hi Zenitrix, I need a quote')} className="inline-flex items-center justify-center rounded-xl border border-white/70 px-5 py-3 font-semibold text-white hover:bg-white/10 transition">WhatsApp</a>
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 lg:px-6 py-12 md:py-14 grid gap-10 grid-cols-2 lg:grid-cols-12 text-sm">
        <div className="col-span-2 lg:col-span-4">
          <img src="/images/zenitrix-logo-white-sm.webp" alt="Zenitrix Technologies" width={190} height={48} loading="lazy" className="h-10 md:h-12 w-auto" />
          <p className="mt-5 text-slate-300 max-w-sm leading-6">Supply, installation, repair and AMC of automatic gates, doors, boom barriers, flap barriers, shutters and dock equipment in Hyderabad and across Telangana.</p>
          <ul className="mt-6 space-y-3 text-slate-300">
            <li className="flex gap-3"><Icon d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11zM12 12a2 2 0 100-4 2 2 0 000 4z" /><address className="not-italic">{SITE.address.street}, {SITE.address.city}, {SITE.address.region} {SITE.address.zip}</address></li>
            <li className="flex gap-3"><Icon d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" /><a className={a} href={`tel:${SITE.phoneTel}`}>{SITE.phone}</a></li>
            <li className="flex gap-3"><Icon d="M3 6h18v12H3zM3 7l9 7 9-7" /><a className={a} href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
          </ul>
          <p className="mt-6 mb-3 font-heading font-semibold text-white text-base">Follow Zenitrix</p>
          <Social />
        </div>

        <nav aria-label="Products" className="lg:col-span-2"><p className={h}>Products</p><ul className="space-y-2.5">{categories.map(c => <li key={c.slug}><Link className={a} href={`/products/${c.slug}/`}>{c.name}</Link></li>)}<li><Link className={more} href="/products/">All products →</Link></li></ul></nav>
        <nav aria-label="Services" className="lg:col-span-2"><p className={h}>Services</p><ul className="space-y-2.5">{services.map(s => <li key={s.slug}><Link className={a} href={`/services/${s.slug}/`}>{stripName(s.name)}</Link></li>)}</ul></nav>
        <nav aria-label="Company" className="lg:col-span-2">
          <p className={h}>Company</p>
          <ul className="space-y-2.5">{[['Home', '/'], ['About', '/about/'], ['Projects', '/projects/'], ['Gallery', '/gallery/'], ['Videos', '/videos/'], ['Blog', '/blog/'], ['Compare', '/compare/'], ['Which automation?', '/which-automation/'], ['Cost estimator', '/cost-estimator/'], ['Glossary', '/glossary/'], ['FAQ', '/faq/'], ['Contact', '/contact/']].map(([n, hr]) => <li key={hr}><Link className={a} href={hr}>{n}</Link></li>)}</ul>
        </nav>
        <nav aria-label="Areas" className="col-span-2 lg:col-span-2 grid grid-cols-2 lg:grid-cols-1 gap-x-6 gap-y-8">
          <div><p className={h}>Hyderabad</p>
          <ul className="space-y-2.5">{priorityAreas.slice(0, 5).map(x => <li key={x.slug}><Link className={a} href={`/hyderabad/${x.slug}/`}>{x.name}</Link></li>)}<li><Link className={more} href="/hyderabad/">All areas →</Link></li></ul></div>
          <div><p className={h}>Telangana</p>
          <ul className="space-y-2.5">{districts.filter(x => x.priority === 'Very High').slice(0, 5).map(x => <li key={x.slug}><Link className={a} href={`/telangana/${x.slug}/`}>{x.name}</Link></li>)}<li><Link className={more} href="/telangana/">All districts →</Link></li></ul></div>
          <div><p className={h}>Andhra Pradesh</p>
          <ul className="space-y-2.5">{andhraDistricts.filter(x => x.priority === 'Very High').slice(0, 5).map(x => <li key={x.slug}><Link className={a} href={`/andhra-pradesh/${x.slug}/`}>{x.name}</Link></li>)}<li><Link className={more} href="/andhra-pradesh/">All districts →</Link></li></ul></div>
        </nav>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 lg:px-6 pb-10">
        <p className={h}>Industries we serve</p>
        <ul className="flex flex-wrap gap-2">{industries.map(i => <li key={i.slug}><Link href={`/industries/${i.slug}/`} className="glass block rounded-full px-3.5 py-1.5 text-xs text-slate-200 hover:text-cyan-300 hover:border-cyan-400/50 transition">{i.name}</Link></li>)}</ul>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 lg:px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p><Link className="hover:text-white" href="/privacy-policy/">Privacy Policy</Link> · <Link className="hover:text-white" href="/terms/">Terms</Link> · <Link className="hover:text-white" href="/search/">Search</Link></p>
        </div>
      </div>
    </footer>
  )
}
