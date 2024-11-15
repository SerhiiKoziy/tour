import { useTranslation } from 'next-i18next';
import groupBy from 'lodash/groupBy';

import {
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Spacer,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useToken,
} from '@chakra-ui/react';
import { Search } from '@icon-park/react';
import { AttractionCard, Italy } from '@visit/shared/ui';
import {
  City,
  Attraction,
  fetchAttractionsByCity,
} from '@visit/ecomm-lib/shared/data-access';
import { useEffect, useState } from 'react';

interface AllAttractionsProps {
  cities: City[];
  setQuery: (query: string) => void;
}

interface CountryAttractionsProps {
  country: string;
  cities: City[];
}

const CityAttractions = ({ city }: { city: City }) => {
  const [attractions, setAttractions] = useState<Attraction[]>([]);

  // Defer rendering of each tab until that tab is selected to avoid heavy load
  useEffect(() => {
    const fetchFilteredAttractions = async () => {
      const filteredAttractions = await fetchAttractionsByCity(city.city);

      setAttractions(filteredAttractions);
    };

    fetchFilteredAttractions().catch(console.error);
  }, [city]);

  return (
    <SimpleGrid columns={{ base: 1, sm: 3 }} gap={4}>
      {attractions.map((attraction) => (
        <AttractionCard
          key={`allAttractionsCard_${city.city}_${attraction.title}`}
          attraction={attraction}
          minH={52}
        />
      ))}
    </SimpleGrid>
  );
};

const CountryAttractions = ({ country, cities }: CountryAttractionsProps) => {
  return (
    <Stack spacing={0}>
      <Text
        bg="gray.100"
        color="gray.700"
        fontWeight="bold"
        lineHeight={{ base: 8 }}
        fontSize={{ base: '2xl', sm: '2xl' }}
        position={{ base: 'sticky', sm: 'initial' }}
        pt={{ base: 4, sm: 0 }}
        zIndex={5}
        top={0}
      >
        <Icon as={Italy} verticalAlign="middle" mr={2} />
        {country}
      </Text>
      <Tabs isLazy>
        <TabList
          bg="gray.100"
          flexWrap="nowrap"
          overflowX="auto"
          overflowY="hidden"
          css={{
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
          position={{ base: 'sticky', sm: 'initial' }}
          zIndex={3}
          top={12}
        >
          {cities.map((city) => (
            <Tab key={`attractionsTab_${country}_${city.city}`} flex="0 0 auto">
              <Text whiteSpace="nowrap">{city.city}</Text>
              <Text ml={2} color="gray.500">
                (8)
              </Text>
            </Tab>
          ))}
        </TabList>

        <Flex
          h={4}
          bg="gray.100"
          display={{ base: 'flex', sm: 'none' }}
          position={{ base: 'sticky', sm: 'initial' }}
          zIndex={3}
          top={24}
        />

        <TabPanels>
          {cities.map((city) => (
            <TabPanel key={`attractionsPanel_${country}_${city.city}`} pb={0}>
              <CityAttractions city={city} />
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Stack>
  );
};

export function AllAttractions({ cities = [], setQuery }: AllAttractionsProps) {
  const { t } = useTranslation('common');
  const [gray500] = useToken('colors', ['gray.500']);

  const countries = groupBy(cities, 'country');
  const allCountries = Object.entries(countries);

  return (
    <Stack spacing={5}>
      <Flex
        gap={6}
        alignItems={{ base: 'start', sm: 'center' }}
        direction={{ base: 'column', sm: 'row' }}
      >
        <Stack direction="column" spacing={0} justify="center">
          <Text
            color="gray.500"
            fontWeight="semibold"
            fontSize={{ base: 'md' }}
            lineHeight={{ base: 5 }}
            textTransform="uppercase"
          >
            {`234 ${t('topAttractions.activitiesWorld')}`}
          </Text>
          <Text
            color="gray.700"
            fontWeight="extrabold"
            lineHeight={{ base: 10 }}
            fontSize={{ base: 30, sm: 32 }}
          >
            {t('topAttractions.allAttractions')}
          </Text>
        </Stack>
        <Spacer display={{ base: 'none', sm: 'block' }} />
        <Flex w={{ base: 'full', sm: 'auto' }}>
          <InputGroup size="lg">
            <InputLeftElement
              pointerEvents="none"
              children={<Search size="18" fill={gray500} />}
            />
            <Input
              placeholder={t('search.sidebar.search')}
              fontSize="md"
              onChange={(e) => setQuery(e.target.value)}
            />
          </InputGroup>
        </Flex>
      </Flex>
      <Stack spacing={12}>
        {allCountries.map(([country, cities]) => (
          <CountryAttractions
            key={`allAttractions_${country}`}
            country={country}
            cities={cities}
          />
        ))}
      </Stack>
    </Stack>
  );
}

export default AllAttractions;
