import {
  Flex,
  LinkBox,
  Spacer,
  Stack,
  Text,
  BoxProps,
  useTheme,
} from '@chakra-ui/react';
import { City } from '@visit/ecomm-lib/shared/data-access';
import Button from '../button/button';

interface DestinationCardProps extends BoxProps {
  attraction: City;
}

export const AttractionCard = ({
  attraction,
  ...rest
}: DestinationCardProps) => {
  const {
    colors: {
      gradientOverlay: { halfLinearDark: darkOverlay },
    },
  } = useTheme();
  return (
    <LinkBox
      as={Flex}
      h="full"
      role="group"
      minH={{ base: 48, sm: 72 }}
      borderRadius="lg"
      overflow="hidden"
      position="relative"
      {...rest}
    >
      <Flex
        position="relative"
        w="full"
        bgImage={`${darkOverlay}, url('${attraction.src}')`}
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
      >
        <Stack spacing={{ base: 1, sm: 2 }} p={6} w="full" h="full" zIndex={1}>
          <Text color="white" fontSize="sm" fontWeight="medium">
            {attraction.city}
          </Text>
          <Text color="white" fontSize="2xl" fontWeight="bold">
            City
          </Text>
          <Spacer />
          <Button variant="outline" colorScheme="gray" alignSelf="start">
            View Tours
          </Button>
        </Stack>
      </Flex>
    </LinkBox>
  );
};

export default AttractionCard;
