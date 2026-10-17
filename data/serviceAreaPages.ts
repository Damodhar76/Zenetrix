import { areas } from './areas'
import type { Faq } from './faqs'

// 10 top services (Section 11.1). `href` = the main page this local page links back to; `why` is general explanatory copy.
export const topServices = [
  { slug: 'sliding-gate-automation', name: 'Sliding Gate Automation', href: '/products/gate-automation/sliding-gate-automation/', for: ['residential','it'], why: 'Sliding gates suit wide entries and compounds where there is clear space beside the opening. They keep the driveway clear while moving and handle heavy leaves well.' },
  { slug: 'swing-gate-automation', name: 'Swing Gate Automation', href: '/products/gate-automation/swing-gate-automation/', for: ['residential'], why: 'Swing gates keep a traditional look and suit entries with room for the leaves to open. They are common on villa compounds.' },
  { slug: 'automatic-sliding-doors', name: 'Automatic Sliding Doors', href: '/products/automatic-doors/sliding-glass-doors/', for: ['it','residential'], why: 'Automatic sliding doors give touch-free, accessible entry for offices, clinics, showrooms and shopfronts.' },
  { slug: 'boom-barriers', name: 'Boom Barriers', href: '/products/boom-barriers/', for: ['it','industrial','residential'], why: 'Boom barriers manage vehicle flow at community gates, campuses and parking lanes, and work with RFID, ANPR or manual control.' },
  { slug: 'rolling-shutters', name: 'Rolling Shutters', href: '/products/rolling-shutters/', for: ['industrial'], why: 'Rolling shutters protect shopfronts, stores and industrial openings in a compact and economical form.' },
  { slug: 'sectional-doors', name: 'Sectional Doors', href: '/products/sectional-doors/', for: ['residential'], why: 'Sectional doors suit garages and larger openings that need quiet operation, insulation and a refined look.' },
  { slug: 'high-speed-doors', name: 'High-Speed Doors', href: '/products/high-speed-doors-dock/', for: ['industrial'], why: 'High-speed doors cut air and dust movement and speed up traffic between busy spaces.' },
  { slug: 'dock-levellers-shelters', name: 'Dock Levellers and Shelters', href: '/products/high-speed-doors-dock/dock-leveller/', for: ['industrial'], why: 'Dock levellers and shelters make loading safer and faster by bridging the truck bed to the floor and closing the gap around the truck.' },
  { slug: 'gate-door-repair', name: 'Gate and Door Repair', href: '/services/automatic-gate-repair/', for: ['residential','it','industrial'], why: 'Repairs cover motors, controllers, remotes, tracks, hinges and safety devices on systems from any brand.' },
  { slug: 'amc', name: 'AMC for Gates and Doors', href: '/services/amc/', for: ['residential','it','industrial'], why: 'An annual maintenance contract schedules regular checks so breakdowns stay rare and safety devices stay tested.' },
]

// Locality data sheet (Blueprint 11.2). Fill this from real facts supplied by the client. A page becomes indexable ONLY when it has a
// real project (anti-doorway rule) and its release batch is live. Nothing is invented. Example:
//   localFacts['banjara-hills'] = { project: 'Sliding gate for a villa on Road No. 12', projectSlug: 'villa-road-12', landmarks: ['...'], roads: ['...'],
//     travelTime: 'about 10 minutes from our office', buildingTypes: ['independent villas', 'gated apartments'], notes: '450+ words of local copy', faqs: [{ q: '...', a: '...' }] }
export type LocalFacts = {
  project?: string; projectSlug?: string; landmarks?: string[]; roads?: string[]; travelTime?: string
  buildingTypes?: string[]; notes?: string; faqs?: Faq[]
}
export const localFacts: Record<string, LocalFacts> = {}

// Staged publishing (Blueprint 10.3 / 14.3): batch 1 = first 100 pages, batch 2 = next 100, batch 3 = the rest.
// Raise NEXT_PUBLIC_RELEASE_BATCH when you are ready to release the next batch.
export const RELEASE_BATCH = Number(process.env.NEXT_PUBLIC_RELEASE_BATCH || 1)

export const serviceAreaPages = areas.filter(a => a.top30).flatMap(a => topServices.map(s => ({ area: a.slug, service: s.slug })))
  .map((x, i) => ({ ...x, batch: Math.floor(i / 100) + 1, indexable: Boolean(localFacts[x.area]?.project) && Math.floor(i / 100) + 1 <= RELEASE_BATCH }))
export const getTopService = (slug: string) => topServices.find(s => s.slug === slug)
