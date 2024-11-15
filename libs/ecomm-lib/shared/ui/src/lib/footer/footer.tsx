import { useTranslation } from 'next-i18next';
import { default as NextLink } from 'next/link';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  ButtonGroup,
  Container,
  Divider,
  Link as ChakraLink,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import {
  AmericanExpress,
  DinersClub,
  DiscoverCard,
  Facebook,
  Instagram,
  Jcb,
  Mastercard,
  Pinterest,
  Visa,
  Youtube,
} from '@visit/shared/ui';

interface FooterTitleProps {
  text: string;
}

const FooterTitle = ({ text }: FooterTitleProps) => {
  return (
    <Text fontSize="lg" fontWeight="700" color="subtle">
      {text}
    </Text>
  );
};

// TODO the border top width should be a variable in theme
// TODO the border color should be gray.400 by default for all the app
// TODO the paddingX values should be in the theme file to have a single measure for all the app
export function Footer() {
  const { t } = useTranslation('footer');
  const internationalContacts = t('contactInternational.contacts', {
    returnObjects: true,
  });

  return (
    <Container
      as="footer"
      role="contentinfo"
      maxWidth="100%"
      bg="gray.300"
      paddingX={{ base: '4', md: '40' }}
      borderTopWidth="1px"
      borderColor="gray.400"
    >
      <Stack
        direction="column"
        spacing={4}
        divider={
          <Box border="0">
            <Divider marginX="0" color="gray.400" />
          </Box>
        }
      >
        <SimpleGrid spacing="6" columns={{ base: 1, md: 4 }} py="10">
          <Stack spacing="6">
            <FooterTitle text={t('letsPartner')} />
            <Stack spacing="3" shouldWrapChildren>
              <NextLink href="#" passHref>
                <ChakraLink>{t('supplierSignup')}</ChakraLink>
              </NextLink>
              <NextLink href="#" passHref>
                <ChakraLink>{t('affiliatesAndResellers')}</ChakraLink>
              </NextLink>
              <NextLink href="#" passHref>
                <ChakraLink>{t('joinOurGuides')}</ChakraLink>
              </NextLink>
              <NextLink href="#" passHref>
                <ChakraLink>{t('travelAgents')}</ChakraLink>
              </NextLink>
              <NextLink href="#" passHref>
                <ChakraLink>{t('gitCards')}</ChakraLink>
              </NextLink>
            </Stack>
          </Stack>
          <Stack spacing="6">
            <FooterTitle text={t('privacyAndTerms')} />
            <Stack spacing="3" shouldWrapChildren>
              <NextLink href="/terms-conditions" passHref>
                <ChakraLink>{t('termsAndConditions')}</ChakraLink>
              </NextLink>
              <NextLink href="/privacy-policy" passHref>
                <ChakraLink>{t('privacyPolicy')}</ChakraLink>
              </NextLink>
              <NextLink href="/cancellation-policy" passHref>
                <ChakraLink>{t('cancellationPolicy')}</ChakraLink>
              </NextLink>
              <NextLink href="#" passHref>
                <ChakraLink>{t('travelInsurance')}</ChakraLink>
              </NextLink>
            </Stack>
          </Stack>
          <Stack spacing="6">
            <FooterTitle text={t('contactUs')} />
            <Stack spacing="3" shouldWrapChildren>
              <NextLink href="#" passHref>
                <ChakraLink>{t('contactEmail')}</ChakraLink>
              </NextLink>
              <NextLink href="#" passHref>
                <ChakraLink>{t('contactPhone')}</ChakraLink>
              </NextLink>
              <Accordion allowToggle>
                <AccordionItem border="0">
                  <AccordionButton p="0">
                    {t('contactInternational.description')}
                    <AccordionIcon />
                  </AccordionButton>
                  {Array.isArray(internationalContacts) &&
                    internationalContacts.map((contact: string) => (
                      <AccordionPanel key={contact} pb={0}>
                        {contact}
                      </AccordionPanel>
                    ))}
                </AccordionItem>
              </Accordion>
              <NextLink href="#" passHref>
                <ChakraLink>{t('pressContact')}</ChakraLink>
              </NextLink>
            </Stack>
          </Stack>
          <Stack spacing="6">
            <FooterTitle text={t('social')} />
            <Stack spacing="3" direction="row" shouldWrapChildren>
              <ButtonGroup
                justifyContent={{ sm: 'left', md: 'center' }}
                size={{ sm: '0', md: '3' }}
                p={{ sm: 'sm' }}
                mr={{ base: '3' }}
                variant="ghost"
                role="link"
              >
                <Button as="a" href="#" aria-label="Youtube">
                  <Youtube />
                </Button>
                <Button as="a" href="#" aria-label="Facebook">
                  <Facebook />
                </Button>
                <Button as="a" href="#" aria-label="Instagram">
                  <Instagram />
                </Button>
                <Button as="a" href="#" aria-label="Pinterest">
                  <Pinterest />
                </Button>
              </ButtonGroup>
            </Stack>
          </Stack>
        </SimpleGrid>
        <Stack
          py="10"
          justify="space-between"
          direction={{ base: 'column', md: 'row' }}
          align={{ base: 'left', md: 'center' }}
        >
          <Text fontSize="xs" color="gray.500">
            {t('copyright', { year: new Date().getFullYear() })}
          </Text>
          <ButtonGroup
            justifyContent={{ sm: 'left', md: 'center' }}
            size={{ sm: '0', md: '3' }}
            p={{ sm: 'sm' }}
            mr={{ base: '3' }}
            variant="ghost"
            role="link"
          >
            <Button as="a" href="#" aria-label="Discover">
              <DiscoverCard />
            </Button>
            <Button as="a" href="#" aria-label="Mastercard">
              <Mastercard />
            </Button>
            <Button as="a" href="#" aria-label="Visa">
              <Visa />
            </Button>
            <Button as="a" href="#" aria-label="Jcb">
              <Jcb />
            </Button>
            <Button as="a" href="#" aria-label="Diners Club">
              <DinersClub />
            </Button>
            <Button as="a" href="#" aria-label="American Express">
              <AmericanExpress />
            </Button>
          </ButtonGroup>
        </Stack>
      </Stack>
    </Container>
  );
}

export default Footer;
