import { useTranslation } from 'react-i18next';
import { render, screen } from '@testing-library/react';

import TourCard, { TourRowCard } from './card';
import {
  Tour,
  tours as mockedTours,
} from '@visit/ecomm-lib/shared/data-access';

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
    useTheme: jest.fn().mockImplementation(() => ({
      breakpoints: { sm: '30em' },
    })),
    useMediaQuery: jest.fn().mockImplementation(() => [false]),
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

// TODO move this to an util test lib
window.ResizeObserver =
  window.ResizeObserver ||
  jest.fn().mockImplementation(() => ({
    disconnect: jest.fn(),
    observe: jest.fn(),
    unobserve: jest.fn(),
  }));

describe('TourCard', () => {
  let tours: Tour[];

  beforeAll(() => {
    tours = mockedTours;
  });

  it('should render TourCard data successfully', () => {
    const mockOnClick = jest.fn();
    const { baseElement } = render(
      <TourCard tour={tours[0]} onFavoriteClick={mockOnClick} />
    );
    expect(screen.getByText('Skip the line')).toBeTruthy();
    expect(
      screen.getByText('Rome in a Day Tour With Colosseum and Vatican Museums')
    ).toBeTruthy();
    expect(screen.getByText('7.30h')).toBeTruthy();
    expect(screen.getByText('(223)')).toBeTruthy();
    expect(screen.getByText('4.9')).toBeTruthy();
    expect(screen.getByText('$180')).toBeTruthy();
    expect(baseElement).toBeTruthy();
  });

  it('should render the Tour RowCard data successfully', () => {
    const mockOnClick = jest.fn();
    const { baseElement } = render(
      <TourRowCard tour={tours[0]} onFavoriteClick={mockOnClick} />
    );
    expect(screen.getByText('Skip the line')).toBeTruthy();
    expect(
      screen.getByText('Rome in a Day Tour With Colosseum and Vatican Museums')
    ).toBeTruthy();
    expect(
      screen.getByText(
        'Explore the underground tunnels and arena floor with exclusive backdoor entrance'
      )
    ).toBeTruthy();
    expect(screen.getByText('7.30h')).toBeTruthy();
    expect(screen.getByText('(223)')).toBeTruthy();
    expect(screen.getByText('4.9')).toBeTruthy();
    expect(screen.getByText('labels.max 17 labels.guests')).toBeTruthy();
    expect(baseElement).toBeTruthy();
  });
});
