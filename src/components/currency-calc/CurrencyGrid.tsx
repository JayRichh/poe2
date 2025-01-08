"use client";

import { useMemo } from "react";

import { useCurrencyCalculator } from "~/hooks/useCurrencyCalculator";

import { CurrencyGroup } from "~/lib/currencies/utils";

import { CurrencyIcon } from "./CurrencyIcon";

const GROUP_LABELS: Record<CurrencyGroup, { title: string; description: string }> = {
  basic: {
    title: "Basic Currency",
    description: "Essential crafting and trading currency items",
  },
  catalysts: {
    title: "Catalysts",
    description: "Enhance specific modifier types on rings and amulets",
  },
  distilled: {
    title: "Distilled Emotions",
    description: "Special currency for instilling amulets with unique properties",
  },
  essences: {
    title: "Essences",
    description: "Guaranteed modifiers when crafting items",
  },
  omens: {
    title: "Omens",
    description: "Powerful consumables with various effects",
  },
};

export function CurrencyGrid() {
  const { groupedCurrencies } = useCurrencyCalculator();

  return (
    <div className="space-y-24">
      {Object.entries(groupedCurrencies).map(([group, currencies]) => (
        <section key={group} className="relative">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-2xl font-bold mb-3">
              {GROUP_LABELS[group as CurrencyGroup].title}
            </h2>
            <p className="text-lg text-muted-foreground">
              {GROUP_LABELS[group as CurrencyGroup].description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
            {currencies.map((currency) => (
              <div
                key={currency.name}
                className="group relative glass glass-hover p-6 rounded-lg min-h-[240px] transition-all duration-300 hover:shadow-lg flex flex-col"
              >
                {/* Card Header - Fixed Height */}
                <div className="flex items-start gap-4 h-[72px]">
                  <div className="relative w-12 h-12 flex-shrink-0">
                    {currency.image_url ? (
                      <img
                        src={currency.image_url}
                        alt={currency.name}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <CurrencyIcon name={currency.name} size={48} />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium text-base leading-tight mb-2 line-clamp-2">
                      {currency.name}
                    </h3>
                    {group === "basic" && currency.value && (
                      <div className="inline-flex items-center px-2 py-1 rounded-full bg-primary/10 text-primary">
                        <span className="text-sm font-medium">{currency.value}c</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Content - Flex Grow */}
                <div className="flex-1 flex flex-col justify-between mt-4">
                  <div className="space-y-4">
                    {currency.description && (
                      <div className="min-h-[48px]">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {currency.description}
                        </p>
                      </div>
                    )}
                    {currency.uses && (
                      <div className="pt-3 border-t border-border/40">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          <span className="font-medium text-foreground">Usage: </span>
                          {currency.uses}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
