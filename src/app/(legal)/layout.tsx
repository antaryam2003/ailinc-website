import type { ReactNode } from "react";

/** Narrow, quiet shell for long-form legal copy. */
export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative px-5 pt-36 pb-28 sm:px-8">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-80 opacity-40"
        style={{
          background:
            "radial-gradient(50% 60% at 50% 0%, color-mix(in oklab, var(--color-accent) 16%, transparent), transparent 70%)",
        }}
        aria-hidden
      />
      <article className="mx-auto w-full max-w-2xl">{children}</article>
    </div>
  );
}
