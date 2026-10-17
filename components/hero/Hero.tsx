'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { waLink } from '@/lib/site'
import { HeroVideo } from '@/components/media/HeroVideo'

const MODES = [
  { id: 'car', label: 'Car arrives', icon: 'M5 16l1.5-5a2 2 0 011.9-1.4h7.2a2 2 0 011.9 1.4L19 16M4 16h16v3H4zM7 19v1.5M17 19v1.5', title: 'Sensor detected', status: 'Gate opening automatically', caption: 'Sensors detect the car and the gate opens by itself.' },
  { id: 'phone', label: 'Mobile', icon: 'M8 3h8a1 1 0 011 1v16a1 1 0 01-1 1H8a1 1 0 01-1-1V4a1 1 0 011-1zM11 18h2', title: 'Mobile control', status: 'Opened from your mobile', caption: 'Open from anywhere with your mobile.' },
  { id: 'watch', label: 'Smartwatch', icon: 'M9 3h6l1 4H8zM9 21h6l1-4H8zM7 7h10v10H7zM12 10v2.5l1.5 1', title: 'Smartwatch', status: 'Opened from your wrist', caption: 'Open from your wrist.' },
  { id: 'remote', label: 'Remote', icon: 'M9 2h6a1 1 0 011 1v18a1 1 0 01-1 1H9a1 1 0 01-1-1V3a1 1 0 011-1zM12 7.500a1.500 1.500 0 100 .01M10 12h4M10 15h4M10 18h4', title: 'Remote control', status: 'Opened from your car', caption: 'Open remotely from your car or from anywhere inside the property.' },
  { id: 'button', label: 'Push button', icon: 'M5 4h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5a1 1 0 011-1zM12 8a4 4 0 100 8 4 4 0 000-8z', title: 'Push button', status: 'Opened with one press', caption: 'Open with a wall push button at the gate, door or security cabin.' },
] as const

const STATS = [['24/7', 'Breakdown support'], ['Any brand', 'Repair and AMC'], ['Free', 'Site visit and quote']]

export function Hero() {
  const [mode, setMode] = useState(0)
  const [auto, setAuto] = useState(true)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !window.matchMedia('(min-width: 768px)').matches) { setAuto(false); return }
    if (!auto) return
    const t = setInterval(() => setMode(m => (m + 1) % MODES.length), 5000)
    return () => clearInterval(t)
  }, [auto])
  const m = MODES[mode]

  return (
    <section className="on-dark relative overflow-hidden bg-ink text-white">
      <div className="absolute inset-0 grid-bg" aria-hidden />
      <div className="hero-glow absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 lg:px-6 pt-6 pb-7 md:pt-16 md:pb-20 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="lg:col-span-6">
          <p className="eyebrow dark">Engineered Access. Effortless Control.</p>
          <h1 className="h-hero mt-4">Automatic Gates, Doors and Barriers in <span className="text-grad">Hyderabad</span></h1>
          <p className="mt-3 text-sm md:text-lg text-slate-300 max-w-xl leading-relaxed">Supply, installation, repair and AMC for gates, doors, boom barriers, shutters and dock equipment, from our Banjara Hills base. 10+ years of experience across Hyderabad, Telangana and Andhra Pradesh.</p>
          <div className="mt-6 grid grid-cols-2 sm:flex gap-3">
            <Link href="/contact/" className="btn !px-5 !py-3 text-sm md:text-base">Get Free Site Visit</Link>
            <a href={waLink('Hi Zenitrix, I need a quote')} className="btn btn-ghost-dark !px-5 !py-3 text-sm md:text-base">WhatsApp Us</a>
          </div>
          <dl className="mt-5 md:mt-8 grid grid-cols-3 gap-2 sm:gap-3 max-w-lg">
            {STATS.map(([a, b]) => (
              <div key={a} className="glass rounded-2xl px-3 py-3 text-center sm:text-left">
                <dt className="font-heading font-bold text-sm sm:text-lg text-white">{a}</dt>
                <dd className="text-[11px] sm:text-xs text-slate-300 mt-0.5 leading-snug">{b}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-6">
          <div className="relative">
            <div className="absolute -inset-px rounded-[1.75rem] bg-gradient-to-br from-cyan-400/60 via-transparent to-blue-600/60" aria-hidden />
            <div className="relative overflow-hidden rounded-[1.75rem] bg-[#0B1E3A] aspect-[16/9] sm:aspect-[16/11]">
              <HeroVideo name="hero-gate-car" label="Automatic sliding gate opening for a car at a Hyderabad villa" priority button={false} />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/10" aria-hidden />
              <div className="scan-line absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-cyan-400/10 to-transparent" aria-hidden />
              <div className="hero-card glass floaty absolute left-3 bottom-3 sm:left-5 sm:bottom-5 flex items-center gap-3 rounded-2xl px-3 py-2.5 sm:px-4 sm:py-3 max-w-[85%]" aria-live="polite">
                <span className="pulse-ring grid h-9 w-9 sm:h-10 sm:w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-700">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={m.icon} /></svg>
                </span>
                <span className="leading-tight"><span className="block text-sm font-semibold">{m.title}</span><span className="block text-xs text-cyan-300">{m.status}</span></span>
              </div>
              <span className="glass absolute right-3 top-3 sm:right-5 sm:top-5 rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide text-cyan-300">● LIVE</span>
            </div>
          </div>
          <p className="mt-3 text-sm text-slate-300 min-h-[2.5rem]" aria-live="polite">{m.caption}</p>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Control mode">
            {MODES.map((x, i) => (
              <button suppressHydrationWarning key={x.id} type="button" aria-pressed={mode === i} onClick={() => { setAuto(false); setMode(i) }}
                className={`px-3.5 py-2 rounded-full text-sm font-medium transition ${mode === i ? 'bg-gradient-to-r from-cyan-400 to-blue-700 text-white shadow-lg shadow-cyan-500/30' : 'glass hover:bg-white/15'}`}>{x.label}</button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
