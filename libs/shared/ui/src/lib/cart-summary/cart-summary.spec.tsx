import { render, screen } from '@testing-library/react';
import { cartSummary as mockedCartSummary } from '@visit/ecomm-lib/shared/data-access';

import CartSummary from './cart-summary';

import { useTranslation } from 'react-i18next';

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

describe('TourCard', () => {
  it('should render successfully', () => {
    const cartSummary = mockedCartSummary;
    const { baseElement, queryByText } = render(
      <CartSummary
        cartSummary={cartSummary}
        isOpen={true}
        onClose={jest.fn()}
      />
    );
    expect(baseElement).toBeTruthy();
    expect(queryByText('cartSummary.title')).toBeTruthy();
    expect(screen.findAllByText(cartSummary[1].title)).toBeTruthy();
  });
});
