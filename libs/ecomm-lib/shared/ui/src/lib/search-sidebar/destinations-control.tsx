import { useTranslation } from 'next-i18next';
import {
  Box,
  Icon,
  HStack,
  Accordion,
  AccordionItem,
  AccordionIcon,
  AccordionPanel,
  AccordionButton,
  useRadio,
  useToken,
  useBoolean,
  useRadioGroup,
  Text,
} from '@chakra-ui/react';
import { Down, Up } from '@icon-park/react';
import { Button, Location } from '@visit/shared/ui';
import { SearchFilterTitle } from './search-sidebar';
import { City } from '@visit/ecomm-lib/shared/data-access';

interface DestinationsControlFilterProps {
  countries: {
    [key: string]: City[];
  };
  city: string;
  setCity: (days: string) => void;
}

const CityRadio = ({
  city,
  amount,
  ...radioProps
}: {
  city: string;
  amount: number;
}) => {
  const { state, getInputProps, getCheckboxProps } = useRadio(radioProps);

  const [primary600] = useToken('colors', ['primary.600']);

  const DurationIcon = () => <Location stroke={primary600} />;

  return (
    <Box as="label">
      <input {...getInputProps()} />
      <HStack
        {...getCheckboxProps()}
        py={2}
        px={4}
        cursor="pointer"
        borderRadius="lg"
        bg={state.isChecked ? 'primary.100' : 'gray.100'}
        color={state.isChecked ? 'primary.600' : 'gray.700'}
      >
        <Icon as={DurationIcon} />
        <Text>{city}</Text>
        <Text opacity="50%">{amount}</Text>
      </HStack>
    </Box>
  );
};

export const DestinationsControlFilter = ({
  countries,
  city,
  setCity,
}: DestinationsControlFilterProps) => {
  const { t } = useTranslation('common');
  const [seeAll, setSeeAll] = useBoolean(false);

  const allCountries = Object.entries(countries);
  const countriesToShow = seeAll ? allCountries.length : 4;
  const slicedCountries = allCountries.slice(0, countriesToShow);

  const { getRootProps, getRadioProps } = useRadioGroup({
    value: city,
    onChange: setCity,
  });

  return (
    <Box>
      <Accordion allowToggle borderColor="gray.400">
        {slicedCountries.map(([country, cities]) => (
          <AccordionItem key={`searchDestination_${country}`}>
            <AccordionButton py={3.5}>
              <HStack flex="1" spacing={2} textAlign="left">
                <SearchFilterTitle color="gray.700">
                  {country}
                </SearchFilterTitle>
                <SearchFilterTitle>{cities.length}</SearchFilterTitle>
              </HStack>
              <AccordionIcon />
            </AccordionButton>

            <AccordionPanel py={2} {...getRootProps()}>
              {cities.map((city) => (
                <CityRadio
                  key={`searchDestinationCity_${city.city}`}
                  city={city.city}
                  amount={42}
                  {...getRadioProps({ value: city.city })}
                />
              ))}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>

      <Button
        w="full"
        py={3.5}
        size="lg"
        fontSize="md"
        variant="link"
        colorScheme="primary"
        rightIcon={seeAll ? <Up /> : <Down />}
        _hover={{ textDecoration: 'none' }}
        onClick={setSeeAll.toggle}
      >
        {`${t('search.sidebar.destinations.allDestinations')} (${
          allCountries.length
        })`}
      </Button>
    </Box>
  );
};

export default DestinationsControlFilter;
