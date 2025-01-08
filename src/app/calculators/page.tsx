"use client";

import { Calculator } from "lucide-react";

import Link from "next/link";

import { Container } from "~/components/ui/Container";
import { Text } from "~/components/ui/Text";

const calculators = [
  {
    name: "DPS Calculator",
    description:
      "Calculate your character's damage per second with detailed breakdowns of all damage types. Compare weapons and see percentage increases.",
    href: "/calculators/dps",
    features: [
      "Weapon comparison",
      "Damage type analysis",
      "Support gem calculations",
      "Status effect modifiers",
    ],
    color: "from-orange-500/10 to-red-500/10",
    textColor: "text-orange-500",
  },
  {
    name: "Speed Calculator",
    description:
      "Analyze movement and attack speed mechanics for optimal character performance. Calculate action speed with various modifiers.",
    href: "/calculators/speed",
    features: [
      "Movement speed",
      "Attack/cast speed",
      "Action speed modifiers",
      "Buff calculations",
    ],
    color: "from-blue-500/10 to-cyan-500/10",
    textColor: "text-blue-500",
  },
  {
    name: "Currency Calculator",
    description:
      "Convert between different Path of Exile 2 currency types. Track conversion history and calculate exchange rates.",
    href: "/calculators/currency",
    features: ["Currency conversion", "Exchange rates", "Value tracking", "Historical data"],
    color: "from-yellow-500/10 to-amber-500/10",
    textColor: "text-yellow-500",
  },
];

export default function CalculatorsPage() {
  return (
    <Container className="py-6 md:py-8 min-w-[80vw] mt-4">
      <div className="mx-auto space-y-12">
        {/* Header */}
        <div className="mx-auto">
          <Text className="text-4xl font-bold tracking-tight mb-6">POE2 Calculators</Text>
          <Text className="text-xl text-muted-foreground leading-relaxed">
            A suite of calculators for Path of Exile 2. Analyze damage, speed, and currency with
            detailed breakdowns and real-time calculations.
          </Text>
        </div>

        {/* Calculators Grid */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {calculators.map((calc) => (
            <Link
              key={calc.name}
              href={calc.href}
              className="group flex flex-col p-6 rounded-xl border border-border/50 hover:border-primary/50 transition-all bg-gradient-to-br hover:shadow-lg"
              style={{
                background: `linear-gradient(to bottom right, ${calc.color.split(" ")[0]}, ${
                  calc.color.split(" ")[2]
                })`,
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-background/80">
                  <Calculator className={`w-5 h-5 ${calc.textColor}`} />
                </div>
                <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                  {calc.name}
                </h3>
              </div>

              <p className="text-foreground/70 mb-6">{calc.description}</p>

              <div className="mt-auto grid grid-cols-2 gap-2">
                {calc.features.map((feature) => (
                  <span
                    key={feature}
                    className="px-2 py-1 text-xs rounded-md bg-background/60 text-foreground/80"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
}
