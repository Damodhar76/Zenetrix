import { Page, H2, P } from '@/components/layout/Page'
import { meta } from '@/lib/seo'
import { SITE } from '@/lib/site'
export const metadata = meta({ title: 'Terms of Use', description: 'Terms for using the Zenitrix Technologies website, including information accuracy, quotes and liability.', path: '/terms/' })
export default function Terms() {
  return (<Page crumbs={[{ name: 'Terms of Use', path: '/terms/' }]} hero={{ eyebrow: 'Legal', title: 'Terms of Use', intro: 'Last updated: October 2026' }}>
    <P>By using this website you agree to these terms.</P>
    <H2>Information on this site</H2><P>We aim to keep content accurate, but product details, availability and options can change. Images are illustrative unless stated. Specifications are confirmed in the written quote and manufacturer documents.</P>
    <H2>Quotes and orders</H2><P>Website content is not an offer. A quote becomes binding only when issued in writing by {SITE.name} and accepted by you. Final prices depend on a site survey.</P>
    <H2>Safe use</H2><P>Automatic gates, doors and barriers must be used and maintained as advised at handover. Do not bypass safety devices.</P>
    <H2>Intellectual property</H2><P>The content, logo and design of this site belong to {SITE.name} or its licensors. Do not copy them without written permission.</P>
    <H2>Liability</H2><P>To the extent permitted by law, we are not liable for loss arising from use of the website content. Nothing here limits rights that cannot be limited under Indian law.</P>
    <H2>Governing law</H2><P>These terms are governed by the laws of India.</P>
    <H2>Contact</H2><P>{SITE.email} · {SITE.phone}</P>
  </Page>)
}
