export interface ICurrency {
  country: string;
  currency: string;
  amount: number;
  code: string;
  rate: number;
}

export interface ICurrencyData {
  date: string;
  currencies: ICurrency[];
}

// Parses the currency data from the Czech National Bank API
// Format:
// Line 1: DD MMM YYYY #NUM (e.g., "03 Mar 2025 #43")
// Line 2: Country|Currency|Amount|Code|Rate
// Line 3+: The actual data
export const parseCurrencyData = (data: string): ICurrencyData => {
  const lines = data.trim().split('\n');

  const dateMatch = /(\d{2} [A-Za-z]{3} \d{4})/u.exec(lines[0] || '');
  const date = dateMatch ? dateMatch[1] : new Date().toDateString();

  const currencies: ICurrency[] = [];

  for (let i = 2; i < lines.length; i += 1) {
    const parts = lines[i].split('|');

    // Skip lines with insufficient data
    if (parts.length < 5) {
      continue;
    }

    const [country, currencyName, amountStr, code, rateStr] = parts;

    // Validate that we have all necessary data
    if (!country || !currencyName || !amountStr || !code || !rateStr) {
      continue;
    }

    const amount = parseInt(amountStr.trim(), 10) || 1;
    const rate = parseFloat((rateStr || '0').replace(',', '.')) || 0;

    currencies.push({
      country: country.trim(),
      currency: currencyName.trim(),
      amount,
      code,
      rate
    });
  }

  return { date, currencies };
};
