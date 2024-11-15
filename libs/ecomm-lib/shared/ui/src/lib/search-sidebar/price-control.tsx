import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

import {
  Box,
  Flex,
  Input,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Stack,
  useToken,
} from '@chakra-ui/react';
import { formatNumberToCurrency } from '@visit/shared/utils';
import { ToursPriceData } from '@visit/ecomm-lib/shared/data-access';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const PRICE_CONFIG_MIN = 0;
const PRICE_CONFIG_MAX = 15;

export interface SearchPriceProps {
  data: ToursPriceData[];
  price: number[];
  setPrice: (price: number[]) => void;
}

const PriceInput = ({ value }: { value: number }) => {
  const formattedValue = formatNumberToCurrency(value);
  return (
    <Input
      w={16}
      px={3}
      size="lg"
      fontSize="md"
      value={formattedValue}
      readOnly
    />
  );
};

export const PriceControl = ({
  data = [],
  price,
  setPrice,
}: SearchPriceProps) => {
  const [gray300, gray400] = useToken('colors', ['gray.300', 'gray.400']);

  const [value, setValue] = useState<number[]>(
    price || [PRICE_CONFIG_MIN, PRICE_CONFIG_MAX]
  );

  useEffect(() => {
    if (price) setValue(price);
  }, [price]);

  const priceMin = value[0];
  const priceMax = value[1];

  // Chart Config
  const options = {
    colors: [
      ({ dataPointIndex }: { dataPointIndex: number }) => {
        const priceObj = data[0].data[dataPointIndex];
        if (priceObj.x < priceMin || priceObj.x > priceMax) return gray300;
        return gray400;
      },
    ],
    chart: {
      sparkline: { enabled: true },
    },
    xaxis: {
      crosshairs: { width: 1 },
    },
    plotOptions: {
      bar: {
        borderRadius: 2,
        columnWidth: '80%',
      },
    },
    states: {
      hover: { filter: { type: 'none' } },
      active: { filter: { type: 'none' } },
    },
    tooltip: {
      enabled: false,
    },
    annotations: {
      xaxis: [
        { x: priceMin, borderColor: 'transparent' },
        { x: priceMax, borderColor: 'transparent' },
      ],
    },
  };

  return (
    <Stack spacing={4}>
      <Flex justifyContent="space-between">
        <PriceInput value={priceMin} />
        <PriceInput value={priceMax} />
      </Flex>

      <Box h={12}>
        <Chart options={options} series={data} type="bar" height="100%" />
      </Box>

      <RangeSlider
        value={value}
        min={PRICE_CONFIG_MIN}
        max={PRICE_CONFIG_MAX}
        onChange={setValue}
        onChangeEnd={setPrice}
        colorScheme="primary"
      >
        <RangeSliderTrack bg="gray.400">
          <RangeSliderFilledTrack bg="primary.500" />
        </RangeSliderTrack>
        <RangeSliderThumb index={0} boxSize={5} bg="primary.500" />
        <RangeSliderThumb index={1} boxSize={5} bg="primary.500" />
      </RangeSlider>
    </Stack>
  );
};

export default PriceControl;
