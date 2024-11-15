import { Flex, Link, Box, Heading, Grid } from '@chakra-ui/react';
import { City } from '@visit/ecomm-lib/shared/data-access';
import { useTranslation } from 'next-i18next';
import { default as NextLink } from 'next/link';

export interface MostPopularCitiesProps {
  cities: City[];
}

// TODO the width can be a fixed value coming from a scss/theme file
// TODO we can use the CSS minmax function to determine what value to use
// TODO we can use this grid-auto-columns: minmax(max-content, 200px); to set a max width to avoid a grid with too many space between cities/items
export function MostPopularCities({ cities = [] }: MostPopularCitiesProps) {
  const { t } = useTranslation('common');

  return (
    <Flex direction={{ base: 'column', xl: 'row' }} bg="gray.100">
      <Box paddingBottom={{ base: 6, xl: 0 }}>
        <Heading
          as="h2"
          size="lg"
          paddingBottom={2}
          width={{ md: 'max-content' }}
        >
          {t('mostPopularCities.title')}
        </Heading>
        <Box color="gray.500">
          {t('mostPopularCities.checkoutPopularCities')}
        </Box>
      </Box>
      <Grid
        autoFlow="column"
        templateRows={{ base: 'repeat(9, 1fr)', md: 'repeat(6, 1fr)' }}
        width="100%"
        paddingStart={{ xl: 32 }}
      >
        {cities.map((city) => (
          <Box key={city.name} paddingBottom="3">
            <NextLink href={city.tagId} passHref>
              <Link color="primary.500">{city.name}</Link>
            </NextLink>
          </Box>
        ))}
      </Grid>
    </Flex>
  );
}

export default MostPopularCities;
