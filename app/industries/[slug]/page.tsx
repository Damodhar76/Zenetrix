import { lc } from '@/lib/text'
import { notFound } from 'next/navigation'
import { industries, categories, products } from '@/data/catalog'
import { industryCopy } from '@/data/content'
import { featuredAreas } from '@/data/areas'
import { posts } from '@/data/blog'
import { Page, H2, P, UL, LinkList, FaqBlock, QuoteCta } from '@/components/layout/Page'
import { industryImage } from '@/lib/images'
import { meta } from '@/lib/seo'
import { collection } from '@/lib/schema'

export const dynamicParams = false
export const generateStaticParams = () => industries.map(i => ({ slug: i.slug }))
type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props) {
  const { slug } = await params; const i = industries.find(x => x.slug === slug); if (!i) return {}
  return meta({ title: `Gate & Door Automation for ${i.name} in Hyderabad`, description: `Automation for ${lc(i.name)} sites in Hyderabad: safety, throughput and low maintenance. Book a free site assessment.`, path: `/industries/${i.slug}/` })
}
export default async function Industry({ params }: Props) {
  const { slug } = await params; const i = industries.find(x => x.slug === slug); if (!i) notFound()
  const copy = industryCopy[i.slug]
  const path = `/industries/${i.slug}/`
  const fams = categories.filter(c => copy.families.includes(c.slug))
  const prods = fams.flatMap(f => products.filter(p => p.category === f.slug).slice(0, 2)).slice(0, 8)
  const guides = posts.filter(g => g.links.some(l => fams.some(f => l.href.startsWith(`/products/${f.slug}/`)))).slice(0, 4)
  const name = lc(i.name)
  const qa = [
    { q: `What do ${name} usually need from automation?`, a: `${copy.needs.join('; ')}.` },
    { q: `Which products suit ${name}?`, a: `Usually ${fams.map(f => lc(f.name)).join(', ')}. A free site visit confirms the best fit for your layout and traffic.` },
    { q: `Can you service automation at ${name} that another company installed?`, a: 'Yes. We repair and service systems from any brand. Send a photo or video of the problem on WhatsApp to get started.' },
  ]
  return (
    <Page crumbs={[{ name: i.name, path }]} schema={collection(`Automation for ${i.name}`, path, prods.map(p => ({ name: p.name, path: `/products/${p.category}/${p.slug}/` })))}
      hero={{ eyebrow: 'Industries', title: `Gate and Door Automation for ${i.name} in Hyderabad`, image: industryImage(i.slug) }}>
      <P>{copy.intro}</P>
      <H2>What {name} usually need</H2><UL items={copy.needs} />
      <H2>Recommended product families</H2>
      <LinkList items={fams.map(c => ({ name: c.name, href: `/products/${c.slug}/` }))} />
      <H2>Popular products for {name}</H2>
      <LinkList items={prods.map(p => ({ name: p.name, href: `/products/${p.category}/${p.slug}/` }))} />
      <P>Ask us about recent {name} installations. We share relevant project details on request.</P>
      {guides.length > 0 && (<><H2>Guides for {name}</H2><LinkList items={guides.map(g => ({ name: g.title, href: `/blog/${g.slug}/` }))} /></>)}
      <H2>Service and AMC</H2>
      <LinkList items={[{ name: 'Repair and servicing (any brand)', href: '/services/automatic-gate-repair/' }, { name: 'Annual Maintenance Contract (AMC)', href: '/services/amc/' }]} />
      <H2>Available across Hyderabad</H2>
      <LinkList items={featuredAreas(false, 18).map(a => ({ name: a.name, href: `/hyderabad/${a.slug}/` }))} />
      <FaqBlock faqs={qa} />
      <QuoteCta />
    </Page>
  )
}
