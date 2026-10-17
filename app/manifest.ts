import type { MetadataRoute } from 'next'
export default function manifest(): MetadataRoute.Manifest {
  return {
    id: '/', name: 'Zenitrix Technologies', short_name: 'Zenitrix', description: 'Automatic gates, doors, boom barriers and shutters in Hyderabad.',
    lang: 'en-IN', start_url: '/', scope: '/', display: 'standalone', orientation: 'portrait', categories: ['business', 'shopping'],
    background_color: '#0B1220', theme_color: '#0B1220',
    icons: [{ src: '/icon.png', sizes: '512x512', type: 'image/png', purpose: 'any' }, { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  }
}
