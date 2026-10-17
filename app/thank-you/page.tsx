import Link from 'next/link'
import { Page, P } from '@/components/layout/Page'
import { meta } from '@/lib/seo'
import { waLink } from '@/lib/site'
import { ConversionPing } from '@/components/forms/ConversionPing'
export const metadata = meta({ title: 'Thank You', description: 'Thanks for contacting Zenitrix Technologies. We will reach out shortly.', path: '/thank-you/', noindex: true })
export default function Thanks() {
  return (<Page crumbs={[{ name: 'Thank you', path: '/thank-you/' }]} hero={{ eyebrow: 'Received', title: 'Thank you, we have your request', intro: 'Our team will contact you to arrange a free site visit.' }}>
    <ConversionPing />
    <P>Need us sooner? <a className="underline text-blue-600" href={waLink('Hi Zenitrix, I just sent a request on the website')}>WhatsApp us</a> or browse our <Link className="underline text-blue-600" href="/products/">products</Link>.</P>
  </Page>)
}
