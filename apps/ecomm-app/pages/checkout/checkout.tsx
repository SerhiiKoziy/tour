import {
  City,
  fetchCities,
  fetchVouchers,
  wrapper,
} from '@visit/ecomm-lib/shared/data-access';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from '../../next-i18next.config';
import { Voucher } from '@visit/ecomm-lib/shared/data-access';
import { CheckoutDetails } from '@visit/ecomm-lib/feature';

export const getServerSideProps = wrapper.getServerSideProps(
  (_store) =>
    async ({ req, res, locale, ..._etc }) => {
      // TODO This call could be in the staticProps with incremental regeneration, but we can not use
      // staticProps + serverProps at the same time for now, but there is a work in progress in NextJS
      // to enable this feature
      const vouchers = await fetchVouchers();
      const cities = await fetchCities();

      return {
        props: {
          vouchers,
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

interface CheckoutProps {
  vouchers: Voucher[];
  cities: City[];
}

export function Checkout({ vouchers, cities }: CheckoutProps) {
  return <CheckoutDetails vouchers={vouchers} cities={cities} />;
}

export default Checkout;
