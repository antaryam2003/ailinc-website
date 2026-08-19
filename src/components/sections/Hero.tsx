"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useRef } from "react";
import { AppWindow } from "@/components/ui/AppWindow";
import { Button, WordReveal } from "@/components/ui/primitives";
import { brand, hero } from "@/content/site";
import { asset } from "@/lib/site";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  /* -- scroll-linked 3D reveal of the dashboard window ------------------- */
  const { scrollYProgress } = useScroll({
    target: windowRef,
    offset: ["start 0.95", "start 0.35"],
  });
  const eased = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });
  const rotateX = useTransform(eased, [0, 1], [26, 0]);
  const scale = useTransform(eased, [0, 1], [0.86, 1]);
  const translateY = useTransform(eased, [0, 1], [60, 0]);

  /* -- the dashboard pans itself as the page scrolls ---------------------- */
  // The tall screenshot is taller than its frame; page scroll drives how far it
  // has travelled, so the visitor never has to find a second scrollbar.
  // Anchored to the hero section, not the window: "start start" means progress
  // is exactly 0 while the section top is still at or below the viewport top —
  // i.e. on first paint, at any viewport height. Anchoring to the window itself
  // left it pre-scrolled on load, cropping the top of the briefing card.
  const { scrollYProgress: panProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const panEased = useSpring(panProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.0005,
  });

  // Travel distance is measured rather than assumed: the image is ~1.96x as
  // tall as it is wide, so the overflow differs hugely between phone and
  // desktop. A ref keeps the latest value available to the subscription below.
  const panY = useMotionValue(0);
  const maxPan = useRef(0);

  useEffect(() => {
    const measure = () => {
      const frame = viewportRef.current;
      const img = imageRef.current;
      if (!frame || !img) return;
      maxPan.current = Math.max(0, img.offsetHeight - frame.clientHeight);
      panY.set(-panEased.get() * maxPan.current);
    };
    measure();
    window.addEventListener("resize", measure);
    const ro = new ResizeObserver(measure);
    if (imageRef.current) ro.observe(imageRef.current);
    if (viewportRef.current) ro.observe(viewportRef.current);
    return () => {
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
  }, [panY, panEased]);

  useMotionValueEvent(panEased, "change", (v) => {
    panY.set(-v * maxPan.current);
  });

  /* -- cursor-tracking light on the backdrop ----------------------------- */
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
          className="blob drift-c top-[28%] left-[35%] h-[30rem] w-[30rem] opacity-30"
          style={{
            background:
              "radial-gradient(circle, rgba(124,58,237,0.45), rgba(124,58,237,0) 70%)",
          }}
        />

        {/* soft light that follows the pointer */}
        <motion.div
          className="absolute inset-0 hidden lg:block"
          style={{
            background: useTransform(
              [spotX, spotY],
              ([x, y]) =>
                `radial-gradient(520px circle at ${x} ${y}, rgba(255,255,255,0.85), transparent 62%)`,
            ),
          }}
        />
      </div>

      <div className="mx-auto w-full max-w-[78rem]">
        {/* ------------------------- copy ------------------------- */}
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <a
              href={brand.platformUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="group inline-flex items-center gap-2.5 rounded-full border border-violet/15 bg-white/70 py-1.5 pr-4 pl-2 backdrop-blur-sm transition-colors hover:border-violet/35"
            >
              <span
                className="rounded-full px-2.5 py-1 text-[0.65rem] font-bold tracking-[0.14em] text-white uppercase"
                style={{ background: "var(--grad)" }}
              >
                New
              </span>
              <span className="text-[0.8125rem] font-medium text-body">
                {hero.eyebrow}
              </span>
              <span className="text-violet transition-transform duration-300 group-hover:translate-x-0.5">
                →
              </span>
            </a>
          </motion.div>

          <h1 className="display mt-8 text-[clamp(2.75rem,8vw,6rem)]">
            <WordReveal text={hero.headline.line1} as="span" className="block" />
            <WordReveal
              text={hero.headline.line2}
              as="span"
              className="block"
              gradient
              delay={0.18}
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lede mt-7 max-w-[38rem] text-[1.0625rem] sm:text-[1.15rem]"
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
            <Button
              href={hero.secondary.href}
              variant="outline"
              size="lg"
              magnetic
            >
              {hero.secondary.label}
            </Button>
          </motion.div>
        </div>

        {/* ------------------- scrollable dashboard ------------------- */}
        <div ref={windowRef} className="relative mt-16 md:mt-20">
          <motion.div
            style={{
              rotateX,
              scale,
              y: translateY,
              transformPerspective: 1400,
              transformOrigin: "center top",
            }}
          >
            <AppWindow>
              {/* The real dashboard, full height. It pans itself as the page
                  scrolls — no nested scrollbar for the visitor to discover. */}
              <div
                ref={viewportRef}
                className="relative h-[clamp(20rem,52vh,34rem)] overflow-hidden"
              >
                <motion.div
                  ref={imageRef}
                  style={{ y: panY }}
                  className="will-change-transform"
                >
                  <Image
                    src={asset("/platform/dashboard-full.webp")}
                    alt="The AI Linc student dashboard — AI briefing, today's goal, skill profile and course readiness"
                    width={1800}
                    height={3525}
                    priority
                    className="w-full"
                  />
                </motion.div>
              </div>
            </AppWindow>
          </motion.div>

          {/* floating chips */}
          <motion.div
            initial={{ opacity: 0, x: -24, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -top-5 -left-2 hidden xl:block"
          >
            <div className="animate-float">
              <div className="glass flex items-center gap-2 rounded-2xl px-4 py-2.5">
                <span className="text-lg">🔥</span>
                <div className="text-left">
                  <div className="text-[0.8125rem] font-bold text-ink">
                    23-day streak
                  </div>
                  <div className="text-[0.7rem] text-muted">Best 41</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -top-6 -right-2 hidden xl:block"
          >
            <div className="animate-float" style={{ animationDelay: "1.6s" }}>
              <div className="glass rounded-2xl px-4 py-2.5 text-left">
                <div
                  className="text-[0.8125rem] font-bold text-transparent"
                  style={{
                    background: "var(--grad)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                  }}
                >
                  AI tuned this course to you
                </div>
                <div className="text-[0.7rem] text-muted">
                  Level · Beginner → Intermediate
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
