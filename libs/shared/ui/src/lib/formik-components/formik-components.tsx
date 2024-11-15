import { FC, ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { FieldProps } from 'formik';
import {
  Checkbox,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  Select,
  Textarea,
  FormLabel,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';
import { CloseOne } from '@icon-park/react';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import { RegularDatePickerArrows } from '../datepicker/datepicker';

interface FormikControlProps {
  label: string | ReactNode;
  placeholder?: string;
  leftIcon?: ReactNode;
  groupField?: string;
  options?: {
    value: string | number;
    label: string | number;
  }[];
  styles?: {
    group: { [key: string]: string | number };
    label: { [key: string]: string | number };
    control: { [key: string]: string | number };
  };
  formatValue?: (val: number | string) => number | string;
}

const ControlErrorMessage = ({ error }: { error?: string }) => (
  <FormErrorMessage>
    <CloseOne />
    <Text as="span" ml={1}>
      {error}
    </Text>
  </FormErrorMessage>
);

export const FormikInput: FC<FormikControlProps & FieldProps> = ({
  label,
  field,
  groupField,
  formatValue,
  field: { value },
  form: { touched, errors },
  leftIcon,
  styles,
  ...props
}) => {
  const { t } = useTranslation('form-validation');
  const isInvalid =
    (touched[field.name] && !!errors[field.name]) ||
    (groupField && touched[groupField] && !!errors[groupField]);
  return (
    <FormControl isInvalid={Boolean(isInvalid)} {...styles?.group}>
      {label && <FormLabel {...styles?.label}>{label}</FormLabel>}

      <InputGroup>
        {leftIcon && (
          <InputLeftElement h="full" pointerEvents="none" children={leftIcon} />
        )}
        <Input
          size="lg"
          fontSize="md"
          {...field}
          {...props}
          value={formatValue ? formatValue(value) : value}
          {...styles?.control}
        />
      </InputGroup>

      {touched[field.name] && errors[field.name] && (
        <ControlErrorMessage error={t(`${errors[field.name]}`)?.toString()} />
      )}
    </FormControl>
  );
};

export const FormikSelect: FC<FormikControlProps & FieldProps> = ({
  label,
  options = [],
  field,
  form: { touched, errors },
  ...props
}) => {
  const { t } = useTranslation('form-validation');
  return (
    <FormControl isInvalid={touched[field.name] && !!errors[field.name]}>
      <FormLabel>{label}</FormLabel>

      <Select size="lg" fontSize="md" {...field} {...props}>
        {options.map(({ value, label }) => (
          <option key={`${value}_FormikSelect`} value={value}>
            {label}
          </option>
        ))}
      </Select>

      {touched[field.name] && errors[field.name] && (
        <ControlErrorMessage error={t(`${errors[field.name]}`)?.toString()} />
      )}
    </FormControl>
  );
};

export const FormikTextArea: FC<FormikControlProps & FieldProps> = ({
  label,
  field,
  form: { touched, errors },
  styles,
  ...props
}) => {
  const { t } = useTranslation('form-validation');
  return (
    <FormControl isInvalid={touched[field.name] && !!errors[field.name]}>
      <FormLabel {...styles?.label}>{label}</FormLabel>

      <Textarea {...field} {...props}  {...styles?.group} />

      {touched[field.name] && errors[field.name] && (
        <ControlErrorMessage error={t(`${errors[field.name]}`)?.toString()} />
      )}
    </FormControl>
  );
};

export const FormikCheckbox: FC<FormikControlProps & FieldProps> = ({
  label,
  field,
  form: { touched, errors },
  styles,
  ...props
}) => {
  const { t } = useTranslation('form-validation');
  return (
    <FormControl isInvalid={touched[field.name] && !!errors[field.name]}>
      <Stack direction="row" alignItems="center">
        <Checkbox colorScheme="red" {...field} {...props} />
        <FormLabel {...styles?.label}>{label}</FormLabel>
      </Stack>

      {touched[field.name] && errors[field.name] && (
        <ControlErrorMessage error={t(`${errors[field.name]}`)?.toString()} />
      )}
    </FormControl>
  );
};

export const FormikDatePicker: FC<FormikControlProps & FieldProps> = ({
  label,
  groupField,
  placeholder,
  field: { name, value, onChange, onBlur },
  form: { touched, errors },
  styles,
  ...props
}) => {
  const { t } = useTranslation('form-validation');
  const [portalTarget, setPortalTaget] = useState<HTMLElement>();

  const isInvalid =
    (touched[name] && !!errors[name]) ||
    (groupField && touched[groupField] && !!errors[groupField]);

  useEffect((): (() => void) => {
    const portalDiv = document.createElement('div');
    portalDiv.className = 'ttg-datePicker';
    document.body.appendChild(portalDiv);
    setPortalTaget(portalDiv);

    return () => document.body.removeChild(portalDiv);
  }, []);

  return (
    <FormControl isInvalid={Boolean(isInvalid)} {...styles?.group}>
      {label && <FormLabel>{label}</FormLabel>}

      <DatePicker
        value={value || ''}
        arrow={false}
        portal
        portalTarget={portalTarget}
        onOpenPickNewDate={false}
        onChange={(date: DateObject) =>
          onChange({ target: { name: name, value: date?.toDate() } })
        }
        onOpen={() => onBlur({ target: { name: name } })}
        renderButton={<RegularDatePickerArrows />}
        render={(
          value: string,
          openCalendar: () => void,
          handleValueChange: () => void
        ) => (
          <Input
            size="lg"
            fontSize="md"
            autoComplete="off"
            name={name}
            value={value}
            onFocus={openCalendar}
            onChange={handleValueChange}
            placeholder={placeholder}
            {...styles?.control}
          />
        )}
        {...props}
      />

      {touched[name] && errors[name] && (
        <ControlErrorMessage error={t(`${errors[name]}`)?.toString()} />
      )}
    </FormControl>
  );
};

export default FormikInput;
