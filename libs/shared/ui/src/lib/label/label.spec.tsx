import { render, screen } from '@testing-library/react';

import {
  TagLabel,
  PlaceLabel,
  PriceLabel,
  GuestsLabel,
  RatingLabel,
  DurationLabel,
} from './label';

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

describe('Label', () => {
  it('should render PriceLabel with current price successfully', () => {
    const { baseElement } = render(<PriceLabel currentPrice="123" />);
    expect(screen.getByText('$123')).toBeTruthy();
    expect(screen.getByText('/labels.adult')).toBeTruthy();
    expect(baseElement).toBeTruthy();
  });

  it('should render PriceLabel with discounted price successfully', () => {
    const { baseElement } = render(
      <PriceLabel hasDiscount oldPrice="189" currentPrice="123" />
    );
    expect(screen.getByText('$189')).toBeTruthy();
    expect(screen.getByText('$123')).toBeTruthy();
    expect(screen.getByText('/labels.adult')).toBeTruthy();
    expect(baseElement).toBeTruthy();
  });

  it('should render RatingLabel with tour rating and count', () => {
    const { baseElement } = render(<RatingLabel rating={4.9} count={232} />);
    expect(screen.getByText('4.9')).toBeTruthy();
    expect(screen.getByText('(232)')).toBeTruthy();
    expect(baseElement).toBeTruthy();
  });

  it('should render DurationLabel with tour duration', () => {
    const { baseElement } = render(<DurationLabel duration={'7.30'} />);
    expect(screen.getByText('7.30h')).toBeTruthy();
    expect(baseElement).toBeTruthy();
  });

  it('should render GuestsLabel with tour max guests', () => {
    const { baseElement } = render(<GuestsLabel guests={15} />);
    expect(screen.getByText('labels.max 15 labels.guests')).toBeTruthy();
    expect(baseElement).toBeTruthy();
  });

  it('should render TagLabel with children tag', () => {
    const { baseElement } = render(<TagLabel>Tag text</TagLabel>);
    expect(screen.getByText('Tag text')).toBeTruthy();
    expect(baseElement).toBeTruthy();
  });

  it('should render PlaceLabel with tour place', () => {
    const { baseElement } = render(
      <PlaceLabel title="Gallery of Candelabra" enabled />
    );
    expect(screen.getByText('Gallery of Candelabra')).toBeTruthy();
    expect(baseElement).toBeTruthy();
  });
});
