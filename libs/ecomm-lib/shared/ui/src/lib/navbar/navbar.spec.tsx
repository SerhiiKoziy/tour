import { render, screen } from '@testing-library/react';

import Navbar from './navbar';

// TODO this should be in a beforeEach or beforeAll block to allow
// spies to be reset
import { useTranslation } from 'react-i18next';
import { City, User } from '@visit/ecomm-lib/shared/data-access';

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

// TODO this should be in a helper/mock lib

jest.mock('next/image', () => ({
  __esModule: true,
  default: () => {
    return 'Next image stub'; // whatever
  },
}));

// TODO this should be in a helper/mock lib

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('Navbar', () => {
  let user: User;
  let cities: City[];
  beforeAll(() => {
    user = {
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
    cities = [
      { city: 'Miami', path: '/miami' },
      { city: 'Cali', path: '/Cali' },
    ];
  });
  it('should render successfully with the sign in options when the user is not logged in', () => {
    const { baseElement } = render(
      <Navbar user={user} isLogged={false} cities={cities} />
    );
    expect(baseElement).toBeTruthy();
    expect(screen.findByText('navbar.signInWithEmail')).toBeTruthy();
    expect(screen.findByText('navbar.createAccount')).toBeTruthy();
    expect(screen.queryByText('navbar.upcomingTours')).not.toBeTruthy();
  });

  it('should render successfully with options such as upcoming tours when the user is logged in', () => {
    const { baseElement } = render(
      <Navbar user={user} isLogged={true} cities={cities} />
    );
    expect(baseElement).toBeTruthy();
    expect(screen.queryByText('navbar.signInWithEmail')).not.toBeTruthy();
    expect(screen.queryByText('navbar.createAccount')).not.toBeTruthy();
    expect(screen.findByText(user.details.name)).toBeTruthy();
    expect(screen.findByText(user.tours.upcomingTours.count)).toBeTruthy();
    expect(screen.findByText(user.orderHistory.count)).toBeTruthy();
    expect(screen.findByText(user.wishlist.count)).toBeTruthy();
    expect(screen.findByText('navbar.upcomingTours')).toBeTruthy();
  });
});
