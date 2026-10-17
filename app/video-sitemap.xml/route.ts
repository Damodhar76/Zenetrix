import { videoSitemap } from '@/lib/mediaSitemap'
export const dynamic = 'force-static'
export function GET() { return new Response(videoSitemap(), { headers: { 'Content-Type': 'application/xml; charset=utf-8' } }) }
