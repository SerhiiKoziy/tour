import { render, screen } from '@testing-library/react';
import { vouchers as mockedVouchers } from '@visit/ecomm-lib/shared/data-access';

import { useTranslation } from 'react-i18next';

import VoucherList from './voucher-list';

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

describe('VoucherList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<VoucherList vouchers={mockedVouchers} />);
    expect(baseElement).toBeTruthy();

    const displayedVouchers = screen.queryAllByText(
      'Rome in a Day Tour With Colosseum and Vatican Museums'
    );
    expect(displayedVouchers.length).toEqual(3);
  });
});
