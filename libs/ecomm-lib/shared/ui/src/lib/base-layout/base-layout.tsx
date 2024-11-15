import { Container, Box } from '@chakra-ui/react';
import { City } from '@visit/ecomm-lib/shared/data-access';
import { useState, useCallback, ReactNode, useContext } from 'react';
import { Footer } from '../footer/footer';
import MostPopularCities from '../most-popular-cities/most-popular-cities';
import Navbar from '../navbar/navbar';
import SubscribeBanner from '../subscribe-banner/subscribe-banner';
import { GeneralContext, GeneralContextType } from '../app/app';

export interface BaseLayoutProps {
  cities: City[];
  children?: ReactNode;
}

export function PlainLayout({ cities, children }: BaseLayoutProps) {
  const headerHeight = 16;
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const isVisibleCallback = useCallback(
    (isVisible: boolean) => {
      setIsHeaderVisible(isVisible);
    },
    [setIsHeaderVisible]
  );

  const { user, isLogged } = useContext<GeneralContextType>(GeneralContext);

  return (
    <>
      <Container
        minWidth="100%"
        maxWidth="100%"
        paddingX="0"
        as="header"
        position="fixed"
        zIndex={15}
      >
        <Navbar
          user={user}
          cities={cities}
          isLogged={isLogged}
          borderBottomWidth="1px"
          borderColor="gray.400"
          height={headerHeight}
          isVisibleCallback={isVisibleCallback}
        ></Navbar>
      </Container>
      <Box
        translateY={isHeaderVisible ? headerHeight : 0}
        transform="auto"
        transition="transform 0.5s ease-in-out"
      >
        {children}
        <Footer />
      </Box>
    </>
  );
}

export function BaseLayout({ cities, children }: BaseLayoutProps) {
  const { mostPopularCities } = useContext<GeneralContextType>(GeneralContext);

  return (
    <PlainLayout cities={cities}>
      {children}
      <Container
        minWidth="100%"
        maxWidth="100%"
        paddingX={{ base: '4', md: '40' }}
        paddingY={{ base: '12', md: '12' }}
      >
        <SubscribeBanner
          onClickCallback={() => {
            alert(123);
          }}
        />
      </Container>
      <Container
        minWidth="100%"
        maxWidth="100%"
        paddingX={{ base: '4', md: '40' }}
        paddingY={{ base: '12', md: '12' }}
        borderTopWidth="1px"
        borderColor="gray.400"
      >
        <MostPopularCities cities={mostPopularCities} />
      </Container>
    </PlainLayout>
  );
}

export default BaseLayout;
