import { notFound } from 'next/navigation'
import { comparisons, getCompare } from '@/data/compare'
import { Page, H2, P, LinkList, QuoteCta } from '@/components/layout/Page'
import { meta } from '@/lib/seo'

export const dynamicParams = false
export const generateStaticParams = () => comparisons.map(c => ({ slug: c.slug }))
type Props = { params: Promise<{ slug: string }> }
export async function generateMetadata({ params }: Props) {
  const c = getCompare((await params).slug); if (!c) return {}
  return meta({ title: `${c.title}: Side-by-Side Comparison`, description: c.description, path: `/compare/${c.slug}/` })
}
export default async function ComparePage({ params }: Props) {
  const c = getCompare((await params).slug); if (!c) notFound()
  const path = `/compare/${c.slug}/`
  return (
    <Page crumbs={[{ name: 'Compare', path: '/compare/' }, { name: c.title, path }]} hero={{ eyebrow: 'Compare', title: c.title, intro: c.description }}>
      <P>{c.intro}</P>
      <div className="overflow-x-auto mt-4"><table className="w-full text-left text-sm border border-slate-200 rounded-xl overflow-hidden">
        <caption className="sr-only">{c.title}</caption>
        <thead className="bg-ink text-white"><tr><th scope="col" className="p-3">Factor</th><th scope="col" className="p-3">{c.a}</th><th scope="col" className="p-3">{c.b}</th></tr></thead>
        <tbody className="divide-y divide-slate-200 bg-white">{c.rows.map(r => <tr key={r[0]}><th scope="row" className="p-3 font-semibold">{r[0]}</th><td className="p-3">{r[1]}</td><td className="p-3">{r[2]}</td></tr>)}</tbody>
      </table></div>
      <H2>Our verdict</H2><P>{c.verdict}</P>
      <H2>Related pages</H2><LinkList items={c.links} />
      <QuoteCta />
    </Page>
  )
}
