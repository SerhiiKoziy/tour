import { render, screen, fireEvent } from '@testing-library/react';
import {
  Tour,
  tours as mockedTours,
} from '@visit/ecomm-lib/shared/data-access';

import HeroComponent, { HeroAttractions } from './hero-component';

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

describe('HeroComponent', () => {
  let tours: Tour[];

  beforeAll(() => {
    tours = mockedTours;
  });

  it('should render Hero Tour successfully', () => {
    const { baseElement } = render(<HeroComponent tour={tours[0]} />);

    expect(screen.getAllByRole('img')).toHaveLength(4);

    expect(baseElement).toBeTruthy();
  });

  it('should render +2 in Hero Tour for a Tour with 5 images', () => {
    const tour: Tour = {
      ...tours[0],
      images: [
        { id: 1, src: '', name: 'Tour image 01' },
        { id: 2, src: '', name: 'Tour image 02' },
        { id: 3, src: '', name: 'Tour image 03' },
        { id: 4, src: '', name: 'Tour image 04' },
        { id: 5, src: '', name: 'Tour image 05' },
        { id: 6, src: '', name: 'Tour image 06' },
      ],
    };
    const { baseElement } = render(<HeroComponent tour={tour} />);

    expect(screen.getAllByRole('img')).toHaveLength(4);
    expect(screen.getByText('+2')).toBeTruthy();

    expect(baseElement).toBeTruthy();
  });

  it('should render Hero Attractions successfully', () => {
    const { baseElement } = render(<HeroAttractions tour={tours[0]} />);

    expect(screen.getByText('topAttractions.thingsMustSee')).toBeTruthy();
    expect(screen.getByText('topAttractions.tourGuyAttractions')).toBeTruthy();
    expect(screen.getAllByRole('img')).toHaveLength(4);

    expect(baseElement).toBeTruthy();
  });
});
