'use client'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import type { SearchItem } from '@/data/search'
import { matchSearch } from '@/lib/searchMatch'

export function SearchBox({ autoFocus = false }: { autoFocus?: boolean }) {
  const [q, setQ] = useState('')
  const [index, setIndex] = useState<SearchItem[] | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => { const p = new URLSearchParams(window.location.search).get('q'); if (p) setQ(p) }, [])
  useEffect(() => {
    if (index || !q) return
    fetch('/search-index.json').then(r => r.json()).then(setIndex).catch(() => setFailed(true))
  }, [q, index])

  const results = useMemo(() => matchSearch(index, q, 30), [q, index])

  return (
    <div>
      <form role="search" onSubmit={e => e.preventDefault()}>
        <label className="block text-sm font-medium" htmlFor="site-q">Search products, services, areas and guides</label>
        <input suppressHydrationWarning id="site-q" type="search" value={q} autoFocus={autoFocus} onChange={e => setQ(e.target.value)} placeholder="For example: boom barrier, repair, Gachibowli"
          className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base focus:border-blue-500" />
      </form>
      <div aria-live="polite" className="mt-4">
        {failed && <p className="text-slate-600">Search is unavailable right now. Please browse the <Link className="underline" href="/products/">products</Link>.</p>}
        {q && index && results.length === 0 && <p className="text-slate-600">No results for “{q}”. Try a product name such as “sliding gate”, or <Link className="underline" href="/contact/">contact us</Link>.</p>}
        <ul className="grid gap-2">
          {results.map(r => (
            <li key={r.u}><Link href={r.u} className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 hover:border-blue-500 hover:shadow-md transition">
              <span><span className="block font-medium">{r.t}</span>{r.d && <span className="block text-sm text-slate-500 line-clamp-1">{r.d}</span>}</span>
              <span className="shrink-0 rounded-full bg-surface px-3 py-1 text-xs font-semibold text-blue-700">{r.k}</span>
            </Link></li>
          ))}
        </ul>
      </div>
    </div>
  )
}
