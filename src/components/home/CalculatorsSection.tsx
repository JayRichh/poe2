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
    href: "/dps-calc",
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
    badges: ["Manual Mode", "Live Data Import"],
    theme: "red",
  },
  {
    href: "/speed-calc",
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
    badges: ["Frame-Accurate", "Real-Time Updates"],
    theme: "blue",
  },
  {
    href: "/currency-calc",
    title: "Currency Calculator",
    description:
      "Track exchange rates and analyze market data for optimal trading. Convert between different currency types with real-time rate updates.",
    icon: Coins,
    features: [
      "Exchange rate tracking",
      "Market data analysis",
      "Trade calculations",
      "Value optimization",
    ],
    badges: ["Live Rates", "Market Analysis"],
    theme: "yellow",
  },
];

const themeColors = {
  red: {
    bg: "bg-red-500/5",
    hoverBg: "hover:bg-red-500/10",
    border: "border-red-500/20",
    text: "text-red-500",
    icon: "text-red-500",
    badge: "bg-red-500/10 text-red-400",
    hover: "group-hover:text-red-400",
  },
  blue: {
    bg: "bg-blue-500/5",
    hoverBg: "hover:bg-blue-500/10",
    border: "border-blue-500/20",
    text: "text-blue-500",
    icon: "text-blue-500",
    badge: "bg-blue-500/10 text-blue-400",
    hover: "group-hover:text-blue-400",
  },
  yellow: {
    bg: "bg-yellow-500/5",
    hoverBg: "hover:bg-yellow-500/10",
    border: "border-yellow-500/20",
    text: "text-yellow-500",
    icon: "text-yellow-500",
    badge: "bg-yellow-500/10 text-yellow-400",
    hover: "group-hover:text-yellow-400",
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
          <Text
            variant="h1"
            className="text-4xl font-bold w-full tracking-tight bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent"
          >
            Technical Calculators
          </Text>
          <Text variant="body-lg" color="secondary" className="text-lg leading-relaxed">
            Frame-perfect calculations and real-time analysis tools for Path of Exile 2
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
