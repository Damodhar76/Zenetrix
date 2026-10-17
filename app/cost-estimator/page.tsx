import { Page, H2, P } from '@/components/layout/Page'
import { CostEstimator } from '@/components/tools/CostEstimator'
import { meta } from '@/lib/seo'

export const metadata = meta({ title: 'Gate and Door Automation Cost Factors', description: 'See what affects the price of gate, door, barrier and shutter automation in Hyderabad, then send your details for a written quote after a free site visit.', path: '/cost-estimator/' })

export default function Cost() {
  return (
    <Page crumbs={[{ name: 'Cost factors', path: '/cost-estimator/' }]} hero={{ eyebrow: 'Tool', title: 'What Affects the Cost of Automation?', intro: 'Choose your site details and see which factors shape the quote.', image: '/images/p-vertical-window-automation.webp' }}>
      <P>Prices depend on size, weight, usage, controls, safety devices and site works. Choose your details below to see the factors, then share them with us on WhatsApp for a written quote.</P>
      <CostEstimator />
      <H2>Why we do not show a price here</H2>
      <P>Two gates of the same width can need very different operators. A free site visit lets us measure, check power and safety and give you one clear written quote.</P>
    </Page>
  )
}
