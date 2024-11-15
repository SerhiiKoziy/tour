import { render, screen } from '@testing-library/react';
import { useTranslation } from 'react-i18next';
import {
  Tour,
  tours as mockedTours,
} from '@visit/ecomm-lib/shared/data-access';

import RecentSearches from './recent-searches';

window.ResizeObserver =
  window.ResizeObserver ||
  jest.fn().mockImplementation(() => ({
    disconnect: jest.fn(),
    observe: jest.fn(),
    unobserve: jest.fn(),
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

describe('RecentSearches', () => {
  let tours: Tour[];

  beforeAll(() => {
    tours = mockedTours;
  });

  it('should render successfully', () => {
    const { baseElement } = render(<RecentSearches tours={tours} />);
    expect(screen.getByText('recentSearches.title')).toBeTruthy();
    expect(screen.getByText('recentSearches.description')).toBeTruthy();

    const topThreeTours = tours.slice(0, 3);
    topThreeTours.forEach((tour) => {
      expect(screen.getAllByText(tour.title)).toBeTruthy();

      const { tags: tourTags } = tour;
      tourTags.forEach((tag) => {
        expect(screen.getAllByText(tag.title)).toBeTruthy();
      });
    });

    expect(baseElement).toBeTruthy();
  });
});
