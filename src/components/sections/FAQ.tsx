"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Reveal, Section, SectionHeading } from "@/components/ui/primitives";
import { faq } from "@/content/site";
import { cn } from "@/lib/utils";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq">
      <div className="grid gap-10 lg:grid-cols-[19rem_minmax(0,1fr)] lg:gap-16">
        <div>
          <div className="lg:sticky lg:top-28">
            <SectionHeading eyebrow={faq.eyebrow} title={faq.headline} />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q} delay={0.04 * i}>
                <div
                  className={cn(
                    "card overflow-hidden transition-colors duration-400",
                    isOpen && "border-violet/25",
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-start gap-4 px-6 py-5 text-left sm:px-7"
                  >
                    <span
                      className={cn(
                        "mt-0.5 text-[0.75rem] font-black transition-colors duration-300 tabular-nums",
                        isOpen ? "text-violet" : "text-faint",
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "flex-1 text-[1.05rem] font-bold tracking-[-0.02em] transition-colors duration-300",
                        isOpen ? "text-ink" : "text-ink/75 group-hover:text-ink",
                      )}
                    >
                      {item.q}
                    </span>
                    <span
                      aria-hidden
                      className={cn(
                        "relative mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]",
                        isOpen ? "rotate-135 text-white" : "text-body",
                      )}
                      style={isOpen ? { background: "var(--grad)" } : undefined}
                    >
                      <span className="absolute h-[1.5px] w-2.5 rounded bg-current" />
                      <span className="absolute h-2.5 w-[1.5px] rounded bg-current" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="lede px-6 pb-6 pl-[3.4rem] text-[0.9688rem] sm:px-7 sm:pl-[3.65rem]">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
