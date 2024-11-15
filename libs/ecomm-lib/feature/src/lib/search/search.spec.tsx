import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  tours as mockedTours,
  Tour,
  fetchToursByDestination,
} from '@visit/ecomm-lib/shared/data-access';
import { useRouter } from 'next/router';

import Search from './search';

// TODO this should be in a beforeEach or beforeAll block to allow
// spies to be reset
import { useTranslation } from 'react-i18next';

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
  Trans: ({ i18nKey }: { i18nKey: string }) => i18nKey,
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

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

// Mocking fetchToursByDestination service because we are not testing it here
jest.mock('@visit/ecomm-lib/shared/data-access', () => {
  const originalModule = jest.requireActual(
    '@visit/ecomm-lib/shared/data-access'
  );
  return {
    __esModule: true,
    ...originalModule,
    fetchToursByDestination: jest.fn(),
  };
});

describe('Search', () => {
  let tours: Tour[];
  let fetchToursByDestinationMock: jest.Mock;
  let useRouterMock: jest.Mock;

  beforeAll(() => {
    tours = mockedTours;
    fetchToursByDestinationMock = fetchToursByDestination as jest.Mock;
    useRouterMock = useRouter as jest.Mock;
  });

  it('should render successfully', () => {
    const { baseElement } = render(
      <Search
        cities={[]}
        tours={[]}
        isLogged={false}
        searchResults={{
          tours: tours,
          total: tours.length,
        }}
        page={1}
        offset={15}
      />
    );
    expect(baseElement).toBeTruthy();

    const displayedTours = screen.queryAllByRole('group');
    expect(displayedTours.length).toEqual(tours.length);
  });

  it('should render no tours found and similar tours if available and check next date if we click on the similarTours button', async () => {
    // mocking scrollIntoView to check if it was called
    const scrollIntoViewMock = jest.fn();
    Element.prototype.scrollIntoView = scrollIntoViewMock;

    const mockPush = jest.fn();
    useRouterMock.mockReturnValue({
      query: {
        destination: 'cali',
      },
      pathname: '',
      push: mockPush,
    });

    // Mocking response from service
    fetchToursByDestinationMock.mockReturnValue({
      total: 0,
      tours: [],
      peopleChoice: [],
      similarTours: [],
    });

    const { baseElement } = render(
      <Search
        cities={[]}
        tours={[]}
        isLogged={false}
        searchResults={{
          tours: [],
          total: tours.length,
          similarTours: tours.slice(0, 1),
        }}
        page={1}
        offset={15}
        date="2022-11-09"
      />
    );
    expect(baseElement).toBeTruthy();

    const displayedTours = screen.queryAllByRole('group');
    expect(displayedTours.length).toEqual(tours.slice(0, 1).length);
    expect(screen.queryByText('search.similarTours')).toBeTruthy();
    expect(screen.queryByText('search.noToursResults')).toBeTruthy();
    expect(screen.queryByText('search.availableSimilarTours')).toBeTruthy();
    expect(screen.queryByText('search.showSimilarTours')).toBeTruthy();

    await userEvent.click(screen.getByText('search.showSimilarTours'));

    expect(mockPush).toHaveBeenCalledWith(
      {
        pathname: '',
        query: {
          destination: 'cali',
          offset: '15',
          page: '1',
          date: '2022-11-10',
          tag: 'allTours',
          sort: 'asc',
        },
      },
      undefined,
      { shallow: true, scroll: false }
    );
  });

  it('should render tours found and people choice tours if available', () => {
    const { baseElement } = render(
      <Search
        cities={[]}
        tours={[]}
        isLogged={false}
        searchResults={{
          tours,
          peopleChoice: tours.slice(0, 1),
          total: tours.length,
          similarTours: [],
        }}
        page={1}
        offset={15}
        date="2022-11-09"
      />
    );
    expect(baseElement).toBeTruthy();

    const displayedTours = screen.queryAllByRole('group');
    expect(displayedTours.length).toEqual(
      tours.length + tours.slice(0, 1).length
    );
    // People choice
    expect(screen.queryByText('search.peopleChoice')).toBeTruthy();
    // filter buttons
    expect(screen.queryByText('search.allTours')).toBeTruthy();
    expect(screen.queryByText('search.foodAndDrinks')).toBeTruthy();
    expect(screen.queryByText('search.museums')).toBeTruthy();
    expect(screen.queryByText('search.hotDeals')).toBeTruthy();
    // Elements displayed if not tours found must not be shown
    expect(screen.queryByText('search.similarTours')).not.toBeTruthy();
    expect(screen.queryByText('search.noToursResults')).not.toBeTruthy();
    expect(screen.queryByText('search.availableSimilarTours')).not.toBeTruthy();
    expect(screen.queryByText('search.showSimilarTours')).not.toBeTruthy();
  });

  it('should tours found and add to the query string the tag param if we click on any of the tag buttons', async () => {
    // mocking scrollIntoView to check if it was called
    const scrollIntoViewMock = jest.fn();
    Element.prototype.scrollIntoView = scrollIntoViewMock;

    const mockPush = jest.fn();
    useRouterMock.mockReturnValue({
      query: {
        destination: 'cali',
      },
      pathname: '',
      push: mockPush,
    });

    // Mocking response from service
    fetchToursByDestinationMock.mockReturnValue({
      total: 0,
      tours: [],
      peopleChoice: [],
      similarTours: [],
    });

    const { baseElement } = render(
      <Search
        cities={[]}
        tours={[]}
        isLogged={false}
        searchResults={{
          tours,
          peopleChoice: tours.slice(0, 1),
          total: tours.length,
          similarTours: [],
        }}
        page={1}
        offset={15}
        date="2022-11-09"
      />
    );
    expect(baseElement).toBeTruthy();

    const displayedTours = screen.queryAllByRole('group');
    expect(displayedTours.length).toEqual(
      tours.length + tours.slice(0, 1).length
    );
    // People choice
    expect(screen.queryByText('search.peopleChoice')).toBeTruthy();
    // filter buttons
    expect(screen.queryByText('search.allTours')).toBeTruthy();
    expect(screen.queryByText('search.foodAndDrinks')).toBeTruthy();
    expect(screen.queryByText('search.museums')).toBeTruthy();
    expect(screen.queryByText('search.hotDeals')).toBeTruthy();
    // Elements displayed if not tours found must not be shown
    expect(screen.queryByText('search.similarTours')).not.toBeTruthy();
    expect(screen.queryByText('search.noToursResults')).not.toBeTruthy();
    expect(screen.queryByText('search.availableSimilarTours')).not.toBeTruthy();
    expect(screen.queryByText('search.showSimilarTours')).not.toBeTruthy();

    await userEvent.click(screen.getByText('search.foodAndDrinks'));

    expect(mockPush).toHaveBeenCalledWith(
      {
        pathname: '',
        query: {
          destination: 'cali',
          offset: '15',
          page: '1',
          date: '2022-11-09',
          tag: 'foodAndDrinks',
          sort: 'asc',
        },
      },
      undefined,
      { shallow: true, scroll: false }
    );
  });

  it('should scroll up to the change view button when we change the offset value', async () => {
    // mocking scrollIntoView to check if it was called
    const scrollIntoViewMock = jest.fn();
    Element.prototype.scrollIntoView = scrollIntoViewMock;

    const mockPush = jest.fn();
    useRouterMock.mockReturnValue({
      query: {},
      push: mockPush,
    });

    // Mocking response from service
    fetchToursByDestinationMock.mockReturnValue({ total: 0, tours: [] });

    const { baseElement } = render(
      <Search
        cities={[]}
        tours={[]}
        isLogged={false}
        searchResults={{
          tours: tours,
          total: tours.length,
        }}
        page={1}
        offset={15}
      />
    );
    expect(baseElement).toBeTruthy();

    await userEvent.selectOptions(screen.getByRole('combobox'), '30');

    expect(mockPush).toHaveBeenCalledTimes(1);
  });

  it('should add to the query string the sort param if we click on any of the sort options', async () => {
    // mocking scrollIntoView to check if it was called
    const scrollIntoViewMock = jest.fn();
    Element.prototype.scrollIntoView = scrollIntoViewMock;

    const mockPush = jest.fn();
    useRouterMock.mockReturnValue({
      query: {
        destination: 'cali',
      },
      pathname: '',
      push: mockPush,
    });

    // Mocking response from service
    fetchToursByDestinationMock.mockReturnValue({
      total: 0,
      tours: [],
      peopleChoice: [],
      similarTours: [],
    });

    const { baseElement } = render(
      <Search
        cities={[]}
        tours={[]}
        isLogged={false}
        searchResults={{
          tours,
          peopleChoice: tours.slice(0, 1),
          total: tours.length,
          similarTours: [],
        }}
        page={1}
        offset={15}
        date="2022-11-09"
      />
    );
    expect(baseElement).toBeTruthy();

    // People choice
    expect(screen.queryByText('search.peopleChoice')).toBeTruthy();

    await userEvent.click(screen.getByText('search.sortOptions.mostReviewed'));

    expect(mockPush).toHaveBeenCalledWith(
      {
        pathname: '',
        query: {
          destination: 'cali',
          offset: '15',
          page: '1',
          date: '2022-11-09',
          tag: 'allTours',
          sort: 'mostReviewed',
        },
      },
      undefined,
      { shallow: true, scroll: false }
    );
  });
});
