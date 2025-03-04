import { useState, useEffect } from 'react';
import { config } from '../config';
import { convertFromCZK } from '../lib/currencyService';
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

const CurrencyConverter = ({ currencyData }: ICurrencyConverterProps) => {
  const [targetCurrency, setTargetCurrency] = useState<string>(config.defaultCurrency);
  const [amount, setAmount] = useState<string>('');
  const [result, setResult] = useState<number>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (currencyData.currencies.length > 0) {
      const defaultCurrency = currencyData.currencies.find(item => item.code === config.defaultCurrency);
      if (defaultCurrency) {
        setTargetCurrency(defaultCurrency.code);
      } else {
        setTargetCurrency(currencyData.currencies[0].code);
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
    setTargetCurrency(selectEl.value);
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

    const convertedAmount = convertFromCZK(amountNum, targetCurrency, currencyData);

    if (convertedAmount === undefined) {
      setError(`Currency ${targetCurrency} not found`);
      setResult(undefined);
    } else {
      setResult(convertedAmount);
    }
  };

  const formatResult = (value: number): string => new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  }).format(value);

  return (
    <ConverterContainer>
      <Title>Currency Converter</Title>

      <Form onSubmit={handleConversion}>
        <FormGroup>
          <Label htmlFor="amount">Amount in CZK</Label>
          <Input
            id="amount"
            type="number"
            name="some-amount"
            value={amount}
            onChange={handleAmountChange}
            placeholder="Enter amount in CZK"
            step="0.01"
            min="0"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="currency">Target Currency</Label>
          <Select
            id="currency"
            name="currency"
            value={targetCurrency}
            onChange={handleCurrencyChange}
          >
            {currencyData.currencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.code} - {currency.currency}
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
          {amount} CZK = <strong>{formatResult(result)} {targetCurrency}</strong>
        </Result>
      )}
    </ConverterContainer>
  );
}

export default CurrencyConverter;
