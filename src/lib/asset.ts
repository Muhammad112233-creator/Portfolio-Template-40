export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** Prefix public/ asset paths so they work under GitHub Pages project base paths. */
export function asset(path: string) {
  return `${basePath}${path.startsWith('/') ? path : `/${path}`}`;
}
