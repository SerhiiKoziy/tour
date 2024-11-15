import React, { useState } from 'react';

import i18nConfig from '../next-i18next.config';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import {
  Text,
  Flex,
  Stack,
  Container,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react';
import {
  Button,
  ToogleButton,
  Dropdown,
  GuestsLabel,
  TourCard,
  TourRowCard,
  PriceLabel,
  RatingLabel,
  DurationLabel,
  TagLabel,
  DestinationCard,
  DestinationAllCard,
  AttractionCard,
  RegularSearchBar,
  SearchBarTourDate,
  TourDatePicker,
  ProductDatePicker,
  RegularDatePicker,
  RegularCalendarPicker,
  Guests,
  Sort,
  Hero,
  HeroSearch,
  DesktopPagination,
  MobilePagination,
} from '@visit/shared/ui';

// Icons
import {
  Cart,
  Plus,
  Minus,
  AccountEmpty,
  Favorite,
} from '@visit/shared/ui';
import { ArrowLeft, ArrowRight } from '@icon-park/react';

import {
  Tour,
  fetchTours,
  City,
  fetchMostPopularCities,
  wrapper,
} from '@visit/ecomm-lib/shared/data-access';
import {
  TopDestinations,
  SearchSidebarDesktop,
  SearchSidebarMobile,
  SearchDefaultFilter,
} from '@visit/ecomm-lib/shared/ui';
import { useTranslation } from 'next-i18next';

interface StyleGuideProps {
  tours: Tour[];
  cities: City[];
}

const StyleGuideText = ({ children }) => (
  <Text fontSize="sm" color="purple.400">
    {children}
  </Text>
);

const StyleGuide = ({ tours, cities }: StyleGuideProps) => {
  const demoClick = () => console.log('Clicked button');

  const { t } = useTranslation('common');

  const [page1, setPage1] = useState(1);
  const [page2, setPage2] = useState(1);
  const [page3, setPage3] = useState(1);
  const [page4, setPage4] = useState(1);
  const [page5, setPage5] = useState(1);
  const [page6, setPage6] = useState(2);
  const [page7, setPage7] = useState(10);
  const [page8, setPage8] = useState(19);
  const [page9, setPage9] = useState(20);

  return (
    <Flex h="1" w="100%" minH="100vh" direction="column">
      <Flex w="full" backgroundColor="gray.200" pb={20}>
        <Hero />
      </Flex>

      <Flex w="full" direction="column" backgroundColor="gray.200" pb={20}>
        <HeroSearch
          title="The Best Rome Tours"
          subtitle="Don’t miss out on Rome’s deep history with our local guides"
          description="The reason we have the best Rome tours is simple: we work with the best guides in the city and get those guides the best access so they can give a great tour. Specializing in Colosseum tours and Vatican tours, we make it our mission to select only the most educated and charismatic guides in Rome who are passionate about what they do. Our product team is able to source access to restricted areas, skip-the-line entry, and provide superior customer service all to make your trip to Rome trip memorable"
        />
        <Flex px={14}>
          <SearchSidebarDesktop>
            <SearchDefaultFilter />
            <SearchDefaultFilter />
          </SearchSidebarDesktop>
        </Flex>
        <Flex
          w="full"
          p={4}
          gap={4}
          bg="white"
          display={{ base: 'flex', sm: 'none' }}
        >
          <Button
            flexGrow={1}
            size="lg"
            fontSize="md"
            variant="outline"
            colorScheme="gray"
            leftIcon={Sort}
          >
            Sort
          </Button>
          <SearchSidebarMobile>
            <SearchDefaultFilter />
            <SearchDefaultFilter />
          </SearchSidebarMobile>
        </Flex>
      </Flex>

      <Container maxW={{ base: 'xs', sm: 'container.lg' }} py={20} px={0}>
        <Text
          fontWeight={900}
          fontSize={{ base: 'md', md: '2xl' }}
          mb={8}
          align="center"
        >
          TTG Style Guide
        </Text>
        <Text fontWeight={700} fontSize={{ base: 'md', md: '2xl' }} mb={8}>
          Buttons and CTAs
        </Text>

        <SimpleGrid
          columns={{ base: 1, sm: 4 }}
          spacing={{ base: 20, sm: 10 }}
          mb={12}
          alignItems="start"
        >
          <Stack direction="column" spacing={4}>
            <Stack direction="row" align="center">
              <Button size="xs" variant="gradient" onClick={demoClick}>
                Button
              </Button>
              <StyleGuideText>Button Primary / Default</StyleGuideText>
            </Stack>
            <Stack direction="row" align="center">
              <Button size="sm" variant="gradient" onClick={demoClick}>
                Button
              </Button>
              <StyleGuideText>Button Primary / Default</StyleGuideText>
            </Stack>
            <Stack direction="row" align="center">
              <Button size="md" variant="gradient" onClick={demoClick}>
                Button
              </Button>
              <StyleGuideText>Button Primary / Default</StyleGuideText>
            </Stack>
            <Stack direction="row" align="center">
              <Button size="lg" variant="gradient" onClick={demoClick}>
                Button
              </Button>
              <StyleGuideText>Button Primary / Default</StyleGuideText>
            </Stack>
            <Stack direction="row" align="center">
              <Button isDisabled variant="gradient" onClick={demoClick}>
                Button
              </Button>
              <StyleGuideText>Button Primary / Disabled</StyleGuideText>
            </Stack>
          </Stack>

          <Stack direction="column" spacing={4}>
            <Stack direction="row" align="center">
              <Button
                variant="outline"
                colorScheme="primary"
                onClick={demoClick}
              >
                Button
              </Button>
              <StyleGuideText>Button Secondary / Default</StyleGuideText>
            </Stack>
          </Stack>

          <Stack direction="row" align="center">
            <Button variant="outline" colorScheme="gray" onClick={demoClick}>
              Button
            </Button>
            <StyleGuideText>Button White / Default</StyleGuideText>
          </Stack>

          <Stack direction="column" spacing={4}>
            <Stack direction="row" align="center">
              <Button variant="outline" leftIcon={Plus} onClick={demoClick} />
              <StyleGuideText>Button Ghost / Default</StyleGuideText>
            </Stack>
            <Stack direction="row" align="center">
              <Button
                variant="outline"
                colorScheme="gray"
                leftIcon={Cart}
                onClick={demoClick}
              >
                Cart
              </Button>
              <StyleGuideText>Button Ghost / Default</StyleGuideText>
            </Stack>
          </Stack>
        </SimpleGrid>

        <SimpleGrid
          columns={{ base: 1, sm: 4 }}
          spacing={{ base: 20, sm: 5 }}
          mb={12}
          alignItems="start"
        >
          <Stack direction="column" align="start" spacing={4}>
            <Stack spacing={2} w="full">
              <StyleGuideText>Dropdown / Default</StyleGuideText>
              <Dropdown title="Dropdown" items={['Item 1', 'Item 2']} />
            </Stack>
            <Stack spacing={2} w="full">
              <StyleGuideText>Dropdown / Ghost</StyleGuideText>
              <Dropdown
                title="Dropdown"
                variant="ghost"
                items={['Item 1', 'Item 2']}
              />
            </Stack>
            <Stack spacing={2} w="full">
              <StyleGuideText>Dropdown / Custom Variant</StyleGuideText>
              <Dropdown
                title="Dropdown"
                variant="gradient"
                items={['Item 1']}
              />
            </Stack>
            <Stack spacing={2} w="full">
              <StyleGuideText>Dropdown / Custom Button</StyleGuideText>
              <Dropdown
                title="Dropdown"
                items={['Item 1']}
                w="full"
                textAlign="left"
                leftIcon={<Guests />}
              />
            </Stack>
            <Stack spacing={2} w="full">
              <StyleGuideText>
                Dropdown / Custom Children Component
              </StyleGuideText>
              <Dropdown
                title="Dropdown"
                w="full"
                textAlign="left"
                leftIcon={<Guests />}
              >
                <Flex p={6} maxW="container.md">
                  <TopDestinations cities={cities} variant="compact" />
                </Flex>
              </Dropdown>
            </Stack>
          </Stack>

          <Stack direction="column" spacing={4}>
            <Stack direction="row" align="center">
              <Button variant="ghost" leftIcon={Cart} onClick={demoClick} />
              <StyleGuideText>Cart / Default</StyleGuideText>
            </Stack>
            <Stack direction="row" align="center">
              <ToogleButton
                variant="ghost"
                colorScheme="primary"
                leftIcon={Favorite}
                onClick={demoClick}
              />
              <StyleGuideText>Favourite / Disabled</StyleGuideText>
            </Stack>
            <Stack direction="row" align="center">
              <Button
                variant="ghost"
                isDisabled
                leftIcon={AccountEmpty}
                onClick={demoClick}
              />
              <StyleGuideText>Account / Disabled</StyleGuideText>
            </Stack>
          </Stack>

          <Stack direction="row" align="center">
            <Button
              variant="outline"
              colorScheme="gray"
              leftIcon={ArrowLeft}
              onClick={demoClick}
            />
            <Button
              variant="outline"
              colorScheme="gray"
              leftIcon={ArrowRight}
              onClick={demoClick}
            />
            <StyleGuideText>Slider Arrows</StyleGuideText>
          </Stack>

          <Stack direction="row" align="center">
            <Button
              colorScheme="darkGray"
              leftIcon={Minus}
              onClick={demoClick}
            />
            <Text fontSize="sm">2</Text>
            <Button
              colorScheme="darkGray"
              leftIcon={Plus}
              onClick={demoClick}
            />
            <StyleGuideText>Stepper</StyleGuideText>
          </Stack>
        </SimpleGrid>

        <Text fontWeight={700} fontSize={{ base: 'md', md: '2xl' }} mb={8}>
          Search Bar and Date Pickers
        </Text>

        <Text fontWeight={700} fontSize={{ base: 'md', md: 'lg' }} mb={4}>
          Regular Search Bar
        </Text>

        <RegularSearchBar mb={4} />

        <Text fontWeight={700} fontSize={{ base: 'md', md: 'lg' }} mb={4}>
          Tour Date Search Bar
        </Text>

        <SearchBarTourDate mb={12} />

        <SimpleGrid
          columns={{ base: 1, sm: 4 }}
          spacing={{ base: 20, sm: 10 }}
          mb={12}
          alignItems="start"
        >
          <Stack direction="column" spacing={2}>
            <Text fontWeight={700} fontSize="md">
              Regular Date Picker
            </Text>
            <RegularDatePicker initialDate={new Date()} />
          </Stack>
          <Stack direction="column" spacing={2}>
            <Text fontWeight={700} fontSize="md">
              Without initial Date
            </Text>
            <RegularDatePicker />
          </Stack>
          <Stack direction="column" spacing={2}>
            <Text fontWeight={700} fontSize="md">
              Tour Date Picker
            </Text>
            <TourDatePicker />
          </Stack>
          <Stack direction="column" spacing={2}>
            <Text fontWeight={700} fontSize="md">
              Product Details Picker
            </Text>
            <ProductDatePicker />
          </Stack>
        </SimpleGrid>

        <SimpleGrid
          columns={{ base: 1, sm: 4 }}
          spacing={{ base: 20, sm: 10 }}
          mb={12}
          alignItems="start"
        >
          <Stack direction="column" spacing={2}>
            <Text fontWeight={700} fontSize="md">
              Calendar Month Picker
            </Text>
            <RegularCalendarPicker multiple onlyMonthPicker />
          </Stack>
        </SimpleGrid>

        <Text fontWeight={700} fontSize={{ base: 'md', md: '2xl' }} mb={8}>
          Cards & Rows
        </Text>

        <Text fontWeight={700} fontSize="md" mb={3}>
          Labels
        </Text>
        <SimpleGrid
          columns={{ base: 1, sm: 4 }}
          spacing={{ base: 20, sm: 10 }}
          mb={12}
          alignItems="start"
        >
          <Stack direction="column" spacing={3}>
            <PriceLabel currentPrice="123" />
            <PriceLabel hasDiscount={true} oldPrice="189" currentPrice="123" />
          </Stack>

          <Stack direction="column" spacing={4}>
            <RatingLabel rating={4.9} count={232} />
            <DurationLabel duration={'7.30'} />
            <GuestsLabel guests={15} />
          </Stack>

          <Stack direction="column" spacing={4} align="start">
            <TagLabel colorScheme="blue">Skip the line</TagLabel>
            <TagLabel colorScheme="blue">Water Activity</TagLabel>
            <TagLabel colorScheme="blue">Exclusive Access</TagLabel>
            <TagLabel colorScheme="red">Covid Test</TagLabel>
            <TagLabel colorScheme="green">Free Cancellation</TagLabel>
          </Stack>
        </SimpleGrid>

        <Text fontWeight={700} fontSize="md" mb={3}>
          Tour-Card
        </Text>
        <SimpleGrid
          columns={{ base: 1, sm: 2 }}
          spacing={{ base: 20, sm: 10 }}
          mb={12}
          alignItems="start"
        >
          <TourCard tour={tours[0]} onFavoriteClick={demoClick} />
          <TourCard tour={tours[0]} onFavoriteClick={demoClick} />
        </SimpleGrid>

        <Text fontWeight={700} fontSize="md" mb={3}>
          Tour Row-Card
        </Text>
        <SimpleGrid
          columns={{ base: 1, sm: 1 }}
          spacing={{ base: 20, sm: 10 }}
          mb={12}
          alignItems="start"
        >
          <TourRowCard tour={tours[0]} onFavoriteClick={demoClick} />
        </SimpleGrid>

        <Text fontWeight={700} fontSize="md" mb={3}>
          Destination-Card
        </Text>
        <SimpleGrid
          columns={{ base: 2, sm: 2 }}
          spacing={{ base: 4, sm: 10 }}
          mb={12}
          alignItems="start"
        >
          <DestinationCard destination={cities[0]} />
          <DestinationCard destination={cities[1]} />
          <DestinationCard destination={cities[2]} />
          <DestinationAllCard total={cities.length} />
        </SimpleGrid>

        <SimpleGrid
          columns={{ base: 2, sm: 4 }}
          spacing={{ base: 4, sm: 4 }}
          mb={12}
          alignItems="start"
        >
          <DestinationCard destination={cities[0]} />
          <DestinationCard destination={cities[1]} />
          <DestinationCard destination={cities[2]} />
          <DestinationAllCard total={cities.length} />
        </SimpleGrid>

        <Text fontWeight={700} fontSize="md" mb={3}>
          Attraction-Card
        </Text>
        <SimpleGrid
          columns={{ base: 1, sm: 2 }}
          spacing={{ base: 20, sm: 10 }}
          mb={12}
          alignItems="start"
        >
          <AttractionCard attraction={cities[3]} />
        </SimpleGrid>

        <Text fontWeight={700} fontSize={{ base: 'md', md: '2xl' }} mb={8}>
          Pagination
        </Text>

        <VStack spacing="4">
          <Text fontWeight={700} fontSize={{ base: 'md', md: '2xl' }} mb={8}>
            Desktop Pagination
          </Text>

          <DesktopPagination
            t={t}
            currentPage={page1}
            totalPages={1}
            onPageChange={(page) => setPage1(page)}
          />
          <DesktopPagination
            t={t}
            currentPage={page2}
            totalPages={2}
            onPageChange={(page) => setPage2(page)}
          />
          <DesktopPagination
            t={t}
            currentPage={page3}
            totalPages={3}
            onPageChange={(page) => setPage3(page)}
          />
          <DesktopPagination
            t={t}
            currentPage={page4}
            totalPages={4}
            onPageChange={(page) => setPage4(page)}
          />
          <DesktopPagination
            t={t}
            currentPage={page5}
            totalPages={5}
            onPageChange={(page) => setPage5(page)}
          />
          <DesktopPagination
            t={t}
            currentPage={page6}
            totalPages={20}
            onPageChange={(page) => setPage6(page)}
          />
          <DesktopPagination
            t={t}
            currentPage={page7}
            totalPages={20}
            onPageChange={(page) => setPage7(page)}
          />
          <DesktopPagination
            t={t}
            currentPage={page8}
            totalPages={20}
            onPageChange={(page) => setPage8(page)}
          />
          <DesktopPagination
            t={t}
            currentPage={page9}
            totalPages={20}
            onPageChange={(page) => setPage9(page)}
          />

          <Text fontWeight={700} fontSize={{ base: 'md', md: '2xl' }} mb={8}>
            Mobile Pagination
          </Text>

          <MobilePagination
            t={t}
            currentPage={page1}
            totalPages={1}
            onPageChange={(page) => setPage1(page)}
          />
          <MobilePagination
            t={t}
            currentPage={page2}
            totalPages={2}
            onPageChange={(page) => setPage2(page)}
          />
          <MobilePagination
            t={t}
            currentPage={page3}
            totalPages={3}
            onPageChange={(page) => setPage3(page)}
          />
          <MobilePagination
            t={t}
            currentPage={page4}
            totalPages={4}
            onPageChange={(page) => setPage4(page)}
          />
          <MobilePagination
            t={t}
            currentPage={page5}
            totalPages={5}
            onPageChange={(page) => setPage5(page)}
          />
          <MobilePagination
            t={t}
            currentPage={page6}
            totalPages={20}
            onPageChange={(page) => setPage6(page)}
          />
          <MobilePagination
            t={t}
            currentPage={page7}
            totalPages={20}
            onPageChange={(page) => setPage7(page)}
          />
          <MobilePagination
            t={t}
            currentPage={page8}
            totalPages={20}
            onPageChange={(page) => setPage8(page)}
          />
          <MobilePagination
            t={t}
            currentPage={page9}
            totalPages={20}
            onPageChange={(page) => setPage9(page)}
          />
        </VStack>
      </Container>
    </Flex>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (_store) =>
    async ({ req, res, locale = 'en', ..._etc }) => {
      const tours = await fetchTours();
      const cities = await fetchMostPopularCities();
      return {
        props: {
          tours,
          cities,
          ...(await serverSideTranslations(locale, ['common'], i18nConfig)),
        },
      };
    }
);

export default StyleGuide;
