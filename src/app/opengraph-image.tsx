import { ImageResponse } from "next/og";
import { brand } from "@/content/site";

export const alt = `${brand.name} — Don't just learn AI. Build with it.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Required so the card prerenders under `output: "export"`.
export const dynamic = "force-static";

/** Social share card, rendered at build time. Flat colour, no network fetches. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F7F6FB",
          padding: 72,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -280,
            right: -140,
            width: 760,
            height: 760,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(168,85,247,0.42), rgba(247,246,251,0) 68%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -320,
            left: -160,
            width: 700,
            height: 700,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(236,72,153,0.34), rgba(247,246,251,0) 68%)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width="58" height="40" viewBox="85 -8 300 256">
            <defs>
              <linearGradient
                id="og"
                x1="100"
                y1="10"
                x2="365"
                y2="230"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#7C3AED" />
                <stop offset="0.55" stopColor="#A855F7" />
                <stop offset="1" stopColor="#EC4899" />
              </linearGradient>
            </defs>
            <g transform="rotate(-7 200 120)">
              <path
                d="M 200 120 C 150 48.5, 105 48.5, 100 120 C 95 191.5, 150 191.5, 200 120 C 282.5 10, 356.75 10, 365 120 C 373.25 230, 282.5 230, 200 120 Z M 200 120 C 164 69, 129.6 69, 126 120 C 122.4 171, 164 171, 200 120 C 268.5 34, 332.15 34, 339 120 C 345.85 206, 268.5 206, 200 120 Z"
                fill="url(#og)"
                fillRule="evenodd"
              />
            </g>
          </svg>
          <span
            style={{
              fontSize: 32,
              fontWeight: 800,
              color: "#17131F",
              letterSpacing: -1,
            }}
          >
            AI Linc
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              fontSize: 84,
              fontWeight: 800,
              color: "#17131F",
              letterSpacing: -3.6,
              lineHeight: 1.02,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Don&apos;t just learn AI.</span>
            <span style={{ color: "#7C3AED" }}>Build with it.</span>
          </div>
          <div
            style={{ fontSize: 26, color: "#56516B", maxWidth: 920, lineHeight: 1.45 }}
          >
            Learn, build and master real-world AI through hands-on projects,
            expert guidance and an AI-powered learning platform.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {[
            "Adaptive courses",
            "Real projects",
            "AI mock interviews",
            "Matched jobs",
          ].map((t) => (
            <div
              key={t}
              style={{
                display: "flex",
                fontSize: 19,
                color: "#56516B",
                border: "1px solid #E8E4F2",
                background: "#FFFFFF",
                borderRadius: 999,
                padding: "10px 22px",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
