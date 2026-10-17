import { MASTER_KEYWORDS } from '@/data/seoKeywords'

// Meta keyword builder. Search engines mostly ignore the keywords tag, so these also feed
// on-page headings and FAQ wording. Kept relevant and capped so they never look spammy.
const PLACES = ['Hyderabad', 'Secunderabad', 'Banjara Hills', 'Jubilee Hills', 'Gachibowli', 'HITEC City', 'Kondapur', 'Madhapur', 'Kukatpally', 'Miyapur', 'Kompally', 'Uppal', 'Shamshabad', 'Telangana']
const INTENT = ['supplier', 'dealers', 'manufacturers', 'installation', 'price', 'cost', 'repair', 'AMC', 'best company', 'near me', 'service', 'contractors', 'quotation', 'company']

export function productKeywords(name: string, primary: string, extra: string[] = []): string[] {
  const n = name.toLowerCase()
  const list = [
    primary, `${name} Hyderabad`, `best ${n} in Hyderabad`, `${n} Telangana`, `${n} Andhra Pradesh`, `${n} India`,
    ...INTENT.map(i => `${n} ${i} Hyderabad`),
    ...PLACES.slice(1, 13).map(pl => `${n} ${pl}`),
    `${n} for apartments`, `${n} for factories`, `${n} for commercial buildings`,
    'Zenitrix Technologies', 'Zenitrix automation Hyderabad',
    ...extra,
  ]
  return Array.from(new Set(list.map(k => k.trim()).filter(Boolean))).slice(0, 55)
}

// ---- Site-wide keyword set (root layout) ----
// Core offers x core places, plus long-tail buyer phrases and Telugu/Hindi search wording used in Hyderabad.
const CORE = ['automatic gate', 'sliding gate automation', 'swing gate opener', 'boom barrier', 'automatic sliding door', 'automatic glass door', 'rolling shutter', 'sectional door', 'garage door', 'high speed door', 'dock leveller', 'RFID access control', 'UHF RFID parking system', 'flap barrier', 'speed gate', 'gate motor', 'gate repair', 'gate AMC', 'remote controlled gate', 'smart gate mobile app control']
const CORE_PLACES = ['Hyderabad', 'Secunderabad', 'Telangana', 'Andhra Pradesh', 'Banjara Hills', 'Jubilee Hills', 'Gachibowli', 'HITEC City', 'Kondapur', 'Madhapur', 'Kukatpally', 'Kompally', 'Kokapet', 'Financial District', 'Tellapur', 'Narsingi', 'Shamshabad', 'Adibatla', 'Uppal', 'Miyapur']
const LONG_TAIL = [
  'automatic gate price in Hyderabad', 'sliding gate motor price Hyderabad', 'swing gate opener price Hyderabad', 'boom barrier price Hyderabad', 'automatic door price Hyderabad',
  'how much does gate automation cost in Hyderabad', 'convert manual gate to automatic Hyderabad', 'automatic gate for villa Hyderabad', 'automatic gate for apartments Hyderabad',
  'gate automation for gated community Hyderabad', 'factory gate automation Hyderabad', 'warehouse dock leveller Hyderabad', 'automatic gate repair near me', 'gate motor repair Hyderabad',
  'gate automation companies in Hyderabad', 'best gate automation company Hyderabad', 'automatic gate dealers Hyderabad', 'automatic gate installation near me', 'gate operator spare parts Hyderabad',
  'free site visit gate automation Hyderabad', 'any brand gate repair Hyderabad', 'annual maintenance contract gate Hyderabad', 'RFID vehicle sticker Hyderabad', 'apartment parking RFID Hyderabad',
  'ఆటోమేటిక్ గేట్ హైదరాబాద్', 'గేట్ ఆటోమేషన్ హైదరాబాద్', 'ఆటోమేటిక్ డోర్ హైదరాబాద్', 'స్లైడింగ్ గేట్ హైదరాబాద్', 'ఆటోమేటిక్ గేట్ ధర', 'గేట్ రిపేర్ హైదరాబాద్',
  'automatic gate Hyderabad Telugu', 'gate automation Telangana', 'Zenitrix Technologies', 'Zenitrix Automations', 'Zenitrix Automations Hyderabad', 'zenitrixautomations.com',
]
export function siteKeywords(): string[] {
  const grid = CORE.flatMap(c => CORE_PLACES.map(p => `${c} ${p}`))
  const all = [...MASTER_KEYWORDS, ...LONG_TAIL, ...grid]
  const seen = new Set<string>()
  return all.filter(k => { const l = k.toLowerCase(); if (seen.has(l)) return false; seen.add(l); return true })
}

// Page-level subset of the master list: keeps keywords containing ANY of the given terms (case-insensitive).
// Next.js replaces (does not merge) the layout keywords when a page sets its own, so pages call this to keep the master terms.
export function masterKeywordsFor(terms: string[], limit = 120): string[] {
  const t = terms.map(x => x.toLowerCase())
  return MASTER_KEYWORDS.filter(k => { const l = k.toLowerCase(); return t.some(x => l.includes(x)) }).slice(0, limit)
}
