// Verified certificates only (Blueprint 1, 17). Leave EMPTY until the client supplies real certificate numbers and PDFs.
// When an entry is added, /certifications/ lists it, ItemList schema is generated and a trust badge appears on the home page.
export type Certificate = { body: string /* CE, GeM, TUV... */; number: string; products: string; pdf?: string /* /downloads/xyz.pdf */; validTill?: string }
export const certificates: Certificate[] = []

// Publishable company facts (Blueprint 7.3 trust bar). Leave undefined until confirmed. Never estimate.
export const trustFacts: { yearsInBusiness?: number; installations?: number } = { yearsInBusiness: 10 }
