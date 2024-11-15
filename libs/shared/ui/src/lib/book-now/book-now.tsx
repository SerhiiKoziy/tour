import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import Button from "../button/button";
import { CustomCheck, CustomSelect } from "../cart-summary/cart-summary";
import { Check } from "@icon-park/react";

const options = ["Free Cancellaton 1", "Free Cancellaton 2"];
const tenYears = "10+ years";

export function BookNow() {
  const { t } = useTranslation("common");

  const price = 189.00;
  const pricePerson = `$${price}`;

  return (
    <Box
      p="6"
      borderRadius="lg"
      bg="gray.100"
      maxW="full"
      boxShadow="0 8px 48px rgba(45, 51, 57, 0.08)"
    >
      <Flex justifyContent="space-between" alignItems="center" pb="4">
        <Box>
          <Text color="gray.500">{t("bookNow.from")}</Text>
          <Text fontWeight="bold" fontSize="xl" lineHeight="7">{pricePerson}</Text>
          <Text color="gray.500">{t("bookNow.perPerson")}</Text>
        </Box>
        <Button variant="gradient" size="lg" w="32" fontSize="md">
          {t("bookNow.bookNow")}
        </Button>
      </Flex>
      <Stack spacing="2">
        <CustomSelect options={options} children={<Check fill="green" />} />
        <CustomCheck text={tenYears} />
      </Stack>
    </Box>
  );
};

export default BookNow;
