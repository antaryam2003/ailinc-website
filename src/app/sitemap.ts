import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Required so these routes prerender under `output: "export"`.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
  ];
}
