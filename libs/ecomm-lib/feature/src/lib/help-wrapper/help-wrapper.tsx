import {
  FrequentlyAsked,
  HaveQuestionWrapper,
  PlainLayout,
} from '@visit/ecomm-lib/shared/ui';
import { Container } from '@chakra-ui/react';
import {
  City,
  HelpCenterQuestion,
} from '@visit/ecomm-lib/shared/data-access';

interface HelpWrapperProps {
  cities: City[];
  questionsList: HelpCenterQuestion[];
}

export function HelpWrapper({ cities, questionsList }: HelpWrapperProps) {
  return (
    <PlainLayout cities={cities}>
      <Container
        minWidth="100%"
        maxWidth="100%"
        paddingX={{ base: '4', md: '14', lg: '72' }}
        paddingY="12"
      >
        <FrequentlyAsked questionsList={questionsList} />
      </Container>
      <Container
        minWidth="100%"
        maxWidth="100%"
        paddingX={{ base: '4', md: '14', lg: '72' }}
        paddingTop={{ base: '0', lg: '12' }}
        paddingBottom="12"
      >
        <HaveQuestionWrapper />
      </Container>
    </PlainLayout>
  );
}

export default HelpWrapper;
