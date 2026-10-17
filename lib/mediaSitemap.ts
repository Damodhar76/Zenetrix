import { SITE } from './site'
import { videos, gallery, productVideo } from '@/data/media'
import { products } from '@/data/catalog'
import { productImage, relatedImages } from './images'

const abs = (p: string) => `${SITE.base}${p}`
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// Video sitemap (Blueprint 14.4): the videos hub lists every clip, product pages list their own clip.
export function videoSitemap() {
  const vtag = (v: (typeof videos)[number]) => `<video:video><video:thumbnail_loc>${abs(`/videos/${v.slug}-poster.webp`)}</video:thumbnail_loc><video:title>${esc(v.title)}</video:title><video:description>${esc(v.description)}</video:description><video:content_loc>${abs(`/videos/${v.slug}.mp4`)}</video:content_loc><video:duration>${v.seconds}</video:duration><video:publication_date>${v.uploaded}</video:publication_date></video:video>`
  const urls = [`<url><loc>${abs('/videos/')}</loc>${videos.map(vtag).join('')}</url>`,
    // Skip products with no matching footage (swing gates etc.): a <url> without <video:video> is invalid in a video sitemap.
    ...products.flatMap(p => {
      const v = productVideo(p.category, p.slug)
      return v ? [`<url><loc>${abs(`/products/${p.category}/${p.slug}/`)}</loc>${vtag(v)}</url>`] : []
    })]
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">${urls.join('')}</urlset>`
}

export function imageSitemap() {
  const img = (src: string, cap: string) => `<image:image><image:loc>${abs(src)}</image:loc><image:caption>${esc(cap)}</image:caption></image:image>`
  const urls = [`<url><loc>${abs('/gallery/')}</loc>${gallery.map(g => img(g.src, g.caption)).join('')}</url>`,
    ...products.map(p => `<url><loc>${abs(`/products/${p.category}/${p.slug}/`)}</loc>${[productImage(p.category, p.slug), ...relatedImages(p.category)].map(s => img(s, p.name)).join('')}</url>`)]
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${urls.join('')}</urlset>`
}
