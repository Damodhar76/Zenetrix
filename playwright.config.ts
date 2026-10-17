import { defineConfig } from '@playwright/test'
// Smoke tests run against a production build: npm run build && npm start (port 3000), then: npx playwright test
export default defineConfig({
  testDir: './tests',
  use: { baseURL: process.env.BASE_URL || 'http://localhost:3000' },
  projects: [{ name: 'desktop', use: { viewport: { width: 1280, height: 800 } } }, { name: 'mobile', use: { viewport: { width: 390, height: 844 } } }],
})
