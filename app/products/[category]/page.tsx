import { masterKeywordsFor } from '@/lib/keywords'
import { lc } from '@/lib/text'
import { notFound } from 'next/navigation'
import { categories, getCategory, productsIn } from '@/data/catalog'
import { featuredAreas } from '@/data/areas'
import { categoryCopy } from '@/data/content'
import { Page, H2, P, UL, CardGrid, LinkList, QuoteCta } from '@/components/layout/Page'
import { categoryImage, productImage } from '@/lib/images'
import { meta } from '@/lib/seo'
import { collection } from '@/lib/schema'

export const dynamicParams = false
export const generateStaticParams = () => categories.map(c => ({ category: c.slug }))
type Props = { params: Promise<{ category: string }> }

export async function generateMetadata({ params }: Props) {
  const c = getCategory((await params).category); if (!c) return {}
  return meta({ title: `${c.name} in Hyderabad`, description: `Explore ${lc(c.name)} with expert installation and AMC across Hyderabad. See models, uses and get a quote from Zenitrix.`, path: `/products/${c.slug}/`, keywords: [`${c.name} Hyderabad`, `${lc(c.name)} supplier Hyderabad`, `${lc(c.name)} installation Hyderabad`, `${lc(c.name)} repair and AMC Hyderabad`, `${lc(c.name)} Telangana`, `best ${lc(c.name)} company in Hyderabad`, `${lc(c.name)} dealers Hyderabad`, `${lc(c.name)} manufacturers Hyderabad`, `${lc(c.name)} price Hyderabad`, `${lc(c.name)} Secunderabad`, `${lc(c.name)} near me`, ...productsIn(c.slug).flatMap(x => [x.keyword, `${x.name} Hyderabad`, `${x.name} supplier Hyderabad`]), ...masterKeywordsFor([c.name.toLowerCase().replace(/s$/,''), ...c.name.toLowerCase().split(/[ &,]+/).filter(w => w.length > 4)], 80)] })
}

export default async function Category({ params }: Props) {
  const c = getCategory((await params).category); if (!c) notFound()
  const list = productsIn(c.slug)
  const path = `/products/${c.slug}/`
  return (
    <Page crumbs={[{ name: 'Products', path: '/products/' }, { name: c.name, path }]}
      schema={collection(c.name, path, list.map(p => ({ name: p.name, path: `${path}${p.slug}/` })))}
      hero={{ eyebrow: 'Products', title: `${c.name} in Hyderabad`, intro: `Zenitrix supplies, installs, repairs and services ${lc(c.name)} across Hyderabad.`, image: categoryImage(c.slug) }}>
      <P>{categoryCopy[c.slug].overview}</P>
      <H2>How {lc(c.name)} work</H2><P>{categoryCopy[c.slug].how}</P>
      <H2>What to check before you choose</H2><UL items={categoryCopy[c.slug].check} />
      <H2>Models and types</H2>
      <CardGrid items={list.map(p => ({ name: p.name, href: `${path}${p.slug}/`, image: productImage(c.slug, p.slug) }))} />
      <H2>Available across Hyderabad</H2>
      <LinkList items={featuredAreas(false, 24).map(a => ({ name: a.name, href: `/hyderabad/${a.slug}/` }))} />
      <QuoteCta product={c.name} />
    </Page>
  )
}
