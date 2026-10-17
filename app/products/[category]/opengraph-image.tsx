import { ogImage, OG_SIZE } from '@/lib/og'
import { categories, getCategory } from '@/data/catalog'
export const size = OG_SIZE
export const contentType = 'image/png'
export const alt = 'Zenitrix Technologies product family in Hyderabad'
export const generateStaticParams = () => categories.map(c => ({ category: c.slug }))
export default async function Image({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  return ogImage(`${getCategory(category)?.name ?? 'Products'} in Hyderabad`, 'Products')
}
