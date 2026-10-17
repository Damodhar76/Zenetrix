import { NextResponse } from 'next/server'

// Lead routing (Blueprint 16). Configure any of: Resend email, Google Sheet/CRM webhook, Cloudflare Turnstile.
// If nothing is configured, returns delivered:false and the form falls back to WhatsApp.
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const MAX_BODY = 2_000_000 // bytes: a 1 MB site photo as base64 plus the form fields
const hits = new Map<string, number[]>()
const clean = (v: unknown, n = 200) => String(v ?? '').replace(/[\u0000-\u001f\u007f]+/g, ' ').trim().slice(0, n)
const json = (body: Record<string, unknown>, status = 200) => NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } })
const withTimeout = (ms = 8000) => AbortSignal.timeout(ms)

// Only accept posts that come from our own pages (blocks cross-site form posts and simple scripted abuse).
function sameOrigin(req: Request): boolean {
  const origin = req.headers.get('origin')
  if (!origin) return process.env.NODE_ENV !== 'production' // browsers always send Origin on fetch POST
  try {
    const o = new URL(origin).host.replace(/^www\./, '')
    const mine = [req.headers.get('x-forwarded-host'), req.headers.get('host'), new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://zenitrixautomations.com').host]
    return mine.some(h => h && h.split(',')[0].trim().replace(/^www\./, '') === o)
  } catch { return false }
}

export async function POST(req: Request) {
  if (!sameOrigin(req)) return json({ ok: false, error: 'origin' }, 403)
  if (!(req.headers.get('content-type') || '').includes('application/json')) return json({ ok: false, error: 'type' }, 415)
  const declared = Number(req.headers.get('content-length') || 0)
  if (declared > MAX_BODY) return json({ ok: false, error: 'too_large' }, 413)

  const ip = req.headers.get('x-real-ip') || req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  const now = Date.now(); const recent = (hits.get(ip) ?? []).filter(t => now - t < 60_000)
  if (recent.length >= 5) return json({ ok: false, error: 'rate' }, 429)
  hits.set(ip, [...recent, now])
  if (hits.size > 5000) for (const [k, v] of hits) if (!v.some(t => now - t < 60_000)) hits.delete(k) // keep memory bounded

  let b: Record<string, unknown>
  try {
    const raw = await req.text()
    if (raw.length > MAX_BODY) return json({ ok: false, error: 'too_large' }, 413)
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('shape')
    b = parsed
  } catch { return json({ ok: false, error: 'bad_json' }, 400) }
  if (b.website) return json({ ok: true, delivered: true }) // honeypot: pretend success

  const lead = { name: clean(b.name, 80), phone: clean(b.phone, 20), email: clean(b.email, 120), area: clean(b.area, 80), product: clean(b.product, 120),
    site: clean(b.site, 60), width: clean(b.width, 40), height: clean(b.height, 40), weight: clean(b.weight, 40), time: clean(b.time, 40), note: clean(b.note, 300), page: clean(b.page, 200).replace(/^(?!\/)/, '/'), at: new Date().toISOString() }
  // Optional site photo: a small JPEG data URL produced by the browser (see LeadForm). Anything else is dropped.
  const photoRaw = typeof b.photo === 'string' ? b.photo : ''
  const photo = /^data:image\/jpeg;base64,[A-Za-z0-9+/=]+$/.test(photoRaw) && photoRaw.length <= 1_500_000 ? photoRaw : ''
  if (lead.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) lead.email = ''
  if (!lead.name || !/^[+\d][\d\s-]{7,17}$/.test(lead.phone) || !lead.area || !lead.product || !lead.width || !lead.height)
    return json({ ok: false, error: 'invalid' }, 422)

  const secret = process.env.TURNSTILE_SECRET_KEY
  if (secret) {
    const token = clean(b.token, 2048)
    const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: new URLSearchParams({ secret, response: token, remoteip: ip }), signal: withTimeout() }).catch(() => null)
    if (!r) return json({ ok: false, error: 'captcha' }, 403)
    const j = await r.json().catch(() => ({ success: false }))
    if (!j.success) return json({ ok: false, error: 'captcha' }, 403)
  }

  let delivered = false
  const tasks: Promise<unknown>[] = []
  const hook = process.env.LEAD_WEBHOOK_URL
  if (hook) tasks.push(fetch(hook, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...lead, hasPhoto: Boolean(photo), photoDataUrl: photo }), signal: withTimeout() }).then(r => { if (r.ok) delivered = true }))
  const key = process.env.RESEND_API_KEY, to = process.env.LEAD_TO_EMAIL
  if (key && to) {
    const text = Object.entries(lead).map(([k, v]) => `${k}: ${v}`).join('\n')
    const from = process.env.LEAD_FROM_EMAIL || 'Zenitrix Website <onboarding@resend.dev>'
    const send = (payload: Record<string, unknown>) => fetch('https://api.resend.com/emails', { method: 'POST', headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ from, ...payload }), signal: withTimeout() })
    tasks.push(send({ to: [to], subject: `New lead: ${lead.product} (${lead.area})`, text, ...(photo ? { attachments: [{ filename: 'site-photo.jpg', content: photo.split(',')[1] }] } : {}) }).then(r => { if (r.ok) delivered = true }))
    // Optional automatic confirmation to the customer (Blueprint 16), only when they gave an email and LEAD_CONFIRM_CUSTOMER=1.
    if (lead.email && process.env.LEAD_CONFIRM_CUSTOMER === '1')
      tasks.push(send({ to: [lead.email], subject: 'We received your request | Zenitrix Technologies', text: `Hi ${lead.name},\n\nThank you for contacting Zenitrix Technologies about ${lead.product}. Our team will contact you on ${lead.phone} to arrange a free site visit.\n\nYou can also WhatsApp us on +91 85006 32002.\n\nZenitrix Technologies, Banjara Hills, Hyderabad` }).catch(() => undefined))
  }
  await Promise.allSettled(tasks)
  return json({ ok: true, delivered })
}
