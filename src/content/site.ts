/* ============================================================================
 * AI LINC — SITE CONTENT
 * ----------------------------------------------------------------------------
 * Every headline, stat, feature and link lives here. Components never hard-code
 * copy — they read from this file.
 *
 *   [BROCHURE] from AI_LINC_Carousel_Final.pdf — the official positioning
 *   [PLATFORM] confirmed from the live product at tour.ailinc.com
 *   [TODO]     placeholder — replace before launch
 *
 * Positioning note: the spine of the whole site is
 *   AI learns you  ->  adapts to you  ->  teaches you  ->  lets you create.
 * Copy that drifts back into generic "we offer AI courses" language is wrong.
 * ========================================================================== */

export const brand = {
  name: "AI Linc",
  /** [BROCHURE] cover line */
  promise: "Education, Reimagined by AI.",
  /** [BROCHURE] logo lockup tagline */
  tagline: "Empowering the world with infinite possibilities of AI",
  email: "careers@ailinc.com",
  phone: "+91 96939 41136",
  address: "Banjara Hills, Hyderabad — 500034, India",
  platformUrl: "https://tour.ailinc.com",
} as const;

/* ---------------------------------------------------------------------------
 * NAV — the two-sided platform is surfaced up front
 * ------------------------------------------------------------------------- */
export const nav = {
  links: [
    { label: "How it works", href: "#three" },
    { label: "Platform", href: "#platform" },
    { label: "For learners", href: "#audiences" },
    { label: "For institutions", href: "#audiences" },
  ],
  cta: { label: "Experience AI Linc", href: brand.platformUrl },
} as const;

/* ---------------------------------------------------------------------------
 * 1. HERO — the claim, then an interactive proof of it
 * ------------------------------------------------------------------------- */
export const hero = {
  eyebrow: "Your learning. Your level. Your path.",
  headline: { line1: "AI Linc learns you", line2: "before it teaches you." },
  sub: "AI-powered learning that adapts to what you already know, teaches what you need next, and lets you build the courses and projects you actually want.",
  primary: { label: "Experience AI Linc", href: brand.platformUrl },
  secondary: { label: "See how it works", href: "#three" },

} as const;

/* ---------------------------------------------------------------------------
 * 2. TRUST — [BROCHURE] these are the official figures
 * ------------------------------------------------------------------------- */
export const trust = {
  line: "One platform. Six breakthroughs. Infinite outcomes.",
  stats: [
    { value: 50000, suffix: "+", text: null, label: "Active learners" },
    { value: 1000, suffix: "+", text: null, label: "Courses" },
    { value: 50, suffix: "+", text: null, label: "Universities" },
    { value: null, suffix: "", text: "Ready", label: "White-label" },
  ],
  partnersLabel: "Jobs aggregated from",
  /** [BROCHURE] the job sources named on the careers page */
  partners: ["LinkedIn", "Naukri", "Indeed", "Internshala", "Glassdoor"],
} as const;

/* ---------------------------------------------------------------------------
 * 3. THREE THINGS — the ownable differentiators
 * ------------------------------------------------------------------------- */
export const three = {
  eyebrow: "Three things nobody else does this way",
  headline: "Not a course library.",
  headlineAccent: "A system that learns you.",
  items: [
    {
      num: "01",
      key: "personalize",
      kicker: "Personalize",
      title: "The course changes with you.",
      /** [BROCHURE] adaptive learning engine */
      points: [
        "Wrong answer → difficulty drops automatically",
        "Right answer → AI cranks up the challenge",
        "AI articles re-explain in simpler words",
        "Built-in IDE — run and submit code instantly",
      ],
      image: "/platform/course-detail.webp",
    },
    {
      num: "02",
      key: "teach",
      kicker: "AI Teacher",
      title: "Your teacher is always there.",
      points: [
        "Ask, discuss, interrupt, practise",
        "Explains your own code back to you",
        "Debugs your errors and says why",
        "AI-generated videos for tough concepts",
      ],
      image: "/platform/dashboard.webp",
    },
    {
      num: "03",
      key: "create",
      kicker: "Create",
      title: "Don't find a course. Create one.",
      /** [BROCHURE] AI Course Builder */
      points: [
        "Title + duration + difficulty → full course",
        "Auto-generates videos, quizzes, assignments",
        "Auto-evaluation — no human grading",
        "Publish-ready in a single click",
      ],
      image: "/platform/courses.webp",
    },
  ],
} as const;

/* ---------------------------------------------------------------------------
 * 3b. THE REVEAL — the payoff behind the doors, inside the pinned Three track
 * ------------------------------------------------------------------------- */
export const reveal = {
  kicker: "It starts",
  accent: "with you.",
  body: "AI Linc first understands what you know, where you're struggling and what you're trying to achieve. Everything after that — the content you see, the difficulty you face, the projects you build — is shaped around that answer.",
  cta: { label: "See what that unlocks", href: "#builder" },
} as const;

/* ---------------------------------------------------------------------------
 * 4. COURSE BUILDER — the memorable interaction
 * ---------------------------------------------------------------------------
 * A preview rendered on the page, not a live call to the real builder. The UI
 * says so, because implying otherwise would misrepresent the product.
 * ------------------------------------------------------------------------- */
export const builder = {
  eyebrow: "Try it",
  headline: "What do you want",
  headlineAccent: "to learn?",
  placeholder: "e.g. AI agents for finance",
  cta: "Build it",
  generating: "Generating your course",
  disclaimer:
    "Preview only. In the platform this produces real videos, quizzes, projects and rubrics.",
  suggestions: [
    "AI agents for finance",
    "Prompt engineering",
    "RAG systems",
    "Computer vision",
  ],
  /** Curated outlines for the suggestion chips; anything else is composed. */
  presets: {
    "ai agents for finance": [
      "Agent fundamentals",
      "Tool calling",
      "Memory & state",
      "Retrieval over filings",
      "Risk & guardrails",
      "Final project — a finance agent",
    ],
    "prompt engineering": [
      "How models read prompts",
      "Structure & constraints",
      "Few-shot patterns",
      "Chain-of-thought & ReAct",
      "Evaluating prompts",
      "Final project — a prompt suite",
    ],
    "rag systems": [
      "Chunking that works",
      "Embeddings & vector stores",
      "Retrieval strategies",
      "Grounding & citations",
      "Evaluation harness",
      "Final project — a production RAG service",
    ],
    "computer vision": [
      "Images as tensors",
      "Convolutions in practice",
      "Detection & segmentation",
      "Vision transformers",
      "Deploying a vision model",
      "Final project — a vision pipeline",
    ],
  } as Record<string, string[]>,
  /** Scaffold used for a topic with no preset. */
  generic: [
    "Foundations of {topic}",
    "Core techniques",
    "Hands-on practice",
    "Applied {topic}",
    "Evaluation & quality",
    "Final project — ship it",
  ],
} as const;

/* ---------------------------------------------------------------------------
 * 5. PLATFORM — real screens, horizontal gallery
 * ------------------------------------------------------------------------- */
export const features = {
  eyebrow: "See it in action",
  headline: "The real platform.",
  headlineAccent: "Not a mockup.",
  sub: "Every screen below is the live product. Scroll across.",
  slides: [
    {
      id: "dashboard",
      num: "01",
      title: "AI knows what you know",
      image: "/platform/gif/01-poster.webp" as string | null,
      gif: "/platform/gif/01.webp" as string | null,
      tags: ["Skill profile", "Daily focus", "Streaks"],
    },
    {
      id: "courses",
      num: "02",
      title: "AI changes what you learn next",
      image: "/platform/gif/02-poster.webp" as string | null,
      gif: "/platform/gif/02.webp" as string | null,
      tags: ["Calibration", "Adaptive difficulty", "Instant feedback"],
    },
    {
      id: "roadmaps",
      num: "03",
      title: "Roadmaps you can follow — or build",
      image: "/platform/gif/03-poster.webp" as string | null,
      gif: "/platform/gif/03.webp" as string | null,
      tags: ["Role, skill & company paths", "Build your own", "Topic → course"],
    },
    {
      id: "ai-tutor",
      num: "04",
      title: "AI teaches you in real time",
      image: "/platform/gif/04-poster.webp" as string | null,
      gif: "/platform/gif/04.webp" as string | null,
      tags: ["Two-way voice", "Shows as it explains", "Interrupt anytime"],
    },
    {
      id: "assessments",
      num: "05",
      title: "Proctored assessments",
      image: "/platform/gif/05-poster.webp" as string | null,
      gif: "/platform/gif/05.webp" as string | null,
      tags: ["Zero plagiarism", "Skill-gap reports", "Institution-grade"],
    },
    {
      id: "mock-interview",
      num: "06",
      title: "Interview like it's real",
      image: "/platform/gif/06-poster.webp" as string | null,
      gif: "/platform/gif/06.webp" as string | null,
      tags: ["Live proctoring", "Instant scoring", "Unlimited sessions"],
    },
    {
      id: "jobs",
      num: "07",
      title: "Every job, just for you",
      image: "/platform/gif/07-poster.webp" as string | null,
      gif: "/platform/gif/07.webp" as string | null,
      tags: ["Auto-matched", "Course-aware", "Zero manual searching"],
    },
    {
      id: "resume",
      num: "08",
      title: "Resume built by AI",
      image: "/platform/gif/08-poster.webp" as string | null,
      gif: "/platform/gif/08.webp" as string | null,
      tags: ["ATS score", "Multiple templates", "Real-time suggestions"],
    },
    {
      id: "live-sessions",
      num: "09",
      title: "Live sessions and mentorship",
      image: "/platform/gif/09-poster.webp" as string | null,
      gif: "/platform/gif/09.webp" as string | null,
      tags: ["Live classes", "Recorded", "Mentors"],
    },
    {
      id: "community",
      num: "10",
      title: "A community the AI keeps alive",
      image: "/platform/gif/10-poster.webp" as string | null,
      gif: "/platform/gif/10.webp" as string | null,
      tags: ["AI-led prompts", "Doubt solving", "Peers + alumni"],
    },
  ],
} as const;

/* ---------------------------------------------------------------------------
 * 6. AUDIENCES — [BROCHURE] the two-sided platform
 * ------------------------------------------------------------------------- */
export const audiences = {
  eyebrow: "Two sides, one platform",
  headline: "Built for the people learning —",
  headlineAccent: "and the people teaching them.",
  sides: [
    {
      key: "learners",
      label: "For learners",
      title: "Learn in a way that fits you.",
      body: "Adaptive courses, an AI tutor that teaches out loud, proctored assessments, unlimited AI interviews, a matched job feed and a resume built from what you actually did.",
      points: [
        "Adaptive learning",
        "AI tutor",
        "Assessments",
        "AI interviews",
        "Jobs",
        "Community",
        "Resume",
      ],
      cta: { label: "Experience AI Linc", href: brand.platformUrl },
    },
    {
      key: "institutions",
      label: "For institutions",
      title: "Run your own academy on it.",
      body: "Generate courses without subject-matter experts, manage content and cohorts, proctor assessments at scale, and see every metric in one dashboard — white-labelled as yours.",
      points: [
        "AI course builder",
        "Content management",
        "Proctored assessments",
        "Admin dashboard",
        "Analytics",
        "White-label",
        "Job posting",
        "Student management",
      ],
      cta: { label: "Book a platform demo", href: `mailto:${brand.email}` },
    },
  ],
  /** [BROCHURE] admin dashboard capability chips */
  adminMetrics: [
    "Daily logins",
    "Time spent",
    "Attendance",
    "Activity trends",
    "Live rankings",
    "Skill scorecards",
    "Streak tracking",
  ],
} as const;

/* ---------------------------------------------------------------------------
 * 7. FAQ
 * ------------------------------------------------------------------------- */
export const faq = {
  eyebrow: "FAQ",
  headline: "Questions, answered.",
  items: [
    {
      q: "What actually makes AI Linc different?",
      a: "Most platforms play the same course for everyone. AI Linc assesses you first, builds a live model of what you know, then reshapes the content, the difficulty and the sequence around it. On top of that an AI tutor teaches you directly — and anyone can generate a complete course from a single sentence.",
    },
    {
      q: "How does the adaptive part work in practice?",
      a: "A calibration assessment sets your baseline. After that every answer moves you: get something wrong and the difficulty drops and the material is re-explained in simpler words; get it right and it cranks up. Your weakest topic is always surfaced as the thing to do next.",
    },
    {
      q: "Do I need coding experience to start?",
      a: "No. The calibration decides where you begin, so a complete beginner and an experienced engineer follow genuinely different paths through the same course. If you have never written code, it starts you there rather than assuming.",
    },
    {
      q: "What is the AI tutor, exactly?",
      a: "A two-way tutor you can talk to. It explains out loud, puts the material on screen as it goes, quizzes you, reads your own code back to you and debugs your errors with an explanation. You can interrupt it mid-sentence or ask it to slow down.",
    },
    {
      q: "Can I really generate my own course?",
      a: "Yes. Give it a title, a duration and a difficulty and the AI Course Builder produces the modules, videos, quizzes, assignments and rubrics — auto-evaluated, publish-ready, with no subject-matter expert involved.",
    },
    {
      q: "How do assessments and interviews stay credible?",
      a: "Assessments are proctored: live face detection, tab-switch and window-change flagging, fullscreen enforcement and screen recording, with topic-wise scoring and skill-gap analysis. Interviews are AI-run with speech recognition and per-question scoring, and you get a performance summary and improvement areas.",
    },
    {
      q: "What happens on the jobs side?",
      a: "Roles are scraped from LinkedIn, Naukri, Indeed, Internshala and Glassdoor into one feed and matched to your skills and the courses you have completed. Your resume is auto-built from that same evidence, with an ATS score and a job-description compatibility check.",
    },
    {
      q: "Can my college or company run its own instance?",
      a: "Yes. AI Linc is white-label ready — your branding, your domain, your curriculum, with admin controls, analytics and student management.",
    },
    {
      q: "Can I try it before signing up?",
      a: `Yes — the full platform is open at ${brand.platformUrl}. Pick a role and every module is switched on. No credit card, no sales call.`,
    },
  ],
} as const;

/* ---------------------------------------------------------------------------
 * 8. FINAL CTA
 * ------------------------------------------------------------------------- */
export const finalCta = {
  headline: "Don't take another course.",
  headlineAccent: "Experience learning that adapts to you.",
  sub: "Assess. Understand. Adapt. Teach. Build. All in one platform.",
  primary: { label: "Experience AI Linc", href: brand.platformUrl },
  secondary: { label: "Book a platform demo", href: `mailto:${brand.email}` },
} as const;

/* ---------------------------------------------------------------------------
 * FOOTER
 * ------------------------------------------------------------------------- */
export const footer = {
  blurb:
    "An AI-native learning platform. It learns you, adapts to you, teaches you — and lets you create the course you actually need.",
  columns: [
    {
      title: "Product",
      links: [
        { label: "How it works", href: "#three" },
        { label: "The platform", href: "#platform" },
        { label: "Build a course", href: "#builder" },
        { label: "Live demo", href: brand.platformUrl },
      ],
    },
    {
      title: "For learners",
      links: [
        { label: "Adaptive courses", href: "#three" },
        { label: "AI tutor", href: "#three" },
        { label: "Interviews & jobs", href: "#platform" },
        { label: "FAQ", href: "#faq" },
      ],
    },
    {
      title: "For institutions",
      links: [
        { label: "AI course builder", href: "#audiences" },
        { label: "Admin & analytics", href: "#audiences" },
        { label: "White-label", href: "#audiences" },
        { label: "Book a demo", href: `mailto:${brand.email}` },
      ],
    },
    {
      title: "Contact",
      links: [
        { label: brand.email, href: `mailto:${brand.email}` },
        { label: brand.phone, href: `tel:${brand.phone.replace(/\s/g, "")}` },
      ],
    },
  ],
  legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
} as const;
