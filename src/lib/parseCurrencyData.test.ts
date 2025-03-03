import { describe, it, expect } from 'vitest';
import { parseCurrencyData } from './parseCurrencyData';

describe('parseCurrencyData', () => {
  describe('when given valid currency data', () => {
    it('parses the date and currencies correctly', () => {
      // Arrange
      const mockData = `03 Mar 2025 #43
Country|Currency|Amount|Code|Rate
Australia|dollar|1|AUD|15.234
Brazil|real|1|BRL|4.565
Bulgaria|lev|1|BGN|12.678
Canada|dollar|1|CAD|16.789
China|renminbi|1|CNY|3.456
Denmark|krone|1|DKK|3.345
EMU|euro|1|EUR|24.567
Great Britain|pound|1|GBP|28.901
Hong Kong|dollar|1|HKD|2.899
Hungary|forint|100|HUF|6.321`;

      // Act
      const result = parseCurrencyData(mockData);

      // Assert
      expect(result.date).toBe('03 Mar 2025');
      expect(Array.isArray(result.currencies)).toBe(true);
      expect(result.currencies.length).toBe(10);
    });

    it('parses individual currency details correctly', () => {
      // Arrange
      const mockData = `03 Mar 2025 #43
Country|Currency|Amount|Code|Rate
EMU|euro|1|EUR|24.567
Hungary|forint|100|HUF|6.321`;

      // Act
      const result = parseCurrencyData(mockData);
      const eur = result.currencies.find(item => item.code === 'EUR');
      const huf = result.currencies.find(item => item.code === 'HUF');

      // Assert
      expect(eur).toBeDefined();
      expect(eur?.country).toBe('EMU');
      expect(eur?.currency).toBe('euro');
      expect(eur?.amount).toBe(1);
      expect(eur?.rate).toBe(24.567);

      expect(huf).toBeDefined();
      expect(huf?.amount).toBe(100);
      expect(huf?.rate).toBe(6.321);
    });
  });

  describe('when given empty data', () => {
    it('returns an empty currency array without throwing an error', () => {
      // Arrange
      const emptyData = '';

      // Act
      const result = parseCurrencyData(emptyData);

      // Assert
      expect(result.currencies).toEqual([]);
    });
  });

  describe('when given malformed data', () => {
    it('does not throw an error and skips malformed entries', () => {
      // Arrange
      const malformedData = `03 Mar 2025 #43
Country|Currency|Amount|Code|Rate
Australia|dollar|AUD|15.234`;

      // Act
      const result = parseCurrencyData(malformedData);

      // Assert
      expect(result.currencies.length).toBe(0);
    });
  });
});
