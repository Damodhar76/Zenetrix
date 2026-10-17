import { ogImage, OG_SIZE } from '@/lib/og'
import { industries } from '@/data/catalog'
export const size = OG_SIZE
export const contentType = 'image/png'
export const alt = 'Zenitrix Technologies industry solutions in Hyderabad'
export const generateStaticParams = () => industries.map(i => ({ slug: i.slug }))
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return ogImage(`Automation for ${industries.find(i => i.slug === slug)?.name ?? 'your site'} in Hyderabad`, 'Industries')
}
