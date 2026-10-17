'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { srcSet } from '@/lib/img'

export type GalleryItem = { src: string; alt: string; caption?: string }

// Responsive image grid with an accessible lightbox (Esc closes, arrow keys navigate, focus is moved and restored).
export function Gallery({ items, cols = 4 }: { items: GalleryItem[]; cols?: 2 | 3 | 4 }) {
  const [i, setI] = useState<number | null>(null)
  const closeBtn = useRef<HTMLButtonElement>(null)
  const opener = useRef<HTMLElement | null>(null)
  const grid = cols === 2 ? 'sm:grid-cols-2' : cols === 3 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2 lg:grid-cols-4'

  const close = useCallback(() => { setI(null); opener.current?.focus() }, [])
  const step = useCallback((d: number) => setI(v => (v === null ? v : (v + d + items.length) % items.length)), [items.length])

  useEffect(() => {
    if (i === null) return
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1) }
    document.addEventListener('keydown', key)
    document.body.style.overflow = 'hidden'
    closeBtn.current?.focus()
    return () => { document.removeEventListener('keydown', key); document.body.style.overflow = '' }
  }, [i, close, step])

  const cur = i === null ? null : items[i]
  return (
    <>
      <ul className={`grid grid-cols-2 ${grid} gap-2.5 md:gap-4`}>
        {items.map((it, k) => (
          <li key={it.src}>
            <button suppressHydrationWarning type="button" onClick={e => { opener.current = e.currentTarget; setI(k) }} aria-label={`Open image: ${it.caption ?? it.alt}`}
              className="group block w-full overflow-hidden rounded-2xl border border-slate-200 bg-white text-left hover:shadow-xl transition">
              <div className="overflow-hidden bg-ink"><img src={it.src} srcSet={srcSet(it.src)} sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw" alt={it.alt} width={1152} height={720} loading="lazy" decoding="async" className="w-full h-auto aspect-[16/10] object-cover group-hover:scale-105 transition-transform duration-500" /></div>
              {it.caption && <p className="px-4 py-3 text-sm font-medium">{it.caption}</p>}
            </button>
          </li>
        ))}
      </ul>
      {cur && (
        <div role="dialog" aria-modal="true" aria-label={cur.caption ?? cur.alt} className="fixed inset-0 z-[60] grid place-items-center bg-black/90 p-4" onClick={close}>
          <div className="relative w-full max-w-5xl" onClick={e => e.stopPropagation()}>
            <img src={cur.src} alt={cur.alt} width={1152} height={720} className="w-full h-auto max-h-[80vh] object-contain rounded-xl" />
            {cur.caption && <p className="mt-3 text-center text-white">{cur.caption} <span className="text-slate-400">({(i ?? 0) + 1} / {items.length})</span></p>}
            <button suppressHydrationWarning ref={closeBtn} type="button" onClick={close} aria-label="Close image" className="absolute -top-3 -right-3 grid h-10 w-10 place-items-center rounded-full bg-white text-ink shadow-lg">✕</button>
            {items.length > 1 && (<>
              <button suppressHydrationWarning type="button" onClick={() => step(-1)} aria-label="Previous image" className="absolute left-2 top-1/2 -translate-y-1/2 grid h-11 w-11 place-items-center rounded-full bg-white/90 text-ink">‹</button>
              <button suppressHydrationWarning type="button" onClick={() => step(1)} aria-label="Next image" className="absolute right-2 top-1/2 -translate-y-1/2 grid h-11 w-11 place-items-center rounded-full bg-white/90 text-ink">›</button>
            </>)}
          </div>
        </div>
      )}
    </>
  )
}
