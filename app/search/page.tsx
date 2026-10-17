import { Page, H2, P } from '@/components/layout/Page'
import { SearchBox } from '@/components/search/SearchBox'
import { meta } from '@/lib/seo'

export const metadata = meta({ title: 'Search the Zenitrix Website', description: 'Search products, services, areas and guides on the Zenitrix Technologies website.', path: '/search/', noindex: true })

export default function SearchPage() {
  return (
    <Page crumbs={[{ name: 'Search', path: '/search/' }]}>
      <h1 className="text-3xl md:text-4xl font-bold">Search</h1>
      <P>Find a product, service, locality or guide.</P>
      <SearchBox autoFocus />
      <H2>Popular</H2>
      <ul className="flex flex-wrap gap-2">{[['Sliding gate', '/products/gate-automation/sliding-gate-automation/'], ['Boom barrier', '/products/boom-barriers/'], ['Gate repair', '/services/automatic-gate-repair/'], ['AMC', '/services/amc/'], ['Rolling shutter', '/products/rolling-shutters/']].map(([n, h]) => <li key={h}><a className="block rounded-full border border-slate-200 bg-white px-4 py-2 text-sm hover:border-blue-500" href={h}>{n}</a></li>)}</ul>
    </Page>
  )
}
