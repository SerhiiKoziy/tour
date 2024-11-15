import React, { MutableRefObject, useEffect, useState } from 'react';
import {
  Box,
  Divider,
  Flex,
  Heading,
  Image,
  Text,
  Stack,
  IconButton,
  TabList,
  Tabs,
  Tab,
  useBreakpointValue,
  Modal,
  ModalContent,
  ModalBody,
  HStack,
} from '@chakra-ui/react';
import { Tour, TourImage } from '@visit/ecomm-lib/shared/data-access';
import { useTranslation } from 'next-i18next';
import {
  useKeenSlider,
  KeenSliderPlugin,
  KeenSliderInstance,
} from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { RightArrow, Close, Button, LeftArrow } from '@visit/shared/ui';

interface TourPreviewProps {
  tour: Tour;
  onClose: () => void;
  isOpen: boolean;
  currentSelectImg?: number;
}

interface ArrowBtnProps {
  icon: React.ReactElement;
  left?: string;
  right?: string;
  handleClick: () => void;
  disabled: boolean;
}

const ArrowBtn = ({ icon, handleClick, disabled, ...rest }: ArrowBtnProps) => {
  return (
    <IconButton
      disabled={disabled}
      onClick={handleClick}
      display={{ base: 'none', lg: 'inherit' }}
      aria-label="arrow"
      variant="outline"
      position="absolute"
      margin="0 1rem 0 1rem !important"
      icon={icon}
      bottom="50%"
      transform="translate(0%, -50%)"
      {...rest}
    />
  );
};

interface CustomTabsProps {
  handleUpdateImages?: () => void;
  title: string;
  countImages: number;
}

const CustomTab = ({
  handleUpdateImages,
  title,
  countImages,
}: CustomTabsProps) => {
  return (
    <Tab
      _selected={{
        color: 'gray.700',
        borderColor: 'gray.700',
      }}
      pl="0"
      onClick={handleUpdateImages}
    >
      <Text>
        {`${title}`}
        <Text as="span" color="gray.500">{`  (${countImages})`}</Text>
      </Text>
    </Tab>
  );
};

interface TourPreviewTabsProps {
  tourImages: TourImage[];
  handleUpdateImages: (tourImages: TourImage[]) => void;
}

const TourPreviewTabs = ({
  tourImages,
  handleUpdateImages,
}: TourPreviewTabsProps) => {
  const { t } = useTranslation('common');
  const countAllImages = tourImages?.length;
  const uniqueViewPoints = tourImages
    .map((image) => image.section)
    .filter((sectionName, i, sections) => sections.indexOf(sectionName) === i);
  const sectionsFilter = (title: string) =>
    tourImages.filter((image) => image.section === title);

  return (
    <Tabs isLazy={true}>
      <TabList
        color="gray.500"
        borderColor="gray.400"
        borderBottomWidth="1px"
        whiteSpace="nowrap"
        overflowX={{ base: 'scroll', xl: 'inherit' }}
        overflowY="hidden"
        mb={{ base: '2', lg: '4' }}
      >
        <HStack spacing="6">
          <CustomTab
            title={t('tourPreview.allPhotos')}
            countImages={countAllImages}
            handleUpdateImages={() => handleUpdateImages(tourImages)}
          />
          {uniqueViewPoints?.map((point) => {
            const points = point && sectionsFilter(point);
            const countImages = points?.length;

            return (
              <CustomTab
                key={point}
                title={point || ''}
                countImages={countImages || 0}
                handleUpdateImages={() => points && handleUpdateImages(points)}
              />
            );
          })}
        </HStack>
      </TabList>
    </Tabs>
  );
};

function ThumbnailPlugin(
  mainRef: MutableRefObject<KeenSliderInstance | null>
): KeenSliderPlugin {
  return (slider) => {
    function removeActive() {
      slider.slides.forEach((slide) => {
        slide.classList.remove('active');
      });
    }

    function addActive(idx: number) {
      slider.slides[idx].classList.add('active');
    }

    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener('click', () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx);
        });
      });
    }

    slider.on('created', () => {
      if (!mainRef.current) return;
      addActive(slider.track?.details?.rel);
      addClickEvents();
      mainRef.current.on('animationStarted', (main) => {
        removeActive();
        const next = main.animator.targetIdx || 0;
        addActive(main.track.absToRel(next));
        slider.moveToIdx(Math.min(slider.track?.details?.maxIdx, next));
      });
    });

    slider.on('updated', () => {
      if (!mainRef.current) return;
      addClickEvents();
    });
  };
}

interface TourPreviewSliderProps {
  sliderImages: TourImage[];
  defaultSelectSlide?: number;
}

type PageVariant = 'mobile' | 'desktop';

const TourPreviewSlider = ({
  sliderImages,
  defaultSelectSlide,
}: TourPreviewSliderProps) => {
  const [currentSlide, setCurrentSlide] = useState<number>(
    defaultSelectSlide || 0
  );
  const variant = useBreakpointValue<PageVariant>({
    base: 'mobile',
    lg: 'desktop',
  });
  const isMobile = variant === 'mobile';

  const [sliderRef, sliderInstanceRef] = useKeenSlider<HTMLDivElement>({
    initial: defaultSelectSlide || 0,
    slides: {
      spacing: 8,
      perView: isMobile ? 1.05 : 1,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track?.details?.rel);
    },
  });

  const [thumbnailRef, thumbnailInstanceRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      slides: {
        perView: isMobile ? 6 : 13,
      },
    },
    [ThumbnailPlugin(sliderInstanceRef)]
  );

  useEffect(() => {
    sliderInstanceRef.current?.update();
    thumbnailInstanceRef.current?.update();
    setCurrentSlide(0);
  }, [sliderImages, sliderInstanceRef, thumbnailInstanceRef]);

  const firstSlide = currentSlide === 0;
  const lastSlide = currentSlide === sliderImages?.length - 1;

  const prevSlide = () => sliderInstanceRef.current?.prev();
  const nextSlide = () => sliderInstanceRef.current?.next();

  return (
    <Stack pos="relative" spacing="4">
      {sliderImages && (
        <Stack
          ref={sliderRef}
          direction="row"
          className="keen-slider"
          borderRadius="lg"
          borderRightRadius={{ base: 'none', lg: 'lg' }}
          spacing="0"
        >
          {sliderImages?.map((image) => (
            <Box h={{ base: '30rem', lg: '33rem' }} key={image.id}>
              <Image
                src={image.src}
                alt={image.name}
                objectPosition="center"
                objectFit="cover"
                className="keen-slider__slide"
                w="full"
                h="full"
                borderRadius="lg"
              />
            </Box>
          ))}
        </Stack>
      )}
      <Box color="gray.500">
        {sliderImages && sliderImages[currentSlide]?.name}
      </Box>
      <ArrowBtn
        icon={<LeftArrow />}
        right="100%"
        handleClick={prevSlide}
        disabled={firstSlide}
      />
      <ArrowBtn
        icon={<RightArrow />}
        left="100%"
        handleClick={nextSlide}
        disabled={lastSlide}
      />
      <Box>
        {sliderImages && (
          <Stack
            ref={thumbnailRef}
            direction="row"
            spacing={{ base: '1', lg: '2' }}
            className="keen-slider"
            h="56px"
            sx={{
              '-webkit-mask-image': {
                base: 'inherit',
                md: 'linear-gradient(to right, rgba(0,0,0,1) 84%, rgba(0,0,0,0))',
              },
            }}
          >
            {sliderImages.map((image) => (
              <Image
                key={`cardImage__${image.id}`}
                src={image.url}
                alt={image.name}
                objectFit="cover"
                objectPosition="center"
                className="keen-slider__slide"
                borderRadius="lg"
                w="full"
                h="full"
                cursor="pointer"
                transition="transform 0.1s ease"
              />
            ))}
          </Stack>
        )}
      </Box>
    </Stack>
  );
};

//TODO This doesn't need to be a separate component, you could extend the current
// Carousel component to accept a new property called "thumbnailReference"
// and add the thumbnail plugin, but this will spend a considerable time.
export function TourPreview({
  tour,
  onClose,
  isOpen,
  currentSelectImg,
}: TourPreviewProps) {
  const { title } = tour;
  const { t } = useTranslation('common');
  const [sliderImages, setSliderImages] = useState<TourImage[]>(tour.images);

  useEffect(() => {
    setSliderImages(tour.images);
  }, [tour.images, isOpen]);

  return (
    <Modal onClose={onClose} isOpen={isOpen} size="full" isCentered>
      <ModalContent py={{ base: '6', lg: '12' }} px={{ base: '0', lg: '48' }}>
        <ModalBody
          position="relative"
          w="full"
          h="full"
          maxH="100vh"
          overflow={{ base: 'hidden', lg: 'inherit' }}
          paddingInlineEnd={{ base: '0', lg: '6' }}
        >
          <Flex
            justifyContent={{ base: 'flex-start', lg: 'space-between' }}
            alignItems="center"
          >
            <Button
              leftIcon={LeftArrow}
              display={{ base: 'inherit', lg: 'none' }}
              ml="-2"
              mr="1"
              onClick={onClose}
            />
            <Flex flexDirection="column" overflow="hidden">
              <Text
                fontSize="xl"
                lineHeight="short"
                fontWeight="bold"
                display={{ base: 'inherit', lg: 'none' }}
              >
                {t('tourPreview.photos')}
              </Text>
              <Heading
                as="h4"
                fontSize={{ base: 'sm', lg: 'xl' }}
                color={{ base: 'gray.500', lg: 'gray.700' }}
                fontWeight={{ base: 'normal', lg: 'bold' }}
                lineHeight="7"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                overflow="hidden"
                w="full"
              >
                {title}
              </Heading>
            </Flex>
            <Button
              variant="outline"
              leftIcon={Close}
              display={{ base: 'none', lg: 'inherit' }}
              onClick={onClose}
            />
          </Flex>
          <Divider
            orientation="horizontal"
            borderColor="gray.400"
            w="full"
            display={{ base: 'inherit', lg: 'none' }}
            opacity="1"
          />
          <TourPreviewTabs
            tourImages={tour.images}
            handleUpdateImages={setSliderImages}
          />
          <TourPreviewSlider
            sliderImages={sliderImages || []}
            defaultSelectSlide={currentSelectImg}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default TourPreview;
