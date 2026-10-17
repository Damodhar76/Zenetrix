// Single / double wall construction and powder-coating colours for rolling shutters.
const WALLS = [
  { t: 'Single wall', d: 'One layer of slats. Light, economical and quiet, suited to shops, showrooms and general security.' },
  { t: 'Double wall', d: 'Two layers of slats, often with an insulating gap. Stronger, better for heat, noise and fire-compartment use.' },
]
const COLOURS: [string, string][] = [
  ['White', '#F5F5F2'], ['Ivory', '#EAE0C8'], ['Silver grey', '#A7ADB5'], ['Charcoal', '#3A3F46'], ['Black', '#16181B'],
  ['Brown', '#5B3A29'], ['Blue', '#1F5FBF'], ['Green', '#2F7D4F'], ['Maroon', '#7A1F2B'],
]

const ALU = [
  { t: 'Single wall profile', d: 'A single skin of aluminium slats. Light and economical for shopfronts, showrooms and general security.' },
  { t: 'Double wall profile', d: 'A double skin of aluminium slats for extra strength and a more solid feel. Better for noise and heat control.' },
  { t: 'Powder-coated finish', d: 'Baked-on powder coating for a uniform, scratch-resistant and fade-resistant surface.' },
]
const ALU_COLOURS: [string, string][] = [['White', '#F5F5F2'], ['Charcoal', '#3A3F46'], ['Brown', '#5B3A29']]

export function ShutterOptions({ aluminium = false }: { aluminium?: boolean }) {
  return (
    <>
      <h2 className="h-sec mt-7 md:mt-12 mb-3 flex items-center gap-3"><span aria-hidden className="h-7 w-1.5 shrink-0 rounded-full bg-gradient-to-b from-cyan-400 to-blue-700" />Wall type and powder-coated colours</h2>
      <div className="grid sm:grid-cols-2 gap-3 mb-4">
        {WALLS.map(w => (
          <div key={w.t} className="card-glow rounded-2xl border border-slate-200 bg-white p-4">
            <p className="font-heading font-bold text-lg">{w.t}</p>
            <p className="mt-1 text-sm text-slate-600 leading-relaxed">{w.d}</p>
          </div>
        ))}
      </div>
      <p className="text-slate-700 leading-7 mb-3">Both are available with a <strong>powder-coated finish</strong> that resists scratches, rust and fading. Pick a standard shade or ask for a custom RAL colour to match your building.</p>
      <ul className="flex flex-wrap gap-3 mb-2" aria-label="Powder coating colours">
        {COLOURS.map(([n, c]) => (
          <li key={n} className="flex items-center gap-2 rounded-full border border-slate-200 bg-white py-1.5 pl-1.5 pr-3.5 text-sm font-medium shadow-sm">
            <span className="h-6 w-6 rounded-full ring-1 ring-slate-300" style={{ background: c }} aria-hidden />{n}
          </li>
        ))}
        <li className="flex items-center rounded-full border border-dashed border-blue-400 bg-blue-50 px-3.5 py-1.5 text-sm font-semibold text-blue-700">Custom RAL shade</li>
      </ul>
      <p className="text-xs text-slate-500">Shown colours are approximate on screen. We confirm the exact shade with a sample before production.</p>
      {aluminium && (
        <>
          <h3 className="font-heading font-semibold text-lg mt-6 mb-2">Aluminium profile options</h3>
          <ul className="grid sm:grid-cols-3 gap-3 mb-4">
            {ALU.map(a => (
              <li key={a.t} className="card-glow rounded-2xl border border-slate-200 bg-white p-4">
                <p className="font-heading font-bold">{a.t}</p>
                <p className="mt-1 text-sm text-slate-600 leading-relaxed">{a.d}</p>
              </li>
            ))}
          </ul>
          <p className="text-slate-700 leading-7 mb-2">Popular powder-coat shades for aluminium:</p>
          <ul className="flex flex-wrap gap-3 mb-3" aria-label="Popular aluminium powder coating colours">
            {ALU_COLOURS.map(([n, c]) => (
              <li key={n} className="flex items-center gap-2 rounded-full border border-slate-200 bg-white py-1.5 pl-1.5 pr-3.5 text-sm font-medium shadow-sm">
                <span className="h-6 w-6 rounded-full ring-1 ring-slate-300" style={{ background: c }} aria-hidden />{n}
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  )
}
