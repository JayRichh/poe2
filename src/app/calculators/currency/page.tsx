"use client";

import { CurrencyCalculator } from "~/components/currency-calc/CurrencyCalculator";
import { CurrencyGrid } from "~/components/currency-calc/CurrencyGrid";
import { Container } from "~/components/ui/Container";
import { Text } from "~/components/ui/Text";

export default function CurrencyCalcPage() {
  return (
    <Container className="py-6 md:py-8 min-w-[80vw]">
      <div className="mx-auto">
        {/* Header */}
        <div className="mx-auto mb-12 mt-12">
          <Text className="text-4xl font-bold tracking-tight mb-6">PoE2 Currency Calculator</Text>
          <Text className="text-xl text-foreground-secondary leading-relaxed">
            Convert between Path of Exile 2 currencies using chaos-denominated reference ratios.
            Compare values, keep a conversion history, and browse the full currency reference below.
          </Text>
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <span className="px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full">
              Approximate ratios
            </span>
            <span className="px-3 py-1 text-sm font-medium bg-background-secondary text-foreground-secondary rounded-full">
              Data: 0.1.x · not live prices
            </span>
          </div>
          <p className="mt-3 text-sm text-foreground-secondary/80">
            Note: PoE2 currency values shift every league. These are static reference ratios, not
            real-time market prices — treat them as rough guidance.
          </p>
        </div>

        {/* Calculator Section */}
        <div className="mx-auto mb-16">
          <CurrencyCalculator />
        </div>

        {/* Currency Reference Section */}
        <section className="mt-16 pt-16 border-t border-border/60">
          <div className="max-w-7xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Currency Reference</h2>
            <p className="text-lg text-muted-foreground">
              Comprehensive list of all Path of Exile 2 currencies, their values, and usage
              information. Hover over items to see detailed usage instructions.
            </p>
          </div>
          <CurrencyGrid />
        </section>
      </div>
    </Container>
  );
}
