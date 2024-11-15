import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import {
  Input,
  InputGroup,
  IconButton,
  InputRightElement,
  useDisclosure,
} from '@chakra-ui/react';
import { Button } from '@visit/shared/ui';
import { Close } from '@icon-park/react';
import {
  fetchPromoCode,
  PromoCode,
} from '@visit/ecomm-lib/shared/data-access';

export interface CheckoutPromoProps {
  promoDiscount: PromoCode | null;
  setPromoDiscount: (promo: PromoCode | null) => void;
}

export const CheckoutPromo = ({
  promoDiscount,
  setPromoDiscount,
}: CheckoutPromoProps) => {
  const { t } = useTranslation('common');
  const { isOpen, onClose, onOpen } = useDisclosure();

  const [invalidCode, setInvalidCode] = useState(false);
  const [promoCode, setPromoCode] = useState(promoDiscount?.code ?? '');

  const handleChangeCode = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPromoCode(event.target.value);

  const handlePromoCode = async () => {
    const promo = await fetchPromoCode(promoCode);
    setPromoDiscount(promo);
    if (promo) {
      onClose();
      setInvalidCode(false);
    } else setInvalidCode(true);
  };

  const handleClosePromo = () => {
    onClose();
    setPromoCode('');
    setInvalidCode(false);
    setPromoDiscount(null);
  };

  return (
    <InputGroup
      size="lg"
      borderRadius="lg"
      shadow="shadow.100"
      overflow="hidden"
    >
      <Input
        px={3}
        fontSize="md"
        borderRadius="lg"
        disabled={!isOpen}
        value={promoCode}
        isInvalid={invalidCode}
        onChange={handleChangeCode}
        placeholder={t('checkout.promo')}
        _placeholder={{ color: 'gray.700' }}
        _disabled={{ backgroundColor: 'gray.100' }}
        _hover={{ borderColor: isOpen ? 'gray.500' : 'gray.400' }}
      />
      <InputRightElement right={1} width="auto">
        {isOpen ? (
          <>
            <Button
              mr={1}
              bg="gray.400"
              color="gray.700"
              onClick={() => handlePromoCode()}
            >
              {t('checkout.apply')}
            </Button>

            <IconButton
              aria-label={t('checkout.summary.closePromo')}
              bg="gray.400"
              color="gray.700"
              icon={<Close />}
              onClick={handleClosePromo}
            />
          </>
        ) : promoDiscount ? (
          <IconButton
            aria-label={t('checkout.summary.closePromo')}
            colorScheme="gray"
            variant="ghost"
            icon={<Close />}
            onClick={handleClosePromo}
          />
        ) : (
          <Button colorScheme="gray" variant="ghost" onClick={onOpen}>
            {t('checkout.add')}
          </Button>
        )}
      </InputRightElement>
    </InputGroup>
  );
};

export default CheckoutPromo;
