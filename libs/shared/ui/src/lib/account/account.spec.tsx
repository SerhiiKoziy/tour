import { render, screen } from '@testing-library/react';
import { useTranslation } from 'react-i18next';
import {
  myAccountDetails as mockedAccountDetails,
  orderHistory as mockedOrderHistory,
  vouchers as mockedVouchers,
} from '@visit/ecomm-lib/shared/data-access';

import AccountWrapper from './account';

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

describe('AccountDetailsForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <AccountWrapper
        myAccountDetails={mockedAccountDetails}
        orderHistory={mockedOrderHistory}
        vouchers={mockedVouchers}
      />
    );
    expect(baseElement).toBeTruthy();

    expect(screen.findByText('account.title')).toBeTruthy();
    expect(screen.findByText('account.upcomingTours.title')).toBeTruthy();
    expect(screen.findByText('account.orderHistory.title')).toBeTruthy();
    expect(screen.findByText('account.accountDetails.title')).toBeTruthy();
    expect(screen.findByText('account.giftCards')).toBeTruthy();
  });
});
