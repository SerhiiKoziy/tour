// Function to add certain number of days to a date
export const addDaysToDate = (date: string | undefined, days: number) => {
  if (!date) {
    date = new Date().toISOString().split('T')[0];
  }

  const parsedDate = new Date(`${date}T00:00:00Z`);
  parsedDate.setDate(parsedDate.getDate() + days);

  return parsedDate.toISOString().split('T')[0];
};

interface ICurrency {
  (
    value: number,
    options?: {
      minDigits?: number;
      maxDigits?: number;
      currency?: string;
    }
  ): string;
}

export const formatNumberToCurrency: ICurrency = (value, options) => {
  const currency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: options?.currency ?? 'USD',
    minimumFractionDigits: options?.minDigits ?? 0,
    maximumFractionDigits: options?.maxDigits ?? 0,
  });

  return currency.format(value);
};

export const formatValueToCCardNumber = (value: string) => {
  const regex = /^(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})$/g;
  const onlyNumbers = value.replace(/[^\d]/g, '');

  return onlyNumbers.replace(regex, (regex, $1, $2, $3, $4) =>
    [$1, $2, $3, $4].filter((group) => !!group).join(' ')
  );
};
