import { Page, H2, P, QuoteCta } from '@/components/layout/Page'
import { Gallery } from '@/components/media/Gallery'
import { gallery } from '@/data/media'
import { projects } from '@/data/projects'
import { meta } from '@/lib/seo'
import { imageObject } from '@/lib/schema'
import { HERO_IMAGE } from '@/lib/images'

export const metadata = meta({ title: 'Gallery: Gates, Doors, Barriers and Shutters', description: 'Browse images of automatic sliding gates, swing gates, boom barriers, garage doors, shutters and dock doors for Hyderabad homes and businesses.', path: '/gallery/' })

export default function GalleryPage() {
  const real = projects.filter(p => p.image).map(p => ({ src: p.image!, alt: p.title, caption: p.title }))
  return (
    <Page crumbs={[{ name: 'Gallery', path: '/gallery/' }]} schema={gallery.map(g => imageObject(g.src, g.caption))}
      hero={{ eyebrow: 'Gallery', title: 'Gallery: Gates, Doors, Barriers and Shutters', intro: 'See the range of automation we supply and install across Hyderabad.', image: HERO_IMAGE }}>
      {real.length > 0 && (<><H2>Our installations</H2><Gallery items={real} /></>)}
      <H2>{real.length ? 'More examples' : 'Product scenes'}</H2>
      <P>These are illustrative scenes that show how each product looks and behaves. Photos of our own installations are added here as projects are completed with the owner’s permission.</P>
      <Gallery items={gallery} />
      <QuoteCta />
    </Page>
  )
}
