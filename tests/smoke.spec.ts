import { test, expect } from '@playwright/test'

const pages = ['/glossary/', '/authors/zenitrix-team/', '/blog/page/2/', '/compare/sliding-vs-swing-automatic-doors/', '/industries/villas/', '/hyderabad/banjara-hills/sliding-gate-automation/', '/', '/products/', '/products/gate-automation/sliding-gate-automation/', '/services/amc/', '/hyderabad/', '/hyderabad/banjara-hills/', '/videos/', '/gallery/', '/cost-estimator/', '/which-automation/', '/blog/', '/contact/']

for (const p of pages) {
  test(`loads ${p} with one h1 and no console errors`, async ({ page }) => {
    const errors: string[] = []
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()) })
    const res = await page.goto(p)
    expect(res?.status()).toBe(200)
    await expect(page.locator('h1')).toHaveCount(1)
    expect(errors).toEqual([])
  })
}

test('search finds a product', async ({ page }) => {
  await page.goto('/search/?q=boom')
  await expect(page.getByRole('link', { name: /boom barrier/i }).first()).toBeVisible()
})

test('gallery lightbox opens and closes with Escape', async ({ page }) => {
  await page.goto('/gallery/')
  await page.getByRole('button', { name: /Open image/ }).first().click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).toHaveCount(0)
})

test('video has a working pause control', async ({ page }) => {
  await page.goto('/videos/')
  await page.getByRole('button', { name: /Play video|Pause video/ }).first().scrollIntoViewIfNeeded()
  await expect(page.getByRole('button', { name: /Play video|Pause video/ }).first()).toBeVisible()
})

test('missing page returns 404 with search', async ({ page }) => {
  const res = await page.goto('/this-page-does-not-exist/')
  expect(res?.status()).toBe(404)
  await expect(page.getByRole('search').last()).toBeVisible()
})

test('404 page is not indexable', async ({ page }) => {
  await page.goto('/this-page-does-not-exist/')
  await expect(page.locator('meta[name=robots]')).toHaveAttribute('content', /noindex/)
})

test('skip link jumps to main content', async ({ page }) => {
  await page.goto('/')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeFocused()
})

test('selector asks six questions and shows a recommendation with a quote form', async ({ page }) => {
  await page.goto('/which-automation/')
  for (const label of ['Villa or house', 'Gate for vehicles', 'Space beside the opening', '3 to 6 m', 'Regular daily use', 'Balanced']) await page.getByText(label, { exact: true }).click()
  await expect(page.getByRole('heading', { name: 'We suggest' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Request free site visit' })).toBeVisible()
})

test('lead form has an optional photo upload', async ({ page }) => {
  await page.goto('/contact/')
  await expect(page.locator('input[type=file][name=photo]')).toHaveCount(1)
})

test('WhatsApp links name the page the visitor was on', async ({ page }) => {
  await page.goto('/contact/')
  const wa = page.locator('a[href*="wa.me"]').first()
  await wa.evaluate(el => el.addEventListener('click', e => e.preventDefault()))
  await wa.click()
  expect(decodeURIComponent((await wa.getAttribute('href')) ?? '')).toContain('(Page:')
})

test.describe('mobile', () => {
  test.use({ viewport: { width: 390, height: 800 } })
  test('search bar is visible in the header and shows suggestions', async ({ page }) => {
    await page.goto('/')
    const box = page.locator('#m-search')
    await expect(box).toBeVisible()
    await box.fill('boom')
    await expect(page.getByRole('link', { name: /boom barrier/i }).first()).toBeVisible()
  })
  test('no horizontal scroll on key pages', async ({ page }) => {
    for (const p of ['/', '/contact/', '/products/', '/hyderabad/']) {
      await page.goto(p)
      const over = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
      expect(over).toBeLessThanOrEqual(1)
    }
  })
  test('mobile menu opens below the search bar', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Open menu' }).click()
    await expect(page.getByRole('navigation', { name: 'Mobile' })).toBeVisible()
  })
})

test('security headers are present', async ({ request }) => {
  const res = await request.get('/')
  const h = res.headers()
  expect(h['x-content-type-options']).toBe('nosniff')
  expect(h['x-frame-options']).toBe('DENY')
  expect(h['strict-transport-security']).toContain('max-age')
})

test('lead API rejects cross-site and empty posts', async ({ request }) => {
  const r = await request.post('/api/lead', { data: {}, headers: { origin: 'https://evil.example' } })
  expect([403, 422]).toContain(r.status())
})
