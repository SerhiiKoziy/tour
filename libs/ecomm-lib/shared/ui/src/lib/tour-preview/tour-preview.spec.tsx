import { render, screen, fireEvent } from '@testing-library/react';
import { useTranslation } from 'react-i18next';
import {
  Tour,
  tours as mockedTours,
} from '@visit/ecomm-lib/shared/data-access';

import TourPreview from './tour-preview';

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
    useBreakpointValue: jest.fn().mockImplementation(() => ({
      base: 'mobile',
      lg: 'desktop',
    })),
  };
});

describe('TourPreview', () => {
  it('should render successfully', () => {
    const tour: Tour = mockedTours[0];
    const { baseElement, queryByText } = render(
      <TourPreview
        tour={tour}
        onClose={jest.fn()}
        isOpen={true}
        currentSelectImg={1}
      />
    );

    expect(baseElement).toBeTruthy();

    expect(screen.queryByText('Roman Coliseum 039')).not.toBeTruthy();
    expect(screen.queryByText('(6)')).toBeTruthy();

    const clickIndicator = queryByText('(6)');
    clickIndicator && fireEvent.click(clickIndicator);

    expect(screen.queryByText('Roman Coliseum 039')).toBeTruthy();
  });
});
