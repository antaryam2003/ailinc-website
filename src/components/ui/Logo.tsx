import { cn } from "@/lib/utils";

/**
 * The AI Linc mark — the interlocking double-loop from the product's own
 * lockup, filled with the platform's violet→pink brand gradient.
 */
export function LogoMark({
  className,
  id = "linc-grad",
  mono,
}: {
  className?: string;
  /** Must be unique per instance — duplicate gradient ids break in Safari. */
  id?: string;
  /** Render flat white, for use on dark bands. */
  mono?: boolean;
}) {
  return (
    <svg
      viewBox="85 -8 300 256"
      className={cn("shrink-0", className)}
      role="img"
      aria-label="AI Linc"
    >
      {!mono && (
        <defs>
          <linearGradient
            id={id}
            x1="100"
            y1="10"
            x2="365"
            y2="230"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#7C3AED" />
            <stop offset="0.55" stopColor="#A855F7" />
            <stop offset="1" stopColor="#EC4899" />
          </linearGradient>
        </defs>
      )}
      <g transform="rotate(-7 200 120)">
        <path
          d="M 200 120 C 150 48.5, 105 48.5, 100 120 C 95 191.5, 150 191.5, 200 120 C 282.5 10, 356.75 10, 365 120 C 373.25 230, 282.5 230, 200 120 Z M 200 120 C 164 69, 129.6 69, 126 120 C 122.4 171, 164 171, 200 120 C 268.5 34, 332.15 34, 339 120 C 345.85 206, 268.5 206, 200 120 Z"
          fill={mono ? "currentColor" : `url(#${id})`}
          fillRule="evenodd"
        />
      </g>
    </svg>
  );
}

export function Logo({
  className,
  mono,
  id,
}: {
  className?: string;
  mono?: boolean;
  id?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="h-6 w-auto" mono={mono} id={id} />
      <span
        className={cn(
          "text-[1.0625rem] font-bold tracking-[-0.03em]",
          mono ? "text-white" : "text-ink",
        )}
      >
        AI&nbsp;Linc
      </span>
    </span>
  );
}
