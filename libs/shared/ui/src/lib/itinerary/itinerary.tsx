import { useTranslation } from "next-i18next";
import { ItineraryType } from "@visit/ecomm-lib/shared/data-access";
import {
  Box,
  Flex,
  Heading,
  Stack,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Button, useBoolean,
} from "@chakra-ui/react";

import { Minus, SquareDown, SquareUp, SpotInline } from "../icons";

interface ItineraryProps {
  itineraries: ItineraryType[];
}

interface ItineraryCardProps {
  itinerary: ItineraryType;
  isLast: boolean;
}

export const ItineraryCard = ({ itinerary, isLast }: ItineraryCardProps) => {
  const { point, title, description } = itinerary;

  return (
    <Stack direction="row" spacing="4" _notLast={{ pb: "4" }}>
      <Flex flexDirection="column" alignItems="center">
        <Box minH="9">
          <SpotInline color="primary.100" mr="1" fontSize="lg" />
        </Box>
        <Box
          sx={{
            w: "1px",
            h: "full",
            bg: "primary.600",
            opacity: "0.2",
            display: isLast ? "none" : "inherit",
          }}
        />
      </Flex>
      <Box>
        <Box pb="2">
          <Text fontWeight="medium" color="gray.700">
            {point}
          </Text>
          <Text
            fontSize="sm"
            fontWeight="medium"
            lineHeight="shorter"
            color="gray.500"
          >
            {title}
          </Text>
        </Box>
        <Box>
          <Text fontWeight="medium" color="gray.700">
            {description}
          </Text>
        </Box>
      </Box>
    </Stack>
  );
};

export function Itinerary({ itineraries }: ItineraryProps) {
  const [showAll, setShowAll] = useBoolean();
  const { t } = useTranslation("common");

  const lengthItineraries = itineraries?.length;
  const firstFiveItineraries = lengthItineraries > 5 ? itineraries.slice(0, 5) : itineraries;
  const nextAllItineraries = lengthItineraries > 5 ? itineraries.slice(5) : null;

  return (
    <Stack direction="column" spacing="1">
      <Accordion allowMultiple={false} allowToggle>
        <AccordionItem border={["0 !important"]}>
          {({ isExpanded }) => (
            <>
              <AccordionButton p="0" _hover={{ bg: "none" }} maxH="5">
                <Box mr="2" display={{ base: "inherit", sm: "none" }}>
                  <Minus />
                </Box>
                <Box mr="2" display={{ base: "none", sm: "inherit" }}>
                  {isExpanded ? <SquareUp /> : <SquareDown />}
                </Box>
                <Heading
                  as="h3"
                  fontSize="xl"
                  fontWeight="bold"
                  lineHeight="7"
                  color="gray.700"
                >
                  {t("itinerary.title")}
                </Heading>
              </AccordionButton>
              <AccordionPanel px="0" pb="2" pt="4">
                {firstFiveItineraries.map((itinerary, i) => (
                  <ItineraryCard
                    isLast={firstFiveItineraries?.length - 1 === i && !showAll}
                    key={itinerary.id}
                    itinerary={itinerary}
                  />
                ))}
                {showAll &&
                  nextAllItineraries?.map((itinerary, i) => (
                  <ItineraryCard
                    isLast={nextAllItineraries?.length - 1 === i}
                    key={itinerary.id}
                    itinerary={itinerary}
                  />
                ))}
                <Button
                  mt="2"
                  color="primary.600"
                  onClick={setShowAll.toggle}
                >
                  { showAll ? t("itinerary.readLess") : t("itinerary.readMore") }
                </Button>
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      </Accordion>
    </Stack>
  );
}

export default Itinerary;
