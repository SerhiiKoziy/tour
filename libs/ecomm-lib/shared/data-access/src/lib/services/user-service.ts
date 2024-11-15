export interface User {
  details: {
    name: string;
  };
  tours: {
    upcomingTours: {
      count: number;
    };
  };
  orderHistory: {
    count: number;
  };
  wishlist: {
    count: number;
  };
}

export const user = {
  details: {
    name: 'John Doe',
  },
  tours: {
    upcomingTours: {
      count: 3,
    },
  },
  orderHistory: {
    count: 8,
  },
  wishlist: {
    count: 3,
  },
};

export async function fetchUser(): Promise<User> {
  const timeoutPromise = (timeout: number): Promise<User> => {
    return new Promise((resolve) => {
      return setTimeout(() => resolve(user), timeout);
    });
  };
  return await timeoutPromise(200);
}
