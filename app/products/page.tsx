import { masterKeywordsFor } from '@/lib/keywords'
import { categories, productsIn } from '@/data/catalog'
import { Page, CardGrid, QuoteCta } from '@/components/layout/Page'
import { categoryImage, HERO_IMAGE } from '@/lib/images'
import { meta } from '@/lib/seo'
export const metadata = meta({ title: 'Automation Products in Hyderabad', description: 'Gates, automatic doors, boom barriers, garage doors, sectional doors, rolling shutters, high-speed doors and dock equipment from Zenitrix in Hyderabad.', path: '/products/', keywords: ['gate automation products Hyderabad', 'automatic gate Hyderabad', 'boom barrier Hyderabad', 'automatic sliding door Hyderabad', 'garage door Hyderabad', 'rolling shutter Hyderabad', 'sectional door Hyderabad', 'high speed door Hyderabad', 'dock leveller Hyderabad', 'UHF RFID reader Hyderabad', ...masterKeywordsFor(['motor','supplier','dealers','price','kit','boom barrier','rfid','shutter','door','gate'], 150)] })
export default function Products() {
  return (<Page crumbs={[{ name: 'Products', path: '/products/' }]} hero={{ eyebrow: 'Products', title: 'Automation Products in Hyderabad', intro: 'Gates, doors, boom barriers, shutters and dock equipment, supplied, installed and serviced by Zenitrix.', image: HERO_IMAGE }}>
    <CardGrid items={categories.map(c => ({ name: c.name, href: `/products/${c.slug}/`, image: categoryImage(c.slug), note: `${productsIn(c.slug).length} models and types` }))} />
    <QuoteCta />
  </Page>)
}
