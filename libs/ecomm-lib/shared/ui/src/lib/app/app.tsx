import { default as NextApp, AppContext, AppProps } from 'next/app';
import Head from 'next/head';
import {
  City,
  fetchMostPopularCities,
  fetchUser,
  User,
  wrapper,
} from '@visit/ecomm-lib/shared/data-access';
import { ChakraProvider } from '@chakra-ui/react';
import { appWithTranslation } from 'next-i18next';

import { theme } from '@visit/shared/ui';
import { createContext } from 'react';

export type GeneralContextType = {
  mostPopularCities: City[];
  user?: User;
  isLogged: boolean;
};

export const GeneralContext = createContext<GeneralContextType>({
  mostPopularCities: [],
  user: undefined,
  isLogged: false,
});

export function App({ Component, pageProps }: AppProps) {
  const { mostPopularCities, user, isLogged } = pageProps;

  return (
    <GeneralContext.Provider value={{ mostPopularCities, user, isLogged }}>
      <ChakraProvider theme={theme}>
        <Head>
          <title>Welcome to ecomm-app!</title>
          <link rel="icon" type="image/svg" sizes="16x16" href="/icon.svg" />
        </Head>
        <main className="app">
          <Component {...pageProps} />
        </main>
      </ChakraProvider>
    </GeneralContext.Provider>
  );
}

App.getInitialProps = async (ctx: AppContext) => {
  const mostPopularCities = await fetchMostPopularCities();
  const user = await fetchUser();
  const isLogged = false;

  return {
    pageProps: {
      // Some custom thing for all pages
      mostPopularCities,
      user,
      isLogged,
      // https://nextjs.org/docs/advanced-features/custom-app#caveats
      ...(await NextApp.getInitialProps(ctx)).pageProps,
    },
  };
};

export const AppDefault = wrapper.withRedux(appWithTranslation(App));
