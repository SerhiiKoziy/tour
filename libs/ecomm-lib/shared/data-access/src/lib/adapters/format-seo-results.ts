import Tour, { fetchTourById, TourTag } from '../services/tours-service'; // TODO types should be in a util lib

interface PartialAPITour {
  name?: string;
  description?: string;
  id?: number;
  productId: number;
  title: string;
  subTitle: string;
  duration: string;
  maxCapacity: string;
}

interface SeoResult {
  data: PartialAPITour | PartialAPITour[];
}

// NOTE: this function is to fill missing data we are mocking, but this method will evolve
// to transform de data as we need to fit our components' data requirements
export async function formatSeoResults(
  results: SeoResult,
  type: string
): Promise<Tour | Tour[] | null> {
  let formattedResults: Tour | Tour[] | null = null;

  switch (type) {
    case 'product':
      formattedResults = await sanitizeTour(results.data as PartialAPITour);
      break;
    case 'category':
    case 'destination':
    case 'country':
      formattedResults = await sanitizeTours(results.data as PartialAPITour[]);
      break;
  }

  return formattedResults;
}

async function sanitizeTours(tours: PartialAPITour[]): Promise<Tour[] | null> {
  let formattedResults: Tour[] | null = null;
  try {
    formattedResults = (
      await Promise.all(
        tours.map(async (tour: PartialAPITour) => {
          const formattedResults = await sanitizeTour(tour);
          return formattedResults;
        })
      )
    ).filter((tour): tour is Tour => tour !== null);

    // eslint-disable-next-line no-empty
  } catch (error) {} // TODO nothing to handle within the catch block for now

  return formattedResults;
}

// TODO this function is horrible because there is no a standard way to name the Tour attributes
// this will change in the future
async function sanitizeTour(tour: PartialAPITour): Promise<Tour | null> {
  let partialTour: Partial<Tour> = {
    ...tour,
    id: tour.productId ?? tour.id,
    title: tour.title ?? tour.name,
    description: tour.subTitle ?? tour.description,
    duration: tour.duration ?? '9999',
    guests: Number(tour.maxCapacity) ?? 9999,
  };

  partialTour = formatTour(partialTour);
  // TODO this variable would disappear once we get the information needed from the endpoints
  // although we can use it to fill thje missing information if needed
  const missingTourInfo: Tour | undefined = await fetchTourById(1);

  if (!missingTourInfo) {
    return null;
  }

  return {
    ...missingTourInfo,
    ...partialTour,
  };
}

// This function is to normalize the name of attributes and format certain information
// of the tour
export function formatTour(tour: Tour | any): Tour {
  tour.title = tour.title ?? tour.name;
  tour.city = 'TODO Missing Destination';
  tour.guests = 9999; // TODO missing this info
  tour.duration = '9999'; //TODO missing this info
  tour.attractions = []; // TODO missing this info
  tour.rating = {
    value: Number(tour.ratingStars ?? 0).toFixed(2),
    count: Number(tour.reviewersCount ?? 0),
    statistics: [
      {
        name: 'No Idea',
        count: 9999,
      },
    ],
    comments: [
      {
        id: 1,
        rating: 1,
        name: 'No name',
        date: '2022-12-02',
        message: 'Some message',
      },
    ],
  };
  tour.price = {
    current: Number(tour.discountPricePerAdult ?? 0)
      .toFixed(2)
      .toString(),
    adult: Number(tour.regularPricePerAdult ?? 0)
      .toFixed(2)
      .toString(),
    child: Number(tour.discountPricePerAdult ?? 0)
      .toFixed(2)
      .toString(), // TODO this is missing from response
  };
  tour.tourOverview = '';
  tour.meetingDropOff = '';
  tour.whatToBring = '';
  tour.faqs = '';
  tour.itineraries = [
    {
      // this shouldn't be mandatory
      id: 1,
      point: '',
      title: '',
      description: '',
    },
  ];
  tour.participants = [];
  tour.placesToVisit = [
    {
      id: 1,
      title: 'Mock place to visit',
      enabled: true,
    },
  ];
  tour.includes = [
    {
      id: 1,
      label: 'Mock includes to visit',
      active: true,
    },
  ];
  const tags: TourTag[] = [];
  tour.images?.forEach((image: any, index: number) => {
    image.src = `https://ttg-filestorage-test.azurewebsites.net/${image.url}`;
    image.tags?.forEach((tag: string, tagIndex: number) => {
      if (tag && tags.length < 4) {
        tags.push({
          id: index + tagIndex,
          title: tag,
          color: 'blue',
        });
      }
    });
  });
  tour.tags = tags; // tags should come at root level, not within each image
  return tour;
}
