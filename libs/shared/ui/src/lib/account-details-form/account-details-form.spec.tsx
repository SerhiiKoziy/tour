import { render, screen } from '@testing-library/react';
import { useTranslation } from 'react-i18next';
import { MyAccountDetails } from '@visit/ecomm-lib/shared/data-access';

import AccountDetailsForm from './account-details-form';

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
    const myAccountDetails: MyAccountDetails = {
      firstName: 'Oleh',
      lastName: 'Sheptytskyi',
      email: 'oleh.sheptytskyi@excited.agency',
      number: '+1 234 567 8901',
      date: 'Sep 23, 2021',
      country: 'United States',
      city: '',
    };

    const { baseElement } = render(
      <AccountDetailsForm myAccountDetails={myAccountDetails} />
    );
    expect(baseElement).toBeTruthy();

    expect(
      screen.findByText('account.accountDetails.personalInfo')
    ).toBeTruthy();
    expect(screen.findByText('account.accountDetails.location')).toBeTruthy();
    expect(screen.findByText('account.accountDetails.security')).toBeTruthy();
  });
});
