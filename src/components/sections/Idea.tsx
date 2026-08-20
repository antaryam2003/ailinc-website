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
import { idea } from "@/content/site";
import { cn } from "@/lib/utils";

const STEPS = idea.steps;

/* ============================================================================
 * "AI Linc doesn't start with a course. It starts with you."
 *
 * Scroll choreography over one pinned track:
 *   0.04 → 0.52   Assess → Understand → Adapt → Teach, through a vertical reel
 *   0.52 → 0.60   hold on the last step
 *   0.60 → 0.84   the panel splits down the middle and the halves part,
 *                 revealing the payoff behind them
 *   0.84 → 1.00   dwell, so the CTA is readable and clickable
 *
 * A door is an overflow-hidden half-width window onto a full-width copy of the
 * stage, so the stage renders once per door; both copies read the same
 * MotionValue, which is why the seam is invisible until the halves move.
 * ========================================================================== */

function Panel({
  step,
  index,
  p,
}: {
  step: (typeof STEPS)[number];
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
        <div className="flex items-center gap-3">
          <span
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-[0.9rem] font-black text-white"
            style={{ background: "var(--grad)" }}
          >
            {step.num}
          </span>
          <span className="text-[0.7rem] font-bold tracking-[0.2em] text-violet uppercase">
            {step.name}
          </span>
        </div>
        <h3 className="headline mt-5 text-[clamp(1.4rem,3.2vw,2.1rem)]">
          {step.title}
        </h3>
        <p className="mt-3 text-[1.0625rem] font-medium text-ink/80">{step.body}</p>
        <p className="lede mt-3 text-[0.9375rem]">{step.detail}</p>
      </div>
    </motion.div>
  );
}

/** Full-width stage. Rendered once inside each door. */
function Stage({
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
          <Eyebrow>{idea.eyebrow}</Eyebrow>
          <h2 className="headline mt-6 text-[clamp(1.9rem,4.4vw,3.25rem)]">
            {idea.headline}{" "}
            <span className="text-grad">{idea.headlineAccent}</span>
          </h2>

          <div className="mt-10 hidden items-end gap-5 lg:flex">
            <div className="relative h-[5.5rem] w-[7rem] overflow-hidden">
              <motion.div className="absolute inset-x-0 top-0" style={{ y: numeralY }}>
                {STEPS.map((s) => (
                  <div
                    key={s.num}
                    className="flex h-[5.5rem] items-center text-[5rem] leading-none font-black tracking-[-0.06em] text-transparent"
                    style={{
                      background: "var(--grad)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                    }}
                  >
                    {s.num}
                  </div>
                ))}
              </motion.div>
            </div>

            <div className="mb-4 flex flex-col gap-2">
              {STEPS.map((s, i) => (
                <div key={s.num} className="flex items-center gap-3">
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
                    {s.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative h-[24rem] sm:h-[26rem]">
          {STEPS.map((s, i) => (
            <Panel key={s.num} step={s} index={i} p={p} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Idea() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  /* -- phase 1: the reel -------------------------------------------------- */
  const raw = useTransform(scrollYProgress, [0.04, 0.52], [0, STEPS.length - 1], {
    clamp: true,
  });
  const p = useSpring(raw, { stiffness: 110, damping: 26, restDelta: 0.001 });
  const numeralY = useTransform(p, (v) => `${-v * 5.5}rem`);

  useMotionValueEvent(p, "change", (v) => {
    const i = Math.round(v);
    if (i !== active) setActive(i);
  });

  /* -- phase 2: the doors ------------------------------------------------- */
  const doorRaw = useTransform(scrollYProgress, [0.6, 0.84], [0, 1], { clamp: true });
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
        <section id="idea" className="px-5 py-24 sm:px-8">
          <div className="mx-auto w-full max-w-[78rem]">
            <Eyebrow>{idea.eyebrow}</Eyebrow>
            <h2 className="headline mt-6 text-[clamp(2rem,4.8vw,3.5rem)]">
              {idea.headline} <span className="text-grad">{idea.headlineAccent}</span>
            </h2>
            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {STEPS.map((s) => (
                <div key={s.num} className="card p-7">
                  <span className="text-[0.7rem] font-bold tracking-[0.2em] text-violet uppercase">
                    {s.num} · {s.name}
                  </span>
                  <h3 className="headline mt-3 text-xl">{s.title}</h3>
                  <p className="mt-2 font-medium text-ink/80">{s.body}</p>
                  <p className="lede mt-2 text-[0.9375rem]">{s.detail}</p>
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
              <WordReveal text={idea.reveal.kicker} />{" "}
              <WordReveal text={idea.reveal.accent} gradient delay={0.12} />
            </h2>
            <Reveal delay={0.2}>
              <p className="lede mt-7 max-w-2xl text-[1.0625rem] sm:text-[1.15rem]">
                {idea.reveal.body}
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-10">
                <Button href={idea.reveal.cta.href} size="lg" magnetic>
                  {idea.reveal.cta.label}
                </Button>
              </div>
            </Reveal>
          </div>
        </section>
      </>
    );
  }

  return (
    <section id="idea" ref={ref} className="relative h-[560vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* ============ behind the doors ============ */}
        <motion.div
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
              <LogoMark className="h-11 w-auto" id="idea-mark" />
            </motion.div>

            <motion.h2
              style={{ opacity: kickerOpacity, y: kickerY }}
              className="headline mt-8 text-[clamp(2.25rem,6vw,4.5rem)]"
            >
              {idea.reveal.kicker}{" "}
              <span className="text-grad">{idea.reveal.accent}</span>
            </motion.h2>

            <motion.p
              style={{ opacity: bodyOpacity, y: bodyY }}
              className="lede mt-7 max-w-2xl text-[1.0625rem] sm:text-[1.15rem]"
            >
              {idea.reveal.body}
            </motion.p>

            <motion.div style={{ opacity: ctaOpacity, y: ctaY }} className="mt-10">
              <Button href={idea.reveal.cta.href} size="lg" magnetic>
                {idea.reveal.cta.label}
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
            <Stage p={p} active={active} numeralY={numeralY} />
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
            <Stage p={p} active={active} numeralY={numeralY} />
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
