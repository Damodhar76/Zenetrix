import Link from 'next/link'
import { posts } from '@/data/blog'
import { BlogCard } from './BlogCard'

export const PER_PAGE = 12
export const pageCount = Math.max(1, Math.ceil(posts.length / PER_PAGE))
export const pagePath = (n: number) => (n <= 1 ? '/blog/' : `/blog/page/${n}/`)

// Crawlable numbered pagination (Blueprint 14.4): every page links to every other page with real <a href> links.
export function BlogList({ page }: { page: number }) {
  const slice = posts.slice((page - 1) * PER_PAGE, page * PER_PAGE)
  return (
    <>
      <ul className="grid gap-5 md:grid-cols-2 lg:gap-7">{slice.map((p, i) => (
        <li key={p.slug} className={page === 1 && i === 0 ? 'md:col-span-2' : ''}><BlogCard post={p} feature={page === 1 && i === 0} /></li>))}</ul>
      {pageCount > 1 && (
        <nav aria-label="Guides pages" className="mt-10 flex flex-wrap items-center justify-center gap-2 text-sm">
          {page > 1 && <Link rel="prev" className="rounded-lg border border-slate-300 px-4 py-2 hover:border-blue-500" href={pagePath(page - 1)}>← Previous</Link>}
          {Array.from({ length: pageCount }, (_, i) => i + 1).map(n => n === page
            ? <span key={n} aria-current="page" className="rounded-lg bg-blue-600 text-white px-4 py-2 font-semibold">{n}</span>
            : <Link key={n} className="rounded-lg border border-slate-300 px-4 py-2 hover:border-blue-500" href={pagePath(n)}>{n}</Link>)}
          {page < pageCount && <Link rel="next" className="rounded-lg border border-slate-300 px-4 py-2 hover:border-blue-500" href={pagePath(page + 1)}>Next →</Link>}
        </nav>
      )}
    </>
  )
}
