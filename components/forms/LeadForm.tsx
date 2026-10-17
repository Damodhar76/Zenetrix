'use client'
import { useState } from 'react'
import Script from 'next/script'
import { useRouter } from 'next/navigation'
import { waLink } from '@/lib/site'
import { categories, products } from '@/data/catalog'

// Only these families need a weight: it decides the motor size. Shutters, high-speed doors, dock equipment, barriers and RFID do not.
const WEIGHT_LABEL: Record<string, string> = { 'gate-automation': 'Gate weight (approx.)', 'automatic-doors': 'Door weight (approx.)', 'sectional-doors': 'Door weight (approx.)', 'garage-doors': 'Door weight (approx.)' }
const GROUPS = categories.map(c => ({ slug: c.slug, name: c.name, items: products.filter(p => p.category === c.slug).map(p => p.name) }))
const catOf = (name: string) => GROUPS.find(g => g.items.includes(name))?.slug ?? ''

const TS = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
const MAX_PHOTO_CHARS = 1_400_000 // data-URL length after shrinking (about 1 MB)

// Shrinks a phone photo to at most 1280 px JPEG in the browser so the upload stays small (Blueprint 16: optional photo upload).
async function shrink(file: File): Promise<string> {
  const bmp = await createImageBitmap(file)
  const scale = Math.min(1, 1280 / Math.max(bmp.width, bmp.height))
  const c = document.createElement('canvas')
  c.width = Math.max(1, Math.round(bmp.width * scale)); c.height = Math.max(1, Math.round(bmp.height * scale))
  c.getContext('2d')!.drawImage(bmp, 0, 0, c.width, c.height)
  for (const q of [0.75, 0.6, 0.45]) { const d = c.toDataURL('image/jpeg', q); if (d.length <= MAX_PHOTO_CHARS) return d }
  throw new Error('too_big')
}

// Posts to /api/lead (email / Sheet / Turnstile when configured). If nothing is configured or the request fails,
// it falls back to a prefilled WhatsApp message so no lead is lost (Blueprint 16). 4 required fields, the rest optional.
export function LeadForm({ product = '', width = '', weight = '', note = '' }: { product?: string; width?: string; weight?: string; note?: string }) {
  const router = useRouter()
  const [hp, setHp] = useState('')
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const [photoName, setPhotoName] = useState('')
  const [more, setMore] = useState(false)
  const known = GROUPS.some(g => g.items.includes(product))
  const [prod, setProd] = useState(known ? product : (product && !GROUPS.some(g => g.name === product) && !/^high-speed doors$/i.test(product) ? product : ''))
  const cat = catOf(prod)
  const customProd = Boolean(prod) && !cat // e.g. a service name passed from a service page: weight stays optional
  const showWeight = Boolean(WEIGHT_LABEL[cat]) || customProd || !prod
  const needWeight = Boolean(WEIGHT_LABEL[cat])
  const weightLabel = WEIGHT_LABEL[cat] ?? 'Gate / door weight (approx.)'

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (hp || busy) return
    setBusy(true); setErr('')
    const f = new FormData(e.currentTarget)
    const g = (k: string) => String(f.get(k) ?? '')
    const text = `Hi Zenitrix, I am ${g('name')} (${g('phone')}) from ${g('area')}. Interested in: ${g('product')}. Site: ${g('site')}.${` Opening width: ${g('width')}, height: ${g('height')}.`}${g('weight') ? ` Approx. weight: ${g('weight')}.` : ''}${g('time') ? ` Best time: ${g('time')}.` : ''}${note ? ` ${note}` : ''}${photoName ? ' I will send a photo of the site here.' : ''}`
    ;(window as unknown as { gtag?: (...a: unknown[]) => void }).gtag?.('event', 'form_submit')
    let photo = ''
    const file = f.get('photo')
    if (file instanceof File && file.size > 0) {
      try { photo = await shrink(file) } catch { setErr('That photo is too large or not an image. Please send it on WhatsApp instead, or try a smaller one.'); setBusy(false); return }
    }
    try {
      const r = await fetch('/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: g('name'), phone: g('phone'), email: g('email'), area: g('area'), product: g('product'), site: g('site'), width: g('width'), height: g('height'), weight: showWeight ? g('weight') : '', time: g('time'), note, photo, website: hp, page: location.pathname, token: g('cf-turnstile-response') }) })
      const j = await r.json().catch(() => ({}))
      if (r.ok && j.delivered) { router.push('/thank-you/'); return }
      if (r.status === 422) { setErr('Please check your name, phone, area, product, width and height.'); setBusy(false); return }
    } catch {}
    window.location.href = waLink(text) // fallback: no lead lost
  }
  const input = 'mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 md:py-2.5 text-sm md:text-[15px] min-w-0 font-normal placeholder:text-slate-400 transition focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15 outline-none'
  return (
    <form onSubmit={onSubmit} className="grid gap-2 md:gap-2.5 w-full text-xs md:text-sm font-semibold text-slate-800">
      {TS && <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" />}
      <div className="grid grid-cols-2 gap-2 md:gap-2.5">
        <label>Name<input suppressHydrationWarning required name="name" className={input} autoComplete="name" /></label>
        <label>Phone<input suppressHydrationWarning required name="phone" type="tel" inputMode="tel" pattern="[+0-9][0-9 \-]{7,17}" className={input} autoComplete="tel" /></label>
      </div>
      <div className="grid grid-cols-2 gap-2 md:gap-2.5">
        <label>Area<input suppressHydrationWarning required name="area" className={input} placeholder="Banjara Hills" /></label>
        <label>Product
          <select suppressHydrationWarning required name="product" value={prod} onChange={e => setProd(e.target.value)} className={input}>
            <option value="" disabled>Select product</option>
            {customProd && <option value={prod}>{prod}</option>}
            {GROUPS.map(g => <optgroup key={g.slug} label={g.name}>{g.items.map(n => <option key={n} value={n}>{n}</option>)}</optgroup>)}
          </select>
        </label>
      </div>
      <div className="grid grid-cols-2 gap-2 md:gap-2.5">
        <label className={showWeight ? '' : 'col-span-2'}>Site type
          <select suppressHydrationWarning name="site" className={input}>{['Villa', 'Apartment / community', 'IT park / office', 'Factory / warehouse', 'Other'].map(s => <option key={s}>{s}</option>)}</select>
        </label>
        {showWeight && <label>{weightLabel}<input suppressHydrationWarning required={needWeight} name="weight" defaultValue={weight} className={input} placeholder={needWeight ? 'e.g. 300 kg or Not sure' : 'Optional'} /></label>}
      </div>
      <div className="grid grid-cols-2 gap-2 md:gap-2.5">
        <label>Width<input suppressHydrationWarning required name="width" defaultValue={width} className={input} placeholder="e.g. 4 m" /></label>
        <label>Height<input suppressHydrationWarning required name="height" className={input} placeholder="e.g. 1.8 m" /></label>
      </div>
      {needWeight && <p className="-mt-1 text-[10px] md:text-[11px] font-normal text-slate-500">Weight decides the motor size. A rough guess is fine, we confirm it at the free site visit.</p>}
      <div>
        <button suppressHydrationWarning type="button" onClick={() => setMore(m => !m)} aria-expanded={more} className="md:hidden w-full rounded-lg border border-dashed border-slate-300 px-3 py-2 text-blue-600 flex justify-between">More details (optional)<span aria-hidden className={`transition-transform ${more ? 'rotate-45' : ''}`}>+</span></button>
        <div className={`${more ? 'grid' : 'hidden'} md:grid gap-2.5 md:gap-4 mt-2 md:mt-0 md:grid-cols-2`}>
          <label>Best time
            <select suppressHydrationWarning name="time" className={input}><option value="">Any time</option><option>Morning</option><option>Afternoon</option><option>Evening</option></select>
          </label>
          <label>Email<input suppressHydrationWarning name="email" type="email" className={input} autoComplete="email" /></label>
          <label className="md:col-span-2">Photo of the site
            <input suppressHydrationWarning name="photo" type="file" accept="image/*" onChange={e => setPhotoName(e.target.files?.[0]?.name ?? '')} className={`${input} file:mr-3 file:rounded-lg file:border-0 file:bg-gradient-to-r file:from-cyan-400 file:to-blue-700 file:px-3 file:py-1 file:text-white file:font-semibold text-xs`} />
          </label>
        </div>
      </div>
      <input suppressHydrationWarning tabIndex={-1} autoComplete="off" aria-hidden className="hidden" value={hp} onChange={e => setHp(e.target.value)} name="website" />
      {TS && <div className="cf-turnstile" data-sitekey={TS} />}
      {err && <p role="alert" className="text-red-600">{err}</p>}
      <button suppressHydrationWarning className="btn !py-2 md:!py-2.5 text-sm md:text-base w-full disabled:opacity-60" type="submit" disabled={busy}>{busy ? 'Sending…' : 'Request free site visit'}</button>
      <p className="text-[10px] md:text-[11px] text-slate-500 font-normal">By sending, you agree to be contacted about your enquiry. See our <a className="underline" href="/privacy-policy/">Privacy Policy</a>.</p>
    </form>
  )
}
