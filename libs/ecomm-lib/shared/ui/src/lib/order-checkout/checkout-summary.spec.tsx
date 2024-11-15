import { fireEvent, render, screen } from '@testing-library/react';
import { useTranslation } from 'react-i18next';
import {
  CheckoutSummaryDesktop,
  CheckoutSummaryMobile,
} from './checkout-summary';
import {
  Order,
  orderCheckout as mockedCheckout,
} from '@visit/ecomm-lib/shared/data-access';

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

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('CheckoutSummary', () => {
  let summary: Order[];

  beforeAll(() => {
    summary = mockedCheckout;
  });

  it('should render CheckoutSummaryDesktop successfully', () => {
    const { baseElement } = render(
      <CheckoutSummaryDesktop
        summary={summary}
        promoDiscount={null}
        setPromoDiscount={jest.fn()}
      />
    );

    expect(baseElement).toBeTruthy();

    expect(screen.getAllByText('checkout.summary.title')).toBeTruthy();

    expect(screen.getByText('checkout.summary.total')).toBeTruthy();

    expect(screen.getByText('cartSummary.hoursFull')).toBeTruthy();
    expect(screen.getByText('cartSummary.hoursHalf')).toBeTruthy();

    expect(screen.getByText('cartSummary.years')).toBeTruthy();

    expect(screen.getByText('checkout.sslSecure')).toBeTruthy();

    expect(screen.getByText('checkout.cardSafe')).toBeTruthy();
  });

  it('should render Promo Discount in CheckoutSummaryDesktop successfully', () => {
    render(
      <CheckoutSummaryDesktop
        summary={summary}
        promoDiscount={{ code: 'PROMO15', value: 15 }}
        setPromoDiscount={jest.fn()}
      />
    );

    expect(screen.getByDisplayValue('PROMO15')).toBeTruthy();
    expect(screen.getByText('checkout.promo -15%')).toBeTruthy();
  });

  it('should render CheckoutSummaryMobile successfully', () => {
    const { baseElement } = render(
      <CheckoutSummaryMobile
        summary={summary}
        promoDiscount={null}
        setPromoDiscount={jest.fn()}
      />
    );

    expect(baseElement).toBeTruthy();

    expect(screen.getByText('checkout.summary.total')).toBeTruthy();
    expect(
      screen.getByRole('button', { name: /checkout.summary.title/i })
    ).toBeTruthy();
  });

  it('should open Mobile Summary drawer when clicking Summary button', () => {
    render(
      <CheckoutSummaryMobile
        summary={summary}
        promoDiscount={null}
        setPromoDiscount={jest.fn()}
      />
    );

    expect(screen.queryByText('checkout.summary.order')).not.toBeTruthy();

    const summaryBtn = screen.getByRole('button', {
      name: /checkout.summary.title/i,
    });

    fireEvent.click(summaryBtn);

    expect(screen.getByText('checkout.summary.order')).toBeTruthy();
  });

  it('should render Promo Discount in CheckoutSummaryMobile successfully', () => {
    render(
      <CheckoutSummaryMobile
        summary={summary}
        promoDiscount={{ code: 'PROMO15', value: 15 }}
        setPromoDiscount={jest.fn()}
      />
    );

    const summaryBtn = screen.getByRole('button', {
      name: /checkout.summary.title/i,
    });

    fireEvent.click(summaryBtn);

    expect(screen.getByDisplayValue('PROMO15')).toBeTruthy();
  });
});
