import { render, screen } from '@testing-library/react';
import {
  orderHistory as mockedOrderHistory,
  myAccountDetails as mockedMyAccountDetails,
  vouchers as mockedVouchers,
} from '@visit/ecomm-lib/shared/data-access';

import AccountDetails from './account-details';

// TODO this should be in a beforeEach or beforeAll block to allow
// spies to be reset
import { useTranslation } from 'react-i18next';

jest.mock('@chakra-ui/react', () => {
  const originalModule = jest.requireActual('@chakra-ui/react');
  return {
    __esModule: true,
    ...originalModule,
    useBreakpointValue: jest.fn().mockImplementation(() => 0),
  };
});

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

// TODO this should be in a helper/mock lib

jest.mock('next/image', () => ({
  __esModule: true,
  default: () => {
    return 'Next image stub'; // whatever
  },
}));

// TODO this should be in a helper/mock lib

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

describe('AccountDetails', () => {
  it('AccountDetails should render successfully', () => {
    const { baseElement } = render(
      <AccountDetails
        cities={[]}
        orderHistory={mockedOrderHistory}
        myAccountDetails={mockedMyAccountDetails}
        vouchers={mockedVouchers}
      />
    );

    expect(baseElement).toBeTruthy();

    expect(screen.findByText('account.title')).toBeTruthy();
    expect(screen.findByText('account.accountDetails.title')).toBeTruthy();
    expect(screen.findByText('account.giftCards')).toBeTruthy();
  });

  it('AccountDetails empty vouchers', () => {
    render(
      <AccountDetails
        cities={[]}
        orderHistory={mockedOrderHistory}
        myAccountDetails={mockedMyAccountDetails}
        vouchers={[]}
      />
    );

    expect(
      screen.findByText('account.upcomingTours.youDontHaveTours')
    ).toBeTruthy();
  });
});
