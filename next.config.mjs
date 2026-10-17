/** @type {import('next').NextConfig} */
import { readFileSync } from 'node:fs'
const prod = process.env.NODE_ENV === 'production'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://zenitrixautomations.com'
if (prod && /example\.com/.test(SITE_URL)) console.warn(`\n[Zenitrix] WARNING: NEXT_PUBLIC_SITE_URL is ${SITE_URL}. Set it to https://zenitrixautomations.com before deploying.\n`)
// Redirect rules: non-preferred host (www) -> preferred host, plus legacy URLs from data/redirects.json (301).
const host = (() => { try { return new URL(SITE_URL).host } catch { return '' } })()
const altHost = host && !/^(localhost|example\.com)/.test(host) ? (host.startsWith('www.') ? host.slice(4) : `www.${host}`) : ''
const legacy = (() => { try { return JSON.parse(readFileSync(new URL('./data/redirects.json', import.meta.url), 'utf8')) } catch { return [] } })()
// CSP allows GA4 and Clarity (loaded only after first interaction) and Cloudflare Turnstile. 'unsafe-inline' is kept for scripts because
// Next.js inlines its bootstrap and the JSON-LD blocks; everything else is locked down.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://challenges.cloudflare.com https://www.clarity.ms https://*.clarity.ms",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://www.google-analytics.com https://www.googletagmanager.com https://*.clarity.ms https://c.bing.com",
  "font-src 'self' data:",
  "connect-src 'self' https://www.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://challenges.cloudflare.com https://*.clarity.ms https://c.bing.com",
  "media-src 'self' data:",
  "frame-src https://challenges.cloudflare.com",
  "object-src 'none'", "worker-src 'self' blob:", "manifest-src 'self'",
  "frame-ancestors 'none'", "base-uri 'self'", "form-action 'self' https://wa.me",
  "upgrade-insecure-requests",
].join('; ')
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups' },
  { key: 'X-Permitted-Cross-Domain-Policies', value: 'none' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  ...(prod ? [{ key: 'Content-Security-Policy', value: csp }] : []),
]
export default {
  trailingSlash: true,
  poweredByHeader: false,
  reactStrictMode: true,
  images: { formats: ['image/avif', 'image/webp'] },
  compress: true,
  experimental: { inlineCss: true },

  async headers() {
    const immutable = [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }]
    return [
      { source: '/(.*)', headers: securityHeaders },
      { source: '/api/(.*)', headers: [{ key: 'Cache-Control', value: 'no-store' }] },
      { source: '/images/:path*', headers: immutable },
      { source: '/videos/:path*', headers: immutable },
      { source: '/fonts/:path*', headers: immutable },
      { source: '/_next/static/:path*', headers: immutable },
    ]
  },
  async redirects() {
    const rules = legacy.map(r => ({ source: r.from, destination: r.to, permanent: true }))
    if (prod && altHost) rules.unshift({ source: '/:path*', has: [{ type: 'host', value: altHost }], destination: `https://${host}/:path*`, permanent: true })
    return rules
  },
}
