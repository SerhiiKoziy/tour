import { useTranslation } from 'next-i18next';
import { Grid, GridItem, SimpleGrid, Text } from '@chakra-ui/react';
import { Carousel, TourCard } from '@visit/shared/ui';
import { Tour } from '@visit/ecomm-lib/shared/data-access';

export interface RecentSearchesProps {
  tours: Tour[];
}

const handleFavoriteClick = () => console.log('Favorite button');

export function RecentSearches({ tours }: RecentSearchesProps) {
  const { t } = useTranslation('common');
  const topThreeTours = tours.slice(0, 3);
  return (
    <Grid
      alignItems="start"
      gap={{ base: 9, sm: 4 }}
      templateColumns={{ base: '1fr', sm: 'repeat(4, 1fr)' }}
    >
      <GridItem pr={{ base: 4, sm: 0 }}>
        <Text
          color="gray.700"
          fontWeight="extrabold"
          lineHeight={{ base: 10 }}
          fontSize={{ base: 30, sm: 32 }}
        >
          {t('recentSearches.title')}
        </Text>
        <Text
          color="gray.500"
          fontWeight="normal"
          fontSize={{ base: 'md' }}
          lineHeight={{ base: 6 }}
        >
          {t('recentSearches.description')}
        </Text>
      </GridItem>

      <GridItem colSpan={3} display={{ base: 'none', sm: 'block' }}>
        <SimpleGrid spacing={4} columns={3}>
          {topThreeTours.map((tour) => (
            <TourCard
              key={`recentSearchesTour_${tour.id}`}
              tour={tour}
              onFavoriteClick={handleFavoriteClick}
            />
          ))}
        </SimpleGrid>
      </GridItem>

      <GridItem display={{ base: 'block', sm: 'none' }} overflow="hidden">
        <Carousel
          slides={{ perView: 1.175, spacing: 16 }}
          selector="mostPopularToursCarousel"
        >
          {topThreeTours.map((tour) => (
            <TourCard
              key={`recentSearchesTour_${tour.id}`}
              tour={tour}
              onFavoriteClick={handleFavoriteClick}
            />
          ))}
        </Carousel>
      </GridItem>
    </Grid>
  );
}

export default RecentSearches;
