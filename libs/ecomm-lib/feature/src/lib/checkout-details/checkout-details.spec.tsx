import { render } from '@testing-library/react';
import { vouchers as mockedVouchers } from '@visit/ecomm-lib/shared/data-access';

import { useTranslation } from 'react-i18next';

import CheckoutDetails from './checkout-details';

jest.mock('next/image', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('next/router', () => ({
  useRouter: () => {
    return {
      push: jest.fn(),
    };
  },
}));

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

describe('CheckoutDetails', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        pathname: 'checkout/checkout',
        media: query,
        voucherId: null,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it('should render successfully', () => {
    render(<CheckoutDetails cities={[]} vouchers={mockedVouchers} />);
    expect(
      'Rome in a Day Tour With Colosseum and Vatican Museums'
    ).toBeTruthy();
  });

  it('if voucher list empty', () => {
    render(<CheckoutDetails cities={[]} vouchers={[]} />);
    expect('You don’t have upcoming tours yet :(').toBeTruthy();
  });
});
