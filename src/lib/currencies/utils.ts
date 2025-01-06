import currencies from './currencies.json';

export type CurrencyGroup = 'basic' | 'catalysts' | 'distilled' | 'essences' | 'omens';

export interface GroupedCurrency {
  name: string;
  image_url: string;
  value: number;
  group: CurrencyGroup;
  description?: string;
  uses?: string;
}

const CURRENCY_VALUES: Record<string, number> = {
  'Chaos Orb': 1,
  'Divine Orb': 180,
  'Exalted Orb': 10,
  'Vaal Orb': 1,
  'Orb of Alchemy': 0.5,
  'Regal Orb': 0.5,
  'Orb of Chance': 0.125,
  'Orb of Annulment': 2,
  'Orb of Augmentation': 0.125,
  'Orb of Transmutation': 0.05,
  'Gemcutter\'s Prism': 1,
  'Mirror of Kalandra': 36000,
};

export function groupCurrencies(): Record<CurrencyGroup, GroupedCurrency[]> {
  const grouped: Record<CurrencyGroup, GroupedCurrency[]> = {
    basic: [],
    catalysts: [],
    distilled: [],
    essences: [],
    omens: [],
  };

  currencies.forEach(currency => {
    const group: CurrencyGroup = 
      currency.name.includes('Catalyst') ? 'catalysts' :
      currency.name.includes('Distilled') ? 'distilled' :
      currency.name.includes('Essence') ? 'essences' :
      currency.name.includes('Omen') ? 'omens' :
      'basic';

    // Only filter by image_url for basic currencies, show all others
    if ((group === 'basic' ? (currency.image_url && CURRENCY_VALUES[currency.name]) : true)) {
      grouped[group].push({
        name: currency.name,
        image_url: currency.image_url,
        value: CURRENCY_VALUES[currency.name] || 0,
        group,
        description: currency.description,
        uses: currency.uses,
      });
    }
  });

  // Sort basic currencies by value descending
  grouped.basic.sort((a, b) => b.value - a.value);

  // Sort other groups alphabetically
  ['catalysts', 'distilled', 'essences', 'omens'].forEach(group => {
    grouped[group as CurrencyGroup].sort((a, b) => a.name.localeCompare(b.name));
  });

  return grouped;
}

export function getCurrencyByName(name: string): GroupedCurrency | undefined {
  const allGroups = groupCurrencies();
  for (const group of Object.values(allGroups)) {
    const found = group.find(c => c.name === name);
    if (found) return found;
  }
  return undefined;
}
