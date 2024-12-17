'use client'

import { Container } from '~/components/ui/Container'
import { DPSCalculator } from '~/components/dps-calc/DPSCalculator'
import { Text } from '~/components/ui/Text'

export default function DPSCalcPage() {
  return (
    <Container className="py-6 md:py-8">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <Text className="text-3xl font-bold tracking-tight mb-4">
            POE2 DPS Calculator
          </Text>
          <Text className="text-foreground-secondary text-balance">
            Compare weapons and calculate DPS increases with detailed breakdowns of all damage types.
            Input weapon stats and modifiers to see the total DPS and percentage increase between weapons.
          </Text>
        </div>

        {/* Calculator */}
        <DPSCalculator />
      </div>
    </Container>
  )
}
