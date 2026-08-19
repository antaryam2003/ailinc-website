"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import Link from "next/link";
import { useCallback, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ============================================================
   REVEAL — standard scroll entrance
   ============================================================ */

export function Reveal({
  children,
  delay = 0,
  y = 26,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ============================================================
   WORD REVEAL — the signature heading animation
   ------------------------------------------------------------
   Each word sits in an overflow-hidden box and rises from below
   with a slight blur and rotation. Reads as type being "set"
   rather than a generic fade.
   ============================================================ */

export function WordReveal({
  text,
  className,
  delay = 0,
  stagger = 0.055,
  as: Tag = "span",
  gradient = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "span" | "h1" | "h2" | "h3" | "p";
  gradient?: boolean;
}) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  if (reduced) {
    return (
      <Tag className={cn(className, gradient && "text-grad")}>{text}</Tag>
    );
  }

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          // pb/-mb gives descenders room so the mask doesn't clip them
          className="inline-block overflow-hidden pb-[0.14em] align-bottom -mb-[0.14em]"
        >
          <motion.span
            className={cn("inline-block", gradient && "text-grad")}
            initial={{ y: "108%", opacity: 0, filter: "blur(6px)", rotate: 2.5 }}
            whileInView={{ y: 0, opacity: 1, filter: "blur(0px)", rotate: 0 }}
            viewport={{ once: true, margin: "-90px" }}
            transition={{
              duration: 0.9,
              delay: delay + i * stagger,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/* ============================================================
   SPOTLIGHT CARD — radial glow tracks the cursor
   ============================================================ */

export function SpotlightCard({
  children,
  className,
  tint = "124, 58, 237",
}: {
  children: ReactNode;
  className?: string;
  /** rgb triplet for the glow */
  tint?: string;
}) {
  const mx = useMotionValue(-500);
  const my = useMotionValue(-500);
  const bg = useMotionTemplate`radial-gradient(340px circle at ${mx}px ${my}px, rgba(${tint},0.10), transparent 72%)`;

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const r = e.currentTarget.getBoundingClientRect();
      mx.set(e.clientX - r.left);
      my.set(e.clientY - r.top);
    },
    [mx, my],
  );

  const onLeave = useCallback(() => {
    mx.set(-500);
    my.set(-500);
  }, [mx, my]);

  return (
    <div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn("group relative overflow-hidden", className)}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: bg }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

/* ============================================================
   MAGNETIC — element leans toward the cursor
   ============================================================ */

export function Magnetic({
  children,
  strength = 0.32,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const x = useSpring(0, { stiffness: 260, damping: 18, mass: 0.4 });
  const y = useSpring(0, { stiffness: 260, damping: 18, mass: 0.4 });

  const onMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x, y }}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.div>
  );
}

/* ============================================================
   SECTION SCAFFOLDING
   ============================================================ */

export function Section({
  id,
  children,
  className,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn("relative scroll-mt-24 px-5 py-24 sm:px-8 md:py-32", className)}
    >
      <div className="mx-auto w-full max-w-[78rem]">{children}</div>
    </section>
  );
}

export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-violet/15 bg-lilac px-3.5 py-1.5",
        className,
      )}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="animate-ring absolute inset-0 rounded-full bg-violet" />
        <span className="relative h-1.5 w-1.5 rounded-full bg-violet" />
      </span>
      <span className="eyebrow">{children}</span>
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  accent,
  sub,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  accent?: string;
  sub?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <h2 className="headline text-[clamp(2rem,4.8vw,3.5rem)]">
        <WordReveal text={title} />
        {accent && (
          <>
            {" "}
            <WordReveal text={accent} gradient delay={0.1} />
          </>
        )}
      </h2>
      {sub && (
        <Reveal delay={0.15}>
          <p
            className={cn(
              "lede max-w-2xl text-[1.0625rem]",
              align === "center" && "mx-auto",
            )}
          >
            {sub}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ============================================================
   BUTTONS
   ============================================================ */

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  magnetic = false,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "dark";
  size?: "md" | "lg";
  className?: string;
  magnetic?: boolean;
}) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto:");

  const base = cn(
    "group relative inline-flex items-center justify-center gap-2 rounded-full font-bold",
    "transition-[transform,box-shadow,background,color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
    "whitespace-nowrap active:scale-[0.97]",
    size === "lg" ? "h-14 px-8 text-[0.975rem]" : "h-12 px-6 text-[0.9rem]",
  );

  const styles = {
    primary:
      "text-white shadow-[0_10px_30px_-8px_rgba(124,58,237,0.55)] hover:shadow-[0_16px_44px_-8px_rgba(236,72,153,0.55)]",
    outline:
      "border border-line bg-surface text-ink shadow-[var(--shadow-card)] hover:border-violet/40 hover:text-violet",
    dark: "bg-ink text-white hover:bg-deep-2",
  }[variant];

  const inner = (
    <>
      {variant === "primary" && (
        <>
          <span
            aria-hidden
            className="absolute inset-0 rounded-full"
            style={{ background: "var(--grad)" }}
          />
          {/* brightening wash on hover */}
          <span
            aria-hidden
            className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-400 group-hover:opacity-100"
            style={{ background: "var(--grad-soft)" }}
          />
        </>
      )}
      <span className="relative z-10">{children}</span>
      <svg
        viewBox="0 0 16 16"
        className="relative z-10 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M3 8h9M8.5 4l4 4-4 4" />
      </svg>
    </>
  );

  const el = isExternal ? (
    <a
      href={href}
      target={href.startsWith("mailto:") ? undefined : "_blank"}
      rel="noreferrer noopener"
      className={cn(base, styles, className)}
    >
      {inner}
    </a>
  ) : (
    <Link href={href} prefetch={false} className={cn(base, styles, className)}>
      {inner}
    </Link>
  );

  return magnetic ? <Magnetic strength={0.22}>{el}</Magnetic> : el;
}

/* ============================================================
   MISC
   ============================================================ */

export function Pill({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-body",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Dev-only marker for placeholder content. Never renders in production. */
export function TodoNote({ children }: { children: ReactNode }) {
  if (process.env.NODE_ENV === "production") return null;
  return (
    <div className="mt-8 flex items-start gap-2.5 rounded-xl border border-amber-300/60 bg-amber-50 px-4 py-3 text-[0.8125rem] leading-relaxed text-amber-900">
      <span className="mt-px shrink-0 rounded bg-amber-200 px-1.5 py-0.5 text-[0.65rem] font-bold tracking-wider">
        TODO
      </span>
      <span>{children}</span>
    </div>
  );
}
