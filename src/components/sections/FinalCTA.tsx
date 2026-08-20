"use client";

import { motion } from "motion/react";
import { Button, Reveal, WordReveal } from "@/components/ui/primitives";
import { LogoMark } from "@/components/ui/Logo";
import { finalCta } from "@/content/site";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden px-5 py-28 sm:px-8 md:py-36">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="grid-lines absolute inset-0" />
        <div
          className="blob drift-a bottom-[-40%] left-1/2 h-[42rem] w-[54rem] -translate-x-1/2 opacity-40"
          style={{
            background:
              "radial-gradient(circle, rgba(168,85,247,0.55), rgba(168,85,247,0) 66%)",
          }}
        />
        <div
          className="blob drift-c right-[8%] bottom-[-25%] h-[30rem] w-[30rem] opacity-35"
          style={{
            background:
              "radial-gradient(circle, rgba(236,72,153,0.5), rgba(236,72,153,0) 68%)",
          }}
        />
      </div>

      <div className="mx-auto flex w-full max-w-[78rem] flex-col items-center text-center">
        <Reveal>
          <motion.div
            animate={{ rotate: [0, 5, 0, -5, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          >
            <LogoMark className="h-12 w-auto" id="cta-logo" />
          </motion.div>
        </Reveal>

        <h2 className="display mt-9 max-w-4xl text-[clamp(2rem,5.6vw,4rem)]">
          <WordReveal text={finalCta.headline} as="span" className="block" />
          <WordReveal
            text={finalCta.headlineAccent}
            as="span"
            className="block"
            gradient
            delay={0.12}
          />
        </h2>

        <Reveal delay={0.22}>
          <p className="lede mt-7 max-w-lg text-[1.0625rem] sm:text-[1.15rem]">
            {finalCta.sub}
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-11 flex flex-col items-center gap-3 sm:flex-row">
            <Button href={finalCta.primary.href} size="lg" magnetic>
              {finalCta.primary.label}
            </Button>
            <Button
              href={finalCta.secondary.href}
              variant="outline"
              size="lg"
              magnetic
            >
              {finalCta.secondary.label}
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.36}>
          <p className="mt-7 text-[0.8125rem] text-muted">
            Full platform demo, every module unlocked — no credit card.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
