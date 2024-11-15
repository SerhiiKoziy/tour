import { render, screen } from '@testing-library/react';

import TopAttractions, { PopularAttractions } from './top-attractions';

import { useTranslation } from 'react-i18next';
import {
  Tour,
  tours as mockedTours,
} from '@visit/ecomm-lib/shared/data-access';

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
    useTheme: jest.fn().mockImplementation(() => ({
      colors: { gradientOverlay: { dark: '', light: '' } },
    })),
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

describe('TopAttractions', () => {
  const cities = [
    { city: 'London', path: '/london' },
    { city: 'Paris', path: '/paris' },
    { city: 'Rome', path: '/rome' },
  ];

  let tours: Tour[];

  beforeAll(() => {
    tours = mockedTours;
  });

  it('should render successfully', () => {
    const { baseElement } = render(
      <TopAttractions cities={cities} tours={tours} />
    );
    expect(screen.getByText('topAttractions.title')).toBeTruthy();
    expect(screen.getByText('topAttractions.thingsMustSee')).toBeTruthy();
    expect(
      screen.getAllByRole('button', { name: 'topAttractions.allAttractions' })
    ).toBeTruthy();

    cities.forEach((city) => {
      expect(screen.getAllByText(city.city)).toBeTruthy();
    });

    expect(screen.getAllByText('Skip the line')).toBeTruthy();
    expect(
      screen.getAllByText(
        'Rome in a Day Tour With Colosseum and Vatican Museums'
      )
    ).toBeTruthy();
    expect(baseElement).toBeTruthy();
  });

  it('should render Popular Attractions successfully', () => {
    const { baseElement } = render(<PopularAttractions cities={cities} />);
    expect(screen.getByText('popularAttractions.title')).toBeTruthy();
    expect(screen.getByText('topAttractions.thingsMustSee')).toBeTruthy();
    expect(
      screen.getByRole('button', {
        name: 'popularAttractions.seeAllAttractions',
      })
    ).toBeTruthy();

    cities.forEach((city) => {
      expect(screen.getByText(city.city)).toBeTruthy();
    });

    expect(baseElement).toBeTruthy();
  });
});
