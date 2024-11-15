import { useState } from "react";
import TourPreview from "../tour-preview/tour-preview";
import { FC, ReactNode } from "react";
import { useTranslation } from "next-i18next";
import {
  Box,
  Flex,
  Image as ChakraImage,
  Text,
  Center,
  Grid,
  GridItem,
  GridItemProps,
  SimpleGrid,
  BoxProps,
  useDisclosure,
} from "@chakra-ui/react";
import { Tour, TourImage } from "@visit/ecomm-lib/shared/data-access";

interface ImageWrapper extends GridItemProps {
  image: TourImage;
  children?: React.ReactNode;
  onOpenModal?: () => void;
}

interface HeroComponentProps {
  tour: Tour;
}

const ImageWrapper = ({ image, children, ...rest }: ImageWrapper) => (
  <GridItem position="relative" overflow="hidden" cursor="pointer" {...rest} h="full">
    <ChakraImage
      alt={image.name}
      src={image.url}
      objectFit="cover"
      objectPosition="center"
      w="full"
      h="full"
      fallbackSrc="https://via.placeholder.com/150"
    />
    {children}
  </GridItem>
);

const HeroImageGrid = ({ children }: { children: ReactNode }) => (
  <Grid
    gap="2px"
    templateRows="1fr 1fr"
    templateColumns="repeat(12, 1fr)"
    h="full"
    w="full"
    borderRadius="lg"
    overflow="hidden"
  >
    {children}
  </Grid>
);

const HeroImageOverlay = ({ children }: { children: ReactNode }) => (
  <Center
    bg="gradientOverlay.dark50"
    color="gray.100"
    pos="absolute"
    top={0}
    left={0}
    w="full"
    h="full"
  >
    <Text>{children}</Text>
  </Center>
);

const HeroImagesContainer: FC<BoxProps> = ({ children, ...rest }) => {
  return (
    <Box h={{ base: "56", lg: "80" }} {...rest}>
      <HeroImageGrid>{children}</HeroImageGrid>
    </Box>
  );
};

export function HeroTour({ tour }: HeroComponentProps) {
  const { images } = tour;
  const [currentSelectImg, setCurrentImg] = useState<number>(1);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const imagesInPreview = 4;
  const hiddenImagesCounter = images?.length - imagesInPreview;
  const countsImage = `+${hiddenImagesCounter}`;

  const handleOpenModal = (num: number) => {
    onOpen();
    setCurrentImg(num);
  };

  return (
    <HeroImagesContainer h={{ base: "56", lg: "80" }}>
      <ImageWrapper
        image={images[0] ?? null}
        colSpan={{ base: 12, lg: 8 }}
        rowSpan={{ base: 1, lg: 2 }}
        onClick={() => handleOpenModal(0)}
      />
      <ImageWrapper
        image={images[1] ?? null}
        colSpan={{ base: 4, lg: 4 }}
        rowSpan={1}
        onClick={() => handleOpenModal(1)}
      />
      <ImageWrapper
        image={images[2] ?? null}
        colSpan={{ base: 4, lg: 2 }}
        rowSpan={1}
        onClick={() => handleOpenModal(2)}
      />
      <ImageWrapper
        image={images[3] ?? null}
        colSpan={{ base: 4, lg: 2 }}
        rowSpan={1}
        onClick={() => handleOpenModal(3)}
      >
        {hiddenImagesCounter > 0 && (
          <HeroImageOverlay>{countsImage}</HeroImageOverlay>
        )}
      </ImageWrapper>

      <TourPreview
        tour={tour}
        onClose={onClose}
        isOpen={isOpen}
        currentSelectImg={currentSelectImg}
      />
    </HeroImagesContainer>
  );
}

export const HeroAttractions = ({ tour }: HeroComponentProps) => {
  const { t } = useTranslation("common");
  const { images } = tour;

  return (
    <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 6, lg: 4 }}>
      <Flex direction="column" justify="center">
        <Text
          color="gray.500"
          fontWeight="bold"
          fontSize={{ base: "lg", lg: "2xl" }}
          lineHeight={{ base: 6, lg: 8 }}
          letterSpacing="0.02em"
          textTransform="uppercase"
        >
          {t("topAttractions.thingsMustSee")}
        </Text>
        <Text
          fontWeight="extrabold"
          fontSize={{ base: 40, sm: 56 }}
          lineHeight={{ base: "48px", lg: "72px" }}
        >
          {t("topAttractions.tourGuyAttractions")}
        </Text>
      </Flex>

      <HeroImagesContainer h={60}>
        <ImageWrapper
          image={images[0] ?? null}
          colSpan={{ base: 12, lg: 6 }}
          rowSpan={{ base: 1, lg: 2 }}
        />
        <ImageWrapper
          image={images[1] ?? null}
          colSpan={{ base: 6, lg: 6 }}
          rowSpan={1}
        />
        <ImageWrapper
          image={images[2] ?? null}
          colSpan={{ base: 6, lg: 3 }}
          rowSpan={1}
        />
        <ImageWrapper
          image={images[3] ?? null}
          colSpan={{ base: 4, lg: 3 }}
          rowSpan={1}
          display={{ base: "none", lg: "block" }}
        />
      </HeroImagesContainer>
    </SimpleGrid>
  );
};

export default HeroTour;
