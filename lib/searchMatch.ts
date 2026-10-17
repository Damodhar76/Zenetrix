import type { SearchItem } from '@/data/search'

// Shared by the search page and the mobile search bar. Every typed word must appear somewhere in the item; title hits rank higher.
export function matchSearch(index: SearchItem[] | null, q: string, limit = 30): SearchItem[] {
  const words = q.toLowerCase().split(/\s+/).filter(Boolean)
  if (!words.length || !index) return []
  return index
    .map(it => {
      const title = it.t.toLowerCase(); const hay = `${title} ${it.d ?? ''} ${it.k}`.toLowerCase()
      if (!words.every(w => hay.includes(w))) return null
      return { it, score: words.reduce((s, w) => s + (title.includes(w) ? 3 : 1), 0) + (title.startsWith(words[0]) ? 2 : 0) }
    })
    .filter((x): x is { it: SearchItem; score: number } => x !== null)
    .sort((a, b) => b.score - a.score).slice(0, limit).map(x => x.it)
}
