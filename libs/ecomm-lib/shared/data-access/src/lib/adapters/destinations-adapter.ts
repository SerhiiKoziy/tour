import { City, fetchCitiesByQuery } from '../services/destinations-service'; // TODO types should be in a util lib

interface CityAPIResponse {
  id: number;
  image: string;
  countryFlagImage: string;
  countryName: string;
  minimalPrice?: number;
  // city name to show
  cityName?: string;
  name?: string;
  // possible fields where the tag ID will come
  tagId?: string;
  seo?: string;
  detailLink?: string;
  discountPricePerAdult?: number;
  regularPricePerAdult?: number;
  price?: number;
}

// Function to format the city object and sanitize any other strange value
export async function formatCity(city: CityAPIResponse): Promise<City> {
  const src =
    (await fetchCitiesByQuery(city.countryName?.toLowerCase() ?? '')).pop()
      ?.src || ''; // TODO there should not be circular dependencies

  const path = city.tagId ?? city.seo ?? city.detailLink ?? '';

  return {
    ...city,
    city: city.cityName ?? city.name ?? '', // TODO we should filter out empty values/records does not match the data requirements
    name: city.cityName ?? city.name ?? '', // TODO we should filter out empty values/records does not match the data requirements
    path: path,
    seo: path,
    tagId: path,
    country: city.countryName,
    price:
      city.minimalPrice ??
      city.discountPricePerAdult ??
      city.regularPricePerAdult ??
      city.price ??
      9999,
    src, // image path
  };
}

export function filterCities(cities: City[]): City[] {
  return cities.filter((city) => !!city.tagId && !!city.name);
}
