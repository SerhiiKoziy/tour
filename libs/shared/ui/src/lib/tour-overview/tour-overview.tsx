import React from "react";
import { useTranslation } from "next-i18next";
import {
  Button,
  useBreakpointValue,
  useBoolean,
  Box,
  Accordion,
  AccordionPanel,
  AccordionItem,
  AccordionButton,
  Flex,
  Text
} from "@chakra-ui/react";
import AccordionWrapper from "../accordion-wrapper/accordion-wrapper";
import { TourFaqs } from "@visit/ecomm-lib/shared/data-access";
import Down from "../icons/General/chevron/Down";
import Up from "../icons/General/chevron/Up";

interface CustomTourViewProps {
  title: string;
  description?: string;
  faqs?: TourFaqs[];
}

const MAX_CHARACTERS_SM = 160;
const MAX_CHARACTERS_LG = 500;

interface FaqsViewProps {
  faqs: TourFaqs[];
}

const FaqsView = ({ faqs }: FaqsViewProps) => {
  return (
    <Accordion allowMultiple={false} allowToggle>
      {faqs?.map(({ question, answer}) => (
        <AccordionItem
          key={question}
          borderWidth="1px"
          borderColor="gray.400"
          borderRadius="lg"
          mb="2"
          overflow="hidden"
        >
          {({ isExpanded }) => (
            <>
              <AccordionButton pt="2" pb={ isExpanded ? "1" : "2" } px="3">
                <Flex justifyContent="space-between" alignItems="center" w="full">
                  <Text textAlign="left">{question}</Text>
                  { isExpanded ? <Up/> : <Down/> }
                </Flex>
              </AccordionButton>
              <AccordionPanel pt="0" pb={ isExpanded ? "2" : "0" } px="3">
                { isExpanded && <Text color="gray.500" dangerouslySetInnerHTML={{ __html: answer ?? "" }} /> }
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export const TourOverview = ({ title, description, faqs }: CustomTourViewProps) => {
  const { t } = useTranslation("common");
  const [readMore, setReadMore] = useBoolean();

  const maxCharacters =
    useBreakpointValue({
      base: MAX_CHARACTERS_SM,
      sm: MAX_CHARACTERS_LG,
    }) || 0;

  const hasMoreText = description && description.length > maxCharacters;
  const textToShow = hasMoreText
    ? `${description?.substring(0, maxCharacters)}${readMore ? "" : "..."}`
    : description;

  return (
    <AccordionWrapper title={title}>
      <>
        <Box color="gray.600" dangerouslySetInnerHTML={{ __html: textToShow ?? "" }} />
        { faqs && <FaqsView faqs={faqs} /> }
        {hasMoreText && (
          <Button
            mt="4"
            color="primary.600"
            variant="link"
            paddingLeft="0"
            onClick={setReadMore.toggle}
          >
            {readMore ? t("tourOverview.readLess") : t("tourOverview.readMore")}
          </Button>
        )}
      </>
    </AccordionWrapper>
  );
};

export default TourOverview;
