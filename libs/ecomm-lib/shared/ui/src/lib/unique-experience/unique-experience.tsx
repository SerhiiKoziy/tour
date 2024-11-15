import { useTranslation } from 'next-i18next';
import { Box, Flex, Image, SimpleGrid, Stack, Text } from '@chakra-ui/react';

import { ReactComponent as PostSVG } from './assets/post.svg';
import { ReactComponent as IdeaSVG } from './assets/idea.svg';
import { ReactComponent as SupportSVG } from './assets/support.svg';
import { ReactComponent as OpenMapSVG } from './assets/open-map.svg';

interface UniqueExperienceCardProps {
  title: string;
  subtitle: string;
  image: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

const UniqueExperienceCard = ({
  title,
  subtitle,
  image,
}: UniqueExperienceCardProps) => (
  <Flex
    pos="relative"
    direction="column"
    p={8}
    gap={2}
    bg="gray.200"
    overflow="hidden"
    borderRadius="xl"
    border="1px solid"
    borderColor="gray.400"
    h={{ base: '22.5rem', sm: '30rem' }}
  >
    <Text
      maxWidth={{ base: 'xs' }}
      color="gray.700"
      fontWeight="bold"
      fontSize={{ base: 'xl' }}
      lineHeight={{ sm: 7 }}
    >
      {title}
    </Text>
    <Text
      maxWidth={{ base: 'xs' }}
      color="gray.500"
      fontWeight="normal"
      fontSize={{ base: 'md' }}
      lineHeight={{ sm: 6 }}
    >
      {subtitle}
    </Text>
    <Image
      as={image}
      alt={title}
      position="absolute"
      left="50%"
      transform="translateX(-50%)"
      bottom={{ base: -12, sm: -24 }}
      boxSize={{ base: '75%', sm: '90%' }}
    />
  </Flex>
);

export function UniqueExperience() {
  const { t } = useTranslation('common');

  return (
    <Box>
      <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
        <Stack direction="column" spacing={4}>
          <Text
            color="gray.700"
            fontWeight="extrabold"
            lineHeight={{ base: 10 }}
            fontSize={{ base: '3xl', sm: 32 }}
            marginBottom={{ base: 6, sm: 14 }}
            maxWidth={{ base: 'xs', sm: 'sm' }}
          >
            {t('uniqueExperience.title')}
          </Text>
          <UniqueExperienceCard
            title={t('uniqueExperience.post.title')}
            subtitle={t('uniqueExperience.post.subtitle')}
            image={PostSVG}
          />
          <UniqueExperienceCard
            title={t('uniqueExperience.idea.title')}
            subtitle={t('uniqueExperience.idea.subtitle')}
            image={IdeaSVG}
          />
        </Stack>
        <Stack direction="column" spacing={4}>
          <UniqueExperienceCard
            title={t('uniqueExperience.openMap.title')}
            subtitle={t('uniqueExperience.openMap.subtitle')}
            image={OpenMapSVG}
          />
          <UniqueExperienceCard
            title={t('uniqueExperience.support.title')}
            subtitle={t('uniqueExperience.support.subtitle')}
            image={SupportSVG}
          />
        </Stack>
      </SimpleGrid>
    </Box>
  );
}

export default UniqueExperience;
