import { Container } from '@chakra-ui/react';
import { BaseLayout } from '@visit/ecomm-lib/shared/ui';
import {
  City,
  fetchAccountDetails,
  fetchOrderHistory,
  fetchVouchers,
  MyAccountDetails,
  OrderHistory,
  Voucher,
} from '@visit/ecomm-lib/shared/data-access';
import { AccountWrapper } from '@visit/shared/ui';
import { useEffect, useState } from 'react';

interface AccountDetailsProps {
  cities: City[];
}

export function AccountDetails({ cities }: AccountDetailsProps) {
  const [orderHistory, setOrderHistory] = useState<OrderHistory[]>([]);
  const [myAccountDetails, setMyAccountDetails] = useState<MyAccountDetails>({
    firstName: '',
    lastName: '',
    email: '',
    date: '',
    country: '',
  });
  const [vouchers, setVouchers] = useState<Voucher[]>([]);

  useEffect(() => {
    const fetchFormOptions = async () => {
      const [orderHistory, myAccountDetails, vouchers] = await Promise.all([
        fetchOrderHistory(),
        fetchAccountDetails(),
        fetchVouchers(),
      ]);
      setOrderHistory(orderHistory);
      setMyAccountDetails(myAccountDetails);
      setVouchers(vouchers);
    };
    fetchFormOptions().catch(console.error);
  }, []);

  return (
    <BaseLayout cities={cities}>
      <Container
        minWidth="100%"
        maxWidth="100%"
        bg="gray.200"
        paddingTop="12"
        paddingX={{ base: '4', lg: '72' }}
        paddingBottom={{ base: '12', lg: '24' }}
      >
        <AccountWrapper
          orderHistory={orderHistory}
          myAccountDetails={myAccountDetails}
          vouchers={vouchers}
        />
      </Container>
    </BaseLayout>
  );
}

export default AccountDetails;
