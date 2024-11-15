import { Fragment, ReactNode } from 'react';
import { useTranslation } from 'next-i18next';
import {
  Box,
  BoxProps,
  Center,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Show,
  Hide,
  Icon,
  IconButton,
  Portal,
  Select,
  Slide,
  Stack,
  StackProps,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import {
  BankCard,
  Calendar,
  Check,
  Close,
  Down,
  Lock,
  Up,
} from '@icon-park/react';
import { Button } from '@visit/shared/ui';

import { Order, PromoCode } from '@visit/ecomm-lib/shared/data-access';
import CheckoutPromo, { CheckoutPromoProps } from './checkout-promo';

interface CheckoutSummaryProps extends CheckoutPromoProps {
  summary: Order[];
}

interface CheckoutBoxProps extends BoxProps, StackProps {
  children: ReactNode;
}

interface CheckoutTotalProps extends BoxProps {
  total: number;
  isOpen: boolean;
  onToggle: () => void;
}

// We could capture this var from an API Endpoint or a global Config Redux state
const SELECTED_CURRENCY = 'USD';

const calcTotal = (summary: Order[]) =>
  summary.reduce((partialSum, a) => partialSum + a.price[SELECTED_CURRENCY], 0);

const calcDiscount = (total: number, promoDiscount: PromoCode | null) =>
  promoDiscount ? total * (promoDiscount.value / 100) : 0;

export const CheckoutBox = ({ children, ...rest }: CheckoutBoxProps) => (
  <Box
    p={3}
    shadow="shadow.100"
    border="1px solid"
    borderColor="gray.400"
    borderRadius="lg"
    {...rest}
  >
    {children}
  </Box>
);

const OrderCardText = ({ children }: { children: ReactNode }) => (
  <Text color="gray.500" fontSize="sm" fontWeight="medium" lineHeight={5}>
    {children}
  </Text>
);

const CheckoutOrderCard = ({ order }: { order: Order }) => {
  const { t } = useTranslation('common');

  return (
    <Flex
      direction="column"
      gap={{ base: 1, sm: 2 }}
      px={{ base: 4, sm: 0 }}
      py={{ base: 4, sm: 0 }}
      bg="gray.100"
      borderRadius="lg"
      border={{ base: '1px solid', sm: 'none' }}
      borderColor="gray.400"
    >
      <Flex
        align="center"
        justify="space-between"
        display={{ base: 'flex', sm: 'none' }}
      >
        <Stack direction="row" align="center">
          <Text
            as={Center}
            color="gray.500"
            fontSize="sm"
            fontWeight="medium"
            lineHeight={5}
          >
            <Icon as={Calendar} mr={1} />
            {order.date}
          </Text>
          <Divider h={5} orientation="vertical" borderColor="gray.400" />
          <OrderCardText>{order.time}</OrderCardText>
        </Stack>
        <Button size="sm" variant="ghost" color="gray.500" h="auto" p={0}>
          <Icon as={Close} />
        </Button>
      </Flex>

      <Text fontWeight="normal">{order.title}</Text>

      <Divider
        w="full"
        borderColor="gray.400"
        display={{ base: 'block', sm: 'none' }}
      />

      <Flex align="center" justify="space-between">
        <Stack direction="row" align="center">
          <Show above="lg">
            <OrderCardText>{order.date}</OrderCardText>
            <Divider h={5} orientation="vertical" borderColor="gray.400" />
          </Show>
          <OrderCardText>
            {t('labels.adultWithCount', { count: order.adults })}
          </OrderCardText>
          <Divider h={5} orientation="vertical" borderColor="gray.400" />
          <OrderCardText>
            {t('labels.childWithCount', { count: order.childs })}
          </OrderCardText>
          <Hide above="lg">
            <Divider h={5} orientation="vertical" borderColor="gray.400" />
            <OrderCardText>{order.description}</OrderCardText>
          </Hide>
        </Stack>
        <Text fontWeight="medium">
          {t('format.intlCurrencyWithOptions', {
            val: order.price[SELECTED_CURRENCY],
            currency: SELECTED_CURRENCY,
          })}
        </Text>
      </Flex>
    </Flex>
  );
};

const CheckoutOrderSummary = ({ summary }: { summary: Order[] }) => {
  return (
    <Stack spacing={{ base: 2, sm: 4 }} px={{ base: 0, sm: 6 }}>
      {summary.map((order: Order) => (
        <Fragment key={`orderCheckout_${order.id}`}>
          <CheckoutOrderCard order={order} />
          <Divider
            w="full"
            borderColor="gray.400"
            display={{ base: 'none', sm: 'block' }}
          />
        </Fragment>
      ))}
    </Stack>
  );
};

const CheckoutTotal = ({
  total,
  isOpen,
  onToggle,
  ...rest
}: CheckoutTotalProps) => {
  const { t } = useTranslation('common');
  return (
    <Flex
      align="center"
      justify="space-between"
      bg="gray.100"
      w="full"
      px={4}
      py={5}
      borderTop="1px solid"
      borderColor="gray.400"
      {...rest}
    >
      <Box>
        <Text fontWeight="bold" fontSize="xl" lineHeight={7}>
          {t('format.intlCurrencyWithOptions', {
            val: total,
            currency: SELECTED_CURRENCY,
          })}
        </Text>
        <Text color="gray.500" fontWeight="normal">
          {t('checkout.summary.total')}
        </Text>
      </Box>
      <Button
        bg="gray.300"
        colorScheme="darkGray"
        onClick={onToggle}
        rightIcon={isOpen ? <Down /> : <Up />}
      >
        {t('checkout.summary.title')}
      </Button>
    </Flex>
  );
};

export const CheckoutSummaryMobile = ({
  summary,
  promoDiscount,
  setPromoDiscount,
}: CheckoutSummaryProps) => {
  const { t } = useTranslation('common');
  const { isOpen, onToggle } = useDisclosure();
  const total = calcTotal(summary);
  const discount = calcDiscount(total, promoDiscount);
  return (
    <>
      <Portal>
        <Slide direction="bottom" in={true}>
          <CheckoutTotal
            isOpen={isOpen}
            onToggle={onToggle}
            total={total - discount}
          />
        </Slide>
      </Portal>

      <Drawer isOpen={isOpen} placement="bottom" onClose={onToggle}>
        <DrawerOverlay />
        <DrawerContent borderRadius="lg">
          <DrawerHeader p={4} borderBottomWidth="1px" borderColor="gray.400">
            <Flex align="center" justify="space-between">
              <Text fontSize="xl" fontWeight="bold" color="gray.700">
                {t('checkout.summary.order')}
              </Text>
              <IconButton
                aria-label={t('checkout.summary.closeSummary')}
                onClick={onToggle}
                icon={<Down />}
              />
            </Flex>
          </DrawerHeader>

          <DrawerBody p={4} bg="gray.200">
            <CheckoutOrderSummary summary={summary} />
          </DrawerBody>

          <DrawerFooter
            p={4}
            bg="gray.100"
            flexDir="column"
            borderTop="1px solid"
            borderColor="gray.400"
          >
            <CheckoutPromo
              promoDiscount={promoDiscount}
              setPromoDiscount={setPromoDiscount}
            />
            <CheckoutTotal
              px={0}
              border="none"
              isOpen={isOpen}
              onToggle={onToggle}
              total={total - discount}
            />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export const CheckoutSummaryDesktop = ({
  summary,
  promoDiscount,
  setPromoDiscount,
}: CheckoutSummaryProps) => {
  const { t } = useTranslation('common');
  const total = calcTotal(summary);
  const discount = calcDiscount(total, promoDiscount);
  return (
    <Stack>
      <CheckoutPromo
        promoDiscount={promoDiscount}
        setPromoDiscount={setPromoDiscount}
      />

      <CheckoutBox as={Stack} spacing={6} py={6} px={0}>
        <Text fontWeight="bold" fontSize="xl" lineHeight={7} px={6}>
          {t('checkout.summary.title')}
        </Text>

        <CheckoutOrderSummary summary={summary} />

        {promoDiscount && (
          <>
            <Flex align="center" justify="space-between" px={6}>
              <Text fontWeight="normal">
                {`${t('checkout.promo')} -${promoDiscount.value}%`}
              </Text>
              <Text fontWeight="medium">
                {t('format.intlCurrencyWithOptions', {
                  val: discount,
                  currency: SELECTED_CURRENCY,
                })}
              </Text>
            </Flex>
            <Divider borderColor="gray.400" w="full" />
          </>
        )}

        <Flex align="center" justify="space-between" px={6}>
          <Text fontWeight="normal">{t('checkout.summary.total')}</Text>
          <Text fontWeight="bold" fontSize="2xl" lineHeight={8}>
            {t('format.intlCurrencyWithOptions', {
              val: total - discount,
              currency: SELECTED_CURRENCY,
            })}
          </Text>
        </Flex>
      </CheckoutBox>

      <CheckoutBox as={Flex} alignItems="center" py={2}>
        <Check fill="green" />
        <Select
          ml={3}
          defaultValue="24"
          fontSize="sm"
          variant="unstyled"
          borderColor="transparent"
        >
          <option value="24">{t('cartSummary.hoursFull')}</option>
          <option value="12">{t('cartSummary.hoursHalf')}</option>
        </Select>
      </CheckoutBox>

      <CheckoutBox as={Flex} alignItems="center" py={2}>
        <Check fill="green" />
        <Text ml={3} fontSize="sm">
          {t('cartSummary.years')}
        </Text>
      </CheckoutBox>

      <CheckoutBox as={Flex} alignItems="center" py={2}>
        <Lock fill="green" />
        <Text ml={3} fontSize="sm">
          {t('checkout.sslSecure')}
        </Text>
      </CheckoutBox>

      <CheckoutBox as={Flex} alignItems="center" py={2}>
        <BankCard fill="green" />
        <Text ml={3} fontSize="sm">
          {t('checkout.cardSafe')}
        </Text>
      </CheckoutBox>
    </Stack>
  );
};
