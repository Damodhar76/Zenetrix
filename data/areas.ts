import { slugify } from '@/lib/site'
export type AreaType = 'residential' | 'it' | 'industrial'
export type Area = { slug: string; name: string; type: AreaType; top30: boolean; priority: boolean }

const names = ['Banjara Hills','Jubilee Hills','Madhapur','Gachibowli','Kondapur','HITEC City','Kukatpally','Manikonda','Narsingi','Financial District','Nanakramguda','Miyapur','Bachupally','Nizampet','Begumpet','Secunderabad','Somajiguda','Ameerpet','SR Nagar','Kokapet','Tellapur','Shamshabad','LB Nagar','Uppal','Kompally','Alwal','Medchal','Shamirpet','Patancheru','Jeedimetla','Attapur','Mehdipatnam','Tolichowki','Shaikpet','Film Nagar','Habsiguda','Tarnaka','Dilsukhnagar','Hayathnagar','Sainikpuri','Kothapet','Chaitanyapuri','Nagole','Malkajgiri','Bowenpally','Balanagar','Moosapet','Sanath Nagar','Erragadda','Yousufguda','Panjagutta','Khairatabad','Lakdikapul','Himayatnagar','Nampally','Abids','Koti','Malakpet','Charminar','Rajendranagar','Gandipet','Puppalguda','Kismatpura','Chandanagar','Lingampally','Gopanpally','Serilingampally','Khajaguda','Raidurg','Hafeezpet','Pragathi Nagar','Quthbullapur','Gajularamaram','Suraram','Dundigal','Bollaram','Bolarum','Trimulgherry','Neredmet','Boduppal','Peerzadiguda','Medipally','Ghatkesar','Pocharam','Cherlapally','Vanasthalipuram','Saroornagar','Moinabad','Shadnagar','Keesara','Mokila',
  // Added Oct 2026 from the client's area list (appended, so existing top-30 service pages are unchanged)
  'Neopolis','Osman Nagar','Kollur','Velimela','Manchirevula','Nallagandla','Bandlaguda Jagir','Neknampur','Shankarpalli','Ameenpur','Suchitra','Yapral','Kapra','ECIL','Srinagar Colony','Maheshwaram','Tukkuguda','Adibatla']
const industrial = ['Adibatla','Tukkuguda','Jeedimetla','Patancheru','Shamshabad','Medchal','Gajularamaram','Suraram','Dundigal','Bollaram','Cherlapally','Pocharam','Ghatkesar','Moinabad','Shadnagar']
const it = ['Madhapur','Gachibowli','HITEC City','Financial District','Nanakramguda','Kondapur','Raidurg','Khajaguda']

// Client's priority localities (shown first in every 'Available across Hyderabad' list), in the client's order.
// Gopanpally and Rajendranagar are the same places the client wrote as Gopanapally and Rajendra Nagar.
export const PRIORITY = ['Kokapet','Neopolis','Narsingi','Financial District','Tellapur','Osman Nagar','Kollur','Velimela','Manchirevula','Gopanpally','Gandipet','Mokila','Shankarpalli','Rajendranagar','Shamshabad','Tukkuguda','Adibatla','Kompally']
export const areas: Area[] = names.map((name, i) => ({
  slug: slugify(name), name, top30: i < 30, priority: PRIORITY.includes(name),
  type: industrial.includes(name) ? 'industrial' : it.includes(name) ? 'it' : 'residential',
}))
export const priorityAreas: Area[] = PRIORITY.map(n => areas.find(a => a.name === n)!).filter(Boolean)
// Ordered list for 'Available across Hyderabad' blocks: priority localities first (industrial ones first when asked), then the rest.
export const featuredAreas = (industrialFirst = false, limit = 24): Area[] => {
  const pri = industrialFirst ? [...priorityAreas.filter(a => a.type === 'industrial'), ...priorityAreas.filter(a => a.type !== 'industrial')] : priorityAreas
  const rest = areas.filter(a => !a.priority)
  return [...pri, ...(industrialFirst ? [...rest.filter(a => a.type === 'industrial'), ...rest.filter(a => a.type !== 'industrial')] : rest)].slice(0, limit)
}
export const getArea = (slug: string) => areas.find(a => a.slug === slug)
// Nearby = closest entries in Appendix A order, same type preferred. [CLIENT TO CONFIRM] real geography later.
export const nearby = (slug: string, n = 4) => {
  const a = getArea(slug)!; const i = areas.indexOf(a)
  return areas.filter(x => x !== a).sort((x, y) =>
    (Number(x.type !== a.type) * 100 + Math.abs(areas.indexOf(x) - i)) - (Number(y.type !== a.type) * 100 + Math.abs(areas.indexOf(y) - i))).slice(0, n)
}
