import { useTranslation } from 'next-i18next';

import { Checkbox, CheckboxGroup, Stack } from '@chakra-ui/react';

const TIMES = ['morning', 'noon', '3pm', '6pm'];
interface SearchTimeProps {
  time: string[];
  setTime: (time: string[]) => void;
}

export const TimeControl = ({ time, setTime }: SearchTimeProps) => {
  const { t } = useTranslation('common');

  return (
    <Stack spacing={5} px={2}>
      <CheckboxGroup colorScheme="primary" value={time} onChange={setTime}>
        {TIMES.map((time) => (
          <Checkbox key={`searchTime_${time}`} value={time}>
            {t(`search.sidebar.time.${time}`)}
          </Checkbox>
        ))}
      </CheckboxGroup>
    </Stack>
  );
};

export default TimeControl;
