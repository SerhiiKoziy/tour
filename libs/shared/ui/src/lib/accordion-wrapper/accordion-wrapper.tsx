import React from "react";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
  HStack,
  ExpandedIndex,
} from "@chakra-ui/react";
import { Minus, SquareDown, SquareUp } from "../icons";

interface AccordionBtnProps {
  title: string;
  isExpanded?: boolean;
  icon?: React.ReactNode;
}

export const AccordionBtn = ({ title, isExpanded, icon }: AccordionBtnProps) => (
  <AccordionButton p="0" _hover={{ bg: "none" }} maxH="5">
    <Box mr="2" display={{ base: "block", lg: "none" }}>
      <Minus />
    </Box>
    <Box mr="2" display={{ base: "none", lg: "block" }}>
      {isExpanded ? <SquareUp /> : <SquareDown />}
    </Box>
    <HStack>
      <Heading
        as="h3"
        fontSize="xl"
        fontWeight="bold"
        lineHeight="7"
        color="gray.700"
      >
        {title}
      </Heading>
      <Box display={{ base: "none", lg: "inherit" }}>
        {icon}
      </Box>
    </HStack>
  </AccordionButton>
);

interface AccordionWrapperProps {
  title: string;
  children: React.ReactNode;
  defaultIndex?: ExpandedIndex;
  icon?: React.ReactNode;
}

export function AccordionWrapper({ title, children, defaultIndex, icon }: AccordionWrapperProps) {
  return (
    <Accordion allowMultiple={false} allowToggle defaultIndex={defaultIndex}>
      <AccordionItem border="0">
        {({ isExpanded }) => (
          <>
            <AccordionBtn title={title} isExpanded={isExpanded} icon={icon} />
            <AccordionPanel mt="4" p="0">
              {children}
              {isExpanded && (
                <Box
                  minW="max-content"
                  borderBottom="1px solid"
                  color="gray.400"
                  mt="4"
                />
              )}
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  );
}

export default AccordionWrapper;
