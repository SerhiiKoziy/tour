import { useTranslation } from "next-i18next";
import {
  BoxProps,
  Center,
  Flex,
  Icon,
  Stack,
  Tag,
  Text,
  TagProps,
  useToken,
} from "@chakra-ui/react";
import { Star, Duration, Guests, CheckCircle, CloseCircle } from "../icons";

interface PriceProps extends BoxProps {
  hasDiscount?: boolean;
  oldPrice?: string;
  currentPrice: string;
  priceType?: string;
}

interface RatingProps extends BoxProps {
  rating: number | string;
  count: number;
}

interface DurationProps extends BoxProps {
  duration: number;
}

interface GuestsProps extends BoxProps {
  guests: number;
}

interface PlaceProps extends BoxProps {
  title: string;
  enabled: boolean;
}

export const PriceLabel = ({
  hasDiscount = false,
  oldPrice,
  currentPrice,
  ...rest
}: PriceProps) => {
  const { t } = useTranslation("common");
  return (
    <Flex alignItems="baseline" {...rest}>
      {hasDiscount && (
        <Text fontSize="sm" color="gray.500" as="del" mr={1}>
          {`$${oldPrice}`}
        </Text>
      )}

      <Text
        fontSize="xl"
        fontWeight="bold"
        color={hasDiscount ? "primary.500" : "gray.700"}
        mr={1}
      >
        {`$${currentPrice}`}
      </Text>
      <Text fontSize="sm" color="gray.500">
        {`/${t("labels.adult")}`}
      </Text>
    </Flex>
  );
};

export const RatingLabel = ({ rating, count, ...rest }: RatingProps) => {
  const [orange100] = useToken("colors", ["orange.100"]);
  const StarIcon = () => <Star fill={orange100} stroke={orange100} />;

  return (
    <Stack direction="row" align="center" spacing={1} {...rest}>
      <Icon as={StarIcon} />
      <Text fontWeight="bold" lineHeight={{ base: 5, sm: 6 }}>
        {`${rating}`}
      </Text>
      <Text color="gray.500" lineHeight={{ base: 5, sm: 6 }}>
        ({count})
      </Text>
    </Stack>
  );
};

export const DurationLabel = ({ duration, ...rest }: DurationProps) => {
  const DurationIcon = () => <Duration />;

  return (
    <Stack direction="row" align="center" spacing={2} {...rest}>
      <Icon as={DurationIcon} />
      <Text>{`${duration}h`}</Text>
    </Stack>
  );
};

export const GuestsLabel = ({ guests, ...rest }: GuestsProps) => {
  const { t } = useTranslation("common");
  const GuestsIcon = () => <Guests />;

  return (
    <Stack direction="row" align="center" spacing={2} {...rest}>
      <Icon as={GuestsIcon} />
      <Text color="gray.500">{`${t("labels.max")} ${guests} ${t("labels.guests")}`}</Text>
    </Stack>
  );
};

export const TagLabel = ({ children, ...rest }: TagProps) => (
  <Tag
    fontSize={{ base: "xs", sm: "xs" }}
    fontWeight="normal"
    overflow="hidden"
    whiteSpace="nowrap"
    textOverflow="ellipsis"
    {...rest}
  >
    {children}
  </Tag>
);

export const PlaceLabel = ({ title, enabled, ...rest }: PlaceProps) => {
  const [primary500, gray500] = useToken("colors", ["primary.500", "gray.500"]);
  const PlaceIcon = () =>
    enabled ? (
      <CheckCircle fill={primary500} />
    ) : (
      <CloseCircle fill={gray500} />
    );

  return (
    <Center justifyContent="start" {...rest}>
      <Icon as={PlaceIcon} />
      <Text ml={2}>{title}</Text>
    </Center>
  );
};

export default PriceLabel;
