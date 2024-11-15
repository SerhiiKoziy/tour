import { useTranslation } from 'next-i18next';
import {
  Box,
  Center,
  Flex,
  GridItem,
  Heading,
  Hide,
  Input,
  InputGroup,
  InputRightElement,
  Show,
  SimpleGrid,
} from '@chakra-ui/react';
import { Check } from '@icon-park/react';
import { Button } from '@visit/shared/ui';
import Image, { StaticImageData } from 'next/image';
import defaultImage from './subscribe-banner-image.png';

// helper variable we do not need to re-declare each time a component is rendered
// each value was calculated checking how it look on a browser
const valuesMap = {
  sm: {
    size: 8,
    inputPaddingRight: 32,
    paddingRight: 10,
    width: 20,
    buttonHeight: 6,
  },
  md: {
    size: 10,
    inputPaddingRight: 32,
    paddingRight: 9,
    buttonHeight: 8,
    width: 20,
  },
  lg: {
    size: 12,
    inputPaddingRight: 32,
    paddingRight: 6,
    buttonHeight: 10,
    width: 24,
  },
  xl: {
    size: 14,
    inputPaddingRight: 32,
    paddingRight: 5,
    buttonHeight: 12,
    width: 24,
  },
};

export interface SubscribeBannerProps {
  onClickCallback?: () => unknown;
  inputSize?: keyof typeof valuesMap;
  image?: string | StaticImageData;
  isSubscribed?: boolean;
}

// TODO border radius should be in the theme file as a class/value
// TODO the border color should be gray.400 by default for all the app
// TODO the border width should be a variable in theme
// TODO there is a flicker when the cursor is over the gradient button (hover event)
// TODO should all the inputs have the same fontSize, fontWeight, and fontColor
// TODO fix when "Subscribe" text is too long. Maybe a text wrapper could work
// TODO determine default font size to apply it in all the app/content
// TODO check what is the font color by default
export function SubscribeBanner({
  onClickCallback,
  image = defaultImage,
  isSubscribed = false,
  inputSize = 'xl',
}: SubscribeBannerProps) {
  // The input + button structure should be in another component in the shared-ui lib because
  // Chakra UI does not have a good auto-position for the button within the input

  // The use of templateRows + templateColumns was the way I found to have same rows/columns
  // with the same height/width respectively
  const { size, paddingRight, buttonHeight, width, inputPaddingRight } =
    valuesMap[inputSize] ?? valuesMap['md'];

  const { t } = useTranslation('common');

  return (
    <SimpleGrid
      templateRows={{ base: 'repeat(2, 1fr)', md: 'repeat(1, 1fr)' }}
      templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
      borderWidth="1px"
      borderRadius="lg"
      borderColor="gray.400"
      bg="gray.300"
      overflow="hidden"
    >
      <GridItem
        width="100%"
        height={{ base: '100%', md: '100%' }}
        style={{ position: 'relative' }}
      >
        {image && (
          <Image
            src={image}
            layout="fill"
            objectFit="cover"
            alt={t('subscribe.subscribeBannerImage')}
          />
        )}
      </GridItem>
      <GridItem width="100%" height="100%">
        <Box paddingX={{ base: 6, md: 12 }} paddingY={{ base: 6, md: 14 }}>
          <Box>
            <Heading as="h2" size="lg" paddingBottom={2}>
              {t('subscribe.subscribeForDiscounts')}
            </Heading>
            <Box color="gray.500">{t('subscribe.youWillReceiveDiscounts')}</Box>
          </Box>
          {!isSubscribed && (
            <>
              <Box paddingTop={{ base: 6, md: 14 }}>
                <InputGroup>
                  <Input
                    bg={'gray.100'}
                    placeholder="johndoe@example.com"
                    borderWidth="1px"
                    borderRadius="xl"
                    borderColor="gray.400"
                    pr={{ lg: inputPaddingRight }}
                    height={{ lg: size }}
                    size={{ base: 'lg' }}
                    fontSize="16"
                    fontWeight="500"
                  />
                  <Show above="lg">
                    <InputRightElement
                      width={width}
                      height="100%"
                      paddingRight={paddingRight}
                    >
                      <Center>
                        <Button
                          variant="gradient"
                          borderRadius="lg"
                          color="gray.100"
                          fontSize="16"
                          fontWeight="500"
                          height={buttonHeight}
                          onClick={onClickCallback}
                        >
                          {t('subscribe.ctaText')}
                        </Button>
                      </Center>
                    </InputRightElement>
                  </Show>
                </InputGroup>
              </Box>
              <Hide above="lg">
                <Box paddingTop={{ base: 6, md: 14 }}>
                  <Button
                    variant="gradient"
                    borderRadius="lg"
                    color="gray.100"
                    fontSize="16"
                    fontWeight="500"
                    size="lg"
                    width="100%"
                    onClick={onClickCallback}
                  >
                    {t('subscribe.ctaText')}
                  </Button>
                </Box>
              </Hide>
            </>
          )}
          {isSubscribed && (
            <Box paddingTop={{ base: 6, md: 14 }}>
              <Flex
                paddingY={{ base: 5, xl: 1 }}
                paddingX={{ base: 6, xl: 1 }}
                direction={{ base: 'column', xl: 'row' }}
                bg="gray.100"
                borderWidth="1px"
                borderColor="gray.400"
                borderRadius="lg"
                textAlign="center"
              >
                <Center padding={3}>
                  <Check fill="green" />
                </Center>
                <Center padding={1}>{t('subscribe.subscribed')}</Center>
                <Center padding={1}>{t('subscribe.subscriptionThanks')}</Center>
              </Flex>
            </Box>
          )}
        </Box>
      </GridItem>
    </SimpleGrid>
  );
}

export default SubscribeBanner;
