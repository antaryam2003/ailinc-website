"use client";

import { motion } from "motion/react";
import { useState } from "react";
import {
  Button,
  Reveal,
  Section,
  SectionHeading,
  SpotlightCard,
} from "@/components/ui/primitives";
import { audiences } from "@/content/site";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------------------
 * The brochure is explicit that AI Linc is two-sided: learners on one side,
 * institutions running their own academy on the other. The homepage previously
 * read as B2C only, which undersold half the product.
 * ------------------------------------------------------------------------- */
export default function Audiences() {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <Section id="audiences" className="relative">
      <SectionHeading
        eyebrow={audiences.eyebrow}
        title={audiences.headline}
        accent={audiences.headlineAccent}
        align="center"
      />

      <div className="mt-14 grid gap-5 lg:grid-cols-2">
        {audiences.sides.map((side, i) => {
          const isInstitution = side.key === "institutions";
          return (
            <Reveal key={side.key} delay={0.08 * i} className="h-full">
              <SpotlightCard
                className={cn(
                  "h-full rounded-[1.5rem]",
                  isInstitution ? "panel" : "card grad-border",
                )}
                tint={isInstitution ? "34, 211, 238" : "124, 58, 237"}
              >
                <motion.div
                  onHoverStart={() => setHover(i)}
                  onHoverEnd={() => setHover(null)}
                  animate={{ y: hover === i ? -5 : 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="flex h-full flex-col p-7 sm:p-9"
                >
                  <span
                    className={cn(
                      "inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-[0.65rem] font-bold tracking-[0.16em] uppercase",
                      isInstitution
                        ? "bg-cyan/15 text-cyan"
                        : "bg-lilac text-violet",
                    )}
                  >
                    {side.label}
                  </span>

                  <h3
                    className={cn(
                      "headline mt-5 text-[clamp(1.5rem,3vw,2.1rem)]",
                      isInstitution && "text-white",
                    )}
                  >
                    {side.title}
                  </h3>

                  <p
                    className={cn(
                      "mt-3.5 text-[0.9688rem] leading-relaxed",
                      isInstitution ? "text-white/60" : "lede",
                    )}
                  >
                    {side.body}
                  </p>

                  <ul className="mt-6 flex flex-1 flex-wrap content-start gap-2">
                    {side.points.map((pt) => (
                      <li
                        key={pt}
                        className={cn(
                          "rounded-full border px-3 py-1.5 text-[0.8125rem]",
                          isInstitution
                            ? "border-white/10 bg-white/[0.04] text-white/70"
                            : "border-line bg-surface text-body",
                        )}
                      >
                        {pt}
                      </li>
                    ))}
                  </ul>

                  {/* the admin dashboard capability strip, institutions only */}
                  {isInstitution && (
                    <div className="mt-6 rounded-xl border border-white/[0.07] bg-white/[0.03] p-4">
                      <div className="text-[0.65rem] font-bold tracking-[0.16em] text-white/35 uppercase">
                        Every metric, one view
                      </div>
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {audiences.adminMetrics.map((m) => (
                          <span
                            key={m}
                            className="rounded-md bg-white/[0.06] px-2 py-1 text-[0.7rem] text-white/55"
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-7">
                    <Button
                      href={side.cta.href}
                      variant={isInstitution ? "primary" : "outline"}
                    >
                      {side.cta.label}
                    </Button>
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
