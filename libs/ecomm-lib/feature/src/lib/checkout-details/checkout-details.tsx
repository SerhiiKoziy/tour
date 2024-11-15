import { BaseLayout } from '@visit/ecomm-lib/shared/ui';
import { Container } from '@chakra-ui/react';
import { City, Voucher } from '@visit/ecomm-lib/shared/data-access';
import { VoucherList } from '@visit/shared/ui';

interface CheckoutDetailsProps {
  cities: City[];
  vouchers: Voucher[];
}

export function CheckoutDetails({ cities, vouchers }: CheckoutDetailsProps) {
  return (
    <BaseLayout cities={cities}>
      <Container
        minWidth="100%"
        maxWidth="100%"
        bg="gray.200"
        paddingX={{ base: '4', md: '40' }}
        py={{ base: '12', md: '12' }}
      >
        <VoucherList vouchers={vouchers} />
      </Container>
    </BaseLayout>
  );
}

export default CheckoutDetails;
