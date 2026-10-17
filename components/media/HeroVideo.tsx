'use client'
import { useEffect, useRef, useState } from 'react'

// Hero media: a real <img> poster is the LCP element (fetchPriority high, 640w twin for phones).
// The video is NOT in the initial HTML: it is added after the page has loaded (poster stays as the LCP element), so
// Lighthouse is not affected. It now autoplays on phones too (muted + playsInline, required by iOS/Android autoplay rules).
// If the phone blocks autoplay (e.g. iOS Low Power Mode), the first touch or scroll starts it.
// Save-Data and prefers-reduced-motion users keep the poster only with a play button (Blueprint 5, 6.5, 17).
export function HeroVideo({ name, label, className = '', priority = false, button = true }: { name: string; label: string; className?: string; priority?: boolean; button?: boolean }) {
  const vid = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [show, setShow] = useState(false)
  const [phone, setPhone] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const saver = Boolean((navigator as unknown as { connection?: { saveData?: boolean } }).connection?.saveData)
    const isPhone = window.matchMedia('(max-width: 767px)').matches
    setPhone(isPhone)
    if (reduced || saver) return
    let t: ReturnType<typeof setTimeout> | undefined
    const start = () => { t = setTimeout(() => setShow(true), isPhone ? 600 : 1200) }
    if (document.readyState === 'complete') start(); else window.addEventListener('load', start, { once: true })
    return () => { if (t) clearTimeout(t); window.removeEventListener('load', start) }
  }, [])

  useEffect(() => {
    const v = vid.current
    if (!show || !v) return
    // React does not always set the muted attribute on the DOM node; mobile browsers only autoplay when it is truly muted.
    v.muted = true; v.defaultMuted = true; v.setAttribute('muted', ''); v.setAttribute('playsinline', ''); v.setAttribute('webkit-playsinline', '')
    const tryPlay = () => v.play().catch(() => {})
    tryPlay()
    v.addEventListener('loadeddata', tryPlay); v.addEventListener('canplay', tryPlay)
    // Fallback when the phone blocked autoplay: start on the first touch, scroll or click anywhere.
    const evs = ['touchstart', 'pointerdown', 'scroll', 'click'] as const
    const kick = () => { if (v.paused) tryPlay(); else evs.forEach(e => window.removeEventListener(e, kick)) }
    evs.forEach(e => window.addEventListener(e, kick, { passive: true }))
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) tryPlay(); else v.pause() }, { threshold: 0.2 })
    io.observe(v)
    return () => { io.disconnect(); v.removeEventListener('loadeddata', tryPlay); v.removeEventListener('canplay', tryPlay); evs.forEach(e => window.removeEventListener(e, kick)) }
  }, [show])

  const toggle = () => { const v = vid.current; if (!v) { setShow(true); return } v.paused ? v.play().catch(() => {}) : v.pause() }
  const poster = `/videos/${name}-poster.webp`
  return (
    <>
      <img src={poster} srcSet={`/videos/${name}-poster-640.webp 640w, /videos/${name}-poster-800.webp 800w, ${poster} 1280w`} sizes="(max-width:1024px) 100vw, 50vw" alt="" width={1280} height={720}
        fetchPriority={priority ? 'high' : 'auto'} loading={priority ? 'eager' : 'lazy'} decoding={priority ? "sync" : "async"} className={`absolute inset-0 h-full w-full object-cover ${className}`} />
      {show && (
        <video ref={vid} muted loop playsInline autoPlay preload="auto" disablePictureInPicture aria-label={label} poster={poster}
          onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} className={`absolute inset-0 h-full w-full object-cover ${className}`}>
          <source src={`/videos/${name}.mp4`} type="video/mp4" />
          <source src={`/videos/${name}.webm`} type="video/webm" />
        </video>
      )}
      {(button || phone) && (
        <button suppressHydrationWarning type="button" onClick={toggle} aria-label={playing ? `Pause video: ${label}` : `Play video: ${label}`}
          className={`absolute right-3 ${button ? 'bottom-3' : 'top-12'} z-10 grid h-9 w-9 place-items-center rounded-full bg-slate-900/70 text-white ring-1 ring-white/25 hover:bg-slate-900`}>
          <svg width="12" height="12" viewBox="0 0 14 14" aria-hidden>{playing ? <path d="M3 2h3v10H3zM8 2h3v10H8z" fill="#fff" /> : <path d="M3 2l9 5-9 5z" fill="#fff" />}</svg>
        </button>
      )}
    </>
  )
}
