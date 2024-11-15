import { useEffect, useMemo, useState } from 'react';
import debounce from 'lodash/debounce';

import { Container } from '@chakra-ui/react';

import {
  City,
  Tour,
  fetchCitiesByQuery,
} from '@visit/ecomm-lib/shared/data-access';

import {
  BaseLayout,
  AllAttractions,
  HeroAttractions,
  TopAttractions,
} from '@visit/ecomm-lib/shared/ui';

interface AttractionsProps {
  cities: City[];
  tours: Tour[];
  tour: Tour;
}

export function Attractions({ cities, tours, tour }: AttractionsProps) {
  const [allCities, setAllCities] = useState<City[]>([]);
  const [attractionsQuery, setAttractionsQuery] = useState('');

  const debouncedSetAttractionsQuery = useMemo(
    () => debounce(setAttractionsQuery, 300),
    []
  );

  // Cleanup debounce handler
  useEffect(() => {
    return () => {
      debouncedSetAttractionsQuery.cancel();
    };
  }, [debouncedSetAttractionsQuery]);

  useEffect(() => {
    const fetchFilteredCities = async () => {
      const filteredCities = await fetchCitiesByQuery(attractionsQuery);
      setAllCities(filteredCities);
    };
    if (attractionsQuery === '') setAllCities(cities);
    else fetchFilteredCities().catch(console.error);
  }, [attractionsQuery, cities]);

  return (
    <BaseLayout cities={cities}>
      <Container
        minWidth="100%"
        maxWidth="100%"
        paddingX={{ base: 4, md: 40 }}
        paddingY={{ base: 12, md: 12 }}
      >
        <HeroAttractions tour={tour} />
      </Container>
      <Container
        minWidth="100%"
        maxWidth="100%"
        paddingX={{ base: 4, md: 14 }}
        paddingY={{ base: 12, md: 12 }}
      >
        Most Popular Tours Section
      </Container>
      <Container
        minWidth="100%"
        maxWidth="100%"
        overflow="hidden"
        background="gray.200"
        paddingStart={{ base: 4, md: 14 }}
        paddingEnd={{ base: 0, md: 0 }}
        paddingY={{ base: 12, md: 12 }}
      >
        <TopAttractions
          cities={cities}
          tours={tours}
          renderAttractionsBtn={false}
        />
      </Container>
      <Container
        minWidth="100%"
        maxWidth="100%"
        paddingX={{ base: 4, md: 14 }}
        paddingY={{ base: 12, md: 12 }}
      >
        <AllAttractions
          cities={allCities}
          setQuery={debouncedSetAttractionsQuery}
        />
      </Container>
    </BaseLayout>
  );
}

export default Attractions;
