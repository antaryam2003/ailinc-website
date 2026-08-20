"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { hero } from "@/content/site";
import { cn } from "@/lib/utils";

const LEVELS = hero.demo.levels;

/* ============================================================================
 * The hero's proof-of-personalisation.
 *
 * Claiming "we adapt to you" is what every edtech site does. Letting the
 * visitor pick a level and watching the skill profile, the recommendation and
 * the module list all rewrite themselves is the same claim, demonstrated.
 *
 * Rendered as a dark product panel so it reads as the app, not the page.
 * ========================================================================== */
export default function LevelDemo() {
  const [index, setIndex] = useState(1); // start on Intermediate — most legible
  const [thinking, setThinking] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();
  const level = LEVELS[index];

  // A brief "recalculating" beat makes the change feel computed, not toggled.
  const pick = (i: number) => {
    if (i === index) return;
    setIndex(i);
    if (reduced) return;
    setThinking(true);
  };

  useEffect(() => {
    if (!thinking) return;
    const t = setTimeout(() => setThinking(false), 620);
    return () => clearTimeout(t);
  }, [thinking, index]);

  return (
    <div ref={ref} className="panel relative overflow-hidden">
      <div className="panel-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div
        className="pointer-events-none absolute -top-24 left-1/2 h-56 w-[34rem] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{ background: "var(--grad-ai)" }}
        aria-hidden
      />

      {/* scanning pass while recalculating */}
      <AnimatePresence>
        {thinking && (
          <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
          >
            <div className="animate-scan absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-cyan/15 to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative p-5 sm:p-7">
        {/* ---------------- level picker ---------------- */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-[0.9375rem] font-bold text-white">
              {hero.demo.question}
            </div>
            <div className="mt-0.5 text-[0.8125rem] text-white/45">
              {hero.demo.hint}
            </div>
          </div>

          <div
            role="tablist"
            aria-label="Starting level"
            className="inline-flex rounded-full border border-white/10 bg-white/[0.04] p-1"
          >
            {LEVELS.map((l, i) => (
              <button
                key={l.id}
                role="tab"
                aria-selected={i === index}
                type="button"
                onClick={() => pick(i)}
                className={cn(
                  "relative rounded-full px-3.5 py-1.5 text-[0.8125rem] font-medium transition-colors duration-300 sm:px-4",
                  i === index ? "text-[#0d1020]" : "text-white/55 hover:text-white",
                )}
              >
                {i === index && (
                  <motion.span
                    layoutId="level-pill"
                    className="absolute inset-0 rounded-full bg-cyan"
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
                <span className="relative">{l.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* the platform's spoken response to the choice */}
        <div className="mt-5 flex min-h-[1.75rem] items-center gap-2.5">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan/15 text-[0.6rem] font-bold text-cyan">
            AI
          </span>
          <AnimatePresence mode="wait">
            <motion.span
              key={level.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="text-[0.9375rem] text-white/85"
            >
              {level.blurb}
            </motion.span>
          </AnimatePresence>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_1.05fr]">
          {/* ---------------- skill profile ---------------- */}
          <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-4">
            <div className="text-[0.65rem] font-bold tracking-[0.16em] text-white/35 uppercase">
              Your AI learning profile
            </div>
            <div className="mt-3.5 space-y-2.5">
              {level.skills.map((s, i) => (
                <div key={s.name}>
                  <div className="mb-1 flex items-baseline justify-between">
                    <span className="text-[0.8125rem] text-white/70">{s.name}</span>
                    <motion.span
                      key={`${level.id}-${s.name}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-[0.75rem] font-bold text-white tabular-nums"
                    >
                      {s.value}%
                    </motion.span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: "var(--grad-ai)" }}
                      initial={{ width: 0 }}
                      animate={{ width: inView ? `${s.value}%` : 0 }}
                      transition={{
                        duration: 0.85,
                        delay: reduced ? 0 : 0.06 * i,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ---------------- the resulting plan ---------------- */}
          <div className="rounded-xl border border-cyan/20 bg-cyan/[0.05] p-4">
            <div className="flex items-center justify-between">
              <span className="text-[0.65rem] font-bold tracking-[0.16em] text-cyan uppercase">
                Next up
              </span>
              <span className="text-[0.7rem] text-white/40">{level.pace}</span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={level.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="mt-2 text-[1.0625rem] font-bold text-white">
                  {level.next}
                </div>
                <p className="mt-1 text-[0.8125rem] leading-relaxed text-white/50">
                  {level.why}
                </p>

                <ul className="mt-3.5 space-y-1.5">
                  {level.modules.map((m, i) => (
                    <motion.li
                      key={m}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: reduced ? 0 : 0.07 * i,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="flex items-center gap-2 text-[0.8125rem] text-white/75"
                    >
                      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-cyan/15 text-[0.55rem] font-bold text-cyan">
                        {i + 1}
                      </span>
                      {m}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
