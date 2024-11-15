export interface Time {
  id: number;
  time: string;
  prices: {
    adult: number;
    child: number;
  };
}

export interface Schedules {
  morning: PartDay;
  day?: PartDay;
}

export interface PartDay {
  label: string;
  times: Time[];
}

export interface PriceDetails {
  type: string;
  count: number;
}

export interface TourProposal {
  id?: number;
  title: string;
  description: string;
  tourType: string;
  tag: {
    id: number;
    title: string;
    color: string;
  };
  priceDetails: PriceDetails[];
  schedules: Schedules;
}

export const tourProposalCards = [
  {
    id: 1,
    title: 'Rome in a Day Tour With Colosseum and Vatican Museums Tickets',
    description:
      'Your ticket also includes one entry to the Palatine Hill and Roman Forum, must-see sights for all those visiting the “Eternal City.” According to ancient tradition, this is the spot where Rome was born.',
    tourType: 'Small Group Tour',
    tag: {
      id: 1,
      title: 'Free Cancellation',
      color: 'green',
    },
    priceDetails: [
      {
        type: 'Adult',
        count: 2,
      },
      {
        type: 'Child',
        count: 1,
      },
    ],
    schedules: {
      morning: {
        label: 'morning',
        times: [
          {
            id: 1,
            time: '8 am',
            labels: [],
            prices: {
              child: 80,
              adult: 160,
            },
          },
          {
            id: 2,
            time: '9 am',
            labels: [],
            prices: {
              child: 80,
              adult: 140,
            },
          },
        ],
      },
      day: {
        label: 'day',
        times: [
          {
            id: 3,
            time: '12 am',
            labels: [],
            prices: {
              child: 120,
              adult: 140,
            },
          },
          {
            id: 4,
            time: '1 pm',
            labels: [],
            prices: {
              child: 120,
              adult: 140,
            },
          },
        ],
      },
    },
  },
  {
    id: 2,
    title: 'Rome in a Day Tour With Colosseum and Vatican Museums Tickets',
    description:
      'Your ticket also includes one entry to the Palatine Hill and Roman Forum, must-see sights for all those visiting the “Eternal City.” According to ancient tradition, this is the spot where Rome was born.',
    tourType: 'Medium Group Tour',
    tag: {
      id: 1,
      title: 'Free Cancellation',
      color: 'green',
    },
    priceDetails: [
      {
        type: 'Adult',
        count: 3,
      },
    ],
    schedules: {
      morning: {
        label: 'morning',
        times: [
          {
            id: 1,
            time: '8 am',
            labels: [],
            prices: {
              child: 50,
              adult: 70,
            },
          },
          {
            id: 2,
            time: '10 am',
            labels: [],
            prices: {
              child: 70,
              adult: 90,
            },
          },
        ],
      },
      day: {
        label: 'day',
        times: [
          {
            id: 3,
            time: '12 am',
            labels: [],
            prices: {
              child: 80,
              adult: 100,
            },
          },
        ],
      },
    },
  },
  {
    id: 3,
    title: 'Rome in a Day Tour With Colosseum and Vatican Museums Tickets',
    description:
      'Your ticket also includes one entry to the Palatine Hill and Roman Forum, must-see sights for all those visiting the “Eternal City.” According to ancient tradition, this is the spot where Rome was born.',
    tourType: 'Medium Group Tour',
    tag: {
      id: 1,
      title: 'Free Cancellation',
      color: 'green',
    },
    priceDetails: [
      {
        type: 'Adult',
        count: 3,
      },
    ],
    schedules: {
      morning: {
        label: 'morning',
        times: [
          {
            id: 1,
            time: '8 am',
            labels: [],
            prices: {
              child: 80,
              adult: 100,
            },
          },
          {
            id: 2,
            time: '9 am',
            labels: [],
            prices: {
              child: 150,
              adult: 170,
            },
          },
        ],
      },
    },
  },
];

export async function fetchTourProposalCardById(
  id: number
): Promise<TourProposal | undefined> {
  const timeoutPromise = (
    timeout: number
  ): Promise<TourProposal | undefined> => {
    return new Promise((resolve) => {
      return setTimeout(
        () => resolve(tourProposalCards.find((el) => el.id === id)),
        timeout
      );
    });
  };
  return await timeoutPromise(200);
}

export async function fetchTourProposalCards(): Promise<TourProposal[]> {
  const timeoutPromise = (timeout: number): Promise<TourProposal[]> => {
    return new Promise((resolve) => {
      return setTimeout(() => resolve(tourProposalCards), timeout);
    });
  };
  return await timeoutPromise(200);
}
