import React, {
  isValidElement,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from 'react';

import {
  Button as ChakraButton,
  Box,
  Flex,
  Menu,
  MenuList,
  MenuProps,
  MenuButton,
  MenuItem,
  Input,
  InputGroup,
  InputLeftElement,
  forwardRef,
  useDisclosure,
  Center,
  ButtonProps,
  MenuOptionGroup,
  MenuItemOption,
  Spacer,
  useToken,
  HStack,
  Text,
} from '@chakra-ui/react';
import { Down, Up } from '@icon-park/react';

import { Search } from '../icons';

import Button from '../button/button';
import { TourDatePicker } from '../datepicker/datepicker';
import SvgCheck from '../icons/General/Check';

interface DropdownProps extends ButtonProps {
  title: string;
  items?: string[];
  children?: ReactNode | ReactNode[];
}

interface SelectDropdownProps extends ButtonProps {
  defaultValue?: string;
  value?: string;
  selectedCallback?: (value: string) => void;
  inputContainer?: (children: string) => ReactElement;
  children?: ReactElement | ReactElement[];
}

interface SearchInputProps extends MenuProps {
  value?: string;
  handleChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export function Dropdown({ title, items, children, ...rest }: DropdownProps) {
  return (
    // relative wrapper need for MenuList witch take wrapper width
    <Box position="relative">
      <Menu>
        {({ isOpen }) => (
          <>
            <MenuButton
              as={ChakraButton}
              colorScheme="gray"
              variant="outline"
              rightIcon={isOpen ? <Up /> : <Down />}
              {...rest}
            >
              {title}
            </MenuButton>
            <MenuList rootProps={{ w: 'full' }} zIndex={15}>
              {items?.map((menuItem, index) => (
                <MenuItem key={`menuItem__${index}`}>{menuItem}</MenuItem>
              ))}
              {children ?? ''}
            </MenuList>
          </>
        )}
      </Menu>
    </Box>
  );
}

interface OptionDropdownProps {
  value?: string;
  icon?: ReactElement;
  children?: string;
}

export function OptionDropdown(_props: OptionDropdownProps) {
  // Using this to be able to accept the value and children props
  return null;
}

export function SelectDropdown({
  display,
  children,
  defaultValue,
  value,
  selectedCallback,
  inputContainer,
  ...rest
}: SelectDropdownProps) {
  const [selected, setSelected] = useState<string>(defaultValue ?? '');
  const [textSelected, setTextSelected] = useState<string>('');
  const [primary600] = useToken('colors', ['primary.600']);

  useEffect(() => {
    let initialTextSelected = '';

    if (!defaultValue) {
      return;
    }

    React.Children.forEach(children, (child) => {
      if (isValidElement(child)) {
        const { value, children } = child.props as OptionDropdownProps;

        if (value === defaultValue) {
          initialTextSelected = children ?? '';
          return;
        }
      }
    });

    setTextSelected(initialTextSelected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // This is intended because I want to run this only once

  // NOTE: this is quite similar to the previous effect, but this is to create a kind of binding between the
  // prop passed and the internal state. In this way, if we update the value of the select from another side
  // this will be reflected automatically using this effect.
  // If we want to have some performance + a selected value at the beginning, we should not use the value prop
  // and we should use defaultValue
  useEffect(() => {
    let textSelected = '';

    // if there is a default value, we stop the automatic "binding"
    if (defaultValue || !value) {
      return;
    }

    React.Children.forEach(children, (child) => {
      if (isValidElement(child)) {
        const { value: childValue, children } =
          child.props as OptionDropdownProps;

        if (childValue === value) {
          textSelected = children ?? '';
          return;
        }
      }
    });

    setTextSelected(textSelected);
    setSelected(value);
  }, [children, defaultValue, value]);

  return (
    // relative wrapper need for MenuList witch take wrapper width
    <Box position="relative" display={display}>
      <Menu>
        {({ isOpen }) => (
          <>
            <MenuButton
              as={ChakraButton}
              colorScheme="gray"
              variant="outline"
              rightIcon={isOpen ? <Up /> : <Down />}
              {...rest}
            >
              {' '}
              {inputContainer && inputContainer(textSelected)}
              {!inputContainer && textSelected}
            </MenuButton>
            <MenuList
              rootProps={{ w: 'full' }}
              width={80}
              paddingY="0"
              zIndex={15}
            >
              <MenuOptionGroup
                defaultValue={defaultValue}
                type="radio"
                onChange={(value) => {
                  setSelected(value.toString());
                  if (selectedCallback) {
                    selectedCallback(value.toString());
                  }
                }}
              >
                {React.Children.map(children, (child, index) => {
                  if (!isValidElement(child)) {
                    return null;
                  }

                  const { value, children, icon } =
                    child.props as OptionDropdownProps;

                  return (
                    <MenuItemOption
                      height="12"
                      paddingX="4"
                      paddingY="3"
                      icon={null}
                      value={value}
                      key={index}
                      onClick={() => setTextSelected(children ?? '')}
                    >
                      <Flex>
                        <HStack>
                          {icon}
                          <Text>{children}</Text>
                        </HStack>
                        <Spacer />
                        {selected === value && (
                          <Center>
                            <SvgCheck size="22" fill={primary600} />
                          </Center>
                        )}
                      </Flex>
                    </MenuItemOption>
                  );
                })}
              </MenuOptionGroup>
            </MenuList>
          </>
        )}
      </Menu>
    </Box>
  );
}

const SearchInput = forwardRef(
  ({ value, handleChange, ...rest }: SearchInputProps, ref) => {
    return (
      <InputGroup
        ref={ref}
        borderRadius="xl"
        backgroundColor="gray.100"
        {...rest}
      >
        <InputLeftElement
          pointerEvents="none"
          children={<Search color="gray.700" />}
        />
        <Input
          value={value}
          onChange={handleChange}
          placeholder="Las Vegas, Rome, Eifeel Tower..."
        />
      </InputGroup>
    );
  }
);

export const RegularSearchBar = ({ ...rest }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setValue(event.target.value);

  useEffect(() => {
    if (value !== '' && onOpen) onOpen();
    else if (onClose) onClose();
  }, [value, onOpen, onClose]);

  return (
    <Menu isOpen={isOpen}>
      <MenuButton
        as={SearchInput}
        value={value}
        handleChange={handleChange}
        {...rest}
      />
      <MenuList>
        <MenuItem>Content</MenuItem>
      </MenuList>
    </Menu>
  );
};

export const SearchBarTourDate = ({ ...rest }) => {
  return (
    <Flex
      p={2}
      columnGap={1}
      direction="row"
      borderRadius="2xl"
      border="1px solid"
      borderColor="gray.400"
      backgroundColor="gray.300"
      {...rest}
    >
      <RegularSearchBar variant="groupUnstyled" />
      <Center display={{ base: 'none', sm: 'flex' }}>
        <Box w="1px" h="full" bg="gray.400" />
      </Center>
      <Box display={{ base: 'none', sm: 'flex' }}>
        <TourDatePicker />
      </Box>
      <Button variant="gradient" display={{ base: 'none', sm: 'flex' }}>
        Search
      </Button>
    </Flex>
  );
};

export default Dropdown;
