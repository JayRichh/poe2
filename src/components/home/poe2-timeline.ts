/**
 * PoE2 major-version timeline + live roster counts.
 *
 * Single source of truth for the landing "update timeline" showcase and the
 * GameSystems class/ascendancy counts. Data is transcribed verbatim from
 * docs/poe2-2026-reference.md (§1 Version Timeline, §2 Class & Ascendancy
 * Roster) — the verified 2026 reference. Do NOT invent values here; update
 * only against that doc / official patch notes.
 *
 * Live game: 0.5.0 "Return of the Ancients" (May 29 2026), still Early Access,
 * heading to a 1.0 full launch targeted late 2026 (after ExileCon, Nov 7-8 2026).
 */

export interface Poe2Version {
  version: string;
  /** Human date as shipped. */
  date: string;
  /** Update codename (0.1.0 was simply the EA launch — no league name). */
  codename: string;
  /** Separate challenge-league name where it differs from the codename. */
  league?: string;
  /** 1-2 headline features. */
  headlines: string[];
  /** Mark the current live version. */
  current?: boolean;
}

export const POE2_VERSIONS: Poe2Version[] = [
  {
    version: "0.1.0",
    date: "Dec 6, 2024",
    codename: "Early Access Launch",
    headlines: [
      "6 classes + 12 ascendancies; Acts 1-3 campaign",
      "Atlas / Waystone endgame; record-breaking GGG launch",
    ],
  },
  {
    version: "0.2.0",
    date: "Apr 4, 2025",
    codename: "Dawn of the Hunt",
    league: "Dawn of the Hunt",
    headlines: [
      "Huntress class (spear + buckler); 5 new ascendancies",
      "100+ support gems & uniques; Recombinators, Fracturing Orbs",
    ],
  },
  {
    version: "0.3.0",
    date: "Aug 29, 2025",
    codename: "The Third Edict",
    league: "Rise of the Abyssals",
    headlines: [
      "Act 4 + 3 Interludes replace Cruel; first full challenge league",
      "Support-gem tier overhaul; async trade; sprinting for all",
    ],
  },
  {
    version: "0.4.0",
    date: "Dec 12, 2025",
    codename: "The Last of the Druids",
    league: "Fate of the Vaal",
    headlines: [
      "Druid class (STR/INT shapeshifter) + 2 ascendancies",
      "Fate of the Vaal temple-building league; endgame rebalancing",
    ],
  },
  {
    version: "0.5.0",
    date: "May 29, 2026",
    codename: "Return of the Ancients",
    league: "Runes of Aldur",
    current: true,
    headlines: [
      "Martial Artist (Monk) + Spirit Walker (Huntress) ascendancies",
      "Massive endgame overhaul: 300+ node Atlas, Precursor Fortress, Arbiter of Divinity",
    ],
  },
];

export const POE2_CURRENT_VERSION = POE2_VERSIONS.find((v) => v.current) ?? POE2_VERSIONS.at(-1)!;

/** EA -> 1.0 milestone facts (reference §1.0 launch & ExileCon). */
export const POE2_MILESTONES = {
  dataVersion: "0.5.x",
  earlyAccess: true,
  fullLaunchTarget: "Late 2026",
  exileCon: "ExileCon 2026 · Nov 7-8 · Auckland",
  fullLaunchNote: "0.5.0 is the final Early Access update before the 1.0 launch.",
} as const;

/** Live roster counts (reference §2) — drives the GameSystems "classes" copy. */
export const POE2_ROSTER = {
  classesLive: 8,
  classesPlanned: 12,
  ascendanciesLive: 23,
} as const;
