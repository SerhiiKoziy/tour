import { render, screen } from '@testing-library/react';
import {
  toursPriceData as mockedPriceData,
  ToursPriceData,
} from '@visit/ecomm-lib/shared/data-access';

import { useTranslation } from 'react-i18next';
import PriceControl from './price-control';

jest.mock('next/dynamic', () => () => {
  const Chart = () => null;
  Chart.displayName = 'Apexchart Component';
  Chart.preload = jest.fn();
  return Chart;
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

window.ResizeObserver =
  window.ResizeObserver ||
  jest.fn().mockImplementation(() => ({
    disconnect: jest.fn(),
    observe: jest.fn(),
    unobserve: jest.fn(),
  }));

describe('PriceControl', () => {
  let priceData: ToursPriceData[];

  beforeAll(() => {
    priceData = mockedPriceData;
  });

  it('should render successfully', () => {
    const mockSetPrice = jest.fn();

    const { baseElement } = render(
      <PriceControl data={priceData} price={[0, 0]} setPrice={mockSetPrice} />
    );

    expect(mockSetPrice).not.toHaveBeenCalled();
    expect(baseElement).toBeTruthy();
  });

  it('should handle "5$" and "10$" prices default selected', () => {
    render(
      <PriceControl data={priceData} price={[5, 10]} setPrice={jest.fn()} />
    );
    expect(screen.getByDisplayValue(/\$5/i)).toBeTruthy();
    expect(screen.getByDisplayValue(/\$10/i)).toBeTruthy();
  });
});
