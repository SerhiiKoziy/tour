import { render } from '@testing-library/react';
import {
  fetchMostPopularCities,
  fetchUser,
  cities,
  user,
} from '@visit/ecomm-lib/shared/data-access';

import { AppContext, AppProps } from 'next/app';

import { GeneralContext } from './app';

import { App } from './app';

// Mocking services to check if they are called
jest.mock('next/app', () => {
  const originalModule = jest.requireActual('next/app');
  return {
    __esModule: true,
    ...originalModule,
    default: { getInitialProps: () => ({ pageProps: {} }) },
  };
});

// Mocking services to check if they are called
jest.mock('@visit/ecomm-lib/shared/data-access', () => {
  const originalModule = jest.requireActual(
    '@visit/ecomm-lib/shared/data-access'
  );
  return {
    __esModule: true,
    ...originalModule,
    fetchMostPopularCities: jest.fn(),
    fetchUser: jest.fn(),
  };
});

const router = {} as AppProps['router'];
const ctx = { ctx: { pathname: '' } } as AppContext;

describe('App', () => {
  let fetchMostPopularCitiesMock: jest.Mock;
  let fetchUserMock: jest.Mock;

  beforeAll(() => {
    fetchMostPopularCitiesMock = fetchMostPopularCities as jest.Mock;
    fetchUserMock = fetchUser as jest.Mock;
  });

  it('should render successfully', () => {
    const { baseElement } = render(
      <GeneralContext.Provider
        value={{
          mostPopularCities: [],
          user: undefined,
          isLogged: false,
        }}
      >
        <App pageProps={{}} Component={() => null} router={router} />
      </GeneralContext.Provider>
    );
    expect(baseElement).toBeTruthy();
  });

  it('should call the expected methods', async () => {
    fetchMostPopularCitiesMock.mockReturnValue(cities);
    fetchUserMock.mockReturnValue(user);

    const pageProps = (await App.getInitialProps(ctx)).pageProps;

    expect(fetchMostPopularCitiesMock).toHaveBeenCalled();
    expect(fetchUserMock).toHaveBeenCalled();

    // TODO add type to pageProps
    expect(pageProps.mostPopularCities).toBe(cities);
    expect(pageProps.user).toBe(user);
    expect(pageProps.isLogged).toBe(false);
  });
});
