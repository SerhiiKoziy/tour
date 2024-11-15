import { useEffect, useState } from 'react';

import type {
  CalendarProps,
  DatePickerProps,
  Value,
} from 'react-multi-date-picker';
import DatePicker, { Calendar, DateObject } from 'react-multi-date-picker';

import {
  Text,
  Center,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuList,
  MenuProps,
  MenuButton,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Stack,
  forwardRef,
  useBreakpointValue,
} from '@chakra-ui/react';

import { LeftArrow, RightArrow, Calendar as CalendarIcon } from '../icons';

import Button from '../button/button';

interface DateCalendarPickerProps extends CalendarProps, DatePickerProps {
  initialDate?: Value | null;
  setDate?: (date: Value) => void;
}

interface DatePickerInputProps {
  value?: string;
  openCalendar?: () => void;
  handleValueChange?: () => void;
}

interface DatePickerNavigationProps {
  direction?: string;
  disabled?: boolean;
  handleClick?: () => void;
}

interface MenuInputProps extends MenuProps {
  date: readonly string[];
}

const RegularDatePickerInput = ({
  value,
  openCalendar,
  handleValueChange,
}: DatePickerInputProps) => {
  return (
    <InputGroup borderRadius="xl" backgroundColor="gray.100">
      <InputLeftElement
        pointerEvents="none"
        children={<CalendarIcon color="gray.700" />}
      />
      <Input
        placeholder="Pick a Date"
        value={value}
        onFocus={openCalendar}
        onChange={handleValueChange}
      />
    </InputGroup>
  );
};

const MenuPickerInput = forwardRef(({ date, ...rest }: MenuInputProps, ref) => {
  return (
    <InputGroup
      ref={ref}
      borderRadius="xl"
      backgroundColor="gray.100"
      {...rest}
    >
      <InputLeftElement
        pointerEvents="none"
        children={<CalendarIcon color="gray.700" />}
      />
      <Input placeholder="Tour Date" defaultValue={date} isReadOnly />
    </InputGroup>
  );
});

const RegularDatePickerDayLabel = (date: DateObject) => (
  <Center flexDirection="column">
    <Text>{date.format('D')}</Text>
    <Text fontSize="xs">$123</Text>
  </Center>
);

export const RegularDatePickerArrows = ({
  direction,
  handleClick,
  disabled,
}: DatePickerNavigationProps) => {
  return (
    <Button
      colorScheme="darkGray"
      size="sm"
      disabled={disabled}
      onClick={handleClick}
      leftIcon={direction === 'right' ? RightArrow : LeftArrow}
    />
  );
};

export const RegularDatePicker = ({
  initialDate,
  setDate,
  ...rest
}: DateCalendarPickerProps) => {
  const [startDate, setStartDate] = useState<Value>(initialDate || null);

  useEffect(() => {
    initialDate && setStartDate(initialDate);
  }, [initialDate]);

  useEffect(() => {
    setDate && setDate(startDate);
  }, [startDate, setDate]);
  return (
    <DatePicker
      value={startDate}
      onChange={setStartDate}
      arrow={false}
      format="ddd, DD MMM YYYY"
      onOpenPickNewDate={false}
      containerClassName="ttg-datePicker"
      render={<RegularDatePickerInput />}
      renderButton={<RegularDatePickerArrows />}
      {...rest}
    />
  );
};

export const RegularCalendarPicker = ({
  initialDate,
  setDate,
  children,
  ...rest
}: DateCalendarPickerProps) => {
  const [startDate, setStartDate] = useState<Value>(initialDate || null);

  useEffect(() => {
    initialDate && setStartDate(initialDate);
  }, [initialDate]);

  useEffect(() => {
    setDate && setDate(startDate);
  }, [startDate, setDate]);

  return (
    <Calendar
      value={startDate}
      onChange={setStartDate}
      format="MMMM, YYYY"
      className="ttg-calendar"
      renderButton={<RegularDatePickerArrows />}
      {...rest}
    >
      {children}
    </Calendar>
  );
};

export const ProductDatePicker = ({ ...rest }: DateCalendarPickerProps) => {
  return (
    <Center>
      <RegularDatePicker
        showOtherDays
        mapDays={({ date }) => {
          return {
            children: RegularDatePickerDayLabel(date),
          };
        }}
        {...rest}
      />
    </Center>
  );
};

export const TourDatePicker = ({
  initialDate,
  setDate,
}: DateCalendarPickerProps) => {
  const [tourDate, setTourDate] = useState<Value>(initialDate || '');

  const numberOfMonths = useBreakpointValue({ base: 1, sm: 2 });

  useEffect(() => {
    setDate && setDate(tourDate);
  }, [tourDate, setDate]);

  return (
    <Menu closeOnSelect={false}>
      <MenuButton
        as={MenuPickerInput}
        date={tourDate}
        width="auto"
        flexGrow={1}
        variant="groupUnstyled"
      />
      <MenuList zIndex={15}>
        <Tabs align="center" colorScheme="gray">
          <TabList>
            <Tab fontSize="sm">Choose Dates</Tab>
            <Tab fontSize="sm">Flexible</Tab>
          </TabList>

          <TabPanels>
            <TabPanel p={0}>
              <RegularCalendarPicker
                initialDate={tourDate}
                setDate={setTourDate}
                multiple
                numberOfMonths={numberOfMonths}
                disableYearPicker
                disableMonthPicker
                format="DD-MMM"
                renderButton={<RegularDatePickerArrows />}
              >
                <Stack direction="row" spacing={2} px={4}>
                  <Button size="sm" variant="outline" colorScheme="gray">
                    +1 Day
                  </Button>
                  <Button size="sm" variant="outline" colorScheme="gray">
                    +2 Day
                  </Button>
                  <Button size="sm" variant="outline" colorScheme="gray">
                    +4 Day
                  </Button>
                </Stack>
              </RegularCalendarPicker>
            </TabPanel>
            <TabPanel p={0}>
              <RegularCalendarPicker
                initialDate={tourDate}
                setDate={setTourDate}
                multiple
                buttons={false}
                onlyMonthPicker
                format="MMMM/YY"
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </MenuList>
    </Menu>
  );
};

export default RegularDatePicker;
