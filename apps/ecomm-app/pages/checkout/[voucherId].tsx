import { Container } from '@chakra-ui/react';
import {
  fetchVoucherById,
  wrapper,
} from '@visit/ecomm-lib/shared/data-access';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from '../../next-i18next.config';
import { VoucherContainer } from '@visit/shared/ui';
import { Voucher } from '@visit/ecomm-lib/shared/data-access';

export const getServerSideProps = wrapper.getServerSideProps(
  (_store) =>
    async ({ req, res, locale, query, ..._etc }) => {
      // TODO This call could be in the staticProps with incremental regeneration, but we can not use
      // staticProps + serverProps at the same time for now, but there is a work in progress in NextJS
      // to enable this feature

      const voucherId = Array.isArray(query.voucherId)
        ? query.voucherId.toString()
        : query.voucherId;
      const voucher = await fetchVoucherById(voucherId);

      return {
        props: {
          voucher,
          ...(await serverSideTranslations(
            locale,
            ['common', 'footer'],
            i18nConfig
          )),
        },
      };
    }
);

interface VoucherProps {
  voucher: Voucher;
}

export function Voucher({ voucher }: VoucherProps) {
  return (
    <Container
      minWidth="100%"
      maxWidth="100%"
      paddingX={{ base: '0', md: '32' }}
      paddingY={{ base: '4', md: '32' }}
    >
      <VoucherContainer voucher={voucher} />
    </Container>
  );
}

export default Voucher;
