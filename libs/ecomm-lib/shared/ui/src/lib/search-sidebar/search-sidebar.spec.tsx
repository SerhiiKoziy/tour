import { fireEvent, render, screen } from '@testing-library/react';
import {
  toursPriceData as mockedPriceData,
  ToursPriceData,
} from '@visit/ecomm-lib/shared/data-access';
import {
  cities as mockedCities,
  tours as mockedTours,
  City,
  Tour,
} from '@visit/ecomm-lib/shared/data-access';

import {
  SearchDefaultFilter,
  SearchTime,
  SearchGuests,
  SearchTourDate,
  SearchDestinations,
  SearchAttractions,
  SearchDuration,
  SearchPrice,
} from './search-sidebar';

import { useTranslation } from 'react-i18next';

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

window.ResizeObserver =
  window.ResizeObserver ||
  jest.fn().mockImplementation(() => ({
    disconnect: jest.fn(),
    observe: jest.fn(),
    unobserve: jest.fn(),
  }));

describe('SearchSidebar', () => {
  let cities: City[];
  let tours: Tour[];
  let priceData: ToursPriceData[];

  beforeAll(() => {
    tours = mockedTours;
    cities = mockedCities;
    priceData = mockedPriceData;
  });

  it('should render successfully', () => {
    const { baseElement } = render(<SearchDefaultFilter />);
    expect(screen.getByText('Filter Title')).toBeTruthy();
    expect(baseElement).toBeTruthy();
  });

  it('should render SearchGuests successfully', () => {
    const mockSetGuests = jest.fn();
    const { baseElement } = render(
      <SearchGuests guests={0} setGuests={mockSetGuests} />
    );

    expect(screen.getByText('search.sidebar.guests.title')).toBeTruthy();
    expect(mockSetGuests).not.toHaveBeenCalled();
    expect(baseElement).toBeTruthy();
  });

  it('should handle SearchGuests buttons successfully', () => {
    const mockSetGuests = jest.fn();
    render(<SearchGuests guests={0} setGuests={mockSetGuests} />);

    const minusButton = screen.getByRole('button', { name: /guestsMinus/i });
    const plusButton = screen.getByRole('button', { name: /guestsPlus/i });

    fireEvent.click(plusButton);
    fireEvent.click(minusButton);

    expect(screen.getByText(/0/i)).toBeTruthy();
    expect(mockSetGuests).toHaveBeenCalledTimes(2);
  });

  it('should render SearchTourDate successfully', () => {
    const mockSetTourDate = jest.fn();
    const mockSetPlusDays = jest.fn();
    const { baseElement } = render(
      <SearchTourDate
        tourDate={new Date()}
        plusDays={''}
        setTourDate={mockSetTourDate}
        setPlusDays={mockSetPlusDays}
      />
    );

    expect(screen.getByText('search.sidebar.tourDate.title')).toBeTruthy();
    expect(baseElement).toBeTruthy();
  });

  it('should handle SearchTourDate buttons successfully', () => {
    const mockSetTourDate = jest.fn();
    const mockSetPlusDays = jest.fn();
    render(
      <SearchTourDate
        tourDate={new Date()}
        plusDays={''}
        setTourDate={mockSetTourDate}
        setPlusDays={mockSetPlusDays}
      />
    );
    const radioOneDay = screen.getByText(/\+ 1/i);
    const radioTwoDays = screen.getByText(/\+ 2/i);
    const radioFourDays = screen.getByText(/\+ 4/i);

    fireEvent.click(radioOneDay);
    fireEvent.click(radioTwoDays);
    fireEvent.click(radioFourDays);

    expect(mockSetPlusDays).toHaveBeenCalledTimes(3);
  });

  it('should render SearchDestinations successfully', () => {
    const mockSetCity = jest.fn();
    const { baseElement } = render(
      <SearchDestinations
        cities={cities}
        city=""
        setCity={mockSetCity}
        setQuery={jest.fn()}
      />
    );

    expect(screen.getByText('search.sidebar.destinations.title')).toBeTruthy();
    expect(mockSetCity).not.toHaveBeenCalled();
    expect(baseElement).toBeTruthy();
  });

  it('should handle SearchDestinations buttons successfully', () => {
    const mockSetCity = jest.fn();
    render(
      <SearchDestinations
        cities={cities}
        city=""
        setCity={mockSetCity}
        setQuery={jest.fn()}
      />
    );

    const athensCity = screen.getByText(/athens/i) as HTMLInputElement;
    const amsterdamCity = screen.getByText(/amsterdam/i) as HTMLInputElement;

    fireEvent.click(athensCity);
    fireEvent.click(amsterdamCity);

    expect(mockSetCity).toHaveBeenCalledTimes(2);
  });

  it('should render SearchAttractions successfully', () => {
    const setAttraction = jest.fn();
    const { baseElement } = render(
      <SearchAttractions
        tours={tours}
        city=""
        attraction=""
        setAttraction={setAttraction}
        setQuery={jest.fn()}
      />
    );

    expect(screen.getByText('search.sidebar.attractions.title')).toBeTruthy();
    expect(setAttraction).not.toHaveBeenCalled();
    expect(baseElement).toBeTruthy();
  });

  it('should handle SearchAttractions buttons successfully', () => {
    const setAttraction = jest.fn();
    render(
      <SearchAttractions
        tours={tours}
        city=""
        attraction=""
        setAttraction={setAttraction}
        setQuery={jest.fn()}
      />
    );

    const colosseumAttr = screen.getByText(/colosseum/i) as HTMLInputElement;
    const vaticanAttr = screen.getByText(/vatican/i) as HTMLInputElement;

    fireEvent.click(colosseumAttr);
    fireEvent.click(vaticanAttr);

    expect(setAttraction).toHaveBeenCalledTimes(2);
  });

  it('should render SearchTime successfully', () => {
    const setTime = jest.fn();
    const { baseElement } = render(<SearchTime time={[]} setTime={setTime} />);

    expect(screen.getByText('search.sidebar.time.title')).toBeTruthy();
    expect(setTime).not.toHaveBeenCalled();
    expect(baseElement).toBeTruthy();
  });

  it('should handle SearchTime buttons successfully', () => {
    const setTime = jest.fn();
    render(<SearchTime time={[]} setTime={setTime} />);

    const morningCheck = screen.getByText(/Morning/i) as HTMLInputElement;
    const noonCheck = screen.getByText(/Noon/i) as HTMLInputElement;

    fireEvent.click(morningCheck);
    fireEvent.click(noonCheck);

    expect(setTime).toHaveBeenCalledTimes(2);
  });

  it('should render SearchDuration successfully', () => {
    const setDuration = jest.fn();
    const { baseElement } = render(
      <SearchDuration duration={[]} setDuration={setDuration} />
    );

    expect(screen.getByText('search.sidebar.duration.title')).toBeTruthy();
    expect(setDuration).not.toHaveBeenCalled();
    expect(baseElement).toBeTruthy();
  });

  it('should handle SearchDuration buttons successfully', () => {
    const setDuration = jest.fn();
    render(<SearchDuration duration={[]} setDuration={setDuration} />);

    const zeroCheck = screen.getByText(
      /search.sidebar.duration.0/i
    ) as HTMLInputElement;
    const threeCheck = screen.getByText(
      /search.sidebar.duration.3/i
    ) as HTMLInputElement;

    fireEvent.click(zeroCheck);
    fireEvent.click(threeCheck);

    expect(setDuration).toHaveBeenCalledTimes(2);
  });

  it('should render SearchPrice successfully', async () => {
    const setPrice = jest.fn();

    const { baseElement } = render(
      <SearchPrice data={priceData} price={[1, 10]} setPrice={setPrice} />
    );

    expect(screen.getByText('search.sidebar.price.title')).toBeTruthy();
    expect(setPrice).not.toHaveBeenCalled();
    expect(baseElement).toBeTruthy();
  });

  it('should handle SearchPrice buttons successfully', () => {
    const setPrice = jest.fn();

    render(
      <SearchPrice data={priceData} price={[1, 10]} setPrice={setPrice} />
    );

    const resetBtn = screen.getByRole('button', { name: /reset/i });

    fireEvent.click(resetBtn);

    expect(setPrice).toHaveBeenCalledTimes(1);
  });
});
