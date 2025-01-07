"use client";

import { Container } from "~/components/ui/Container";
import { Text } from "~/components/ui/Text";
import { SpeedCalculator } from "~/components/speed-calc/SpeedCalculator";

export default function SpeedCalcPage() {
  return (
    <Container className="py-6 md:py-8 min-w-[80vw]">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <Text className="text-3xl font-bold tracking-tight mb-4 pt-4">POE2 Speed Calculator</Text>
          <div className="space-y-2">
            <Text className="text-foreground-secondary text-balance">
              Calculate attack speed, recovery time, and reload time for different weapons and equipment combinations.
              Compare dual-wielding setups, analyze armor penalties, and optimize your build&apos;s speed.
            </Text>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-full">
                Frame-Accurate
              </span>
              <span className="px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-full">
                Real-Time Updates
              </span>
            </div>
          </div>
        </div>

        {/* Calculator */}
        <SpeedCalculator />
      </div>
    </Container>
  );
}
