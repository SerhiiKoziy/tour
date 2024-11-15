import {
  City,
  fetchCities,
  fetchMostPopularTours,
  fetchTopDestinations,
  fetchTours,
  Tour,
  wrapper,
} from '@visit/ecomm-lib/shared/data-access';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from '../next-i18next.config';
import { Home } from '@visit/ecomm-lib/feature';

export const getServerSideProps = wrapper.getServerSideProps(
  (_store) =>
    async ({ locale }) => {
      // TODO This call could be in the staticProps with incremental regeneration, but we can not use
      // staticProps + serverProps at the same time for now, but there is a work in progress in NextJS
      // to enable this feature

      // This info should be in a Provider
      const [cities, tours, mostPopularTours, topDestinations] =
        await Promise.all([
          fetchCities(),
          fetchTours(),
          fetchMostPopularTours(),
          fetchTopDestinations(),
        ]);

      return {
        props: {
          cities,
          tours,
          mostPopularTours,
          topDestinations: JSON.parse(JSON.stringify(topDestinations)),
          ...(await serverSideTranslations(
            locale,
            ['common', 'footer'],
            i18nConfig
          )),
        },
      };
    }
);

interface IndexProps {
  cities: City[];
  tours: Tour[];
  mostPopularTours: Tour[];
  topDestinations: City[];
}

export function Index({
  cities,
  tours,
  mostPopularTours,
  topDestinations,
}: IndexProps) {
  return (
    <Home
      cities={cities}
      tours={tours}
      mostPopularTours={mostPopularTours}
      topDestinations={topDestinations}
    />
  );
}

export default Index;
