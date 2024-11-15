import { useState } from "react";
import { useTranslation } from "next-i18next";
import {
  Box,
  Flex,
  Spacer,
  Grid,
  GridItem,
  Heading,
  Stack,
  HStack,
  Text,
  Switch,
  IconButton,
  InputGroup,
  InputLeftElement,
  Select,
} from "@chakra-ui/react";
import Button from "../button/button";
import SvgGuests from "../icons/General/Guests";
import { Minus, Plus } from "../icons";
import { TourDatePicker } from "../datepicker/datepicker";
import { Tour } from "@visit/ecomm-lib/shared/data-access";

export const Stepper = () => {
  const [count, setCount] = useState(0);
  const increment = () => setCount((prevState) => prevState + 1);
  const decrement = () =>
    setCount((prevState) => (prevState === 0 ? prevState : prevState - 1));

  return (
    <Flex align="center">
      <IconButton
        colorScheme="darkGray"
        size="md"
        bg="gray.300"
        icon={<Minus />}
        aria-label={"Decrement"}
        onClick={decrement}
      />
      <Text fontSize="sm" mx="5">
        {count}
      </Text>
      <IconButton
        colorScheme="darkGray"
        size="md"
        bg="gray.300"
        icon={<Plus />}
        aria-label={"Decrement"}
        onClick={increment}
      />
    </Flex>
  );
};

export interface SelectDateProps {
  tour: Tour;
  onSelectDate: () => void;
}

export function SelectDate({ tour, onSelectDate }: SelectDateProps) {
  const [isAvailableTours, setIsAvailableTours] = useState<boolean>(true);
  const { t } = useTranslation("common");
  const { price, participants } = tour;

  const priceAdults = `($${price?.adult})`;
  const priceChildren = `($${price.child})`;

  const handleCheckAvailable = () => {
    setIsAvailableTours(false);
    onSelectDate();
  };

  return (
    <Box
      py="6"
      borderRadius="lg"
      borderWidth="1px"
      borderColor="gray.400"
      boxShadow="lg"
    >
      <Heading
        as="h3"
        color="gray.700"
        fontWeight="bold"
        lineHeight="8"
        fontSize="2xl"
        pb="6"
        pl="6"
      >
        {t("selectDate.title")}
      </Heading>
      <Grid
        templateColumns={{ base: "repeat(1)", lg: "repeat(2, 1fr)" }}
        py="6"
        mb="6"
        borderBottom="1px"
        borderColor="gray.400"
      >
        <GridItem pr={{ base: "0", lg: "6" }}>
          <Box pb="6" px="6" mr={{ base:"6", lg: "0" }} borderBottom="1px" borderColor="gray.400">
            <Box border="1px" borderColor="gray.400" borderRadius="7">
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  left="4"
                  width="min-content"
                  children={<SvgGuests />}
                />
                <Select
                  variant="ghost"
                  cursor="pointer"
                  width="full"
                  borderColor="gray.400"
                  size="md"
                  sx={{ paddingLeft: "3rem" }}
                >
                  {participants.map((participant) => (
                    <option key={participant} value={participant}>
                      {participant}
                    </option>
                  ))}
                </Select>
              </InputGroup>
            </Box>
          </Box>
          <Box px="6">
            <Stack spacing="6" pt="6">
              <Flex justifyContent="space-between">
                <HStack spacing="2">
                  <SvgGuests />
                  <Text color="gray.700">{t("selectDate.adults")}</Text>
                  <Text color="gray.500">{priceAdults}</Text>
                </HStack>
                <Stepper />
              </Flex>
              <Flex justifyContent="space-between">
                <HStack spacing="2">
                  <SvgGuests />
                  <Text color="gray.700">{t("selectDate.children")}</Text>
                  <Text color="gray.500">{priceChildren}</Text>
                </HStack>
                <Stepper />
              </Flex>
            </Stack>
          </Box>
        </GridItem>
        <GridItem mr="6" ml={{ base: "6", lg: "0" }}>
          <Box
            borderRadius="lg"
            borderWidth="1px"
            borderColor="gray.400"
            mb="6"
            mt={{ base: 6, lg: 0 }}
          >
            <TourDatePicker />
          </Box>

          {!isAvailableTours && (
            <Flex
              bg="gray.200"
              borderRadius="lg"
              border="1px solid"
              borderColor="gray.400"
              p="3"
            >
              <Flex
                flexDirection="column"
                justifyContent="space-between"
                pr="2"
              >
                <Heading
                  as="h5"
                  fontWeight="medium"
                  fontSize="md"
                  lineHeight="shorter"
                  color="gray.700"
                >
                  {t("selectDate.show")}
                </Heading>

                <Text
                  pt="1"
                  color="gray.500"
                  lineHeight="shorter"
                  fontSize="sm"
                >
                  {t("selectDate.similarTour")}
                </Text>
              </Flex>
              <Spacer />
              <Switch
                size="md"
                colorScheme="primary"
                sx={{
                  "span.chakra-switch__track:not([data-checked])": {
                    backgroundColor: "gray.500",
                  },
                }}
              />
            </Flex>
          )}
        </GridItem>
      </Grid>
      <Box px="6">
        <Button
          variant="gradient"
          size="lg"
          w="full"
          fontSize="md"
          onClick={handleCheckAvailable}
        >
          {t("selectDate.check")}
        </Button>
      </Box>
    </Box>
  );
}

export default SelectDate;
