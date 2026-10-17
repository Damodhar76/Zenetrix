import Link from 'next/link'
import type { Post } from '@/data/blog'
import { categories } from '@/data/catalog'
import { categoryImage } from '@/lib/images'
import { srcSet } from '@/lib/img'
import { blogImage } from '@/lib/blogImages'

// Premium guide card: category image, topic chip, title, summary, read time. Image is lazy and uses the 640px twin on phones.
function topic(p: Post) {
  const hit = p.links.map(l => l.href.match(/^\/products\/([^/]+)\//)?.[1]).find(Boolean)
  const cat = categories.find(c => c.slug === hit)
  if (cat) return { label: cat.name, img: categoryImage(cat.slug) }
  if (p.links.some(l => l.href.startsWith('/services/'))) return { label: 'Service and AMC', img: '/images/g-gate-day.webp' }
  return { label: 'Guide', img: '/images/g-gate-night.webp' }
}
const niceDate = (d: string) => { const t = new Date(d + 'T00:00:00Z'); return isNaN(+t) ? d : t.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }) }

export function BlogCard({ post, feature = false }: { post: Post; feature?: boolean }) {
  const base = topic(post)
  const t = { ...base, img: blogImage(post.slug) ?? base.img } // each guide gets its own image
  return (
    <Link href={`/blog/${post.slug}/`} className={`blog-card group flex h-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white active:scale-[.99] md:rounded-3xl ${feature ? 'flex-col md:flex-row' : 'flex-col'}`}>
      <div className={`relative overflow-hidden bg-ink ${feature ? 'md:w-5/12' : ''}`}>
        <img src={t.img} srcSet={srcSet(t.img)} sizes="(max-width:768px) 100vw, 40vw" alt="" width={800} height={500} loading="lazy" decoding="async"
          className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${feature ? 'aspect-[16/9] md:aspect-auto md:h-full' : 'aspect-[16/9]'}`} />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" aria-hidden />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700">{t.label}</span>
      </div>
      <div className={`flex flex-1 flex-col p-4 sm:p-5 md:p-6 ${feature ? 'md:justify-center' : ''}`}>
        <h3 className={`font-heading font-bold leading-snug text-ink group-hover:text-blue-600 transition-colors ${feature ? 'text-xl md:text-3xl' : 'text-lg md:text-xl'}`}>{post.title}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600 md:text-[15px]">{post.description}</p>
        <div className="mt-auto flex items-center justify-between pt-5 text-xs text-slate-500">
          <span className="flex items-center gap-2"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>{post.read} read<span aria-hidden>·</span>{niceDate(post.updated)}</span>
          <span className="blog-arrow grid h-10 w-10 place-items-center rounded-full bg-blue-50 text-blue-600" aria-hidden>→</span>
        </div>
      </div>
    </Link>
  )
}
