"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef, useState } from "react";
import { Button, Eyebrow, Reveal, WordReveal } from "@/components/ui/primitives";
import { LogoMark } from "@/components/ui/Logo";
import { problem } from "@/content/site";
import { cn } from "@/lib/utils";

const ITEMS = problem.items;

/* ============================================================================
 * Scroll choreography over one long pinned track:
 *
 *   0.04 → 0.52   the four problems slide through a vertical reel
 *   0.52 → 0.60   hold on the last one
 *   0.60 → 0.84   the panel splits down the middle and the two halves part,
 *                 revealing the solution behind them
 *   0.84 → 1.00   dwell on the solution so the CTA is readable and clickable
 *
 * The problem stage is rendered twice — once inside each door — because a door
 * is an overflow-hidden half-width window onto a full-width copy of the same
 * content. Both copies are driven by the same MotionValue, so they stay in
 * lockstep and the seam is invisible until the doors move.
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
      <div className="card p-7 sm:p-9">
        <span
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-[0.9rem] font-black text-white"
          style={{ background: "var(--grad)" }}
        >
          {item.num}
        </span>
        <h3 className="headline mt-5 text-[clamp(1.5rem,3.4vw,2.25rem)]">
          {item.title}
        </h3>
        <p className="mt-3 text-[1.0625rem] font-medium text-ink/80">{item.body}</p>
        <p className="lede mt-3 text-[0.9375rem]">{item.detail}</p>
      </div>
    </motion.div>
  );
}

/** The full-width problem view. Rendered once per door. */
function ProblemStage({
  p,
  active,
  numeralY,
}: {
  p: MotionValue<number>;
  active: number;
  numeralY: MotionValue<string>;
}) {
  return (
    <div className="flex h-full items-center px-5 sm:px-8">
      <div className="mx-auto grid w-full max-w-[78rem] items-center gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <div>
          <Eyebrow>{problem.eyebrow}</Eyebrow>
          <h2 className="headline mt-6 text-[clamp(1.9rem,4.4vw,3.25rem)]">
            {problem.headline}{" "}
            <span className="text-grad">{problem.headlineAccent}</span>
          </h2>

          <div className="mt-10 hidden items-end gap-5 lg:flex">
            <div className="relative h-[5.5rem] w-[7rem] overflow-hidden">
              <motion.div className="absolute inset-x-0 top-0" style={{ y: numeralY }}>
                {ITEMS.map((it) => (
                  <div
                    key={it.num}
                    className="flex h-[5.5rem] items-center text-[5rem] leading-none font-black tracking-[-0.06em] text-transparent"
                    style={{
                      background: "var(--grad)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                    }}
                  >
                    {it.num}
                  </div>
                ))}
              </motion.div>
            </div>

            <div className="mb-4 flex flex-col gap-2">
              {ITEMS.map((it, i) => (
                <div key={it.num} className="flex items-center gap-3">
                  <span
                    className={cn(
                      "h-[3px] rounded-full transition-all duration-500",
                      i === active ? "w-10 bg-violet" : "w-5 bg-line",
                    )}
                  />
                  <span
                    className={cn(
                      "text-[0.8125rem] whitespace-nowrap transition-colors duration-500",
                      i === active ? "font-bold text-ink" : "text-faint",
                    )}
                  >
                    {it.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative h-[24rem] sm:h-[26rem]">
          {ITEMS.map((it, i) => (
            <Panel key={it.num} item={it} index={i} p={p} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Problem() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  /* -- phase 1: the reel -------------------------------------------------- */
  const raw = useTransform(scrollYProgress, [0.04, 0.52], [0, ITEMS.length - 1], {
    clamp: true,
  });
  const p = useSpring(raw, { stiffness: 110, damping: 26, restDelta: 0.001 });
  const numeralY = useTransform(p, (v) => `${-v * 5.5}rem`);

  useMotionValueEvent(p, "change", (v) => {
    const i = Math.round(v);
    if (i !== active) setActive(i);
  });

  /* -- phase 2: the doors ------------------------------------------------- */
  const doorRaw = useTransform(scrollYProgress, [0.6, 0.84], [0, 1], {
    clamp: true,
  });
  const door = useSpring(doorRaw, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.0005,
  });

  const leftX = useTransform(door, [0, 1], ["0%", "-102%"]);
  const rightX = useTransform(door, [0, 1], ["0%", "102%"]);
  // Inner-edge highlight only appears once the halves actually part.
  const seam = useTransform(door, [0, 0.1], [0, 1]);
  const seamGlow = useTransform(door, [0, 0.2, 1], [0, 1, 0.55]);

  /* -- the solution behind ------------------------------------------------ */
  const burst = useTransform(door, [0, 0.5, 1], [0, 0.85, 0.45]);
  const solScale = useTransform(door, [0, 1], [0.82, 1]);
  // The mark and headline can appear while the gap is still narrow — they are
  // short and centred. The body and CTA are wide, so they wait until the doors
  // are most of the way open, otherwise on a phone they read as a jumble
  // squeezed between two walls of problem text.
  const markOpacity = useTransform(door, [0.05, 0.3], [0, 1]);
  const kickerOpacity = useTransform(door, [0.14, 0.44], [0, 1]);
  const kickerY = useTransform(door, [0.14, 0.44], [26, 0]);
  const bodyOpacity = useTransform(door, [0.46, 0.74], [0, 1]);
  const bodyY = useTransform(door, [0.46, 0.74], [22, 0]);
  const ctaOpacity = useTransform(door, [0.6, 0.86], [0, 1]);
  const ctaY = useTransform(door, [0.6, 0.86], [20, 0]);
  // Keep the hidden CTA unclickable while the doors still cover it.
  const solPointer = useTransform(door, (v) => (v > 0.55 ? "auto" : "none"));

  /* -- reduced motion: no pinning, no doors ------------------------------- */
  if (reduced) {
    return (
      <>
        <section id="problem" className="px-5 py-24 sm:px-8">
          <div className="mx-auto w-full max-w-[78rem]">
            <Eyebrow>{problem.eyebrow}</Eyebrow>
            <h2 className="headline mt-6 text-[clamp(2rem,4.8vw,3.5rem)]">
              {problem.headline}{" "}
              <span className="text-grad">{problem.headlineAccent}</span>
            </h2>
            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {ITEMS.map((it) => (
                <div key={it.num} className="card p-7">
                  <span className="text-[0.8rem] font-black text-violet">
                    {it.num}
                  </span>
                  <h3 className="headline mt-3 text-xl">{it.title}</h3>
                  <p className="mt-2 font-medium text-ink/80">{it.body}</p>
                  <p className="lede mt-2 text-[0.9375rem]">{it.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden px-5 py-24 sm:px-8 md:py-32">
          <div
            className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07]"
            style={{ background: "var(--grad)" }}
            aria-hidden
          />
          <div className="mx-auto flex w-full max-w-[78rem] flex-col items-center text-center">
            <h2 className="headline text-[clamp(2.25rem,6vw,4.5rem)]">
              <WordReveal text={problem.solution.kicker} />{" "}
              <WordReveal text={problem.solution.brand} gradient delay={0.12} />
            </h2>
            <Reveal delay={0.2}>
              <p className="lede mt-7 max-w-2xl text-[1.0625rem] sm:text-[1.15rem]">
                {problem.solution.body}
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-10">
                <Button href={problem.solution.cta.href} size="lg" magnetic>
                  {problem.solution.cta.label}
                </Button>
              </div>
            </Reveal>
          </div>
        </section>
      </>
    );
  }

  return (
    <section id="problem" ref={ref} className="relative h-[560vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* ================= behind the doors: the solution ================= */}
        <motion.div
          style={{ scale: solScale, pointerEvents: solPointer }}
          className="absolute inset-0 flex items-center justify-center px-5 sm:px-8"
        >
          {/* light bursting through the opening */}
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
              <LogoMark className="h-11 w-auto" id="solution-mark" />
            </motion.div>

            <motion.h2
              style={{ opacity: kickerOpacity, y: kickerY }}
              className="headline mt-8 text-[clamp(2.25rem,6vw,4.5rem)]"
            >
              {problem.solution.kicker}{" "}
              <span className="text-grad">{problem.solution.brand}</span>
            </motion.h2>

            <motion.p
              style={{ opacity: bodyOpacity, y: bodyY }}
              className="lede mt-7 max-w-2xl text-[1.0625rem] sm:text-[1.15rem]"
            >
              {problem.solution.body}
            </motion.p>

            <motion.div style={{ opacity: ctaOpacity, y: ctaY }} className="mt-10">
              <Button href={problem.solution.cta.href} size="lg" magnetic>
                {problem.solution.cta.label}
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* ===================== left door ===================== */}
        <motion.div
          style={{ x: leftX }}
          className="absolute inset-y-0 left-0 z-20 w-1/2 overflow-hidden bg-canvas will-change-transform"
        >
          {/* 200% of a half-width door === full container width */}
          <div className="absolute inset-y-0 left-0 w-[200%]">
            <div className="dots absolute inset-0 opacity-40" aria-hidden />
            <ProblemStage p={p} active={active} numeralY={numeralY} />
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

        {/* ===================== right door ===================== */}
        <motion.div
          style={{ x: rightX }}
          className="absolute inset-y-0 right-0 z-20 w-1/2 overflow-hidden bg-canvas will-change-transform"
        >
          <div className="absolute inset-y-0 right-0 w-[200%]">
            <div className="dots absolute inset-0 opacity-40" aria-hidden />
            <ProblemStage p={p} active={active} numeralY={numeralY} />
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
