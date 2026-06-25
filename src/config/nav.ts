import {
  BarChart,
  BookOpen,
  Calculator,
  Coins,
  Cog,
  FileText,
  GitBranch,
  Layout,
  Newspaper,
  Swords,
  Timer,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";

/**
 * Single source of truth for the site's navigation.
 *
 * Navigation.tsx, Footer.tsx and FullscreenMenu.tsx all consume this config so
 * the three surfaces can no longer drift apart. The route set is accountless —
 * no auth/profile/community-build affordances. The build planner is the
 * self-contained client tool at /build-planner/equipment.
 */

export interface NavLink {
  id: string;
  href: string;
  label: string;
  icon: LucideIcon;
  /** Short blurb for surfaces that render descriptions (Footer, FullscreenMenu). */
  description?: string;
}

export interface NavGroup {
  id: string;
  label: string;
  /** Landing/index route for the group, when one exists. */
  href?: string;
  icon: LucideIcon;
  description?: string;
  items: NavLink[];
}

export const CALCULATOR_LINKS: NavLink[] = [
  {
    id: "calc-dps",
    href: "/calculators/dps",
    label: "DPS Calculator",
    icon: Zap,
    description: "Compare weapons and damage output",
  },
  {
    id: "calc-speed",
    href: "/calculators/speed",
    label: "Speed Calculator",
    icon: Timer,
    description: "Attack, cast and movement speed",
  },
  {
    id: "calc-currency",
    href: "/calculators/currency",
    label: "Currency Calculator",
    icon: Coins,
    description: "Reference orb values and ratios",
  },
];

export const BUILD_LINKS: NavLink[] = [
  {
    id: "build-planner",
    href: "/build-planner/equipment",
    label: "Build Planner",
    icon: Layout,
    description: "Plan gear, gems, stats and notes",
  },
  {
    id: "skill-tree",
    href: "/skill-tree",
    label: "Skill Tree",
    icon: GitBranch,
    description: "Interactive passive tree viewer",
  },
  {
    id: "statistics",
    href: "/builds",
    label: "Statistics",
    icon: BarChart,
    description: "Ladder class distribution",
  },
];

export const CONTENT_LINKS: NavLink[] = [
  {
    id: "mechanics",
    href: "/mechanics",
    label: "Mechanics",
    icon: Cog,
    description: "Core systems reference",
  },
  {
    id: "guides",
    href: "/guides",
    label: "Guides",
    icon: BookOpen,
    description: "Campaign and endgame guides",
  },
  {
    id: "ascendancies",
    href: "/ascendancies",
    label: "Ascendancies",
    icon: Users,
    description: "Class specializations",
  },
  {
    id: "news",
    href: "/news",
    label: "News",
    icon: Newspaper,
    description: "Patch notes and announcements",
  },
];

/** Grouped primary navigation for the top bar dropdowns and the fullscreen menu. */
export const NAV_GROUPS: NavGroup[] = [
  {
    id: "calculators",
    label: "Calculators",
    href: "/calculators",
    icon: Calculator,
    description: "Specialized PoE2 calculators",
    items: CALCULATOR_LINKS,
  },
  {
    id: "builds",
    label: "Builds",
    href: "/build-planner/equipment",
    icon: Swords,
    description: "Plan and analyze your characters",
    items: BUILD_LINKS,
  },
  {
    id: "content",
    label: "Reference",
    icon: BookOpen,
    description: "Mechanics, guides and game data",
    items: CONTENT_LINKS,
  },
];

/** Flat secondary list (mechanics/guides/ascendancies/news) for the slim nav row. */
export const SECONDARY_LINKS: NavLink[] = CONTENT_LINKS;

/** Curated "quick links" for the fullscreen menu. */
export const QUICK_LINKS: NavLink[] = [
  { id: "quick-news", href: "/news", label: "Latest News", icon: Newspaper },
  { id: "quick-guides", href: "/guides", label: "Guides", icon: FileText },
  { id: "quick-statistics", href: "/builds", label: "Ladder Stats", icon: BarChart },
  { id: "quick-mechanics", href: "/mechanics", label: "Mechanics", icon: Cog },
  { id: "quick-ascendancies", href: "/ascendancies", label: "Ascendancies", icon: Users },
];

/** External / support links rendered in the footer. */
export const EXTERNAL_LINKS = {
  kofi: "https://ko-fi.com/C0C217U6Z6",
  github: "https://github.com/jayrichh/poe2",
  dataSources: [
    { id: "poe2db", label: "POE2DB", href: "https://poe2db.tw/" },
    { id: "poe2-tree", label: "poe2-tree", href: "https://github.com/marcoaaguiar/poe2-tree" },
    {
      id: "skilltree-ts",
      label: "SkillTree_TypeScript",
      href: "https://github.com/EmmittJ/SkillTree_TypeScript",
    },
    { id: "poe-forums", label: "POE Forums", href: "https://www.pathofexile.com/forum" },
  ],
} as const;
