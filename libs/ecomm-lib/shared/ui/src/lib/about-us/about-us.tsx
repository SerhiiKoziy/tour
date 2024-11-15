import { useTranslation } from 'next-i18next';
import {
  Box,
  Center,
  Grid,
  GridItem,
  Heading,
  HStack,
  Square,
  Stack,
} from '@chakra-ui/react';
import { EmotionHappy, Lightning } from '@icon-park/react';
import { Discover } from '@visit/shared/ui';

// TODO icon background should be in the theme file
// TODO size for icon should be in the theme file
// TODO icon fill should be in the theme file
export function AboutUs() {
  const { t } = useTranslation('common');

  return (
    <Grid
      templateRows={{ base: 'repeat(2)', md: 'repeat(1, 1fr)' }}
      templateColumns={{ base: 'repeat(1)', md: 'repeat(2, 1fr)' }}
      borderWidth="1px"
      borderRadius="lg"
      borderColor="gray.400"
      bg="gray.100"
      overflow="hidden"
    >
      <GridItem
        paddingStart={{ base: '6', lg: '24' }}
        paddingEnd={{ base: '6', lg: '14' }}
        paddingY={{ base: '6', lg: '12' }}
        width="100%"
        height={{ base: '100%', lg: '100%' }}
        style={{ position: 'relative' }}
      >
        <Center width={{ lg: '100%' }} height={{ lg: '100%' }}>
          <Box>
            <Heading as="h2" size="xl" paddingBottom={2}>
              {t('aboutUs.title')}
            </Heading>
            <Box color="gray.500" textAlign={'left'}>
              {t('aboutUs.aboutUsDetails')}
            </Box>
          </Box>
        </Center>
      </GridItem>
      <GridItem
        paddingStart={{ base: '6', lg: '14' }}
        paddingEnd={{ base: '6', lg: '24' }}
        paddingY={{ base: '6', lg: '12' }}
        width="100%"
        height={{ base: '100%', lg: '100%' }}
        style={{ position: 'relative' }}
      >
        <Stack spacing="6">
          <HStack padding={1} spacing={6}>
            <Square size="64px" bg="rgba(237, 56, 54, 0.1);" borderRadius="lg">
              <Lightning
                theme="two-tone"
                size="32"
                fill={['#ED3836', 'rgba(237, 56, 54, 0.1)']}
              />
            </Square>
            <Stack spacing="1">
              <Heading as="h2" size="lg">
                {t('aboutUs.yearsInTourism')}
              </Heading>
              <Box color="gray.500">{t('aboutUs.yearsInTourismDetails')}</Box>
            </Stack>
          </HStack>
          <HStack padding={1} spacing={6}>
            <Square size="64px" bg="rgba(237, 56, 54, 0.1);" borderRadius="lg">
              <Discover
                size="34"
                fill={['#ED3836', 'rgba(237, 56, 54, 0.1)']}
              />
            </Square>
            <Stack spacing="1">
              <Heading as="h2" size="lg">
                {t('aboutUs.uniqueTours')}
              </Heading>
              <Box color="gray.500">{t('aboutUs.uniqueToursDetails')}</Box>
            </Stack>
          </HStack>
          <HStack padding={1} spacing={6}>
            <Square size="64px" bg="rgba(237, 56, 54, 0.1);" borderRadius="lg">
              <EmotionHappy
                theme="two-tone"
                size="32"
                fill={['#ED3836', 'rgba(237, 56, 54, 0.1)']}
              />
            </Square>
            <Stack spacing="1">
              <Heading as="h2" size="lg">
                {t('aboutUs.happyCustomers')}
              </Heading>
              <Box color="gray.500">{t('aboutUs.happyCustomersDetails')}</Box>
            </Stack>
          </HStack>
        </Stack>
      </GridItem>
    </Grid>
  );
}

export default AboutUs;
