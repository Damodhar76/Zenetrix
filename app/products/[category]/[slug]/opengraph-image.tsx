import { ogImage, OG_SIZE } from '@/lib/og'
import { products, getProduct, getCategory } from '@/data/catalog'
export const size = OG_SIZE
export const contentType = 'image/png'
export const alt = 'Zenitrix Technologies product in Hyderabad'
export const generateStaticParams = () => products.map(p => ({ category: p.category, slug: p.slug }))
export default async function Image({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category, slug } = await params
  return ogImage(`${getProduct(category, slug)?.name ?? 'Product'} in Hyderabad`, getCategory(category)?.name ?? 'Products')
}
