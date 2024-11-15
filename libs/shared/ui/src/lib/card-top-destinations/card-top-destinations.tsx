import {
  Tag,
  Stack,
  Spacer,
  Text,
  Center,
  Icon,
  Flex,
  Image,
  LinkBox,
  LinkOverlay,
  useTheme,
} from '@chakra-ui/react';
import { Italy } from '../icons';
import { ArrowRight } from '@icon-park/react';

import { City } from '@visit/ecomm-lib/shared/data-access';

interface CardProps {
  bgImage?: string;
  bgOverlay: string;
  children: React.ReactNode;
  variant?: 'normal' | 'compact';
}
interface DestinationCardProps {
  destination: City;
  variant?: 'normal' | 'compact';
}

interface DestinationAllCardProps {
  total: number;
  variant?: 'normal' | 'compact';
}

const ALL_DESTINATIONS_BG =
  'https://images.pexels.com/photos/3411135/pexels-photo-3411135.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

const Card = ({
  children,
  bgImage,
  bgOverlay,
  variant = 'normal',
  ...rest
}: CardProps) => (
  <LinkBox
    as={Flex}
    role="group"
    position="relative"
    minH={{ base: 40, sm: variant === 'compact' ? 40 : 72 }}
    overflow="hidden"
    borderRadius="lg"
    border="1px solid"
    borderColor="gray.400"
  >
    <Flex
      position="relative"
      w="full"
      _after={{
        content: "''",
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 0,
        width: '100%',
        height: '100%',
        bgImage: bgOverlay,
      }}
    >
      <Image
        position="absolute"
        top={0}
        left={0}
        width="full"
        height="full"
        src={bgImage}
        alt="Some name"
        objectFit="cover"
        fallbackSrc="https://via.placeholder.com/150"
        transform="scale(1)"
        transition="transform 0.5s ease"
        _groupHover={{
          transform: 'scale(1.1)',
        }}
      />
      <Stack
        p={{ base: 3, sm: variant === 'compact' ? 3 : 6 }}
        spacing={{ base: 1, sm: variant === 'compact' ? 1 : 2 }}
        w="full"
        h="full"
        zIndex={1}
      >
        {children}
      </Stack>
    </Flex>
  </LinkBox>
);

export const DestinationCard = ({
  destination,
  variant = 'normal',
}: DestinationCardProps) => {
  const {
    colors: {
      gradientOverlay: { dark: darkOverlay },
    },
  } = useTheme();

  const CountryIcon = () => <Italy />;

  return (
    <Card variant={variant} bgImage={destination.src} bgOverlay={darkOverlay}>
      <Tag
        colorScheme="gray"
        py={1}
        alignSelf="start"
        fontWeight="medium"
        fontSize={{ base: 'xs', sm: variant === 'compact' ? 'xs' : 'sm' }}
      >
        {`From $${destination.price ?? 'Price'}`}
      </Tag>
      <Spacer />
      <Center alignSelf="start">
        <Icon as={CountryIcon} />
        <Text
          color="white"
          fontWeight="medium"
          fontSize={{ base: 'xs', sm: variant === 'compact' ? 'xs' : 'sm' }}
          ml={2}
        >
          {`${destination.country || 'Country'}`}
        </Text>
      </Center>
      <LinkOverlay href={`${destination.tagId || ''}`}>
        <Text
          color="white"
          fontWeight="bold"
          fontSize={{ base: 'md', sm: variant === 'compact' ? 'md' : '2xl' }}
        >
          {destination.city}
        </Text>
      </LinkOverlay>
    </Card>
  );
};

export const DestinationAllCard = ({
  total,
  variant = 'normal',
}: DestinationAllCardProps) => {
  const {
    colors: {
      gradientOverlay: { light: lightOverlay },
    },
  } = useTheme();

  return (
    <Card
      variant={variant}
      bgImage={ALL_DESTINATIONS_BG}
      bgOverlay={lightOverlay}
    >
      <Spacer />
      <Text
        color="primary.600"
        fontWeight="medium"
        fontSize={{ base: 'xs', sm: variant === 'compact' ? 'xs' : 'sm' }}
        ml={2}
      >
        {`+${total} Cities`}
      </Text>
      <Center alignSelf="start" color="primary.600">
        <LinkOverlay href="#">
          <Text
            lineHeight={5}
            fontWeight="bold"
            fontSize={{ base: 'md', sm: variant === 'compact' ? 'md' : '2xl' }}
            mr={2}
          >
            All Destinations
          </Text>
        </LinkOverlay>
        <Icon as={ArrowRight} />
      </Center>
    </Card>
  );
};

export default DestinationCard;
