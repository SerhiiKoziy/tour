import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
} from '@chakra-ui/react';
import { HelpCenterQuestion } from '@visit/ecomm-lib/shared/data-access';
import { useTranslation } from 'next-i18next';

interface QuestionWrapperProps {
  question: string;
  answer: string;
}

const QuestionWrapper = ({ question, answer }: QuestionWrapperProps) => {
  return (
    <AccordionItem border="0">
      <AccordionButton
        fontSize="xl"
        fontWeight="bold"
        lineHeight="7"
        p="4"
        borderBottom="2px"
        borderColor="gray.400"
      >
        <AccordionIcon fontSize="lg" mr="4" />
        <Box as="span" flex="1" textAlign="left">
          {question}
        </Box>
      </AccordionButton>
      <AccordionPanel
        py={4}
        pl="12"
        fontSize="lg"
        borderBottom="2px"
        borderColor="gray.400"
      >
        {answer}
      </AccordionPanel>
    </AccordionItem>
  );
};

interface FrequentlyAskedProps {
  questionsList: HelpCenterQuestion[];
}

const HelpCenterTitle = () => {
  const { t } = useTranslation('common');

  return (
    <Box paddingY={{ base: '0', lg: '12' }}>
      <Text fontWeight="extrabold" fontSize={{ base: '4xl', lg: '6xl' }} pb="2">
        {t('helpCenter.title')}
      </Text>
      <Text fontSize="2xl" fontWeight="bold" lineHeight="8">
        {t('helpCenter.subTitle')}
      </Text>
    </Box>
  );
};

export function FrequentlyAsked({ questionsList }: FrequentlyAskedProps) {
  const { t } = useTranslation('common');

  return (
    <>
      <HelpCenterTitle />
      <Text pt="12" pb="6" fontWeight="bold" fontSize="2xl" lineHeight="8">
        {t('helpCenter.askedQuestions')}
      </Text>
      <Accordion allowToggle>
        {questionsList.map((question) => (
          <QuestionWrapper
            key={question.id}
            question={question.question}
            answer={question.answer}
          />
        ))}
      </Accordion>
    </>
  );
}

export default FrequentlyAsked;
