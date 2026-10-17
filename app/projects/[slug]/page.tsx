import { notFound } from 'next/navigation'
import Link from 'next/link'
import { projects, getProject } from '@/data/projects'
import { areas } from '@/data/areas'
import { Page, H2, P, QuoteCta } from '@/components/layout/Page'
import { meta } from '@/lib/seo'
import { projectSchema } from '@/lib/schema'

export const dynamicParams = false
export const generateStaticParams = () => projects.map(p => ({ slug: p.slug }))
type Props = { params: Promise<{ slug: string }> }
export async function generateMetadata({ params }: Props) {
  const p = getProject((await params).slug); if (!p) return {}
  return meta({ title: `${p.title} | Project`, description: p.summary.slice(0, 150), path: `/projects/${p.slug}/` })
}
export default async function Project({ params }: Props) {
  const p = getProject((await params).slug); if (!p) notFound()
  const a = areas.find(x => x.slug === p.area)
  return (
    <Page crumbs={[{ name: 'Projects', path: '/projects/' }, { name: p.title, path: `/projects/${p.slug}/` }]} schema={projectSchema({ title: p.title, summary: p.summary, path: `/projects/${p.slug}/`, area: a?.name ?? 'Hyderabad', image: p.image, date: p.date })} hero={{ eyebrow: a?.name ?? 'Project', title: p.title, image: p.image }}>
      <P>{p.summary}</P>
      <H2>Product</H2><P>{p.product}</P>
      {a && <P>Location: <Link className="underline" href={`/hyderabad/${a.slug}/`}>{a.name}, Hyderabad</Link></P>}
      <QuoteCta product={p.product} />
    </Page>
  )
}
