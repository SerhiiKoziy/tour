import { render, screen } from '@testing-library/react';
import { useTranslation } from 'react-i18next';

import {
  tours as mockedTours,
  City,
  Tour,
} from '@visit/ecomm-lib/shared/data-access';

import { Attractions } from './attractions';

jest.mock('next/image', () => ({
  __esModule: true,
  default: () => {
    return 'Next image stub'; // whatever
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

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('Attractions', () => {
  let cities: City[], tours: Tour[];

  beforeAll(() => {
    cities = [];
    tours = mockedTours;
  });

  it('should render successfully', () => {
    const { baseElement } = render(
      <Attractions
        cities={cities}
        tours={tours}
        user={undefined}
        isLogged={false}
        tour={tours[0]}
      />
    );
    expect(baseElement).toBeTruthy();

    // Hero Component
    expect(screen.getByText('topAttractions.tourGuyAttractions')).toBeTruthy();

    // Top Attractions
    expect(screen.getByText('topAttractions.title')).toBeTruthy();
    expect(screen.getAllByText('topAttractions.thingsMustSee')).toBeTruthy();

    // All Attractions
    expect(screen.getByText('topAttractions.allAttractions')).toBeTruthy();

    // Subscribe Banner
    expect(screen.getByText('subscribe.subscribeForDiscounts')).toBeTruthy();
    expect(screen.getByText('subscribe.youWillReceiveDiscounts')).toBeTruthy();

    // Most Popular Cities
    expect(screen.getByText('mostPopularCities.title')).toBeTruthy();

    // Footer
    expect(screen.getByText('letsPartner')).toBeTruthy();
  });
});
