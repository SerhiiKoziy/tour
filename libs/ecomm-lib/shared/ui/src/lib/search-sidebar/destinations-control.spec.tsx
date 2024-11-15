import { fireEvent, render, screen } from '@testing-library/react';
import { City } from '@visit/ecomm-lib/shared/data-access';
import _ from 'lodash';

import { useTranslation } from 'react-i18next';
import DestinationsControlFilter from './destinations-control';

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

describe('DestinationsControl', () => {
  let cities: City[];
  let countries: {
    [key: string]: City[];
  };

  beforeAll(() => {
    cities = [
      { city: 'Rome', path: '/Rome', country: 'Italy' },
      { city: 'Paris', path: '/Paris', country: 'France' },
      { city: 'Madrid', path: '/Madrid', country: 'Spain' },
      { city: 'Miami', path: '/miami', country: 'United States' },
      { city: 'Amsterdam', path: '/Amsterdam', country: 'Netherlands' },
    ];
    countries = _.groupBy(cities, 'country');
  });

  it('should render successfully grouped cities', () => {
    const mockSetCity = jest.fn();
    const { baseElement } = render(
      <DestinationsControlFilter
        countries={countries}
        city=""
        setCity={mockSetCity}
      />
    );

    Object.entries(countries)
      .slice(0, 4)
      .forEach(([country, cities]) => {
        expect(screen.getByText(country)).toBeTruthy();

        cities.forEach((city) => {
          expect(screen.getByText(city.city)).toBeTruthy();
        });
      });

    expect(mockSetCity).not.toHaveBeenCalled();
    expect(baseElement).toBeTruthy();
  });

  it('should show all Destinations when clicking View All Destinations button', () => {
    render(
      <DestinationsControlFilter
        countries={countries}
        city=""
        setCity={jest.fn()}
      />
    );

    const allDestinationsBtn = screen.getByRole('button', {
      name: /search.sidebar.destinations.allDestinations/i,
    });
    fireEvent.click(allDestinationsBtn);

    Object.keys(countries).forEach((country) => {
      expect(screen.getByText(country)).toBeTruthy();
    });
  });

  it('should handle default Rome city selected', () => {
    const { getByLabelText } = render(
      <DestinationsControlFilter
        countries={countries}
        city="Rome"
        setCity={jest.fn()}
      />
    );

    const romeCity = getByLabelText(/rome/i) as HTMLInputElement;
    const parisCity = getByLabelText(/paris/i) as HTMLInputElement;
    const madridCity = getByLabelText(/madrid/i) as HTMLInputElement;

    expect(romeCity.checked).toBeTruthy();
    expect(parisCity.checked).toBeFalsy();
    expect(madridCity.checked).toBeFalsy();
  });

  it('should handle City button callback successfully', () => {
    const mockSetCity = jest.fn();
    const { getByLabelText } = render(
      <DestinationsControlFilter
        countries={countries}
        city="Paris"
        setCity={mockSetCity}
      />
    );
    const romeCity = getByLabelText(/rome/i) as HTMLInputElement;

    expect(mockSetCity).not.toHaveBeenCalled();

    fireEvent.click(romeCity);

    expect(mockSetCity).toHaveBeenCalledTimes(1);
  });
});
