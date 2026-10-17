import { ogImage, OG_SIZE } from '@/lib/og'
import { services } from '@/data/catalog'
export const size = OG_SIZE
export const contentType = 'image/png'
export const alt = 'Zenitrix Technologies service in Hyderabad'
export const generateStaticParams = () => services.map(s => ({ slug: s.slug }))
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return ogImage(`${services.find(s => s.slug === slug)?.name ?? 'Service'} in Hyderabad`, 'Services')
}
