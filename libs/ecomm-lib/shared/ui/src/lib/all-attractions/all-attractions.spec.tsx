import { render, screen } from '@testing-library/react';
import { useTranslation } from 'react-i18next';
import groupBy from 'lodash/groupBy';
import {
  City,
  cities as mockedCities,
} from '@visit/ecomm-lib/shared/data-access';

import AllAttractions from './all-attractions';

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

describe('AllAttractions', () => {
  let cities: City[];

  beforeAll(() => {
    cities = mockedCities;
  });

  it('should render successfully', () => {
    const { baseElement } = render(
      <AllAttractions cities={cities} setQuery={jest.fn()} />
    );
    expect(screen.getByText('topAttractions.allAttractions')).toBeTruthy();
    expect(screen.getByRole('textbox')).toBeTruthy();

    const countries = groupBy(cities, 'country');
    const allCountries = Object.entries(countries);

    allCountries.forEach(([country, cities]) => {
      expect(screen.getByText(country)).toBeTruthy();

      cities.forEach((city) => {
        expect(screen.getByText(city.city)).toBeTruthy();
      });
    });

    expect(baseElement).toBeTruthy();
  });
});
