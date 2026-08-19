import type { Metadata } from "next";
import { Button } from "@/components/ui/primitives";
import { brand } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${brand.name} handles personal data.`,
  robots: { index: false, follow: true },
};

/**
 * PLACEHOLDER — intentionally not written by an AI.
 *
 * Privacy policy text has legal force and must reflect what your systems
 * actually do (what you collect, where it is stored, who processes it, how
 * long you keep it, and how a user exercises their rights). Have counsel or
 * your DPO draft it, then replace everything below the heading.
 */
export default function PrivacyPage() {
  return (
    <>
      <h1 className="headline text-[clamp(2rem,4.5vw,3rem)]">
        Privacy Policy
      </h1>

      <div className="mt-8 rounded-xl border border-amber-300/60 bg-amber-50 p-5">
        <p className="text-[0.9375rem] leading-relaxed text-amber-900">
          This policy is being finalised.
        </p>
        <p className="lede mt-3 text-[0.9375rem]">
          We have deliberately not published boilerplate here. A privacy policy
          is a binding statement about how {brand.name} actually collects,
          stores, processes and retains personal data — it needs to be written
          against your real systems and reviewed by counsel, not generated.
        </p>
      </div>

      <p className="lede mt-8 text-[0.9375rem]">
        Until it is published, you can reach us directly with any question about
        your data, including access and deletion requests.
      </p>

      <div className="mt-6 space-y-1.5 text-[0.9375rem]">
        <a
          href={`mailto:${brand.email}`}
          className="block font-medium text-violet transition-colors hover:text-pink"
        >
          {brand.email}
        </a>
        <p className="text-muted">{brand.phone}</p>
        <p className="text-muted">{brand.address}</p>
      </div>

      <div className="mt-10">
        <Button href="/" variant="outline">
          Back to the homepage
        </Button>
      </div>
    </>
  );
}
