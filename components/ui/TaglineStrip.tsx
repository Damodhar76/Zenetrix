// Brand promise block: banner image (with its own headline) beside four titled points. Light background, pure SVG icons.
const ICON_PROPS = { width: 28, height: 28, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true } as const

const ITEMS = [
  { a: 'Engineered Automation', b: 'Built for dependable performance', icon: <><path d="M12 3l7 3v5.500c0 4.200-2.900 7.600-7 9.500-4.100-1.900-7-5.300-7-9.500V6z" /><path d="M8.800 12.200l2.400 2.400 4.200-4.600" /></> },
  { a: 'Reliable Security', b: 'Protection you can rely on', icon: <><rect x="5" y="10.500" width="14" height="10" rx="2.200" /><path d="M8 10.500V8a4 4 0 018 0v2.500" /><circle cx="12" cy="15" r="1.300" /><path d="M12 16.300v1.700" /></> },
  { a: 'Effortless Access', b: 'Smooth control, every day', icon: <><rect x="4" y="3.500" width="9" height="17" rx="1.500" /><path d="M13 8.500l7 3.500-7 3.500" /><path d="M20 12H9.500" /></> },
  { a: 'Safety First', b: 'Designed around safe operation', icon: <path d="M12 3.500l2.600 5.400 5.900.8-4.300 4.100 1 5.800-5.200-2.800-5.200 2.800 1-5.800L3.500 9.700l5.900-.8z" /> },
]

export function TaglineStrip({ compact = false }: { compact?: boolean }) {
  return (
    <section aria-labelledby="promise-title" className="bg-white border-y border-slate-200">
      <div className={`mx-auto max-w-7xl px-4 lg:px-6 ${compact ? 'py-5' : 'py-8 md:py-12'}`}>
        <div className="grid items-center gap-6 lg:gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-slate-200 max-w-xl mx-auto lg:max-w-none w-full">
            <h2 id="promise-title" className="sr-only">Smart Automation for a Safer Tomorrow</h2>
            <img src="/images/tagline-banner.webp" alt="Smart Automation for a Safer Tomorrow: a modern villa with an aluminium and wood-finish automatic gate" width={646} height={352} loading="lazy" decoding="async" className="block w-full h-auto" />
          </div>
          <ul className="grid sm:grid-cols-2 gap-3 md:gap-4">
            {ITEMS.map(t => (
              <li key={t.a} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-blue-50 text-blue-700 ring-1 ring-blue-200">
                  <svg {...ICON_PROPS}>{t.icon}</svg>
                </span>
                <span className="leading-tight">
                  <span className="block font-heading text-base md:text-lg font-bold text-ink">{t.a}</span>
                  <span className="mt-0.5 block text-sm md:text-[15px] text-slate-600">{t.b}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
