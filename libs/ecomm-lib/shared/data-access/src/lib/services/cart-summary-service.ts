export interface CartData {
  id: number;
  image: string;
  selectDate: string;
  selectTime: string;
  title: string;
  type: string;
  price: number;
  adult: string;
  child?: string;
  additionalOptions?: string[];
}

export const cartSummary = [
  {
    id: 1,
    title: 'Rome in a Day Tour With Colosseum and Vatican Museums 1',
    image:
      'https://images.pexels.com/photos/2676642/pexels-photo-2676642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: 540.1,
    type: 'Small Group Tour',
    selectTime: '12:30 pm',
    selectDate: 'Wed, 20 Sep 2022',
    adult: '3 Adult',
    child: '1 Child',
    additionalOptions: [
      '24-hr cancellation on group tours',
      '12-hr cancellation on group tours',
    ],
  },
  {
    id: 2,
    title: 'Rome in a Day Tour With Colosseum and Vatican Museums 2',
    image: 'https://images.pexels.com/photos/4319586/pexels-photo-4319586.jpeg',
    price: 640.2,
    type: 'Small Group Tour',
    selectTime: '12:30 pm',
    selectDate: 'Wed, 20 Sep 2022',
    adult: '3 Adult',
    additionalOptions: [],
  },
  {
    id: 3,
    title: 'Rome in a Day Tour With Colosseum and Vatican Museums 3',
    image:
      'https://images.pexels.com/photos/532263/pexels-photo-532263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: 370.3,
    type: 'Small Group Tour',
    selectTime: '12:30 pm',
    selectDate: 'Wed, 20 Sep 2022',
    adult: '3 Adult',
    child: '1 Child',
    additionalOptions: [],
  },
];

export async function fetchCartSummary(): Promise<CartData[]> {
  const timeoutPromise = (timeout: number): Promise<CartData[]> => {
    return new Promise((resolve) => {
      return setTimeout(() => resolve(cartSummary), timeout);
    });
  };
  return await timeoutPromise(200);
}
