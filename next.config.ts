import type { NextConfig } from "next";

/**
 * `STATIC_EXPORT=1` switches the build to a fully static bundle in `out/`,
 * which is what the GitHub Pages deploy uses. Left unset (the default) the
 * project builds as a normal Next.js app, so Vercel or any Node host still
 * works without touching this file.
 *
 * `NEXT_PUBLIC_BASE_PATH` is only needed when the site is served from a
 * sub-path, e.g. https://<user>.github.io/<repo>.
 */
const isExport = process.env.STATIC_EXPORT === "1";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  ...(isExport
    ? {
        output: "export",
        // The Next image optimizer needs a server; our screenshots are already
        // compressed to WebP, so serving them as-is costs nothing.
        images: { unoptimized: true },
        trailingSlash: true,
      }
    : {}),
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
};

export default nextConfig;
