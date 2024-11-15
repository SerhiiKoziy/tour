import { useCallback, useContext, useState } from 'react';
import { Box, Container } from '@chakra-ui/react';
import {
  Navbar,
  Footer,
  OrderCheckout,
  GeneralContext,
  GeneralContextType,
} from '@visit/ecomm-lib/shared/ui';
import { City } from '@visit/ecomm-lib/shared/data-access';

export interface CheckoutProps {
  cities: City[];
}

export function Checkout({ cities }: CheckoutProps) {
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
        <Container
          minWidth="100%"
          maxWidth="100%"
          paddingX={{ base: 4, md: 40 }}
          paddingY={{ base: 12, md: 12 }}
        >
          <OrderCheckout />
        </Container>
        <Footer />
      </Box>
    </>
  );
}

export default Checkout;
