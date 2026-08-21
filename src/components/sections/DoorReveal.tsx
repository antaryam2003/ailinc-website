"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { Button, Reveal, WordReveal } from "@/components/ui/primitives";
import { LogoMark } from "@/components/ui/Logo";
import { reveal } from "@/content/site";

/* ============================================================================
 * "It starts with you."
 *
 * One pinned track whose two halves part down the middle to uncover the payoff
 * behind them:
 *
 *   0.00 → 0.12   closed
 *   0.12 → 0.62   the halves part
 *   0.62 → 1.00   dwell, so the CTA is readable and clickable
 *
 * A door is an overflow-hidden half-width window onto a full-width face, so the
 * dot pattern is laid out across the whole container rather than per door —
 * without that the two halves fall out of phase and the seam shows before the
 * doors move.
 * ========================================================================== */
export default function DoorReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const doorRaw = useTransform(scrollYProgress, [0.12, 0.62], [0, 1], { clamp: true });
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
    );
  }

  return (
    <section id="reveal" ref={ref} className="relative h-[300vh]">
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
