import { ReactNode } from 'react';
import { useTranslation } from 'next-i18next';
import {
  Box,
  Text,
  HStack,
  Divider,
  useRadio,
  useBoolean,
  useRadioGroup,
} from '@chakra-ui/react';
import { Down, Up } from '@icon-park/react';
import { Button } from '@visit/shared/ui';
import { Tour } from '@visit/ecomm-lib/shared/data-access';

export interface Attractions {
  [key: string]: Tour[];
}

interface AttractionsControlFilterProps {
  attractions: Attractions;
  city: string;
  attraction: string;
  setAttraction: (attraction: string) => void;
}

const AttractionRadio = ({
  children,
  ...radioProps
}: {
  children: ReactNode;
}) => {
  const { state, getInputProps, getCheckboxProps } = useRadio(radioProps);

  return (
    <Box as="label">
      <input {...getInputProps()} />
      <HStack
        {...getCheckboxProps()}
        p={2}
        cursor="pointer"
        borderRadius="lg"
        bg={state.isChecked ? 'primary.100' : 'gray.100'}
        color={state.isChecked ? 'primary.600' : 'gray.700'}
      >
        {children}
      </HStack>
    </Box>
  );
};

export const AttractionsControlFilter = ({
  city,
  attractions,
  attraction,
  setAttraction,
}: AttractionsControlFilterProps) => {
  const { t } = useTranslation('common');
  const [seeAll, setSeeAll] = useBoolean(false);

  const toShow = seeAll ? Object.entries(attractions).length : 4;
  const slicedAttractions = Object.entries(attractions).slice(0, toShow);

  const { getRootProps, getRadioProps } = useRadioGroup({
    value: attraction,
    onChange: setAttraction,
  });

  return (
    <Box>
      <Divider borderColor="gray.400" />
      <Box p={4} {...getRootProps()}>
        {city && (
          <AttractionRadio {...getRadioProps({ value: city })}>
            <Text>{`${t('search.sidebar.attractions.all')} ${city} ${t(
              'search.sidebar.attractions.tours'
            )}`}</Text>
            <Text opacity="50%">42</Text>
          </AttractionRadio>
        )}
        {slicedAttractions.map(([attraction, tours]) => (
          <AttractionRadio
            key={`searchAttraction_${attraction}`}
            {...getRadioProps({ value: attraction })}
          >
            <Text>{attraction}</Text>
            <Text opacity="50%">{tours.length}</Text>
          </AttractionRadio>
        ))}
      </Box>
      <Divider borderColor="gray.400" />

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
        {`${t('search.sidebar.attractions.allAttractions')} (${
          Object.entries(attractions).length
        })`}
      </Button>
    </Box>
  );
};

export default AttractionsControlFilter;
