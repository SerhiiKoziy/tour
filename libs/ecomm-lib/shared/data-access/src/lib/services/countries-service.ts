export interface Country {
  value: string;
  label: string;
}

export const countries: Country[] = [
  { value: 'Es', label: 'España' },
  { value: 'Col', label: 'Colombia' },
];

export async function fetchCountries(): Promise<Country[]> {
  const timeoutPromise = (timeout: number): Promise<Country[]> => {
    return new Promise((resolve) => {
      return setTimeout(() => resolve(countries), timeout);
    });
  };
  return await timeoutPromise(200);
}
