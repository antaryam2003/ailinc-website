import type { SVGProps } from "react";

/**
 * Line icons for the platform mockups and feature cards.
 * All share a 24-box, 1.6 stroke and round caps so they sit together cleanly.
 */
const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

type P = SVGProps<SVGSVGElement>;

export const IconHome = (p: P) => (
  <svg {...base} {...p}>
    <path d="M3 10.5 12 3l9 7.5" />
    <path d="M5.5 9.5V20h13V9.5" />
    <path d="M9.5 20v-6h5v6" />
  </svg>
);

export const IconPath = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="6" cy="6" r="2.5" />
    <circle cx="18" cy="18" r="2.5" />
    <path d="M8.5 6H14a4 4 0 010 8h-4a4 4 0 000 8h5" />
  </svg>
);

export const IconBuild = (p: P) => (
  <svg {...base} {...p}>
    <path d="M9 8.5 5 12l4 3.5" />
    <path d="m15 8.5 4 3.5-4 3.5" />
    <path d="M13.5 5 10.5 19" />
  </svg>
);

export const IconAI = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 3v3.5M12 17.5V21M3 12h3.5M17.5 12H21" />
    <path d="M6.4 6.4 8.8 8.8M15.2 15.2l2.4 2.4M17.6 6.4l-2.4 2.4M8.8 15.2l-2.4 2.4" />
    <circle cx="12" cy="12" r="3.4" />
  </svg>
);

export const IconAssess = (p: P) => (
  <svg {...base} {...p}>
    <rect x="4" y="3.5" width="16" height="17" rx="2.5" />
    <path d="M8.5 9h7M8.5 13h7M8.5 17h4" />
  </svg>
);

export const IconLive = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3" y="6" width="12" height="12" rx="2.5" />
    <path d="m15 11 6-3.5v9L15 13z" />
  </svg>
);

export const IconJobs = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3" y="7.5" width="18" height="12.5" rx="2.5" />
    <path d="M9 7.5V6a2 2 0 012-2h2a2 2 0 012 2v1.5" />
    <path d="M3 13h18" />
  </svg>
);

export const IconMentor = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M3.5 20a5.5 5.5 0 0111 0" />
    <path d="M16 5.2a3.2 3.2 0 010 5.6M18 20a5.5 5.5 0 00-2.2-4.4" />
  </svg>
);

export const IconPortfolio = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 7.5 12 3l8 4.5v9L12 21l-8-4.5z" />
    <path d="M4 7.5 12 12l8-4.5M12 12v9" />
  </svg>
);

export const IconCommunity = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="7" r="3" />
    <circle cx="5.5" cy="15.5" r="2.6" />
    <circle cx="18.5" cy="15.5" r="2.6" />
    <path d="M9.6 9.2 7.4 13M14.4 9.2 16.6 13M8.1 15.5h7.8" />
  </svg>
);

export const IconCheck = (p: P) => (
  <svg {...base} {...p}>
    <path d="m4.5 12.5 5 5 10-11" />
  </svg>
);

export const IconPlay = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M8 5.2a1 1 0 0 1 1.5-.87l9.5 5.5a1 1 0 0 1 0 1.73l-9.5 5.5A1 1 0 0 1 8 16.2z" />
  </svg>
);

export const IconSpark = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 2.5 13.9 9 20.5 11l-6.6 2L12 19.5 10.1 13 3.5 11 10.1 9z" />
  </svg>
);

export const iconMap = {
  path: IconPath,
  build: IconBuild,
  ai: IconAI,
  mentor: IconMentor,
  portfolio: IconPortfolio,
  jobs: IconJobs,
} as const;
