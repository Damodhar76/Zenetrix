import { ogImage, OG_SIZE } from '@/lib/og'
import { posts, getPost } from '@/data/blog'
export const size = OG_SIZE
export const contentType = 'image/png'
export const alt = 'Zenitrix Technologies guide'
export const generateStaticParams = () => posts.map(p => ({ slug: p.slug }))
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return ogImage(getPost(slug)?.title ?? 'Guide', 'Guide')
}
