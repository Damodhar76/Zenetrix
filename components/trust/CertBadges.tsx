// The three certifications shown on the site. Edit names here (one place). Shown on the About page only. Add certificate numbers/PDFs in data/certificates.ts.
export const CERT_BADGES = [
  { code: 'GeM', name: 'GeM Registered', note: 'Government e-Marketplace listed products', full: 'Government e-Marketplace',
    points: ['Listed for government and PSU purchase', 'Transparent, traceable supply'] },
  { code: 'CE', name: 'CE Certified', note: 'Meets European safety and quality standards', full: 'European conformity',
    points: ['Built to European safety rules', 'Tested safety and electrical design'] },
  { code: 'TUV', name: 'TUV Certified', note: 'Independent testing and certification', full: 'Independent testing',
    points: ['Third-party tested, not self-declared', 'Checked for safe, repeatable operation'] },
] as const

function Seal({ code }: { code: string }) {
  return (
    <span className="relative grid h-[84px] w-[84px] shrink-0 place-items-center md:h-24 md:w-24" aria-hidden>
      <svg className="seal-spin absolute inset-0" viewBox="0 0 96 96" fill="none">
        <circle cx="48" cy="48" r="45" stroke="#5ee1ff" strokeOpacity=".55" strokeWidth="1.4" strokeDasharray="2 5.2" strokeLinecap="round" />
        <circle cx="48" cy="48" r="39" stroke="#5ee1ff" strokeOpacity=".22" strokeWidth="1" />
      </svg>
      <span className="grid h-[58px] w-[58px] place-items-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-700 font-heading text-base font-bold text-white shadow-lg shadow-cyan-500/40 md:h-16 md:w-16 md:text-lg">{code}</span>
    </span>
  )
}

export function CertBadges({ dark = false, detailed = false }: { dark?: boolean; detailed?: boolean }) {
  return (
    <ul className={`grid gap-3 md:gap-5 ${detailed ? 'md:grid-cols-3' : 'grid-cols-1 md:grid-cols-3'}`}>
      {CERT_BADGES.map(c => (
        <li key={c.code} className="plaque p-4 md:p-6">
          <div className="relative flex items-center gap-4 md:flex-col md:items-start md:gap-5">
            <Seal code={c.code} />
            <div>
              <p className="font-heading text-lg font-bold md:text-xl">{c.name}</p>
              <p className="mt-0.5 text-sm text-slate-300">{c.note}</p>
            </div>
          </div>
          {detailed && (
            <ul className="relative mt-4 space-y-2 border-t border-white/10 pt-4 text-sm text-slate-200">
              {c.points.map(t => (
                <li key={t} className="flex gap-2.5"><svg width="16" height="16" viewBox="0 0 24 24" className="mt-0.5 shrink-0 text-cyan-300" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12.500l4.500 4.500L19 7.500" /></svg>{t}</li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  )
}
