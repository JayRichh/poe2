"use client";

import { SpeedCalculator } from "~/components/speed-calc/SpeedCalculator";
import { Container } from "~/components/ui/Container";
import { Text } from "~/components/ui/Text";

export default function SpeedCalcPage() {
  return (
    <Container className="py-6 md:py-8 min-w-[80vw]">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-4 pt-4">
            <Text className="text-3xl font-bold tracking-tight">POE2 Speed Calculator</Text>
            <span className="px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-full">
              Data: 0.5.x
            </span>
          </div>
          <div className="space-y-3">
            <Text className="text-foreground-secondary text-balance">
              Compute effective movement speed and attack/cast speed in Path of Exile 2. Movement
              speed and &quot;increased&quot; attack/cast speed both stack additively into a single
              bucket (base × (1 + sum of %)); &quot;more&quot; modifiers multiply. Enter your own
              base values and modifiers — chill and temporal slows go in as reductions.
            </Text>
            <Text variant="body-sm" color="secondary" className="text-balance">
              Honest-tool note: this is movement / action-speed focused. PoE2 0.5.x does not publish
              authoritative per-weapon base attack speed or a global base run speed, so those are
              your inputs rather than fabricated tables. Only the stacking math is baked in.
            </Text>
          </div>
        </div>

        {/* Calculator */}
        <SpeedCalculator />
      </div>
    </Container>
  );
}
