"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { AppWindow } from "@/components/ui/AppWindow";
import { Reveal, Section, SectionHeading } from "@/components/ui/primitives";
import { three } from "@/content/site";
import { asset } from "@/lib/site";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------------------
 * The three ownable differentiators, given a full row each rather than a
 * four-card grid — these are the argument, not a feature list.
 * ------------------------------------------------------------------------- */
function Row({
  item,
  index,
  progress,
}: {
  item: (typeof three.items)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const flipped = index % 2 === 1;
  const y = useTransform(progress, [0, 1], [index % 2 === 0 ? 34 : 54, -34]);

  return (
    <div
      className={cn(
        "grid items-center gap-8 lg:grid-cols-2 lg:gap-14",
        flipped && "lg:[&>*:first-child]:order-2",
      )}
    >
      {/* ---- copy ---- */}
      <div>
        <Reveal>
          <div className="flex items-center gap-3">
            <span
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-[0.8rem] font-black text-white"
              style={{ background: "var(--grad)" }}
            >
              {item.num}
            </span>
            <span className="text-[0.7rem] font-bold tracking-[0.2em] text-violet uppercase">
              {item.kicker}
            </span>
            <span className="h-px flex-1 bg-line" />
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <h3 className="headline mt-5 text-[clamp(1.6rem,3.4vw,2.4rem)]">
            {item.title}
          </h3>
        </Reveal>

        <ul className="mt-7 grid gap-2 sm:grid-cols-2">
          {item.points.map((p, i) => (
            <Reveal key={p} delay={0.16 + i * 0.05}>
              <li className="flex items-start gap-2.5 rounded-lg border border-line bg-surface px-3.5 py-2.5 text-[0.8438rem] text-body">
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: "var(--grad)" }}
                />
                {p}
              </li>
            </Reveal>
          ))}
        </ul>
      </div>

      {/* ---- proof ---- */}
      <Reveal delay={0.1}>
        <motion.div style={{ y }}>
          <AppWindow compact>
            <Image
              src={asset(item.image)}
              alt={`${item.title} — the AI Linc platform`}
              width={2400}
              height={1500}
              className="w-full"
              sizes="(max-width: 1024px) 90vw, 34rem"
            />
          </AppWindow>
        </motion.div>
      </Reveal>
    </div>
  );
}

export default function Three() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <Section id="three" className="overflow-hidden">
      <SectionHeading
        eyebrow={three.eyebrow}
        title={three.headline}
        accent={three.headlineAccent}
        align="center"
      />

      <div ref={ref} className="mt-16 flex flex-col gap-20 md:gap-28">
        {three.items.map((item, i) => (
          <Row key={item.key} item={item} index={i} progress={scrollYProgress} />
        ))}
      </div>
    </Section>
  );
}
