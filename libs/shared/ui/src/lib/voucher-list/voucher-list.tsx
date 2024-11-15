import {
  Box,
  Heading,
  Stack,
  Image,
  Flex,
  Divider,
  Text,
  HStack,
  Center,
} from '@chakra-ui/react';
import { Voucher } from '@visit/ecomm-lib/shared/data-access';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { Button } from '../button/button';
import Location from '../icons/General/Location';
import GetDirection from '../icons/Other/GetDirection';
import { Download } from '@icon-park/react';

interface TextFieldCardProps {
  title: string;
  subTitle: string;
}

const TextFieldCard = ({ title, subTitle }: TextFieldCardProps) => {
  return (
    <Box>
      <Text
        fontSize="sm"
        lineHeight="shorter"
        textTransform="uppercase"
        color="gray.500"
        display={{ base: 'none', lg: 'inherit' }}
      >
        {title}
      </Text>
      <Text fontSize="sm" lineHeight="shorter">
        {subTitle}
      </Text>
    </Box>
  );
};

interface VoucherCardProps {
  voucher: Voucher;
}

const VoucherCard = ({ voucher }: VoucherCardProps) => {
  const { t } = useTranslation('common');
  const { telephoneNumber, point, email, image, date, start, title } = voucher;

  const reducedMonth = date.month.substring(0, 3);

  return (
    <Flex
      bg="gray.100"
      borderColor="gray.400"
      borderWidth="1px"
      borderRadius="lg"
      flexDirection={{ base: 'column', lg: 'row' }}
    >
      <Box
        p="2"
        maxH="full"
        maxW="56"
        display={{ base: 'none', lg: 'inherit' }}
      >
        <Image
          src={image.src}
          alt={image.name}
          objectFit="cover"
          objectPosition="center"
          borderRadius="lg"
          w="full"
        />
      </Box>
      <Stack
        spacing={{ base: '0', lg: '4' }}
        px={{ base: '0', lg: '4' }}
        py={{ base: '0', lg: '5' }}
        w="full"
      >
        <Flex justifyContent="space-between">
          <Heading
            as="h4"
            fontSize={{ base: 'md', lg: 'xl' }}
            lineHeight={{ base: 'shorter', lg: '7' }}
            fontWeight={{ base: 'medium', lg: 'bold' }}
            py={{ base: '4', lg: '0' }}
            px={{ base: '4', lg: '0' }}
          >
            {title}
          </Heading>
          <Box py="2" pr="2" display={{ base: 'inherit', lg: 'none' }}>
            <Image
              src={image.src}
              alt={image.name}
              objectFit="cover"
              objectPosition="center"
              borderRadius="lg"
              h="14"
              minW="14"
            />
          </Box>
        </Flex>
        <Divider
          orientation="horizontal"
          w="full"
          borderColor="gray.400"
          opacity="1"
        />
        <Flex
          justifyContent="space-between"
          alignItems="center"
          p={{ base: '4', lg: '0' }}
        >
          <Flex align="center">
            <Center display={{ base: 'inherit', lg: 'none' }} pr="2">
              <Location />
            </Center>
            <TextFieldCard title={t('voucherList.address')} subTitle={point} />
          </Flex>
          <Box display={{ base: 'inherit', lg: 'none' }}>
            <GetDirection />
          </Box>
        </Flex>
        <Divider
          orientation="horizontal"
          w="full"
          borderColor="gray.400"
          opacity="1"
          display={{ base: 'inherit', lg: 'none' }}
        />
        <HStack spacing="10" display={{ base: 'none', lg: 'inherit' }}>
          <Box>
            <TextFieldCard title={t('voucherList.email')} subTitle={email} />
          </Box>
          <Box>
            <TextFieldCard
              title={t('voucherList.phone')}
              subTitle={telephoneNumber}
            />
          </Box>
        </HStack>
      </Stack>
      <Flex
        borderLeftWidth={{ base: 'none', lg: '1px' }}
        flexDirection={{ base: 'row', lg: 'column' }}
        p={{ base: '4', lg: '0' }}
        borderRadius="none"
        borderColor="gray.400"
        justifyContent={{ base: 'space-between', lg: 'center' }}
        alignItems="center"
        minW="40"
      >
        <Stack
          direction={{ base: 'row', lg: 'column' }}
          spacing={{ base: '4', lg: '1' }}
        >
          <Box>
            <Flex flexDirection={{ base: 'row', lg: 'column' }}>
              <Text
                as="h2"
                textAlign="center"
                fontSize={{ base: 'xl', lg: '3xl' }}
                fontWeight={{ base: 'bold', lg: 'extrabold' }}
                lineHeight={{ base: '7', lg: '10' }}
                pr={{ base: '2', lg: '0' }}
              >
                {date.day}
              </Text>
              <Text display={{ base: 'none', lg: 'inherit' }} color="gray.500">
                {date.month}
              </Text>
              <Text
                display={{ base: 'inherit', lg: 'none' }}
                fontWeight="bold"
                lineHeight="7"
                fontSize="xl"
              >
                {reducedMonth}
              </Text>
            </Flex>
            <Text
              display={{ base: 'inherit', lg: 'none' }}
              fontSize="sm"
              color="gray.500"
              lineHeight="shorter"
            >
              {t('voucherList.date')}
            </Text>
          </Box>
          <Center display={{ base: 'none', lg: 'inherit' }}>
            <Divider
              orientation="horizontal"
              opacity="1"
              w="16"
              borderColor="gray.400"
            />
          </Center>
          <Center display={{ base: 'inherit', lg: 'none' }}>
            <Divider
              orientation="vertical"
              h="10"
              borderColor="gray.400"
              opacity="1"
            />
          </Center>
          <Box>
            <Text as="h4" fontSize="xl" lineHeight="7" fontWeight="bold">
              {start}
            </Text>
            <Text
              fontSize="sm"
              color="gray.500"
              lineHeight="shorter"
              display={{ base: 'inherit', lg: 'none' }}
            >
              {t('voucherList.time')}
            </Text>
          </Box>
        </Stack>
        <Box display={{ base: 'inherit', lg: 'none' }}>
          <Button size="lg" fontSize="md" variant="outline">
            {t('voucherList.details')}
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
};

interface VoucherListProps {
  vouchers: Voucher[];
}

export function VoucherList({ vouchers }: VoucherListProps) {
  const { t } = useTranslation('common');
  const { push } = useRouter();

  const navigate = (id: string) => push(`/checkout/${id}`);

  return vouchers.length ? (
    <Box>
      <Flex
        justifyContent="space-between"
        alignItems="start"
        mb={{ base: '6', lg: '3' }}
        flexDirection={{ base: 'column', lg: 'row' }}
      >
        <Heading
          as="h3"
          fontSize={{ base: '3xl', sm: '2xl' }}
          lineHeight={{ base: 10, sm: 8 }}
          fontWeight={{ base: 'extrabold', sm: 'bold' }}
          pb={{ base: '6', lg: '0' }}
        >
          {t('voucherList.yourVouchers')}
        </Heading>
        <Button
          size="lg"
          fontSize="md"
          w={{ base: 'full', lg: 'fit-content' }}
          variant="outline"
          leftIcon={Download}
          p="5"
          colorScheme="primary"
        >
          {t('voucherList.downloadAll')}
        </Button>
      </Flex>
      <Stack spacing="2">
        {vouchers.map((voucher) => (
          <Box onClick={() => navigate(voucher.id)} key={voucher.id}>
            <VoucherCard key={voucher.id} voucher={voucher} />
          </Box>
        ))}
      </Stack>
    </Box>
  ) : (
    <Text textAlign="center">{t('voucherList.emptyVouchersList')}</Text>
  );
}

export default VoucherList;
