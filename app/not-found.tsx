import type { Metadata } from 'next'
import Link from 'next/link'
import { SearchBox } from '@/components/search/SearchBox'
import { SITE, waLink } from '@/lib/site'
import { categories } from '@/data/catalog'

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'This page could not be found. Search Zenitrix Technologies products, services and areas, or contact us.',
  robots: { index: false, follow: true },
}

// Shown for every unknown URL (HTTP status 404). Header, footer and the mobile search bar come from the root layout.
export default function NotFound() {
  const popular = [
    ...categories.slice(0, 4).map(c => ({ name: c.name, href: `/products/${c.slug}/` })),
    { name: 'Gate repair and AMC', href: '/services/amc/' },
    { name: 'Hyderabad areas we serve', href: '/hyderabad/' },
  ]
  return (
    <main id="main" className="mx-auto max-w-3xl px-4 py-10 md:py-16">
      <p className="eyebrow">Error 404</p>
      <h1 className="h-page mt-4">Sorry, we could not find that page</h1>
      <p className="mt-3 text-slate-700 leading-7">The link may be old or mistyped. Search for what you need, or pick one of these. Our team is also happy to help directly.</p>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 md:p-6 shadow-sm"><SearchBox /></div>

      <h2 className="mt-8 text-lg font-semibold">Popular pages</h2>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {popular.map(p => (
          <li key={p.href}><Link href={p.href} className="card-glow flex min-h-[48px] items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 font-medium">{p.name}<span aria-hidden className="text-blue-500">→</span></Link></li>
        ))}
      </ul>

      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Link href="/" className="btn">Go to home page</Link>
        <a href={`tel:${SITE.phoneTel}`} className="btn btn-ghost">Call {SITE.phone}</a>
        <a href={waLink('Hi Zenitrix, I could not find a page on your website')} className="btn btn-ghost">WhatsApp us</a>
      </div>
    </main>
  )
}
