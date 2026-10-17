'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { SearchItem } from '@/data/search'
import { matchSearch } from '@/lib/searchMatch'

// Search bar for phones and tablets. The header shows it only after the search icon is tapped (desktop has its own icon link).
// Shows live suggestions from /search-index.json (loaded on first focus) and submits to /search/?q=.
export function MobileSearch() {
  const router = useRouter()
  const path = usePathname()
  const [q, setQ] = useState('')
  const [focus, setFocus] = useState(false)
  const [index, setIndex] = useState<SearchItem[] | null>(null)
  const asked = useRef(false)
  const box = useRef<HTMLFormElement>(null)

  useEffect(() => { setFocus(false); setQ('') }, [path])
  useEffect(() => { load() }, []) // eslint-disable-line react-hooks/exhaustive-deps -- bar only mounts after the icon tap, so fetch the index now
  useEffect(() => {
    const off = (e: PointerEvent) => { if (box.current && !box.current.contains(e.target as Node)) setFocus(false) }
    document.addEventListener('pointerdown', off); return () => document.removeEventListener('pointerdown', off)
  }, [])
  const load = () => {
    if (asked.current) return
    asked.current = true
    fetch('/search-index.json').then(r => r.json()).then(setIndex).catch(() => { asked.current = false })
  }
  const hits = useMemo(() => matchSearch(index, q, 6), [index, q])
  const open = focus && q.trim().length > 0

  return (
    <form ref={box} role="search" action="/search/" method="get" className="relative"
      onSubmit={e => { e.preventDefault(); const t = q.trim(); if (t) { setFocus(false); router.push(`/search/?q=${encodeURIComponent(t)}`) } }}>
      <label htmlFor="m-search" className="sr-only">Search products, services and areas</label>
      <div className="flex h-[42px] items-center rounded-full border border-slate-300 bg-slate-50 pl-4 pr-1 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/15">
        <svg width="17" height="17" viewBox="0 0 20 20" aria-hidden className="shrink-0 text-slate-500"><circle cx="9" cy="9" r="6" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M14 14l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
        <input suppressHydrationWarning autoFocus id="m-search" name="q" type="search" enterKeyHint="search" autoComplete="off" autoCapitalize="none" spellCheck={false} maxLength={80}
          value={q} onChange={e => { setQ(e.target.value); setFocus(true) }} onFocus={() => { setFocus(true); load() }} onKeyDown={e => { if (e.key === 'Escape') setFocus(false) }}
          placeholder="Search gates, doors, areas…" className="h-full min-w-0 flex-1 bg-transparent px-2.5 text-base outline-none placeholder:text-slate-500" />
        <button suppressHydrationWarning type="submit" aria-label="Search" className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-700 text-white">
          <svg width="15" height="15" viewBox="0 0 20 20" aria-hidden><path d="M4 10h11M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>
      {open && (
        <div className="absolute inset-x-0 top-[calc(100%+6px)] z-[60] max-h-[min(60dvh,420px)] overflow-y-auto overscroll-contain rounded-2xl border border-slate-200 bg-white p-1.5 shadow-2xl" aria-live="polite">
          {!index && <p className="px-3 py-3 text-sm text-slate-500">Searching…</p>}
          {index && hits.length === 0 && <p className="px-3 py-3 text-sm text-slate-600">No match for “{q.trim()}”. Try “sliding gate” or “repair”.</p>}
          <ul>
            {hits.map(r => (
              <li key={r.u}><Link href={r.u} onClick={() => setFocus(false)} className="flex min-h-[48px] items-center justify-between gap-3 rounded-xl px-3 py-2 active:bg-surface">
                <span className="min-w-0 truncate text-[15px] font-medium">{r.t}</span>
                <span className="shrink-0 rounded-full bg-surface px-2.5 py-0.5 text-[11px] font-semibold text-blue-700">{r.k}</span>
              </Link></li>
            ))}
          </ul>
          {index && hits.length > 0 && <Link href={`/search/?q=${encodeURIComponent(q.trim())}`} onClick={() => setFocus(false)} className="block px-3 py-3 text-sm font-semibold text-blue-600">See all results →</Link>}
        </div>
      )}
    </form>
  )
}
