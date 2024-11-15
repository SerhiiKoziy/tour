import React, { useState } from 'react';
import {
  Box,
  Divider,
  Flex,
  FormControl,
  Heading,
  HStack,
  IconButton,
  Input,
  Stack,
  Text,
  Image,
  InputGroup,
  InputLeftElement,
  Select,
  Progress,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  Drawer,
} from '@chakra-ui/react';
import Button from '../button/button';
import { useTranslation } from 'next-i18next';
import { ArrowLeft, Check } from '@icon-park/react';
import { CartData } from '@visit/ecomm-lib/shared/data-access';
import { Calendar as CalendarIcon } from '../icons';
import CheckCirclePrimary from '../icons/General/CheckCirclePrimary';
import Close from '../icons/General/Close';

interface CustomSelectProps {
  options: string[];
  children?: React.ReactNode;
}

export const CustomSelect = ({ options, children }: CustomSelectProps) => {
  return (
    <InputGroup>
      <InputLeftElement
        pointerEvents="none"
        left="4"
        width="min-content"
        children={children}
      />
      <Select
        variant="ghost"
        cursor="pointer"
        width="full"
        size="md"
        sx={{ paddingLeft: '3rem' }}
        borderWidth="1px"
        borderColor="gray.400"
        borderRadius="lg"
        fontSize="sm"
        lineHeight="shorter"
      >
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </Select>
    </InputGroup>
  );
};

interface CustomCheckProps {
  text: string;
}

export const CustomCheck = ({ text }: CustomCheckProps) => (
  <Box
    borderRadius="lg"
    w="full"
    px="4"
    py="2.5"
    borderWidth="1px"
    borderColor="gray.400"
  >
    <Stack direction="row" align="center" spacing="3">
      <Check fill="green" />
      <Text fontSize="sm" lineHeight="shorter" color="gray.700">
        {text}
      </Text>
    </Stack>
  </Box>
);

interface TextFiledCartSummaryProps {
  text: string;
  line?: boolean;
}

const TextFiledCartSummary = ({
  text,
  line = true,
}: TextFiledCartSummaryProps) => {
  return (
    <>
      {line && (
        <Divider
          orientation="vertical"
          borderColor="gray.400"
          mr="2"
          h="4"
          opacity="1"
        />
      )}
      <Text
        color="gray.500"
        fontSize="sm"
        lineHeight="shorter"
        fontWeight="medium"
      >
        {text}
      </Text>
    </>
  );
};

interface PromotionCartProps {
  totalPrice: number;
  promotionPrice: number;
  discount: number;
}

const PromotionCart = ({
  totalPrice,
  promotionPrice,
  discount,
}: PromotionCartProps) => {
  const { t } = useTranslation('common');
  const title = `$ ${totalPrice} ${t(
    'cartSummary.from'
  )} $ ${promotionPrice} ${t('cartSummary.collect')} ${discount}% ${t(
    'cartSummary.discount'
  )}`;
  const ratingPercentage = (totalPrice / promotionPrice) * 100;

  return (
    <Box
      borderColor="primary.500"
      borderWidth="1px"
      borderRadius="lg"
      borderStyle="dashed"
      px="4"
      pt="6"
      pb="5"
      mb="2"
    >
      <Text fontWeight="bold" fontSize="lg" lineHeight="6">
        {title}
      </Text>
      <Flex alignItems="center" pt="3">
        <Progress
          variant="primary"
          w="full"
          size="xs"
          value={ratingPercentage}
          bg="gray.400"
        />
        <CheckCirclePrimary />
      </Flex>
    </Box>
  );
};

interface TourCardSummaryProps {
  cartData: CartData;
  onDeleteCard: (cardId: number) => void;
}

const TourCardSummary = ({ cartData, onDeleteCard }: TourCardSummaryProps) => {
  const {
    id,
    image,
    title,
    type,
    price,
    selectDate,
    selectTime,
    child,
    adult,
  } = cartData;
  const grayFilter500 =
    'invert(58%) sepia(10%) saturate(246%) hue-rotate(153deg) brightness(81%) contrast(82%)';

  return (
    <Box
      borderRadius="lg"
      borderColor="gray.400"
      borderWidth="1px"
      bg="gray.100"
      mb="2"
    >
      <Flex>
        <Box
          position="relative"
          overflow="hidden"
          display={{ base: 'none', md: 'inherit' }}
          maxW="36"
          h="36"
          p="2"
        >
          <Image
            src={image}
            alt={image}
            objectFit="cover"
            objectPosition="center"
            borderRadius="lg"
            h="full"
            w="full"
          />
        </Box>
        <Box w="full" p="4">
          <Box>
            <Flex justifyContent="space-between">
              <HStack pb="1">
                <CalendarIcon filter={grayFilter500} />
                <TextFiledCartSummary text={selectDate} line={false} />
                <TextFiledCartSummary text={selectTime} />
              </HStack>
              <IconButton
                aria-label="close button"
                variant="ghost"
                size="xs"
                onClick={() => onDeleteCard(id)}
                icon={<Close filter={grayFilter500} />}
              />
            </Flex>
          </Box>
          <Text fontWeight="medium" lineHeight="5">
            {title}
          </Text>
          <Divider
            orientation="horizontal"
            w="full"
            backgroundColor="gray.400"
            my="2"
            opacity="1"
          />
          <Flex justifyContent="space-between" alignItems="center">
            <HStack spacing="2">
              <TextFiledCartSummary text={adult} line={false} />
              {child && <TextFiledCartSummary text={child} />}
              <TextFiledCartSummary text={type} />
            </HStack>
            <Text>{price}</Text>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

interface HeaderCartSummaryProps {
  onClose: () => void;
  countCartSummary: number;
}

const HeaderCartSummary = ({
  onClose,
  countCartSummary,
}: HeaderCartSummaryProps) => {
  const { t } = useTranslation('common');
  const singular = countCartSummary <= 1;

  return (
    <HStack spacing="4" p="4" h="20" borderBottom="1px" borderColor="gray.400">
      <IconButton
        aria-label={'left button'}
        variant="outline"
        borderColor="gray.400"
        size="lg"
        icon={<ArrowLeft />}
        onClick={onClose}
      />
      <Box>
        <Heading as="h4" fontSize="xl" fontWeight="bold" lineHeight="7">
          {t('cartSummary.title')}
        </Heading>
        <Text fontSize="sm" lineHeight="shorter" color="gray.500">
          {`${countCartSummary}
          ${
            singular
              ? t('cartSummary.subTitleSingular')
              : t('cartSummary.subTitle')
          }`}
        </Text>
      </Box>
    </HStack>
  );
};

interface BodyCartSummaryProps {
  cartSummary: CartData[];
  promotionPrice: number;
  integerTotalPrice: number;
  showPromotionPrice: boolean;
  onDeleteCard: (cardId: number) => void;
}

const BodyCartSummary = ({
  cartSummary,
  promotionPrice,
  integerTotalPrice,
  showPromotionPrice,
  onDeleteCard,
}: BodyCartSummaryProps) => {
  const discount = 10;

  return (
    <Box
      overflowY="scroll"
      overflowX="hidden"
      h="100vh"
      bg="gray.200"
      p="4"
      sx={{
        '::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      {showPromotionPrice && (
        <PromotionCart
          promotionPrice={promotionPrice}
          discount={discount}
          totalPrice={integerTotalPrice}
        />
      )}
      {cartSummary.map((cartData) => (
        <TourCardSummary
          key={cartData.id}
          cartData={cartData}
          onDeleteCard={onDeleteCard}
        />
      ))}
    </Box>
  );
};

interface FooterCartSummaryProps {
  totalPrice: string;
  showPromotionPrice: boolean;
}

const FooterCartSummary = ({
  totalPrice,
  showPromotionPrice,
}: FooterCartSummaryProps) => {
  const [input, setInput] = useState<string>('');
  const { t } = useTranslation('common');

  const isError = input.length < 5;
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const years = t('cartSummary.years');
  const additionalOptions = [
    t('cartSummary.hoursFull'),
    t('cartSummary.hoursHalf'),
  ];

  return (
    <Box p="4" maxH="80" borderTop="1px" borderColor="gray.400">
      <Flex justifyContent="space-between" alignItems="center" pb="6">
        <Text color="gray.500">{t('cartSummary.total')}</Text>
        <Heading as="h3" fontSize="2xl">{`$${totalPrice}`}</Heading>
      </Flex>
      <Stack spacing="4">
        <Stack spacing="2">
          <Button variant="gradient" size="lg" w="full" fontSize="md">
            {t('cartSummary.checkout')}
          </Button>
          <FormControl isInvalid={isError} isRequired={false} id="email">
            <HStack pt={{ base: '2', md: '0' }}>
              <Input
                type="email"
                value={input}
                size="lg"
                fontSize="md"
                onChange={handleInputChange}
                placeholder="johndoe@example.com"
              />
              <Button
                variant="outline"
                minW={{ base: '36', md: '40' }}
                color="primary.600"
                size="lg"
                fontSize="md"
                type="submit"
                isDisabled={isError}
              >
                <>
                  <Text as="span" display={{ base: 'inherit', md: 'none' }}>
                    {t('cartSummary.sendToEmail')}
                  </Text>
                  <Text as="span" display={{ base: 'none', md: 'inherit' }}>
                    {t('cartSummary.sendCart')}
                  </Text>
                </>
              </Button>
            </HStack>
          </FormControl>
        </Stack>

        {showPromotionPrice && (
          <>
            <Divider
              display={{ base: 'none', md: 'inherit' }}
              orientation="horizontal"
              w="full"
              backgroundColor="gray.400"
              opacity="1"
              my="4"
            />
            <Stack spacing="2">
              <CustomSelect
                options={additionalOptions}
                children={<Check fill="green" />}
              />
              <CustomCheck text={years} />
            </Stack>
          </>
        )}
      </Stack>
    </Box>
  );
};

interface CartSummaryProps {
  cartSummary: CartData[];
  onClose: () => void;
  isOpen: boolean;
}

export function CartSummary({
  cartSummary,
  onClose,
  isOpen,
}: CartSummaryProps) {
  const [cartCards, setCartCards] = useState(cartSummary);

  const countCartSummary = cartCards?.length;
  const summaryPrice = cartCards?.reduce(
    (summary, cartData) => summary + cartData.price,
    0
  );
  const integerTotalPrice = Math.round(summaryPrice);
  const totalPrice = summaryPrice?.toFixed(2);
  const promotionPrice = 2000;
  const showPromotionPrice = summaryPrice < promotionPrice;

  const handleDeleteCard = (cardId: number) => {
    const cardsList = cartCards.filter((card) => card.id !== cardId);

    setCartCards(cardsList);
  };

  return (
    <Drawer
      onClose={onClose}
      isOpen={isOpen}
      size={{ base: 'full', md: 'md' }}
      isFullHeight
      autoFocus={false}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerBody p="0" display="flex" flexDirection="column">
          <HeaderCartSummary
            onClose={onClose}
            countCartSummary={countCartSummary}
          />
          <BodyCartSummary
            cartSummary={cartCards}
            integerTotalPrice={integerTotalPrice}
            promotionPrice={promotionPrice}
            showPromotionPrice={showPromotionPrice}
            onDeleteCard={handleDeleteCard}
          />
          <FooterCartSummary
            totalPrice={totalPrice}
            showPromotionPrice={showPromotionPrice}
          />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

export default CartSummary;
