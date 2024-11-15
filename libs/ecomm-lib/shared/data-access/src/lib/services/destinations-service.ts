import { filterCities, formatCity } from '../adapters/destinations-adapter';
import { Favourite } from '../state/slices/progressSlice';

export const cities: City[] = [
  {
    city: 'Rome',
    name: 'Rome',
    seo: 'rome',
    tagId: 'rome',
    country: 'Italy',
    path: 'rome',
    price: 119,
    src: 'https://imagecdn.visit.com/md/d63c6f50-0230-4d53-88ab-b063aa0d1282.jpg',
  },
  {
    city: 'Amsterdam',
    name: 'Amsterdam',
    country: 'Netherlands',
    path: 'amsterdam',
    seo: 'amsterdam',
    tagId: 'amsterdam',
    price: 145,
    src: 'https://images.pexels.com/photos/2031706/pexels-photo-2031706.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    city: 'Athens',
    name: 'Athens',
    country: 'Grecce',
    path: 'athens',
    seo: 'athens',
    tagId: 'athens',
    price: 98,
    src: 'https://images.pexels.com/photos/772694/pexels-photo-772694.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    city: 'Barcelona',
    name: 'Barcelona',
    country: 'Spain',
    path: 'barcelona',
    seo: 'barcelona',
    tagId: 'barcelona',
    price: 185,
    src: 'https://images.pexels.com/photos/1386444/pexels-photo-1386444.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    city: 'Cinque Terre',
    name: 'Cinque Terre',
    country: 'Italy',
    path: 'cinque-terre',
    seo: 'cinque-terre',
    tagId: 'cinque-terre',
    price: 89,
    src: 'https://images.pexels.com/photos/4254546/pexels-photo-4254546.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    city: 'London',
    name: 'London',
    country: 'England',
    path: 'london',
    seo: 'london',
    tagId: 'london',
    price: 225,
    src: 'https://imagecdn.visit.com/md/d572271d-b131-4b85-a1ae-8b39c8be3319.jpg',
  },
  {
    city: 'Paris',
    name: 'Paris',
    country: 'France',
    path: 'paris',
    seo: 'paris',
    tagId: 'paris',
    price: 169,
    src: 'https://imagecdn.visit.com/md/55195b0e-bb8d-411c-bae4-33216a7a8c95.jpg',
  },
  {
    city: 'Dubrovnik',
    name: 'Dubrovnik',
    country: 'Croatia',
    path: '#',
    seo: '#',
    tagId: '#',
  },
  {
    city: 'Florence',
    name: 'Florence',
    country: 'Italy',
    path: '#',
    seo: '#',
    tagId: '#',
  },
  {
    city: 'Pompeii',
    name: 'Pompeii',
    country: 'Italy',
    path: '#',
    seo: '#',
    tagId: '#',
  },
  {
    city: 'San Francisco',
    name: 'San Francisco',
    country: 'United States',
    path: '#',
    seo: '#',
    tagId: '#',
  },
  {
    city: 'Vatican',
    name: 'Vatican',
    country: 'Italy',
    path: '#',
    seo: '#',
    tagId: '#',
  },
  {
    city: 'Venice',
    name: 'Venice',
    country: 'Italy',
    path: '#',
    seo: '#',
    tagId: '#',
  },
  {
    city: 'Las Vegas',
    name: 'Las Vegas',
    country: 'United States',
    path: '#',
    seo: '#',
    tagId: '#',
  },
  {
    city: 'Milan',
    name: 'Milan',
    country: 'Italy',
    path: '#',
    seo: '#',
    tagId: '#',
  },
  {
    city: 'New York',
    name: 'New York',
    country: 'United States',
    path: '#',
    seo: '#',
    tagId: '#',
  },
  {
    city: 'Krakow',
    name: 'Krakow',
    country: 'Poland',
    path: '#',
    seo: '#',
    tagId: '#',
  },
  {
    city: 'Dublin',
    name: 'Dublin',
    country: 'Ireland',
    path: '#',
    seo: '#',
    tagId: '#',
  },
];

// TODO should this be in a data-access/utils lib?
export type City = {
  city: string; // TODO this is the same as name, we might delete it in the future
  path?: string;
  src?: string;
  price?: number;
  country?: string;
  //
  name: string;
  // props to redirect the user to the correct view
  seo?: string;
  tagId: string; // this is mandatory
};

// TODO this should be in a utils libs
export type TTGResponse<T> = {
  data: T;
  total?: number;
};

export async function fetchFavourite(note: number): Promise<Favourite> {
  // Let's simulate an API call
  const timeoutPromise = (timeout: number) =>
    new Promise((resolve) => setTimeout(resolve, timeout));
  await timeoutPromise(200);
  return note;
}

export async function fetchCities(): Promise<City[]> {
  // Let's simulate an API call
  const timeoutPromise = (timeout: number): Promise<City[]> => {
    return new Promise((resolve) => {
      return setTimeout(() => resolve(cities), timeout);
    });
  };
  return await timeoutPromise(200);
}

export async function fetchMostPopularCities(): Promise<City[]> {
  // TODO the API Base URL should be in an ENV file/variable
  const response = (await (
    await fetch(
      'https://api2deus2wapp.azurewebsites.net/api/Category/most-popular-cities'
    )
  ).json()) as TTGResponse<City[]>;

  const mostPopularCities: City[] = filterCities(
    await Promise.all(
      response.data.map(async (city: City | any) => await formatCity(city))
    )
  );

  return mostPopularCities;
}

export async function fetchCitiesByQuery(query: string): Promise<City[]> {
  // Let's simulate an API call
  const timeoutPromise = (timeout: number): Promise<City[]> => {
    return new Promise((resolve) => {
      return setTimeout(() => {
        const filteredCities = cities.filter((el) => {
          return (
            el.city?.toLowerCase().includes(query.toLowerCase()) ||
            el.country?.toLowerCase().includes(query.toLowerCase())
          );
        });
        resolve(filteredCities);
      }, timeout);
    });
  };
  return await timeoutPromise(200);
}

export async function fetchTopDestinations(): Promise<City[]> {
  // TODO the API Base URL should be in an ENV file/variable
  const response = (await (
    await fetch(
      'https://api2deus2wapp.azurewebsites.net/api/Ratings/top-destinations?pageIndex=50&pageSize=1'
    )
  ).json()) as TTGResponse<City[]>;

  const topDestinations: City[] = await Promise.all(
    response.data.map(async (city: City | any) => await formatCity(city))
  );

  return topDestinations;
}
