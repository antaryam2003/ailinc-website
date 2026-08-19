"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef } from "react";
import { Eyebrow, Reveal, Section, WordReveal } from "@/components/ui/primitives";
import { AppWindow } from "@/components/ui/AppWindow";
import { about } from "@/content/site";
import { asset } from "@/lib/site";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------------------
 * The cluster mirrors the headline: first lesson -> proof -> first offer.
 * Each card gets its own drift and rotation range, so the stack separates into
 * depth layers as the section passes instead of moving as one flat block.
 * ------------------------------------------------------------------------- */
const CARDS = [
  {
    id: "learn",
    label: "Learn",
    image: "/platform/courses.webp",
    alt: "AI Linc courses that adapt to your level in real time",
    box: "left-0 top-0 w-[86%]",
    z: "z-10",
    rotate: [-3.4, -0.6],
    drift: [46, -46],
    chip: "top-3 -left-2 sm:-left-3",
  },
  {
    id: "prove",
    label: "Prove it",
    image: "/platform/mock-interview.webp",
    alt: "AI mock interviews with rubric-based feedback",
    box: "left-0 bottom-0 w-[54%]",
    z: "z-30",
    rotate: [3.2, 0.4],
    drift: [86, -70],
    chip: "-top-3 -left-2",
  },
  {
    id: "offer",
    label: "Get hired",
    image: "/platform/jobs.webp",
    alt: "A job board matched to the skills you have demonstrated",
    box: "right-0 top-[40%] w-[64%]",
    z: "z-20",
    rotate: [-1.6, 2.6],
    drift: [122, -98],
    chip: "-top-3 -right-2",
  },
] as const;

function FloatingWindow({
  card,
  progress,
  index,
}: {
  card: (typeof CARDS)[number];
  progress: MotionValue<number>;
  index: number;
}) {
  // Spread: `as const` makes these readonly tuples, which useTransform's
  // overloads reject.
  const y = useTransform(progress, [0, 1], [...card.drift]);
  const rotate = useTransform(progress, [0, 1], [...card.rotate]);

  return (
    <motion.div
      style={{ y, rotate }}
      initial={{ opacity: 0, scale: 0.94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{
        duration: 0.85,
        delay: 0.1 + index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn("absolute will-change-transform", card.box, card.z)}
    >
      <div className="relative">
        {/* Only the back card carries a glow; three would muddy the stack. */}
        <AppWindow compact glow={index === 0}>
          <Image
            src={asset(card.image)}
            alt={card.alt}
            width={2400}
            height={1500}
            className="w-full"
            sizes="(max-width: 1024px) 60vw, 30rem"
          />
        </AppWindow>

        <span
          className={cn(
            "absolute rounded-full px-2.5 py-1 text-[0.65rem] font-bold tracking-[0.12em] text-white uppercase shadow-[0_6px_18px_-6px_rgba(124,58,237,0.7)]",
            card.chip,
          )}
          style={{ background: "var(--grad)" }}
        >
          {card.label}
        </span>
      </div>
    </motion.div>
  );
}

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <Section id="about" className="overflow-hidden">
      <div ref={ref} className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
        {/* ---------------- copy ---------------- */}
        <div>
          <Reveal>
            <Eyebrow>{about.eyebrow}</Eyebrow>
          </Reveal>

          <h2 className="headline mt-6 text-[clamp(1.9rem,4.2vw,3rem)]">
            <WordReveal text={about.headline} />{" "}
            <WordReveal text={about.headlineAccent} gradient delay={0.12} />
          </h2>

          <Reveal delay={0.2}>
            <p className="lede mt-6 text-[1.0625rem]">{about.body}</p>
          </Reveal>

          <div className="mt-9 space-y-px overflow-hidden rounded-2xl border border-line bg-line">
            {about.pillars.map((p, i) => (
              <Reveal key={p.k} delay={0.25 + i * 0.07}>
                <div className="flex flex-col gap-1 bg-surface px-5 py-4 sm:flex-row sm:items-center sm:gap-5">
                  <span className="w-28 shrink-0 text-[0.8125rem] font-bold tracking-wide text-violet uppercase">
                    {p.k}
                  </span>
                  <span className="text-[0.9375rem] text-body">{p.v}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ---------------- window cluster ---------------- */}
        <div className="relative">
          <div
            aria-hidden
            className="blob drift-c pointer-events-none absolute top-[8%] left-[8%] h-[26rem] w-[26rem] opacity-30"
            style={{
              background:
                "radial-gradient(circle, rgba(168,85,247,0.5), rgba(168,85,247,0) 70%)",
            }}
          />

          {reduced ? (
            /* Static fallback — same three screens, no drift. */
            <div className="relative flex flex-col gap-6">
              {CARDS.map((c) => (
                <div key={c.id} className="relative">
                  <AppWindow compact glow={false}>
                    <Image
                      src={asset(c.image)}
                      alt={c.alt}
                      width={2400}
                      height={1500}
                      className="w-full"
                    />
                  </AppWindow>
                  <span
                    className="absolute -top-3 left-3 rounded-full px-2.5 py-1 text-[0.65rem] font-bold tracking-[0.12em] text-white uppercase"
                    style={{ background: "var(--grad)" }}
                  >
                    {c.label}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="relative h-[21rem] sm:h-[27rem] lg:h-[30rem] xl:h-[33rem]">
              {CARDS.map((c, i) => (
                <FloatingWindow
                  key={c.id}
                  card={c}
                  progress={scrollYProgress}
                  index={i}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
