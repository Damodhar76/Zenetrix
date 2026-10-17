import { projects } from '@/data/projects'
import { areas, priorityAreas } from '@/data/areas'
import { categories } from '@/data/catalog'
import { Page, H2, P, UL, LinkList, QuoteCta } from '@/components/layout/Page'
import { meta } from '@/lib/seo'
import { SITE } from '@/lib/site'

export const metadata = meta({
  title: 'Projects and Installations | 10+ Years of Experience | Zenitrix',
  description: `Gate, door, barrier and shutter projects by Zenitrix Technologies across Hyderabad, Telangana and Andhra Pradesh. ${SITE.years}+ years of experience. Free site visit.`.slice(0, 158),
  path: '/projects/',
})

const types = [
  { h: 'Villas and gated communities', p: 'Sliding, cantilever trackless, swing and folding gates, sectional garage doors, boom barriers and RFID entry for independent homes, villa layouts and apartment communities.', href: '/products/gate-automation/' },
  { h: 'Offices, IT parks and hospitals', p: 'Automatic glass doors, speed gates, flap barriers and boom barriers with access control for lobbies, campuses and basements.', href: '/products/automatic-doors/' },
  { h: 'Factories and warehouses', p: 'Rolling shutters, industrial sectional doors, high-speed doors, dock levellers and dock shelters for busy loading bays.', href: '/products/high-speed-doors-dock/' },
  { h: 'Parking and access control', p: 'Boom barriers with UHF RFID readers, tags and controller software for hands-free, logged vehicle entry.', href: '/products/rfid-access-control/' },
]

export default function Projects() {
  return (
    <Page crumbs={[{ name: 'Projects', path: '/projects/' }]} hero={{ eyebrow: 'Projects', title: 'Projects and Installations', intro: `${SITE.years}+ years of experience delivering gate, door, barrier and shutter projects across Hyderabad, Telangana and Andhra Pradesh.`, image: '/images/hero.webp' }}>
      <ul className="grid grid-cols-3 gap-3 text-center mb-6">
        {[[`${SITE.years}+`, 'Years of experience'], ['Free', 'Site visit and written quote'], ['2 states', 'Telangana and Andhra Pradesh']].map(([a, b]) => (
          <li key={a} className="rounded-xl bg-surface px-3 py-4"><p className="font-heading font-bold text-ink text-lg md:text-2xl">{a}</p><p className="text-slate-500 text-xs md:text-sm">{b}</p></li>
        ))}
      </ul>
      <P>Every Zenitrix project follows the same path: free site visit and measurement, the right product for the site, neat installation, testing, handover training and AMC support. We also take over and repair systems installed by other vendors.</P>
      <H2>Projects we handle</H2>
      <ul className="grid sm:grid-cols-2 gap-3 mb-4">
        {types.map(t => (<li key={t.h} className="rounded-xl border border-slate-200 bg-white p-4"><a className="font-heading font-semibold text-ink hover:text-blue-600" href={t.href}>{t.h} <span aria-hidden className="text-blue-500">→</span></a><p className="mt-1 text-sm text-slate-600">{t.p}</p></li>))}
      </ul>
      {projects.length > 0 && (<><H2>Recent installations</H2><LinkList items={projects.map(p => ({ name: `${p.title}, ${areas.find(a => a.slug === p.area)?.name ?? ''}`, href: `/projects/${p.slug}/` }))} /></>)}
      <H2>Where we work</H2>
      <P>Priority localities in Hyderabad, plus every district of Telangana and Andhra Pradesh.</P>
      <LinkList items={[...priorityAreas.map(a => ({ name: a.name, href: `/hyderabad/${a.slug}/` })), { name: 'All Telangana districts', href: '/telangana/' }, { name: 'All Andhra Pradesh districts', href: '/andhra-pradesh/' }]} />
      <H2>Start your project</H2>
      <UL items={categories.map(c => c.name)} />
      <QuoteCta />
    </Page>
  )
}
