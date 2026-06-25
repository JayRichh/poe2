"use client";

import { motion } from "framer-motion";
import { Coins, Gauge, Sword } from "lucide-react";

import Link from "next/link";

import { Text } from "~/components/ui/Text";

type Calculator = {
  href: string;
  title: string;
  description: string;
  icon: React.ElementType;
  features: readonly string[];
  badges: readonly string[];
  theme: string;
};

const calculators: Calculator[] = [
  {
    href: "/calculators/dps",
    title: "DPS Calculator",
    description:
      "Compare weapons and calculate DPS increases with detailed breakdowns of all damage types. Input weapon stats and modifiers to see the total DPS.",
    icon: Sword,
    features: [
      "Weapon comparison",
      "Support gem integration",
      "Equipment modifiers",
      "Build optimization",
    ],
    badges: ["Manual Mode"],
    theme: "accent",
  },
  {
    href: "/calculators/speed",
    title: "Speed Calculator",
    description:
      "Calculate attack speed, recovery time, and reload time for different weapons and equipment combinations. Compare dual-wielding setups.",
    icon: Gauge,
    features: [
      "Attack speed analysis",
      "Recovery time calculations",
      "Dual wielding support",
      "Equipment impact",
    ],
    badges: ["Build Tool"],
    theme: "secondary",
  },
  {
    href: "/calculators/currency",
    title: "Currency Calculator",
    description:
      "Reference orb values and convert between currency types using approximate ratios. League prices reset every few months — check the trade site for live rates.",
    icon: Coins,
    features: [
      "Orb reference grid",
      "Ratio conversions",
      "Trade calculations",
      "Value comparison",
    ],
    badges: ["Reference"],
    theme: "primary",
  },
];

// Map card themes onto the gilded-grimdark design tokens instead of raw palette utilities.
const themeColors = {
  accent: {
    bg: "bg-accent/5",
    hoverBg: "hover:bg-accent/10",
    border: "border-accent/25",
    text: "text-accent",
    icon: "text-accent",
    badge: "bg-accent/10 text-accent",
    hover: "group-hover:text-accent",
  },
  secondary: {
    bg: "bg-secondary/5",
    hoverBg: "hover:bg-secondary/10",
    border: "border-secondary/25",
    text: "text-secondary",
    icon: "text-secondary",
    badge: "bg-secondary/10 text-secondary",
    hover: "group-hover:text-secondary",
  },
  primary: {
    bg: "bg-primary/5",
    hoverBg: "hover:bg-primary/10",
    border: "border-primary/25",
    text: "text-primary",
    icon: "text-primary",
    badge: "bg-primary/10 text-primary",
    hover: "group-hover:text-primary",
  },
};

function CalculatorCard({ calc }: { calc: Calculator }) {
  const colors = themeColors[calc.theme as keyof typeof themeColors];

  return (
    <Link href={calc.href} className="block h-full">
      <motion.div
        whileHover={{ scale: 1.02 }}
        className={`group relative h-full rounded-xl border-2 ${colors.border} bg-card/95 backdrop-blur-sm shadow-lg transition-all duration-200 ${colors.hoverBg}`}
      >
        <div className="p-6 md:p-8">
          <div className="mb-8 flex items-center gap-4">
            <div className={`rounded-xl p-4 ${colors.bg}`}>
              <calc.icon className={`h-7 w-7 ${colors.icon}`} />
            </div>
            <Text variant="h3" className={`text-2xl font-semibold ${colors.text}`}>
              {calc.title}
            </Text>
          </div>

          <Text className="mb-8 text-base text-foreground-secondary">{calc.description}</Text>

          <div className="mb-8 flex flex-wrap gap-2">
            {calc.badges.map((badge, i) => (
              <span
                key={i}
                className={`rounded-full px-3 py-1 text-sm font-medium ${colors.badge}`}
              >
                {badge}
              </span>
            ))}
          </div>

          <div className="space-y-3">
            {calc.features.map((feature, i) => (
              <div key={i} className="flex items-center gap-3 text-base">
                <span className={`h-1.5 w-1.5 rounded-full ${colors.text}`} />
                <span className={`text-foreground-secondary ${colors.hover}`}>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export function CalculatorsSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="space-y-12 py-16 w-full mx-auto">
        <div className="text-center space-y-4 flex flex-col pb-12">
          <Text variant="h2" align="center" className="font-display tracking-tight text-gilded">
            Technical Calculators
          </Text>
          <Text variant="body-lg" color="secondary" className="text-lg leading-relaxed">
            Plan damage, speed, and currency for Path of Exile 2
          </Text>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 transition-transform duration-300 mx-2">
          {calculators.map((calc) => (
            <CalculatorCard key={calc.href} calc={calc} />
          ))}
        </div>
      </div>
    </section>
  );
}
