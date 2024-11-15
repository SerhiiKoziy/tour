import { render, screen } from '@testing-library/react';
import { useTranslation } from 'react-i18next';
import TourOverview from './tour-overview';

jest.mock('@chakra-ui/react', () => {
  const originalModule = jest.requireActual('@chakra-ui/react');
  return {
    __esModule: true,
    ...originalModule,
    useBreakpointValue: jest.fn().mockImplementation(() => ({
      base: 160,
      sm: 500,
    })),
  };
});

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

describe('TourOverview', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <TourOverview
        title="TourOverview Title"
        description="TourOverview Description"
      />
    );

    expect(screen.queryByText('TourOverview Title')).toBeTruthy();
    expect(screen.queryByText('TourOverview Description')).toBeTruthy();
    expect(baseElement).toBeTruthy();
  });
});
