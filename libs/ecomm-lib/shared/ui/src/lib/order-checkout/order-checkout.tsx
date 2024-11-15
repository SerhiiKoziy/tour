import { useEffect, useState } from 'react';

import { useTranslation } from 'next-i18next';
import {
  Hide,
  Show,
  Box,
  Flex,
  Text,
  Stack,
  SimpleGrid,
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
} from '@chakra-ui/react';
import { LeftSmall } from '@icon-park/react';
import { Button } from '@visit/shared/ui';

import {
  PaymentForm,
  PaymentValues,
  paymentInitialValues,
  InformationForm,
  InformationValues,
  InformationInitialValues,
} from './checkout-form';
import {
  CheckoutSummaryDesktop,
  CheckoutSummaryMobile,
} from './checkout-summary';
import {
  Order,
  PromoCode,
  fetchOrderCheckout,
} from '@visit/ecomm-lib/shared/data-access';

const CheckoutAccordion = () => {
  const { t } = useTranslation('common');
  const [accordionIndex, setAccordionIndex] = useState(0);
  const [values, setValues] = useState({
    ...InformationInitialValues,
    ...paymentInitialValues,
  });

  const handleValues = (formValues: InformationValues | PaymentValues) => {
    setValues({ ...values, ...formValues });
  };

  useEffect(() => {
    // Call Endpoint to send form values
    // console.log(values);
  }, [values]);

  const accordionItemStyles = {
    py: 4,
    border: 'none',
    borderBottom: '1px solid',
    borderBottomColor: 'gray.400',
  };
  return (
    <Accordion index={accordionIndex} px={{ base: 4, md: 0 }}>
      <AccordionItem {...accordionItemStyles}>
        <Flex align="center" gap={4}>
          <AccordionButton p={0} width="auto">
            <Text fontWeight="bold" fontSize="xl" lineHeight={7}>
              {t('checkout.information.title')}
            </Text>
          </AccordionButton>
          {accordionIndex === 1 && (
            <Button
              bg="gray.300"
              colorScheme="darkGray"
              onClick={() => setAccordionIndex(0)}
            >
              {t('checkout.change')}
            </Button>
          )}
        </Flex>
        {accordionIndex === 1 && (
          <Stack spacing={0} mt={4}>
            <Text
              lineHeight={5}
            >{`${values.firstName} ${values.lastName}`}</Text>
            <Text fontSize="sm" color="gray.500" lineHeight={5}>
              {values.email}
            </Text>
            <Text fontSize="sm" color="gray.500" lineHeight={5}>
              {values.phone}
            </Text>
          </Stack>
        )}

        <AccordionPanel p={0} mt={6}>
          <InformationForm
            setValues={handleValues}
            changeAccordion={setAccordionIndex}
          />
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem
        {...accordionItemStyles}
        borderBottom={accordionIndex === 1 ? 'none' : '1px solid'}
      >
        <AccordionButton p={0} width="auto">
          <Text fontWeight="bold" fontSize="xl" lineHeight={7}>
            {t('checkout.payment.title')}
          </Text>
        </AccordionButton>

        <AccordionPanel p={0} mt={6}>
          <PaymentForm
            setValues={handleValues}
            changeAccordion={setAccordionIndex}
          />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export function OrderCheckout() {
  const { t } = useTranslation('common');

  const [orderCheckout, setOrderCheckout] = useState<Order[]>([]);
  const [promoDiscount, setPromoDiscount] = useState<PromoCode | null>(null);

  useEffect(() => {
    const fetchCheckoutList = async () => {
      const checkoutList = await fetchOrderCheckout();
      setOrderCheckout(checkoutList);
    };
    fetchCheckoutList().catch(console.error);
  }, []);
  return (
    <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={{ base: 6, sm: 32 }}>
      <Stack spacing={{ base: 5, md: 9 }}>
        <Flex
          alignItems="center"
          pb={{ base: 2, md: 0 }}
          px={{ base: 4, md: 0 }}
          borderBottom={{ base: '1px solid', md: 'none' }}
          borderColor="gray.400"
        >
          <Button
            mr={{ base: 2, sm: 6 }}
            size="lg"
            variant="outline"
            colorScheme="gray"
            leftIcon={LeftSmall}
          />
          <Box>
            <Text
              fontWeight="extrabold"
              fontSize={{ base: 'xl', sm: '32' }}
              lineHeight={{ base: 7, sm: 10 }}
            >
              {t('checkout.order')}
            </Text>
            <Text
              fontSize="sm"
              lineHeight={5}
              color="gray.500"
              display={{ base: 'block', sm: 'none' }}
            >
              {t('checkout.summary.tourWithCount', {
                count: orderCheckout.length,
              })}
            </Text>
          </Box>
        </Flex>

        <CheckoutAccordion />
      </Stack>

      <Hide above="lg">
        <CheckoutSummaryMobile
          summary={orderCheckout}
          promoDiscount={promoDiscount}
          setPromoDiscount={setPromoDiscount}
        />
      </Hide>
      <Show above="lg">
        <CheckoutSummaryDesktop
          summary={orderCheckout}
          promoDiscount={promoDiscount}
          setPromoDiscount={setPromoDiscount}
        />
      </Show>
    </SimpleGrid>
  );
}

export default OrderCheckout;
