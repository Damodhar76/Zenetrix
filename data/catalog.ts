import { slugify } from '@/lib/site'

export type Category = { slug: string; name: string }
export type Product = { category: string; slug: string; name: string; keyword: string; confirm?: boolean }

export const categories: Category[] = [
  { slug: 'gate-automation', name: 'Gate Automation' },
  { slug: 'automatic-doors', name: 'Automatic Doors and Windows' },
  { slug: 'boom-barriers', name: 'Boom and Flap Barriers' },
  { slug: 'garage-doors', name: 'Garage Doors' },
  { slug: 'rolling-shutters', name: 'Rolling Shutters' },
  { slug: 'high-speed-doors-dock', name: 'High-Speed Doors and Dock Equipment' },
  { slug: 'rfid-access-control', name: 'UHF RFID Access Control' },
  { slug: 'sectional-doors', name: 'Sectional Doors' },
]

// [name, primary keyword, needs client confirmation?]
const raw: Record<string, [string, string, boolean?][]> = {
  'gate-automation': [
    ['Sliding Gate Automation', 'sliding gate automation Hyderabad'],
    ['Swing Gate Automation', 'swing gate opener Hyderabad'],
    ['Trackless Bi-Folding Gate Automation', 'trackless bi-folding gate Hyderabad'],
    ['Telescopic Gate Automation', 'telescopic sliding gate Hyderabad'],
    ['Bi-Folding Gate Automation', 'bi-folding gate automation Hyderabad'],
    ['Cantilever Trackless Gate Automation', 'cantilever gate automation Hyderabad'],
  ],
  'automatic-doors': [
    ['Sliding Glass Doors', 'automatic sliding glass door Hyderabad'],
    ['Sliding PVC Doors', 'automatic PVC sliding door Hyderabad'],
    ['Sliding Wooden Doors', 'automatic wooden sliding door Hyderabad'],
    ['Glass Swing Door Automation', 'automatic swing door operator Hyderabad'],
    ['Folding Door Automation', 'automatic folding door Hyderabad', true],
    ['Swing Window Automation', 'automatic window opener Hyderabad'],
    ['Vertical Window Automation', 'vertical window automation Hyderabad'],
    ['Curtain and Blinds Automation', 'motorised curtains and blinds Hyderabad'],
  ],
  'boom-barriers': [
    ['Folding Boom Barrier', 'folding boom barrier Hyderabad'],
    ['Fence Boom Barrier', 'fence boom barrier Hyderabad', true],
    ['Telescopic Boom Barrier', 'telescopic boom barrier Hyderabad'],
    ['Arm-Out Boom Barrier', 'automatic boom barrier supplier Hyderabad', true],
    ['Advertising Boom Barrier', 'advertising boom barrier India'],
    ['Flap Barrier', 'flap barrier Hyderabad'],
    ['Glass Speed Gate', 'speed gate flap barrier Hyderabad'],
    ['Automatic Bollards', 'automatic bollards Hyderabad'],
  ],
  'garage-doors': [
    ['Residential Garage Doors', 'residential garage doors Hyderabad'],
    ['Insulated Garage Doors', 'insulated garage doors Hyderabad'],
    ['Full-Vision Garage Doors', 'full vision garage doors Hyderabad'],
    ['Wooden-Finish Garage Doors', 'wooden finish garage doors Hyderabad'],
  ],
  'sectional-doors': [
    ['Residential Sectional Doors', 'residential sectional garage door Hyderabad'],
    ['Full-Vision Glass Sectional Doors', 'full view glass garage door Hyderabad'],
    ['Garage Sectional Doors', 'sectional garage door Hyderabad'],
    ['Wooden-Finish Sectional Doors', 'wooden finish sectional door Hyderabad'],
    ['PVC Glass Sectional Doors', 'PVC sectional door Hyderabad'],
    ['Polycarbonate Glass Sectional Doors', 'polycarbonate sectional door Hyderabad'],
    ['Industrial Sectional Doors', 'industrial sectional door Hyderabad'],
  ],
  'rolling-shutters': [
    ['Aluminium Rolling Shutter', 'aluminium rolling shutter Hyderabad'],
    ['GI Rolling Shutter', 'GI rolling shutter Hyderabad'],
    ['Fire-Rated Double Wall Galvalume Rolling Shutter', 'fire rated rolling shutter Hyderabad'],
    ['Wind-Resistance Rolling Shutter', 'wind resistant rolling shutter India'],
    ['Polycarbonate Rolling Shutter', 'polycarbonate rolling shutter Hyderabad'],
    ['Skylight Roof Shutter', 'skylight roof shutter Hyderabad'],
  ],
  'rfid-access-control': [
    ['UHF RFID Long Range Reader AZUHFR105A', 'UHF RFID long range reader Hyderabad'],
    ['UHF RFID Long Range Reader AZUHFR115', 'long range RFID reader 15 metre India'],
    ['Long Range UHF RFID Stickers and Tags', 'UHF RFID vehicle sticker parking Hyderabad'],
    ['UHF RFID Controller', 'UHF RFID controller software parking Hyderabad'],
  ],
  'high-speed-doors-dock': [
    ['Conveyor High Speed Door', 'conveyor high speed door India'],
    ['Standard High Speed Door', 'high speed door manufacturers Hyderabad'],
    ['Clean Room High Speed Door', 'clean room high speed door India'],
    ['Self Repairable High Speed Door', 'self repairing high speed door India'],
    ['Freezer High Speed Door', 'cold storage freezer high speed door Hyderabad'],
    ['Fast Pack Door', 'fast pack high speed door India'],
    ['Spiral Door', 'high speed spiral door India'],
    ['Dock Leveller', 'dock leveller Hyderabad'],
    ['Dock Shelters', 'dock shelter Hyderabad'],
    ['Retractable Dock Shelters', 'retractable dock shelter India'],
    ['Inflatable Dock Shelters', 'inflatable dock shelter India'],
    ['Dock Seals', 'dock seal Hyderabad'],
  ],
}

export const products: Product[] = Object.entries(raw).flatMap(([category, list]) =>
  list.map(([name, keyword, confirm]) => ({ category, slug: slugify(name), name, keyword, confirm }))
)
export const getCategory = (slug: string) => categories.find(c => c.slug === slug)
export const getProduct = (category: string, slug: string) => products.find(p => p.category === category && p.slug === slug)
export const productsIn = (category: string) => products.filter(p => p.category === category)

export const industries = [
  'Apartments and Gated Communities', 'Villas', 'IT Parks', 'Warehouses', 'Hospitals', 'Malls', 'Schools', 'Hotels',
  'Factories', 'Cold Storage', 'Parking', 'Showrooms', 'Airports', 'Data Centres', 'Government',
].map(name => ({ name, slug: slugify(name) }))

export const services = [
  { slug: 'automatic-gate-installation', name: 'Automatic Gate and Door Installation', keyword: 'automatic gate installation Hyderabad' },
  { slug: 'automatic-gate-repair', name: 'Repair and Servicing (Any Brand)', keyword: 'automatic gate repair Hyderabad' },
  { slug: 'amc', name: 'Annual Maintenance Contract (AMC)', keyword: 'automatic door AMC Hyderabad' },
  { slug: 'convert-manual-gate-to-automatic', name: 'Retrofit: Convert Manual Gate to Automatic', keyword: 'convert manual gate to automatic Hyderabad' },
  { slug: 'smart-control', name: 'Smart Control: Mobile App, Smartwatch, Voice', keyword: 'smart gate control mobile app' },
  { slug: 'access-control', name: 'Access Control: RFID, ANPR, Keypad, Biometric', keyword: 'gate access control system Hyderabad' },
  { slug: 'safety-devices', name: 'Safety Devices: Photocells, Loops, Safety Edges', keyword: 'gate safety sensors India' },
  { slug: 'spare-parts', name: 'Spare Parts and Motors', keyword: 'gate motor spare parts Hyderabad' },
]
