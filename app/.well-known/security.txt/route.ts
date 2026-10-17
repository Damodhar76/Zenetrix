import { SITE } from '@/lib/site'
export const dynamic = 'force-static'
// RFC 9116 security contact file, served at /.well-known/security.txt
export function GET() {
  const body = [
    `Contact: mailto:${SITE.email}`,
    'Expires: 2027-10-14T00:00:00.000Z',
    'Preferred-Languages: en, te, hi',
    `Canonical: ${SITE.base}/.well-known/security.txt`,
    '',
  ].join('\n')
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=86400' } })
}
