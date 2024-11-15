import { render, screen } from '@testing-library/react';
import {
  Tour,
  tours as mockedTours,
} from '@visit/ecomm-lib/shared/data-access';
import { useTranslation } from 'react-i18next';

import SelectDate from './select-date';

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

jest.mock('@chakra-ui/react', () => {
  const originalModule = jest.requireActual('@chakra-ui/react');
  return {
    __esModule: true,
    ...originalModule,
    useBreakpointValue: jest.fn().mockImplementation(() => 0),
  };
});

describe('SelectDate', () => {
  it('should render successfully', () => {
    const tour: Tour = mockedTours[0];

    const { baseElement } = render(<SelectDate tour={tour} />);
    expect(baseElement).toBeTruthy();

    expect(screen.queryByText('selectDate.title')).toBeTruthy();
    expect(screen.queryByText('selectDate.check')).toBeTruthy();

    //TODO assert that when there is no results when we click on the "Check Available Tours",
    // we show the "Show similar tours on this day" section, and we do have results,
    // we don't show it.Also, you should assert that when there is no results when we click on
    // the "Check Available Tours", we show the "Show similar tours on this day" section,
    // and we do have results, we don't show it.
  });
});
