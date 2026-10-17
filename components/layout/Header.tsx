'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { categories, productsIn, services } from '@/data/catalog'
import { SITE, waLink } from '@/lib/site'
import { ServiceIcon } from '@/components/ui/ServiceIcon'
import { Social } from '@/components/ui/Social'
import dynamic from 'next/dynamic'

// Loaded only when the phone search icon is tapped (keeps the first page load lighter).
const MobileSearch = dynamic(() => import('@/components/search/MobileSearch').then(m => m.MobileSearch), { ssr: false, loading: () => <div className="h-[42px]" /> })

const NAV = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about/' },
  { name: 'Products', href: '/products/', mega: 'products' },
  { name: 'Services', href: '/services/', mega: 'services' },
  { name: 'Projects', href: '/projects/' },
  { name: 'Blog', href: '/blog/' },
  { name: 'Contact', href: '/contact/' },
] as const

export function Header() {
  const path = usePathname() || '/'
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false) // phones/tablets: search bar drops down only after tapping the search icon
  const [scrolled, setScrolled] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null) // desktop: which mega menu is open (hover, keyboard focus)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [armed, setArmed] = useState(false) // mega menus render only after first hover/focus (saves image requests on load)
  const [openCat, setOpenCat] = useState<string | null>(null) // mobile: expanded product category
  useEffect(() => { setOpen(false); setHovered(null); setSearchOpen(false) }, [path])
  // Hover intent: open at once, close after a short delay so the pointer can cross small gaps without the menu flickering shut.
  const openMega = (name: string) => { if (timer.current) clearTimeout(timer.current); setArmed(true); setHovered(name) }
  const scheduleClose = () => { if (timer.current) clearTimeout(timer.current); timer.current = setTimeout(() => setHovered(null), 160) }
  const closeMega = () => { if (timer.current) clearTimeout(timer.current); setHovered(null); (document.activeElement as HTMLElement | null)?.blur() }
  useEffect(() => {
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') { setHovered(null); setSearchOpen(false); setOpen(false) } }
    window.addEventListener('keydown', esc); return () => { window.removeEventListener('keydown', esc); if (timer.current) clearTimeout(timer.current) }
  }, [])
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8)
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (open) document.body.dataset.menu = 'open'; else delete document.body.dataset.menu
    return () => { document.body.style.overflow = ''; delete document.body.dataset.menu }
  }, [open])
  // Close the drawer if the screen grows to desktop width (rotate / resize).
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const on = () => { if (mq.matches) setOpen(false) }
    mq.addEventListener('change', on); return () => mq.removeEventListener('change', on)
  }, [])
  const active = (href: string) => href === '/' ? path === '/' : path.startsWith(href.split('/').slice(0, 2).join('/'))

  return (
    <header className={`sticky top-0 z-50 bg-white transition-shadow ${scrolled ? 'shadow-md' : 'border-b border-slate-200'}`}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:bg-white focus:p-2 focus:rounded">Skip to content</a>

      <div className="hidden lg:block bg-ink text-slate-300 text-xs">
        <div className="mx-auto max-w-7xl px-6 h-9 flex items-center justify-between">
          <span>{SITE.address.street.split(',').slice(-2).join(',').trim()}, {SITE.address.city} {SITE.address.zip}</span>
          <span className="flex gap-5">
            <a className="hover:text-white" href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <a className="hover:text-white font-semibold" href={`tel:${SITE.phoneTel}`}>Call {SITE.phone}</a>
            <Social size={26} only={['youtube', 'x', 'pinterest', 'justdial']} className="!gap-1.5 hidden md:flex" />
          </span>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 lg:px-6 h-[60px] lg:h-[72px] flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="Zenitrix Technologies home">
          <img src="/images/zenitrix-logo-sm.webp" alt="Zenitrix Technologies" width={158} height={40} className="h-[32px] lg:h-[40px] w-auto" />
        </Link>

        <nav aria-label="Main" className="hidden lg:flex items-stretch h-full">
          <ul className="flex items-stretch gap-1">
            {NAV.map(n => (
              <li key={n.name} onMouseEnter={() => openMega(n.name)} onFocus={() => openMega(n.name)} onMouseLeave={scheduleClose} onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget as Node | null)) scheduleClose() }} className={`group flex items-stretch ${'mega' in n && n.mega === 'products' ? 'static' : 'relative'}`}>
                <Link href={n.href} aria-current={active(n.href) ? 'page' : undefined}
                  className={`relative flex items-center gap-1 px-4 text-[15px] font-medium transition-colors hover:text-blue-600 ${active(n.href) || hovered === n.name ? 'text-blue-600' : 'text-ink'}`}>
                  {n.name}
                  {'mega' in n && <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden className={`mt-0.5 transition-transform ${hovered === n.name ? 'rotate-180' : ''}`}><path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>}
                  <span className={`absolute left-4 right-4 bottom-0 h-0.5 bg-blue-500 origin-left transition-transform ${active(n.href) || hovered === n.name ? 'scale-x-100' : 'scale-x-0'}`} />
                </Link>

                {armed && 'mega' in n && n.mega === 'products' && (
                  <div className={`${hovered === n.name ? 'visible opacity-100 translate-y-0' : 'invisible opacity-0 translate-y-1 pointer-events-none'} transition-all duration-150 absolute left-0 right-0 top-full bg-white border-t border-slate-200 shadow-xl`}>
                    <div className="mx-auto max-w-7xl px-6 py-7 grid grid-cols-3 gap-x-10 gap-y-7">
                      {categories.map(c => (
                        <div key={c.slug}>
                          <Link onClick={closeMega} href={`/products/${c.slug}/`} className="flex items-center gap-3 font-heading font-semibold text-ink hover:text-blue-600">
                            <img src={`/images/${c.slug}-400.webp`} alt="" width={56} height={35} loading="lazy" decoding="async" className="rounded-md w-14 h-9 object-cover" />
                            {c.name}
                          </Link>
                          <ul className="mt-2 ml-[68px] space-y-1 text-sm text-slate-600">
                            {productsIn(c.slug).slice(0, 4).map(p => <li key={p.slug}><Link onClick={closeMega} className="hover:text-blue-600" href={`/products/${c.slug}/${p.slug}/`}>{p.name}</Link></li>)}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <div className="bg-surface"><div className="mx-auto max-w-7xl px-6 py-3 text-sm flex justify-between"><span className="text-slate-600">Not sure what you need? We will visit your site for free.</span><Link onClick={closeMega} href="/products/" className="font-semibold text-blue-600">View all products →</Link></div></div>
                  </div>
                )}

                {armed && 'mega' in n && n.mega === 'services' && (
                  <div className={`${hovered === n.name ? 'visible opacity-100 translate-y-0' : 'invisible opacity-0 translate-y-1 pointer-events-none'} transition-all duration-150 absolute top-full left-1/2 -translate-x-1/2 w-[34rem] bg-white border border-slate-200 rounded-b-xl shadow-xl`}>
                    <ul className="p-3 grid grid-cols-2 gap-1">
                      {services.map(s => <li key={s.slug}><Link onClick={closeMega} href={`/services/${s.slug}/`} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-ink hover:bg-surface hover:text-blue-600"><ServiceIcon slug={s.slug} size={34} />{s.name.split(':')[0].replace(' (Any Brand)', '')}</Link></li>)}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <Link href="/search/" aria-label="Search the site" className="grid h-10 w-10 place-items-center rounded-full hover:bg-surface"><svg width="18" height="18" viewBox="0 0 20 20" aria-hidden><circle cx="9" cy="9" r="6" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M14 14l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg></Link>
          <a className="btn btn-ghost !py-2 !px-4 text-sm" href={waLink('Hi Zenitrix, I need a quote')}>WhatsApp</a>
          <Link className="btn !py-2 !px-4 text-sm" href="/contact/">Get Free Quote</Link>
        </div>

        <div className="lg:hidden -mr-2 flex items-center">
          <button suppressHydrationWarning type="button" className="grid h-11 w-11 place-items-center rounded-lg" aria-label={searchOpen ? 'Close search' : 'Open search'} aria-expanded={searchOpen} aria-controls="mobile-search" onClick={() => { setSearchOpen(o => !o); setOpen(false) }}>
            <svg width="22" height="22" viewBox="0 0 20 20" aria-hidden>{searchOpen ? <path d="M4 4l12 12M16 4L4 16" stroke="#0B1220" strokeWidth="2" strokeLinecap="round" fill="none" /> : <><circle cx="9" cy="9" r="6" fill="none" stroke="#0B1220" strokeWidth="2" /><path d="M14 14l4 4" stroke="#0B1220" strokeWidth="2" strokeLinecap="round" /></>}</svg>
          </button>
          <button suppressHydrationWarning type="button" className="grid h-11 w-11 place-items-center rounded-lg" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => { setOpen(o => !o); setSearchOpen(false) }}>
            <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden><path d={open ? 'M5 5l14 14M19 5L5 19' : 'M4 7h16M4 12h16M4 17h16'} stroke="#0B1220" strokeWidth="2" strokeLinecap="round" fill="none" /></svg>
          </button>
        </div>
      </div>

      {/* Phones and tablets: search bar drops down over the page (no layout shift) when the search icon is tapped */}
      {searchOpen && <div id="mobile-search" className="lg:hidden absolute inset-x-0 top-full z-50 border-t border-slate-200 bg-white px-4 py-3 shadow-lg"><MobileSearch /></div>}

      {open && (
        <>
          <button type="button" aria-label="Close menu" tabIndex={-1} onClick={() => setOpen(false)} className="lg:hidden fixed inset-0 top-[60px] z-40 bg-ink/50" />
          <div id="mobile-menu" role="dialog" aria-label="Menu" className="lg:hidden fixed inset-x-0 top-[60px] bottom-0 z-50 flex flex-col bg-white border-t border-slate-200">
            <nav aria-label="Mobile" className="flex-1 overflow-y-auto overscroll-contain px-5 pt-2 pb-4">
              <ul className="divide-y divide-slate-100">
                {NAV.map(n => (
                  <li key={n.name}>
                    {'mega' in n ? (
                      <details className="group" name="mobile-top">
                        <summary className="flex min-h-[52px] items-center justify-between text-[17px] font-semibold cursor-pointer list-none">{n.name}
                          <svg width="18" height="18" viewBox="0 0 12 12" className="text-slate-500 group-open:rotate-180 transition-transform" aria-hidden><path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
                        </summary>
                        {n.mega === 'products' ? (
                          <ul className="pb-3 space-y-1.5">
                            {categories.map(c => {
                              const isOpen = openCat === c.slug
                              return (
                                <li key={c.slug} className="rounded-xl bg-slate-50 ring-1 ring-slate-100">
                                  <div className="flex items-center">
                                    <Link onClick={() => setOpen(false)} className="flex min-h-[48px] flex-1 items-center gap-3 py-2 pl-2.5 text-[15px] font-medium text-slate-800" href={`/products/${c.slug}/`}>
                                      <img src={`/images/${c.slug}-400.webp`} alt="" width={44} height={28} loading="lazy" decoding="async" className="rounded-md w-11 h-7 object-cover" />{c.name}
                                    </Link>
                                    <button suppressHydrationWarning type="button" aria-label={`${isOpen ? 'Hide' : 'Show'} ${c.name} products`} aria-expanded={isOpen} onClick={() => setOpenCat(isOpen ? null : c.slug)} className="grid h-12 w-12 place-items-center text-slate-500">
                                      <svg width="14" height="14" viewBox="0 0 12 12" className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden><path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
                                    </button>
                                  </div>
                                  {isOpen && (
                                    <ul className="pb-2 pl-[3.6rem] pr-3 border-t border-slate-200/70">
                                      {productsIn(c.slug).map(p => <li key={p.slug}><Link onClick={() => setOpen(false)} className="block py-2 text-sm text-slate-600" href={`/products/${c.slug}/${p.slug}/`}>{p.name}</Link></li>)}
                                    </ul>
                                  )}
                                </li>
                              )
                            })}
                            <li><Link onClick={() => setOpen(false)} className="block py-2.5 pl-2 text-sm font-semibold text-blue-600" href="/products/">All products →</Link></li>
                          </ul>
                        ) : (
                          <ul className="pb-3 grid grid-cols-1 gap-0.5">
                            {services.map(sv => <li key={sv.slug}><Link onClick={() => setOpen(false)} className="flex min-h-[48px] items-center gap-3 rounded-lg px-1 text-[15px] text-slate-700 active:bg-slate-50" href={`/services/${sv.slug}/`}><ServiceIcon slug={sv.slug} size={32} />{sv.name.split(':')[0].replace(' (Any Brand)', '')}</Link></li>)}
                            <li><Link onClick={() => setOpen(false)} className="block py-2.5 pl-1 text-sm font-semibold text-blue-600" href="/services/">All services →</Link></li>
                          </ul>
                        )}
                      </details>
                    ) : (
                      <Link onClick={() => setOpen(false)} href={n.href} aria-current={active(n.href) ? 'page' : undefined} className={`flex min-h-[52px] items-center text-[17px] font-semibold ${active(n.href) ? 'text-blue-600' : ''}`}>{n.name}</Link>
                    )}
                  </li>
                ))}
              </ul>
              <div className="mt-5 rounded-2xl bg-ink px-3 py-3.5">
                <p className="mb-2.5 px-1 text-[11px] font-semibold uppercase tracking-[.14em] text-slate-400">Follow Zenitrix</p>
                <Social size={38} className="!gap-2 justify-between [&>li]:shrink-0" />
              </div>
            </nav>
            <div className="grid grid-cols-2 gap-3 border-t border-slate-200 bg-white px-5 pt-3 pb-[max(0.9rem,env(safe-area-inset-bottom))] shadow-[0_-8px_20px_-12px_rgba(11,18,32,.25)]">
              <a className="btn !py-3 text-[15px]" href={`tel:${SITE.phoneTel}`}>Call us</a>
              <a className="btn btn-ghost !py-3 text-[15px]" href={waLink('Hi Zenitrix, I need a quote')}>WhatsApp</a>
            </div>
          </div>
        </>
      )}
    </header>
  )
}
