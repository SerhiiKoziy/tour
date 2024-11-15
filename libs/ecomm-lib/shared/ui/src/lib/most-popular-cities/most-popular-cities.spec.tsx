import { render, screen } from '@testing-library/react';

import MostPopularCities from './most-popular-cities';

// TODO this should be in a beforeEach or beforeAll block to allow
// spies to be reset
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

describe('MostPopularCities', () => {
  it('should show the cities passed through the properties', () => {
    const cities = [
      {
        city: 'Miami',
        path: '/miami',
        name: 'Miami',
        seo: '/miami',
        tagId: '/miami',
      },
      {
        city: 'Cali',
        path: '/Cali',
        name: 'Cali',
        seo: '/cali',
        tagId: '/cali',
      },
    ];
    const { baseElement } = render(<MostPopularCities cities={cities} />);
    expect(screen.findByText('mostPopularCities.title')).toBeTruthy();
    expect(
      screen.findByText('mostPopularCities.checkoutPopularCities')
    ).toBeTruthy();
    expect(screen.findByText('Miami')).toBeTruthy();
    expect(screen.findByText('Cali')).toBeTruthy();
    expect(baseElement).toBeTruthy();
  });
});
