import { ImageResponse } from "next/og";

import { SITE } from "../config/metadata";

// Route segment config
export const runtime = "edge";
export const alt = `${SITE.name} — Path of Exile 2 toolkit`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Gilded-grimdark palette.
const OBSIDIAN = "#0d0b08";
const AGED_GOLD = "#c8a24b";
const PARCHMENT = "#cdbb95";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: OBSIDIAN,
          // Subtle radial glow to lift the title off the obsidian field.
          backgroundImage:
            "radial-gradient(circle at 50% 42%, rgba(200,162,75,0.16), rgba(13,11,8,0) 60%)",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            color: AGED_GOLD,
            fontSize: 34,
            letterSpacing: 14,
            textTransform: "uppercase",
            marginBottom: 28,
          }}
        >
          Path of Exile 2
        </div>
        <div
          style={{
            display: "flex",
            color: AGED_GOLD,
            fontSize: 148,
            fontWeight: 700,
            lineHeight: 1,
            textShadow: "0 4px 40px rgba(200,162,75,0.35)",
          }}
        >
          {SITE.name}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 36,
            width: 360,
            height: 3,
            backgroundColor: AGED_GOLD,
            opacity: 0.6,
          }}
        />
        <div
          style={{
            display: "flex",
            textAlign: "center",
            color: PARCHMENT,
            fontSize: 38,
            marginTop: 40,
            maxWidth: 900,
          }}
        >
          Build planner · Skill tree · DPS &amp; currency calculators
        </div>
      </div>
    ),
    { ...size }
  );
}
