"use client";

import { motion } from "motion/react";
import {
  Reveal,
  Section,
  SectionHeading,
  SpotlightCard,
} from "@/components/ui/primitives";
import {
  IconAI,
  IconAssess,
  IconBuild,
  IconJobs,
} from "@/components/platform/Icons";
import { why } from "@/content/site";

const ICONS = {
  ai: IconAI,
  build: IconBuild,
  assess: IconAssess,
  jobs: IconJobs,
} as const;

export default function Why() {
  return (
    <Section id="why" className="relative">
      <SectionHeading
        eyebrow={why.eyebrow}
        title={why.headline}
        accent={why.headlineAccent}
        sub={why.sub}
        align="center"
      />

      <div className="mt-14 grid gap-5 md:grid-cols-2">
        {why.cards.map((c, i) => {
          const Icon = ICONS[c.icon as keyof typeof ICONS];
          return (
            <Reveal key={c.title} delay={0.07 * i} className="h-full">
              <SpotlightCard className="card grad-border h-full rounded-[1.25rem]">
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="flex h-full flex-col p-7 sm:p-8"
                >
                  <span
                    className="inline-flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-[0_8px_20px_-8px_rgba(124,58,237,0.7)]"
                    style={{ background: "var(--grad)" }}
                  >
                    <Icon className="h-[22px] w-[22px]" />
                  </span>

                  <h3 className="headline mt-6 text-[1.4rem]">{c.title}</h3>
                  <p className="lede mt-3 flex-1 text-[0.9688rem]">{c.body}</p>

                  {/* the product's own words, as evidence */}
                  <div className="mt-6 flex items-center gap-2.5 border-t border-line pt-5">
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: "var(--grad)" }}
                    />
                    <span className="text-[0.8125rem] font-bold text-violet">
                      {c.proof}
                    </span>
                    <span className="ml-auto text-[0.7rem] text-faint">
                      in-product
                    </span>
                  </div>
                </motion.div>
              </SpotlightCard>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
