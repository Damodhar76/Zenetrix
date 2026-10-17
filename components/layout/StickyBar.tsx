import Link from 'next/link'
import { SITE, waLink } from '@/lib/site'
export function StickyBar() {
  return (
    <div className="sticky-bar fixed bottom-0 inset-x-0 z-40 grid grid-cols-3 md:hidden bg-white border-t border-slate-200 text-center text-sm font-semibold pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_12px_rgba(0,0,0,.06)]">
      <a className="py-3.5 active:bg-slate-100" href={`tel:${SITE.phoneTel}`}>Call</a>
      <a className="py-3.5 bg-success text-white active:brightness-95" href={waLink('Hi Zenitrix, I need a quote')}>WhatsApp</a>
      <Link className="py-3.5 text-blue-600 active:bg-slate-100" href="/contact/">Get Quote</Link>
    </div>
  )
}
