import { Button } from "@/components/ui/primitives";
import { LogoMark } from "@/components/ui/Logo";
import { brand } from "@/content/site";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[82vh] items-center justify-center overflow-hidden px-5 py-32">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="grid-lines absolute inset-0" />
        <div
          className="blob drift-a top-[-15%] left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 opacity-40"
          style={{
            background:
              "radial-gradient(circle, rgba(168,85,247,0.5), rgba(168,85,247,0) 68%)",
          }}
        />
      </div>

      <div className="flex flex-col items-center text-center">
        <LogoMark className="h-10 w-auto" id="nf-logo" />
        <p className="eyebrow mt-8">Error 404</p>
        <h1 className="display mt-4 text-[clamp(2.25rem,6vw,4rem)]">
          This page isn&apos;t <span className="text-grad">on the path.</span>
        </h1>
        <p className="lede mt-5 max-w-md">
          The link is broken or the page has moved. The platform itself is always
          one click away.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href="/" magnetic>
            Back to the homepage
          </Button>
          <Button href={brand.platformUrl} variant="outline" magnetic>
            Experience AI Linc
          </Button>
        </div>
      </div>
    </div>
  );
}
