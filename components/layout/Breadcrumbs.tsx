import Link from 'next/link'
import { JsonLd } from '../seo/JsonLd'
import { breadcrumb } from '@/lib/schema'

export function Breadcrumbs({ items, dark = false }: { items: { name: string; path: string }[]; dark?: boolean }) {
  const all = [{ name: 'Home', path: '/' }, ...items]
  return (
    <nav aria-label="Breadcrumb" className={`text-sm mb-4 ${dark ? 'text-slate-300' : 'text-slate-600'}`}>
      <JsonLd data={breadcrumb(all)} />
      <ol className="flex flex-wrap gap-1">
        {all.map((it, i) => (
          <li key={it.path}>{i > 0 && <span aria-hidden> / </span>}
            {i === all.length - 1 ? <span aria-current="page" className={dark ? 'text-white' : ''}>{it.name}</span> : <Link href={it.path} className="hover:underline">{it.name}</Link>}
          </li>
        ))}
      </ol>
    </nav>
  )
}
