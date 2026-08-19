import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import { brand } from "@/content/site";
import { SITE_URL } from "@/lib/site";

/**
 * Satoshi is the typeface the AI Linc platform itself uses. Self-hosted from
 * Fontshare so the site and the product are typographically identical and the
 * page never waits on a third-party font host.
 */
const satoshi = localFont({
  src: [
    { path: "./fonts/Satoshi-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Satoshi-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Satoshi-700.woff2", weight: "700", style: "normal" },
    { path: "./fonts/Satoshi-900.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-satoshi",
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${brand.name} — Don't just learn AI. Build with it.`,
    template: `%s · ${brand.name}`,
  },
  description:
    "Learn, build and master real-world AI through hands-on projects, expert guidance and an AI-powered learning platform. Adaptive courses, AI mock interviews, live mentorship and a matched job board.",
  keywords: [
    "AI learning platform",
    "learn AI",
    "AI courses India",
    "AI mock interview",
    "adaptive learning",
    "AI bootcamp",
  ],
  openGraph: {
    title: `${brand.name} — Don't just learn AI. Build with it.`,
    description:
      "An AI-native learning platform: adaptive courses, real projects, AI mock interviews and the jobs that follow.",
    type: "website",
    locale: "en_IN",
    siteName: brand.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.name} — Don't just learn AI. Build with it.`,
    description:
      "Adaptive courses, real projects, AI mock interviews and a matched job board — in one platform.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f7f6fb",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={satoshi.variable}>
      <body className="antialiased">
        <SmoothScroll />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-full focus:bg-violet focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
