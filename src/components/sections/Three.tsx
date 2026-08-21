"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef } from "react";
import { AppWindow } from "@/components/ui/AppWindow";
import { LogoMark } from "@/components/ui/Logo";
import {
  Button,
  Eyebrow,
  Reveal,
  Section,
  SectionHeading,
  WordReveal,
} from "@/components/ui/primitives";
import { reveal, three } from "@/content/site";
import { asset } from "@/lib/site";
import { cn } from "@/lib/utils";

const ITEMS = three.items;

/* ============================================================================
 * "Not a course library. A system that learns you." then "It starts with you."
 *
 * Scroll choreography over one pinned track:
 *   0.06 → 0.48   personalize → AI teacher → create, through a vertical reel
 *   0.48 → 0.58   hold on the last item
 *   0.58 → 0.84   the panel splits down the middle and the halves part,
 *                 revealing the payoff behind them
 *   0.84 → 1.00   dwell, so the CTA is readable and clickable
 *
 * A door is an overflow-hidden half-width window onto a full-width copy of the
 * stage, so the stage renders once per door; both copies read the same
 * MotionValue, which is why the seam is invisible until the halves move. That
 * also means the reel is only ever visible AS the door faces — the doors are
 * shut for the whole reel phase, and item 03 is what tears down the middle.
 * ========================================================================== */

function Panel({
  item,
  index,
  p,
}: {
  item: (typeof ITEMS)[number];
  index: number;
  p: MotionValue<number>;
}) {
  const d = useTransform(p, (v) => index - v);
  const y = useTransform(d, (v) => `${v * 62}%`);
  const opacity = useTransform(d, (v) => Math.max(0, 1 - Math.abs(v) * 1.25));
  const scale = useTransform(d, (v) => 1 - Math.min(Math.abs(v), 1) * 0.12);
  const blur = useTransform(d, (v) => `blur(${Math.min(Math.abs(v), 1) * 8}px)`);

  return (
    <motion.div
      style={{ y, opacity, scale, filter: blur }}
      className="absolute inset-x-0 top-1/2 -translate-y-1/2 will-change-transform"
    >
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        {/* ---- copy ---- */}
        <div>
          <div className="flex items-center gap-3">
            <span
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-[0.8rem] font-black text-white"
              style={{ background: "var(--grad)" }}
            >
              {item.num}
            </span>
            <span className="text-[0.7rem] font-bold tracking-[0.2em] text-violet uppercase">
              {item.kicker}
            </span>
            <span className="h-px flex-1 bg-line" />
          </div>

          <h3 className="headline mt-5 text-[clamp(1.5rem,3vw,2.1rem)]">{item.title}</h3>

          {/* One column, not two: the frame is a viewport, not a page row. */}
          <ul className="mt-6 grid gap-2">
            {item.points.map((pt) => (
              <li
                key={pt}
                className="flex items-start gap-2.5 rounded-lg border border-line bg-surface px-3.5 py-2.5 text-[0.8438rem] text-body"
              >
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: "var(--grad)" }}
                />
                {pt}
              </li>
            ))}
          </ul>
        </div>

        {/* ---- proof ---- */}
        <div className="hidden lg:block">
          <AppWindow compact>
            <Image
              src={asset(item.image)}
              alt={`${item.title} — the AI Linc platform`}
              width={2400}
              height={1500}
              className="w-full"
              sizes="34rem"
            />
          </AppWindow>
        </div>
      </div>
    </motion.div>
  );
}

/** The door face: heading above, the reel below. Rendered once per door. */
function Stage({ p }: { p: MotionValue<number> }) {
  return (
    <div className="absolute inset-0 flex flex-col px-5 pt-24 pb-10 sm:px-8">
      <div className="mx-auto w-full max-w-[78rem] shrink-0">
        <Eyebrow>{three.eyebrow}</Eyebrow>
        <h2 className="headline mt-5 text-[clamp(1.5rem,3.4vw,2.5rem)]">
          {three.headline} <span className="text-grad">{three.headlineAccent}</span>
        </h2>
      </div>

      <div className="relative mx-auto mt-4 w-full max-w-[78rem] flex-1">
        {ITEMS.map((item, i) => (
          <Panel key={item.key} item={item} index={i} p={p} />
        ))}
      </div>
    </div>
  );
}

/** Reduced motion only: the same three items as a flat, readable stack. */
function FlatRow({ item, index }: { item: (typeof ITEMS)[number]; index: number }) {
  return (
    <div
      className={cn(
        "grid items-center gap-8 lg:grid-cols-2 lg:gap-14",
        index % 2 === 1 && "lg:[&>*:first-child]:order-2",
      )}
    >
      <div>
        <div className="flex items-center gap-3">
          <span
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-[0.8rem] font-black text-white"
            style={{ background: "var(--grad)" }}
          >
            {item.num}
          </span>
          <span className="text-[0.7rem] font-bold tracking-[0.2em] text-violet uppercase">
            {item.kicker}
          </span>
          <span className="h-px flex-1 bg-line" />
        </div>
        <h3 className="headline mt-5 text-[clamp(1.6rem,3.4vw,2.4rem)]">{item.title}</h3>
        <ul className="mt-7 grid gap-2 sm:grid-cols-2">
          {item.points.map((pt) => (
            <li
              key={pt}
              className="flex items-start gap-2.5 rounded-lg border border-line bg-surface px-3.5 py-2.5 text-[0.8438rem] text-body"
            >
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: "var(--grad)" }}
              />
              {pt}
            </li>
          ))}
        </ul>
      </div>

      <AppWindow compact>
        <Image
          src={asset(item.image)}
          alt={`${item.title} — the AI Linc platform`}
          width={2400}
          height={1500}
          className="w-full"
          sizes="(max-width: 1024px) 90vw, 34rem"
        />
      </AppWindow>
    </div>
  );
}

export default function Three() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  /* -- phase 1: the reel -------------------------------------------------- */
  const raw = useTransform(scrollYProgress, [0.06, 0.48], [0, ITEMS.length - 1], {
    clamp: true,
  });
  const p = useSpring(raw, { stiffness: 110, damping: 26, restDelta: 0.001 });

  /* -- phase 2: the doors ------------------------------------------------- */
  const doorRaw = useTransform(scrollYProgress, [0.58, 0.84], [0, 1], { clamp: true });
  const door = useSpring(doorRaw, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.0005,
  });

  const leftX = useTransform(door, [0, 1], ["0%", "-102%"]);
  const rightX = useTransform(door, [0, 1], ["0%", "102%"]);
  const seam = useTransform(door, [0, 0.1], [0, 1]);
  const seamGlow = useTransform(door, [0, 0.2, 1], [0, 1, 0.55]);

  /* -- the payoff behind -------------------------------------------------- */
  const burst = useTransform(door, [0, 0.5, 1], [0, 0.85, 0.45]);
  const solScale = useTransform(door, [0, 1], [0.82, 1]);
  // Mark and headline are short and centred, so they survive a narrow gap.
  // Body and CTA are wide — they wait until the doors are most of the way open.
  const markOpacity = useTransform(door, [0.05, 0.3], [0, 1]);
  const kickerOpacity = useTransform(door, [0.14, 0.44], [0, 1]);
  const kickerY = useTransform(door, [0.14, 0.44], [26, 0]);
  const bodyOpacity = useTransform(door, [0.46, 0.74], [0, 1]);
  const bodyY = useTransform(door, [0.46, 0.74], [22, 0]);
  const ctaOpacity = useTransform(door, [0.6, 0.86], [0, 1]);
  const ctaY = useTransform(door, [0.6, 0.86], [20, 0]);
  const solPointer = useTransform(door, (v) => (v > 0.55 ? "auto" : "none"));

  /* -- reduced motion: no pinning, no doors ------------------------------- */
  if (reduced) {
    return (
      <>
        <Section id="three" className="overflow-hidden">
          <SectionHeading
            eyebrow={three.eyebrow}
            title={three.headline}
            accent={three.headlineAccent}
            align="center"
          />
          <div className="mt-16 flex flex-col gap-20 md:gap-28">
            {ITEMS.map((item, i) => (
              <FlatRow key={item.key} item={item} index={i} />
            ))}
          </div>
        </Section>

        <section
          id="reveal"
          className="relative scroll-mt-24 overflow-hidden px-5 py-24 sm:px-8 md:py-32"
        >
          <div
            className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07]"
            style={{ background: "var(--grad)" }}
            aria-hidden
          />
          <div className="mx-auto flex w-full max-w-[78rem] flex-col items-center text-center">
            <h2 className="headline text-[clamp(2.25rem,6vw,4.5rem)]">
              <WordReveal text={reveal.kicker} />{" "}
              <WordReveal text={reveal.accent} gradient delay={0.12} />
            </h2>
            <Reveal delay={0.2}>
              <p className="lede mt-7 max-w-2xl text-[1.0625rem] sm:text-[1.15rem]">
                {reveal.body}
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-10">
                <Button href={reveal.cta.href} size="lg" magnetic>
                  {reveal.cta.label}
                </Button>
              </div>
            </Reveal>
          </div>
        </section>
      </>
    );
  }

  return (
    <section id="three" ref={ref} className="relative h-[480vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* ============ behind the doors ============ */}
        <motion.div
          id="reveal"
          style={{ scale: solScale, pointerEvents: solPointer }}
          className="absolute inset-0 flex items-center justify-center px-5 sm:px-8"
        >
          <motion.div
            aria-hidden
            style={{ opacity: burst }}
            className="pointer-events-none absolute inset-0"
          >
            <div
              className="absolute top-1/2 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(168,85,247,0.42), rgba(236,72,153,0.18) 45%, rgba(247,246,251,0) 72%)",
              }}
            />
          </motion.div>

          <div className="relative flex w-full max-w-3xl flex-col items-center text-center">
            <motion.div style={{ opacity: markOpacity }}>
              <LogoMark className="h-11 w-auto" id="reveal-mark" />
            </motion.div>

            <motion.h2
              style={{ opacity: kickerOpacity, y: kickerY }}
              className="headline mt-8 text-[clamp(2.25rem,6vw,4.5rem)]"
            >
              {reveal.kicker} <span className="text-grad">{reveal.accent}</span>
            </motion.h2>

            <motion.p
              style={{ opacity: bodyOpacity, y: bodyY }}
              className="lede mt-7 max-w-2xl text-[1.0625rem] sm:text-[1.15rem]"
            >
              {reveal.body}
            </motion.p>

            <motion.div style={{ opacity: ctaOpacity, y: ctaY }} className="mt-10">
              <Button href={reveal.cta.href} size="lg" magnetic>
                {reveal.cta.label}
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* ============ left door ============ */}
        <motion.div
          style={{ x: leftX }}
          className="absolute inset-y-0 left-0 z-20 w-1/2 overflow-hidden bg-canvas will-change-transform"
        >
          {/* 200% of a half-width door === full container width */}
          <div className="absolute inset-y-0 left-0 w-[200%]">
            <div className="dots absolute inset-0 opacity-40" aria-hidden />
            <Stage p={p} />
          </div>
          <motion.span
            aria-hidden
            style={{ opacity: seam }}
            className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-violet/50 to-transparent"
          />
          <motion.span
            aria-hidden
            style={{ opacity: seamGlow }}
            className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-violet/12 to-transparent"
          />
        </motion.div>

        {/* ============ right door ============ */}
        <motion.div
          style={{ x: rightX }}
          className="absolute inset-y-0 right-0 z-20 w-1/2 overflow-hidden bg-canvas will-change-transform"
        >
          <div className="absolute inset-y-0 right-0 w-[200%]">
            <div className="dots absolute inset-0 opacity-40" aria-hidden />
            <Stage p={p} />
          </div>
          <motion.span
            aria-hidden
            style={{ opacity: seam }}
            className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-violet/50 to-transparent"
          />
          <motion.span
            aria-hidden
            style={{ opacity: seamGlow }}
            className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-violet/12 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
