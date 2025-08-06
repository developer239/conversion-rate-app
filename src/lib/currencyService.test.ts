import { describe, it, expect } from 'vitest';
import { convertToCZK, convertFromCZK } from './currencyService';
import type { ICurrencyData } from './parseCurrencyData';

// Mock currency data for testing
const mockCurrencyData: ICurrencyData = {
  date: '03 Mar 2025',
  currencies: [
    { country: 'EMU', currency: 'euro', amount: 1, code: 'EUR', rate: 24.567 },
    { country: 'Hungary', currency: 'forint', amount: 100, code: 'HUF', rate: 6.321 },
    { country: 'United States', currency: 'dollar', amount: 1, code: 'USD', rate: 22.345 },
    { country: 'Great Britain', currency: 'pound', amount: 1, code: 'GBP', rate: 28.901 }
  ]
};

describe('convertToCZK', () => {
  describe('when given valid currency and amount', () => {
    it('converts EUR to CZK correctly', () => {
      // Arrange
      const amount = 100;
      const sourceCurrency = 'EUR';

      // Act
      const result = convertToCZK(amount, sourceCurrency, mockCurrencyData);

      // Assert
      expect(result).toBeDefined();
      expect(result).toBe(2456.7); // (100 / 1) * 24.567
    });

    it('converts HUF to CZK correctly (with amount > 1)', () => {
      // Arrange
      const amount = 1000;
      const sourceCurrency = 'HUF';

      // Act
      const result = convertToCZK(amount, sourceCurrency, mockCurrencyData);

      // Assert
      expect(result).toBeDefined();
      expect(result).toBeCloseTo(63.21, 2); // (1000 / 100) * 6.321
    });

    it('converts USD to CZK correctly', () => {
      // Arrange
      const amount = 50;
      const sourceCurrency = 'USD';

      // Act
      const result = convertToCZK(amount, sourceCurrency, mockCurrencyData);

      // Assert
      expect(result).toBeDefined();
      expect(result).toBe(1117.25); // (50 / 1) * 22.345
    });

    it('converts GBP to CZK correctly', () => {
      // Arrange
      const amount = 25;
      const sourceCurrency = 'GBP';

      // Act
      const result = convertToCZK(amount, sourceCurrency, mockCurrencyData);

      // Assert
      expect(result).toBeDefined();
      expect(result).toBe(722.525); // (25 / 1) * 28.901
    });
  });

  describe('when given decimal amounts', () => {
    it('handles decimal amounts correctly', () => {
      // Arrange
      const amount = 12.5;
      const sourceCurrency = 'EUR';

      // Act
      const result = convertToCZK(amount, sourceCurrency, mockCurrencyData);

      // Assert
      expect(result).toBeDefined();
      expect(result).toBe(307.0875); // (12.5 / 1) * 24.567
    });
  });

  describe('when given invalid currency code', () => {
    it('returns undefined for non-existent currency', () => {
      // Arrange
      const amount = 100;
      const sourceCurrency = 'INVALID';

      // Act
      const result = convertToCZK(amount, sourceCurrency, mockCurrencyData);

      // Assert
      expect(result).toBeUndefined();
    });

    it('returns undefined for empty currency code', () => {
      // Arrange
      const amount = 100;
      const sourceCurrency = '';

      // Act
      const result = convertToCZK(amount, sourceCurrency, mockCurrencyData);

      // Assert
      expect(result).toBeUndefined();
    });
  });

  describe('when given edge case amounts', () => {
    it('handles zero amount correctly', () => {
      // Arrange
      const amount = 0;
      const sourceCurrency = 'EUR';

      // Act
      const result = convertToCZK(amount, sourceCurrency, mockCurrencyData);

      // Assert
      expect(result).toBeDefined();
      expect(result).toBe(0);
    });

    it('handles very small amounts correctly', () => {
      // Arrange
      const amount = 0.01;
      const sourceCurrency = 'EUR';

      // Act
      const result = convertToCZK(amount, sourceCurrency, mockCurrencyData);

      // Assert
      expect(result).toBeDefined();
      expect(result).toBe(0.24567); // (0.01 / 1) * 24.567
    });
  });
});

describe('convertFromCZK', () => {
  describe('when given valid currency and amount', () => {
    it('converts CZK to EUR correctly', () => {
      // Arrange
      const amount = 2456.7;
      const targetCurrency = 'EUR';

      // Act
      const result = convertFromCZK(amount, targetCurrency, mockCurrencyData);

      // Assert
      expect(result).toBeDefined();
      expect(result).toBeCloseTo(100, 2); // 2456.7 * 1 / 24.567
    });

    it('converts CZK to HUF correctly (with amount > 1)', () => {
      // Arrange
      const amount = 63.21;
      const targetCurrency = 'HUF';

      // Act
      const result = convertFromCZK(amount, targetCurrency, mockCurrencyData);

      // Assert
      expect(result).toBeDefined();
      expect(result).toBe(1000); // 63.21 * 100 / 6.321
    });
  });

  describe('when given invalid currency code', () => {
    it('returns undefined for non-existent currency', () => {
      // Arrange
      const amount = 100;
      const targetCurrency = 'INVALID';

      // Act
      const result = convertFromCZK(amount, targetCurrency, mockCurrencyData);

      // Assert
      expect(result).toBeUndefined();
    });
  });
});
