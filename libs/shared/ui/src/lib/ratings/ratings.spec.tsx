import { render, screen } from '@testing-library/react';
import {
  TourRating,
  tours as mockedTours,
} from '@visit/ecomm-lib/shared/data-access';
import { useTranslation } from 'react-i18next';
import Ratings from './ratings';

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

describe('Ratings', () => {
  it('should render successfully', () => {
    const rating = mockedTours[0].rating;

    const { baseElement } = render(<Ratings rating={rating as TourRating} />);

    expect(baseElement).toBeTruthy();

    expect(screen.findByText('ratings.title')).toBeTruthy();
    expect(screen.findByText('4.9')).toBeTruthy();
  });
});
