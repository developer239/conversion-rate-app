import { config } from '../config';
import { type ICurrencyData, parseCurrencyData } from './parseCurrencyData';

export const fetchCurrencyRates = async (): Promise<ICurrencyData> => {
  try {
    const response = await fetch(`${config.cnbApiUrl}/daily.txt`);

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
    }

    const data = await response.text();
    return parseCurrencyData(data);
  } catch (error) {
    console.error('Error fetching currency rates:', error);
    throw error;
  }
};

export const convertFromCZK = (
  amount: number,
  targetCurrency: string,
  currencyData: ICurrencyData
): number | undefined => {
  const currency = currencyData.currencies.find(item => item.code === targetCurrency);

  if (!currency) {
    return undefined
  }

  return amount * currency.amount / currency.rate;
};
