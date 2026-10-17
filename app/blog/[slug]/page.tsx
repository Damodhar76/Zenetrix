import { notFound } from 'next/navigation'
import { posts, getPost } from '@/data/blog'
import { Page, H2, P, UL, LinkList, FaqBlock, QuoteCta } from '@/components/layout/Page'
import { meta } from '@/lib/seo'
import { articleSchema } from '@/lib/schema'
import { categories, services } from '@/data/catalog'
import { categoryImage, HERO_IMAGE } from '@/lib/images'
import { categoryCopy } from '@/data/content'
import { categoryFaqs } from '@/data/categoryFaqs'
import { faqs as siteFaqs } from '@/data/faqs'
import { JsonLd } from '@/components/seo/JsonLd'

export const dynamicParams = false
export const generateStaticParams = () => posts.map(p => ({ slug: p.slug }))
type Props = { params: Promise<{ slug: string }> }

const slugId = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
const firstSentence = (t: string) => { const m = t.match(/^.*?[.!?](\s|$)/); return (m ? m[0] : t).trim() }
const cleanTitle = (t: string) => t.replace(/\s*\|\s*Zenitrix$/, '')

function kw(title: string, catName?: string) {
  const base = ['Hyderabad', 'automatic gates', 'Zenitrix Technologies']
  return [...new Set([cleanTitle(title).toLowerCase(), `${cleanTitle(title).toLowerCase()} Hyderabad`, ...(catName ? [`${catName.toLowerCase()} Hyderabad`] : []), ...base])]
}

export async function generateMetadata({ params }: Props) {
  const p = getPost((await params).slug); if (!p) return {}
  const cat = categories.find(c => p.links.some(l => l.href.startsWith(`/products/${c.slug}/`)))
  return meta({ title: p.title, description: p.description, path: `/blog/${p.slug}/`, keywords: kw(p.title, cat?.name), image: cat ? categoryImage(cat.slug) : HERO_IMAGE,
    article: { published: p.updated, modified: p.updated, section: cat?.name ?? 'Guides' } })
}

export default async function Post({ params }: Props) {
  const p = getPost((await params).slug); if (!p) notFound()
  const path = `/blog/${p.slug}/`
  const cat = categories.find(c => p.links.some(l => l.href.startsWith(`/products/${c.slug}/`)))
  const copy = cat ? categoryCopy[cat.slug] : undefined
  const more = posts.filter(x => x.slug !== p.slug).slice(0, 4)
  const words = p.sections.reduce((n, s) => n + s.p.join(' ').split(/\s+/).length, p.description.split(/\s+/).length)
  const takeaways = p.sections.map(s => firstSentence(s.p[0]))
  const faqList = [
    ...(cat ? (categoryFaqs[cat.slug] ?? []).slice(0, 4) : siteFaqs.slice(0, 3)),
    { q: 'Does Zenitrix offer a free site visit in Hyderabad?', a: 'Yes. We visit, measure and send a written quote. Call or WhatsApp +91 85006 32002 to book a visit.' },
    { q: 'Can Zenitrix repair or service systems installed by other companies?', a: 'Yes. We repair and service gates, doors, barriers and shutters from any brand, and offer AMC plans.' },
  ]
  const prodLinks = p.links.filter(l => l.href.startsWith('/products/'))
  const svcLinks = p.links.filter(l => !l.href.startsWith('/products/'))
  return (
    <Page crumbs={[{ name: 'Guides', path: '/blog/' }, { name: p.title, path }]}
      schema={articleSchema(p.title, p.description, path, p.updated, cat ? categoryImage(cat.slug) : HERO_IMAGE, { words, keywords: kw(p.title, cat?.name), section: cat?.name ?? 'Guides' })}
      hero={{ eyebrow: `Guide · ${p.read} read`, title: p.title, intro: p.description, image: cat ? categoryImage(cat.slug) : HERO_IMAGE }}>
      <p className="text-sm text-slate-500 mb-4">By <a className="underline text-blue-600" href="/authors/zenitrix-team/">Zenitrix Technologies team</a> · Updated <time dateTime={p.updated}>{p.updated}</time> · {p.read} read</p>

      <nav aria-label="In this guide" className="rounded-2xl border border-slate-200 bg-white p-4 md:p-5 mb-2">
        <p className="font-heading font-semibold mb-2">In this guide</p>
        <ol className="grid sm:grid-cols-2 gap-x-6 gap-y-1 list-decimal pl-5 text-blue-600">
          <li><a href="#key-takeaways" className="underline">Key takeaways</a></li>
          {p.sections.map(s => <li key={s.h}><a href={`#${slugId(s.h)}`} className="underline">{s.h}</a></li>)}
          {copy && <li><a href="#quick-checklist" className="underline">Quick checklist</a></li>}
          <li><a href="#faq" className="underline">FAQs</a></li>
        </ol>
      </nav>

      <section id="key-takeaways"><H2>Key takeaways</H2><UL items={takeaways} /></section>

      <article>
        {p.sections.map(s => (
          <section key={s.h} id={slugId(s.h)}><H2>{s.h}</H2>{s.p.map(t => <P key={t}>{t}</P>)}</section>
        ))}
      </article>

      {copy && (
        <section id="quick-checklist">
          <H2>Quick checklist before you decide</H2>
          <h3 className="font-heading font-semibold text-lg mb-2">What to check on site</h3>
          <UL items={copy.check} />
          <h3 className="font-heading font-semibold text-lg mt-4 mb-2">How installation usually goes</h3>
          <h4 className="font-semibold mb-1">Survey and preparation</h4>
          <P>{copy.install}</P>
          <h4 className="font-semibold mb-1">How the system works day to day</h4>
          <P>{copy.how}</P>
        </section>
      )}

      <section id="faq"><FaqBlock faqs={faqList} /></section>

      <H2>Related pages</H2>
      {prodLinks.length > 0 && (<><h3 className="font-heading font-semibold text-lg mb-2">Products</h3><LinkList items={prodLinks} /></>)}
      {svcLinks.length > 0 && (<><h3 className="font-heading font-semibold text-lg mt-4 mb-2">Services</h3><LinkList items={svcLinks} /></>)}
      <h3 className="font-heading font-semibold text-lg mt-4 mb-2">Our services in Hyderabad</h3>
      <LinkList items={services.slice(0, 4).map(s => ({ name: s.name, href: `/services/${s.slug}/` }))} />
      <H2>More guides</H2><LinkList items={more.map(m => ({ name: m.title, href: `/blog/${m.slug}/` }))} />
      <P>Written by the <a className="underline text-blue-600" href="/authors/zenitrix-team/">Zenitrix Technologies team</a>. Last updated {p.updated}.</P>
      <QuoteCta />
    </Page>
  )
}
