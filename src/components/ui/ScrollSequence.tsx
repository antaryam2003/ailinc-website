"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useReducedMotion, type MotionValue } from "motion/react";
import { asset } from "@/lib/site";
import { cn } from "@/lib/utils";

/* ============================================================================
 * A frame sequence scrubbed by scroll.
 *
 * Why not a GIF: a GIF plays on its own timeline and cannot be seeked, so it
 * can't be driven by the scrollbar at all.
 * Why not a <video>: seeking a video on every scroll frame stutters badly on
 * iOS Safari, which is where a hero animation most needs to behave.
 *
 * So: decoded images drawn to a canvas, one per scroll position. This is the
 * technique Apple uses for the same effect, and it behaves identically in every
 * browser.
 *
 * Loading is progressive — frame 1 paints immediately and the rest stream in
 * behind it, so the hero is never blank and never blocks on 1.3 MB.
 * ========================================================================== */

export function ScrollSequence({
  progress,
  count,
  path,
  width,
  height,
  alt,
  className,
}: {
  /** 0 → 1 drives frame 1 → last. */
  progress: MotionValue<number>;
  count: number;
  /** e.g. "/platform/hero" — frames are `${path}/f001.webp` upward. */
  path: string;
  width: number;
  height: number;
  alt: string;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frames = useRef<(HTMLImageElement | null)[]>([]);
  const loaded = useRef<boolean[]>([]);
  const current = useRef(-1);
  const raf = useRef(0);
  const pending = useRef(0);
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);

  const src = (i: number) =>
    asset(`${path}/f${String(i + 1).padStart(3, "0")}.webp`);

  /* -- draw the nearest frame we actually have decoded ------------------- */
  const draw = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let i = Math.max(0, Math.min(count - 1, index));

    // Walk backwards to the closest loaded frame so scrubbing never blanks
    // while later frames are still streaming in.
    let probe = i;
    while (probe >= 0 && !loaded.current[probe]) probe -= 1;
    if (probe < 0) return;
    i = probe;

    if (i === current.current) return;
    const img = frames.current[i];
    if (!img) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    current.current = i;
  };

  /* -- preload ------------------------------------------------------------ */
  useEffect(() => {
    frames.current = new Array(count).fill(null);
    loaded.current = new Array(count).fill(false);
    let cancelled = false;

    const load = (i: number) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.decoding = "async";
        if (i === 0) img.fetchPriority = "high";
        img.src = src(i);
        img.onload = () => {
          if (cancelled) return resolve();
          frames.current[i] = img;
          loaded.current[i] = true;
          if (i === 0) {
            setReady(true);
            draw(0);
          }
          resolve();
        };
        img.onerror = () => resolve();
      });

    /**
     * Interleaved, coarse-to-fine. Loading 1..N in order would mean the back
     * half of the scroll has nothing to draw until almost everything has
     * arrived. Instead: every 8th frame, then every 4th, then every 2nd, then
     * the rest — so the whole scroll range is scrubbable after roughly a tenth
     * of the bytes, and simply gets smoother as the rest lands. draw() already
     * falls back to the nearest loaded frame, which is what makes this work.
     */
    const order: number[] = [];
    const seen = new Set<number>();
    for (const step of [8, 4, 2, 1]) {
      for (let i = 0; i < count; i += step) {
        if (!seen.has(i)) {
          seen.add(i);
          order.push(i);
        }
      }
    }

    // Frame 1 first and alone, so the hero paints as fast as a single image.
    load(0).then(async () => {
      const queue = order.filter((i) => i !== 0);
      const workers = 6;
      await Promise.all(
        Array.from({ length: workers }, async () => {
          while (queue.length && !cancelled) {
            const i = queue.shift();
            if (i === undefined) break;
            await load(i);
          }
        }),
      );
    });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, path]);

  /* -- scrub -------------------------------------------------------------- */
  useMotionValueEvent(progress, "change", (v) => {
    if (reduced) return;
    pending.current = Math.round(v * (count - 1));
    if (raf.current) return;
    raf.current = requestAnimationFrame(() => {
      raf.current = 0;
      draw(pending.current);
    });
  });

  useEffect(
    () => () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    },
    [],
  );

  return (
    <div className={cn("relative", className)}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        role="img"
        aria-label={alt}
        className={cn(
          "block h-auto w-full transition-opacity duration-500",
          ready ? "opacity-100" : "opacity-0",
        )}
      />
      {/* Holds layout and colour before the first frame decodes. */}
      {!ready && (
        <div
          className="absolute inset-0 bg-[#f6f4fb]"
          style={{ aspectRatio: `${width} / ${height}` }}
          aria-hidden
        />
      )}
    </div>
  );
}
