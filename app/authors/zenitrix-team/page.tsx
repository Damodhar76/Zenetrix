import Link from 'next/link'
import { Page, H2, P, LinkList } from '@/components/layout/Page'
import { posts } from '@/data/blog'
import { meta } from '@/lib/seo'
import { authorPage } from '@/lib/schema'

export const metadata = meta({ title: 'Zenitrix Technologies Editorial Team', description: 'How Zenitrix Technologies writes and reviews its guides on gates, doors, barriers and shutters, and what our guides do and do not claim.', path: '/authors/zenitrix-team/' })
export default function Author() {
  return (
    <Page crumbs={[{ name: 'Editorial team', path: '/authors/zenitrix-team/' }]} schema={authorPage()}
      hero={{ eyebrow: 'About our guides', title: 'Zenitrix Technologies Editorial Team', intro: 'Who writes our guides and how we keep them accurate.', image: '/images/hero.webp' }}>
      <H2>Who writes the guides</H2>
      <P>Our guides are written by the Zenitrix Technologies team in Banjara Hills, Hyderabad, from day-to-day work supplying, installing and repairing automation.</P>
      <H2>How we keep them accurate</H2>
      <P>Every guide explains how a product works and what to check before you choose. We do not publish prices, ratings or certification claims in guides. Specifications and certificates appear only on product and certification pages once verified.</P>
      <P>Found an error? Tell us on <Link className="underline text-blue-600" href="/contact/">the contact page</Link> and we will correct it.</P>
      <H2>Latest guides</H2>
      <LinkList items={posts.slice(-6).reverse().map(p => ({ name: p.title, href: `/blog/${p.slug}/` }))} />
    </Page>
  )
}
