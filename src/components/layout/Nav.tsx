"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { Logo } from "@/components/ui/Logo";
import { Magnetic } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";
import { nav } from "@/content/site";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 40,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      {/* Floating pill nav — detaches from the page edge, which reads lighter
          than a full-width bar on a pale background. */}
      <motion.div
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "mx-auto flex h-15 w-full max-w-[78rem] items-center gap-6 rounded-full px-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:px-5",
          scrolled
            ? "glass shadow-[0_8px_32px_-12px_rgba(23,19,31,0.18)]"
            : "border border-transparent bg-transparent",
        )}
      >
        <Link href="/" aria-label="AI Linc home" className="shrink-0">
          <Logo id="nav-logo" />
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex">
          {nav.links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="group relative rounded-full px-4 py-2 text-[0.875rem] font-medium text-body transition-colors duration-300 hover:text-ink"
            >
              <span className="relative z-10">{l.label}</span>
              <span className="absolute inset-0 scale-90 rounded-full bg-lilac opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" />
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden lg:block">
          <Magnetic strength={0.2}>
            <a
              href={nav.cta.href}
              target="_blank"
              rel="noreferrer noopener"
              className="group relative inline-flex h-10 items-center gap-1.5 overflow-hidden rounded-full px-5 text-[0.875rem] font-bold text-white shadow-[0_8px_22px_-8px_rgba(124,58,237,0.6)] transition-shadow duration-300 hover:shadow-[0_12px_30px_-8px_rgba(236,72,153,0.6)]"
            >
              <span
                aria-hidden
                className="absolute inset-0"
                style={{ background: "var(--grad)" }}
              />
              <span className="relative z-10">{nav.cta.label}</span>
              <svg
                viewBox="0 0 16 16"
                className="relative z-10 h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M3 8h9M8.5 4l4 4-4 4" />
              </svg>
            </a>
          </Magnetic>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="ml-auto flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface lg:hidden"
        >
          <span className="relative block h-3 w-4">
            <span
              className={cn(
                "absolute left-0 h-[1.5px] w-full rounded bg-ink transition-all duration-300",
                open ? "top-1.5 rotate-45" : "top-0",
              )}
            />
            <span
              className={cn(
                "absolute top-1.5 left-0 h-[1.5px] w-full rounded bg-ink transition-all duration-300",
                open && "opacity-0",
              )}
            />
            <span
              className={cn(
                "absolute left-0 h-[1.5px] w-full rounded bg-ink transition-all duration-300",
                open ? "top-1.5 -rotate-45" : "top-3",
              )}
            />
          </span>
        </button>

        {/* reading progress, hugging the pill's lower edge */}
        <motion.span
          aria-hidden
          className="absolute inset-x-5 bottom-0 h-[2px] origin-left rounded-full"
          style={{ scaleX: progress, background: "var(--grad)" }}
        />
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="glass mx-auto mt-2 w-full max-w-[78rem] overflow-hidden rounded-3xl lg:hidden"
          >
            <div className="flex flex-col p-4">
              {nav.links.map((l, i) => (
                <motion.div
                  key={l.label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.3 }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-line py-3.5 text-lg font-medium text-ink"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <a
                href={nav.cta.href}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-4 flex h-12 items-center justify-center rounded-full font-bold text-white"
                style={{ background: "var(--grad)" }}
              >
                {nav.cta.label}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
