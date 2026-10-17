import { Page, H2, P, LinkList } from '@/components/layout/Page'
import { glossary } from '@/data/glossary'
import { meta } from '@/lib/seo'
import { glossarySchema } from '@/lib/schema'

export const metadata = meta({ title: 'Glossary: Gate, Door and Dock Automation Terms', description: 'Plain-language meanings of operator, photocell, duty cycle, RFID, ANPR, dock leveller and other automation terms used by Zenitrix Technologies.', path: '/glossary/' })
export default function Glossary() {
  const sorted = [...glossary].sort((a, b) => a.term.localeCompare(b.term))
  return (
    <Page crumbs={[{ name: 'Glossary', path: '/glossary/' }]} schema={glossarySchema(glossary)}
      hero={{ eyebrow: 'Resources', title: 'Glossary: Gate, Door and Dock Automation Terms', intro: 'Short, plain meanings of the words you will hear when you buy or service automation.', image: '/images/p-skylight-roof-shutter.webp' }}>
      <dl className="grid md:grid-cols-2 gap-4">{sorted.map(t => (
        <div key={t.term} id={t.term.toLowerCase().replace(/[^a-z0-9]+/g, '-')} className="rounded-2xl border border-slate-200 bg-white p-5"><dt className="font-heading font-semibold text-lg">{t.term}</dt><dd className="mt-1 text-slate-700">{t.def}</dd></div>))}</dl>
      <H2>Keep reading</H2>
      <P>Still unsure what you need? Try the selector or read our guides.</P>
      <LinkList items={[{ name: 'Which automation do I need?', href: '/which-automation/' }, { name: 'Guides', href: '/blog/' }, { name: 'Compare options', href: '/compare/' }, { name: 'Products', href: '/products/' }]} />
    </Page>
  )
}
