"use client";

import type { CurrencyGroup, GroupedCurrency } from "~/lib/currencies/utils";
import type { CurrencyInputs } from "~/types/currency";

import { CurrencyIcon } from "./CurrencyIcon";

const GROUP_LABELS: Record<CurrencyGroup, string> = {
  basic: "Basic Currency",
  catalysts: "Catalysts",
  distilled: "Distilled Emotions",
  essences: "Essences",
  omens: "Omens",
};

interface CurrencyInputPanelProps {
  inputs: CurrencyInputs;
  groupedCurrencies: Record<CurrencyGroup, GroupedCurrency[]>;
  onChange: (updates: Partial<CurrencyInputs>) => void;
  onCalculate: () => void;
  onReset: () => void;
  error?: string | null;
}

export function CurrencyInputPanel({
  inputs,
  groupedCurrencies,
  onChange,
  onCalculate,
  onReset,
  error,
}: CurrencyInputPanelProps) {
  const fromCurrency = groupedCurrencies.basic.find((c) => c.name === inputs.fromCurrency);
  const isValid =
    inputs.amount > 0 &&
    inputs.fromCurrency &&
    inputs.toCurrency &&
    inputs.fromCurrency !== inputs.toCurrency;
  const getValidationMessage = () => {
    if (!inputs.amount || inputs.amount <= 0) return "Enter an amount greater than 0";
    if (!inputs.fromCurrency) return "Select source currency";
    if (!inputs.toCurrency) return "Select target currency";
    if (inputs.fromCurrency === inputs.toCurrency) return "Select different currencies";
    return "";
  };
  return (
    <div className="glass p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* From Currency */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">From Currency (Have)</label>
          <div className="relative">
            <select
              value={inputs.fromCurrency}
              onChange={(e) => onChange({ fromCurrency: e.target.value })}
              className="form-select w-full appearance-none pr-10 bg-background/50 border-border/50 focus:border-primary/50"
            >
              <option value="">Select currency</option>
              <optgroup label="Common">
                <option value="Chaos Orb">Chaos Orb</option>
                <option value="Divine Orb">Divine Orb</option>
                <option value="Exalted Orb">Exalted Orb</option>
                <option value="Vaal Orb">Vaal Orb</option>
              </optgroup>
              {Object.entries(groupedCurrencies)
                .filter(([group]) => group !== "basic")
                .map(([group, currencies]) => (
                  <optgroup key={group} label={group.charAt(0).toUpperCase() + group.slice(1)}>
                    {currencies.map((currency) => (
                      <option key={currency.name} value={currency.name}>
                        {currency.name}
                      </option>
                    ))}
                  </optgroup>
                ))}
              <optgroup label="Other Basic">
                {groupedCurrencies.basic
                  .filter(
                    (c) => !["Chaos Orb", "Divine Orb", "Exalted Orb", "Vaal Orb"].includes(c.name)
                  )
                  .map((currency) => (
                    <option key={currency.name} value={currency.name}>
                      {currency.name}
                    </option>
                  ))}
              </optgroup>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg
                className="w-4 h-4 text-foreground/60"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* To Currency */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">To Currency (Want)</label>
          <div className="relative">
            <select
              value={inputs.toCurrency}
              onChange={(e) => onChange({ toCurrency: e.target.value })}
              className="form-select w-full appearance-none pr-10 bg-background/50 border-border/50 focus:border-primary/50"
            >
              <option value="">Select currency</option>
              {Object.entries(groupedCurrencies).map(([group, currencies]) => (
                <optgroup key={group} label={group.charAt(0).toUpperCase() + group.slice(1)}>
                  {currencies.map((currency) => (
                    <option key={currency.name} value={currency.name}>
                      {currency.name}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg
                className="w-4 h-4 text-foreground/60"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Amount */}
      <div className="space-y-2">
        <div className="flex justify-between items-baseline">
          <label className="text-sm font-medium text-foreground">Amount (How Many)</label>
          {fromCurrency?.value ? (
            <span className="text-sm text-muted-foreground">
              Worth {(inputs.amount * fromCurrency.value).toFixed(0)} chaos
            </span>
          ) : inputs.fromCurrency ? (
            <span className="text-sm text-error/80">No rate available</span>
          ) : null}
        </div>
        <input
          type="number"
          min="0"
          step="1"
          value={inputs.amount}
          onChange={(e) => onChange({ amount: parseFloat(e.target.value) || 0 })}
          className="form-input w-full bg-background/50 border-border/50 focus:border-primary/50"
          placeholder="Enter amount of currency you have"
        />
      </div>

      {/* Validation & Actions */}
      <div className="space-y-3">
        {error && <div className="p-3 text-sm text-error bg-error/10 rounded-lg">{error}</div>}
        {!error && !isValid && (
          <div className="p-3 text-sm text-muted-foreground bg-background-secondary/50 rounded-lg">
            {getValidationMessage()}
          </div>
        )}
        <div className="flex items-center gap-3">
          <button
            onClick={onCalculate}
            disabled={!isValid}
            className="flex-1 btn-primary rounded-lg px-4 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            title={!isValid ? getValidationMessage() : undefined}
          >
            Calculate
          </button>
          <button onClick={onReset} className="btn-ghost rounded-lg px-4 py-2 text-sm">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
