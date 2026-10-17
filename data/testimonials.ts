// Real client reviews only, with written permission (Blueprint 7.3 #11). The home page section appears only when this has entries.
// No Review or AggregateRating schema is generated: self-serving reviews are not eligible for stars (Blueprint 13).
export type Testimonial = { name: string; area?: string; product?: string; text: string }
export const testimonials: Testimonial[] = []
