"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Edge-masked infinite marquee.
 *
 * The children are rendered twice and the track translates exactly -50%, so the
 * seam is invisible and the loop needs no JS.
 */
export function Marquee({
  children,
  speed = 40,
  reverse = false,
  className,
}: {
  children: ReactNode;
  /** Seconds for one full pass. Higher = slower. */
  speed?: number;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("marquee-mask relative overflow-hidden", className)}>
      <div
        className="animate-marquee flex w-max items-center gap-4 hover:[animation-play-state:paused]"
        style={{
          ["--marquee-duration" as string]: `${speed}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        <div className="flex shrink-0 items-center gap-4">{children}</div>
        <div className="flex shrink-0 items-center gap-4" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
