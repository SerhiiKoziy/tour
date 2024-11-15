import { useEffect, useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { useTranslation } from 'next-i18next';
import { default as NextLink } from 'next/link';
import {
  orderCheckoutSchema,
  orderPaymentSchema,
  formatValueToCCardNumber,
} from '@visit/shared/utils';

import {
  Klarna,
  Button,
  FormikInput,
  FormikSelect,
  FormikTextArea,
  FormikCheckbox,
  FormikDatePicker,
} from '@visit/shared/ui';
import {
  Country,
  fetchCountries,
} from '@visit/ecomm-lib/shared/data-access';
import {
  FormLabel,
  Flex,
  Icon,
  Link,
  Stack,
  Select,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  useToken,
  Text,
} from '@chakra-ui/react';
import { BankCard, Check, Lock } from '@icon-park/react';
import { CheckoutBox } from './checkout-summary';

export type InformationValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  moreInfo?: string;
};

export type PaymentValues = {
  card: string;
  exp: string;
  cvv: string;
  zip: string;
  euCitizen: boolean;
  agreeTerms: boolean;
};

export const InformationInitialValues: InformationValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  country: '',
  moreInfo: '',
};

export const paymentInitialValues: PaymentValues = {
  card: '',
  exp: '',
  cvv: '',
  zip: '',
  euCitizen: false,
  agreeTerms: false,
};

interface FormProps {
  setValues: (values: InformationValues | PaymentValues) => void;
  changeAccordion: (index: number) => void;
}

export const InformationForm = ({ setValues, changeAccordion }: FormProps) => {
  const { t } = useTranslation('common');
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const fetchCountriesList = async () => {
      const countriesList = await fetchCountries();
      setCountries(countriesList);
    };
    fetchCountriesList().catch(console.error);
  }, []);

  return (
    <Formik
      initialValues={InformationInitialValues}
      validationSchema={orderCheckoutSchema}
      onSubmit={(values, { setSubmitting }) => {
        setValues(values);
        changeAccordion(1);
        setSubmitting(false);
      }}
    >
      {(formik) => (
        <Stack as={Form} spacing={6}>
          <Stack direction="row" spacing={0}>
            <Field
              name="firstName"
              placeholder="Jhon"
              label={t('checkout.information.firstName')}
              component={FormikInput}
              styles={{
                control: { borderRight: 'none', borderRightRadius: 0 },
              }}
            />
            <Field
              name="lastName"
              placeholder="Doe"
              groupField="firstName"
              label={t('checkout.information.lastName')}
              component={FormikInput}
              styles={{
                control: { borderLeft: 'none', borderLeftRadius: 0 },
                group: {
                  _before: {
                    content: '""',
                    position: 'absolute',
                    top: 9,
                    height: 6,
                    borderLeft: '1px solid',
                    borderColor: 'gray.400',
                  },
                },
              }}
            />
          </Stack>
          <Field
            name="email"
            type="email"
            placeholder="doe@example.com"
            label={t('checkout.information.email')}
            component={FormikInput}
          />
          <Field
            name="phone"
            type="tel"
            placeholder="+1 380 874 3212"
            label={t('checkout.information.phone')}
            component={FormikInput}
          />
          <Field
            name="country"
            label={t('checkout.information.country')}
            placeholder="Select Country"
            options={countries}
            component={FormikSelect}
          />
          <Field
            name="moreInfo"
            label={`${t('checkout.information.additional')} (${t(
              'checkout.information.optional'
            )})`}
            placeholder="Input"
            component={FormikTextArea}
          />
          <Button
            type="submit"
            w={{ base: '100%', sm: '50%' }}
            size="lg"
            variant="gradient"
            fontSize="md"
            disabled={!(formik.isValid && formik.dirty)}
          >
            {t('checkout.next')}
          </Button>
        </Stack>
      )}
    </Formik>
  );
};

export const PaymentForm = ({ setValues, changeAccordion }: FormProps) => {
  const { t } = useTranslation(['common', 'footer']);
  const [gray500] = useToken('colors', ['gray.500']);

  const KlarnaIcon = () => <Klarna fill={gray500} />;

  const ReadTermsLabel = (
    <>
      {t('checkout.payment.readTerms')}&nbsp;
      <NextLink href="/cancellation-policy" passHref>
        <Link color="primary.600">
          {t('cancellationPolicy', { ns: 'footer' })}
        </Link>
      </NextLink>
      ,&nbsp;
      <NextLink href="/terms-conditions" passHref>
        <Link color="primary.600">
          {t('termsAndConditions', { ns: 'footer' })}
        </Link>
      </NextLink>
      , {t('labels.and')}&nbsp;
      <NextLink href="/privacy-policy" passHref>
        <Link color="primary.600">{t('privacyPolicy', { ns: 'footer' })}</Link>
      </NextLink>
    </>
  );

  return (
    <Formik
      initialValues={paymentInitialValues}
      validationSchema={orderPaymentSchema}
      onSubmit={(values, { setSubmitting }) => {
        setValues(values);
        setSubmitting(false);
      }}
    >
      {(formik) => (
        <Stack as={Form} spacing={6}>
          <Tabs>
            <TabList>
              <Tab>
                <Icon as={BankCard} />
                <Text ml={2}>{t('checkout.payment.card')}</Text>
              </Tab>
              <Tab>
                <Icon as={KlarnaIcon} />
                <Text ml={2}>{t('checkout.payment.klarna')}</Text>
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel as={Stack} spacing={6}>
                <Stack spacing={0}>
                  <FormLabel>{t('checkout.payment.number')}</FormLabel>
                  <Stack direction="row" spacing={0}>
                    <Field
                      name="card"
                      maxLength="19"
                      placeholder="0000 0000 0000 0000"
                      formatValue={formatValueToCCardNumber}
                      leftIcon={<BankCard fill={gray500} />}
                      component={FormikInput}
                      styles={{
                        group: { flex: 1 },
                        control: { borderRight: 'none', borderRightRadius: 0 },
                      }}
                    />
                    <Field
                      name="exp"
                      format="MM/YY"
                      groupField="card"
                      placeholder="MM / YY"
                      onlyMonthPicker
                      component={FormikDatePicker}
                      styles={{
                        group: {
                          width: 24,
                          _before: {
                            content: '""',
                            position: 'absolute',
                            top: 3,
                            height: 6,
                            width: 'full',
                            borderX: '1px solid',
                            borderColor: 'gray.400',
                          },
                        },
                        control: { borderX: 'none', borderRadius: 0 },
                      }}
                    />
                    <Field
                      name="cvv"
                      type="password"
                      groupField="card"
                      placeholder="CVC"
                      autoComplete="off"
                      component={FormikInput}
                      styles={{
                        group: { width: 16 },
                        control: { borderLeft: 'none', borderLeftRadius: 0 },
                      }}
                    />
                  </Stack>
                </Stack>
                <Field
                  name="zip"
                  type="number"
                  placeholder="00000"
                  label={t('checkout.payment.zip')}
                  component={FormikInput}
                  styles={{
                    group: { w: 32 },
                  }}
                />
              </TabPanel>
              <TabPanel>Klarna Content</TabPanel>
            </TabPanels>
          </Tabs>

          <Field
            name="euCitizen"
            label={t('checkout.payment.euCitizen')}
            component={FormikCheckbox}
            styles={{
              label: { fontSize: 'md', color: 'gray.700', lineHeight: 6 },
            }}
          />
          <Field
            name="agreeTerms"
            label={ReadTermsLabel}
            component={FormikCheckbox}
            styles={{
              label: { fontSize: 'md', color: 'gray.700', lineHeight: 6 },
            }}
          />
          <Button
            type="submit"
            size="lg"
            fontSize="md"
            variant="gradient"
            disabled={!(formik.isValid && formik.dirty)}
            leftIcon={Lock}
          >
            {t('checkout.complete')}
          </Button>
          <Stack>
            <CheckoutBox as={Flex} align="center" py={1.5} boxShadow="none">
              <Check fill="green" />
              <Select
                ml={3}
                defaultValue="24"
                fontSize="sm"
                variant="unstyled"
                borderColor="transparent"
              >
                <option value="24">{t('cartSummary.hoursFull')}</option>
                <option value="12">{t('cartSummary.hoursHalf')}</option>
              </Select>
            </CheckoutBox>
            <CheckoutBox as={Flex} align="center" py={1.5} boxShadow="none">
              <Check fill="green" />
              <Text ml={3} fontSize="sm">
                {t('cartSummary.years')}
              </Text>
            </CheckoutBox>
          </Stack>
        </Stack>
      )}
    </Formik>
  );
};
