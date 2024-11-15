import React, { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Divider,
  Flex,
  Heading,
  Stack,
  Text,
  Spacer,
  useToken,
  useDisclosure,
} from '@chakra-ui/react';

import { PrivateTour, UpChevron, DownChevron } from '../icons';
import {
  PartDay,
  PriceDetails,
  Time,
  TourProposal,
  CartData,
} from '@visit/ecomm-lib/shared/data-access';
import { Button } from '../button/button';
import { CartSummary } from '../cart-summary/cart-summary';
import { TagLabel } from '../label/label';

interface TitleDropdownProps {
  title: string;
}

interface TourProposalCardProps {
  tourProposal: TourProposal;
  cartSummary: CartData[];
}

interface TimesCardProps {
  timeData: PartDay;
  selectTime: Time;
  setSelectTime: (time: Time) => void;
}

interface PriceDetailsProps {
  priceDetail: PriceDetails;
  selectDatePrice: number;
}

const TitleToDropdown = ({ title }: TitleDropdownProps) => {
  return (
    <Text
      color="gray.600"
      fontSize="lg"
      fontWeight="bold"
      letterSpacing="tight"
      textTransform="uppercase"
    >
      {title}
    </Text>
  );
};

const TimesCard = ({ timeData, setSelectTime, selectTime }: TimesCardProps) => {
  return (
    <Box>
      <Text
        fontSize="sm"
        lineHeight="short"
        color="gray.500"
        textTransform="uppercase"
      >
        {timeData?.label}
      </Text>
      <Stack direction="row" pt="2">
        {timeData.times?.map((time) => {
          const isSelectedTime = time.id === selectTime?.id;

          return (
            <Button
              key={time.id}
              variant="outline"
              p="3"
              borderColor={isSelectedTime ? 'primary.600' : 'gray.400'}
              color={isSelectedTime ? 'primary.600' : 'gray.700'}
              onClick={() => setSelectTime(time)}
            >
              {time.time}
            </Button>
          );
        })}
      </Stack>
    </Box>
  );
};

const PriceDetailCard = ({
  priceDetail,
  selectDatePrice,
}: PriceDetailsProps) => {
  const { type, count } = priceDetail;
  const [gray400] = useToken('colors', ['gray.400']);

  const totalPricePerson = selectDatePrice * count;

  return (
    <Stack
      direction="column"
      w="72"
      spacing="3"
      align="center"
      _notLast={{ mb: '2' }}
      borderBottom={`solid ${gray400} 1px`}
    >
      <Flex direction="row" w="full" align="center" my="2">
        <Stack direction="row" w="full" align="center">
          <Text fontWeight="medium">{type}</Text>
          <Text color="gray.700">{`$ ${selectDatePrice}`}</Text>
          <Text sx={{ p: '0', boxSize: '6' }} color="gray.700">
            {`x ${count}`}
          </Text>
        </Stack>
        <Spacer />
        <Box color="gray.700" minW={{ base: 'max-content', md: 'fit-content' }}>
          <Text>{`$ ${totalPricePerson}`}</Text>
        </Box>
      </Flex>
    </Stack>
  );
};

export function TourProposalCard({
  tourProposal,
  cartSummary,
}: TourProposalCardProps) {
  const { t } = useTranslation('common');
  const { description, priceDetails, title, schedules, tag } = tourProposal;
  const { morning, day } = schedules;
  const [gray400] = useToken('colors', ['gray.400']);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectTime, setSelectTime] = useState<Time>({
    id: 0,
    time: '',
    prices: {
      adult: 0,
      child: 0,
    },
  });

  useEffect(() => {
    const morningTime = morning?.times[0];
    const dayTime = day?.times[0];

    setSelectTime(morningTime || dayTime);
  }, [priceDetails]);

  const handleSelectTime = (time: Time) => {
    setSelectTime(time);
  };

  const startTimePreview = [...morning.times, ...(day?.times || [])];
  const startTimePreviewString = startTimePreview
    .map((preview) => preview.time)
    .join(', ');

  const adultActualPrice = selectTime?.prices?.adult;
  const adultCount = priceDetails[0]?.count;
  const summaryAdultPrice = adultActualPrice * adultCount;

  const childActualPrice = selectTime?.prices?.child;
  const childCount = priceDetails[1]?.count;
  const summaryChildPrice = childActualPrice * childCount;

  const totalPrice = (summaryAdultPrice || 0) + (summaryChildPrice || 0);
  const isDisabled = !(childActualPrice > 0);

  return (
    <Accordion allowToggle mt="4">
      <AccordionItem
        sx={{
          border: 'gray.400',
          borderWidth: '1px',
          borderColor: 'gray.400',
          borderRadius: 'lg',
        }}
        overflow="hidden"
        bg="gray.200"
      >
        {({ isExpanded }) => (
          <>
            <Box overflow="hidden">
              <AccordionButton _hover={{ bg: 'none' }} p="0">
                <Flex
                  justifyContent="space-between"
                  w="full"
                  bg="gray.200"
                  p="3"
                >
                  <Flex alignItems="center">
                    <PrivateTour fontSize="xl" mr="3" />
                    <Text
                      textTransform="uppercase"
                      color="gray.500"
                      fontSize="sm"
                    >
                      {t('tourCard.privateTour')}
                    </Text>
                  </Flex>

                  {isExpanded ? <UpChevron /> : <DownChevron />}
                </Flex>
              </AccordionButton>

              <Flex
                bg="white"
                flexDirection="column"
                borderTopRadius="lg"
                borderBottomRadius={isExpanded ? 'none' : 'lg'}
                pt="3"
                px="3"
                mx="1"
                mb={isExpanded ? '0' : '1'}
              >
                <Flex
                  flexDirection={{ base: 'column-reverse', lg: 'row' }}
                  alignItems={{ base: 'start', lg: 'center' }}
                  justifyContent="space-between"
                  bg="white"
                >
                  <Box>
                    <Stack direction="row" spacing="1">
                      <TagLabel colorScheme={tag.color}>{tag.title}</TagLabel>
                    </Stack>
                    <Heading
                      as="h3"
                      color="grey.700"
                      fontWeight="bold"
                      fontSize="2xl"
                      lineHeight="8"
                      pt="2"
                    >
                      {title}
                    </Heading>
                  </Box>
                </Flex>
                <Text py="4" color="gray.600" lineHeight="short">
                  {description}
                </Text>
                {!isExpanded && (
                  <Flex w="full" mb="1" bg="white">
                    <Flex
                      pt="3"
                      pb={{ base: 0, md: '3' }}
                      w="full"
                      borderTop={`solid ${gray400} 1px`}
                      justifyContent="space-between"
                      flexDirection={{ base: 'column', md: 'row' }}
                    >
                      <Text
                        sx={{
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                          overflow: 'hidden',
                        }}
                      >
                        {t('tourCard.startTime')}
                        {': '}
                        {startTimePreviewString}
                      </Text>

                      <Text pt={{ base: '2', md: '0' }}>
                        {t('tourCard.startFrom')} {`$ ${adultActualPrice}`}
                        <Text
                          as="span"
                          color="gray.500"
                          fontSize="sm"
                          textTransform="lowercase"
                        >
                          {' /'}
                          {t('tourCard.adult')}
                        </Text>
                      </Text>
                    </Flex>
                  </Flex>
                )}
              </Flex>
            </Box>
            <AccordionPanel p="0">
              <Stack
                direction="column"
                spacing="6"
                p={{ base: '3', md: '3' }}
                pt="0"
                mx={{ base: '1', md: '1' }}
                bg="white"
                borderBottomRadius="lg"
              >
                <Box borderTop={`solid ${gray400} 1px`} pt="3">
                  <Box pb="3">
                    <TitleToDropdown title={t('tourCard.priceDetails')} />
                  </Box>
                  <Divider bg="gray.400" w="full" h="1px" m="0" />

                  <PriceDetailCard
                    priceDetail={priceDetails[0]}
                    selectDatePrice={adultActualPrice}
                  />
                  {priceDetails[1] && (
                    <PriceDetailCard
                      priceDetail={priceDetails[1]}
                      selectDatePrice={childActualPrice}
                    />
                  )}
                </Box>
                <Box>
                  <TitleToDropdown title={t('tourCard.startTime')} />
                  <Stack direction="row" spacing="6">
                    <TimesCard
                      timeData={morning}
                      setSelectTime={handleSelectTime}
                      selectTime={selectTime}
                    />
                    {day && (
                      <TimesCard
                        timeData={day}
                        setSelectTime={handleSelectTime}
                        selectTime={selectTime}
                      />
                    )}
                  </Stack>
                </Box>
              </Stack>
              <Flex
                borderBottomRadius="lg"
                overflow="hidden"
                direction="row"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                bg="gray.300"
                p={{ base: '4', md: '3' }}
              >
                <Box>
                  <Text>{t('tourCard.totalPrice')}</Text>
                  <Text
                    color="gray.600"
                    fontSize="lg"
                    fontWeight="bold"
                    textTransform="uppercase"
                    letterSpacing="tighter"
                  >
                    {`$ ${totalPrice}`}
                  </Text>
                </Box>
                <Box minW="fit-content">
                  <Button
                    w={{ base: 'full', md: 'xxs' }}
                    size="lg"
                    fontSize="md"
                    variant="gradient"
                    isDisabled={isDisabled}
                    onClick={onOpen}
                    _disabled={{ opacity: '0.3', pointerEvents: 'none' }}
                  >
                    {t('tourCard.addTour')}
                  </Button>
                  <CartSummary
                    isOpen={isOpen}
                    onClose={onClose}
                    cartSummary={cartSummary}
                  />
                </Box>
              </Flex>
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  );
}

export default TourProposalCard;
