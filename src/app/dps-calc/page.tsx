"use client";

import { Container } from "@/components/ui/Container";
import { DPSCalculator } from "@/components/dps-calc/DPSCalculator";

export default function DPSCalcPage() {
  return (
    <Container>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">POE2 DPS Calculator</h1>
          <p className="text-muted-foreground">
            Compare weapons and calculate DPS increases with detailed breakdowns of all damage types.
            Input weapon stats and modifiers to see the total DPS and percentage increase between weapons.
          </p>
        </div>
        <DPSCalculator />
      </div>
    </Container>
  );
}