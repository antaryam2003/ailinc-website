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
import { problem } from "@/content/site";
import { cn } from "@/lib/utils";

const ITEMS = problem.items;

/* ------------------------------------------------------------------
   One panel in the vertical reel. Its position is a pure function of
   the shared progress value, so the whole stack moves as one object
   instead of four independently-triggered animations.
   ------------------------------------------------------------------ */
function Panel({
  item,
  index,
  p,
}: {
  item: (typeof ITEMS)[number];
  index: number;
  p: MotionValue<number>;
}) {
  const d = useTransform(p, (v) => index - v); // signed distance from active
  const y = useTransform(d, (v) => `${v * 62}%`);
  const opacity = useTransform(d, (v) => Math.max(0, 1 - Math.abs(v) * 1.25));
  const scale = useTransform(d, (v) => 1 - Math.min(Math.abs(v), 1) * 0.12);
  const blur = useTransform(d, (v) => `blur(${Math.min(Math.abs(v), 1) * 8}px)`);

  return (
    <motion.div
      style={{ y, opacity, scale, filter: blur }}
      className="absolute inset-x-0 top-1/2 -translate-y-1/2 will-change-transform"
    >
      <div className="card grad-border p-7 sm:p-9">
        <span
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-[0.9rem] font-black text-white"
          style={{ background: "var(--grad)" }}
        >
          {item.num}
        </span>
        <h3 className="headline mt-5 text-[clamp(1.5rem,3.4vw,2.25rem)]">
          {item.title}
        </h3>
        <p className="mt-3 text-[1.0625rem] font-medium text-ink/80">
          {item.body}
        </p>
        <p className="lede mt-3 text-[0.9375rem]">{item.detail}</p>
      </div>
    </motion.div>
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

  // Map raw scroll to a continuous index, with a little dwell at each end.
  const raw = useTransform(scrollYProgress, [0.08, 0.92], [0, ITEMS.length - 1], {
    clamp: true,
  });
  const p = useSpring(raw, { stiffness: 110, damping: 26, restDelta: 0.001 });

  useMotionValueEvent(p, "change", (v) => {
    const i = Math.round(v);
    if (i !== active) setActive(i);
  });

  // Derived values must be created before any early return, otherwise the
  // hook order changes when prefers-reduced-motion flips.
  const numeralY = useTransform(p, (v) => `${-v * 5.5}rem`);
  const blobLeft = useTransform(p, (v) => `${8 + v * 14}%`);

  /* -------- reduced motion / no-JS friendly fallback -------- */
  if (reduced) {
    return (
      <section id="problem" className="px-5 py-24 sm:px-8">
        <div className="mx-auto w-full max-w-[78rem]">
          <Eyebrow>{problem.eyebrow}</Eyebrow>
          <h2 className="headline mt-6 text-[clamp(2rem,4.8vw,3.5rem)]">
            {problem.headline} <span className="text-grad">{problem.headlineAccent}</span>
          </h2>
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {ITEMS.map((it) => (
              <div key={it.num} className="card p-7">
                <span className="text-[0.8rem] font-black text-violet">{it.num}</span>
                <h3 className="headline mt-3 text-xl">{it.title}</h3>
                <p className="mt-2 font-medium text-ink/80">{it.body}</p>
                <p className="lede mt-2 text-[0.9375rem]">{it.detail}</p>
              </div>
            ))}
          </div>
          <Solution />
        </div>
      </section>
    );
  }

  return (
    <>
      {/* The tall track: its height is what gives the pinned panel room to run. */}
      <section id="problem" ref={ref} className="relative h-[420vh]">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden px-5 sm:px-8">
          {/* backdrop */}
          <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
            <div className="dots absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000,transparent_75%)]" />
            <motion.div
              className="blob h-[34rem] w-[34rem] opacity-30"
              style={{
                top: "10%",
                left: blobLeft,
                background:
                  "radial-gradient(circle, rgba(168,85,247,0.5), rgba(168,85,247,0) 68%)",
              }}
            />
          </div>

          <div className="mx-auto grid w-full max-w-[78rem] items-center gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
            {/* -------- left: heading + index -------- */}
            <div>
              <Eyebrow>{problem.eyebrow}</Eyebrow>
              <h2 className="headline mt-6 text-[clamp(1.9rem,4.4vw,3.25rem)]">
                {problem.headline}{" "}
                <span className="text-grad">{problem.headlineAccent}</span>
              </h2>

              {/* giant rolling numeral */}
              <div className="mt-10 hidden items-end gap-5 lg:flex">
                <div className="relative h-[5.5rem] w-[7rem] overflow-hidden">
                  <motion.div
                    className="absolute inset-x-0 top-0"
                    style={{ y: numeralY }}
                  >
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

                {/* progress rail */}
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
                          "text-[0.8125rem] transition-colors duration-500",
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

            {/* -------- right: the reel -------- */}
            <div className="relative h-[24rem] sm:h-[26rem]">
              {ITEMS.map((it, i) => (
                <Panel key={it.num} item={it} index={i} p={p} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <Solution />
    </>
  );
}

/* ------------------------------------------------------------------
   The resolution beat: "That's why we built AI Linc."
   ------------------------------------------------------------------ */
function Solution() {
  return (
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
  );
}
