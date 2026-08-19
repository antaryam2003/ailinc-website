"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Reveal, TodoNote, WordReveal } from "@/components/ui/primitives";
import { walkthrough } from "@/content/site";
import { asset } from "@/lib/site";

export default function Walkthrough() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const play = () => {
    const v = videoRef.current;
    if (!v) return;
    void v.play();
    setPlaying(true);
  };

  const f = walkthrough.founder;

  return (
    <section
      id="walkthrough"
      className="relative scroll-mt-24 overflow-hidden bg-deep px-5 py-24 text-white sm:px-8 md:py-32"
    >
      {/* backdrop */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="blob drift-a top-[-20%] left-[-5%] h-[34rem] w-[34rem] opacity-40"
          style={{
            background:
              "radial-gradient(circle, rgba(124,58,237,0.8), rgba(124,58,237,0) 68%)",
          }}
        />
        <div
          className="blob drift-b right-[-8%] bottom-[-25%] h-[30rem] w-[30rem] opacity-35"
          style={{
            background:
              "radial-gradient(circle, rgba(236,72,153,0.7), rgba(236,72,153,0) 68%)",
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-[78rem]">
        <div className="max-w-2xl">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[0.6875rem] font-bold tracking-[0.2em] text-white/80 uppercase backdrop-blur-sm">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ring absolute inset-0 rounded-full bg-pink" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-pink" />
              </span>
              {walkthrough.eyebrow}
            </span>
          </Reveal>
          <h2 className="headline mt-6 text-[clamp(1.9rem,4.4vw,3rem)] text-white">
            <WordReveal text={walkthrough.headline} />
          </h2>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-10">
          {/* ---------------- video ---------------- */}
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-white/12 bg-white/5 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.7)]">
              <div className="relative aspect-video">
                {walkthrough.videoSrc ? (
                  <video
                    ref={videoRef}
                    src={asset(walkthrough.videoSrc)}
                    poster={asset(walkthrough.poster) ?? undefined}
                    controls={playing}
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Image
                    src={asset(walkthrough.poster)}
                    alt="The AI Linc platform dashboard"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 100vw, 46rem"
                  />
                )}

                {!playing && (
                  <button
                    type="button"
                    onClick={play}
                    disabled={!walkthrough.videoSrc}
                    aria-label={
                      walkthrough.videoSrc
                        ? "Play the platform walkthrough"
                        : "Walkthrough video coming soon"
                    }
                    className="group absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-t from-deep/85 via-deep/35 to-deep/10"
                  >
                    <span
                      className="relative flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full text-white shadow-[0_16px_50px_-8px_rgba(236,72,153,0.8)] transition-transform duration-400 group-hover:scale-110"
                      style={{ background: "var(--grad)" }}
                    >
                      <span
                        className="animate-ring absolute inset-0 rounded-full"
                        style={{ background: "var(--grad)" }}
                      />
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="relative ml-1 h-7 w-7"
                        aria-hidden
                      >
                        <path d="M8 5.2a1 1 0 0 1 1.5-.87l9.5 5.5a1 1 0 0 1 0 1.73l-9.5 5.5A1 1 0 0 1 8 16.2z" />
                      </svg>
                    </span>
                    <span className="rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-[0.8125rem] font-medium text-white backdrop-blur-sm">
                      {walkthrough.videoSrc
                        ? `Watch the walkthrough · ${walkthrough.duration}`
                        : "Add /public/tour.mp4 to enable"}
                    </span>
                  </button>
                )}
              </div>

              {/* chapters */}
              <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-white/10 px-5 py-4">
                {walkthrough.chapters.map((c) => (
                  <span
                    key={c.time}
                    className="flex items-center gap-2 text-[0.8125rem] text-white/55 transition-colors hover:text-white"
                  >
                    <span className="font-mono text-[0.7rem] text-pink tabular-nums">
                      {c.time}
                    </span>
                    {c.label}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* ---------------- founder's note ---------------- */}
          <Reveal delay={0.12}>
            <div className="relative flex h-full flex-col rounded-3xl border border-white/12 bg-white/[0.06] p-7 backdrop-blur-sm sm:p-8">
              <span
                className="absolute -top-3 left-7 rounded-full px-3 py-1 text-[0.65rem] font-bold tracking-[0.18em] text-white uppercase"
                style={{ background: "var(--grad)" }}
              >
                {f.eyebrow}
              </span>

              <svg
                viewBox="0 0 32 24"
                className="h-7 w-9 text-white/20"
                fill="currentColor"
                aria-hidden
              >
                <path d="M13 24V13.2C13 6.3 8.9 1.4 1.6 0L0 3.4c4.4 1 6.6 3.6 6.6 6.7H0V24h13zm19 0V13.2C32 6.3 27.9 1.4 20.6 0L19 3.4c4.4 1 6.6 3.6 6.6 6.7H19V24h13z" />
              </svg>

              <div className="mt-5 flex-1 space-y-4">
                {f.quote.map((para, i) => (
                  <p
                    key={i}
                    className="text-[0.975rem] leading-relaxed text-white/75"
                  >
                    {para}
                  </p>
                ))}
              </div>

              <div className="mt-7 flex items-center gap-3.5 border-t border-white/10 pt-6">
                {f.photo ? (
                  <Image
                    src={asset(f.photo)}
                    alt={f.name}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                ) : (
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-full text-[0.9rem] font-black text-white"
                    style={{ background: "var(--grad)" }}
                  >
                    AL
                  </span>
                )}
                <div>
                  <div className="text-[0.9375rem] font-bold text-white">
                    {f.name}
                  </div>
                  <div className="text-[0.8125rem] text-white/50">{f.role}</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <TodoNote>{walkthrough.note}</TodoNote>
      </div>
    </section>
  );
}
