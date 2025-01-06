"use client";

import { useCurrencyCalculator } from '~/hooks/useCurrencyCalculator';
import dynamic from 'next/dynamic';

const CurrencyInputPanel = dynamic(() => import('./CurrencyInputPanel').then(mod => mod.CurrencyInputPanel), {
  loading: () => <div className="h-32 bg-primary/5 animate-pulse rounded-lg" />
});

const ResultsPanel = dynamic(() => import('./ResultsPanel').then(mod => mod.ResultsPanel), {
  loading: () => <div className="h-24 bg-primary/5 animate-pulse rounded-lg" />
});

const HistoryPanel = dynamic(() => import('./HistoryPanel').then(mod => mod.HistoryPanel), {
  loading: () => <div className="h-48 bg-primary/5 animate-pulse rounded-lg" />
});

export function CurrencyCalculator() {
  const {
    inputs,
    results,
    history,
    groupedCurrencies,
    handleInputChange,
    calculateConversion,
    reset,
    error,
  } = useCurrencyCalculator();

  return (
    <div className="glass">
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
        <div className="p-6 space-y-6">
          <div className="space-y-1 mb-6">
            <h3 className="text-lg font-semibold">Currency Converter</h3>
            <p className="text-sm text-muted-foreground">
              Convert between different currency types using current market rates
            </p>
          </div>

          <CurrencyInputPanel
            inputs={inputs}
            groupedCurrencies={groupedCurrencies}
            onChange={handleInputChange}
            onCalculate={calculateConversion}
            onReset={reset}
            error={error}
          />
          {results && <ResultsPanel results={results} />}
        </div>

        <div className="lg:border-l border-border/60 bg-muted/10 backdrop-blur-sm p-6">
          <div className="space-y-1 mb-6">
            <h3 className="text-lg font-semibold">Conversion History</h3>
            <p className="text-sm text-muted-foreground">
              Recent currency conversions and their rates
            </p>
          </div>
          <HistoryPanel history={history} />
        </div>
      </div>
    </div>
  );
}
