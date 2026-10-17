import { ogImage, OG_SIZE } from '@/lib/og'
import { areas, getArea } from '@/data/areas'
export const size = OG_SIZE
export const contentType = 'image/png'
export const alt = 'Zenitrix Technologies service area in Hyderabad'
export const generateStaticParams = () => areas.map(a => ({ area: a.slug }))
export default async function Image({ params }: { params: Promise<{ area: string }> }) {
  const { area } = await params
  return ogImage(`Gate and Door Automation in ${getArea(area)?.name ?? 'Hyderabad'}`, 'Hyderabad')
}
