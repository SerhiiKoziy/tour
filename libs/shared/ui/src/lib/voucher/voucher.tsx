import {
  Box,
  Flex,
  HStack,
  Text,
  Heading,
  Stack,
  Divider,
  Image as ImageChakra,
  IconButton,
  Center,
} from '@chakra-ui/react';
import GoogleMapReact from 'google-map-react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Voucher } from '@visit/ecomm-lib/shared/data-access';
import { Image } from '../image/image';
import FullTTGLogo from '../icons/Logos/TTG/FullTTGLogo';
import { useTranslation } from 'next-i18next';
import Whatsapp from '../icons/Logos/Whatsapp';

//TODO after adding API, change image to the url from the backend
import qr from './assets/QR Code.png';

import Button from '../button/button';
import Email from '../icons/General/Email';
import Phone from '../icons/General/Phone';
import Download from '../icons/General/Download';
import Wallet from '../icons/Logos/Wallet';
import Left from '../icons/General/arrow/Left';
import Info from '../icons/General/Info';

interface TourVoucherProps {
  voucher: Voucher;
}

const TourVoucher = ({ voucher }: TourVoucherProps) => {
  const { t } = useTranslation('common');
  const { title, description, adults, price, child, image } = voucher;

  const isAdult = `${adults.count} ${adults.type}`;
  const isChild = `${child?.count} ${child?.type}`;
  const isPrice = `${t('voucher.amountPaid')} $${price}`;

  return (
    <Flex
      justifyContent="space-between"
      flexDirection={{ base: 'column', lg: 'row' }}
    >
      <Divider
        borderColor="gray.400"
        opacity="1"
        mb="4"
        orientation="horizontal"
        display={{ base: 'inherit', lg: 'none' }}
      />
      <Box
        display={{ base: 'inherit', lg: 'none' }}
        w="full"
        h="48"
        pb="4"
        px={{ base: '4', lg: '0' }}
      >
        <ImageChakra
          src={image.src}
          alt={image.name}
          borderRadius="lg"
          objectPosition="center"
          objectFit="cover"
        />
      </Box>
      <Stack
        direction="column"
        spacing={{ base: '4', lg: '2' }}
        mr={{ base: '0', lg: '10' }}
        px={{ base: '4', lg: '0' }}
      >
        <Heading
          as="h2"
          fontWeight={{ base: 'bold', lg: 'extrabold' }}
          lineHeight={{ base: '7', lg: '9' }}
          fontSize={{ base: 'xl', lg: '3xl' }}
        >
          {title}
        </Heading>
        <Heading
          as="h4"
          fontSize="xl"
          lineHeight="7"
          color="gray.500"
          display={{ base: 'none', lg: 'inherit' }}
        >
          {description}
        </Heading>
        <Flex justifyContent="space-between" alignItems="center">
          <HStack h="4">
            <Text lineHeight="shorter" fontSize="sm" color="gray.500">
              {isAdult}
            </Text>
            {child && (
              <>
                <Divider
                  borderColor="gray.400"
                  opacity="1"
                  orientation="vertical"
                />
                <Text lineHeight="shorter" fontSize="sm" color="gray.500">
                  {isChild}
                </Text>
              </>
            )}
          </HStack>
          <Text display={{ base: 'none', lg: 'inherit' }}>{isPrice}</Text>
          <Text display={{ base: 'inherit', lg: 'none' }}>{`$${price}`}</Text>
        </Flex>
      </Stack>
      <Divider
        borderColor="gray.400"
        opacity="1"
        mt={{ base: '4', lg: '0' }}
        orientation="horizontal"
        display={{ base: 'inherit', lg: 'none' }}
      />
      <DateCard voucher={voucher} />
    </Flex>
  );
};

interface DateCardProps {
  voucher: Voucher;
}

const DateCard = ({ voucher }: DateCardProps) => {
  const { t } = useTranslation('common');
  const { arrive, start, date } = voucher;

  const isArriveBy = `${t('voucher.arrive')} ${arrive}`;
  const isStart = `${t('voucher.start')} ${start}`;

  return (
    <Stack
      spacing="4"
      borderColor="gray.400"
      borderRadius="lg"
      p="4"
      direction={{ base: 'row-reverse', lg: 'row' }}
      borderWidth={{ base: 'none', lg: '1px' }}
      minW={{ base: 'full', lg: '455px' }}
    >
      <Flex justifyContent="center" flexDirection="column" w="49%">
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Heading
            as="h2"
            fontSize="3xl"
            fontWeight="extrabold"
            lineHeight="10"
          >
            {date?.day}
          </Heading>
          <Text color="gray.500">{date?.month}</Text>
          <Divider
            orientation="horizontal"
            w="16"
            borderColor="gray.400"
            opacity="1"
            my="2"
          />
        </Flex>
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Heading
            as="h4"
            fontSize="xl"
            lineHeight="7"
            color="primary.500"
            display={{ base: 'none', lg: 'inherit' }}
          >
            {isArriveBy}
          </Heading>
          <Heading
            as="h4"
            fontSize="xl"
            lineHeight="7"
            display={{ base: 'none', lg: 'inherit' }}
          >
            {isStart}
          </Heading>
          <Heading
            as="h4"
            fontSize="xl"
            lineHeight="7"
            display={{ base: 'inherit', lg: 'none' }}
          >
            {start}
          </Heading>
        </Flex>
      </Flex>
      <Center w={{ base: '49%', lg: 'inherit' }}>
        <Image
          src={qr}
          alt="qr-code"
          w={{ base: '36', lg: 'full' }}
          h={{ base: '36', lg: 'full' }}
        />
      </Center>
    </Stack>
  );
};

//TODO implement marker after updating design
const Marker = () => {
  return <Box />;
};

interface MapContainerProps {
  point: string;
}

const MAP_KEY = '';

const MapContainer = ({ point }: MapContainerProps) => {
  const { t } = useTranslation('common');

  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };

  return (
    <Stack spacing="2" px={{ base: '4', lg: '0' }}>
      <Box>
        <Text
          fontSize="sm"
          fontWeight="medium"
          lineHeight="shorter"
          textTransform="uppercase"
          color="gray.500"
        >
          {t('voucher.startingPoint')}
        </Text>
        <Text>{point}</Text>
      </Box>
      <Box
        w="full"
        h={{ base: '40', lg: '56' }}
        bg="gray.300"
        borderRadius="lg"
        overflow="hidden"
      >
        <GoogleMapReact
          bootstrapURLKeys={{ key: MAP_KEY }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          <Marker />
        </GoogleMapReact>
      </Box>
    </Stack>
  );
};

const MobileDownloadVoucher = () => {
  const { t } = useTranslation('common');

  return (
    <Stack spacing="2" display={{ base: 'inherit', lg: 'none' }} pb="4" pt="5">
      <Box>
        <Button
          _hover={{ bg: 'gray.700' }}
          leftIcon={Wallet}
          variant="outline"
          w="full"
          size="lg"
          bg="black"
          color="gray.100"
        >
          {t('voucher.addToWallet')}
        </Button>
      </Box>
      <Box>
        <Button variant="outline" leftIcon={Download} w="full" size="lg">
          {t('voucher.downloadVoucher')}
        </Button>
      </Box>
    </Stack>
  );
};

interface ChatProps {
  chatUrl: string;
  telephoneNumber: string;
  email: string;
}

const Chat = ({ chatUrl, telephoneNumber, email }: ChatProps) => {
  const { t } = useTranslation('common');
  const callPhone = `tel:${telephoneNumber}`;

  return (
    <>
      <Box
        p="8"
        bg="gray.300"
        borderRadius="lg"
        borderWidth="1px"
        borderColor="gray.400"
        mt="10"
        display={{ base: 'none', lg: 'inherit' }}
      >
        <Flex justifyContent="space-between">
          <Box w="47%">
            <Text
              fontSize="sm"
              lineHeight="shorter"
              color="gray.500"
              textTransform="uppercase"
            >
              {t('voucher.chat')}
            </Text>
            <Text>{chatUrl}</Text>
          </Box>
          <Box w="47%">
            <Whatsapp />
            <Text
              fontSize="sm"
              lineHeight="xl"
              color="gray.500"
              textTransform="uppercase"
            >
              {t('voucher.whatsapp')}
            </Text>
            <Text>{telephoneNumber}</Text>
          </Box>
        </Flex>
      </Box>
      <Stack
        spacing="6"
        display={{ base: 'inherit', lg: 'none' }}
        py="4"
        px={{ base: '4', lg: '0' }}
      >
        <Flex justifyContent="space-between" alignItems="center">
          <Box>
            <Text
              textTransform="uppercase"
              fontSize="sm"
              lineHeight="xl"
              color="gray.500"
            >
              {t('voucher.email')}
            </Text>
            <Text lineHeight="short">{email}</Text>
          </Box>
          <Link href={`mailto:${email}`}>
            <IconButton
              aria-label="Phone"
              variant="outline"
              size="lg"
              icon={<Email />}
            />
          </Link>
        </Flex>
        <Flex justifyContent="space-between" alignItems="center">
          <Box>
            <Text
              textTransform="uppercase"
              fontSize="sm"
              lineHeight="xl"
              color="gray.500"
            >
              {t('voucher.phone')}
            </Text>
            <Text lineHeight="short">{telephoneNumber}</Text>
          </Box>
          <Link href={callPhone}>
            <IconButton
              aria-label="Phone"
              variant="outline"
              size="lg"
              icon={<Phone />}
            />
          </Link>
        </Flex>
      </Stack>
    </>
  );
};

interface HeaderVoucherProps {
  title: string;
}

const HeaderVoucher = ({ title }: HeaderVoucherProps) => {
  const { push } = useRouter();
  const redirectBack = () => push('/checkout/checkout');

  return (
    <>
      <Box display={{ base: 'none', lg: 'inherit' }}>
        <FullTTGLogo />
      </Box>
      <Box
        display={{ base: 'inherit', lg: 'none' }}
        px={{ base: '3.5', lg: '0' }}
      >
        <Flex py="2" justifyContent="space-between" alignItems="center">
          <IconButton
            aria-label="left"
            icon={<Left />}
            onClick={redirectBack}
          />
          <Text mx="2">{title}</Text>
          <IconButton aria-label="info" icon={<Info />} bg="gray.300" />
        </Flex>
      </Box>
    </>
  );
};

interface BodyVoucherProps {
  voucher: Voucher;
}

const BodyVoucher = ({ voucher }: BodyVoucherProps) => {
  const { telephoneNumber, chatUrl, warningText, point, email } = voucher;

  return (
    <Box pt={{ base: '0', lg: '20' }}>
      <TourVoucher voucher={voucher} />
      <Divider
        orientation="horizontal"
        w="full"
        borderColor="gray.400"
        opacity="1"
        mb={{ base: '4', lg: '10' }}
        mt={{ base: '0', lg: '8' }}
      />
      <MapContainer point={point} />
      <Divider
        orientation="horizontal"
        w="full"
        borderColor="gray.400"
        opacity="1"
        visibility={{ base: 'visible', lg: 'hidden' }}
        mt="4"
      />
      <Chat telephoneNumber={telephoneNumber} chatUrl={chatUrl} email={email} />
      <Box>
        <Text
          fontSize="xl"
          fontWeight="bold"
          lineHeight="7"
          textAlign="center"
          display={{ base: 'none', lg: 'inherit' }}
        >
          {warningText}
        </Text>
      </Box>
    </Box>
  );
};

const FooterVoucher = () => {
  const { t } = useTranslation('common');

  return (
    <Box px={{ base: '4', lg: '0' }}>
      <Divider
        orientation="horizontal"
        w="full"
        borderColor="gray.400"
        opacity="1"
        mt="48"
        mb="10"
        display={{ base: 'none', lg: 'inherit' }}
      />
      <Text color="gray.500" display={{ base: 'none', lg: 'inherit' }}>
        {t('voucher.footerDescription')}
      </Text>
      <MobileDownloadVoucher />
    </Box>
  );
};

interface VoucherContainerProps {
  voucher: Voucher;
}

export const VoucherContainer = ({ voucher }: VoucherContainerProps) => (
  <>
    <HeaderVoucher title={voucher?.title} />
    <BodyVoucher voucher={voucher} />
    <FooterVoucher />
  </>
);

export default VoucherContainer;
