import { render, screen } from '@testing-library/react';
import {
  tours as mockedTours,
  Tour,
} from '@visit/ecomm-lib/shared/data-access';

// TODO this should be in a beforeEach or beforeAll block to allow
// spies to be reset
import { useTranslation } from 'react-i18next';

import MostPopularTours from './most-popular-tours';

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

describe('MostPopularTours', () => {
  let tours: Tour[];

  beforeAll(() => {
    tours = mockedTours;
  });

  it('should render successfully', () => {
    const { baseElement } = render(<MostPopularTours tours={tours} />);
    expect(baseElement).toBeTruthy();

    expect(screen.findByText('mostPopularTours.title')).toBeTruthy();
    expect(screen.findByText('mostPopularTours.description')).toBeTruthy();

    tours.forEach((tour) => {
      expect(screen.findByText(tour.title)).toBeTruthy();
    });
  });
});
