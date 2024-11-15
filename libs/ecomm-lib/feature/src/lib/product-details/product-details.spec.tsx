import { render, screen } from '@testing-library/react';
import {
  tours as mockedTours,
  cartSummary as mockedCartSummary,
} from '@visit/ecomm-lib/shared/data-access';
import { tourProposalCards as mockedTourProposalCards } from '@visit/ecomm-lib/shared/data-access';

import ProductDetails from './product-details';

// TODO this should be in a beforeEach or beforeAll block to allow
// spies to be reset
import { useTranslation } from 'react-i18next';

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

jest.mock('next/dist/client/router', () => ({
  __esModule: true,
  useRouter: () => ({
    query: {},
    pathname: '/',
    asPath: '/',
    events: {
      emit: jest.fn(),
      on: jest.fn(),
      off: jest.fn(),
    },
    push: jest.fn(() => Promise.resolve(true)),
    prefetch: jest.fn(() => Promise.resolve(true)),
    replace: jest.fn(() => Promise.resolve(true)),
  }),
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
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('ProductDetails', () => {
  it('should render successfully', () => {
    const tour = mockedTours[0];

    const { baseElement } = render(
      <ProductDetails
        cities={[]}
        tourProposalCards={mockedTourProposalCards}
        tour={tour}
        cartSummary={mockedCartSummary}
      />
    );
    expect(baseElement).toBeTruthy();

    // components already implemented
    expect(screen.findByText('aboutUs.title')).toBeTruthy();
    expect(screen.findByText('subscribe.subscribeForDiscounts')).toBeTruthy();

    expect(screen.findByText('ratings.title')).toBeTruthy();
    expect(screen.findByText('ratings.more')).toBeTruthy();
  });
});
