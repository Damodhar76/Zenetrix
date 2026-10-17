import { SITE, waLink } from '@/lib/site'

const P = {
  facebook: 'M14 8h3V4h-3a4 4 0 00-4 4v2H7v4h3v6h4v-6h3l1-4h-4V8z',
  instagram: 'M7 3h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4zm5 5a4 4 0 100 8 4 4 0 000-8zm5.2-1.7h.01',
  linkedin: 'M4 9h3.5v11H4zM5.7 3.5a2 2 0 110 4 2 2 0 010-4zM10 9h3.3v1.6c.6-1 1.8-1.9 3.6-1.9 3.2 0 4.1 2.1 4.1 5V20h-3.5v-5.4c0-1.4-.3-2.5-1.8-2.5s-2.2 1.1-2.2 2.6V20H10z',
  pinterest: 'M12 3a9 9 0 100 18 9 9 0 000-18zM10.5 17l1.5-6M9 11.5c0-1.7 1.2-3 3-3s2.800 1 2.800 2.500c0 1.600-.9 3-2.300 3-.8 0-1.300-.5-1.400-1',
  youtube: 'M3 8a3 3 0 013-3h12a3 3 0 013 3v8a3 3 0 01-3 3H6a3 3 0 01-3-3zM10 9l5 3-5 3z',
  x: 'M4 4l6.500 8.700L4 20h1.800l5.500-6.200L16 20h4l-6.800-9L19.500 4h-1.800l-5 5.600L8 4z',
  threads: 'M17.500 9.500C16.800 7 14.800 5.500 12 5.500c-3.300 0-5.500 2.500-5.500 6.500s2.200 6.500 5.500 6.500c2.700 0 4.500-1.400 4.500-3.300 0-2-1.700-3-4-3-1.700 0-2.800.8-2.800 2 0 1 .9 1.600 2 1.600 1.800 0 2.800-1.300 2.800-3.800',
  justdial: 'M5 4h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2zm7 4v5.500a2.500 2.500 0 01-5 0M16 8v8',
  whatsapp: 'M3 21l1.6-4.8A8.5 8.5 0 1112 20.5a8.5 8.5 0 01-4-1zM9 8.5c0 3.500 3 6.500 6.500 6.500l1-1.500-2-1-1 .8a4.500 4.500 0 01-2.300-2.300l.8-1-1-2z',
} as const

const LINKS = [
  { k: 'facebook', name: 'Facebook', href: SITE.social.facebook },
  { k: 'instagram', name: 'Instagram', href: SITE.social.instagram },
  { k: 'linkedin', name: 'LinkedIn', href: SITE.social.linkedin },
  { k: 'pinterest', name: 'Pinterest', href: SITE.social.pinterest },
  { k: 'youtube', name: 'YouTube', href: SITE.social.youtube },
  { k: 'x', name: 'X (Twitter)', href: SITE.social.x },
  { k: 'threads', name: 'Threads', href: SITE.social.threads },
  { k: 'justdial', name: 'Justdial', href: SITE.social.justdial },
  { k: 'whatsapp', name: 'WhatsApp', href: waLink('Hi Zenitrix, I need a quote') },
] as const

export function Social({ size = 40, className = '', only }: { size?: number; className?: string; only?: string[] }) {
  return (
    <ul className={`flex flex-wrap gap-2.5 ${className}`} aria-label="Zenitrix on social media">
      {LINKS.filter(l => !only || only.includes(l.k)).map(l => (
        <li key={l.k}>
          <a href={l.href} target="_blank" rel="noopener noreferrer me" aria-label={`Zenitrix on ${l.name}`} title={l.name}
            style={{ width: size, height: size }}
            className="grid place-items-center rounded-full border border-white/20 bg-white/5 text-slate-200 transition hover:-translate-y-0.5 hover:border-cyan-400 hover:bg-cyan-400/15 hover:text-cyan-300">
            <svg width={size * 0.45} height={size * 0.45} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={P[l.k]} /></svg>
          </a>
        </li>
      ))}
    </ul>
  )
}
