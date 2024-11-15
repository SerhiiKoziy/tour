import { useTranslation } from 'next-i18next';

import { Checkbox, CheckboxGroup, Stack } from '@chakra-ui/react';

const DURATIONS = ['0', '3', '5', '8'];

interface SearchDurationProps {
  duration: string[];
  setDuration: (duration: string[]) => void;
}

export const DurationControl = ({
  duration,
  setDuration,
}: SearchDurationProps) => {
  const { t } = useTranslation('common');

  return (
    <Stack spacing={5} px={2}>
      <CheckboxGroup
        colorScheme="primary"
        value={duration}
        onChange={setDuration}
      >
        {DURATIONS.map((duration) => (
          <Checkbox key={`searchDuration_${duration}`} value={duration}>
            {t(`search.sidebar.duration.${duration}`)}
          </Checkbox>
        ))}
      </CheckboxGroup>
    </Stack>
  );
};

export default DurationControl;
