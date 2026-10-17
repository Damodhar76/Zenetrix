'use client'
import { useEffect, useRef, useState } from 'react'

// Lazy video: sources load only when the player scrolls into view. Never autoplays on Save-Data or
// prefers-reduced-motion (Blueprint 5, 6.5). Always has a visible pause/play control.
export function VideoPlayer({ name, title, caption }: { name: string; title: string; caption?: string }) {
  const box = useRef<HTMLDivElement>(null)
  const vid = useRef<HTMLVideoElement>(null)
  const [load, setLoad] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [calm, setCalm] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const saver = Boolean((navigator as unknown as { connection?: { saveData?: boolean } }).connection?.saveData)
    setCalm(reduced || saver)
    const el = box.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setLoad(true); if (!(reduced || saver)) vid.current?.play().catch(() => {}) }
      else vid.current?.pause()
    }, { threshold: 0.35 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => { if (load && !calm) vid.current?.play().catch(() => {}) }, [load, calm])

  const toggle = () => { const v = vid.current; if (!v) { setLoad(true); return } v.paused ? v.play().catch(() => {}) : v.pause() }

  return (
    <figure className="overflow-hidden rounded-2xl bg-ink ring-1 ring-slate-200">
      <div ref={box} className="relative aspect-video">
        <img src={`/videos/${name}-poster.webp`} alt="" width={1280} height={720} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
        {load && (
          <video ref={vid} muted loop playsInline preload="metadata" aria-label={title} poster={`/videos/${name}-poster.webp`}
            onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} className="absolute inset-0 w-full h-full object-cover">
            <source src={`/videos/${name}.mp4`} type="video/mp4" />
            <source src={`/videos/${name}.webm`} type="video/webm" />
          </video>
        )}
        <button suppressHydrationWarning type="button" onClick={toggle} aria-label={playing ? `Pause video: ${title}` : `Play video: ${title}`}
          className="absolute bottom-3 right-3 flex items-center gap-2 rounded-full bg-slate-900/85 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/20 hover:bg-slate-900">
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>{playing ? <path d="M3 2h3v10H3zM8 2h3v10H8z" fill="#fff" /> : <path d="M3 2l9 5-9 5z" fill="#fff" />}</svg>
          {playing ? 'Pause' : 'Play'}
        </button>
      </div>
      {caption && <figcaption className="bg-white px-4 py-3 text-sm text-slate-600">{caption}</figcaption>}
    </figure>
  )
}
