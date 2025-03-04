import { styled } from "@linaria/react";

export const ConverterContainer = styled.div`
  border-radius: var(--border-radius-md);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-lg);
  margin: var(--spacing-xl) 0;
  width: 100%;
`;

export const Title = styled.h2`
  margin-top: 0;
  color: var(--color-text);
  font-size: var(--font-size-xl);
`;

export const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-lg);

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ButtonContainer = styled.div`
  grid-column: 1;
  margin-top: var(--spacing-xs);

  @media (min-width: 768px) {
    grid-column: 1 / span 2;
  }
`;

export const Label = styled.label`
  margin-bottom: var(--spacing-xs);
  font-weight: 500;
  color: var(--color-text);
`;

export const Input = styled.input`
  padding: var(--spacing-sm);
  border: 1px solid var(--color-input-border);
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-base);
  transition: border-color var(--transition-fast);

  &:focus {
    border-color: var(--color-primary);
    outline: none;
  }
`;

export const Select = styled.select`
  padding: var(--spacing-sm);
  border: 1px solid var(--color-input-border);
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-base);
  background-color: white;
  transition: border-color var(--transition-fast);
  appearance: none;

  &:focus {
    border-color: var(--color-primary);
    outline: none;
  }
`;

export const Button = styled.button`
  padding: var(--spacing-sm) var(--spacing-lg);
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-base);
  cursor: pointer;
  transition: background-color var(--transition-fast);
  width: 100%;

  &:hover {
    background-color: var(--color-primary-hover);
  }

  &:disabled {
    background-color: var(--color-primary-light);
    cursor: not-allowed;
  }
`;

export const Result = styled.div`
  margin-top: var(--spacing-lg);
  padding: var(--spacing-lg);
  background-color: var(--color-background-alt-dark);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-xl);
  text-align: center;
`;

export const ErrorMessage = styled.div`
  margin-top: var(--spacing-md);
  color: var(--color-error);
  font-size: var(--font-size-sm);
`;
