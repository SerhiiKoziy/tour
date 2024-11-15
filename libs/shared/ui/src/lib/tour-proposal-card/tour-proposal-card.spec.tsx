import { render, screen, fireEvent } from '@testing-library/react';
import {
  cartSummary as mockedCartSummary,
  tourProposalCards as mockedTourProposalCards,
} from '@visit/ecomm-lib/shared/data-access';

import TourCard from './tour-proposal-card';

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
    const tourProposalCard = mockedTourProposalCards[0];
    const cartSummary = mockedCartSummary;
    const { baseElement, queryByText } = render(
      <TourCard tourProposal={tourProposalCard} cartSummary={cartSummary} />
    );
    expect(baseElement).toBeTruthy();
    expect(screen.queryByText(tourProposalCard.title)).toBeTruthy();
    expect(screen.queryByText('8 am')).toBeTruthy();

    expect(screen.queryByText('$ 400')).toBeTruthy();

    const clickIndicator = queryByText('9 am');
    clickIndicator && fireEvent.click(clickIndicator);

    expect(screen.queryByText('$ 360')).toBeTruthy();
  });
});
