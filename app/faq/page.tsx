import { Page, H2, P } from '@/components/layout/Page'
import { meta } from '@/lib/seo'
import { faqs } from '@/data/faqs'
import { FaqBlock } from '@/components/layout/Page'
export const metadata = meta({ title: 'FAQ: Gates, Doors and Barriers', description: 'Answers about automatic gates, doors, boom barriers, shutters, dock levellers, AMC and repair in Hyderabad from Zenitrix.', path: '/faq/' })
export default function Pg() {
  return (<Page crumbs={[{ name: 'FAQ: Gates, Doors and Barriers', path: '/faq/' }]} hero={{ eyebrow: 'FAQ', title: 'FAQ: Gates, Doors and Barriers', image: '/images/p-sliding-glass-doors.webp' }}>
    <FaqBlock faqs={faqs} />
  </Page>)
}
