import { Page } from '@/components/layout/Page'
import { BlogList } from '@/components/blog/BlogList'
import { meta } from '@/lib/seo'
export const metadata = meta({ title: 'Guides: Gates, Doors and Barriers', description: 'Plain-language guides on automatic gates, doors, boom barriers, shutters and dock equipment from Zenitrix Technologies, Hyderabad.', path: '/blog/' })
export default function Blog() {
  return (<Page crumbs={[{ name: 'Guides', path: '/blog/' }]} hero={{ eyebrow: 'Guides', title: 'Guides: Gates, Doors and Barriers', intro: 'Clear explanations to help you choose, use and maintain automation.', image: '/images/hero.webp' }}>
    <BlogList page={1} />
  </Page>)
}
