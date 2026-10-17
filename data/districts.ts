import { telanganaDistricts, apDistricts, type RegionDistrict } from './regions'
export type District = RegionDistrict
export type StateKey = 'telangana' | 'andhra-pradesh'
export const STATES: Record<StateKey, { name: string; short: string; path: string; list: RegionDistrict[] }> = {
  telangana: { name: 'Telangana', short: 'TS', path: '/telangana/', list: telanganaDistricts },
  'andhra-pradesh': { name: 'Andhra Pradesh', short: 'AP', path: '/andhra-pradesh/', list: apDistricts },
}
// Hyderabad district is covered by the detailed /hyderabad/ locality pages, so it has no /telangana/<slug>/ page of its own.
export const districtHref = (state: StateKey, d: RegionDistrict) => (state === 'telangana' && d.slug === 'hyderabad' ? '/hyderabad/' : `${STATES[state].path}${d.slug}/`)
// Telangana (kept for the footer, sitemap and existing imports). Pages exist for every district except Hyderabad.
export const districts: District[] = telanganaDistricts.filter(d => d.slug !== 'hyderabad')
export const andhraDistricts: District[] = apDistricts
export const getDistrict = (slug: string) => districts.find(d => d.slug === slug)
export const getAndhraDistrict = (slug: string) => andhraDistricts.find(d => d.slug === slug)
