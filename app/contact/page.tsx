import { masterKeywordsFor } from '@/lib/keywords'
import { Page } from '@/components/layout/Page'
import { meta } from '@/lib/seo'
import { SITE, waLink } from '@/lib/site'
import { LeadForm } from '@/components/forms/LeadForm'
export const metadata = meta({ title: 'Contact Zenitrix Technologies', description: 'Call, WhatsApp or request a free site visit from Zenitrix Technologies, Banjara Hills, Hyderabad. Phone +91 85006 32002.', path: '/contact/', keywords: masterKeywordsFor(['quotation','near me','best','company','contractors','price','cost'], 60) })

const I = ({ d }: { d: string }) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={d} /></svg>
const addr = `${SITE.address.street}, ${SITE.address.city}, ${SITE.address.region} ${SITE.address.zip}`

export default function Pg() {
  const cards = [
    { t: 'Visit our office', v: addr, href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addr)}`, cta: 'Get directions', d: 'M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11zM12 12a2 2 0 100-4 2 2 0 000 4z' },
    { t: 'Call us', v: SITE.phone, href: `tel:${SITE.phoneTel}`, cta: 'Call now', d: 'M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z' },
    { t: 'WhatsApp', v: `${SITE.phone}, quick replies`, href: waLink('Hi Zenitrix, I need a quote'), cta: 'Chat on WhatsApp', d: 'M4 20l1.3-4.2A8 8 0 1112 20a8 8 0 01-3.8-1zM9 9c0 3 3 6 6 6l1-2-2-1-1 .8c-1-.4-1.8-1.2-2.2-2.2L11 9.8 10 8z' },
    { t: 'Email', v: SITE.email, href: `mailto:${SITE.email}`, cta: 'Send email', d: 'M3 6h18v12H3zM3 7l9 7 9-7' },
  ]
  return (<Page crumbs={[{ name: 'Contact Zenitrix Technologies', path: '/contact/' }]} hero={{ eyebrow: 'Contact', title: 'Contact Zenitrix Technologies', intro: 'Speak with our team, share your requirements and arrange a professional site assessment.', image: '/images/g-gate-day.webp' }}>
    <div className="grid lg:grid-cols-5 gap-6 md:gap-8 items-start">
      <div className="lg:col-span-2 grid gap-4">
        <h2 className="h-sec">Visit or call us</h2>
        {cards.map(c => (
          <a key={c.t} href={c.href} className="card-glow group flex gap-4 rounded-2xl border border-slate-200 bg-white p-4 md:p-5" {...(c.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-700 text-white shadow-lg shadow-cyan-500/30"><I d={c.d} /></span>
            <span className="min-w-0"><span className="block text-xs font-bold uppercase tracking-widest text-blue-600">{c.t}</span><span className="block mt-1 font-medium text-ink break-words leading-snug">{c.v}</span><span className="mt-1.5 inline-block text-sm font-semibold text-blue-600 group-hover:underline">{c.cta} →</span></span>
          </a>
        ))}
        <div className="on-dark relative overflow-hidden rounded-2xl bg-ink p-5 text-white ring-1 ring-cyan-400/20">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl" aria-hidden />
          <p className="relative eyebrow dark">What happens next</p>
          <ol className="relative mt-4 space-y-3 text-sm text-slate-200">
            {['We call you to confirm a time', 'Our technician visits and measures', 'You get a clear written quote'].map((t, i) => <li key={t} className="flex gap-3"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-700 text-xs font-bold">{i + 1}</span>{t}</li>)}
          </ol>
        </div>
      </div>
      <div className="lg:col-span-3 rounded-3xl border border-slate-200 bg-white p-4 md:p-5 shadow-[0_20px_60px_-25px_rgba(10,132,255,.35)]">
        <h2 className="h-sec mb-2">Request a Site Assessment</h2><p className="mb-3 text-sm text-slate-600">Share the essentials below. We will review your requirements, confirm measurements and recommend the right automation solution.</p>
        <LeadForm />
      </div>
    </div>
  </Page>)
}
