import {
  City,
  fetchCities,
  fetchTourById,
  wrapper,
} from '@visit/ecomm-lib/shared/data-access';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Checkout as CheckoutView } from '@visit/ecomm-lib/feature';
import i18nConfig from '../../../../next-i18next.config';

export const getServerSideProps = wrapper.getServerSideProps(
  (_store) =>
    async ({ locale }) => {
      // TODO This call could be in the staticProps with incremental regeneration, but we can not use
      // staticProps + serverProps at the same time for now, but there is a work in progress in NextJS
      // to enable this feature
      const tour = await fetchTourById(1);
      const cities = await fetchCities();

      return {
        props: {
          cities,
          tour,
          ...(await serverSideTranslations(
            locale,
            ['common', 'footer'],
            i18nConfig
          )),
        },
      };
    }
);

interface CheckoutProps {
  cities: City[];
}

export function Checkout({ cities }: CheckoutProps) {
  return <CheckoutView cities={cities} />;
}

export default Checkout;
