import React from 'react';
import { useTranslation } from 'next-i18next';
import {
  Box,
  Center,
  Flex,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
  TextProps,
} from '@chakra-ui/react';
import { RightSmall } from '@icon-park/react';
import {
  AttractionCard,
  Button,
  ButtonProps,
  Carousel,
  TourCard,
} from '@visit/shared/ui';
import { City, Tour } from '@visit/ecomm-lib/shared/data-access';

export interface TopAttractionsProps {
  tours: Tour[];
  cities: City[];
  renderAttractionsBtn?: boolean;
}

interface PopularAttractionsProps {
  cities: City[];
}

interface AttractionLabelsProps extends TextProps {
  children: JSX.Element;
}

const handleFavoriteClick = () => console.log('Favorite button');

const AllAttractionsButton = ({ children, ...rest }: ButtonProps) => (
  <Button
    w="full"
    size="lg"
    fontSize="md"
    variant="outline"
    colorScheme="primary"
    {...rest}
  >
    {children}
  </Button>
);

const TopAttractionsTitle = ({ children, ...rest }: AttractionLabelsProps) => (
  <Text
    color="gray.700"
    fontWeight="extrabold"
    lineHeight={{ base: 10 }}
    fontSize={{ base: 30, sm: 32 }}
    {...rest}
  >
    {children}
  </Text>
);

const TopAttractionsSub = ({ children, ...rest }: AttractionLabelsProps) => (
  <Text
    color="gray.500"
    fontWeight="medium"
    fontSize={{ base: 'md' }}
    lineHeight={{ base: 5 }}
    textTransform="uppercase"
    {...rest}
  >
    {children}
  </Text>
);

export function TopAttractions({
  tours,
  cities,
  renderAttractionsBtn = true,
}: TopAttractionsProps) {
  const { t } = useTranslation('common');
  const topThreeCities = cities.slice(0, 3);

  return (
    <>
      <Center mb={7} pr={{ base: 0, sm: 14 }}>
        <Stack direction="column" spacing={0} justify="center">
          <TopAttractionsSub>
            {t('topAttractions.thingsMustSee')}
          </TopAttractionsSub>
          <TopAttractionsTitle>{t('topAttractions.title')}</TopAttractionsTitle>
        </Stack>
        <Spacer />
        {renderAttractionsBtn && (
          <Flex display={{ base: 'none', sm: 'flex' }}>
            <AllAttractionsButton rightIcon={<RightSmall />}>
              {t('topAttractions.allAttractions')}
            </AllAttractionsButton>
          </Flex>
        )}
      </Center>
      <Box w={{ base: 'auto', sm: '100vw' }}>
        <SimpleGrid
          rowGap={8}
          columnGap={4}
          alignItems="start"
          templateColumns="1.35fr repeat(3, 1fr)"
          display={{ base: 'none', sm: 'grid' }}
        >
          {topThreeCities.map((city) => (
            <React.Fragment key={`topAttractionsCity_${city.city}`}>
              <AttractionCard attraction={city} />
              {tours.slice(0, 3).map((tour) => (
                <TourCard
                  key={`topAttractionsTour_${tour.id}`}
                  tour={tour}
                  onFavoriteClick={handleFavoriteClick}
                />
              ))}
            </React.Fragment>
          ))}
        </SimpleGrid>
        <SimpleGrid
          spacing={4}
          columns={1}
          display={{ base: 'grid', sm: 'none' }}
        >
          {topThreeCities.map((city) => (
            <React.Fragment key={`topAttractionsCity_${city.city}`}>
              <AttractionCard attraction={city} mr={4} />
              <Carousel
                loop
                slides={{ perView: 1.175, spacing: 16 }}
                selector="mostPopularToursCarousel"
              >
                {tours.slice(0, 3).map((tour) => (
                  <TourCard
                    key={`topAttractionsTour_${tour.id}`}
                    tour={tour}
                    onFavoriteClick={handleFavoriteClick}
                    mb={4}
                  />
                ))}
              </Carousel>
            </React.Fragment>
          ))}
        </SimpleGrid>
      </Box>
      {renderAttractionsBtn && (
        <Flex w="full" pr={4} mt={6} display={{ base: 'flex', sm: 'none' }}>
          <AllAttractionsButton>
            {t('topAttractions.allAttractions')}
          </AllAttractionsButton>
        </Flex>
      )}
    </>
  );
}

export function PopularAttractions({ cities }: PopularAttractionsProps) {
  const ATTRACTIONS_TO_SHOW = 6;
  const { t } = useTranslation('common');

  const slicedCities = cities?.slice(0, ATTRACTIONS_TO_SHOW);
  return (
    <Stack spacing={6}>
      <Center>
        <Stack direction="column" spacing={0} justify="center" flexGrow={1}>
          <TopAttractionsSub>
            {t('topAttractions.thingsMustSee')}
          </TopAttractionsSub>
          <TopAttractionsTitle fontSize="2xl" lineHeight={8}>
            {t('popularAttractions.title')}
          </TopAttractionsTitle>
        </Stack>
        <Flex>
          <AllAttractionsButton>
            {t('popularAttractions.seeAllAttractions')}
          </AllAttractionsButton>
        </Flex>
      </Center>
      <SimpleGrid columns={3} spacing={4}>
        {slicedCities?.map((city) => (
          <AttractionCard
            key={`popularAttractionsCity_${city.city}`}
            attraction={city}
            minH={48}
          />
        ))}
      </SimpleGrid>
    </Stack>
  );
}

export default TopAttractions;
