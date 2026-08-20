"use client";

import Image from "next/image";
import {
  motion,
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { AppWindow } from "@/components/ui/AppWindow";
import { Eyebrow, TodoNote, WordReveal } from "@/components/ui/primitives";
import { LogoMark } from "@/components/ui/Logo";
import { features } from "@/content/site";
import { asset } from "@/lib/site";
import { cn } from "@/lib/utils";

const SLIDES = features.slides;

/* ------------------------------------------------------------------
   Horizontal scroll gallery.

   The section is tall; while it is pinned, vertical scroll is mapped to
   horizontal translation of the track. Distance is measured from the real
   DOM rather than guessed, so it lands exactly on the last slide at any
   viewport width.
   ------------------------------------------------------------------ */
export default function Features() {
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [distance, setDistance] = useState(0);
  const [active, setActive] = useState(0);
  // Slide 0 is "active" from first render, so without this the first clip would
  // be fetched on page load for a gallery that is several screens below.
  const nearGallery = useInView(sectionRef, { margin: "300px" });

  useEffect(() => {
    const measure = () => {
      const el = trackRef.current;
      if (!el) return;
      setDistance(Math.max(0, el.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    return () => {
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const eased = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.0005,
  });
  const x = useTransform(eased, [0, 1], [0, -distance]);
  const progressScale = useTransform(eased, [0, 1], [0.02, 1]);

  useMotionValueEvent(eased, "change", (v) => {
    const i = Math.min(SLIDES.length - 1, Math.round(v * (SLIDES.length - 1)));
    if (i !== active) setActive(i);
  });

  /* ---- reduced motion: plain horizontal swipe carousel ---- */
  if (reduced) {
    return (
      <section id="features" className="px-5 py-24 sm:px-8">
        <div className="mx-auto w-full max-w-[78rem]">
          <Header />
        </div>
        <div className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-6">
          {SLIDES.map((s) => (
            <div key={s.id} className="w-[min(85vw,60rem)] shrink-0 snap-center">
              <Slide slide={s} active={false} />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative"
      // Enough vertical room for every slide to get a comfortable dwell.
      style={{ height: `${100 + SLIDES.length * 52}vh` }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        {/* backdrop */}
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
          <div
            className="blob drift-b top-[-10%] right-[-10%] h-[36rem] w-[36rem] opacity-25"
            style={{
              background:
                "radial-gradient(circle, rgba(236,72,153,0.5), rgba(236,72,153,0) 68%)",
            }}
          />
          <div
            className="blob drift-a bottom-[-15%] left-[-10%] h-[32rem] w-[32rem] opacity-25"
            style={{
              background:
                "radial-gradient(circle, rgba(124,58,237,0.5), rgba(124,58,237,0) 68%)",
            }}
          />
        </div>

        {/* header */}
        <div className="mx-auto w-full max-w-[78rem] shrink-0 px-5 sm:px-8">
          <Header />
        </div>

        {/* the moving track */}
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="mt-8 flex w-max items-center gap-16 px-5 will-change-transform sm:gap-28 sm:px-8"
        >
          {SLIDES.map((s, i) => (
            <div
              key={s.id}
              className={cn(
                "w-[min(86vw,56rem)] shrink-0 transition-opacity duration-500",
                Math.abs(i - active) > 1 ? "opacity-45" : "opacity-100",
              )}
            >
              <Slide slide={s} active={nearGallery && i === active} />
            </div>
          ))}
        </motion.div>

        {/* progress + index */}
        <div className="mx-auto mt-8 flex w-full max-w-[78rem] shrink-0 items-center gap-5 px-5 sm:px-8">
          <span className="text-[0.75rem] font-bold tracking-widest text-violet tabular-nums">
            {SLIDES[active].num}
            <span className="text-faint"> / {SLIDES[SLIDES.length - 1].num}</span>
          </span>
          <div className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-line">
            <motion.div
              className="absolute inset-y-0 left-0 w-full origin-left rounded-full"
              style={{ scaleX: progressScale, background: "var(--grad)" }}
            />
          </div>
          <span className="hidden text-[0.75rem] text-faint sm:inline">
            Keep scrolling →
          </span>
        </div>
      </div>
    </section>
  );
}

function Header() {
  return (
    <div className="flex flex-col items-start gap-5">
      <Eyebrow>{features.eyebrow}</Eyebrow>
      <h2 className="headline text-[clamp(1.9rem,4.6vw,3.25rem)]">
        <WordReveal text={features.headline} />{" "}
        <WordReveal text={features.headlineAccent} gradient delay={0.1} />
      </h2>
      <p className="lede max-w-xl text-[1rem]">{features.sub}</p>
      <TodoNote>{features.pendingNote}</TodoNote>
    </div>
  );
}

/** Stand-in for a feature whose screenshot has not been captured yet. */
function PendingShot({ title }: { title: string }) {
  return (
    <div className="relative flex aspect-[16/10] flex-col items-center justify-center gap-4 bg-lilac/60">
      <div className="dots absolute inset-0 opacity-50" aria-hidden />
      <LogoMark className="relative h-9 w-auto opacity-80" id={`pending-${title}`} />
      <div className="relative text-center">
        <div className="text-[0.95rem] font-bold text-ink">{title}</div>
        <div className="mt-1 text-[0.8125rem] text-muted">
          Screenshot coming soon
        </div>
      </div>
    </div>
  );
}

/**
 * Still + looping clip. The still is the poster so first paint is instant and
 * identical to the static build; the clip fades in over it and plays only while
 * its slide is active, which keeps ten videos off the network and the decoder.
 */
function SlideMedia({
  slide,
  active,
}: {
  slide: (typeof SLIDES)[number];
  active: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);
  const wanted = active && !reduced && Boolean(slide.video);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (wanted) {
      // load() is deferred to first activation via preload="none"
      const play = v.play();
      if (play) play.catch(() => {});
    } else {
      v.pause();
      if (v.currentTime > 0) v.currentTime = 0;
    }
  }, [wanted]);

  if (!slide.image) return <PendingShot title={slide.title} />;

  return (
    <div className="relative">
      <Image
        src={asset(slide.image)}
        alt={`${slide.title} — the AI Linc platform`}
        width={2400}
        height={1500}
        className="w-full"
        sizes="(max-width: 1024px) 86vw, 36rem"
      />
      {slide.video && !reduced && (
        <video
          ref={videoRef}
          src={asset(slide.video)}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden
          onPlaying={() => setReady(true)}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
            ready && wanted ? "opacity-100" : "opacity-0",
          )}
        />
      )}
    </div>
  );
}

function Slide({
  slide,
  active,
}: {
  slide: (typeof SLIDES)[number];
  active: boolean;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.55fr] lg:items-center lg:gap-10">
      <div>
        <div className="flex items-center gap-3">
          <span
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-[0.8rem] font-black text-white"
            style={{ background: "var(--grad)" }}
          >
            {slide.num}
          </span>
          <span className="h-px flex-1 bg-line" />
        </div>
        <h3 className="headline mt-5 text-[clamp(1.4rem,2.6vw,2rem)]">
          {slide.title}
        </h3>
        <p className="lede mt-3 text-[0.9688rem]">{slide.body}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {slide.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-line bg-surface px-3 py-1 text-[0.75rem] font-medium text-body"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <AppWindow compact>
        <SlideMedia slide={slide} active={active} />
      </AppWindow>
    </div>
  );
}
