"use client";

import { CurrencyIcon } from './CurrencyIcon';
import { useCurrencyCalculator } from '~/hooks/useCurrencyCalculator';
import type { CurrencyResults } from '~/types/currency';

interface ResultsPanelProps {
  results: CurrencyResults;
}

export function ResultsPanel({ results }: ResultsPanelProps) {
  const { rates } = useCurrencyCalculator();
  const fromCurrency = rates.find(r => r.name === results.fromCurrency);
  const toCurrency = rates.find(r => r.name === results.toCurrency);
  return (
    <div className="glass">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Conversion Result</h2>
          <div className="text-xs text-muted-foreground">
            {new Date(results.timestamp).toLocaleString()}
          </div>
        </div>

        <div className="grid gap-6">
          {/* Main Conversion Display */}
          <div className="glass p-6 rounded-lg">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <CurrencyIcon name={fromCurrency?.name || ''} size={40} />
                <div>
                  <div className="text-3xl font-semibold numeric">{results.amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</div>
                  <div className="text-sm font-medium text-muted-foreground mt-1">{fromCurrency?.name}</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Worth {(results.amount * (fromCurrency?.value || 0)).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })} chaos
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-1">
                <div className="text-lg text-muted-foreground">→</div>
                <div className="text-xs text-muted-foreground">converts to</div>
              </div>

              <div className="flex items-center gap-4">
                <CurrencyIcon name={toCurrency?.name || ''} size={40} />
                <div>
                  <div className="text-3xl font-semibold numeric text-primary">{results.convertedAmount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</div>
                  <div className="text-sm font-medium text-muted-foreground mt-1">{toCurrency?.name}</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Worth {(results.convertedAmount * (toCurrency?.value || 0)).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })} chaos
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Exchange Rate Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass p-4 rounded-lg">
              <div className="text-sm font-medium text-muted-foreground mb-2">Current Market Rates</div>
              <div className="flex flex-col gap-2">
                <div className="text-sm">
                  1 {fromCurrency?.name} = {fromCurrency?.value?.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })} chaos
                </div>
                <div className="text-sm">
                  1 {toCurrency?.name} = {toCurrency?.value?.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })} chaos
                </div>
              </div>
            </div>

            <div className="glass p-4 rounded-lg">
              <div className="text-sm font-medium text-muted-foreground mb-2">Exchange Rate</div>
              <div className="flex flex-col gap-2">
                <div className="text-sm">
                  1 {fromCurrency?.name} = {results.rate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {toCurrency?.name}
                </div>
                <div className="text-sm text-muted-foreground">
                  1 {toCurrency?.name} = {(1/results.rate).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {fromCurrency?.name}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
