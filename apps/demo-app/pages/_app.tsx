import { AppProps } from 'next/app';
import Head from 'next/head';
import { wrapper } from '@visit/ecomm-lib/shared/data-access';
import { ChakraProvider } from '@chakra-ui/react';
import { appWithTranslation } from 'next-i18next';
import './styles.css';

import { theme } from '@visit/shared/ui';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>Ecomm-app - Demo</title>
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>
    </ChakraProvider>
  );
}

// TODO This should be the default way to work if we decide to get away from next-redux-wrapper
// to opt in to the Auto Static Optimization, but I need to check how to check if pages are candidates for ASO
// Note: If we don't use the withRedux HOC, we need to wrap the component between <Provider> tag
export default wrapper.withRedux(appWithTranslation(CustomApp));
