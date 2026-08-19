import type { Metadata } from "next";
import { Button } from "@/components/ui/primitives";
import { brand } from "@/content/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `The terms governing use of ${brand.name}.`,
  robots: { index: false, follow: true },
};

/**
 * PLACEHOLDER — see the note in privacy/page.tsx. Terms of service govern
 * refunds, IP ownership of learner projects, acceptable use and liability.
 * Those are commercial decisions plus legal review, not copy to be drafted here.
 */
export default function TermsPage() {
  return (
    <>
      <h1 className="headline text-[clamp(2rem,4.5vw,3rem)]">
        Terms &amp; Conditions
      </h1>

      <div className="mt-8 rounded-xl border border-amber-300/60 bg-amber-50 p-5">
        <p className="text-[0.9375rem] leading-relaxed text-amber-900">
          These terms are being finalised.
        </p>
        <p className="lede mt-3 text-[0.9375rem]">
          Rather than publish generic text, we have left this for your team.
          Terms decide real questions — refund windows, who owns the projects a
          learner builds, acceptable use of the platform, and limits of
          liability. Those are your commercial calls, confirmed by counsel.
        </p>
      </div>

      <p className="lede mt-8 text-[0.9375rem]">
        For questions about enrolment, institutional agreements or anything
        contractual, contact us directly.
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
