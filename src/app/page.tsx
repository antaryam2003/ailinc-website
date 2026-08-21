import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import Three from "@/components/sections/Three";
import Builder from "@/components/sections/Builder";
import Features from "@/components/sections/Features";
import Audiences from "@/components/sections/Audiences";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import { faq } from "@/content/site";

/**
 * The homepage is one argument, in this order:
 *
 *   1 HERO       AI Linc learns you before it teaches you  (+ prove it, live)
 *   2 TRUST      the numbers behind the claim
 *   3 THREE      the reel, then the doors part on "it starts with you"
 *   4 BUILDER    type a topic, watch a course appear
 *   5 PLATFORM   the real product, screen by screen
 *   6 AUDIENCES  learners on one side, institutions on the other
 *   7 FAQ
 *   8 CTA
 *
 * Every section is downstream of one sentence: AI learns you, adapts to you,
 * teaches you, and lets you create. Copy that drifts back to "we offer AI
 * courses" belongs somewhere else.
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

      <Hero />
      <TrustBar />
      <Three />
      <Builder />
      <Features />
      <Audiences />
      <FAQ />
      <FinalCTA />
    </>
  );
}
