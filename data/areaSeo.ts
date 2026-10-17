import type { Area } from './areas'
import type { Faq } from './faqs'

// Locality copy for area hub pages (/hyderabad/<area>/). Landmarks are well-known public places used only to
// orient readers. No prices, ratings, response-time promises or invented projects (Blueprint 11, 13).
type Local = { intro: string; landmarks: string[]; roads: string[]; sites: string[] }
export const areaSeo: Record<string, Local> = {
  'banjara-hills': { intro: 'Banjara Hills is our home area. Our office is in Nizam Colony, so villas, boutique offices, hotels and clinics here are the easiest sites for us to visit.', landmarks: ['Road No. 1', 'Road No. 12', 'GVK One Mall', 'KBR Park'], roads: ['Road No. 1', 'Road No. 12', 'Road No. 10'], sites: ['Independent villas with sliding or swing gates', 'Boutique offices, clinics and restaurants with automatic glass doors', 'Gated apartment blocks needing boom barriers and AMC'] },
  'jubilee-hills': { intro: 'Jubilee Hills has many large villas, farmhouse-style compounds and studios where gate automation, sectional garage doors and smart control are in regular demand.', landmarks: ['Jubilee Hills Check Post', 'Road No. 36', 'Road No. 45', 'Peddamma Temple'], roads: ['Road No. 36', 'Road No. 45', 'Jubilee Hills Check Post road'], sites: ['Large villas with wide driveways', 'Studios, showrooms and hotels', 'Gated compounds needing RFID and intercom'] },
  madhapur: { intro: 'Madhapur is one of the busiest IT and commercial hubs in Hyderabad. Offices, hotels, malls, apartments and food courts here depend on boom barriers, access control and automatic doors that run all day.', landmarks: ['Cyber Towers', 'Mindspace IT Park', 'Inorbit Mall', 'Durgam Cheruvu'], roads: ['Madhapur Main Road', 'Hitec City Main Road', 'Ayyappa Society Road'], sites: ['IT parks and office towers with basement parking', 'Hotels, malls and restaurants with automatic glass doors', 'Gated apartment communities in Ayyappa Society and nearby colonies'] },
  gachibowli: { intro: 'Gachibowli combines large IT campuses, universities and gated communities. Vehicle entries with boom barriers, UHF RFID and ANPR are common, along with automatic doors for lobbies.', landmarks: ['Indian School of Business', 'Gachibowli Stadium', 'DLF Cyber City', 'Outer Ring Road'], roads: ['Gachibowli–Miyapur Road', 'Outer Ring Road', 'Old Mumbai Highway'], sites: ['Campus gates and parking lanes needing RFID or ANPR', 'Office lobbies with speed gates and glass doors', 'Villa and apartment communities'] },
  kondapur: { intro: 'Kondapur has dense apartment communities, offices and shopping streets. Community gates, basement barriers and shop-front shutters are the usual requests.', landmarks: ['Botanical Garden', 'Kothaguda Junction', 'Sarath City Capital Mall', 'AMB Cinemas'], roads: ['Kondapur Main Road', 'Gachibowli–Miyapur Road'], sites: ['Gated communities with multiple gates and basements', 'Office buildings and showrooms', 'Shops and restaurants needing rolling shutters'] },
  'hitec-city': { intro: 'HITEC City is the centre of the IT corridor, with large campuses, hotels and convention spaces that rely on reliable access control and automatic entrances.', landmarks: ['HITEC City MMTS Station', 'Cyber Towers', 'Shilparamam', 'Mindspace IT Park'], roads: ['Hitec City Main Road', 'Cyber Towers Road'], sites: ['Campuses with vehicle and visitor lanes', 'Hotels and convention venues', 'Office lobbies with speed gates and glass doors'] },
  kukatpally: { intro: 'Kukatpally and KPHB Colony have many apartments, shops and small factories. Residents and traders here look for dependable gates, shutters and low-cost AMC.', landmarks: ['KPHB Colony', 'Kukatpally Y Junction', 'JNTU Hyderabad', 'Hitech City Road'], roads: ['Kukatpally Main Road', 'KPHB Main Road', 'Hitech City Road'], sites: ['Apartment communities and independent houses', 'Shops, clinics and showrooms', 'Small workshops needing rolling shutters'] },
  manikonda: { intro: 'Manikonda has fast-growing villa and apartment communities near the Outer Ring Road, where sliding gates, boom barriers and smart control are common.', landmarks: ['Lanco Hills', 'Alkapur Township', 'Puppalaguda', 'Outer Ring Road'], roads: ['Manikonda Main Road', 'Outer Ring Road', 'Puppalaguda Road'], sites: ['Gated communities and villa layouts', 'Apartment blocks with basement parking', 'Offices and showrooms'] },
  'financial-district': { intro: 'The Financial District and Nanakramguda are filled with large offices and new towers, where access control, speed gates, boom barriers and automatic doors must work daily.', landmarks: ['Nanakramguda', 'Outer Ring Road', 'Wipro Junction'], roads: ['Nanakramguda Road', 'Outer Ring Road'], sites: ['Tower lobbies and parking lanes', 'Campuses needing UHF RFID and ANPR', 'Hotels and service apartments'] },
  secunderabad: { intro: 'Secunderabad has older residential colonies, commercial streets and institutions. Gate repair, retrofit automation, shutters and AMC are the most common needs.', landmarks: ['Secunderabad Railway Station', 'Paradise Circle', 'Parade Grounds', 'Clock Tower'], roads: ['SP Road', 'Sardar Patel Road', 'Paradise Road'], sites: ['Older homes and compounds being retrofitted', 'Commercial streets needing shutters and glass doors', 'Institutions and hospitals'] },
  jeedimetla: { intro: 'Jeedimetla is a large industrial area with factories and warehouses. Rolling shutters, high-speed doors, dock levellers and heavy-duty gates are the main requirements.', landmarks: ['IDA Jeedimetla', 'Gajularamaram', 'Suraram', 'Outer Ring Road'], roads: ['Jeedimetla Industrial Area roads', 'Suraram Main Road', 'Outer Ring Road'], sites: ['Factories and workshops', 'Warehouses with loading bays', 'Industrial estates with truck traffic'] },
  shamshabad: { intro: 'Shamshabad is a logistics and aviation-linked belt near the airport and the Outer Ring Road. Dock equipment, high-speed doors and heavy gates serve warehouses and industrial units.', landmarks: ['Rajiv Gandhi International Airport', 'Outer Ring Road', 'Airport Road'], roads: ['Airport Road', 'Outer Ring Road', 'Bengaluru Highway'], sites: ['Warehouses and logistics yards', 'Industrial sheds and cold stores', 'Hotels and offices near the airport'] },
  kompally: { intro: 'Kompally has many gated communities and villas along the Medchal highway, where community gates, boom barriers and smart control are in regular use.', landmarks: ['Suchitra Junction', 'Dulapally', 'Bahadurpally', 'Medchal Highway'], roads: ['Medchal Highway', 'Kompally Main Road', 'Dulapally Road'], sites: ['Gated villa communities', 'Apartment blocks', 'Shops and small units'] },
  uppal: { intro: 'Uppal has dense residential colonies, offices and factories around the Warangal highway and the Ring Road. Gate automation, shutters and AMC are common requests.', landmarks: ['Uppal Cross Roads', 'Nagole', 'Ramanthapur', 'Uppal Ring Road'], roads: ['Warangal Highway', 'Uppal Ring Road', 'Nagole Road'], sites: ['Apartments and independent houses', 'Warehouses and small factories', 'Shops and clinics'] },
}

// Type-based sections: used for every area so each page has H2/H3 depth. Local intro/landmarks above keep pages distinct.
const why = {
  residential: ['Why homes and communities automate', 'Convenience, safety and security drive most home projects. A gate that opens from the car, closes behind you and logs entries is easier to live with, and gated communities cut waiting and manual errors at the gate.'],
  it: ['Why offices and campuses automate', 'Large entrances see hundreds of cars and visitors a day. Boom barriers, UHF RFID, ANPR and speed gates keep lanes moving and give a clear record of who entered.'],
  industrial: ['Why factories and warehouses automate', 'Loading bays, shutters and truck gates are in constant use. High-speed doors, dock levellers and heavy-duty gates save time, protect goods and make loading safer.'],
} as const

const need = {
  residential: ['Sliding and swing gate automation for villa compounds', 'Boom barriers and RFID for community entries', 'Sectional garage doors and smart control'],
  it: ['Boom barriers with UHF RFID or ANPR', 'Speed gates and automatic glass doors for lobbies', 'AMC so busy entries stay reliable'],
  industrial: ['Rolling shutters and high-speed doors', 'Dock levellers and dock shelters', 'Heavy-duty sliding gates and AMC'],
} as const

export function areaSections(a: Area) {
  const l = areaSeo[a.slug]
  return {
    local: l,
    whyH: why[a.type][0], whyP: why[a.type][1],
    needs: need[a.type],
    steps: [
      `Call or WhatsApp +91 85006 32002 with your location in ${a.name}.`,
      'We visit, measure the opening and check power, safety and access, free of charge.',
      'You receive a written quote that names the product, controller and safety devices.',
      'We install, test, train your team and offer AMC for planned servicing.',
    ],
  }
}

export function areaFaqs(a: Area): Faq[] {
  const base: Faq[] = [
    { q: `Do you install automatic gates in ${a.name}?`, a: `Yes. Zenitrix installs sliding and swing gates, boom barriers, automatic doors, shutters and dock equipment in ${a.name} and nearby areas of Hyderabad.` },
    { q: `Can you repair a gate or door in ${a.name} installed by another company?`, a: `Yes. We repair motors, controllers, remotes, tracks and sensors from any brand, and we can set up an AMC after the repair.` },
    { q: `Do you offer a free site visit in ${a.name}?`, a: 'Yes. We visit, measure and send a written quote. Call or WhatsApp +91 85006 32002 to book.' },
  ]
  const extra: Record<string, Faq> = {
    residential: { q: `Can you automate an existing manual gate in ${a.name}?`, a: 'In most cases yes. We check gate weight, balance, track and posts, then recommend an operator and safety devices.' },
    it: { q: `Can access control be added to an existing barrier in ${a.name}?`, a: 'Often yes, if the barrier controller accepts a standard access input. Share the make and model for a compatibility check.' },
    industrial: { q: `Which doors suit a warehouse in ${a.name}?`, a: 'Rolling shutters for general openings, high-speed doors for busy internal traffic and dock levellers with shelters for truck bays.' },
  }
  return [...base, extra[a.type]]
}
