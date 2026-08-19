"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { formatNumber } from "@/lib/utils";

/**
 * Counts up to `value` the first time it scrolls into view.
 *
 * Numbers animating into place is one of the few effects that genuinely helps
 * a stats row read as "live product" rather than "static brochure".
 */
export function Counter({
  value,
  decimals = 0,
  suffix = "",
  prefix = "",
  duration = 1.8,
  className,
}: {
  value: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(reduced ? value : 0);

  useEffect(() => {
    if (!inView || reduced) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, value, duration, reduced]);

  // Large round numbers read better abbreviated than as 12,000.
  const shown =
    value >= 10000 && decimals === 0
      ? `${formatNumber(Math.round(display / 1000))}k`
      : formatNumber(display, decimals);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {shown}
      {suffix}
    </span>
  );
}
