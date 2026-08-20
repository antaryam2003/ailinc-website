"use client";

import { Marquee } from "@/components/ui/Marquee";
import { Counter } from "@/components/ui/Counter";
import { Reveal, WordReveal } from "@/components/ui/primitives";
import { trust } from "@/content/site";

export default function TrustBar() {
  return (
    <section className="relative px-5 py-16 sm:px-8 md:py-20">
      <div className="mx-auto w-full max-w-[78rem]">
        <h2 className="headline mx-auto max-w-3xl text-center text-[clamp(1.35rem,3vw,2rem)]">
          <WordReveal text={trust.line} />
        </h2>

        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {trust.stats.map((s, i) => (
            <Reveal key={s.label} delay={0.07 * i}>
              <div className="card grad-border group h-full px-6 py-7 text-center transition-transform duration-500 hover:-translate-y-1.5">
                <div className="text-[clamp(1.9rem,4.2vw,2.9rem)] leading-none font-black tracking-[-0.04em]">
                  <span className="text-grad">
                    {/* one stat is a word ("Ready"), not a number */}
                    {s.value === null ? (
                      s.text
                    ) : (
                      <Counter value={s.value} suffix={s.suffix} />
                    )}
                  </span>
                </div>
                <div className="mt-3 text-[0.9375rem] font-bold text-ink">
                  {s.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-16 text-center text-[0.7rem] font-bold tracking-[0.2em] text-faint uppercase">
            {trust.partnersLabel}
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <Marquee speed={38} className="mt-8">
            {trust.partners.map((name) => (
              <span
                key={name}
                className="px-8 text-[1.15rem] font-bold tracking-[-0.02em] whitespace-nowrap text-muted/60 transition-colors duration-300 hover:text-ink"
              >
                {name}
              </span>
            ))}
          </Marquee>
        </Reveal>
      </div>
    </section>
  );
}
