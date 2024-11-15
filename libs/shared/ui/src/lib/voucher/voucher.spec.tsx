import { render, screen } from '@testing-library/react';
import { vouchers as mockedVouchers } from '@visit/ecomm-lib/shared/data-access';

import { useTranslation } from 'react-i18next';

import Voucher from './voucher';

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

describe('Voucher', () => {
  it('should render successfully', () => {
    const voucher = mockedVouchers[0];
    const { baseElement } = render(<Voucher voucher={voucher} />);
    expect(baseElement).toBeTruthy();
    expect(
      screen.findAllByAltText(
        'Rome in a Day Tour With Colosseum and Vatican Museums'
      )
    ).toBeTruthy();
  });
});
