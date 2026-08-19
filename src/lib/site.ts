/**
 * Canonical URLs for metadata. Overridden at build time so the same source
 * can ship to a custom domain, Vercel, or a GitHub Pages sub-path.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const ORIGIN = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ailinc.com";
export const SITE_URL = `${ORIGIN}${BASE_PATH}`;

/**
 * Prefixes a public asset path with the deploy base path.
 *
 * `next/image` prepends basePath itself only when the image optimizer is on.
 * Static exports run with `unoptimized: true`, where the src is emitted
 * verbatim — so without this every screenshot 404s on a sub-path deploy.
 */
export function asset(path: string | null | undefined) {
  if (!path) return path as never;
  if (/^(https?:)?\/\//.test(path)) return path;
  return `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;
}
