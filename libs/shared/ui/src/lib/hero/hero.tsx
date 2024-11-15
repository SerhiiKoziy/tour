import { useTranslation } from 'next-i18next';
import {
  Stack,
  Flex,
  Text,
  Box,
  Container,
  BoxProps,
  useBoolean,
  useBreakpointValue,
} from '@chakra-ui/react';
import Button from '../button/button';
import { SearchBarTourDate } from '../dropdown/dropdown';

interface HeroContainerProps extends BoxProps {
  children?: JSX.Element | string;
}

interface HeroSearchProps extends BoxProps {
  title: string;
  subtitle: string;
  description: string;
}

const HERO_IMG = 'https://visit.com/tours/img/photo/home-hero.jpg';
const MAX_CHARACTERS_SM = 160;
const MAX_CHARACTERS_LG = 500;

export const Hero = ({ ...rest }) => {
  return (
    <HeroContainer {...rest}>
      <Container
        maxW={{ base: 'sm', sm: 'container.lg' }}
        px={{ base: 3, sm: 16 }}
        pb={{ base: 14, sm: 16 }}
        pos="relative"
      >
        <Stack direction="column" spacing={0}>
          <Text
            color="gray.100"
            fontWeight="bold"
            fontSize={{ base: 'lg', sm: '2xl' }}
            lineHeight={{ base: 6, sm: 8 }}
            letterSpacing="0.02em"
            textTransform="uppercase"
          >
            Need better opening text
          </Text>
          <Text
            color="gray.100"
            fontWeight="extrabold"
            fontSize={{ base: 40, sm: 56 }}
            lineHeight={{ base: '48px', sm: '72px' }}
          >
            Find the Best Tours & Attractions across the world
          </Text>
          <Box
            pos="absolute"
            bottom={{ base: -7, sm: -6 }}
            left={{ base: 4, sm: 16 }}
            right={{ base: 4, sm: 16 }}
          >
            <SearchBarTourDate backgroundColor="gray.100" />
          </Box>
        </Stack>
      </Container>
    </HeroContainer>
  );
};

export const HeroContainer = ({ children, ...rest }: HeroContainerProps) => {
  return (
    <Flex
      w="full"
      minH="360px"
      align="end"
      bgImage={`linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url('${HERO_IMG}')`}
      backgroundRepeat="no-repeat"
      backgroundPosition="center"
      backgroundSize={{ base: 'cover' }}
      {...rest}
    >
      {children}
    </Flex>
  );
};

export const HeroSearch = ({
  title,
  subtitle,
  description,
  ...rest
}: HeroSearchProps) => {
  const { t } = useTranslation('common');
  const [readMore, setReadMore] = useBoolean();

  const maxCharacters =
    useBreakpointValue({
      base: MAX_CHARACTERS_SM,
      sm: MAX_CHARACTERS_LG,
    }) || 0;

  const hasMoreText = description.length > maxCharacters;

  const textToShow = hasMoreText
    ? `${description.substring(0, maxCharacters)}${readMore ? '' : '...'}`
    : description;
  const hiddenText = hasMoreText
    ? description.substring(maxCharacters, description.length)
    : '';

  return (
    <HeroContainer minH="auto" {...rest}>
      <Container
        m={0}
        alignSelf="start"
        maxW={{ base: 'full', sm: 'container.md' }}
        pt={{ base: 10, sm: 12 }}
        px={{ base: 4, sm: 14 }}
        pb={{ base: 6, sm: 28 }}
      >
        <Stack spacing={4}>
          <Box>
            <Text
              color="gray.100"
              fontWeight="extrabold"
              fontSize={{ base: 40, sm: 56 }}
              lineHeight={{ base: '48px', sm: '72px' }}
            >
              {title}
            </Text>
            <Text
              color="gray.100"
              fontWeight="bold"
              fontSize={{ base: 'xl', sm: 'xl' }}
              lineHeight={{ base: 7, sm: 7 }}
            >
              {subtitle}
            </Text>
          </Box>
          <Text
            color="gray.100"
            fontWeight="medium"
            fontSize={{ base: 'md', sm: 'md' }}
            lineHeight={{ base: 6, sm: 6 }}
          >
            {textToShow}
            <Text as="span" display={readMore ? 'inline' : 'none'}>
              {hiddenText}
            </Text>
            {hasMoreText && (
              <Button
                py={0}
                color="white"
                variant="link"
                onClick={setReadMore.toggle}
              >
                {readMore
                  ? t('search.hero.readLess')
                  : t('search.hero.readMore')}
              </Button>
            )}
          </Text>
        </Stack>
      </Container>
    </HeroContainer>
  );
};

export default Hero;
