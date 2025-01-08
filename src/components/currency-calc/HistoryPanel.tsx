"use client";

import { useCurrencyCalculator } from "~/hooks/useCurrencyCalculator";

import type { CurrencyResults } from "~/types/currency";

import { CurrencyIcon } from "./CurrencyIcon";

interface HistoryPanelProps {
  history: CurrencyResults[];
}

export function HistoryPanel({ history }: HistoryPanelProps) {
  const { rates } = useCurrencyCalculator();
  if (history.length === 0) {
    return (
      <div className="glass p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">History</h2>
          <div className="text-xs text-muted-foreground">No records</div>
        </div>
        <div className="glass p-4 rounded-lg text-sm text-muted-foreground text-center">
          Your conversion history will appear here
        </div>
      </div>
    );
  }

  return (
    <div className="glass p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">History</h2>
        <div className="text-xs text-muted-foreground">{history.length} records</div>
      </div>
      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
        {history.map((result, index) => {
          // Get currency info for each history entry
          const fromCurrency = rates.find((r) => r.name === result.fromCurrency) || {
            name: result.fromCurrency,
            value: 0,
          };
          const toCurrency = rates.find((r) => r.name === result.toCurrency) || {
            name: result.toCurrency,
            value: 0,
          };
          return (
            <div
              key={index}
              className="glass p-3 rounded-lg transition-all duration-200 hover:translate-x-1"
            >
              <div className="space-y-2">
                {/* Main conversion */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <CurrencyIcon name={fromCurrency?.name || ""} size={24} />
                    <div className="truncate">
                      <div className="flex items-baseline gap-1">
                        <span className="text-sm font-medium numeric">
                          {result.amount.toLocaleString(undefined, {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })}
                        </span>
                        <span className="text-xs text-muted-foreground">{fromCurrency?.name}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {(result.amount * (fromCurrency?.value || 0)).toLocaleString(undefined, {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })}
                        c
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="text-sm text-muted-foreground">→</div>
                  </div>
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <CurrencyIcon name={toCurrency?.name || ""} size={24} />
                    <div className="truncate">
                      <div className="flex items-baseline gap-1">
                        <span className="text-sm font-medium numeric text-primary">
                          {result.convertedAmount.toLocaleString(undefined, {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                        <span className="text-xs text-muted-foreground">{toCurrency?.name}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {(result.convertedAmount * (toCurrency?.value || 0)).toLocaleString(
                          undefined,
                          { minimumFractionDigits: 0, maximumFractionDigits: 0 }
                        )}
                        c
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rate and timestamp */}
                <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border/40 pt-2">
                  <div>
                    1 {fromCurrency?.name} ={" "}
                    {result.rate.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{" "}
                    {toCurrency?.name}
                  </div>
                  <div>{new Date(result.timestamp).toLocaleString()}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
