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

`src/app/page.tsx`. The spine of the whole site is one sentence:
**AI learns you → adapts to you → teaches you → lets you create.**
Copy that drifts back to "we offer AI courses" is off-positioning.

| #   | Section                          | File                        |
| --- | -------------------------------- | --------------------------- |
| 1   | Hero + interactive level demo    | `sections/Hero.tsx` + `LevelDemo.tsx` |
| 2   | Trust — brochure figures         | `sections/TrustBar.tsx`     |
| 3   | The idea (pinned reel + doors)   | `sections/Idea.tsx`         |
| 4   | Three differentiators            | `sections/Three.tsx`        |
| 5   | Course builder (interactive)     | `sections/Builder.tsx`      |
| 6   | The real platform (gallery)      | `sections/Features.tsx`     |
| 7   | Learners / institutions          | `sections/Audiences.tsx`    |
| 8   | FAQ                              | `sections/FAQ.tsx`          |
| 9   | Final CTA                        | `sections/FinalCTA.tsx`     |

Positioning and figures come from `AI_LINC_Carousel_Final.pdf` (the brochure) —
50,000+ learners, 1,000+ courses, 50+ universities, white-label ready, and the
six named capabilities. Entries in `site.ts` are tagged `[BROCHURE]`,
`[PLATFORM]` or `[TODO]` so the source of every claim is traceable.

Two demos on the page are **previews, not live product calls**: the hero level
picker and the course builder. Both say so in the UI. Do not remove that
wording — implying they hit the real engine would misrepresent the product.

--- | ------------- | --------------------------------- |
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

## The hero animation

`public/platform/hero/f001..f040.webp` is a recording of the real dashboard,
split into 40 frames and drawn to a canvas by `ui/ScrollSequence.tsx`. Scroll
position selects the frame, so the clip advances as the visitor scrolls.

It is deliberately **not** a GIF and **not** a `<video>`:
- a GIF runs on its own timeline and cannot be seeked, so scroll could not
  drive it at all;
- seeking a video on every scroll frame stutters badly on iOS Safari.

To replace it, re-encode a new recording with
`ffmpeg -i clip.mp4 -vf "fps=5,scale=1000:-2" -c:v libwebp -q:v 62 f%03d.webp`
and keep the frame count in sync with the `count` prop in `Hero.tsx`.
Frame 1 loads first and alone so the hero paints immediately; the remaining 39
stream in four at a time behind it.

---

## The feature gallery clips

`public/platform/gif/NN.webp` are **animated WebP** — an `<img>` that loops on
its own, exactly like a GIF, with `NN-poster.webp` as the static first frame.

Not a real `.gif`: measured on the same clip, GIF was **7.8 MB vs 0.85 MB**
animated WebP, at 256 colours and lower framerate. Ten real GIFs would have put
roughly 60 MB on the page.

Not a `<video>` either — there are now zero video elements on the site.

An animated image cannot be paused, so `Features.tsx` only mounts the animated
file while its slide is the active one; every other slide shows its poster.
One animation runs instead of ten, and nothing is fetched until the visitor
reaches the gallery.

To re-encode from new recordings:

```bash
ffmpeg -i number-NN.mp4 -vf "fps=10,scale=860:-2"   -c:v libwebp_anim -q:v 50 -loop 0 -an NN.webp
ffmpeg -i number-NN.mp4 -vframes 1 -vf "scale=860:-2"   -c:v libwebp -q:v 72 NN-poster.webp
```

**Clip 04 is redacted.** The source recording shows an "Unlimited minutes —
Staff account, not metered" card for its first ~5 seconds; that is internal
state and should not appear publicly, so a boxblur is composited over that
region while it is on screen. If you re-record slide 04 from a normal student
account, drop the blur step.

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

`dashboard-full.webp` is the full-height dashboard — it is what pans inside the
hero window as the page scrolls. Note that the app sidebar is `position: fixed`,
so a full-page capture paints it only once and leaves white below; the shipped
file has that column filled back in (see `scratchpad` fix-sidebar step). If you
recapture it, repeat that repair or the left column will go blank on scroll.

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
| Scroll-scrubbed dashboard  | hero                 | 40-frame WebP sequence drawn to canvas; scroll position selects the frame |
| Drifting mesh blobs        | most sections        | CSS `drift-a/b/c` keyframes               |
| Pinned vertical reel       | The Problem          | 560vh track → continuous index MotionValue |
| Split-door reveal          | Problem → Solution   | panel halves part from the centre, solution emerges behind |
| Rolling numeral            | The Problem          | translateY on a stacked digit column       |
| Pinned horizontal gallery  | Features             | scroll → `translateX`, distance measured from DOM |
| Looping product clips      | Features             | silent MP4 over its own still; only the active slide loads and plays |
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
