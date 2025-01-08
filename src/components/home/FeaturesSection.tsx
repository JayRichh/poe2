"use client";

import { motion } from "framer-motion";
import { Calculator, Layout, Newspaper } from "lucide-react";

import Link from "next/link";

import { Text } from "~/components/ui/Text";

type Feature = {
  href: string;
  icon: typeof Layout | typeof Calculator | typeof Newspaper;
  title: string;
  colors: {
    from: string;
    to: string;
  };
  items: readonly string[];
  wide?: boolean;
};

const features: Feature[] = [
  {
    href: "/build-planner",
    icon: Layout,
    title: "Build Planner",
    colors: {
      from: "#E5A732",
      to: "#B87300",
    },
    items: [
      "Plan skill trees",
      "Manage gear & skills",
      "Track character stats",
      "Import/Export builds",
    ],
    wide: true,
  },
  {
    href: "/dps-calc",
    icon: Calculator,
    title: "DPS Calculator",
    colors: {
      from: "#449E48",
      to: "#29712D",
    },
    items: [
      "Calculate weapon DPS",
      "Compare weapons",
      "Account for modifiers",
      "Optimize damage output",
    ],
  },
  {
    href: "/news",
    icon: Newspaper,
    title: "Game Updates",
    colors: {
      from: "#B87839",
      to: "#7D3E11",
    },
    items: ["Latest updates", "Community announcements", "Event schedules", "Marketplace pricing"],
  },
  {
    href: "/skill-tree",
    icon: Layout,
    title: "Skill Tree",
    colors: {
      from: "#8C239E",
      to: "#5F188A",
    },
    items: ["Interactive tree viewer", "Path optimization", "Build sharing", "Stat calculations"],
    wide: true,
  },
];

export function FeaturesSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 pt-24 pb-12">
      {features.map((feature, index) => {
        const isFirstRow = index < 2;
        const gridClasses = feature.wide
          ? isFirstRow
            ? "lg:col-span-4"
            : "lg:col-span-4 lg:col-start-3"
          : "lg:col-span-2";

        return (
          <Link key={feature.href} href={feature.href} className={gridClasses}>
            <motion.div
              whileHover={{
                y: -2,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.98 }}
              style={{
                background: `linear-gradient(to bottom right, ${feature.colors.from}0D, ${feature.colors.to}0D)`,
                borderColor: feature.colors.from,
                borderWidth: "8px",
              }}
              className="
                group h-full relative overflow-hidden
                rounded-3xl p-6 lg:p-8
                shadow-lg
                hover:opacity-100
                transition-all duration-200
              "
            >
              <div className="relative z-10">
                <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm mb-8">
                  <feature.icon
                    style={{
                      color: feature.colors.from,
                    }}
                    className="w-10 h-10 text-gray-900 dark:text-white opacity-80 group-hover:opacity-100 transition-all duration-200"
                  />
                </div>
                <Text
                  variant="h3"
                  className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white"
                >
                  {feature.title}
                </Text>
                <ul className="space-y-3 text-gray-700 dark:text-white/80 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                  {feature.items.map((item, i) => (
                    <li key={i} className="flex gap-2 items-center">
                      <span className="w-2 h-2 rounded-full bg-gray-600 dark:bg-white/60" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </Link>
        );
      })}
    </div>
  );
}
