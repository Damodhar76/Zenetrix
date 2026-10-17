// Two-tone line icons for each service. `main` = white strokes, `acc` = cyan accent strokes with a soft cyan fill.
// Styling lives in globals.css (.svc-ic). Add a new slug here to give a new service its own icon.
const ICONS: Record<string, { main: string[]; acc: string[] }> = {
  'automatic-gate-installation': {
    main: ['M3 20V6M21 20V6', 'M6 20h12', 'M7 9v7M10 9v7M13 9v7M16 9v7'],
    acc: ['M5 8.5h12v8H5z', 'M17.500 12.500h3m-1.500-1.500l1.500 1.500-1.500 1.500'],
  },
  'automatic-gate-repair': {
    main: ['M14.500 6.500a4 4 0 005 5L10 21a2.100 2.100 0 01-3-3z'],
    acc: ['M13 3.500a4.500 4.500 0 00-1.500 5.700L4.500 16', 'M7 17.500h.01'],
  },
  amc: {
    main: ['M4 6h16v14H4z', 'M8 3v4M16 3v4M4 10h16'],
    acc: ['M8.500 15l2.500 2.500 4.500-4.500'],
  },
  'convert-manual-gate-to-automatic': {
    main: ['M4 12a8 8 0 0113.700-5.600L20 8.500', 'M20 12a8 8 0 01-13.700 5.600L4 15.500', 'M20 4v4.500h-4.500M4 20v-4.500h4.500'],
    acc: ['M12.500 8.500l-2.500 4h4l-2.500 4'],
  },
  'smart-control': {
    main: ['M8 3h8a1 1 0 011 1v16a1 1 0 01-1 1H8a1 1 0 01-1-1V4a1 1 0 011-1z', 'M11 18h2'],
    acc: ['M10 9.500a3 3 0 014 0', 'M8.500 7.500a5.500 5.500 0 017 0', 'M12 12.500h.01'],
  },
  'access-control': {
    main: ['M3 7h18v12H3z', 'M3 11h18'],
    acc: ['M7 15.500h4', 'M15.500 14a2 2 0 010 3', 'M17.500 12.500a4.500 4.500 0 010 6'],
  },
  'safety-devices': {
    main: ['M12 3l8 3v5.500c0 4.500-3.200 7.800-8 9.500-4.800-1.700-8-5-8-9.500V6z'],
    acc: ['M7.500 12h9', 'M7.500 12h.01M16.500 12h.01', 'M9.500 15.500h5'],
  },
  'spare-parts': {
    main: ['M12 8.500a3.500 3.500 0 100 7 3.500 3.500 0 000-7z', 'M12 2.500v3M12 18.500v3M2.500 12h3M18.500 12h3'],
    acc: ['M5.300 5.300l2.100 2.100M16.600 16.600l2.100 2.100M18.700 5.300l-2.100 2.100M7.400 16.600l-2.100 2.100'],
  },
}

export function ServiceIcon({ slug, size = 56, className = '' }: { slug: string; size?: number; className?: string }) {
  const ic = ICONS[slug] || ICONS['automatic-gate-installation']
  return (
    <span className={`svc-ic ${className}`} style={{ width: size, height: size }} aria-hidden>
      <svg width={size * 0.58} height={size * 0.58} viewBox="0 0 24 24" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {ic.main.map(d => <path key={d} d={d} className="m" />)}
        {ic.acc.map(d => <path key={d} d={d} className="a" />)}
      </svg>
    </span>
  )
}

// Icons for the "How it works" steps.
const STEP: Record<string, string[]> = {
  visit: ['M12 21s6.500-5.700 6.500-10.500a6.500 6.500 0 10-13 0C5.500 15.300 12 21 12 21z', 'M12 12.500a2.200 2.200 0 100-4.400 2.200 2.200 0 000 4.400z'],
  quote: ['M6 3h9l4 4v14H6z', 'M14 3v5h5', 'M9 12h7M9 15.500h7M9 19h4'],
  install: ['M14.500 6.500a4 4 0 005 5L10 21a2.100 2.100 0 01-3-3z', 'M13 3.500a4.500 4.500 0 00-1.500 5.700'],
  handover: ['M12 3l8 3v5.500c0 4.500-3.200 7.800-8 9.500-4.800-1.700-8-5-8-9.500V6z', 'M8.500 12l2.500 2.500 4.500-5'],
  amc: ['M4 6h16v14H4z', 'M8 3v4M16 3v4M4 10h16', 'M8.500 15l2.500 2.500 4.500-4.500'],
}
export function StepIcon({ name, size = 28 }: { name: keyof typeof STEP; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {STEP[name].map(d => <path key={d} d={d} />)}
    </svg>
  )
}
