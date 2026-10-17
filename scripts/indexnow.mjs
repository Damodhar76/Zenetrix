// Submit all sitemap URLs to IndexNow (Bing, Yandex and partners). Run after deploy:
//   INDEXNOW_KEY=yourkey SITE_URL=https://yourdomain.com node scripts/indexnow.mjs
// First create public/<yourkey>.txt containing exactly the key, so the engines can verify ownership.
const key = process.env.INDEXNOW_KEY, base = (process.env.SITE_URL || 'https://zenitrixautomations.com').replace(/\/$/, '')
if (!key) { console.error('Set INDEXNOW_KEY'); process.exit(1) }
const xml = await (await fetch(`${base}/sitemap.xml`)).text()
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1])
const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: new URL(base).host, key, keyLocation: `${base}/${key}.txt`, urlList }),
})
console.log(`IndexNow: submitted ${urlList.length} URLs, HTTP ${res.status}`)
