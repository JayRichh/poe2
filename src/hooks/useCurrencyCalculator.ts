"use client";

import { useState, useCallback, useMemo } from 'react';
import type { CurrencyInputs, CurrencyResults } from '~/types/currency';
import { groupCurrencies, type GroupedCurrency } from '~/lib/currencies/utils';

export function useCurrencyCalculator() {
  const [inputs, setInputs] = useState<CurrencyInputs>({
    amount: 0,
    fromCurrency: 'Chaos Orb',
    toCurrency: 'Divine Orb',
  });

  const [results, setResults] = useState<CurrencyResults | null>(null);
  const [history, setHistory] = useState<CurrencyResults[]>([]);

  const groupedCurrencies = useMemo(() => groupCurrencies(), []);
  const allCurrencies = useMemo(() => {
    return Object.values(groupedCurrencies).flat();
  }, [groupedCurrencies]);

  const [error, setError] = useState<string | null>(null);

  const calculateConversion = useCallback(() => {
    try {
      setError(null);
      const fromCurrency = allCurrencies.find(c => c.name === inputs.fromCurrency);
      const toCurrency = allCurrencies.find(c => c.name === inputs.toCurrency);
      
      // Validate currencies have values defined
      if (!fromCurrency?.value || !toCurrency?.value) {
        throw new Error("Cannot convert between these currencies - values not defined");
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

      // Log for debugging
      console.log('Conversion details:', {
        source: `${inputs.amount} ${inputs.fromCurrency} × ${fromRate} chaos = ${totalChaosValue} chaos`,
        target: `${totalChaosValue} chaos ÷ ${toRate} = ${convertedAmount.toFixed(2)} ${inputs.toCurrency}`,
        rate: `1 ${inputs.fromCurrency} = ${rate.toFixed(4)} ${inputs.toCurrency}`,
        check: `${inputs.amount} × ${rate.toFixed(4)} = ${convertedAmount.toFixed(2)}`
      });

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
      setHistory(prev => [result, ...prev].slice(0, 10));

      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setResults(null);
      return null;
    }
  }, [inputs, allCurrencies]);

  const handleInputChange = useCallback((updates: Partial<CurrencyInputs>) => {
    setInputs(prev => ({ ...prev, ...updates }));
  }, []);

  const reset = useCallback(() => {
    setInputs({
      amount: 0,
      fromCurrency: 'Chaos Orb',
      toCurrency: 'Divine Orb',
    });
    setResults(null);
  }, []);

  return {
    inputs,
    results,
    history,
    rates: allCurrencies,
    groupedCurrencies,
    handleInputChange,
    calculateConversion,
    reset,
    error,
  };
}
