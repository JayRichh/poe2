"use client";

import { motion } from "framer-motion";
import { Calculator, Layout, Newspaper } from "lucide-react";
import Link from "next/link";
import { Text } from "~/components/ui/Text";

type Feature = {
  href: string;
  icon: typeof Layout | typeof Calculator | typeof Newspaper;
  title: string;
  bgClass: string;
  items: readonly string[];
  wide?: boolean;
};

const features: Feature[] = [
  {
    href: "/build-planner",
    icon: Layout,
    title: "Build Planner",
    bgClass: "bg-gradient-to-br from-primary-500 to-primary-700",
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
    bgClass: "bg-gradient-to-br from-secondary-500 to-secondary-700",
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
    bgClass: "bg-gradient-to-br from-accent-500 to-accent-700",
    items: [
      "Latest updates",
      "Community announcements",
      "Event schedules",
      "Marketplace pricing",
    ],
  },
  {
    href: "/skill-tree",
    icon: Layout,
    title: "Skill Tree",
    bgClass: "bg-gradient-to-br from-damage-chaos-light to-damage-chaos-dark",
    items: [
      "Interactive tree viewer",
      "Path optimization",
      "Build sharing",
      "Stat calculations",
    ],
    wide: true,
  },
];

export function FeaturesSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.02,
                y: -4,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
              className={`
                group h-full relative overflow-hidden
                rounded-3xl p-8 lg:p-10
                ${feature.bgClass}
                shadow-lg
                before:absolute before:inset-0
                before:bg-black/10 before:opacity-0
                before:transition-opacity
                hover:before:opacity-100
                after:absolute after:inset-0
                after:bg-[url('/build-planner-bg.jpg')]
                after:opacity-5 after:mix-blend-overlay
                after:bg-cover after:bg-center
              `}
            >
              <div className="relative z-10">
                <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm mb-8">
                  <feature.icon className="w-10 h-10 text-white" />
                </div>
                <Text
                  variant="h3"
                  className="text-2xl font-semibold mb-6 text-white"
                >
                  {feature.title}
                </Text>
                <ul className="space-y-3 text-white/80 group-hover:text-white transition-colors">
                  {feature.items.map((item, i) => (
                    <li key={i} className="flex gap-2 items-center">
                      <span className="w-2 h-2 rounded-full bg-white/60" />
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
