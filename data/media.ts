// Videos: AI-generated sample clips in public/videos (mp4 + webm + poster per slug). Images below are illustrative artwork.
// Swap in real project footage with the same file names whenever the client supplies it.
export type Vid = { slug: string; title: string; description: string; seconds: number; uploaded: string; page: string; pageName: string }

export const videos: Vid[] = [
  { slug: 'hero-car-gate', title: 'Automatic sliding gate opening for an SUV at a Hyderabad villa', description: 'A motorised sliding gate opens as an SUV approaches a modern villa at sunset, lets it in and closes behind it. Typical of residential gate automation by Zenitrix.', seconds: 8, uploaded: '2026-10-03', page: '/products/gate-automation/sliding-gate-automation/', pageName: 'Sliding gate automation' },
  { slug: 'boom-barrier', title: 'Boom barrier lifting for a car at a gated community entry', description: 'A boom barrier arm lifts for a car at a security cabin of a gated community, then lowers again to control entry and exit.', seconds: 8, uploaded: '2026-10-03', page: '/products/boom-barriers/', pageName: 'Boom barriers' },
  { slug: 'lobby-speed-gate', title: 'Stainless steel speed gates in a corporate office lobby', description: 'A visitor walks through RFID-enabled stainless steel and glass speed gates in an office lobby, the standard answer for tailgating control and smooth staff entry.', seconds: 8, uploaded: '2026-10-03', page: '/products/boom-barriers/', pageName: 'Flap barriers and speed gates' },
  { slug: 'automatic-glass-door', title: 'Automatic sliding glass door at a building entrance', description: 'Sensor-driven sliding glass door leaves part as a professional approaches a hotel or office entrance and close once they are inside.', seconds: 8, uploaded: '2026-10-03', page: '/products/automatic-doors/sliding-glass-doors/', pageName: 'Sliding glass doors' },
  { slug: 'sectional-door', title: 'Sectional garage door rising to reveal a parked SUV', description: 'A sectional garage door lifts panel by panel along its tracks, opening a villa garage quietly and sealing it again when closed.', seconds: 8, uploaded: '2026-10-03', page: '/products/sectional-doors/', pageName: 'Sectional doors' },
  { slug: 'rolling-shutter', title: 'Automatic rolling shutter opening at a bakery and café shopfront', description: 'An automatic rolling shutter rises smoothly into its drum to reveal a busy bakery and café, the kind of motorised shutter shops, restaurants, showrooms and big retail outlets choose for convenient, secure daily opening.', seconds: 10, uploaded: '2026-10-07', page: '/products/rolling-shutters/', pageName: 'Rolling shutters' },
  { slug: 'hero-gate-car', title: 'Car driving through an automatic gate at a Hyderabad villa', description: 'A car drives up to a motorised gate that opens automatically, lets it through and closes again, the everyday result of sliding or swing gate automation.', seconds: 8, uploaded: '2026-10-04', page: '/products/gate-automation/', pageName: 'Gate automation' },
  { slug: 'gate-approach', title: 'Camera moving toward a closed automatic gate', description: 'A camera approaches a closed, slatted automatic gate at a modern entrance, showing the clean finish of a Zenitrix gate installation.', seconds: 8, uploaded: '2026-10-04', page: '/products/gate-automation/', pageName: 'Gate automation' },
  { slug: 'dock-truck', title: 'Delivery truck backing into a warehouse loading dock', description: 'A delivery truck reverses into a warehouse loading bay, where a dock door, leveller and shelter make loading safer and faster.', seconds: 8, uploaded: '2026-10-04', page: '/products/high-speed-doors-dock/dock-leveller/', pageName: 'Dock levellers' },
  { slug: 'forklift-door', title: 'Forklift driving through an industrial high-speed door', description: 'A forklift passes through an industrial high-speed door that opens and closes quickly, cutting dust, air movement and waiting time between zones.', seconds: 8, uploaded: '2026-10-04', page: '/products/high-speed-doors-dock/standard-high-speed-door/', pageName: 'High-speed doors' },
]
export const getVideo = (slug: string) => videos.find(v => v.slug === slug)

// One clip per product, only where the footage really shows that product. Products without their own clip show no
// "See it in action" block (better than showing a different product's video). Add a line here when a new clip is supplied.
const productClip: Record<string, string> = {
  'gate-automation/sliding-gate-automation': 'hero-car-gate',
  'gate-automation/cantilever-trackless-gate-automation': 'hero-gate-car',
  'automatic-doors/sliding-glass-doors': 'automatic-glass-door',
  'boom-barriers/arm-out-boom-barrier': 'boom-barrier',
  'boom-barriers/glass-speed-gate': 'lobby-speed-gate',
  'sectional-doors/garage-sectional-doors': 'sectional-door',
  'rolling-shutters/aluminium-rolling-shutter': 'rolling-shutter',
  'high-speed-doors-dock/high-speed-doors': 'forklift-door',
  'high-speed-doors-dock/dock-leveller': 'dock-truck',
}
export function productVideo(category: string, slug: string): Vid | undefined {
  const s = productClip[`${category}/${slug}`]; return s ? getVideo(s) : undefined
}

export type Shot = { src: string; alt: string; caption: string }
export const gallery: Shot[] = [
  { src: '/images/g-speed-gate-lobby.webp', alt: 'Stainless steel and glass speed gates with RFID readers in a marble office lobby', caption: 'Glass speed gates with RFID access' },
  { src: '/images/g-villa-gate.webp', alt: 'Modern slatted villa entrance gate in Hyderabad', caption: 'Villa entrance gate' },
  { src: '/images/g-gate-night.webp', alt: 'Automatic sliding gate open at night with a car entering a villa compound', caption: 'Sliding gate for a villa compound' },
  { src: '/images/g-gate-day.webp', alt: 'Automatic swing gate in daylight at a residential entrance', caption: 'Swing gate at a residential entrance' },
  { src: '/images/g-barrier-dusk.webp', alt: 'Boom barrier raised for a car at a security booth at dusk', caption: 'Boom barrier at a security booth' },
  { src: '/images/g-garage-dusk.webp', alt: 'Sectional garage door opening to a lit garage at dusk', caption: 'Sectional garage door' },
  { src: '/images/g-shutter-night.webp', alt: 'Rolling shutter raised on a shop front at night', caption: 'Rolling shutter for a shop front' },
  { src: '/images/g-dock-day.webp', alt: 'Loading dock door open with dock leveller and pallets inside', caption: 'Dock door and leveller' },
  { src: '/images/g-lobby-night.webp', alt: 'Automatic glass sliding doors open for a visitor at a building entrance', caption: 'Automatic glass entrance' },
  { src: '/images/g-factory-dusk.webp', alt: 'High-speed industrial door at a factory at dusk', caption: 'High-speed door at a factory' },
]
