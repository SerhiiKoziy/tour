import {
  City,
  fetchCities,
  wrapper,
} from '@visit/ecomm-lib/shared/data-access';
import { AccountDetails } from '@visit/ecomm-lib/feature';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from '../../next-i18next.config';

export const getServerSideProps = wrapper.getServerSideProps(
  (_store) =>
    async ({ req, res, locale, ..._etc }) => {
      // TODO This call could be in the staticProps with incremental regeneration, but we can not use
      // staticProps + serverProps at the same time for now, but there is a work in progress in NextJS
      // to enable this feature
      const cities = await fetchCities();

      return {
        props: {
          cities,
          ...(await serverSideTranslations(
            locale,
            ['common', 'footer'],
            i18nConfig
          )),
        },
      };
    }
);

interface AccountProps {
  cities: City[];
}

export function Account({ cities }: AccountProps) {
  return <AccountDetails cities={cities} />;
}

export default Account;
