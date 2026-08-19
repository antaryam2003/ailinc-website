import Link from "next/link";
import { Logo, LogoMark } from "@/components/ui/Logo";
import { brand, footer } from "@/content/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-deep text-white/70">
      {/* brand wash + oversized watermark */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[64rem] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{ background: "var(--grad)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 -bottom-32 opacity-[0.045]"
        aria-hidden
      >
        <LogoMark className="h-80 w-auto" mono />
      </div>

      <div className="relative mx-auto w-full max-w-[78rem] px-5 py-16 sm:px-8 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2.7fr]">
          <div>
            <Logo mono id="footer-logo" />
            <p className="mt-5 max-w-xs text-[0.9375rem] leading-relaxed text-white/55">
              {footer.blurb}
            </p>
            <p className="mt-6 text-[0.8125rem] text-white/40">{brand.address}</p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footer.columns.map((col) => (
              <div key={col.title}>
                <h3 className="mb-4 text-[0.8125rem] font-bold tracking-wide text-white">
                  {col.title}
                </h3>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      {l.href.startsWith("http") ||
                      l.href.startsWith("mailto:") ||
                      l.href.startsWith("tel:") ? (
                        <a
                          href={l.href}
                          target={l.href.startsWith("http") ? "_blank" : undefined}
                          rel="noreferrer noopener"
                          className="text-[0.8125rem] break-words text-white/55 transition-colors hover:text-white"
                        >
                          {l.label}
                        </a>
                      ) : (
                        <Link
                          href={l.href}
                          prefetch={false}
                          className="text-[0.8125rem] text-white/55 transition-colors hover:text-white"
                        >
                          {l.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 h-px w-full bg-white/10" />

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/40">
            © {year} {brand.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {footer.legal.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                prefetch={false}
                className="text-xs text-white/40 transition-colors hover:text-white/70"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
