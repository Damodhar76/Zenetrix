import { Page, P } from '@/components/layout/Page'
import { Selector } from '@/components/tools/Selector'
import { meta } from '@/lib/seo'
export const metadata = meta({ title: 'Which Automation Do I Need? Selector', description: 'Answer six quick questions and see which gate, door, barrier or shutter automation suits your site in Hyderabad. Free site visit.', path: '/which-automation/' })
export default function Which() {
  return (<Page crumbs={[{ name: 'Which automation do I need?', path: '/which-automation/' }]} hero={{ eyebrow: 'Tool', title: 'Which Automation Do I Need?', intro: 'Six quick questions, one clear starting point.', image: '/images/g-lobby-night.webp' }}>
    <P>Tell us your site, what you want to automate, the space and width you have, how busy it is and your budget range.</P>
    <Selector />
  </Page>)
}
