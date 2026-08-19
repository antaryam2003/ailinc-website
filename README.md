# AI Linc — Website

Marketing site for **AI Linc**, built on Next.js 16 (App Router), TypeScript,
Tailwind CSS v4 and Motion. Single-page, light theme, brand-matched to the
live product.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm start
npm run lint
```

Node 20.11+ required.

---

## Brand: taken from the product, not invented

The palette and typeface were read directly out of the running platform at
`tour.ailinc.com`, so the site and the app are visually the same product:

| Token             | Value                                | Source                     |
| ----------------- | ------------------------------------ | -------------------------- |
| `--color-violet`  | `#7C3AED`                            | platform `--ai-violet`     |
| `--color-pink`    | `#EC4899`                            | platform `--ai-pink`       |
| `--color-purple`  | `#A855F7`                            | platform `--default-primary` |
| `--grad`          | `linear-gradient(135deg,#7C3AED,#EC4899)` | platform `--gradient-ai` |
| `--color-canvas`  | `#F7F6FB`                            | platform `--canvas`        |
| `--color-surface` | `#FFFFFF`                            | platform `--card-bg`       |
| Typeface          | **Satoshi** (400/500/700/900)        | platform font stack        |

Satoshi is self-hosted from `src/app/fonts/` via `next/font/local`, so there is
no third-party font request at runtime. Everything else lives in the `@theme`
block at the top of `src/app/globals.css` — change it there and the whole site
follows.

---

## Page flow

`src/app/page.tsx` composes the sections in this order. It is a narrative;
reordering breaks it.

| #   | Section       | File                              |
| --- | ------------- | --------------------------------- |
| 1   | Hero + live dashboard | `sections/Hero.tsx`       |
| 2   | Trust — stats + partners | `sections/TrustBar.tsx` |
| 3   | About AI Linc | `sections/About.tsx`              |
| 4   | The Problem (pinned reel) + solution beat | `sections/Problem.tsx` |
| 5   | Why AI Linc   | `sections/Why.tsx`                |
| 6   | Features (horizontal gallery) | `sections/Features.tsx` |
| 7   | Walkthrough video + founder's note | `sections/Walkthrough.tsx` |
| 8   | FAQ           | `sections/FAQ.tsx`                |
| 9   | Final CTA     | `sections/FinalCTA.tsx`           |
| 10  | Footer        | `layout/Footer.tsx`               |

---

## The screenshots are real

Every product image in `public/platform/` is a genuine 2×-retina capture of the
live demo, signed in as a student, optimised to WebP:

```
dashboard.webp        dashboard-full.webp   courses.webp
course-detail.webp    assessments.webp      mock-interview.webp
jobs.webp             resume.webp           live-sessions.webp
community.webp
```

`dashboard-full.webp` is the full-height dashboard — it is what scrolls inside
the hero window. To refresh any of them, recapture at 1440×900 @2× and re-export
to WebP at the same width.

---

## Animation inventory

Everything below respects `prefers-reduced-motion`; the pinned sections fall
back to static grids and a plain swipe carousel.

| Effect                     | Where                | How                                      |
| -------------------------- | -------------------- | ---------------------------------------- |
| Word-mask heading reveal   | every heading        | `WordReveal` — per-word rise + blur       |
| Cursor-tracked light       | hero backdrop        | spring-damped radial gradient             |
| Magnetic buttons           | all primary CTAs     | `Magnetic` — spring translate to cursor   |
| 3D scroll tilt             | hero dashboard       | `rotateX` 26°→0 driven by scroll          |
| Scroll-inside window       | hero                 | real full-height dashboard, `overflow-y`  |
| Drifting mesh blobs        | most sections        | CSS `drift-a/b/c` keyframes               |
| Pinned vertical reel       | The Problem          | 420vh track → continuous index MotionValue |
| Rolling numeral            | The Problem          | translateY on a stacked digit column       |
| Pinned horizontal gallery  | Features             | scroll → `translateX`, distance measured from DOM |
| Cursor spotlight cards     | Why AI Linc          | `SpotlightCard` — radial glow at pointer   |
| Count-up stats             | Trust bar            | `Counter`                                  |
| Gradient hairline on hover | cards                | `.grad-border` mask trick                  |

---

## What still needs your data

Everything editable lives in **`src/content/site.ts`**. Search for `TODO`.
In development those items also render an amber badge on the page; the badge is
hidden automatically in production builds.

1. **Stats** — `trust.stats`: learners, projects, mentors, institutions.
2. **Partners** — `trust.partners`. For real logos, drop files in
   `public/partners/` and swap the string array for `{ name, logo }`.
3. **Founder's note** — `walkthrough.founder`: real name, title, photo, and
   whether that note reflects what they actually want to say.
4. **Walkthrough video** — add `public/tour.mp4`, then set
   `walkthrough.videoSrc`. Until then the block shows the real dashboard behind
   a play button, so it never looks broken.
5. **Legal** — `/privacy` and `/terms` are honest placeholders. They must be
   drafted by counsel, not generated.

---

## Structure

```
src/
├── app/
│   ├── layout.tsx           Satoshi, metadata, nav + footer shell
│   ├── page.tsx             section order
│   ├── globals.css          design tokens + animation utilities
│   ├── fonts/               self-hosted Satoshi woff2
│   ├── (legal)/             privacy + terms placeholders
│   └── opengraph-image.tsx  social card, rendered at build
├── components/
│   ├── layout/              Nav, Footer, SmoothScroll (Lenis)
│   ├── sections/            one file per page section
│   ├── platform/Icons.tsx   line icons
│   └── ui/                  Logo, AppWindow, primitives, Counter, Marquee
├── content/site.ts          ← all copy and data
└── lib/utils.ts
public/platform/             real product screenshots
```

A note on `globals.css`: the typography helpers (`.display`, `.headline`,
`.lede`, `.eyebrow`) are declared inside `@layer components` on purpose, so
Tailwind utilities like `text-white` still override them on the dark bands.

---

## Deploying

Fully static — every route prerenders. Zero-config on Vercel.

Before launch: clear the `TODO`s, publish real legal pages, and update
`metadataBase` in `app/layout.tsx` plus the URLs in `app/sitemap.ts` and
`app/robots.ts` if the domain is not `ailinc.com`.
