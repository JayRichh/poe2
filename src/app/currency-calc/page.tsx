"use client";

import { CurrencyCalculator } from "~/components/currency-calc/CurrencyCalculator";
import { CurrencyGrid } from "~/components/currency-calc/CurrencyGrid";
import { Container } from "~/components/ui/Container";
import { Text } from "~/components/ui/Text";

export default function CurrencyCalcPage() {
  return (
    <Container className="py-6 md:py-8">
      <div className="mx-auto">
        {/* Header */}
        <div className="mx-auto mb-12 mt-12">
          <Text className="text-4xl font-bold tracking-tight mb-6">POE2 Currency Calculator</Text>
          <Text className="text-xl text-muted-foreground leading-relaxed">
            Convert between different Path of Exile 2 currency types with real-time rates. Compare values,
            track conversion history, and calculate exchange rates for all currency types.
          </Text>
          <div className="flex items-center gap-2 mt-4">
            <span className="px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full">
              Manual Mode
            </span>
            <span className="px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full relative group">
              <span>Live Data Import</span>
              <span className="absolute -top-2 -right-2 px-1.5 py-0.5 text-[10px] font-medium bg-primary text-primary-foreground rounded-full">
                Soon
              </span>
            </span>
          </div>
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
              Comprehensive list of all Path of Exile 2 currencies, their values, and usage information.
              Hover over items to see detailed usage instructions.
            </p>
          </div>
          <CurrencyGrid />
        </section>
      </div>
    </Container>
  );
}
