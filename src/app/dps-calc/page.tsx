"use client";

import { DPSCalculator } from "~/components/dps-calc/DPSCalculator";
import { Container } from "~/components/ui/Container";
import { Text } from "~/components/ui/Text";

export default function DPSCalcPage() {
  return (
    <Container className="py-6 md:py-8 min-w-[80vw]">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <Text className="text-3xl font-bold tracking-tight mb-4 pt-4">POE2 DPS Calculator</Text>
          <div className="space-y-2">
            <Text className="text-foreground-secondary text-balance">
              Compare weapons and calculate DPS increases with detailed breakdowns of all damage
              types. Input weapon stats and modifiers to see the total DPS and percentage increase
              between weapons.
            </Text>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-full">
                Manual Mode
              </span>
              <span className="px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-full relative group">
                <span>Live Data Import</span>
                <span className="absolute -top-2 -right-2 px-1.5 py-0.5 text-[10px] font-medium bg-primary text-primary-foreground rounded-full">
                  Soon
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Calculator */}
        <DPSCalculator />
      </div>
    </Container>
  );
}
