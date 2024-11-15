import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from '@visit/ecomm-lib/shared/data-access';

import Link from 'next/link';
import styles from '../index.module.scss';
import { EcommLibSharedUi } from '@visit/ecomm-lib/shared/ui';
import { useEffect, useState } from 'react';
import { Carousel } from '@visit/shared/ui';
import { Container } from '@chakra-ui/react';

export function Links() {
  return (
    <>
      <Link href="/demo">
        <a>Go to home</a>
      </Link>
      <br />
      <Link href="/demo/test">
        <a>Go to test to get an error after refreshing the page</a>
      </Link>
      <br />
      <Link href="/demo/dynamic-import">
        <a>
          The same as test, but loading the component in the client side, so we
          do not have the hydration issue
        </a>
      </Link>
      <br />
      <Link href="/demo/ssr-state">
        <a>Go to SSR page</a>
      </Link>
    </>
  );
}

export function Index() {
  /*
   * TODO only use PersistGate when you need to use the store from Redux because this is not very SEO friendly
   */

  const [autoplay, setAutoplay] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAutoplay(true);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [setAutoplay]);

  return (
    <>
      <PersistGate persistor={persistor} loading={<div>Loading</div>}>
        <div className={styles.page}>
          <EcommLibSharedUi />
          <Links />
          <Container
            minWidth="100%"
            maxWidth="100%"
            paddingX={{ base: '4', md: '40' }}
            paddingY={{ base: '12', md: '12' }}
          >
            <div>Your recent searches component will be here soon</div>
            <Carousel
              arrows
              autoplay={autoplay}
              dots
              loop
              slides={{ perView: 3, spacing: 15 }}
            >
              <div style={{ background: 'grey', minHeight: '100%' }}>1111</div>
              <div style={{ background: 'grey', minHeight: '100%' }}>2222</div>
              <div style={{ background: 'grey', minHeight: '100%' }}>3333</div>
              <div style={{ background: 'grey', minHeight: '100%' }}>4444</div>
            </Carousel>
          </Container>
        </div>
      </PersistGate>
    </>
  );
}

export default Index;
