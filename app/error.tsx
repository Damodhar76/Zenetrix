'use client'
import Link from 'next/link'
import { useEffect } from 'react'

// Shown when something unexpected fails while rendering a page (HTTP 500). Visitors can retry or move on.
export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error) }, [error])
  return (
    <main id="main" className="mx-auto max-w-2xl px-4 py-16 text-center">
      <p className="eyebrow">Something went wrong</p>
      <h1 className="h-page mt-4">This page could not be loaded</h1>
      <p className="mt-3 text-slate-700">Please try again. If it keeps happening, call us on <a className="underline" href="tel:+918500632002">+91 85006 32002</a>.</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button type="button" onClick={reset} className="btn">Try again</button>
        <Link href="/" className="btn btn-ghost">Home page</Link>
      </div>
    </main>
  )
}
