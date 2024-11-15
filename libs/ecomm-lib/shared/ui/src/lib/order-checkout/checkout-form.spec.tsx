import { act } from 'react-dom/test-utils';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useTranslation } from 'react-i18next';
import { InformationForm, PaymentForm } from './checkout-form';

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}));

const tSpy = jest.fn((str: string, config: unknown): string | Array<string> =>
  config ? ['dummy phone'] : str
);
const useTranslationSpy = useTranslation as jest.Mock;

useTranslationSpy.mockReturnValue({
  t: tSpy,
});

describe('InformationForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <InformationForm setValues={jest.fn()} changeAccordion={jest.fn()} />
    );

    expect(baseElement).toBeTruthy();
  });

  it('should have Next button disabled with empty form', () => {
    const mockSetValues = jest.fn();
    render(
      <InformationForm setValues={mockSetValues} changeAccordion={jest.fn()} />
    );

    const nextButton = screen.getByRole('button', { name: /checkout\.next/i });
    fireEvent.click(nextButton);
    expect(mockSetValues).not.toHaveBeenCalled();
  });

  // TODO this test is flickering. Please add a better way to get this to be deterministic
  it('should handle Next button callback successfully', async () => {
    const mockSetValues = jest.fn();
    render(
      <InformationForm setValues={mockSetValues} changeAccordion={jest.fn()} />
    );

    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/firstName/i), 'John');
    await user.type(screen.getByLabelText(/lastName/i), 'Doe');
    await user.type(screen.getByLabelText(/email/i), 'john.dee@someemail.com');
    await user.type(screen.getByLabelText(/phone/i), '123456789');
    await user.selectOptions(
      screen.getByRole('combobox', { name: /country/i }),
      screen.getByRole('option', { name: 'Colombia' })
    );

    const nextButton = screen.getByRole('button', { name: /checkout\.next/i });

    await act(() => {
      fireEvent.click(nextButton);
    });

    await waitFor(() =>
      expect(mockSetValues).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.dee@someemail.com',
        phone: '123456789',
        country: 'Col',
        moreInfo: '',
      })
    );

    expect(mockSetValues).toHaveBeenCalledTimes(1);
  }, 10000);
});

describe('PaymentForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <PaymentForm setValues={jest.fn()} changeAccordion={jest.fn()} />
    );

    expect(baseElement).toBeTruthy();
  });

  it('should have Complete Order button disabled with empty form', () => {
    const mockSetValues = jest.fn();
    render(
      <PaymentForm setValues={mockSetValues} changeAccordion={jest.fn()} />
    );

    const completeButton = screen.getByRole('button', {
      name: /checkout\.complete/i,
    });
    fireEvent.click(completeButton);
    expect(mockSetValues).not.toHaveBeenCalled();
  });
});

describe('PaymentForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <PaymentForm setValues={jest.fn()} changeAccordion={jest.fn()} />
    );

    expect(baseElement).toBeTruthy();
  });

  it('should have Complete Order button disabled with empty form', () => {
    const mockSetValues = jest.fn();
    render(
      <PaymentForm setValues={mockSetValues} changeAccordion={jest.fn()} />
    );

    const completeButton = screen.getByRole('button', {
      name: /checkout\.complete/i,
    });
    fireEvent.click(completeButton);
    expect(mockSetValues).not.toHaveBeenCalled();
  });
});
