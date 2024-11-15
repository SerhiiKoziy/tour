import { ReactNode, useCallback } from 'react';
import { useTranslation } from 'next-i18next';

import {
  Box,
  HStack,
  useRadio,
  useRadioGroup,
  UseRadioGroupReturn,
} from '@chakra-ui/react';

interface DaysControlFilterProps {
  days: string;
  setDays: (days: string) => void;
}

const DayButton = ({ children, ...radioProps }: { children: ReactNode }) => {
  const { state, getInputProps, getCheckboxProps } = useRadio(radioProps);

  const input = getInputProps();

  const handleUncheck = useCallback(() => {
    if (state.isChecked && input.onChange) {
      (input.onChange as UseRadioGroupReturn['onChange'])('');
    }
  }, [input.onChange, state.isChecked]);

  return (
    <Box as="label">
      <input {...input} onClick={handleUncheck} />
      <Box
        {...getCheckboxProps()}
        py={2}
        px={3}
        cursor="pointer"
        bg="gray.100"
        borderRadius="lg"
        border="1px solid"
        color={state.isChecked ? 'primary.500' : 'gray.700'}
        borderColor={state.isChecked ? 'primary.500' : 'gray.400'}
      >
        {children}
      </Box>
    </Box>
  );
};

export const DaysControlFilter = ({
  days,
  setDays,
}: DaysControlFilterProps) => {
  const { t } = useTranslation('common');

  const { getRootProps, getRadioProps } = useRadioGroup({
    value: days,
    onChange: setDays,
  });

  return (
    <HStack spacing={2} {...getRootProps()}>
      <DayButton {...getRadioProps({ value: '1' })}>{`+ 1 ${t(
        'search.sidebar.tourDate.day'
      )}`}</DayButton>
      <DayButton {...getRadioProps({ value: '2' })}>{`+ 2 ${t(
        'search.sidebar.tourDate.days'
      )}`}</DayButton>
      <DayButton {...getRadioProps({ value: '4' })}>{`+ 4 ${t(
        'search.sidebar.tourDate.days'
      )}`}</DayButton>
    </HStack>
  );
};

export default DaysControlFilter;
