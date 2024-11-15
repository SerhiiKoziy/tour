import { render, screen } from '@testing-library/react';
import { useTranslation } from 'react-i18next';
import { Field, Formik } from 'formik';

import { FormikInput } from './formik-components';

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}));

const tSpy = jest.fn((str: string, config: unknown): string | Array<string> =>
  config ? ['dummy phone'] : str
);
const useTranslationSpy = useTranslation as jest.Mock;

useTranslationSpy.mockReturnValue({
  t: tSpy,
});

describe('FormikComponents', () => {
  it('should render FormikInput successfully', () => {
    const { baseElement } = render(
      <Formik initialValues={{}} onSubmit={jest.fn()}>
        <Field
          name="firstName"
          type="firstName"
          placeholder="doe@example.com"
          label="First Name"
          component={FormikInput}
        />
      </Formik>
    );
    expect(baseElement).toBeTruthy();
    expect(screen.getByText(/first name/i)).toBeTruthy();
    screen.getByRole('textbox', { name: /first name/i });
  });
});
