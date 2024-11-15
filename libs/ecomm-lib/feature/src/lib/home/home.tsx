import { useContext, useEffect, useState } from 'react';
import {
  City,
  Tour,
  getToursFromStorage,
} from '@visit/ecomm-lib/shared/data-access';
import {
  AboutUs,
  BaseLayout,
  GeneralContext,
  GeneralContextType,
  MentionsInPress,
  MostPopularTours,
  RecentSearches,
  TopAttractions,
  TopDestinations,
  UniqueExperience,
} from '@visit/ecomm-lib/shared/ui';
import { Container } from '@chakra-ui/react';
import { Hero } from '@visit/shared/ui';

interface HomeProps {
  cities: City[];
  tours: Tour[];
  mostPopularTours: Tour[];
  topDestinations: City[];
}

export function Home({
  cities,
  tours,
  mostPopularTours,
  topDestinations,
}: HomeProps) {
  const [recentSearchTours, setRecentSearchTours] = useState<Tour[]>([]);

  const { isLogged } = useContext<GeneralContextType>(GeneralContext);

  useEffect(() => {
    if (isLogged) setRecentSearchTours(tours);
    else setRecentSearchTours(getToursFromStorage());
  }, [tours, isLogged]);

  return (
    <BaseLayout cities={cities}>
      <Container
        minWidth="100%"
        maxWidth="100%"
        paddingX={0}
        paddingBottom={{ base: '12', md: '12' }}
        backgroundColor="gray.200"
      >
        <Hero />
      </Container>
      <Container
        minWidth="100%"
        maxWidth="100%"
        paddingX={{ base: '4', md: '14' }}
        paddingY={{ base: '12', md: '12' }}
        background="gray.200"
      >
        <MentionsInPress />
      </Container>
      {Boolean(recentSearchTours.length) && (
        <Container
          minWidth="100%"
          maxWidth="100%"
          paddingStart={{ base: '4', md: '14' }}
          paddingEnd={{ base: '0', md: '14' }}
          paddingY={{ base: '12', md: '12' }}
          background="gray.200"
        >
          <RecentSearches tours={recentSearchTours} />
        </Container>
      )}
      <Container
        minWidth="100%"
        maxWidth="100%"
        paddingStart={{ base: '4', md: '14' }}
        paddingEnd={{ base: '0', md: '0' }}
        paddingY={{ base: '12', md: '12' }}
        background="gray.200"
      >
        <MostPopularTours tours={mostPopularTours} />
      </Container>
      <Container
        minWidth="100%"
        maxWidth="100%"
        paddingX={{ base: '4', md: '40' }}
        paddingY={{ base: '12', md: '12' }}
      >
        <AboutUs />
      </Container>
      <Container
        minWidth="100%"
        maxWidth="100%"
        paddingX={{ base: '4', md: '40' }}
        paddingY={{ base: '12', md: '12' }}
      >
        <TopDestinations cities={topDestinations} />
      </Container>
      <Container
        minWidth="100%"
        maxWidth="100%"
        paddingX={{ base: '4', md: '40' }}
        paddingY={{ base: '12', md: '12' }}
      >
        <div>
          See What Our Customer Say About Us Destinations section will be here
          soon
        </div>
      </Container>
      <Container
        minWidth="100%"
        maxWidth="100%"
        paddingStart={{ base: '4', md: '14' }}
        paddingEnd={{ base: '0', md: '0' }}
        paddingY={{ base: '12', md: '12' }}
        background="gray.200"
        overflow="hidden"
      >
        <TopAttractions cities={cities} tours={tours} />
      </Container>
      <Container
        minWidth="100%"
        maxWidth="100%"
        paddingX={{ base: '4', md: '40' }}
        paddingY={{ base: '12', md: '12' }}
      >
        <UniqueExperience />
      </Container>
    </BaseLayout>
  );
}

export default Home;
