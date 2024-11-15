import {
  City,
  fetchCities,
  wrapper,
} from '@visit/ecomm-lib/shared/data-access';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from '../../next-i18next.config';
import { CancellationPolicy as CancellationPolicyView } from '@visit/ecomm-lib/feature';

export const getServerSideProps = wrapper.getServerSideProps(
  (_store) =>
    async ({ locale }) => {
      // TODO This call could be in the staticProps with incremental regeneration, but we can not use
      // staticProps + serverProps at the same time for now, but there is a work in progress in NextJS
      // to enable this feature
      const cities = await fetchCities();
      return {
        props: {
          cities,

          ...(await serverSideTranslations(
            locale,
            ['common', 'footer', 'cancellation-policy'],
            i18nConfig
          )),
        },
      };
    }
);

interface CancellationPolicyProps {
  cities: City[];
}

export function CancellationPolicy({ cities }: CancellationPolicyProps) {
  return <CancellationPolicyView cities={cities} />;
}

export default CancellationPolicy;
