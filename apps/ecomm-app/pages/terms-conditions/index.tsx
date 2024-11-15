import {
  City,
  fetchCities,
  wrapper,
} from '@visit/ecomm-lib/shared/data-access';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from '../../next-i18next.config';
import { TermsConditions as TermsConditionsView } from '@visit/ecomm-lib/feature';

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
            ['common', 'footer', 'terms-conditions'],
            i18nConfig
          )),
        },
      };
    }
);

interface TermsConditionsProps {
  cities: City[];
}

export function TermsConditions({ cities }: TermsConditionsProps) {
  return <TermsConditionsView cities={cities} />;
}

export default TermsConditions;
