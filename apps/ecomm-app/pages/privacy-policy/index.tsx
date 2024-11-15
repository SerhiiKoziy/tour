import {
  City,
  fetchCities,
  wrapper,
} from '@visit/ecomm-lib/shared/data-access';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from '../../next-i18next.config';
import { PrivacyPolicy as PrivacyPolicyView } from '@visit/ecomm-lib/feature';

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
            ['common', 'footer', 'privacy-policy'],
            i18nConfig
          )),
        },
      };
    }
);

interface PrivacyPolicyProps {
  cities: City[];
}

export function PrivacyPolicy({ cities }: PrivacyPolicyProps) {
  return <PrivacyPolicyView cities={cities} />;
}

export default PrivacyPolicy;
