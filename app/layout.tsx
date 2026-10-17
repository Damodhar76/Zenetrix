import type { Metadata, Viewport } from 'next'
import './globals.css'
import { SITE } from '@/lib/site'
import { siteKeywords } from '@/lib/keywords'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { StickyBar } from '@/components/layout/StickyBar'
import { Analytics } from '@/components/layout/Analytics'
import { Tracking } from '@/components/layout/Tracking'



export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: '#0b1220' }

export const metadata: Metadata = {
  metadataBase: new URL(SITE.base),
  title: { default: 'Automatic Gates & Doors in Hyderabad | Zenitrix Technologies', template: '%s | Zenitrix' },
  description: 'Zenitrix Technologies supplies, installs and repairs automatic gates, doors, boom barriers and shutters in Hyderabad. Free site visit.',
  applicationName: 'Zenitrix Technologies',
  authors: [{ name: SITE.name, url: SITE.base }],
  creator: SITE.name,
  publisher: SITE.name,
  category: 'Automatic gates, doors and access control',
  openGraph: { type: 'website', siteName: SITE.name, locale: 'en_IN', title: 'Automatic Gates & Doors in Hyderabad | Zenitrix Technologies', description: 'Supply, installation, repair and AMC of automatic gates, doors, boom barriers and shutters in Hyderabad, Telangana and Andhra Pradesh. Free site visit.' },
  twitter: { card: 'summary_large_image', title: 'Automatic Gates & Doors in Hyderabad | Zenitrix Technologies', description: 'Automatic gates, doors, boom barriers and shutters in Hyderabad. Free site visit.' },
  keywords: siteKeywords(),
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
  other: { 'geo.region': 'IN-TG', 'geo.placename': 'Hyderabad', 'geo.country': 'IN', ...(SITE.geo.lat ? { 'geo.position': `${SITE.geo.lat};${SITE.geo.lng}`, ICBM: `${SITE.geo.lat}, ${SITE.geo.lng}` } : {}) },
  verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION || undefined, other: process.env.NEXT_PUBLIC_BING_VERIFICATION ? { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_VERIFICATION } : undefined },
  formatDetection: { telephone: true, email: true, address: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <head>
        {/* Self-hosted variable fonts (no third-party request, no render-blocking stylesheet). Metric-matched fallbacks in globals.css keep CLS at 0. */}
        <link rel="preload" href="/fonts/inter-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/sora-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        {/* Google tag (gtag.js), GA4 property G-5CL4FQ4XC7. Placed in <head> so Google can detect it; Tracking/LeadForm events use window.gtag. */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-5CL4FQ4XC7" />
        <script dangerouslySetInnerHTML={{ __html: "window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-5CL4FQ4XC7');" }} />
      </head>
      <body>
        <a href="#main" className="skip-link">Skip to main content</a>
        <Header />
        {children}
        <Footer />
        <StickyBar />
        <Analytics />
        <Tracking />
      </body>
    </html>
  )
}
