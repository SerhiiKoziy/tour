import { fireEvent, render, screen } from '@testing-library/react';
import { useTranslation } from 'react-i18next';
import { CheckoutPromo } from './checkout-promo';

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

describe('CheckoutPromo', () => {
  it('should render CheckoutPromo successfully', () => {
    const { baseElement } = render(
      <CheckoutPromo promoDiscount={null} setPromoDiscount={jest.fn()} />
    );

    expect(baseElement).toBeTruthy();
    expect(screen.getByPlaceholderText('checkout.promo')).toBeTruthy();
    expect(screen.getByRole('button', { name: /checkout\.add/i })).toBeTruthy();
  });
});
