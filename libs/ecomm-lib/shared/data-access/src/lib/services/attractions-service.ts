import { City } from './destinations-service';

export const attractions: Attraction[] = [
  {
    title: 'Museum Tours',
    city: 'Amsterdam',
    name: 'Amsterdam',
    tagId: 'amsterdam',
    country: 'Netherlands',
    src: 'https://images.pexels.com/photos/2031706/pexels-photo-2031706.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    title: 'Boat Tours',
    city: 'Amsterdam',
    country: 'Netherlands',
    src: 'https://images.pexels.com/photos/2026451/pexels-photo-2026451.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    name: 'Amsterdam',
    tagId: 'amsterdam',
  },
  {
    title: 'Bike Tours',
    city: 'Amsterdam',
    country: 'Netherlands',
    src: 'https://images.pexels.com/photos/1187911/pexels-photo-1187911.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    name: 'Amsterdam',
    tagId: 'amsterdam',
  },
  {
    title: 'Acropolis',
    city: 'Athens',
    country: 'Grecce',
    src: 'https://images.pexels.com/photos/2031706/pexels-photo-2031706.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    name: 'Amsterdam',
    tagId: 'amsterdam',
  },
  {
    title: 'Montserrat',
    city: 'Barcelona',
    country: 'Spain',
    src: 'https://images.pexels.com/photos/2031706/pexels-photo-2031706.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    name: 'Amsterdam',
    tagId: 'amsterdam',
  },
  {
    title: 'Colosseum Underground',
    city: 'Rome',
    country: 'Italy',
    src: 'https://images.pexels.com/photos/532263/pexels-photo-532263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    name: 'Amsterdam',
    tagId: 'amsterdam',
  },
  {
    title: 'Catacombs',
    city: 'Rome',
    country: 'Italy',
    src: 'https://images.pexels.com/photos/2676589/pexels-photo-2676589.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    name: 'Amsterdam',
    tagId: 'amsterdam',
  },
  {
    title: 'Pantheon',
    city: 'Rome',
    country: 'Italy',
    src: 'https://images.pexels.com/photos/2676602/pexels-photo-2676602.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    name: 'Amsterdam',
    tagId: 'amsterdam',
  },
  {
    title: 'St. Peter’s Dome',
    city: 'Cinque Terre',
    country: 'Italy',
    src: 'https://images.pexels.com/photos/2031706/pexels-photo-2031706.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    name: 'Amsterdam',
    tagId: 'amsterdam',
  },
  {
    title: 'St. Peter’s Basilica',
    city: 'Florence',
    country: 'Italy',
    src: 'https://images.pexels.com/photos/2031706/pexels-photo-2031706.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    name: 'Amsterdam',
    tagId: 'amsterdam',
  },
  {
    title: 'Sistine Chapel',
    city: 'Vatican',
    country: 'Italy',
    src: 'https://images.pexels.com/photos/2031706/pexels-photo-2031706.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    name: 'Amsterdam',
    tagId: 'amsterdam',
  },
  {
    title: 'St. Mark’s Basilica',
    city: 'Pompeii',
    country: 'Italy',
    src: 'https://images.pexels.com/photos/2031706/pexels-photo-2031706.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    name: 'Amsterdam',
    tagId: 'amsterdam',
  },
  {
    title: 'Murano & Burano',
    city: 'Milan',
    country: 'Italy',
    src: 'https://images.pexels.com/photos/2031706/pexels-photo-2031706.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    name: 'Amsterdam',
    tagId: 'amsterdam',
  },
  {
    title: 'Doge’s Palace',
    city: 'Venice',
    country: 'Italy',
    src: 'https://images.pexels.com/photos/2031706/pexels-photo-2031706.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    name: 'Amsterdam',
    tagId: 'amsterdam',
  },
];

// TODO should this be in a data-access/utils lib?
export type Attraction = City & {
  title: string;
  city: string;
  country: string;
  src: string;
};

export async function fetchAttractions(): Promise<Attraction[]> {
  // Let's simulate an API call
  const timeoutPromise = (timeout: number): Promise<Attraction[]> => {
    return new Promise((resolve) => {
      return setTimeout(() => resolve(attractions), timeout);
    });
  };
  return await timeoutPromise(200);
}

export async function fetchAttractionsByCity(
  city: string
): Promise<Attraction[]> {
  // Let's simulate an API call
  const timeoutPromise = (timeout: number): Promise<Attraction[]> => {
    return new Promise((resolve) => {
      return setTimeout(() => {
        const filteredTours = attractions.filter((el) => {
          return el.city.toLowerCase().includes(city.toLowerCase());
        });
        resolve(filteredTours);
      }, timeout);
    });
  };
  return await timeoutPromise(200);
}
