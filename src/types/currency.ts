export interface CurrencyRate {
  name: string;
  value: number;
  icon?: string;
}

export interface CurrencyInputs {
  amount: number;
  fromCurrency: string;
  toCurrency: string;
}

export interface CurrencyResults {
  amount: number;
  fromCurrency: string;
  toCurrency: string;
  convertedAmount: number;
  rate: number;
  timestamp: number;
}
