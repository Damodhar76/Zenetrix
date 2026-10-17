import { notFound } from 'next/navigation'
import { Page } from '@/components/layout/Page'
import { BlogList, pageCount, pagePath } from '@/components/blog/BlogList'
import { meta } from '@/lib/seo'

export const dynamicParams = false
export const generateStaticParams = () => Array.from({ length: Math.max(0, pageCount - 1) }, (_, i) => ({ n: String(i + 2) }))
type Props = { params: Promise<{ n: string }> }
export async function generateMetadata({ params }: Props) {
  const n = Number((await params).n)
  return meta({ title: `Guides: Gates, Doors and Barriers (Page ${n})`, description: `Page ${n} of plain-language guides on automatic gates, doors, boom barriers, shutters and dock equipment from Zenitrix Technologies, Hyderabad.`, path: pagePath(n) })
}
export default async function BlogPage({ params }: Props) {
  const n = Number((await params).n)
  if (!Number.isInteger(n) || n < 2 || n > pageCount) notFound()
  return (<Page crumbs={[{ name: 'Guides', path: '/blog/' }, { name: `Page ${n}`, path: pagePath(n) }]} hero={{ eyebrow: `Guides · Page ${n}`, title: `Guides: Gates, Doors and Barriers, Page ${n}`, intro: 'Clear explanations to help you choose, use and maintain automation.', image: '/images/hero.webp' }}>
    <BlogList page={n} />
  </Page>)
}
