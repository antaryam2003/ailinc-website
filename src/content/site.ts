/* ============================================================================
 * AI LINC — SITE CONTENT
 * ----------------------------------------------------------------------------
 * Every headline, stat, feature and link lives here. Components never hard-code
 * copy — they read from this file.
 *
 *   [VERIFIED] confirmed from the live platform at tour.ailinc.com
 *   [TODO]     placeholder — replace before launch
 * ========================================================================== */

export const brand = {
  name: "AI Linc",
  tagline: "Learn with intent. Graduate job-ready.",
  email: "careers@ailinc.com",
  phone: "+91 96939 41136",
  address: "Banjara Hills, Hyderabad — 500034, India",
  platformUrl: "https://tour.ailinc.com",
  demoPassword: "AiLinc@2026",
} as const;

/* ---------------------------------------------------------------------------
 * NAV
 * ------------------------------------------------------------------------- */
export const nav = {
  links: [
    { label: "Platform", href: "#platform" },
    { label: "Why AI Linc", href: "#why" },
    { label: "Features", href: "#features" },
    { label: "FAQ", href: "#faq" },
  ],
  cta: { label: "Experience AI Linc", href: brand.platformUrl },
} as const;

/* ---------------------------------------------------------------------------
 * 1. HERO
 * ------------------------------------------------------------------------- */
export const hero = {
  eyebrow: "The future of learning AI is here",
  /** Rendered word-by-word; the second line carries the gradient. */
  headline: { line1: "Don't just learn AI.", line2: "Build with it." },
  sub: "Learn, build and master real-world AI through hands-on projects, expert guidance and an AI-powered learning platform.",
  primary: { label: "Explore Programs", href: "#features" },
  secondary: { label: "Experience AI Linc", href: brand.platformUrl },
  /** Floating chips over the hero window. */
  chips: [
    { label: "23-day streak", tone: "pink" },
    { label: "AI tuned to you", tone: "violet" },
  ],
} as const;

/* ---------------------------------------------------------------------------
 * 2. TRUST — stats + partners
 * ------------------------------------------------------------------------- */
export const trust = {
  line: "Built for learners who want to go beyond theory",
  stats: [
    { value: 10000, suffix: "+", label: "Learners", hint: "TODO — confirm" },
    { value: 500, suffix: "+", label: "Projects built", hint: "TODO — confirm" },
    { value: 50, suffix: "+", label: "Mentors", hint: "TODO — confirm" },
    { value: 12, suffix: "+", label: "Institutions", hint: "TODO — confirm" },
  ],
  partnersLabel: "Partnered with",
  /** [TODO] Replace with real partners. Drop SVG/PNG logos in /public/partners/
   *  and swap this array for { name, logo } objects. */
  partners: [
    "ZSkillUp",
    "Impacteers",
    "EdExcel Global",
    "be10x",
    "UTB University",
    "Razorpay",
    "Zerodha",
  ],
  note: "TODO — replace the four numbers and the partner list with real, substantiated data.",
} as const;

/* ---------------------------------------------------------------------------
 * 3. ABOUT
 * ------------------------------------------------------------------------- */
export const about = {
  eyebrow: "About AI Linc",
  headline: "One platform for the whole journey —",
  headlineAccent: "from first lesson to first offer.",
  body: "AI Linc is an AI-native learning platform. Courses adapt to your level in real time, an AI student model tracks exactly where you are weak, and everything you build becomes portfolio evidence. Assessments, mock interviews, live mentorship and a matched job board all live in the same place, so nothing about your progress gets lost between tools.",
  pillars: [
    { k: "Adaptive", v: "Courses retune to your level after every quiz." },
    { k: "Hands-on", v: "Projects and coding tasks, not passive video." },
    { k: "Career-linked", v: "Mock interviews and jobs matched to real skills." },
  ],
} as const;

/* ---------------------------------------------------------------------------
 * 4. THE PROBLEM — vertical sliding panel
 * ------------------------------------------------------------------------- */
export const problem = {
  eyebrow: "The problem",
  headline: "Why most people never get past",
  headlineAccent: "watching tutorials.",
  items: [
    {
      num: "01",
      title: "Too Much Content",
      body: "Thousands of tutorials. No clear path.",
      detail:
        "Every playlist starts at the beginning. None of them tell you what to do next, or what you can safely skip.",
    },
    {
      num: "02",
      title: "Too Much Theory",
      body: "You understand concepts but can't build anything.",
      detail:
        "You can explain how a transformer works and still stall on the blank file where a project should start.",
    },
    {
      num: "03",
      title: "Too Many Tools",
      body: "New AI tools every week. Where do you start?",
      detail:
        "The stack changes faster than any curriculum updates, and nobody tells you which parts actually matter for a job.",
    },
    {
      num: "04",
      title: "No Real Portfolio",
      body: "Finishing courses doesn't prove what you can build.",
      detail:
        "A wall of certificates says you attended. Hiring managers want a running deployment and the reasoning behind it.",
    },
  ],
  solution: {
    kicker: "That's why we built",
    brand: "AI Linc.",
    body: "A single platform that decides what you learn next, makes you build it, checks whether it actually works, and connects it to the job you want.",
    cta: { label: "See how it works", href: "#features" },
  },
} as const;

/* ---------------------------------------------------------------------------
 * 5. WHY AI LINC — differentiators
 * ------------------------------------------------------------------------- */
export const why = {
  eyebrow: "Why AI Linc",
  headline: "Not another course library.",
  headlineAccent: "A system that adapts to you.",
  sub: "Four things that change what happens between starting and getting hired.",
  cards: [
    {
      icon: "ai",
      title: "AI that knows your level",
      body: "A calibration assessment builds your student model. From then on, quizzes start at the right difficulty and articles open at your reading tier — automatically.",
      proof: "AI has tuned this course to you",
    },
    {
      icon: "build",
      title: "Learn by building",
      body: "Every course carries modules, coding tasks and quizzes that produce something that runs. Progress is measured in what you shipped, not hours watched.",
      proof: "10 coding tasks per course",
    },
    {
      icon: "assess",
      title: "Proof, not certificates",
      body: "Adaptive assessments and AI mock interviews score you against a rubric and hand back a transcript — so your resume claims have evidence behind them.",
      proof: "Rubric-based feedback",
    },
    {
      icon: "jobs",
      title: "Career built in",
      body: "A resume builder and a live job board sit inside the platform, matched to the skills you have actually demonstrated. No gap between finishing and applying.",
      proof: "Roles matched to your profile",
    },
  ],
} as const;

/* ---------------------------------------------------------------------------
 * 6. FEATURES — horizontal scroll gallery of REAL platform screens
 * ---------------------------------------------------------------------------
 * Images are genuine captures from tour.ailinc.com, in /public/platform/.
 * ------------------------------------------------------------------------- */
export const features = {
  eyebrow: "The platform",
  headline: "From learning",
  headlineAccent: "to building.",
  sub: "Every screen below is the real AI Linc platform. Scroll across.",
  /**
   * Each slide carries a still (`image`) and a short silent loop (`video`).
   * The still is the poster, so first paint is instant; the clip fades in and
   * plays only while its slide is the active one. Clips are recorded from the
   * live demo — see the recording notes in the README.
   */
  /**
   * TODO — slides 03 (Roadmaps) and 04 (AI Tutor) have no screenshot yet.
   * Neither feature exists on tour.ailinc.com (both 404); they only ship on
   * staging.ailinc.com, which has no demo-role login. Capture them from a
   * STUDENT account (not Super Admin), save as /public/platform/roadmaps.webp
   * and ai-tutor.webp, then set `image` on those two slides. Until then they
   * render a branded placeholder rather than a fabricated screen.
   */
  pendingNote:
    "Roadmaps and AI Tutor still need screenshots from a student account on staging.",
  slides: [
    {
      id: "dashboard",
      num: "01",
      title: "Your AI briefing",
      body: "Open the app and it tells you where you actually are — progress, streak, weakest skill, and the one thing worth doing today.",
      image: "/platform/dashboard.webp" as string | null,
      video: "/platform/clips/dashboard.mp4" as string | null,
      tags: ["Skill profile", "Daily focus", "Streaks"],
    },
    {
      // Merged: the catalogue and the calibration story are one idea.
      id: "courses",
      num: "02",
      title: "Courses that adapt to you",
      body: "AI-personalised courses that retune to your level in real time. A calibration assessment sets your baseline, then difficulty, reading tier and pacing reshape around it — practise, get instant feedback, and level up.",
      image: "/platform/course-detail.webp" as string | null,
      video: "/platform/clips/course-detail.mp4" as string | null,
      tags: ["Calibration", "Adaptive difficulty", "Instant feedback"],
    },
    {
      // [TODO] Awaiting a student-account capture. See pendingNote above.
      id: "roadmaps",
      num: "03",
      title: "Roadmaps you can follow — or build",
      body: "Pick a role, skill or company-based path and follow it. Every step is a verified topic you can practise and be scored on — and clicking a topic generates a full course for it, straight into your Courses.",
      image: null as string | null,
      video: null as string | null,
      tags: ["Role, skill & company paths", "Build your own", "Topic → course"],
    },
    {
      // [TODO] Awaiting a student-account capture. See pendingNote above.
      id: "ai-tutor",
      num: "04",
      title: "A tutor you can talk to",
      body: "Say what you want to learn and talk it through out loud. The tutor listens, answers in voice, and puts the material on screen as it explains — interrupt it mid-sentence, or ask to be quizzed.",
      image: null as string | null,
      video: null as string | null,
      tags: ["Two-way voice", "Shows as it explains", "Interrupt anytime"],
    },
    {
      id: "assessments",
      num: "05",
      title: "Assessments that find the edge",
      body: "Adaptive tests that locate exactly where your understanding stops, instead of confirming what you already know.",
      image: "/platform/assessments.webp" as string | null,
      video: "/platform/clips/assessments.mp4" as string | null,
      tags: ["Adaptive", "Scored", "Retakeable"],
    },
    {
      id: "mock-interview",
      num: "06",
      title: "AI mock interviews",
      body: "Practice AI-driven mock interviews with instant, rubric-based feedback to sharpen your answers before it counts.",
      image: "/platform/mock-interview.webp" as string | null,
      video: "/platform/clips/mock-interview.mp4" as string | null,
      tags: ["Voice + text", "Rubric scoring", "On demand"],
    },
    {
      id: "jobs",
      num: "07",
      title: "Jobs matched to you",
      body: "Discover roles matched to your profile, filter by what matters, and track every application from one board.",
      image: "/platform/jobs.webp" as string | null,
      video: "/platform/clips/jobs.mp4" as string | null,
      tags: ["Matched roles", "Filters", "Tracking"],
    },
    {
      id: "resume",
      num: "08",
      title: "A resume backed by evidence",
      body: "Build a resume from what the platform has actually seen you do — projects completed, skills demonstrated, scores earned.",
      image: "/platform/resume.webp" as string | null,
      video: "/platform/clips/resume.mp4" as string | null,
      tags: ["Auto-filled", "ATS-ready", "Exportable"],
    },
    {
      id: "live-sessions",
      num: "09",
      title: "Live sessions and mentorship",
      body: "Cohort classes and office hours run inside the platform, recorded and tied back to your timeline.",
      image: "/platform/live-sessions.webp" as string | null,
      video: "/platform/clips/live-sessions.mp4" as string | null,
      tags: ["Live classes", "Recorded", "Mentors"],
    },
    {
      id: "community",
      num: "10",
      title: "A community that ships",
      body: "Peers working on the same problems, in the same place you learn — not a separate forum you forget to open.",
      image: "/platform/community.webp" as string | null,
      video: "/platform/clips/community.mp4" as string | null,
      tags: ["Peers", "Discussions", "Alumni"],
    },
  ],
} as const;

/* ---------------------------------------------------------------------------
 * 7. VIDEO + FOUNDER'S NOTE
 * ---------------------------------------------------------------------------
 * Drop the walkthrough at /public/tour.mp4 and set videoSrc.
 * Until then the block shows the real dashboard with a play affordance.
 * ------------------------------------------------------------------------- */
export const walkthrough = {
  eyebrow: "See it in action",
  headline: "A five-minute walk through the platform.",
  videoSrc: null as string | null, // TODO — "/tour.mp4"
  poster: "/platform/dashboard.webp",
  duration: "5:12",
  chapters: [
    { time: "0:00", label: "Your AI briefing" },
    { time: "1:04", label: "Adaptive courses" },
    { time: "2:11", label: "Assessments & mock interviews" },
    { time: "3:20", label: "Live sessions" },
    { time: "4:15", label: "Resume & jobs" },
  ],
  founder: {
    eyebrow: "Founder's note",
    // [TODO] Replace with the real founder name, title and photo.
    name: "TODO — Founder Name",
    role: "Founder, AI Linc",
    photo: null as string | null, // TODO — "/founder.jpg"
    quote: [
      "We kept meeting people who had finished six courses and still could not ship anything. The problem was never effort. It was that nothing they used knew where they actually were.",
      "So we built the opposite. A platform that measures where you stand, decides what you do next, makes you build it, and then checks whether it holds up. Everything else — the interviews, the resume, the jobs — is downstream of that.",
    ],
    sign: "TODO — signature name",
  },
  note: "TODO — add /public/tour.mp4, the founder's real name, title, photo and note.",
} as const;

/* ---------------------------------------------------------------------------
 * 8. FAQ
 * ------------------------------------------------------------------------- */
export const faq = {
  eyebrow: "FAQ",
  headline: "Questions, answered.",
  items: [
    {
      q: "Who is AI Linc for?",
      a: "Anyone moving from understanding AI to building with it — students, working developers, and professionals switching in. The platform calibrates to your level, so beginners and experienced engineers follow genuinely different paths through the same courses.",
    },
    {
      q: "Do I need coding experience to start?",
      a: "No. A calibration assessment establishes where you are before anything is recommended, and courses open at the right difficulty from there. If you have never written code, the platform starts you there rather than assuming it.",
    },
    {
      q: "How is this different from a normal course platform?",
      a: "Normal platforms play the same video for everyone. AI Linc builds a student model from your assessments and performance, then retunes quiz difficulty, reading level and sequencing around it. It also tells you what to do today, and why that beats another pass over material you already know.",
    },
    {
      q: "What do I actually build?",
      a: "Each course carries modules, articles, quizzes and coding tasks that end in working output. Data Structures & Algorithms is pattern-first for interviews; Full-Stack Web Development takes you from an empty folder to a deployed URL; Python for Data Science works with genuinely messy data.",
    },
    {
      q: "How do the AI mock interviews work?",
      a: "You pick a topic and difficulty, or schedule a full round. A voice-and-text AI interviewer asks domain questions, follows up on your answers, and scores communication, depth and correctness against a rubric. Results feed back into your student model.",
    },
    {
      q: "Is there live mentorship?",
      a: "Yes. Live sessions and office hours run natively inside the platform and are recorded against your timeline, so you can go back to the moment something was explained.",
    },
    {
      q: "What happens after I finish?",
      a: "You leave with deployed projects, assessment and interview records that substantiate your skills, a resume built from that evidence, and access to a job board matched to what you have demonstrably done.",
    },
    {
      q: "Can I try it before signing up?",
      a: `Yes — the full platform is open at ${brand.platformUrl}. Pick a role and every module is switched on. No credit card, no sales call.`,
    },
  ],
} as const;

/* ---------------------------------------------------------------------------
 * 9. FINAL CTA
 * ------------------------------------------------------------------------- */
export const finalCta = {
  headline: "Your AI journey",
  headlineAccent: "starts here.",
  sub: "Learn the skills. Build the systems. Graduate job-ready.",
  primary: { label: "Experience AI Linc", href: brand.platformUrl },
  secondary: { label: "Talk to us", href: `mailto:${brand.email}` },
} as const;

/* ---------------------------------------------------------------------------
 * FOOTER
 * ------------------------------------------------------------------------- */
export const footer = {
  blurb:
    "An AI-native learning platform. Adaptive courses, real projects, mock interviews and the jobs that follow — in one place.",
  columns: [
    {
      title: "Platform",
      links: [
        { label: "Overview", href: "#platform" },
        { label: "Features", href: "#features" },
        { label: "Live demo", href: brand.platformUrl },
        { label: "Walkthrough", href: "#walkthrough" },
      ],
    },
    {
      title: "About",
      links: [
        { label: "About AI Linc", href: "#about" },
        { label: "Why AI Linc", href: "#why" },
        { label: "Founder's note", href: "#walkthrough" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "FAQ", href: "#faq" },
        { label: "Courses", href: brand.platformUrl },
        { label: "Jobs board", href: brand.platformUrl },
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
