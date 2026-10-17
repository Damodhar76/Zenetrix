import { Page, H2, P, UL } from '@/components/layout/Page'
import { meta } from '@/lib/seo'
import { SITE } from '@/lib/site'
export const metadata = meta({ title: 'Privacy Policy', description: 'How Zenitrix Technologies collects, uses and protects personal data from enquiries and website visits, in line with India’s DPDP Act, 2023.', path: '/privacy-policy/' })
export default function Privacy() {
  return (<Page crumbs={[{ name: 'Privacy Policy', path: '/privacy-policy/' }]} hero={{ eyebrow: 'Legal', title: 'Privacy Policy', intro: 'Last updated: October 2026' }}>
    <P>This policy explains how {SITE.name} ("we", "us") handles personal data collected through this website. It is written to align with India’s Digital Personal Data Protection Act, 2023.</P>
    <H2>What we collect</H2>
    <UL items={['Details you give in our forms or on WhatsApp: name, phone number, area, product of interest, site type and any message.', 'Basic usage data (pages visited, device type) through analytics.', 'Technical data such as IP address used for security and spam protection.']} />
    <H2>Why we use it</H2>
    <UL items={['To reply to your enquiry, arrange a site visit and send a quote.', 'To provide installation, repair and AMC services you request.', 'To improve the website and measure which pages help visitors.', 'To prevent spam and abuse.']} />
    <H2>Consent and your choices</H2>
    <P>We use your enquiry data only for the purpose you gave it. We use basic analytics to understand which pages help visitors. You can block analytics cookies in your browser settings at any time.</P>
    <H2>Sharing</H2>
    <P>We do not sell personal data. We may use service providers for email delivery, spreadsheets or hosting, who process data for us. If you choose to send an enquiry on WhatsApp, WhatsApp’s own terms apply.</P>
    <H2>Retention and security</H2>
    <P>We keep enquiry data for as long as needed to serve you and meet legal duties.. We use HTTPS and limit access to those who need it.</P>
    <H2>Your rights</H2>
    <P>You may ask to access, correct or erase your personal data, or withdraw consent, by writing to {SITE.email} or calling {SITE.phone}.</P>
    <H2>Contact</H2>
    <P>{SITE.name}, {SITE.address.street}, {SITE.address.city}, {SITE.address.region} {SITE.address.zip}.</P>
  </Page>)
}
