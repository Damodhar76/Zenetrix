// Add REAL projects here (client photos, locality, permission). Pages, sitemap and area links update automatically.
// Nothing is invented. Leave the array empty until the client supplies proof (Blueprint 6.4, 11.2).
export type Project = {
  slug: string; title: string; area: string /* area slug from data/areas.ts */; product: string
  summary: string; image?: string; date?: string
}
export const projects: Project[] = []
export const getProject = (slug: string) => projects.find(p => p.slug === slug)
