'use client'
// Last-resort error screen when even the root layout fails. Must render its own <html> and <body>; inline styles only.
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en-IN">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif', background: '#0B1220', color: '#fff', display: 'grid', placeItems: 'center', minHeight: '100vh', textAlign: 'center', padding: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem' }}>Zenitrix Technologies</h1>
          <p>Something went wrong. Please try again, or call +91 85006 32002.</p>
          <button type="button" onClick={reset} style={{ marginTop: '1rem', padding: '.8rem 1.4rem', borderRadius: '.75rem', border: 0, background: '#0A84FF', color: '#fff', fontWeight: 600, fontSize: '1rem' }}>Try again</button>
        </div>
      </body>
    </html>
  )
}
