import { render, screen } from '@testing-library/react';
import { useTranslation } from 'react-i18next';

import { City } from '@visit/ecomm-lib/shared/data-access';

import Checkout from './checkout';

window.scrollTo = jest.fn();

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

describe('Checkout', () => {
  let cities: City[];

  beforeAll(() => {
    cities = [];
  });

  it('should render successfully', () => {
    const { baseElement } = render(<Checkout cities={cities} />);

    expect(baseElement).toBeTruthy();

    // Order Checkout
    expect(screen.getByText('checkout.order')).toBeTruthy();
    expect(screen.getByText('checkout.information.title')).toBeTruthy();
    expect(screen.getByText('checkout.payment.title')).toBeTruthy();

    // Footer
    expect(screen.getByText('letsPartner')).toBeTruthy();
  });
});
