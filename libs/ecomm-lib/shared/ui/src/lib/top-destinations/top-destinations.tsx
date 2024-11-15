import { useTranslation } from 'next-i18next';
import { Box, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { City } from '@visit/ecomm-lib/shared/data-access';
import { DestinationAllCard, DestinationCard } from '@visit/shared/ui';

interface TopDestinationsProps {
  cities: City[];
  variant?: 'normal' | 'compact';
}

const DESTINATIONS_TO_SHOW = 7;

export function TopDestinations({
  cities = [],
  variant = 'normal',
}: TopDestinationsProps) {
  const { t } = useTranslation('common');

  const slicedCities = cities.slice(0, DESTINATIONS_TO_SHOW);
  const remainingCities = cities.slice(DESTINATIONS_TO_SHOW, cities.length);

  return (
    <Box>
      <Stack direction="column" spacing={0} mb={6}>
        <Text
          color="gray.500"
          fontWeight="normal"
          fontSize={{ base: 'md' }}
          lineHeight={{ base: 5 }}
          textTransform="uppercase"
        >
          {t('topDestinations.experienceTheWorld')}
        </Text>
        <Text
          color="gray.700"
          fontWeight="extrabold"
          lineHeight={{ base: 10 }}
          fontSize={{ base: 30, sm: variant === 'compact' ? '2xl' : 32 }}
        >
          {t('topDestinations.title')}
        </Text>
      </Stack>
      <SimpleGrid
        columns={{ base: 2, sm: 4 }}
        spacing={{ base: 4, sm: 4 }}
        alignItems="start"
      >
        {slicedCities.map((city) => (
          <DestinationCard
            variant={variant}
            destination={city}
            key={`topDestinations_${city.city}`}
          />
        ))}
        {Boolean(remainingCities.length) && (
          <DestinationAllCard
            variant={variant}
            total={remainingCities.length}
          />
        )}
      </SimpleGrid>
    </Box>
  );
}

export default TopDestinations;
