"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Eyebrow, Reveal, Section, WordReveal } from "@/components/ui/primitives";
import { AppWindow } from "@/components/ui/AppWindow";
import { about } from "@/content/site";
import { asset } from "@/lib/site";

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Gentle counter-parallax so the image drifts against the copy.
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-2.5, 2.5]);

  return (
    <Section id="about" className="overflow-hidden">
      <div ref={ref} className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
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

        <Reveal delay={0.15}>
          <motion.div style={{ y, rotate }}>
            <AppWindow compact>
              <Image
                src={asset("/platform/courses.webp")}
                alt="AI Linc courses — AI-personalised courses that adapt to your level in real time"
                width={2400}
                height={1500}
                className="w-full"
              />
            </AppWindow>
          </motion.div>
        </Reveal>
      </div>
    </Section>
  );
}
