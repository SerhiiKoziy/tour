import {
  Box,
  Flex,
  VStack,
  Heading,
  Spacer,
  Stack,
  Text,
  IconButton,
  useBreakpointValue,
} from '@chakra-ui/react';
import { ArrowLeft, ArrowRight } from '@icon-park/react';
import { Tour } from '@visit/ecomm-lib/shared/data-access';
import { Carousel, TourCard } from '@visit/shared/ui';
import { KeenSliderInstance } from 'keen-slider';
import { useTranslation } from 'next-i18next';
import { RefObject, useRef } from 'react';

import './most-popular-tours.module.scss';

export interface MostPopularToursProps {
  tours: Tour[];
}

interface SliderArrowsProps {
  carouselRef: RefObject<KeenSliderInstance>;
}

const handleFavoriteClick = () => console.log('Favorite button');

const SliderArrows = ({ carouselRef }: SliderArrowsProps) => {
  return (
    <Stack direction="row" align="center">
      <IconButton
        aria-label={'left button'}
        variant="outline"
        background="gray.100"
        size="lg"
        onClick={() => {
          carouselRef?.current?.prev();
        }}
        icon={<ArrowLeft />}
      />
      <IconButton
        aria-label={'right button'}
        variant="outline"
        background="gray.100"
        size="lg"
        onClick={() => {
          carouselRef?.current?.next();
        }}
        icon={<ArrowRight />}
      />
    </Stack>
  );
};

export function MostPopularTours({ tours }: MostPopularToursProps) {
  const { t } = useTranslation('common');
  const carouselRef = useRef<KeenSliderInstance>(null);
  const perView = useBreakpointValue({ base: 1.125, md: 2.125, lg: 4.125 });

  return (
    <Stack spacing={6}>
      <Box>
        <Text color="gray.500">{t('mostPopularTours.description')}</Text>
        <Flex>
          <VStack>
            <Heading>{t('mostPopularTours.title')}</Heading>
          </VStack>
          <Spacer />
          <Box
            paddingEnd={{ md: '14' }}
            display={{ base: 'none', md: 'initial' }}
          >
            <SliderArrows carouselRef={carouselRef} />
          </Box>
        </Flex>
      </Box>
      <Carousel
        loop
        slides={{ perView, spacing: 16 }}
        ref={carouselRef}
        selector="mostPopularToursCarousel"
      >
        {tours.map((tour, index) => (
          <TourCard
            key={index}
            tour={tour}
            onFavoriteClick={handleFavoriteClick}
            maxH={96}
            height="full"
          />
        ))}
      </Carousel>
      <Box display={{ base: 'initial', md: 'none' }}>
        <SliderArrows carouselRef={carouselRef} />
      </Box>
    </Stack>
  );
}

export default MostPopularTours;
