import { useState, useEffect } from 'react';
import { config } from '../config';
import { convertToCZK, convertFromCZK } from '../lib/currencyService';
import type { ICurrencyData } from '../lib/parseCurrencyData';
import {
  Result,
  Form,
  Button,
  Label,
  Select,
  Title,
  FormGroup,
  ConverterContainer,
  ErrorMessage,
  Input,
  ButtonContainer
} from './CurrencyConverter.styled';

interface ICurrencyConverterProps {
  currencyData: ICurrencyData;
}

type ConversionDirection = 'toCZK' | 'fromCZK';

const CurrencyConverter = ({ currencyData }: ICurrencyConverterProps) => {
  const [currency, setCurrency] = useState<string>(config.defaultCurrency);
  const [amount, setAmount] = useState<string>('');
  const [result, setResult] = useState<number>();
  const [error, setError] = useState<string>();
  const [direction, setDirection] = useState<ConversionDirection>('fromCZK');

  useEffect(() => {
    if (currencyData.currencies.length > 0) {
      const defaultCurrency = currencyData.currencies.find(item => item.code === config.defaultCurrency);
      if (defaultCurrency) {
        setCurrency(defaultCurrency.code);
      } else {
        setCurrency(currencyData.currencies[0].code);
      }
    }
  }, [currencyData]);

  const handleAmountChange = (event: Event) => {
    const inputEl = event.target as HTMLInputElement;

    setResult(undefined);
    setAmount(inputEl.value);

    if (error) {
      setError(undefined);
    }
  };

  const handleCurrencyChange = (event: Event) => {
    const selectEl = event.target as HTMLSelectElement;

    setResult(undefined);
    setCurrency(selectEl.value);
  };

  const handleDirectionChange = (newDirection: ConversionDirection) => {
    setResult(undefined);
    setDirection(newDirection);
    if (error) {
      setError(undefined);
    }
  };

  const handleConversion = (event: Event) => {
    event.preventDefault();

    const amountNum = parseFloat(amount);

    if (isNaN(amountNum)) {
      setError('Please enter a valid number');
      setResult(undefined);
      return;
    }

    if (amountNum <= 0) {
      setError('Please enter an amount greater than zero');
      setResult(undefined);
      return;
    }

    setError(undefined);

    let convertedAmount: number | undefined;

    if (direction === 'fromCZK') {
      convertedAmount = convertFromCZK(amountNum, currency, currencyData);
    } else {
      convertedAmount = convertToCZK(amountNum, currency, currencyData);
    }

    if (convertedAmount === undefined) {
      setError(`Currency ${currency} not found`);
      setResult(undefined);
    } else {
      setResult(convertedAmount);
    }
  };

  const formatResult = (value: number): string => new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  }).format(value);

  const getAmountLabel = (): string => direction === 'fromCZK' ? 'Amount in CZK' : `Amount in ${currency}`;

  const getAmountPlaceholder = (): string => direction === 'fromCZK' ? 'Enter amount in CZK' : `Enter amount in ${currency}`;

  const getResultDisplay = (): string => {
    if (direction === 'fromCZK') {
      return `${amount} CZK = ${formatResult(result!)} ${currency}`;
    }
      return `${amount} ${currency} = ${formatResult(result!)} CZK`;

  };

  return (
    <ConverterContainer>
      <Title>Currency Converter</Title>

      <Form onSubmit={handleConversion}>
        <FormGroup>
          <Label>Conversion Direction</Label>
          <div style={{ display: 'flex', gap: 'var(--spacing-md)', marginTop: 'var(--spacing-xs)' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)', cursor: 'pointer' }}>
              <input
                type="radio"
                name="direction"
                checked={direction === 'fromCZK'}
                onChange={() => handleDirectionChange('fromCZK')}
              />
              CZK → Foreign Currency
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)', cursor: 'pointer' }}>
              <input
                type="radio"
                name="direction"
                checked={direction === 'toCZK'}
                onChange={() => handleDirectionChange('toCZK')}
              />
              Foreign Currency → CZK
            </label>
          </div>
        </FormGroup>

        <FormGroup />

        <FormGroup>
          <Label htmlFor="amount">{getAmountLabel()}</Label>
          <Input
            id="amount"
            type="number"
            name="some-amount"
            value={amount}
            onChange={handleAmountChange}
            placeholder={getAmountPlaceholder()}
            step="0.01"
            min="0"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="currency">
            {direction === 'fromCZK' ? 'Target Currency' : 'Source Currency'}
          </Label>
          <Select
            id="currency"
            name="currency"
            value={currency}
            onChange={handleCurrencyChange}
          >
            {currencyData.currencies.map((curr) => (
              <option key={curr.code} value={curr.code}>
                {curr.code} - {curr.currency}
              </option>
            ))}
          </Select>
        </FormGroup>

        <ButtonContainer>
          <Button type="submit">Convert</Button>
        </ButtonContainer>
      </Form>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {result && (
        <Result>
          <strong>{getResultDisplay()}</strong>
        </Result>
      )}
    </ConverterContainer>
  );
}

export default CurrencyConverter;
