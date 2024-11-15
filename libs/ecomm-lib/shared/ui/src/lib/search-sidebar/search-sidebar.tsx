import { Value } from 'react-multi-date-picker';
import { useTranslation } from 'next-i18next';
import _ from 'lodash';

import {
  Box,
  Flex,
  Input,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Hide,
  Show,
  Stack,
  Text,
  BoxProps,
  useDisclosure,
  IconButton,
  HStack,
  Spacer,
} from '@chakra-ui/react';
import { LeftSmall } from '@icon-park/react';
import {
  Button,
  Filter,
  Guests,
  Minus,
  Plus,
  RegularDatePicker,
} from '@visit/shared/ui';
import { City, Tour } from '@visit/ecomm-lib/shared/data-access';
import TimeControl from './time-control';
import PriceControl, { SearchPriceProps } from './price-control';
import DaysControlFilter from './days-control';
import DurationControl from './duration-control';
import DestinationsControlFilter from './destinations-control';
import AttractionsControlFilter, { Attractions } from './attractions-control';

interface SearchSidebarProps extends BoxProps {
  children: React.ReactNode;
}

interface SearchTourDateProps {
  tourDate: Value;
  setTourDate: (date: Value) => void;
  plusDays: string;
  setPlusDays: (days: string) => void;
}
interface SearchGuestsProps {
  guests: number;
  setGuests: (guests: (prev: number) => number) => void;
}

interface SearchDestinationsProps {
  cities: City[];
  city: string;
  setCity: (city: string) => void;
  setQuery: (query: string) => void;
}

interface SearchAttractionsProps {
  tours: Tour[];
  city: string;
  attraction: string;
  setAttraction: (attraction: string) => void;
  setQuery: (query: string) => void;
}

interface SearchTimeProps {
  time: string[];
  setTime: (time: string[]) => void;
}

interface SearchDurationProps {
  duration: string[];
  setDuration: (duration: string[]) => void;
}

export const SearchSidebarDesktop = ({
  children,
  ...rest
}: SearchSidebarProps) => {
  return (
    <Show above="lg">
      <Stack spacing={2} w={80} mt={-14} overflow="hidden" {...rest}>
        {children}
      </Stack>
    </Show>
  );
};

export const SearchSidebarMobile = ({ children }: SearchSidebarProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation('common');
  return (
    <>
      <Button
        flexGrow={1}
        size="lg"
        fontSize="md"
        variant="outline"
        colorScheme="gray"
        leftIcon={Filter}
        onClick={onOpen}
      >
        {t('search.sidebar.filters')}
      </Button>
      <Hide above="lg">
        <Drawer isOpen={isOpen} size="full" placement="left" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader
              py={2}
              px={4}
              borderBottomWidth="1px"
              borderColor="gray.400"
            >
              <HStack align="center">
                <IconButton
                  aria-label="Close Search Filters"
                  onClick={onClose}
                  icon={<LeftSmall />}
                />
                <Stack spacing={0}>
                  <Text fontSize="xl" fontWeight="bold" color="gray.700">
                    {t('search.sidebar.filters')}
                  </Text>
                  <Text fontSize="sm" fontWeight="normal" color="gray.500">
                    {`432 ${t('search.sidebar.toursFound')}`}
                  </Text>
                </Stack>
              </HStack>
            </DrawerHeader>

            <DrawerBody p={4} bg="gray.200">
              <Stack>{children}</Stack>
            </DrawerBody>

            <DrawerFooter
              p={4}
              gap={4}
              borderTopWidth="1px"
              borderColor="gray.400"
            >
              <Button
                size="lg"
                flexGrow={1}
                fontSize="md"
                variant="outline"
                colorScheme="gray"
                onClick={onClose}
              >
                {t('search.sidebar.clear')}
              </Button>
              <Button
                size="lg"
                flexGrow={1}
                fontSize="md"
                variant="gradient"
                onClick={onClose}
              >
                {t('search.sidebar.apply')}
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Hide>
    </>
  );
};

export const SearchFilterTitle = ({
  children,
  ...rest
}: SearchSidebarProps) => (
  <Text
    fontSize="sm"
    fontWeight="medium"
    lineHeight={5}
    color="gray.500"
    textTransform="uppercase"
    {...rest}
  >
    {children}
  </Text>
);

export const SearchResetControl = ({ ...rest }) => {
  const { t } = useTranslation('common');

  return (
    <Button
      p={0}
      fontSize="sm"
      variant="link"
      colorScheme="primary"
      textTransform="uppercase"
      _hover={{ textDecoration: 'none' }}
      {...rest}
    >
      {t('search.sidebar.reset')}
    </Button>
  );
};

export const SearchCardContainer = ({
  children,
  ...rest
}: SearchSidebarProps) => {
  return (
    <Box
      p={4}
      bg="white"
      overflow="hidden"
      borderRadius="xl"
      border="1px solid"
      borderColor="gray.400"
      {...rest}
    >
      {children}
    </Box>
  );
};

export const SearchDefaultFilter = () => (
  <SearchCardContainer>
    <Stack spacing={4}>
      <SearchFilterTitle>Filter Title</SearchFilterTitle>
      <RegularDatePicker initialDate={new Date()} />
      <Text fontSize="md" fontWeight="normal" lineHeight={5} color="gray.700">
        Some other filter content
      </Text>
    </Stack>
  </SearchCardContainer>
);

export const SearchTourDate = ({
  tourDate,
  plusDays,
  setTourDate,
  setPlusDays,
}: SearchTourDateProps) => {
  const { t } = useTranslation('common');

  return (
    <SearchCardContainer>
      <Stack spacing={4}>
        <SearchFilterTitle>
          {t('search.sidebar.tourDate.title')}
        </SearchFilterTitle>
        <Stack spacing={2}>
          <RegularDatePicker initialDate={tourDate} setDate={setTourDate} />
          <DaysControlFilter days={plusDays} setDays={setPlusDays} />
        </Stack>
      </Stack>
    </SearchCardContainer>
  );
};

export const SearchGuests = ({ guests, setGuests }: SearchGuestsProps) => {
  const { t } = useTranslation('common');

  return (
    <SearchCardContainer>
      <Stack spacing={4}>
        <SearchFilterTitle>
          {t('search.sidebar.guests.title')}
        </SearchFilterTitle>
        <HStack>
          <Guests />
          <Text>{t('search.sidebar.guests.adults')}</Text>
          <Spacer />
          <HStack spacing={4}>
            <Button
              colorScheme="darkGray"
              aria-label="guestsMinus"
              bg="gray.300"
              leftIcon={Minus}
              onClick={() =>
                setGuests((prev: number) => (prev === 0 ? prev : prev - 1))
              }
            />
            <Text fontSize="sm">{guests}</Text>
            <Button
              colorScheme="darkGray"
              aria-label="guestsPlus"
              bg="gray.300"
              leftIcon={Plus}
              onClick={() => setGuests((prev: number) => prev + 1)}
            />
          </HStack>
        </HStack>
      </Stack>
    </SearchCardContainer>
  );
};

export const SearchDestinations = ({
  cities = [],
  city,
  setCity,
  setQuery,
}: SearchDestinationsProps) => {
  const { t } = useTranslation('common');
  const countries = _.groupBy(cities, 'country');

  return (
    <SearchCardContainer p={0}>
      <Stack px={4} my={4}>
        <SearchFilterTitle>
          {t('search.sidebar.destinations.title')}
        </SearchFilterTitle>
        <Input
          placeholder={t('search.sidebar.search')}
          onChange={(e) => setQuery(e.target.value)}
        />
      </Stack>
      <DestinationsControlFilter
        countries={countries}
        city={city}
        setCity={setCity}
      />
    </SearchCardContainer>
  );
};

export const SearchAttractions = ({
  tours = [],
  city,
  attraction,
  setAttraction,
  setQuery,
}: SearchAttractionsProps) => {
  const { t } = useTranslation('common');

  const attractions = tours.reduce((attractions: Attractions, tour: Tour) => {
    tour.attractions.forEach((attr: string) => {
      const toursByAttr = attractions[attr] || (attractions[attr] = []);
      toursByAttr.push(tour);
    });
    return attractions;
  }, {});

  return (
    <SearchCardContainer p={0}>
      <Stack px={4} my={4}>
        <SearchFilterTitle>
          {`${t('search.sidebar.attractions.title')}${
            city ? ` ${t('search.sidebar.attractions.in')} ${city}` : ''
          }`}
        </SearchFilterTitle>
        <Input
          placeholder={t('search.sidebar.search')}
          onChange={(e) => setQuery(e.target.value)}
        />
      </Stack>
      <AttractionsControlFilter
        city={city}
        attractions={attractions}
        attraction={attraction}
        setAttraction={setAttraction}
      />
    </SearchCardContainer>
  );
};

export const SearchTime = ({ time, setTime }: SearchTimeProps) => {
  const { t } = useTranslation('common');

  return (
    <SearchCardContainer>
      <Stack spacing={4}>
        <Flex justifyContent="space-between">
          <SearchFilterTitle>
            {t('search.sidebar.time.title')}
          </SearchFilterTitle>
          <SearchResetControl
            isDisabled={Boolean(!time.length)}
            onClick={() => setTime([])}
          />
        </Flex>
        <TimeControl time={time} setTime={setTime} />
      </Stack>
    </SearchCardContainer>
  );
};

export const SearchDuration = ({
  duration,
  setDuration,
}: SearchDurationProps) => {
  const { t } = useTranslation('common');

  return (
    <SearchCardContainer>
      <Stack spacing={4}>
        <SearchFilterTitle>
          {t('search.sidebar.duration.title')}
        </SearchFilterTitle>
        <DurationControl duration={duration} setDuration={setDuration} />
      </Stack>
    </SearchCardContainer>
  );
};

export const SearchPrice = ({ data, price, setPrice }: SearchPriceProps) => {
  const { t } = useTranslation('common');

  return (
    <SearchCardContainer>
      <Stack spacing={4}>
        <Flex justifyContent="space-between">
          <SearchFilterTitle>
            {t('search.sidebar.price.title')}
          </SearchFilterTitle>
          <SearchResetControl onClick={() => setPrice([0, 5])} />
        </Flex>
        <PriceControl data={data} price={price} setPrice={setPrice} />
      </Stack>
    </SearchCardContainer>
  );
};

export default SearchSidebarDesktop;
