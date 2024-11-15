import { render, screen } from '@testing-library/react';
import {
  tours as mockedTours,
  City,
  Tour,
  getToursFromStorage,
} from '@visit/ecomm-lib/shared/data-access';

import Home from './home';

// TODO this should be in a beforeEach or beforeAll block to allow
// spies to be reset
import { useTranslation } from 'react-i18next';

jest.mock('@visit/ecomm-lib/shared/data-access', () => {
  const originalModule = jest.requireActual(
    '@visit/ecomm-lib/shared/data-access'
  );
  return {
    __esModule: true,
    ...originalModule,
    getToursFromStorage: jest.fn(),
  };
});

// TODO move this to an util test lib
window.ResizeObserver =
  window.ResizeObserver ||
  jest.fn().mockImplementation(() => ({
    disconnect: jest.fn(),
    observe: jest.fn(),
    unobserve: jest.fn(),
  }));

jest.mock('@chakra-ui/react', () => {
  const originalModule = jest.requireActual('@chakra-ui/react');
  return {
    __esModule: true,
    ...originalModule,
    useBreakpointValue: jest.fn().mockImplementation(() => 0),
  };
});

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

// TODO this should be in a helper/mock lib

jest.mock('next/image', () => ({
  __esModule: true,
  default: () => {
    return 'Next image stub'; // whatever
  },
}));

// TODO this should be in a helper/mock lib

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

describe('Home', () => {
  let cities: City[], tours: Tour[];

  let getToursFromStorageMock: jest.Mock;

  beforeAll(() => {
    cities = [];
    tours = mockedTours;
    getToursFromStorageMock = getToursFromStorage as jest.Mock;
  });

  it('should render successfully', () => {
    getToursFromStorageMock.mockReturnValue(tours.slice(-2));

    const { baseElement } = render(
      <Home
        cities={[]}
        tours={[]}
        mostPopularTours={tours.slice(0, 2)}
        topDestinations={cities.slice(0, 2)}
      />
    );
    expect(baseElement).toBeTruthy();

    // getting all the containers to check the order if possible

    // Header
    expect(screen.queryByText('The header will be here soon')).not.toBeTruthy();

    // Hero Component
    expect(screen.findByText('Need better opening text')).toBeTruthy();
    expect(
      screen.findByText('Find the Best Tours & Attractions across the world')
    ).toBeTruthy();

    // Press mentions
    // TODO add test

    // Recent searches
    expect(screen.queryByText('recentSearches.title')).toBeTruthy();

    // Most Popular Tours
    expect(screen.queryByText('mostPopularTours.title')).toBeTruthy();
    expect(screen.queryByText('mostPopularTours.description')).toBeTruthy();

    tours.slice(0, 2).forEach((tour) => {
      expect(screen.queryByText(tour.title)).toBeTruthy();
    });

    // Subscribe Banner
    expect(screen.queryByText('aboutUs.title')).toBeTruthy();
    expect(screen.queryByText('subscribe.subscribeForDiscounts')).toBeTruthy();

    // Top Destinations
    expect(screen.findByText('topDestinations.title')).toBeTruthy();
    expect(
      screen.findByText('topDestinations.experienceTheWorld')
    ).toBeTruthy();

    // See What Our Customer Say
    expect(
      screen.queryByText(
        'See What Our Customer Say About Us Destinations section will be here soon'
      )
    ).toBeTruthy();

    // Top Attractions
    expect(screen.findByText('topDestinations.title')).toBeTruthy();
    cities.slice(0, 2).forEach((city) => {
      expect(screen.queryByText(city.city)).toBeTruthy();
    });

    expect(screen.findByText('topAttractions.thingsMustSee')).toBeTruthy();
    expect(screen.findByText('topAttractions.allAttractions')).toBeTruthy();

    // How we create a unique experience
    expect(screen.findByText('uniqueExperience.title')).toBeTruthy();

    // Most Popular Cities
    expect(screen.queryByText('mostPopularCities.title')).toBeTruthy();

    // Footer
    expect(screen.queryByText('letsPartner')).toBeTruthy();
  });

  it('should get Tours from API for logged in users', () => {
    getToursFromStorageMock.mockReturnValue(tours);

    const { baseElement } = render(
      <Home
        cities={cities}
        tours={tours}
        mostPopularTours={[]}
        topDestinations={[]}
      />
    );
    expect(screen.getByText('recentSearches.title')).toBeTruthy();

    const topThreeTours = tours.slice(0, 3);
    topThreeTours.forEach((tour) => {
      expect(screen.getAllByText(tour.title)).toBeTruthy();
    });

    expect(baseElement).toBeTruthy();
  });

  it('should get Tours from Local storage for non logged in users and display the Searches section', () => {
    // Get three random tours from the mocked Tours object
    const mockedLocalStorageTours = tours
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    getToursFromStorageMock.mockReturnValue(mockedLocalStorageTours);

    const { baseElement } = render(
      <Home
        cities={cities}
        tours={tours}
        mostPopularTours={[]}
        topDestinations={[]}
      />
    );
    expect(screen.getByText('recentSearches.title')).toBeTruthy();

    mockedLocalStorageTours.forEach((tour) => {
      expect(screen.getAllByText(tour.title)).toBeTruthy();
    });

    expect(getToursFromStorageMock).toHaveBeenCalled();
    expect(baseElement).toBeTruthy();
  });

  it('should get Tours from Local storage for non logged in users and not display the Searches section', () => {
    getToursFromStorageMock.mockReturnValue([]);

    const { baseElement } = render(
      <Home
        cities={cities}
        tours={tours}
        mostPopularTours={[]}
        topDestinations={[]}
      />
    );
    expect(screen.queryByText('recentSearches.title')).toBeNull();
    expect(getToursFromStorageMock).toHaveBeenCalled();
    expect(baseElement).toBeTruthy();
  });
});
