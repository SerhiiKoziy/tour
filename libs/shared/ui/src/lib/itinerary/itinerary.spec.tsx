import { render, screen } from '@testing-library/react';
import Itinerary from './itinerary';
import { useTranslation } from 'react-i18next';
import { tours as mockedTours } from '@visit/ecomm-lib/shared/data-access';

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

describe('Itinerary', () => {
  it('should render successfully', () => {
    const itineraries = mockedTours[0].itineraries;
    const { baseElement } = render(<Itinerary itineraries={itineraries} />);
    expect(baseElement).toBeTruthy();
    expect(screen.queryByText('itinerary.title')).toBeTruthy();
    itineraries.forEach((itinerary) => {
      expect(screen.queryByText(itinerary.point)).toBeTruthy();
    });
  });
});
