import { render, screen } from '@testing-library/react';
import {
  Tour,
  tours as mockedTours,
} from '@visit/ecomm-lib/shared/data-access';
import { useTranslation } from 'react-i18next';

import TourHeader from './tour-header';

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

jest.mock('@chakra-ui/react', () => {
  const originalModule = jest.requireActual('@chakra-ui/react');
  return {
    __esModule: true,
    ...originalModule,
    useBreakpointValue: jest.fn().mockImplementation(() => 0),
  };
});

describe('TourHeader', () => {
  it('should render successfully', () => {
    const tour: Tour = mockedTours[0];
    const { baseElement } = render(<TourHeader tour={tour} />);

    expect(baseElement).toBeTruthy();
    expect(
      screen.queryByText(
        'Rome in a Day Tour With Colosseum and Vatican Museums'
      )
    ).toBeTruthy();
    expect(
      screen.queryByText(
        'Explore the underground tunnels and arena floor with exclusive backdoor entrance'
      )
    ).toBeTruthy();
  });
});
