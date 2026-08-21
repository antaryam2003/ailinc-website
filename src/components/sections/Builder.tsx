"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Eyebrow, Reveal, WordReveal } from "@/components/ui/primitives";
import { builder } from "@/content/site";
import { cn } from "@/lib/utils";

/* ============================================================================
 * "What do you want to learn?" — the one interaction worth remembering.
 *
 * This renders a preview of the AI Course Builder's output. It does NOT call
 * the real builder, and the UI says so: overstating it would misrepresent the
 * product. Curated outlines back the suggestion chips; anything else is
 * composed from a scaffold.
 * ========================================================================== */

function outlineFor(topic: string): string[] {
  const key = topic.trim().toLowerCase();
  if (builder.presets[key]) return builder.presets[key];
  const pretty = topic.trim().replace(/\.$/, "");
  return builder.generic.map((m) => m.replace(/\{topic\}/g, pretty));
}

type Phase = "idle" | "thinking" | "done";

export default function Builder() {
  const [value, setValue] = useState("");
  const [topic, setTopic] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const reduced = useReducedMotion();
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
    },
    [],
  );

  const build = (raw?: string) => {
    const t = (raw ?? value).trim();
    if (!t) return;
    timers.current.forEach(clearTimeout);
    setTopic(t);
    setValue(t);
    if (reduced) {
      setPhase("done");
      return;
    }
    setPhase("thinking");
    timers.current = [setTimeout(() => setPhase("done"), 1150)];
  };

  const modules = topic ? outlineFor(topic) : [];

  return (
    <section
      id="builder"
      className="relative scroll-mt-24 overflow-hidden px-5 py-24 sm:px-8 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div
          className="blob drift-c top-[10%] left-[12%] h-[30rem] w-[30rem] opacity-25"
          style={{
            background:
              "radial-gradient(circle, rgba(34,211,238,0.45), rgba(34,211,238,0) 70%)",
          }}
        />
        <div
          className="blob drift-a right-[10%] bottom-[5%] h-[28rem] w-[28rem] opacity-25"
          style={{
            background:
              "radial-gradient(circle, rgba(168,85,247,0.5), rgba(168,85,247,0) 70%)",
          }}
        />
      </div>

      <div className="mx-auto flex w-full max-w-[62rem] flex-col items-center text-center">
        <Reveal>
          <Eyebrow>{builder.eyebrow}</Eyebrow>
        </Reveal>

        <h2 className="headline mt-6 text-[clamp(2rem,5.2vw,3.5rem)]">
          <WordReveal text={builder.headline} />{" "}
          <WordReveal text={builder.headlineAccent} gradient delay={0.1} />
        </h2>

        {/* ---------------- the console ---------------- */}
        <Reveal delay={0.2} className="w-full">
          <div className="panel relative mt-10 overflow-hidden text-left">
            <div
              className="panel-grid pointer-events-none absolute inset-0 opacity-60"
              aria-hidden
            />

            <div className="relative p-5 sm:p-7">
              {/* input row */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  build();
                }}
                className="flex flex-col gap-3 sm:flex-row"
              >
                <label htmlFor="builder-input" className="sr-only">
                  What do you want to learn?
                </label>
                <div className="relative flex-1">
                  <input
                    id="builder-input"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder={builder.placeholder}
                    autoComplete="off"
                    className="h-13 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-[0.9375rem] text-white placeholder:text-white/30 focus:border-cyan/50 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!value.trim()}
                  className="group inline-flex h-13 shrink-0 items-center justify-center gap-2 rounded-xl px-6 text-[0.9375rem] font-bold text-[#0d1020] transition-opacity disabled:opacity-40"
                  style={{ background: "var(--grad-ai)" }}
                >
                  {builder.cta}
                  <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                    →
                  </span>
                </button>
              </form>

              {/* suggestions */}
              <div className="mt-3.5 flex flex-wrap items-center gap-2">
                <span className="text-[0.75rem] text-white/35">Try:</span>
                {builder.suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => build(s)}
                    className="rounded-full border border-white/10 px-3 py-1 text-[0.75rem] text-white/60 transition-colors hover:border-cyan/40 hover:text-cyan"
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* ---------------- output ---------------- */}
              <AnimatePresence mode="wait">
                {phase === "thinking" && (
                  <motion.div
                    key="thinking"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-6 flex items-center gap-2.5 border-t border-white/[0.07] pt-6">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan/15 text-[0.6rem] font-bold text-cyan">
                        AI
                      </span>
                      <span className="text-[0.9375rem] text-white/70">
                        {builder.generating}
                        <span className="animate-caret ml-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 bg-cyan" />
                      </span>
                    </div>
                    <div className="mt-4 space-y-2">
                      {[0, 1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="animate-shimmer h-9 rounded-lg"
                          style={{
                            background:
                              "linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.10) 50%, rgba(255,255,255,0.04) 75%)",
                            animationDelay: `${i * 0.12}s`,
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}

                {phase === "done" && (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="mt-6 border-t border-white/[0.07] pt-6">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <span className="text-[0.65rem] font-bold tracking-[0.16em] text-cyan uppercase">
                          Course generated
                        </span>
                        <span className="text-[1.0625rem] font-bold text-white">
                          {topic}
                        </span>
                      </div>

                      <ul className="mt-4 space-y-2">
                        {modules.map((m, i) => (
                          <motion.li
                            key={`${topic}-${m}`}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.4,
                              delay: reduced ? 0 : i * 0.08,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            className={cn(
                              "flex items-center gap-3 rounded-lg border px-3.5 py-2.5",
                              i === modules.length - 1
                                ? "border-cyan/25 bg-cyan/[0.06]"
                                : "border-white/[0.07] bg-white/[0.03]",
                            )}
                          >
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan/15 text-[0.6rem] font-bold text-cyan">
                              ✓
                            </span>
                            <span className="text-[0.875rem] text-white/80">
                              {i === modules.length - 1
                                ? m
                                : `Module ${i + 1} — ${m}`}
                            </span>
                          </motion.li>
                        ))}
                      </ul>

                      <div className="mt-5 flex flex-wrap items-center gap-3">
                        <a
                          href="https://tour.ailinc.com"
                          target="_blank"
                          rel="noreferrer noopener"
                          className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-[0.875rem] font-bold text-[#0d1020] transition-transform hover:-translate-y-0.5"
                        >
                          Start learning →
                        </a>
                        <span className="text-[0.75rem] text-white/35">
                          {builder.disclaimer}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
