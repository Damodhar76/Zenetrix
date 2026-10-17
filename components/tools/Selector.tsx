'use client'
import { useState } from 'react'
import Link from 'next/link'
import { LeadForm } from '../forms/LeadForm'

// "Which automation do I need?" (Blueprint 8.3 / 16): site, need, space, opening width, traffic and budget range
// lead to a recommended product and a pre-filled quote form. Qualitative only: no prices, specs or ratings.
type Rec = { name: string; href: string; why: string }
const sites = ['Villa or house', 'Apartment or gated community', 'Office, IT park or hospital', 'Factory or warehouse', 'Shop or showroom']
const needs = ['Gate for vehicles', 'Entrance door or window', 'Vehicle barrier / parking', 'Garage or large overhead door', 'Shutter for shop or godown', 'Loading bay equipment']
const space = ['Space beside the opening', 'Space to swing open', 'Limited space or low ceiling', 'Not sure']
const widths = ['Up to 3 m', '3 to 6 m', 'More than 6 m', 'Not sure']
const traffics = ['A few times a day', 'Regular daily use', 'Busy, many cycles an hour']
const budgets = ['Keep it economical', 'Balanced', 'Premium / heavy-duty']

type Answers = { site: string; need: string; sp: string; width: string; traffic: string; budget: string }

function recommend(a: Answers): Rec[] {
  const { site, need, sp, width, traffic } = a
  const r: Rec[] = []
  if (need === 'Gate for vehicles') {
    if (width === 'More than 6 m') r.push({ name: 'Telescopic gate automation', href: '/products/gate-automation/telescopic-gate-automation/', why: 'Very wide openings are often split into sections that fold or telescope, so one leaf is never too long or heavy.' })
    if (sp === 'Space beside the opening') r.push({ name: 'Sliding gate automation', href: '/products/gate-automation/sliding-gate-automation/', why: 'Slides along the boundary and suits wide or heavy gates.' })
    else if (sp === 'Space to swing open') r.push({ name: 'Swing gate automation', href: '/products/gate-automation/swing-gate-automation/', why: 'Opens on hinges where there is room for the leaves.' })
    else r.push({ name: 'Bi-folding or trackless gate', href: '/products/gate-automation/trackless-bi-folding-gate-automation/', why: 'Needs less side or swing space than a standard gate.' })
    r.push({ name: 'Convert a manual gate', href: '/services/convert-manual-gate-to-automatic/', why: 'If you already have a manual gate, it can often be automated.' })
  }
  if (need === 'Entrance door or window') {
    const villa = site.startsWith('Villa')
    r.push({ name: villa ? 'Sliding wooden or glass door' : 'Automatic sliding glass door', href: villa ? '/products/automatic-doors/sliding-wooden-doors/' : '/products/automatic-doors/sliding-glass-doors/', why: 'Touch-free, accessible entry.' })
    if (sp === 'Space to swing open') r.push({ name: 'Glass swing door automation', href: '/products/automatic-doors/glass-swing-door-automation/', why: 'Automates a hinged door where there is room for it to swing.' })
    r.push({ name: 'Window and curtain automation', href: '/products/automatic-doors/', why: 'Motorised windows, curtains and blinds for comfort.' })
  }
  if (need === 'Vehicle barrier / parking') {
    const tight = sp === 'Limited space or low ceiling'
    r.push({ name: tight ? 'Folding boom barrier' : width === 'More than 6 m' ? 'Telescopic boom barrier' : 'Boom barrier', href: tight ? '/products/boom-barriers/folding-boom-barrier/' : width === 'More than 6 m' ? '/products/boom-barriers/telescopic-boom-barrier/' : '/products/boom-barriers/', why: 'Controls vehicle entry with RFID, ANPR or manual control.' })
    r.push({ name: 'Access control', href: '/services/access-control/', why: 'RFID, ANPR, keypad or biometric control for who may enter.' })
  }
  if (need === 'Garage or large overhead door') r.push({ name: site.startsWith('Factory') ? 'Industrial sectional door' : 'Garage sectional door', href: site.startsWith('Factory') ? '/products/sectional-doors/industrial-sectional-doors/' : '/products/sectional-doors/garage-sectional-doors/', why: 'Quiet, insulated overhead doors.' })
  if (need === 'Shutter for shop or godown') r.push({ name: 'Rolling shutter', href: '/products/rolling-shutters/', why: 'Compact and economical for shopfronts and storage.' })
  if (need === 'Loading bay equipment') {
    r.push({ name: 'Dock leveller', href: '/products/high-speed-doors-dock/dock-leveller/', why: 'Bridges truck and floor for safe loading.' })
    r.push({ name: 'High-speed doors', href: '/products/high-speed-doors-dock/', why: 'Cut air and dust movement on busy bays.' })
  }
  return r
}

function advice(a: Answers): string[] {
  const n: string[] = []
  if (a.traffic === 'Busy, many cycles an hour') n.push('Busy entries need an operator rated for continuous duty and fast opening. Ask for the duty cycle in writing.')
  if (a.traffic === 'A few times a day') n.push('For light use, a standard residential operator is usually enough.')
  if (a.budget === 'Keep it economical') n.push('We can quote a lean setup and a fuller one side by side, so you see exactly what each includes. Never skip safety devices to save cost.')
  if (a.budget === 'Premium / heavy-duty') n.push('For a premium or heavy-duty setup, ask about stronger operators, better finishes, battery backup and smart control.')
  if (a.width === 'More than 6 m') n.push('Wide openings need a careful site survey. Weight and wind load matter more as width grows.')
  return n
}

const Group = ({ label, opts, val, set }: { label: string; opts: string[]; val: string; set: (v: string) => void }) => (
  <fieldset className="mb-6"><legend className="font-heading font-semibold text-lg mb-3">{label}</legend>
    <div className="flex flex-wrap gap-2">{opts.map(o => (
      <label key={o} className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition ${val === o ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-slate-300 hover:border-blue-500'}`}>
        <input suppressHydrationWarning type="radio" className="sr-only" name={label} checked={val === o} onChange={() => set(o)} />{o}</label>))}</div></fieldset>)

export function Selector() {
  const [a, setA] = useState<Answers>({ site: '', need: '', sp: '', width: '', traffic: '', budget: '' })
  const set = (k: keyof Answers) => (v: string) => setA(x => ({ ...x, [k]: v }))
  const ready = Object.values(a).every(Boolean)
  const recs = ready ? recommend(a) : []
  const notes = ready ? advice(a) : []
  const summary = ready ? `Selector answers: ${a.site}; ${a.need}; ${a.sp}; width ${a.width}; traffic ${a.traffic}; budget ${a.budget}.` : ''
  return (
    <div>
      <Group label="1. Where is it?" opts={sites} val={a.site} set={set('site')} />
      <Group label="2. What do you want to automate?" opts={needs} val={a.need} set={set('need')} />
      <Group label="3. What space do you have?" opts={space} val={a.sp} set={set('sp')} />
      <Group label="4. How wide is the opening?" opts={widths} val={a.width} set={set('width')} />
      <Group label="5. How busy is it?" opts={traffics} val={a.traffic} set={set('traffic')} />
      <Group label="6. What budget range do you have in mind?" opts={budgets} val={a.budget} set={set('budget')} />
      {ready && (
        <section aria-live="polite" className="rounded-2xl bg-surface border border-slate-200 p-5">
          <h2 className="font-heading font-bold text-2xl">We suggest</h2>
          <ul className="mt-3 space-y-3">{recs.map(r => <li key={r.name}><Link className="font-semibold text-blue-600 underline" href={r.href}>{r.name}</Link><p className="text-slate-600 text-sm">{r.why}</p></li>)}</ul>
          {notes.length > 0 && <ul className="mt-4 space-y-2 text-sm text-slate-700 list-disc pl-5">{notes.map(t => <li key={t}>{t}</li>)}</ul>}
          <p className="text-xs text-slate-500 mt-3">This is a starting point. A free site visit confirms the final choice. We never show a price here because it depends on your site.</p>
          <div className="mt-5 bg-white rounded-2xl p-5"><LeadForm product={recs[0]?.name} width={a.width === 'Not sure' ? '' : a.width} note={summary} /></div>
        </section>
      )}
    </div>
  )
}
