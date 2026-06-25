"use client";

import { useCallback, useMemo, useState } from "react";

import { useLocalStorage } from "~/hooks/useLocalStorage";
import { type GroupedCurrency, groupCurrencies } from "~/lib/currencies/utils";
import type { CurrencyInputs, CurrencyResults } from "~/types/currency";

// Persisted via the shared useLocalStorage hook (SSR-safe, try/catch, cross-tab sync).
const HISTORY_KEY = "poe2:currency-history";

export function useCurrencyCalculator() {
  const [inputs, setInputs] = useState<CurrencyInputs>({
    amount: 0,
    fromCurrency: "Chaos Orb",
    toCurrency: "Divine Orb",
  });

  const [results, setResults] = useState<CurrencyResults | null>(null);
  const [history, setHistory] = useLocalStorage<CurrencyResults[]>(HISTORY_KEY, []);

  const groupedCurrencies = useMemo(() => groupCurrencies(), []);
  const allCurrencies = useMemo(() => {
    return Object.values(groupedCurrencies).flat();
  }, [groupedCurrencies]);

  const [error, setError] = useState<string | null>(null);

  const calculateConversion = useCallback(() => {
    try {
      setError(null);
      const fromCurrency = allCurrencies.find((c) => c.name === inputs.fromCurrency);
      const toCurrency = allCurrencies.find((c) => c.name === inputs.toCurrency);

      // Validate currencies exist and have a reference price (un-priced
      // currencies have value 0 and cannot be converted — say so clearly).
      if (!fromCurrency || !toCurrency) {
        throw new Error("Currency not found");
      }
      if (!fromCurrency.value || !toCurrency.value) {
        const unpriced = !fromCurrency.value ? fromCurrency.name : toCurrency.name;
        throw new Error(`No reference price for ${unpriced}. Pick a currency shown with a chaos value.`);
      }

      // Validate amount
      if (inputs.amount <= 0) {
        throw new Error("Amount must be greater than 0");
      }

      // Validate not same currency
      if (inputs.fromCurrency === inputs.toCurrency) {
        throw new Error("Cannot convert to the same currency");
      }

      const fromRate = fromCurrency.value;
      const toRate = toCurrency.value;

      // Calculate conversion: (amount * fromRate in chaos) / toRate in chaos
      // Calculate conversion through chaos values
      const totalChaosValue = inputs.amount * fromRate; // Convert source amount to chaos
      const convertedAmount = totalChaosValue / toRate; // Convert chaos to target currency
      const rate = fromRate / toRate; // How many target currency per 1 source currency

      const now = Date.now();
      const result: CurrencyResults = {
        amount: inputs.amount,
        fromCurrency: inputs.fromCurrency,
        toCurrency: inputs.toCurrency,
        convertedAmount,
        rate,
        timestamp: now,
      };

      setResults(result);
      setHistory((prev) => [result, ...prev].slice(0, 10));

      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setResults(null);
      return null;
    }
  }, [inputs, allCurrencies]);

  const handleInputChange = useCallback((updates: Partial<CurrencyInputs>) => {
    setInputs((prev) => ({ ...prev, ...updates }));
  }, []);

  const reset = useCallback(() => {
    setInputs({
      amount: 0,
      fromCurrency: "Chaos Orb",
      toCurrency: "Divine Orb",
    });
    setResults(null);
  }, []);

  const clearHistory = useCallback(() => setHistory([]), []);

  return {
    inputs,
    results,
    history,
    rates: allCurrencies,
    groupedCurrencies,
    handleInputChange,
    calculateConversion,
    reset,
    clearHistory,
    error,
  };
}
