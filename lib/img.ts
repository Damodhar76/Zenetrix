// Responsive helper: every /images/*.webp has a 640px twin (name-640.webp) for phones.
// (The old 400px candidate was dropped: nothing generates name-400.webp, so it would 404 on small screens.)
export const srcSet = (src?: string) =>
  src && src.startsWith('/images/') && src.endsWith('.webp') && !/-(640|400)\.webp$/.test(src)
    ? `${src.replace('.webp', '-640.webp')} 640w, ${src} 1280w`
    : undefined
