'use client'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { categories } from '@/data/catalog'
import { waLink } from '@/lib/site'

// Explains what drives the price of an installation. It never shows prices: real quotes come after a free site visit (Blueprint 8.3, 16).
const WIDTH = ['Under 3 m', '3 to 5 m', '5 to 8 m', 'Over 8 m']
const WEIGHT = ['Light (aluminium / glass)', 'Medium (steel / wood)', 'Heavy (large steel / industrial)']
const USE = ['A single home (a few cycles a day)', 'A community or office (many cycles)', 'Commercial or industrial (continuous traffic)']
const CONTROLS = ['Remote control', 'Mobile app', 'Smartwatch', 'RFID card / tag', 'Keypad', 'ANPR camera']
const SAFETY = ['Photocells', 'Safety edge', 'Flashing lamp', 'Battery backup']
const WORKS = ['New civil work or foundation', 'Electrical cabling', 'Gate or door fabrication', 'Existing automation to be removed']

const sel = 'mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5'
function Checks({ legend, items, value, set }: { legend: string; items: string[]; value: string[]; set: (v: string[]) => void }) {
  return (
    <fieldset className="grid gap-2"><legend className="text-sm font-medium">{legend}</legend>
      <div className="grid sm:grid-cols-2 gap-2">{items.map(i => (
        <label key={i} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm">
          <input suppressHydrationWarning type="checkbox" checked={value.includes(i)} onChange={e => set(e.target.checked ? [...value, i] : value.filter(x => x !== i))} /> {i}
        </label>))}</div>
    </fieldset>
  )
}

export function CostEstimator() {
  const [family, setFamily] = useState(categories[0].name)
  const [width, setWidth] = useState(1)
  const [weight, setWeight] = useState(1)
  const [use, setUse] = useState(0)
  const [controls, setControls] = useState<string[]>(['Remote control'])
  const [safety, setSafety] = useState<string[]>(['Photocells'])
  const [works, setWorks] = useState<string[]>([])

  const factors = useMemo(() => {
    const lvl = (n: number) => (n <= 0 ? 'Low' : n === 1 ? 'Medium' : 'High')
    const out = [
      { name: 'Opening size', level: lvl(width - 1 < 0 ? 0 : width - 1), note: `${WIDTH[width]}: wider openings need stronger operators, longer rails or bigger drums.` },
      { name: 'Leaf or door weight', level: lvl(weight), note: `${WEIGHT[weight]}: weight sets the motor size and the hardware rating.` },
      { name: 'Usage intensity', level: lvl(use), note: `${USE[use]}: heavy duty cycles need operators built for continuous use.` },
      { name: 'Control and access', level: lvl(Math.min(2, Math.floor(controls.length / 2))), note: controls.length ? `${controls.join(', ')}. Each method needs a compatible controller.` : 'Basic push-button or manual control only.' },
      { name: 'Safety devices', level: lvl(Math.min(2, Math.floor(safety.length / 2))), note: safety.length ? `${safety.join(', ')}.` : 'No extra safety devices selected. We recommend at least photocells.' },
      { name: 'Site works', level: lvl(Math.min(2, works.length)), note: works.length ? `${works.join(', ')}.` : 'No extra civil or electrical work selected.' },
    ]
    return out
  }, [width, weight, use, controls, safety, works])

  const msg = `Hi Zenitrix, I need a quote for ${family}. Opening: ${WIDTH[width]}. Weight: ${WEIGHT[weight]}. Use: ${USE[use]}. Controls: ${controls.join(', ') || 'none'}. Safety: ${safety.join(', ') || 'none'}. Site works: ${works.join(', ') || 'none'}.`
  const tone: Record<string, string> = { Low: 'bg-green-50 text-green-800', Medium: 'bg-amber-50 text-amber-800', High: 'bg-red-50 text-red-800' }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <form className="grid gap-5 text-sm" onSubmit={e => e.preventDefault()}>
        <label className="font-medium">What do you want to automate?
          <select suppressHydrationWarning className={sel} value={family} onChange={e => setFamily(e.target.value)}>{categories.map(c => <option key={c.slug}>{c.name}</option>)}</select></label>
        <div className="grid sm:grid-cols-3 gap-4">
          <label className="font-medium">Opening width<select suppressHydrationWarning className={sel} value={width} onChange={e => setWidth(+e.target.value)}>{WIDTH.map((w, i) => <option key={w} value={i}>{w}</option>)}</select></label>
          <label className="font-medium">Weight and material<select suppressHydrationWarning className={sel} value={weight} onChange={e => setWeight(+e.target.value)}>{WEIGHT.map((w, i) => <option key={w} value={i}>{w}</option>)}</select></label>
          <label className="font-medium">How often is it used?<select suppressHydrationWarning className={sel} value={use} onChange={e => setUse(+e.target.value)}>{USE.map((w, i) => <option key={w} value={i}>{w}</option>)}</select></label>
        </div>
        <Checks legend="Control and access" items={CONTROLS} value={controls} set={setControls} />
        <Checks legend="Safety" items={SAFETY} value={safety} set={setSafety} />
        <Checks legend="Site works" items={WORKS} value={works} set={setWorks} />
      </form>
      <div className="rounded-2xl border border-slate-200 bg-surface p-5 h-fit lg:sticky lg:top-28">
        <h2 className="font-heading text-xl font-bold">What will shape your quote</h2>
        <p className="mt-1 text-sm text-slate-600">This tool shows what affects the price. It does not give a price, because that needs a site visit.</p>
        <ul className="mt-4 grid gap-3" aria-live="polite">{factors.map(f => (
          <li key={f.name} className="rounded-xl bg-white p-3 ring-1 ring-slate-200">
            <p className="flex items-center justify-between font-medium">{f.name}<span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${tone[f.level]}`}>{f.level} impact</span></p>
            <p className="mt-1 text-sm text-slate-600">{f.note}</p>
          </li>))}</ul>
        <div className="mt-5 flex flex-wrap gap-3">
          <a className="btn" href={waLink(msg)}>Send this on WhatsApp</a>
          <Link className="btn btn-ghost" href="/contact/">Book a free site visit</Link>
        </div>
      </div>
    </div>
  )
}
