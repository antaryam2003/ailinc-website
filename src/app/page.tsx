import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import About from "@/components/sections/About";
import Problem from "@/components/sections/Problem";
import Why from "@/components/sections/Why";
import Features from "@/components/sections/Features";
import Walkthrough from "@/components/sections/Walkthrough";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import { faq } from "@/content/site";

/**
 * Section order follows the agreed flow:
 *   hero + live dashboard → trust → about → problem (pinned reel) → solution
 *   → why → features (horizontal gallery) → video + founder → FAQ → CTA
 * The Problem component renders its own "That's why we built AI Linc" beat
 * immediately after the pinned section, so nothing sits between them.
 */
export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.items.map((i) => ({
              "@type": "Question",
              name: i.q,
              acceptedAnswer: { "@type": "Answer", text: i.a },
            })),
          }),
        }}
      />

      <div id="platform" className="scroll-mt-24" />
      <Hero />
      <TrustBar />
      <About />
      <Problem />
      <Why />
      <Features />
      <Walkthrough />
      <FAQ />
      <FinalCTA />
    </>
  );
}
