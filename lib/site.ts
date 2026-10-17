export const SITE = {
  name: 'Zenitrix Technologies',
  brand: 'Zenitrix',
  domain: 'zenitrixautomations.com',
  base: (process.env.NEXT_PUBLIC_SITE_URL || 'https://zenitrixautomations.com').replace(/\/$/, ''),
  phone: '+91 85006 32002',
  phoneTel: '+918500632002',
  wa: '918500632002',
  email: 'zenitrixautomations@gmail.com',
  address: {
    street: 'MLA Colony, Hanuman Temple St, Nizam Colony, Banjara Hills',
    city: 'Hyderabad', region: 'Telangana', zip: '500028', country: 'IN',
  },
  // [CLIENT TO CONFIRM] coordinates, sameAs profile URLs
  geo: { lat: process.env.NEXT_PUBLIC_GEO_LAT || '', lng: process.env.NEXT_PUBLIC_GEO_LNG || '' },
  // Google Maps / Google Business Profile link (set NEXT_PUBLIC_MAPS_URL). Used for hasMap + sameAs when present.
  maps: process.env.NEXT_PUBLIC_MAPS_URL || '',
  sameAs: [
    'https://www.facebook.com/zenitrixautomations',
    'https://www.instagram.com/zenitrixautomations/',
    'https://www.linkedin.com/in/zenitrix-automations-73780543b',
    'https://in.pinterest.com/zenitrixautomation',
    'https://www.youtube.com/@Zenitrixautomations',
    'https://x.com/zenitrixautomat',
    'https://www.threads.com/@zenitrixautomations',
    'https://jsdl.in/RSL-EPQ1791567663',
  ] as string[],
  social: {
    facebook: 'https://www.facebook.com/zenitrixautomations',
    instagram: 'https://www.instagram.com/zenitrixautomations/',
    linkedin: 'https://www.linkedin.com/in/zenitrix-automations-73780543b',
    pinterest: 'https://in.pinterest.com/zenitrixautomation',
    youtube: 'https://www.youtube.com/@Zenitrixautomations',
    x: 'https://x.com/zenitrixautomat',
    threads: 'https://www.threads.com/@zenitrixautomations',
    justdial: 'https://jsdl.in/RSL-EPQ1791567663',
  },
  // [CLIENT TO CONFIRM] opening hours as schema.org strings, for example ['Mo-Sa 09:30-18:30']. Leave empty until confirmed.
  hours: (process.env.NEXT_PUBLIC_HOURS || '').split('|').map(x => x.trim()).filter(Boolean) as string[],
  // Date the content was last reviewed (used for sitemap lastmod). Update when content changes.
  // Client-confirmed: 10 years of experience (Oct 2026).
  years: 10,
  updated: '2026-10-07',
}
export const waLink = (text: string) => `https://wa.me/${SITE.wa}?text=${encodeURIComponent(text)}`
export const slugify = (s: string) => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
