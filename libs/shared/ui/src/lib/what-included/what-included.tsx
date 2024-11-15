import { Flex, Box } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { Tour } from "@visit/ecomm-lib/shared/data-access";
import { PlaceLabel } from "../label/label";
import AccordionWrapper from "../accordion-wrapper/accordion-wrapper";

interface WhatIncludedProps {
  tour: Tour;
}

export function WhatIncluded({ tour }: WhatIncludedProps) {
  const { t } = useTranslation("common");
  const { placesToVisit } = tour;

  return (
    <AccordionWrapper title={t("whatIncluded.title")}>
      <Flex
        h={{ base: "full", xl: "52" }}
        flexDirection="column"
        flexWrap="wrap"
      >
        {placesToVisit?.map(({ id, title, enabled }) => (
          <Box key={id} pb="3">
            <PlaceLabel enabled={enabled} title={title} />
          </Box>
        ))}
      </Flex>
    </AccordionWrapper>
  );
}

export default WhatIncluded;
