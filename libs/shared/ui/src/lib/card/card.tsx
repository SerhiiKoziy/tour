import { useRef } from 'react';
import NextLink from 'next/link';
import { useTranslation } from 'next-i18next';
import { KeenSliderInstance } from 'keen-slider/react';
import {
  Box,
  Flex,
  Image,
  Text,
  Stack,
  Center,
  BoxProps,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  SimpleGrid,
  useTheme,
  useMediaQuery,
} from '@chakra-ui/react';

import {
  Tour,
  TourImage,
  addTourToStorageHistory,
} from '@visit/ecomm-lib/shared/data-access';

import Carousel from '../carousel/carousel';
import { ToogleButton, Button } from '../button/button';
import {
  TagLabel,
  PriceLabel,
  RatingLabel,
  GuestsLabel,
  DurationLabel,
  PlaceLabel,
} from '../label/label';

import { Favorite } from '../icons';
import { ArrowLeft, ArrowRight } from '@icon-park/react';

interface CardProps extends BoxProps {
  tour: Tour;
  variant?: string;
  onFavoriteClick?: () => void;
}

interface CardCarouselProps {
  images: TourImage[];
}

interface CardImageProps extends CardCarouselProps, BoxProps {
  onFavoriteClick?: () => void;
}

const CarouselButton = ({ ...rest }) => (
  <Button
    variant="ghost"
    color="gray.100"
    _hover={{ backgroundColor: 'whiteAlpha.300' }}
    {...rest}
  />
);

const CardCarousel = ({ images }: CardCarouselProps) => {
  const carouselRef = useRef<KeenSliderInstance>(null);

  return (
    <Box pos="relative" overflow="hidden" w="full" h="full">
      <Carousel slides={{ perView: 1 }} ref={carouselRef}>
        {images.map((image) => (
          <Image
            key={`cardImage__${image.id}`}
            src={image.url}
            alt={image.name}
            width="full"
            height="full"
            objectFit="cover"
            fallbackSrc="https://via.placeholder.com/150"
            transform="scale(1)"
            transition="transform 0.5s ease"
            _groupHover={{
              transform: 'scale(1.1)',
            }}
          />
        ))}
      </Carousel>
      <Box
        pos="absolute"
        top={0}
        left={0}
        w="100%"
        h="100%"
        bgGradient="linear(to-b, blackAlpha.100, blackAlpha.700)"
        opacity={0}
        transition="opacity 0.5s ease"
        _groupHover={{
          opacity: 0.75,
        }}
      />
      <Center
        position="absolute"
        h={10}
        right={4}
        bottom={-10}
        transition="bottom 0.5s ease"
        _groupHover={{
          bottom: 5,
        }}
      >
        <CarouselButton
          leftIcon={ArrowLeft}
          onClick={() => carouselRef.current?.prev()}
        />
        <CarouselButton
          leftIcon={ArrowRight}
          onClick={() => carouselRef.current?.next()}
        />
      </Center>
    </Box>
  );
};

const CardImage = ({ onFavoriteClick, images, ...rest }: CardImageProps) => (
  <Box pos="relative" borderRadius="xl" overflow="hidden" {...rest}>
    {onFavoriteClick && (
      <Box
        pos="absolute"
        top={4}
        right={4}
        zIndex={1}
        bg="white"
        borderRadius="lg"
      >
        <ToogleButton
          variant="ghost"
          colorScheme="primary"
          leftIcon={Favorite}
          onClick={onFavoriteClick}
        />
      </Box>
    )}
    <CardCarousel images={images} />
  </Box>
);

const CartTitle = ({ tour }: CardProps) => (
  <NextLink href="/[...slug]" as={`${tour.tagId}`} passHref>
    <Text
      as="a"
      noOfLines={3}
      fontWeight="medium"
      lineHeight={{ base: 5, sm: 6 }}
      fontSize={{ base: 'md', sm: 'md' }}
      onClick={() => addTourToStorageHistory(tour)}
    >
      {tour.title}
    </Text>
  </NextLink>
);

export const CardTags = ({ tour }: CardProps) => (
  <Stack direction="row" display="flex" flexWrap="wrap" spacing={0} gap={1}>
    {tour.tags.map((tourTag) => (
      <TagLabel
        key={`cardTag-${tour.id}__${tourTag.id}`}
        colorScheme={tourTag.color}
      >
        {tourTag.title}
      </TagLabel>
    ))}
  </Stack>
);

const CardPlaces = ({ tour }: CardProps) => {
  return (
    <>
      {tour.placesToVisit.map(({ id, title, enabled }) => (
        <PlaceLabel key={`cardPlace__${id}`} title={title} enabled={enabled} />
      ))}
    </>
  );
};

const CardContent = ({ tour, variant = 'column', ...rest }: CardProps) => (
  <Flex
    gap={2}
    h="full"
    flexGrow={1}
    direction="column"
    px={2}
    py={4}
    {...rest}
  >
    <CardTags tour={tour} />

    <CartTitle tour={tour} />

    {variant === 'row' && (
      <Text color="gray.500" fontSize="sm" fontWeight="normal" lineHeight={6}>
        {tour.description}
      </Text>
    )}

    {variant === 'column' && <DurationLabel duration={tour.duration} />}

    <Flex gap={4} direction="row" justify="start" mt="auto">
      <RatingLabel rating={tour.rating.value} count={tour.rating.count} />

      {variant === 'row' && (
        <>
          <Box w="1px" h="full" bg="gray.400" />
          <DurationLabel duration={tour.duration} />
          <Box w="1px" h="full" bg="gray.400" />
          <GuestsLabel guests={tour.guests} />
        </>
      )}

      <PriceLabel currentPrice={tour.price} ml="auto" />
    </Flex>
  </Flex>
);

export const TourCard = ({ tour, onFavoriteClick, ...rest }: CardProps) => {
  // I set CardImage and CardContent height to 50% because they are disbtributed equally in the UX design.
  return (
    <Box
      role="group"
      p={2}
      bg="white"
      overflow="hidden"
      borderRadius="xl"
      border="1px solid"
      borderColor="gray.400"
      {...rest}
    >
      <Stack height="100%" width="100%" spacing={0} direction="column">
        <CardImage
          height="50%"
          images={tour.images}
          onFavoriteClick={onFavoriteClick}
        />
        <CardContent height="50%" tour={tour} />
      </Stack>
    </Box>
  );
};

// Height is set in this way because we want to set the heigh for the collapsed card
// and if we set the height for the whole card, the accordion will be hidden due to the overflow prop
export const TourRowCardLg = ({
  tour,
  height,
  h,
  onFavoriteClick,
  ...rest
}: CardProps) => {
  const { t } = useTranslation('common');
  const rowHeight = height ?? h;

  return (
    <Accordion allowToggle>
      <AccordionItem
        role="group"
        bg="white"
        overflow="hidden"
        borderRadius="xl"
        borderLeftWidth="1px"
        borderRightWidth="1px"
        borderColor="gray.400"
        {...rest}
      >
        <Flex w="full" direction="column">
          <Flex w="full" direction="row" height={rowHeight}>
            <Stack spacing={0} direction="row" flexGrow={1}>
              <CardImage
                m={2}
                maxW="xs"
                images={tour.images}
                onFavoriteClick={onFavoriteClick}
              />
              <CardContent tour={tour} variant="row" />
            </Stack>
            <AccordionButton
              w="auto"
              borderLeftWidth="1px"
              borderColor="gray.400"
            >
              <AccordionIcon />
            </AccordionButton>
          </Flex>
          <AccordionPanel p={0} borderTopWidth="1px" borderColor="gray.400">
            <SimpleGrid
              p={4}
              w="fit-content"
              spacingX={10}
              spacingY={{ base: 5, sm: 3 }}
              autoFlow="column"
              autoColumns="1fr"
              templateRows="repeat(5, 1fr)"
            >
              <CardPlaces tour={tour} />
            </SimpleGrid>
            <Stack
              p={4}
              spacing={4}
              direction="row"
              justify="end"
              align="center"
              borderTopWidth="1px"
              borderColor="gray.400"
            >
              <PriceLabel currentPrice={tour.price} />
              <Button size="lg" fontSize="md" variant="gradient">
                {t('labels.reserveNow')}
              </Button>
              <Button
                size="lg"
                fontSize="md"
                variant="outline"
                colorScheme="primary"
              >
                {t('labels.seeMore')}
              </Button>
            </Stack>
          </AccordionPanel>
        </Flex>
      </AccordionItem>
    </Accordion>
  );
};

// Height is set in this way because we want to set the heigh for the collapsed card
// and if we set the height for the whole card, the accordion will be hidden due to the overflow prop
export const TourRowCardXs = ({
  tour,
  onFavoriteClick,
  height,
  h,
  ...rest
}: CardProps) => {
  const { t } = useTranslation('common');
  const rowHeight = height ?? h;
  return (
    <Accordion allowToggle>
      <AccordionItem
        role="group"
        bg="white"
        overflow="hidden"
        borderRadius="lg"
        borderLeftWidth="1px"
        borderRightWidth="1px"
        borderColor="gray.400"
        {...rest}
      >
        <Flex w="full" direction="column">
          <Flex
            p={4}
            borderBottomWidth="1px"
            borderColor="gray.400"
            pos="relative"
            height={rowHeight}
          >
            <Stack flexGrow={1} pr={16} spacing={2}>
              <RatingLabel
                rating={tour.rating.value}
                count={tour.rating.count}
              />
              <CartTitle tour={tour} />
            </Stack>
            <Box position="absolute" right={2} top={2} w="64px" h="64px">
              <Image
                src={tour.images[0].url}
                alt={tour.images[0].name}
                width="full"
                height="full"
                objectFit="cover"
                borderRadius="lg"
                fallbackSrc="https://via.placeholder.com/64"
              />
            </Box>
          </Flex>
          <AccordionPanel p={0} borderBottomWidth="1px" borderColor="gray.400">
            <Stack p={4} spacing={4}>
              <CardTags tour={tour} />
              <Stack gap={4} direction="row" align="center">
                <DurationLabel duration={tour.duration} />
                <Box w="1px" h={5} bg="gray.400" />
                <GuestsLabel guests={tour.guests} />
              </Stack>
              <Stack pt={4} gap={0} borderTopWidth="1px" borderColor="gray.400">
                <CardPlaces tour={tour} />
              </Stack>
            </Stack>
          </AccordionPanel>
          <Flex pl={4} align="center">
            <PriceLabel currentPrice={tour.price} />
            <ToogleButton
              ml="auto"
              variant="ghost"
              colorScheme="primary"
              leftIcon={Favorite}
              onClick={onFavoriteClick}
            />
            <AccordionButton
              px={3}
              w="auto"
              borderLeftWidth="1px"
              borderColor="gray.400"
            >
              <AccordionIcon />
            </AccordionButton>
          </Flex>
          <AccordionPanel p={0} borderTopWidth="1px" borderColor="gray.400">
            <Stack p={4} gap={2}>
              <Button size="lg" fontSize="md" variant="gradient">
                {t('labels.reserveNow')}
              </Button>
              <Button
                size="lg"
                fontSize="md"
                variant="outline"
                colorScheme="primary"
              >
                {t('labels.seeMore')}
              </Button>
            </Stack>
          </AccordionPanel>
        </Flex>
      </AccordionItem>
    </Accordion>
  );
};

export const TourRowCard = ({ tour, onFavoriteClick, ...rest }: CardProps) => {
  const {
    breakpoints: { sm },
  } = useTheme();

  const [isSmall] = useMediaQuery(`(max-width: ${sm})`);

  return isSmall ? (
    <TourRowCardXs tour={tour} onFavoriteClick={onFavoriteClick} {...rest} />
  ) : (
    <TourRowCardLg tour={tour} onFavoriteClick={onFavoriteClick} {...rest} />
  );
};

export default TourCard;
