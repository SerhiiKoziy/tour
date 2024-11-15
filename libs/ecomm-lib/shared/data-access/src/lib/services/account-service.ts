export interface TourAccount {
  id: number;
  src: string;
  name: string;
}

export interface OrderHistory {
  id: number;
  order: number;
  date: string;
  price: number;
  status: string;
  tours: TourAccount[];
}

export const orderHistory: OrderHistory[] = [
  {
    id: 1,
    order: 12677,
    date: "Sep 12, 2022",
    price: 1495.43,
    status: "Complete Order",
    tours: [
      {
        id: 1,
        src: "https://images.pexels.com/photos/532263/pexels-photo-532263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        name: "Roman Coliseum 02",
      },
      {
        id: 2,
        src: "https://images.pexels.com/photos/4319586/pexels-photo-4319586.jpeg",
        name: "Roman Coliseum 03",
      },
      {
        id: 3,
        src: "https://images.pexels.com/photos/4319586/pexels-photo-4319586.jpeg",
        name: "Roman Coliseum 03",
      },
    ]
  },
  {
    id: 2,
    order: 12677,
    date: "Sep 12, 2022",
    price: 1495.43,
    status: "Completed",
    tours: [
      {
        id: 1,
        src: "https://images.pexels.com/photos/532263/pexels-photo-532263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        name: "Roman Coliseum 02",
      }
    ]
  },
  {
    id: 3,
    order: 12677,
    date: "Sep 12, 2022",
    price: 1495.43,
    status: "Cancelled",
    tours: [
      {
        id: 1,
        src: "https://images.pexels.com/photos/532263/pexels-photo-532263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        name: "Roman Coliseum 02",
      },
      {
        id: 2,
        src: "https://images.pexels.com/photos/4319586/pexels-photo-4319586.jpeg",
        name: "Roman Coliseum 03",
      },
    ]
  },
];

export interface MyAccountDetails {
  firstName: string;
  lastName: string;
  email: string;
  date: string;
  country: string;
  number?: string;
  city?: string
}

export const myAccountDetails: MyAccountDetails = {
  firstName: "Oleh",
  lastName: "Sheptytskyi",
  email: "oleh.sheptytskyi@excited.agency",
  number: "+1 234 567 8901",
  date: "Sep 23, 2021",
  country: "United States",
  city: "",
}

export async function fetchAccountDetails(): Promise<MyAccountDetails> {
  const timeoutPromise = (timeout: number): Promise<MyAccountDetails> => {
    return new Promise((resolve) => {
      return setTimeout(() => resolve(myAccountDetails), timeout);
    });
  };
  return await timeoutPromise(200);
}


export async function fetchOrderHistory(): Promise<OrderHistory[]> {
  const timeoutPromise = (timeout: number): Promise<OrderHistory[]> => {
    return new Promise((resolve) => {
      return setTimeout(() => resolve(orderHistory), timeout);
    });
  };
  return await timeoutPromise(200);
}
