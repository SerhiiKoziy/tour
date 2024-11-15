import {
  City,
  fetchTours,
  fetchTourById,
  Tour,
  wrapper,
  fetchCities,
} from '@visit/ecomm-lib/shared/data-access';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from '../../next-i18next.config';
import { Attractions as AttractionsView } from '@visit/ecomm-lib/feature';

export const getServerSideProps = wrapper.getServerSideProps(
  (_store) =>
    async ({ locale }) => {
      // TODO This call could be in the staticProps with incremental regeneration, but we can not use
      // staticProps + serverProps at the same time for now, but there is a work in progress in NextJS
      // to enable this feature
      const cities = await fetchCities();
      const tours = await fetchTours();
      const tour = await fetchTourById(1);

      return {
        props: {
          cities,
          tour,
          tours,
          ...(await serverSideTranslations(
            locale,
            ['common', 'footer'],
            i18nConfig
          )),
        },
      };
    }
);

interface AttractionsProps {
  cities: City[];
  tours: Tour[];
  tour: Tour;
}

export function Attractions({ cities, tours, tour }: AttractionsProps) {
  return <AttractionsView cities={cities} tours={tours} tour={tour} />;
}

export default Attractions;
