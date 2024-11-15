import { ReactNode, useEffect, useState } from 'react';
import { default as NextLink } from 'next/link';
import {
  Box,
  Button,
  Flex,
  HStack,
  Link as ChakraLink,
  LinkProps,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  Stack,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Select,
  Square,
  Divider,
  Center,
  Spacer,
  Show,
  Hide,
  Heading,
  Avatar,
  Slide,
  BoxProps,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import {
  Dropdown,
  AccountEmpty,
  Favorite,
  Cart,
  Google,
  AltFacebook,
  FullTTGLogo,
  TTGLogo,
} from '@visit/shared/ui';
import { Search } from '@icon-park/react';
import { useTranslation } from 'next-i18next';
import { City, User } from '@visit/ecomm-lib/shared/data-access';
import TopDestinations from '../top-destinations/top-destinations';
import { PopularAttractions } from '../top-attractions/top-attractions';

// Let's create a custom Link component composed by a wrapping NextJS link and a Chakra Link with its props
// TODO this should be in the shared-ui lib
export interface NavLink extends LinkProps {
  href?: string;
  children?: ReactNode;
  rest?: unknown;
}
const NavLink = ({ href = '#', children, ...rest }: NavLink) => (
  <NextLink href={href} passHref>
    <ChakraLink {...rest}>{children}</ChakraLink>
  </NextLink>
);

// TODO Chakra Menu if does not have isLazy throws a react hydration mismatch error
// check how isLazy can affect the SEO due to important values within the menu/dropdowns
// TODO this Logo should be in another place, but I have not seen the logo in another view, only in the header/navbar
// TODO: TO REMOVE the Show and Hide components, Oleh needs to check the following issue: when I use the same SVG twice in the page wrapped in a div each one, and
// one of  those wrapping divs has the style display: none, the other SVG disappears too (the element is still in the HTML, but not
// rendered, so, I guess it is a kind of duplicated ID plus something else).
// TODO PERFORMANCE IMPROVEMENT: Resolve the TODO above
const Logo = () => {
  return (
    <Stack direction={{ base: 'row', lg: 'row' }}>
      <Square display={{ base: 'none', xl: 'initial' }}>
        <FullTTGLogo />
      </Square>
      <Square display={{ base: 'initial', xl: 'none' }}>
        <TTGLogo />
      </Square>
    </Stack>
  );
};

export interface NavbarProps extends BoxProps {
  isLogged: boolean;
  user?: User;
  cities: City[];
  isVisibleCallback?: (isVisible: boolean) => void;
}

interface InternalNavbarProps extends NavbarProps {
  t: (message: string) => string;
}

// Passing height because of the implementation of the MobileNavbar with a nested flex
// the height does not cover the collapsable menu and that is why the z-index does not work
// for this section
// TODO if there is a better way to do this, please let me know it or implement it
const MobileNavbar = ({
  height,
  t,
  user,
  cities,
  isLogged = false,
}: InternalNavbarProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        alignItems={'center'}
        paddingX={{ base: '2', md: '14' }}
        borderBottomWidth={isOpen ? '1px' : ''}
        borderColor="gray.400"
        height={height}
        flex="1"
        paddingY="2"
      >
        <Box>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            onClick={isOpen ? onClose : onOpen}
          />
        </Box>
        <Box>
          <Center paddingLeft={1} paddingRight={4}>
            <Logo />
          </Center>
        </Box>
        <Divider height={5} orientation="vertical" borderColor={'gray.400'} />
        <Spacer />
        <Flex direction={'row'} minWidth="0">
          <Button aria-label={''} as={'a'} href="#cart" color="grey.700">
            <Flex direction="row">
              <Cart /> <Text> {t('navbar.cart')}</Text>
            </Flex>
          </Button>
          <Divider
            height={5}
            orientation="vertical"
            borderColor={'gray.400'}
            marginTop={'3'}
          />
          <Button aria-label={''} as={'a'} href="#search" color="grey.700">
            <Search size="22" />
          </Button>
        </Flex>
      </Flex>
      {/*Adding 2 more for paddingX to match the UX design*/}
      {isOpen ? (
        <Box paddingY="12" paddingX={{ base: '4', md: '16' }}>
          <Stack direction="column" as={'nav'} spacing={6} textAlign="left">
            <NavLink>
              <Heading as="h2" size="md">
                {t('navbar.destinations.title')}
              </Heading>
              <Text fontSize="sm" color="gray.500">
                {`${cities.length} ${t('navbar.destinations.description')}`}
              </Text>
            </NavLink>
            <NavLink>
              <Heading as="h2" size="md">
                {t('navbar.attractions.title')}
              </Heading>
              <Text fontSize="sm" color="gray.500">
                {/** TODO Number should come from an endpoint. We should implement ICU message format too to pass variables to messages */}
                {`${cities.length} ${t('navbar.attractions.description')}`}
              </Text>
            </NavLink>
            <NavLink>
              <HStack direction={'row'}>
                <Heading as="h2" size="md">
                  {t('navbar.wishlist.title')}
                </Heading>
                <Box
                  fontSize="12"
                  paddingX="2"
                  paddingY="0.5"
                  color="gray.100"
                  flex="0"
                  bg="primary.500"
                  borderRadius={3}
                >
                  {user?.wishlist.count}
                </Box>
              </HStack>

              <Text fontSize="sm" color="gray.500">
                {t('navbar.wishlist.description')}
              </Text>
            </NavLink>
            <Box>
              {/** TODO this might be an extra component because Chakra does not offer a select with left icon and inputgroup does not work */}
              {/** TODO the available currencies should come from a service + Provider to save some prop drilling */}
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  left="4"
                  width="min-content"
                  children={
                    <Center color="gray.500" paddingTop="2">
                      {t('navbar.currency')}:
                    </Center>
                  }
                />
                <Select
                  variant="outline"
                  cursor={'pointer'}
                  width="100%"
                  borderColor="gray.400"
                  size="lg"
                  sx={{ paddingLeft: '5.5rem' }}
                >
                  <option value="USD">$ USD</option>
                  <option value="EUR">€ EUR</option>
                </Select>
              </InputGroup>
            </Box>
            <Divider marginX="0" borderColor="gray.400" />
            {isLogged && (
              <>
                <Box>
                  <Flex flex="1">
                    <HStack color="gray.500">
                      <Avatar
                        background="gray.400"
                        color="gray.500"
                        size="xs"
                        name={user?.details.name}
                      ></Avatar>
                      <Text>{user?.details.name}</Text>
                    </HStack>
                    <Spacer />
                    <NavLink fontSize="sm" color="primary.600">
                      {t('navbar.signout')}
                    </NavLink>
                  </Flex>
                </Box>
                <HStack as={NavLink}>
                  <Box>{t('navbar.upcomingTours')}</Box>
                  <Box
                    fontSize="12"
                    px="2"
                    py="0.5"
                    color="gray.100"
                    flex="0"
                    bg="primary.500"
                    borderRadius={3}
                  >
                    {user?.tours.upcomingTours.count}
                  </Box>
                </HStack>
                <HStack as={NavLink}>
                  <Text>{t('navbar.orderHistory')}</Text>
                  <Text color="gray.500">({user?.orderHistory.count})</Text>
                </HStack>
                <NavLink>{t('navbar.accountDetails')}</NavLink>
                <NavLink>{t('navbar.giftCards')}</NavLink>
              </>
            )}
            {!isLogged && (
              <>
                <Stack spacing="2">
                  <Button
                    leftIcon={<Google />}
                    variant="outline"
                    size="lg"
                    fontSize="md"
                    px="12"
                    onClick={() => alert(123)}
                  >
                    {t('navbar.continueWithGoogle')}
                  </Button>
                  <Button
                    leftIcon={<AltFacebook />}
                    variant="outline"
                    size="lg"
                    fontSize="md"
                    px="12"
                  >
                    {t('navbar.continueWithFacebook')}
                  </Button>
                </Stack>
                <Stack
                  color="gray.500"
                  direction="row"
                  justify="center"
                  p={4}
                  marginX="20"
                >
                  <Divider
                    borderColor="gray.400"
                    orientation="horizontal"
                    paddingTop={3}
                    width="10"
                  />
                  <Text fontSize={14}>{t('navbar.or')}</Text>
                  <Divider
                    borderColor="gray.400"
                    orientation="horizontal"
                    paddingTop={3}
                    width="10"
                  />
                </Stack>
                <Stack spacing="2">
                  <Button
                    variant="gradient"
                    size="lg"
                    fontSize="md"
                    px="12"
                    color="gray.100"
                  >
                    {t('navbar.createAccount')}
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    fontSize="md"
                    color="primary.600"
                    px="12"
                  >
                    {t('navbar.signInWithEmail')}
                  </Button>
                </Stack>
              </>
            )}
          </Stack>
        </Box>
      ) : null}
    </>
  );
};

// Passing height because of the implementation of the MobileNavbar with a nested flex
// the height does not cover the collapsable menu and that is why the z-index does not work
// for this section
// TODO if there is a better way to do this, please let me know it or implement it
const DesktopNavbar = ({
  user,
  t,
  height,
  cities,
  isLogged = false,
}: InternalNavbarProps) => {
  return (
    <Flex
      height={height}
      alignItems={'center'}
      paddingY="2"
      paddingX={{ base: '2', md: '14' }}
    >
      <Box>
        <Center paddingLeft={1} paddingRight={4}>
          <Logo />
        </Center>
      </Box>
      <Divider height={5} orientation="vertical" borderColor={'gray.400'} />
      <HStack spacing={0}>
        <Dropdown variant="ghost" title={t('navbar.destinations.title')}>
          <Box p={6} bg="white" maxW="container.md">
            <TopDestinations cities={cities} variant="compact" />
          </Box>
        </Dropdown>
        <Dropdown variant="ghost" title={t('navbar.attractions.title')}>
          <Box p={6} bg="white" w="container.lg">
            <PopularAttractions cities={cities} />
          </Box>
        </Dropdown>
      </HStack>
      <Divider height={5} orientation="vertical" borderColor={'gray.400'} />
      <Box flex="2" paddingX="3">
        <InputGroup size={'lg'}>
          <InputLeftElement pointerEvents={'none'}>
            <Search size="18" />
          </InputLeftElement>
          <Input
            variant="outline"
            placeholder={t('navbar.searchPlaceholder')}
            bg="gray.300"
            _placeholder={{ fontSize: 'md', color: 'gray.500' }}
          />
        </InputGroup>
      </Box>
      <Spacer flex={{ base: 0, lg: 1 }} />
      <Stack direction={'row'} minWidth="0" spacing={0}>
        <Button aria-label={''} as={'a'} href="#favorites" color="grey.700">
          <Favorite />
        </Button>
        <Button aria-label={''} as={'a'} href="#cart" color="grey.700">
          <Cart /> <Text>{t('navbar.cart')}</Text>
        </Button>
        <Select variant="ghost" cursor={'pointer'} width="max-content">
          <option value="USD">$ USD</option>
          <option value="EUR">€ EUR</option>
        </Select>
        <Menu isLazy>
          <MenuButton as={Button} cursor={'pointer'}>
            <AccountEmpty />
          </MenuButton>
          <MenuList
            shadow={'shadow.100'}
            textAlign="center"
            padding={!isLogged ? '4' : '0'}
            width={80}
          >
            {isLogged && (
              <>
                <MenuItem paddingX="4" paddingY="3">
                  <Box flex="1">{t('navbar.upcomingTours')}</Box>
                  <Box
                    fontSize="12"
                    px="2"
                    py="0.5"
                    color="gray.100"
                    flex="0"
                    bg="primary.500"
                    borderRadius={3}
                  >
                    {user?.tours.upcomingTours.count}
                  </Box>
                </MenuItem>
                <MenuItem paddingX="4" paddingY="3">
                  {t('navbar.orderHistory')}
                </MenuItem>
                <MenuItem paddingX="4" paddingY="3">
                  {t('navbar.accountDetails')}
                </MenuItem>
                <MenuItem paddingX="4" paddingY="3">
                  {t('navbar.giftCards')}
                </MenuItem>
                <MenuDivider marginY={0} />
                <MenuItem paddingX="4" paddingY="3">
                  <Box textAlign={'center'} flex="1">
                    {t('navbar.logout')}
                  </Box>
                </MenuItem>
              </>
            )}
            {!isLogged && (
              <>
                <MenuItem
                  as={Button}
                  leftIcon={<Google />}
                  variant="outline"
                  size="lg"
                  fontSize="md"
                  px="12"
                  marginBottom={2}
                  onClick={() => alert(123)}
                >
                  {t('navbar.continueWithGoogle')}
                </MenuItem>
                <MenuItem
                  as={Button}
                  leftIcon={<AltFacebook />}
                  variant="outline"
                  size="lg"
                  fontSize="md"
                  px="12"
                  marginBottom={2}
                >
                  {t('navbar.continueWithFacebook')}
                </MenuItem>
                <Stack
                  color="gray.500"
                  direction="row"
                  justify="center"
                  p={4}
                  marginX="20"
                >
                  <Divider
                    borderColor="gray.400"
                    orientation="horizontal"
                    paddingTop={3}
                  />
                  <Text fontSize={14}>{t('navbar.or')}</Text>
                  <Divider
                    borderColor="gray.400"
                    orientation="horizontal"
                    paddingTop={3}
                  />
                </Stack>
                <MenuItem
                  as={Button}
                  variant="gradient"
                  size="lg"
                  fontSize="md"
                  px="12"
                  color="gray.100"
                  marginBottom={2}
                  _focus={{
                    bg: 'radial-gradient(56.63% 191.25% at 16.36% -23.75%, #F40051E6 0%, #F40051 100%)',
                  }}
                >
                  {t('navbar.createAccount')}
                </MenuItem>
                <MenuItem
                  as={Button}
                  variant="outline"
                  size="lg"
                  fontSize="md"
                  color="primary.600"
                  px="12"
                >
                  {t('navbar.signInWithEmail')}
                </MenuItem>
              </>
            )}
          </MenuList>
        </Menu>
      </Stack>
    </Flex>
  );
};

export function Navbar({
  isVisibleCallback,
  user,
  cities,
  isLogged = false,
  ...rest
}: NavbarProps) {
  const { t } = useTranslation('common');
  const { height, h, ...otherProps } = rest;

  // Things for the "hide when scroll down and show when scroll up"
  const [position, setPosition] = useState(
    typeof window !== 'undefined' ? window.pageYOffset : 0
  );
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleScroll = () => {
        const moving = window.pageYOffset;
        const isVisible = position > moving;
        setVisible(isVisible);
        setPosition(moving);

        if (isVisibleCallback) {
          isVisibleCallback(isVisible);
        }
      };
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
    return;
  });

  return (
    <Slide direction="top" in={visible}>
      <Box bg="gray.100" {...otherProps}>
        <Hide above="lg">
          <MobileNavbar
            height={height ?? h}
            user={user}
            t={t}
            cities={cities}
            isLogged={isLogged}
          />
        </Hide>
        <Show above="lg">
          <DesktopNavbar
            height={height ?? h}
            user={user}
            t={t}
            cities={cities}
            isLogged={isLogged}
          />
        </Show>
      </Box>
    </Slide>
  );
}

export default Navbar;
