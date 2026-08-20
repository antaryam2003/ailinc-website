"use client";

import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import Link from "next/link";
import LevelDemo from "@/components/sections/LevelDemo";
import { Button, WordReveal } from "@/components/ui/primitives";
import { hero } from "@/content/site";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const demoRef = useRef<HTMLDivElement>(null);

  /* -- scroll-linked 3D settle of the demo panel -------------------------- */
  const { scrollYProgress } = useScroll({
    target: demoRef,
    offset: ["start 0.95", "start 0.4"],
  });
  const eased = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });
  const rotateX = useTransform(eased, [0, 1], [20, 0]);
  const scale = useTransform(eased, [0, 1], [0.9, 1]);
  const lift = useTransform(eased, [0, 1], [50, 0]);

  /* -- cursor-tracking light on the backdrop ------------------------------ */
  const px = useMotionValue(50);
  const py = useMotionValue(28);
  const sx = useSpring(px, { stiffness: 60, damping: 22 });
  const sy = useSpring(py, { stiffness: 60, damping: 22 });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      px.set(((e.clientX - r.left) / r.width) * 100);
      py.set(((e.clientY - r.top) / r.height) * 100);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [px, py]);

  const spotX = useTransform(sx, (v) => `${v}%`);
  const spotY = useTransform(sy, (v) => `${v}%`);
  const spotlight = useTransform(
    [spotX, spotY],
    ([x, y]) =>
      `radial-gradient(520px circle at ${x} ${y}, rgba(255,255,255,0.85), transparent 62%)`,
  );

  return (
    <div
      ref={sectionRef}
      className="relative overflow-hidden px-5 pt-32 pb-20 sm:px-8 sm:pt-36 md:pb-28"
    >
      {/* ------------------------- backdrop ------------------------- */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="grid-lines absolute inset-0" />
        <div
          className="blob drift-a -top-32 -left-24 h-[38rem] w-[38rem] opacity-45"
          style={{
            background:
              "radial-gradient(circle, rgba(168,85,247,0.55), rgba(168,85,247,0) 68%)",
          }}
        />
        <div
          className="blob drift-b -top-20 right-[-8rem] h-[34rem] w-[34rem] opacity-40"
          style={{
            background:
              "radial-gradient(circle, rgba(236,72,153,0.45), rgba(236,72,153,0) 68%)",
          }}
        />
        <div
          className="blob drift-c top-[30%] left-[38%] h-[30rem] w-[30rem] opacity-30"
          style={{
            background:
              "radial-gradient(circle, rgba(34,211,238,0.40), rgba(34,211,238,0) 70%)",
          }}
        />
        <motion.div
          className="absolute inset-0 hidden lg:block"
          style={{ background: spotlight }}
        />
      </div>

      <div className="mx-auto w-full max-w-[78rem]">
        {/* ------------------------- copy ------------------------- */}
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2.5 rounded-full border border-violet/15 bg-white/70 px-4 py-1.5 backdrop-blur-sm"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ring absolute inset-0 rounded-full bg-violet" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-violet" />
            </span>
            <span className="eyebrow">{hero.eyebrow}</span>
          </motion.div>

          <h1 className="display mt-8 text-[clamp(2.5rem,7vw,5.25rem)]">
            <WordReveal text={hero.headline.line1} as="span" className="block" />
            <WordReveal
              text={hero.headline.line2}
              as="span"
              className="block"
              gradient
              delay={0.16}
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lede mt-7 max-w-[40rem] text-[1.0625rem] sm:text-[1.15rem]"
          >
            {hero.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.62, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
          >
            <Button href={hero.primary.href} size="lg" magnetic>
              {hero.primary.label}
            </Button>
            <Button href={hero.secondary.href} variant="outline" size="lg" magnetic>
              {hero.secondary.label}
            </Button>
          </motion.div>

          {/* two-sided platform, surfaced immediately */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-7 flex items-center gap-2 text-[0.8125rem]"
          >
            {hero.audience.map((a, i) => (
              <span key={a.label} className="flex items-center gap-2">
                {i > 0 && <span className="text-faint">·</span>}
                <Link
                  href={a.href}
                  className="group inline-flex items-center gap-1 font-medium text-body transition-colors hover:text-violet"
                >
                  {a.label}
                  <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                    →
                  </span>
                </Link>
              </span>
            ))}
          </motion.div>
        </div>

        {/* ------------------- interactive proof ------------------- */}
        <div ref={demoRef} className="relative mt-16 md:mt-20">
          <motion.div
            style={{
              rotateX,
              scale,
              y: lift,
              transformPerspective: 1400,
              transformOrigin: "center top",
            }}
          >
            <LevelDemo />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
