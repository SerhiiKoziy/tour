import * as Yup from 'yup';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const orderCheckoutSchema = Yup.object({
  firstName: Yup.string()
    .max(15, 'form.firstName.max')
    .required('form.firstName.required')
    .test('Required lastName', 'form.lastName.required', (value, schema) =>
      Boolean(schema.parent.lastName)
    )
    .test('Max Len lastName', 'form.lastName.max', (value, schema) =>
      Boolean(schema.parent.lastName?.length < 16)
    ),
  email: Yup.string().email('form.email').required('form.required'),
  phone: Yup.string()
    .matches(phoneRegExp, 'form.phone')
    .required('form.required'),
  country: Yup.string().required('form.required'),
  moreInfo: Yup.string(),
});

export const orderPaymentSchema = Yup.object({
  card: Yup.string()
    .required('form.required')
    .test('len', 'form.creditCard.len', (val) => val?.length === 19)
    .test('Required Exp Date', 'form.required', (value, schema) =>
      Boolean(schema.parent.exp)
    )
    .test(
      'Miniumn Exp Date',
      'form.creditCard.expDate',
      (value, schema) => new Date() < new Date(schema.parent.exp)
    )
    .test('Required CVV', 'form.required', (value, schema) =>
      Boolean(schema.parent.cvv)
    ),
  zip: Yup.number().required('form.required'),
  euCitizen: Yup.bool(),
  agreeTerms: Yup.boolean()
    .required('form.acceptTerms')
    .oneOf([true], 'form.acceptTerms'),
});

export const subscribeSchema = Yup.object({
  email: Yup.string().email('form.email').required('form.required'),
});

export const orderMyAccountSchema = Yup.object({
  firstName: Yup.string()
    .max(15, 'form.firstName.max')
    .required('form.firstName.required')
    .test('Required lastName', 'form.lastName.required', (value, schema) =>
      Boolean(schema.parent.lastName)
    )
    .test('Max Len lastName', 'form.lastName.max', (value, schema) =>
      Boolean(schema.parent.lastName?.length < 16)
    ),
  email: Yup.string().email('form.email').required('form.required'),
  phone: Yup.string().matches(phoneRegExp, 'form.phone'),
  country: Yup.string().required('form.required'),
  city: Yup.string(),
});
