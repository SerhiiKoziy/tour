import {
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Box,
  Flex,
  Stack,
  Text,
  Divider,
  Image,
  HStack,
  Center,
  useToken,
} from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import {
  MyAccountDetails,
  OrderHistory,
  TourAccount,
  Voucher,
} from '@visit/ecomm-lib/shared/data-access';
import Button from '../button/button';
import OrderCancelled from '../icons/General/OrderCancelled';
import Check from '../icons/General/Check';
import AccountDetailsForm from '../account-details-form/account-details-form';
import { VoucherListWrapper } from '../voucher-list/voucher-list';

interface CardOrderHistoryProps {
  status: string;
  order: number;
  date: string;
  price: number;
  tours: TourAccount[];
}

const CardOrderHistory = ({
  status,
  order,
  date,
  tours,
  price,
}: CardOrderHistoryProps) => {
  const { t } = useTranslation('common');
  const [green800, gray500] = useToken('colors', ['green.800', 'gray.500']);

  const numberOrder = `${t('account.order')} #${order}`;
  const numberTours = tours?.length;
  const countTours = t('account.toursCount', { count: numberTours });
  const totalPrice = t('format.intlCurrencyWithOptions', {
    val: price,
    currency: 'USD',
  });

  const categoryCard = (status: string) => {
    if (status === 'Complete Order') {
      return (
        <Button colorScheme="primary" variant="gradient">
          {status}
        </Button>
      );
    }

    if (status === 'Completed') {
      return (
        <HStack
          borderRadius="lg"
          bg="green.100"
          alignItems="center"
          h="10"
          px="3"
        >
          <Check fill={green800} />
          <Text color="green.600">{status}</Text>
        </HStack>
      );
    }

    if (status === 'Cancelled') {
      return (
        <HStack
          borderRadius="lg"
          bg="gray.300"
          alignItems="center"
          h="10"
          px="3"
        >
          <OrderCancelled stroke={gray500} />
          <Text color="gray.500">{status}</Text>
        </HStack>
      );
    }

    return status;
  };

  const isCategoryCard = categoryCard(status);

  return (
    <Box
      borderRadius="lg"
      borderColor="gray.400"
      borderWidth="1px"
      p="4"
      bg="gray.100"
    >
      <Flex justifyContent="space-between" pb="2">
        <Box>
          <Text fontWeight="bold" fontSize="xl" lineHeight="7">
            {numberOrder}
          </Text>
          <HStack spacing="2" h="5">
            <Text
              color="gray.500"
              fontSize={{ base: 'sm', lg: 'lg' }}
              lineHeight={{ base: 'shorter', lg: 'short' }}
            >
              {countTours}
            </Text>
            <Divider
              orientation="vertical"
              opacity="1"
              borderColor="gray.400"
            />
            <Text
              color="gray.500"
              fontSize={{ base: 'sm', lg: 'lg' }}
              lineHeight={{ base: 'shorter', lg: 'short' }}
            >
              {date}
            </Text>
          </HStack>
        </Box>
        {isCategoryCard}
      </Flex>
      <Flex justifyContent="space-between" alignItems="flex-end">
        <HStack spacing={{ base: '1', lg: '2' }}>
          {tours?.map((tour) => (
            <Image
              key={tour.id}
              src={tour.src}
              alt={tour.name}
              borderRadius="lg"
              w={{ base: '10', lg: '16' }}
              h={{ base: '10', lg: '16' }}
            />
          ))}
        </HStack>
        <Text fontWeight="bold" fontSize="xl" lineHeight="7">
          {totalPrice}
        </Text>
      </Flex>
    </Box>
  );
};

interface TabWrapperProps {
  title: string;
  children?: React.ReactNode;
}

const TabWrapper = ({ title, children }: TabWrapperProps) => (
  <Center>
    <Tab
      minW="max-content"
      _selected={{
        color: 'gray.700',
        borderColor: 'gray.700',
      }}
      color="gray.500"
      paddingInlineStart="0"
      paddingInlineEnd="0"
    >
      {title}
      {children}
    </Tab>
  </Center>
);

interface DontHaveWrapperProps {
  text: string;
  btnTitle?: string;
  showBtn?: boolean;
}

const DontHaveWrapper = ({
  text,
  showBtn = false,
  btnTitle,
}: DontHaveWrapperProps) => {
  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      h="80"
    >
      <Text color="gray.500">{text}</Text>
      {showBtn && (
        <Button mt="4" variant="gradient" size="lg">
          {btnTitle}
        </Button>
      )}
    </Flex>
  );
};

interface TabsContainerProps {
  orderHistory: OrderHistory[];
  myAccountDetails: MyAccountDetails;
  vouchers: Voucher[];
}

const TabsContainer = ({
  orderHistory,
  myAccountDetails,
  vouchers,
}: TabsContainerProps) => {
  const { t } = useTranslation('common');

  const countOrderHistory = orderHistory?.length;
  const countUpcomingTours = vouchers?.length;
  const titleOrderHistory = `${t(
    'account.orderHistory.title'
  )} (${countOrderHistory})`;

  return (
    <Tabs>
      <TabList
        borderColor="gray.400"
        overflowX="scroll"
        overflowY="hidden"
        pb="0.5"
        sx={{
          '::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        <HStack spacing="6">
          <TabWrapper title={t('account.upcomingTours.title')}>
            {countUpcomingTours > 0 && (
              <Center
                w="6"
                h="6"
                bg="primary.500"
                borderRadius="base"
                color="gray.100"
                fontSize="xs"
                ml="2"
              >
                {countUpcomingTours}
              </Center>
            )}
          </TabWrapper>
          <TabWrapper title={titleOrderHistory} />
          <TabWrapper title={t('account.accountDetails.title')} />
          <TabWrapper title={t('account.giftCards')} />
        </HStack>
      </TabList>

      <TabPanels>
        <TabPanel p="0" mt="6">
          {countUpcomingTours ? (
            <VoucherListWrapper vouchers={vouchers} />
          ) : (
            <DontHaveWrapper
              text={t('account.upcomingTours.youDontHaveTours')}
              showBtn={true}
              btnTitle={t('account.upcomingTours.seeAll')}
            />
          )}
        </TabPanel>

        <TabPanel p="0" mt="6">
          {countOrderHistory ? (
            <Stack spacing={{ base: '2', lg: '4' }}>
              {orderHistory.map((card) => (
                <CardOrderHistory
                  key={card.id}
                  order={card.order}
                  tours={card.tours}
                  date={card.date}
                  status={card.status}
                  price={card.price}
                />
              ))}
            </Stack>
          ) : (
            <DontHaveWrapper
              text={t('account.orderHistory.youDontHaveTours')}
            />
          )}
        </TabPanel>

        <TabPanel p="0" mt="6">
          <AccountDetailsForm myAccountDetails={myAccountDetails} />
        </TabPanel>

        <TabPanel>{4}</TabPanel>
      </TabPanels>
    </Tabs>
  );
};

interface AccountWrapperProps {
  orderHistory: OrderHistory[];
  myAccountDetails: MyAccountDetails;
  vouchers: Voucher[];
}

export function AccountWrapper({
  orderHistory,
  myAccountDetails,
  vouchers,
}: AccountWrapperProps) {
  const { t } = useTranslation('common');

  return (
    <>
      <Heading as="h2" fontWeight="extrabold" fontSize="3xl" lineHeight="10">
        {t('account.title')}
      </Heading>
      <TabsContainer
        orderHistory={orderHistory}
        myAccountDetails={myAccountDetails}
        vouchers={vouchers}
      />
    </>
  );
}

export default AccountWrapper;
