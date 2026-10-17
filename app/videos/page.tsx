import Link from 'next/link'
import { Page, H2, P } from '@/components/layout/Page'
import { VideoPlayer } from '@/components/media/VideoPlayer'
import { videos } from '@/data/media'
import { meta } from '@/lib/seo'
import { videoObject } from '@/lib/schema'
import { FaqBlock } from '@/components/layout/Page'
import { videoFaqs, videosSeo } from '@/data/seoContent'
import { HERO_IMAGE } from '@/lib/images'

export const metadata = meta({ title: 'Videos: Automatic Gates, Doors and Barriers', description: 'Watch automatic sliding gates, boom barriers, RFID speed gates, glass doors, sectional doors and rolling shutters at work. Zenitrix, Hyderabad.', path: '/videos/' })

export default function Videos() {
  return (
    <Page crumbs={[{ name: 'Videos', path: '/videos/' }]} schema={videos.map(videoObject)}
      hero={{ eyebrow: 'Watch', title: 'See How Automatic Gates and Doors Work', intro: 'Short clips of automatic gates, boom barriers, speed gates, glass doors, sectional doors and shutters in action.', image: HERO_IMAGE }}>
      <H2>Product videos</H2>
      <P>Each clip is silent and loops. Use the pause button on any video. Video starts only when it scrolls into view and never autoplays on data-saver or reduced-motion settings.</P>
      <ul className="grid gap-6 md:grid-cols-2">
        {videos.map(v => (
          <li key={v.slug}>
            <VideoPlayer name={v.slug} title={v.title} />
            <h3 className="mt-3 font-heading text-lg font-semibold">{v.title}</h3>
            <p className="text-sm text-slate-600">{v.description}</p>
            <Link href={v.page} className="mt-1 inline-block text-sm font-semibold text-blue-600">Learn about {v.pageName.toLowerCase()} →</Link>
          </li>
        ))}
      </ul>
      {videosSeo.map(x => (<section key={x.h}><H2>{x.h}</H2><P>{x.p}</P></section>))}
      <FaqBlock faqs={videoFaqs} />
    </Page>
  )
}
