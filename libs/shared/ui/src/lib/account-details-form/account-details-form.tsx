import {
  Center,
  Grid,
  GridItem,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import {
  countries,
  MyAccountDetails,
} from '@visit/ecomm-lib/shared/data-access';
import { useTranslation } from 'next-i18next';
import Button from '../button/button';
import { orderMyAccountSchema } from '@visit/shared/utils';
import {
  FormikInput,
  FormikSelect,
} from '../formik-components/formik-components';

const PersonalInfoForm = () => {
  const { t } = useTranslation('common');

  return (
    <GridItem borderRadius="lg" p="4" bg="gray.100">
      <Heading as="h4" fontSize="xl" lineHeight="7" pb="2">
        {t('account.accountDetails.personalInfo')}
      </Heading>
      <Stack spacing="6">
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
          placeholder=""
          disabled
          label={t('account.accountDetails.email')}
          component={FormikInput}
        />
        <Field
          name="phone"
          placeholder="+1 234 567 8901"
          type="tel"
          label={t('account.accountDetails.phone')}
          component={FormikInput}
        />
      </Stack>
    </GridItem>
  );
};

const LocationForm = () => {
  const { t } = useTranslation('common');

  return (
    <GridItem borderRadius="lg" p="4" bg="gray.100">
      <Heading as="h4" fontSize="xl" lineHeight="7" pb="2">
        {t('account.accountDetails.location')}
      </Heading>
      <Stack spacing="6">
        <Field
          name="country"
          label={t('account.accountDetails.country')}
          placeholder="Select Country"
          options={countries}
          component={FormikSelect}
        />
        <Field
          name="city"
          placeholder="City"
          label={t('account.accountDetails.city')}
          component={FormikInput}
        />
      </Stack>
    </GridItem>
  );
};

interface SecurityFormProps {
  date: string;
}

const SecurityForm = ({ date }: SecurityFormProps) => {
  const { t } = useTranslation('common');

  const changedPasswordText =
    date && `${t('account.accountDetails.changedOn')} ${date}`;

  return (
    <GridItem borderRadius="lg" p="4" bg="gray.100">
      <Heading as="h4" fontSize="xl" lineHeight="7" pb="2">
        {t('account.accountDetails.security')}
      </Heading>
      <Stack spacing="4" direction={{ base: 'column', lg: 'row' }}>
        <Button size="lg" variant="outline" color="primary.600">
          {t('account.accountDetails.changePassword')}
        </Button>
        <Center>
          <Text color="gray.500" fontSize="sm" lineHeight="shorter">
            {changedPasswordText}
          </Text>
        </Center>
      </Stack>
    </GridItem>
  );
};

export type AccountDetailsValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
};

export const AccountDetailsInitialValues: AccountDetailsValues = {
  firstName: 'Oleh',
  lastName: 'Sheptytskyi',
  email: 'oleh.sheptytskyi@excited.agency',
  phone: '+1 380 874 3212',
  country: '',
  city: '',
};

interface AccountDetailsFormProps {
  myAccountDetails: MyAccountDetails;
}

export function AccountDetailsForm({
  myAccountDetails,
}: AccountDetailsFormProps) {
  const { t } = useTranslation('common');
  const [values, setValues] = useState({
    ...AccountDetailsInitialValues,
  });

  const handleValues = (formValues: AccountDetailsValues) => {
    setValues({ ...values, ...formValues });
  };

  return (
    <Formik
      initialValues={AccountDetailsInitialValues}
      validationSchema={orderMyAccountSchema}
      onSubmit={(values, { setSubmitting }) => {
        handleValues(values);
        setSubmitting(false);
      }}
    >
      {(formik) => (
        <>
          <Grid
            templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }}
            gridGap="4"
            as={Form}
          >
            <PersonalInfoForm />
            <LocationForm />
            <SecurityForm date={myAccountDetails.date} />
          </Grid>
          <Button
            w={{ base: 'full', lg: 'fit-content' }}
            type="submit"
            mt="4"
            size="lg"
            variant="gradient"
            disabled={!formik.isValid}
          >
            {t('account.accountDetails.saveChanges')}
          </Button>
        </>
      )}
    </Formik>
  );
}

export default AccountDetailsForm;
