'use client'
import { useEffect } from 'react'

// Blueprint 16/18: GA4 events for call_click and whatsapp_click, and a WhatsApp message that names the page
// the visitor was on. Works through one delegated listener so every tel: and wa.me link on the site is covered.
export function Tracking() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null
      const a = el?.closest?.('a') as HTMLAnchorElement | null
      if (!a) return
      const href = a.getAttribute('href') || ''
      const w = window as unknown as { gtag?: (...args: unknown[]) => void }
      if (href.startsWith('tel:')) {
        w.gtag?.('event', 'call_click', { page_path: location.pathname })
      } else if (href.includes('wa.me/')) {
        w.gtag?.('event', 'whatsapp_click', { page_path: location.pathname })
        try {
          const u = new URL(href)
          const text = u.searchParams.get('text') || ''
          if (!text.includes('(Page:')) {
            const page = document.title.split('|')[0].trim() || location.pathname
            u.searchParams.set('text', `${text} (Page: ${page})`.trim())
            a.href = u.toString()
          }
        } catch { /* leave the link unchanged */ }
      }
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [])
  return null
}
