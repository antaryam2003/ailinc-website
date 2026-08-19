"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Light browser chrome used to frame every product screenshot.
 *
 * Deliberately shows no address bar — the frame is there to make a screenshot
 * read as a running app, not to advertise the demo URL.
 */
export function AppWindow({
  children,
  className,
  bodyClassName,
  glow = true,
  compact = false,
}: {
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  glow?: boolean;
  compact?: boolean;
}) {
  return (
    <div className={cn("relative", className)}>
      {glow && (
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-x-8 top-8 -bottom-8 -z-10 rounded-[3rem] opacity-45 blur-3xl"
          style={{ background: "var(--grad)" }}
        />
      )}

      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border border-line bg-surface",
          "shadow-[0_2px_6px_rgba(23,19,31,0.06),0_40px_90px_-30px_rgba(23,19,31,0.30)]",
        )}
      >
        {/* chrome */}
        <div
          className={cn(
            "flex items-center gap-3 border-b border-line bg-canvas-2/70 px-4",
            compact ? "py-2" : "py-2.5",
          )}
        >
          <div className="flex shrink-0 gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
          {/* neutral placeholder bar — keeps the chrome balanced without a URL */}
          <div className="mx-auto h-4 w-1/3 max-w-40 rounded-full bg-line/70" />
          <div className="w-12 shrink-0" />
        </div>

        <div className={cn("relative bg-surface", bodyClassName)}>{children}</div>
      </div>
    </div>
  );
}
