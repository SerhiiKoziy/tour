interface Image {
  src: string;
  name: string;
}

interface Date {
  day: number;
  month: string;
}

interface Person {
  type: string;
  count: number;
}

export interface Voucher {
  id: string;
  title: string;
  description: string;
  image: Image;
  adults: Person;
  child?: Person;
  price: number;
  point: string;
  arrive: string;
  start: string;
  chatUrl: string;
  telephoneNumber: string;
  date: Date;
  qr: string;
  warningText: string;
  email: string;
}

export const vouchers = [
  {
    id: '1',
    title: 'Rome in a Day Tour With Colosseum and Vatican Museums',
    description:
      'Explore the underground tunnels and arena floor with exclusive backdoor entrance',
    image: {
      src: 'https://imagecdn.visit.com/original/df011b13-dabe-4775-9656-82cd9a465680.jpg',
      name: 'tour',
    },
    adults: {
      type: 'Adults',
      count: 2,
    },
    child: {
      type: 'Child',
      count: 1,
    },
    price: 543.43,
    point: 'Piazza Navona, 00186 Roma RM, Italy',
    arrive: '12:30 pm',
    start: '12:30 pm',
    chatUrl: 'Chat url',
    telephoneNumber: '+1 959-251-1942',
    date: {
      day: 20,
      month: 'September',
    },
    qr: '',
    warningText: 'less than ideal warning text goes here',
    email: 'contactexample@tourguy.com',
  },
  {
    id: '2',
    title: 'Rome in a Day Tour With Colosseum and Vatican Museums',
    description:
      'Explore the underground tunnels and arena floor with exclusive backdoor entrance',
    image: {
      src: 'https://imagecdn.visit.com/original/df011b13-dabe-4775-9656-82cd9a465680.jpg',
      name: 'tour',
    },
    adults: {
      type: 'Adults',
      count: 2,
    },
    child: {
      type: 'Child',
      count: 1,
    },
    price: 543.43,
    point: 'Piazza Navona, 00186 Roma RM, Italy',
    arrive: '12:30 pm',
    start: '12:30 pm',
    chatUrl: 'Chat url',
    telephoneNumber: '+1 959-251-1942',
    date: {
      day: 20,
      month: 'September',
    },
    qr: '',
    warningText: 'less than ideal warning text goes here',
    email: 'contactexample@tourguy.com',
  },
  {
    id: '3',
    title: 'Rome in a Day Tour With Colosseum and Vatican Museums',
    description:
      'Explore the underground tunnels and arena floor with exclusive backdoor entrance',
    image: {
      src: 'https://imagecdn.visit.com/original/df011b13-dabe-4775-9656-82cd9a465680.jpg',
      name: 'tour',
    },
    adults: {
      type: 'Adults',
      count: 2,
    },
    child: {
      type: 'Child',
      count: 1,
    },
    price: 543.43,
    point: 'Piazza Navona, 00186 Roma RM, Italy',
    arrive: '12:30 pm',
    start: '12:30 pm',
    chatUrl: 'Chat url',
    telephoneNumber: '+1 959-251-1942',
    date: {
      day: 20,
      month: 'September',
    },
    qr: '',
    warningText: 'less than ideal warning text goes here',
    email: 'contactexample@tourguy.com',
  },
];

export async function fetchVoucherById(
  id: string
): Promise<Voucher | undefined> {
  const timeoutPromise = (timeout: number): Promise<Voucher | undefined> => {
    return new Promise((resolve) => {
      return setTimeout(
        () => resolve(vouchers.find((el) => el.id === id)),
        timeout
      );
    });
  };
  return await timeoutPromise(200);
}

export async function fetchVouchers(): Promise<Voucher[]> {
  const timeoutPromise = (timeout: number): Promise<Voucher[]> => {
    return new Promise((resolve) => {
      return setTimeout(() => resolve(vouchers), timeout);
    });
  };
  return await timeoutPromise(200);
}
