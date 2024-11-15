import { Value } from 'react-multi-date-picker';
import debounce from 'lodash/debounce';
import {
  City,
  Tour,
  ToursResults,
  toursPriceData,
  fetchCitiesByQuery,
  fetchToursByDestination,
  fetchAttractionsByQuery,
} from '@visit/ecomm-lib/shared/data-access';
import {
  BaseLayout,
  MostPopularTours,
  SearchSidebarDesktop,
  SearchSidebarMobile,
  SearchGuests,
  SearchTourDate,
  SearchAttractions,
  SearchDestinations,
  SearchPrice,
  SearchTime,
  SearchDuration,
} from '@visit/ecomm-lib/shared/ui';
import {
  Box,
  Button,
  Center,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  HStack,
  IconButton,
  InputGroup,
  InputLeftElement,
  Select,
  SimpleGrid,
  SimpleGridProps,
  Spacer,
  Stack,
  Text,
  useBreakpointValue,
  useDisclosure,
  useRadio,
  useRadioGroup,
  VStack,
} from '@chakra-ui/react';
import {
  Carousel,
  TourCard,
  TourRowCard,
  Pagination,
  Sort,
  HeroSearch,
  Rows,
  Grid,
  Check,
  SelectDropdown,
  OptionDropdown,
} from '@visit/shared/ui';
import React, {
  ChangeEvent,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useRouter } from 'next/router';
import { Trans, useTranslation } from 'next-i18next';
import { ArrowDown, ArrowUp, Fire, Star } from '@icon-park/react';
import { equals, addDaysToDate } from '@visit/shared/utils';

interface SearchProps {
  cities: City[];
  tours: Tour[];
  searchResults: ToursResults;
  // filter variables we may get from the query string
  page?: number;
  offset?: number;
  date?: string;
  tag?: string;
  sort?: string;
}

interface SearchGridProps extends SimpleGridProps {
  cardComponent: React.ElementType;
  items: Tour[];
}

interface HandleSearchProps {
  destination?: string | undefined;
  page?: number | undefined;
  offset?: number | undefined;
  date?: string | undefined;
  tag?: string | undefined;
  sort?: string | undefined;
}

interface RadioElementProps {
  option: (checkbox: any) => ReactElement;
}

const RadioElement = ({ option, ...props }: RadioElementProps) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();
  return (
    <Box as="label">
      <input {...input} />
      {option && option({ checkbox })}
    </Box>
  );
};

const SearchGrid = ({
  cardComponent: CardComponent,
  items,
  height,
  h,
  ...rest
}: SearchGridProps) => {
  return (
    <SimpleGrid {...rest}>
      {items?.map((tour: Tour, index: number) => (
        <CardComponent height={height ?? h} key={`${index}-tour`} tour={tour} />
      ))}
    </SimpleGrid>
  );
};

// helper variables to have the tags grouped where they can be replaced by an API call or something else easily
// TODO counter should come from API?
const tags = [
  { value: 'allTours', text: 'search.allTours', counter: 432 },
  { value: 'foodAndDrinks', text: 'search.foodAndDrinks', counter: 12 },
  { value: 'museums', text: 'search.museums', counter: 54 },
  { value: 'hotDeals', text: 'search.hotDeals', counter: 231 },
];

const sortOptions = [
  {
    value: 'asc',
    text: 'search.sortOptions.lowestPrice',
    icon: <ArrowDown size="18" />,
  },
  {
    value: 'desc',
    text: 'search.sortOptions.highestPrice',
    icon: <ArrowUp size="18" />,
  },
  {
    value: 'mostReviewed',
    text: 'search.sortOptions.mostReviewed',
    icon: <Star size="18" />,
  },
  {
    value: 'mostPopular',
    text: 'search.sortOptions.mostPopular',
    icon: <Fire size="18" />,
  },
];

export function Search({
  cities,
  tours,
  searchResults,
  page,
  offset,
  date,
  tag,
  sort,
}: SearchProps) {
  const router = useRouter();
  const resultsRef = useRef<HTMLDivElement>(null);

  const { t } = useTranslation('search');

  // local state for this view
  const [results, setResults] = useState(searchResults); // Pre-loading the incoming results
  const [viewMode, setViewMode] = useState('card');

  // SideBar Filters
  const [tourDate, setTourDate] = useState<Value>(new Date());
  const [plusDays, setPlusDays] = useState('');
  const [guests, setGuests] = useState(0);

  const [cityFilter, setCityFilter] = useState('');
  const [destinations, setDestinations] = useState<City[]>([]);
  const [destinationsQuery, setDestinationsQuery] = useState('');

  const [attractionFilter, setAttractionFilter] = useState('');
  const [attractions, setAttractions] = useState<Tour[]>([]);
  const [attractionsQuery, setAttractionsQuery] = useState('');

  const [timeFilter, setTimeFilter] = useState<string[]>([]);

  const [durationFilter, setDurationFilter] = useState<string[]>([]);

  const [priceFilter, setPriceFilter] = useState<number[]>([0, 10]);

  // Debounce query search
  const debouncedSetDestinationsQuery = useMemo(
    () => debounce(setDestinationsQuery, 300),
    []
  );

  const debouncedSetAttractionsQuery = useMemo(
    () => debounce(setAttractionsQuery, 300),
    []
  );

  // Cleanup debounce handler
  useEffect(() => {
    return () => {
      debouncedSetAttractionsQuery.cancel();
      debouncedSetDestinationsQuery.cancel();
    };
  }, [debouncedSetAttractionsQuery, debouncedSetDestinationsQuery]);

  useEffect(() => {
    const fetchFilteredCities = async () => {
      const filteredCities = await fetchCitiesByQuery(destinationsQuery);
      setDestinations(filteredCities);
    };

    if (destinationsQuery === '') setDestinations(cities);
    else fetchFilteredCities().catch(console.error);
  }, [destinationsQuery, cities]);

  useEffect(() => {
    const fetchFilteredTours = async () => {
      const filteredTours = await fetchAttractionsByQuery(attractionsQuery);
      setAttractions(filteredTours);
    };
    if (attractionsQuery === '') setAttractions(tours);
    else fetchFilteredTours().catch(console.error);
  }, [attractionsQuery, tours]);

  // States to handle filters
  const [toursPerPage, setToursPerPage] = useState(offset ?? 15);
  const [currentPage, setCurrentPage] = useState(page ?? 1);
  const [currentDate, setCurrentDate] = useState(
    date ?? new Date().toISOString().split('T')[0] // TODO we should use a time lib
  );
  const [currentTag, setCurrentTag] = useState(tag ?? 'allTours');
  const [currentSort, setCurrentSort] = useState(sort ?? 'asc');

  const CardComponent = viewMode === 'card' ? TourCard : TourRowCard;

  const rowCardHeight = useBreakpointValue({ base: 28, md: 48 });
  const perView = useBreakpointValue({ base: 1.125, md: 3 });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const cardHeight = viewMode === 'card' ? 96 : rowCardHeight;

  const handleSearch = useCallback(
    async ({
      destination,
      page,
      offset,
      date,
      tag,
      sort,
    }: HandleSearchProps) => {
      const {
        destination: routerDestination,
        offset: routerOffset,
        page: routerPage,
        date: routerDate,
        tag: routerTag,
        sort: routerSort,
      } = router.query;

      const isSameQuery = equals(
        {
          destination: routerDestination?.toString(),
          offset: routerOffset?.toString(),
          page: routerPage?.toString(),
          date: routerDate?.toString(),
          tag: routerTag?.toString(),
          sort: routerSort?.toString(),
        },
        {
          destination,
          offset: offset?.toString(),
          page: page?.toString(),
          date,
          tag,
          sort,
        }
      );

      if (isSameQuery === false) {
        const newDestination = destination ?? routerDestination?.toString();
        const newOffset = offset ?? toursPerPage;
        const newPage = page ?? currentPage;
        const newDate = date ?? currentDate;
        const newTag = tag ?? currentTag;
        const newSort = sort ?? currentSort;

        const newResults = await fetchToursByDestination(
          newDestination,
          newPage,
          newOffset,
          newDate,
          newTag,
          newSort
        );

        setResults(newResults);
        setCurrentPage(newPage);
        setCurrentDate(newDate);
        setToursPerPage(newOffset);
        setCurrentTag(newTag);
        setCurrentSort(newSort);

        router.query['destination'] = newDestination;
        router.query['offset'] = newOffset.toString();
        router.query['page'] = newPage.toString();
        router.query['date'] = newDate;
        router.query['tag'] = newTag;
        router.query['sort'] = newSort;

        router.push(
          {
            pathname: router.pathname,
            query: router.query,
          },
          undefined,
          { shallow: true, scroll: false }
        );

        // scrolling up to the beginning when there are changes in the results
        resultsRef?.current?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    [router, toursPerPage, currentPage, currentDate, currentTag, currentSort]
  );

  const { getRadioProps: getTagRadioProps } = useRadioGroup({
    name: 'tags',
    value: currentTag,
    onChange: (nextValue: string) =>
      handleSearch({
        tag: nextValue,
      }),
  });

  const { getRadioProps: getSortRadioProps } = useRadioGroup({
    name: 'sort',
    value: currentSort,
    onChange: (nextValue: string) => {
      handleSearch({
        sort: nextValue,
      });
    },
  });

  return (
    <BaseLayout cities={cities}>
      <Flex w="full" direction="column" backgroundColor="gray.200" pb={20}>
        <HeroSearch
          title="The Best Rome Tours"
          subtitle="Don’t miss out on Rome’s deep history with our local guides"
          description="The reason we have the best Rome tours is simple: we work with the best guides in the city and get those guides the best access so they can give a great tour. Specializing in Colosseum tours and Vatican tours, we make it our mission to select only the most educated and charismatic guides in Rome who are passionate about what they do. Our product team is able to source access to restricted areas, skip-the-line entry, and provide superior customer service all to make your trip to Rome trip memorable"
        />
        <Flex
          paddingStart={{ base: '4', lg: '9' }}
          paddingEnd={{ base: '0', xl: '14' }}
          flex="1"
        >
          <SearchSidebarDesktop>
            <SearchTourDate
              tourDate={tourDate}
              plusDays={plusDays}
              setTourDate={setTourDate}
              setPlusDays={setPlusDays}
            />
            <SearchGuests guests={guests} setGuests={setGuests} />
            <SearchDestinations
              cities={destinations}
              city={cityFilter}
              setCity={setCityFilter}
              setQuery={debouncedSetDestinationsQuery}
            />
            <SearchAttractions
              tours={attractions}
              city={cityFilter}
              attraction={attractionFilter}
              setAttraction={setAttractionFilter}
              setQuery={debouncedSetAttractionsQuery}
            />
            <SearchTime time={timeFilter} setTime={setTimeFilter} />
            <SearchDuration
              duration={durationFilter}
              setDuration={setDurationFilter}
            />
            <SearchPrice
              data={toursPriceData}
              price={priceFilter}
              setPrice={setPriceFilter}
            />
          </SearchSidebarDesktop>
          <Container
            maxWidth="100%"
            paddingX={{ base: '0', lg: '4' }}
            paddingBottom={{ base: '12', md: '12' }}
            backgroundColor="gray.200"
            flex="1"
          >
            <Container
              minWidth="100%"
              maxWidth="100%"
              paddingX={{ base: '4', lg: '0' }}
              paddingY="12"
              background="gray.200"
            >
              <Flex>
                <Stack spacing="0">
                  <Heading as="h3" size="md">
                    Rome, Italy
                  </Heading>
                  <Text color="gray.500">
                    {searchResults?.total} Tours Found
                  </Text>
                </Stack>
                <Spacer />
                <HStack>
                  <SelectDropdown
                    w="full"
                    textAlign="left"
                    inputContainer={(children: string) => (
                      <>
                        {t('search.sort')}: {children}
                      </>
                    )}
                    value={currentSort}
                    selectedCallback={(value: string) =>
                      handleSearch({ sort: value })
                    }
                    display={{ base: 'none', lg: 'initial' }}
                  >
                    {sortOptions.map((sortOption) => (
                      <OptionDropdown
                        value={sortOption.value}
                        icon={sortOption.icon}
                        key={sortOption.value}
                      >
                        {t(sortOption.text)}
                      </OptionDropdown>
                    ))}
                  </SelectDropdown>
                  <IconButton
                    variant="outline"
                    onClick={() => {
                      setViewMode(viewMode === 'card' ? 'rowCard' : 'card');
                    }}
                    aria-label={'change view button'}
                    icon={viewMode === 'card' ? <Rows /> : <Grid />}
                  />
                </HStack>
              </Flex>
              <Box ref={resultsRef} overflow="hidden"></Box>
            </Container>
            {results?.peopleChoice && results.peopleChoice.length > 0 && (
              <Container
                minWidth="100%"
                maxWidth="100%"
                paddingStart={{ base: '4', lg: '0' }}
                paddingEnd={{ base: viewMode === 'card' ? '0' : '4', lg: '0' }}
                paddingBottom="12"
                background="gray.200"
              >
                <Box paddingBottom={{ base: '9', lg: '14' }}>
                  <Stack spacing="4">
                    <Text>{t('search.peopleChoice')}</Text>
                    {viewMode === 'card' && (
                      <Carousel
                        slides={{ perView, spacing: 16 }}
                        selector="peopleChoiceCarousel"
                      >
                        {results.peopleChoice.map((tour, index) => (
                          <TourCard
                            key={`similar-${index}`}
                            tour={tour}
                            height="96"
                          />
                        ))}
                      </Carousel>
                    )}
                    {viewMode !== 'card' && (
                      <SearchGrid
                        cardComponent={CardComponent}
                        items={results.peopleChoice}
                        columns={{ base: 1, md: viewMode === 'card' ? 3 : 1 }}
                        spacing={{ base: 2, md: 4 }}
                        height={cardHeight}
                      />
                    )}
                  </Stack>
                </Box>
              </Container>
            )}
            {results?.tours && results.tours.length > 1 && (
              <Container
                minWidth="100%"
                maxWidth="100%"
                paddingStart={{ base: '4', lg: '0' }}
                paddingEnd={{ base: '0', lg: '0' }}
                paddingBottom="4"
                background="gray.200"
              >
                <Carousel
                  slides={{ perView: 'auto', spacing: 8 }}
                  wrapperProps={{
                    minWidth: 'max-content',
                    maxWidth: 'max-content',
                  }}
                  mode="free"
                >
                  {tags?.map((tag) => {
                    const radioProps = getTagRadioProps({ value: tag.value });
                    return (
                      <React.Fragment key={tag.value}>
                        <RadioElement
                          {...radioProps}
                          option={({ checkbox }) => {
                            return (
                              <Button
                                as={Box}
                                {...checkbox}
                                bg="gray.100"
                                borderRadius="lg"
                                borderWidth="1px"
                                borderColor="gray.400"
                                _checked={{
                                  bg: 'gray.100',
                                  color: 'primary.500 !important',
                                  borderColor: 'primary.600',
                                }}
                              >
                                <Trans
                                  i18nKey={tag.text}
                                  t={t}
                                  values={{ counter: tag.counter }}
                                  components={{
                                    container: (
                                      <Text
                                        style={{ whiteSpace: 'pre-wrap' }} // hacky code to have a space before this because the lib trimmes it :(
                                        color={
                                          radioProps['isChecked']
                                            ? 'primary.500'
                                            : 'gray.500'
                                        }
                                      />
                                    ),
                                  }}
                                />
                              </Button>
                            );
                          }}
                        ></RadioElement>
                      </React.Fragment>
                    );
                  })}
                </Carousel>
              </Container>
            )}
            <Container
              minWidth="100%"
              maxWidth="100%"
              paddingX={{ base: '4', lg: '0' }}
              paddingBottom="4"
              background="gray.200"
            >
              <SearchGrid
                cardComponent={CardComponent}
                items={results?.tours}
                columns={{ base: 1, md: viewMode === 'card' ? 3 : 1 }}
                spacing={{ base: 2, md: 4 }}
                height={cardHeight}
              />
              {(!results?.tours || results.tours.length < 1) && (
                <Center width="100%" paddingY="12">
                  <VStack spacing={6}>
                    <VStack color="gray.500" spacing={2}>
                      <Text>{t('search.noToursResults')}</Text>
                      {results?.similarTours &&
                        results.similarTours.length > 0 && (
                          <Text>{t('search.availableSimilarTours')}</Text>
                        )}
                    </VStack>
                    {results?.similarTours && results.similarTours.length > 0 && (
                      <Button
                        size="lg"
                        fontSize="md"
                        variant="outline"
                        color="primary.600"
                        onClick={() =>
                          handleSearch({
                            date: addDaysToDate(
                              router.query['date']?.toString() ?? currentDate,
                              1
                            ),
                          })
                        }
                      >
                        {t('search.showSimilarTours')}
                      </Button>
                    )}
                  </VStack>
                </Center>
              )}
            </Container>
            {(!results?.tours || results.tours.length < 1) &&
              results?.similarTours &&
              results?.similarTours.length > 0 && (
                <Container
                  minWidth="100%"
                  maxWidth="100%"
                  paddingStart={{ base: '4', lg: '0' }}
                  paddingEnd={{ base: '0', lg: '0' }}
                  paddingBottom="4"
                  background="gray.200"
                >
                  <Stack spacing="4">
                    <Text>{t('search.similarTours')}</Text>
                    <Box>
                      <Carousel
                        slides={{ perView, spacing: 16 }}
                        selector="similarToursCarousel"
                      >
                        {results.similarTours.map((tour, index) => (
                          <TourCard
                            key={`similar-${index}`}
                            tour={tour}
                            height="96"
                          />
                        ))}
                      </Carousel>
                    </Box>
                  </Stack>
                </Container>
              )}
            {results?.tours && results.tours.length > 0 && (
              <Container
                minWidth="100%"
                maxWidth="100%"
                paddingX={{ base: '4', lg: '0' }}
                paddingBottom="4"
                background="gray.200"
              >
                <Stack direction={{ base: 'column', md: 'row' }}>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      left="4"
                      width="min-content"
                      children={
                        <Center color="gray.500" paddingTop="2">
                          {t('search.show')}
                        </Center>
                      }
                    />
                    <Select
                      onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                        handleSearch({
                          offset: Number(event.target.value),
                        })
                      }
                      variant="outline"
                      cursor={'pointer'}
                      borderColor="gray.400"
                      bg="gray.100"
                      size="lg"
                      fontSize="md"
                      sx={{ paddingLeft: '4rem' }}
                      width={{ base: '100%', md: 'fit-content' }}
                      value={toursPerPage}
                    >
                      <option value="15">15 {t('search.toursOnPage')}</option>
                      <option value="30">30 {t('search.toursOnPage')}</option>
                      <option value="45">45 {t('search.toursOnPage')}</option>
                    </Select>
                  </InputGroup>
                  <Spacer />
                  <Pagination
                    currentPage={currentPage}
                    totalPages={5}
                    onPageChange={handleSearch}
                  />
                </Stack>
              </Container>
            )}
          </Container>
        </Flex>
        <Flex
          w="full"
          p={4}
          gap={4}
          bg="white"
          display={{ base: 'flex', lg: 'none' }}
        >
          <Button
            flexGrow={1}
            size="lg"
            fontSize="md"
            variant="outline"
            colorScheme="gray"
            leftIcon={<Sort />}
            onClick={onOpen}
          >
            {t('search.sort')}
          </Button>
          <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent borderTopRadius="lg">
              <DrawerHeader
                borderBottomWidth="1px"
                borderColor="gray.400"
                padding="5"
              >
                <Flex>
                  <Text>{t('search.sort')}</Text>
                  <Spacer />
                  <Center>
                    <DrawerCloseButton position="relative" top="0" right="0" />
                  </Center>
                </Flex>
              </DrawerHeader>
              <DrawerBody paddingX="4" paddingY="0">
                {sortOptions?.map((sortOption) => {
                  const radioProps = getSortRadioProps({
                    value: sortOption.value,
                  });
                  return (
                    <React.Fragment key={sortOption.value}>
                      <RadioElement
                        {...radioProps}
                        option={({ checkbox }) => {
                          return (
                            <Flex height="12">
                              <HStack>
                                {sortOption.icon}
                                <Text>{t(sortOption.text)}</Text>
                              </HStack>
                              <Spacer />
                              <Center
                                {...checkbox}
                                _checked={{
                                  color: 'primary.500 !important',
                                }}
                              >
                                <Check size="22" fill="currentColor" />
                              </Center>
                            </Flex>
                          );
                        }}
                      ></RadioElement>
                    </React.Fragment>
                  );
                })}
              </DrawerBody>
            </DrawerContent>
          </Drawer>
          <SearchSidebarMobile>
            <SearchTourDate
              tourDate={tourDate}
              plusDays={plusDays}
              setTourDate={setTourDate}
              setPlusDays={setPlusDays}
            />
            <SearchGuests guests={guests} setGuests={setGuests} />
            <SearchDestinations
              cities={destinations}
              city={cityFilter}
              setCity={setCityFilter}
              setQuery={debouncedSetDestinationsQuery}
            />
            <SearchAttractions
              tours={attractions}
              city={cityFilter}
              attraction={attractionFilter}
              setAttraction={setAttractionFilter}
              setQuery={debouncedSetAttractionsQuery}
            />
            <SearchTime time={timeFilter} setTime={setTimeFilter} />
            <SearchDuration
              duration={durationFilter}
              setDuration={setDurationFilter}
            />
            <SearchPrice
              data={toursPriceData}
              price={priceFilter}
              setPrice={setPriceFilter}
            />
          </SearchSidebarMobile>
        </Flex>
      </Flex>
      <Container
        minWidth="100%"
        maxWidth="100%"
        paddingStart={{ base: '4', md: '14' }}
        paddingEnd={{ base: '0', md: '0' }}
        paddingY={{ base: '12', md: '12' }}
        background="gray.200"
      >
        <MostPopularTours tours={tours} />
      </Container>
    </BaseLayout>
  );
}

export default Search;
